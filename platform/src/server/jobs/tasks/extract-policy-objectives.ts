import crypto from 'crypto'
import { Field, Payload, TaskHandler } from 'payload'
import { sendGeneralLlmRequest } from '@/server/llm/general-llm/request'
import { modelNames } from '@/server/llm/general-llm/mappings'
import { POLICY_OBJECTIVES_SYSTEM_PROMPT } from '@/server/llm/workflows/policy-agent/prompts'
import { PolicyObjectivesResponseSchema, type PolicyObjectivesResponse } from '@/server/llm/workflows/policy-agent/schemas'

export const extractPolicyObjectivesInputSchema: Field[] = [
  { name: 'runId', type: 'text', required: true },
]

export const extractPolicyObjectivesOutputSchema: Field[] = [
  { name: 'success', type: 'checkbox', required: true },
  { name: 'message', type: 'text' },
  { name: 'objectiveCount', type: 'number' },
]

interface Input { runId: string }
interface Output { success: boolean; message?: string; objectiveCount?: number }

const MAX_CHARS = 60_000

function buildDocumentContext(docs: Array<{ id: string | number; title?: string; parsedText?: string; category?: string }>): string {
  const sections: string[] = []

  for (const doc of docs) {
    const title = (doc.title as string) || `Document ${doc.id}`
    const category = (doc.category as string) || 'unknown'
    const text = (doc.parsedText as string) || ''
    sections.push(`=== DOCUMENT: "${title}" (category: ${category}, id: ${doc.id}) ===\n\n${text}`)
  }

  const combined = sections.join('\n\n---\n\n')

  if (combined.length > MAX_CHARS) {
    return combined.slice(0, MAX_CHARS) + '\n\n[Documents truncated for processing]'
  }
  return combined
}

export const extractPolicyObjectivesHandler: TaskHandler<'extract-policy-objectives'> = async ({
  input,
  req: { payload },
}: {
  input: Input
  req: { payload: Payload }
}): Promise<{ output: Output }> => {
  const { runId } = input
  const traceId = `policy-objectives-${runId}-${crypto.randomUUID().slice(0, 8)}`

  try {
    const run = await payload.findByID({ collection: 'policy-agent-runs', id: runId })
    if (!run) throw new Error(`Policy agent run ${runId} not found`)

    await payload.update({
      collection: 'policy-agent-runs',
      id: runId,
      data: { status: 'running', currentStep: 'extract_objectives', startedAt: new Date().toISOString() },
    })

    const { docs: policyDocs } = await payload.find({
      collection: 'policy-documents',
      where: {
        run: { equals: runId },
        ingestStatus: { equals: 'processed' },
      },
      limit: 50,
    })

    if (policyDocs.length === 0) {
      throw new Error('No processed documents found for this run. Upload and ingest documents first.')
    }

    const documentContext = buildDocumentContext(policyDocs as Array<{ id: string | number; title?: string; parsedText?: string; category?: string }>)
    const totalChars = policyDocs.reduce((sum, d) => sum + ((d.parsedText as string) || '').length, 0)

    const generationId = `policy-extract-obj-${traceId}`

    const result: PolicyObjectivesResponse = await sendGeneralLlmRequest({
      name: 'extract-policy-objectives',
      systemPrompt: POLICY_OBJECTIVES_SYSTEM_PROMPT,
      userPrompt: `Extract governance objectives from the following ${policyDocs.length} document(s):\n\n${documentContext}`,
      schema: PolicyObjectivesResponseSchema,
      temperature: 0.3,
      generationId,
      modelName: modelNames.fast,
    })

    const objectives = result.objectives.map((obj, idx) => ({
      ...obj,
      id: `POL-OBJ-${String(idx + 1).padStart(3, '0')}-${crypto.randomUUID().slice(0, 8)}`,
    }))

    const avgConfidence = objectives.length > 0
      ? Math.round(objectives.reduce((sum, o) => sum + o.confidence, 0) / objectives.length) / 100
      : 0

    await payload.create({
      collection: 'decision-logs',
      data: {
        traceId,
        action: 'policy_objectives_extracted',
        entityType: 'policy-agent-runs',
        entityId: String(runId),
        agentType: 'policy_objective_extractor',
        input: { documentCount: policyDocs.length, totalChars, documentTitles: policyDocs.map(d => d.title) },
        output: { objectiveCount: objectives.length, objectives },
        reasoning: result.documentSummary,
        confidence: avgConfidence,
        modelUsed: modelNames.fast,
      },
    })

    await payload.create({
      collection: 'audit-trail-entries',
      data: {
        traceId,
        eventType: 'objectives_extracted',
        entityType: 'policy-agent-runs',
        entityId: String(runId),
        actor: { type: 'ai_agent', agentName: 'policy-objective-extractor' },
        details: {
          objectiveCount: objectives.length,
          categories: [...new Set(objectives.map(o => o.category))],
          avgConfidence: Math.round(avgConfidence * 100),
          documentCount: policyDocs.length,
        },
        sourceTrace: {
          sourceDocumentCollection: 'policy-documents',
          sourceDocumentId: policyDocs.map(d => String(d.id)).join(', '),
        },
      },
    })

    const existingStepResults = (run.stepResults as Record<string, unknown>) || {}
    await payload.update({
      collection: 'policy-agent-runs',
      id: runId,
      data: {
        stepResults: {
          ...existingStepResults,
          extract_objectives: {
            completedAt: new Date().toISOString(),
            traceId,
            documentSummary: result.documentSummary,
            objectiveCount: objectives.length,
            objectives,
          },
        },
      },
    })

    payload.logger.info(`Extracted ${objectives.length} policy objectives from ${policyDocs.length} docs for run ${runId}`)

    return {
      output: {
        success: true,
        message: `Extracted ${objectives.length} policy objectives from ${policyDocs.length} documents`,
        objectiveCount: objectives.length,
      },
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    payload.logger.error(`Error extracting policy objectives for run ${runId}: ${message}`)

    try {
      await payload.update({
        collection: 'policy-agent-runs',
        id: runId,
        data: { status: 'error', errorMessage: message },
      })

      await payload.create({
        collection: 'audit-trail-entries',
        data: {
          traceId,
          eventType: 'extraction_workflow_failed',
          entityType: 'policy-agent-runs',
          entityId: String(runId),
          actor: { type: 'ai_agent', agentName: 'policy-objective-extractor' },
          details: { error: message },
        },
      })
    } catch { /* best effort */ }

    return { output: { success: false, message } }
  }
}
