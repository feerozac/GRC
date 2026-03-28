import crypto from 'crypto'
import { Field, Payload, TaskHandler } from 'payload'
import { sendGeneralLlmRequest } from '@/server/llm/general-llm/request'
import { modelNames } from '@/server/llm/general-llm/mappings'
import { GAP_ANALYSIS_SYSTEM_PROMPT, buildGapAnalysisUserPrompt } from '@/server/llm/workflows/grc/gap-analysis-prompts'
import { PolicyGapAnalysisResponseSchema } from '@/server/llm/workflows/grc/gap-analysis-schemas'
import { ALL_FRAMEWORK_CONTROLS } from '@/server/handlers/grc-extraction/framework-catalog'

export const analyzePolicyGapsInputSchema: Field[] = [
  { name: 'docId', type: 'text', required: true },
  { name: 'collectionSlug', type: 'text', required: true },
  { name: 'traceId', type: 'text', required: true },
]

export const analyzePolicyGapsOutputSchema: Field[] = [
  { name: 'success', type: 'checkbox', required: true },
  { name: 'message', type: 'text' },
  { name: 'gapsCreated', type: 'number' },
]

interface Input { docId: string | number; collectionSlug: string; traceId: string }
interface Output { success: boolean; message?: string; gapsCreated?: number }

function buildFrameworkRequirementsContext(): string {
  const byFramework: Record<string, string[]> = {}

  for (const ctrl of ALL_FRAMEWORK_CONTROLS) {
    const key = ctrl.framework
    if (!byFramework[key]) byFramework[key] = []
    byFramework[key].push(
      `- ${ctrl.controlId}: ${ctrl.controlName} — ${ctrl.description}`,
    )
  }

  const lines: string[] = []
  for (const [framework, controls] of Object.entries(byFramework)) {
    lines.push(`### ${framework}`)
    lines.push(...controls)
    lines.push('')
  }

  lines.push('### Additional Frameworks (use general knowledge)')
  lines.push('- NIST 800-53 r5 (Security and Privacy Controls)')
  lines.push('- ISO 27001:2022 (Information Security Management)')
  lines.push('- PCI DSS v4.0 (Payment Card Industry Data Security)')
  lines.push('- HKMA SPM (Supervisory Policy Manual)')
  lines.push('- FIPS 140-3 (Cryptographic Module Validation)')

  return lines.join('\n')
}

export const analyzePolicyGapsHandler: TaskHandler<'analyze-policy-gaps'> = async ({
  input,
  req: { payload },
}: {
  input: Input
  req: { payload: Payload }
}): Promise<{ output: Output }> => {
  try {
    const { docId, collectionSlug, traceId } = input

    const doc = await payload.findByID({ collection: collectionSlug as any, id: docId })
    if (!doc?.parsedText) {
      throw new Error(`Document ${docId} has no parsed text`)
    }

    const govObjectives = await payload.find({
      collection: 'governance-objectives',
      where: { 'sourceDocument.value': { equals: docId } },
      limit: 100,
    })

    const objectivesContext = govObjectives.docs.length > 0
      ? govObjectives.docs
          .map((obj: any, i: number) => {
            const mappings = Array.isArray(obj.frameworkMappings) && obj.frameworkMappings.length > 0
              ? obj.frameworkMappings
                  .map((m: any) => `${m.controlId || 'unknown'} (confidence: ${m.confidence || 'n/a'})`)
                  .join(', ')
              : 'no framework mappings yet'
            return `${i + 1}. [${obj.sourceSectionType || 'general'}] ${obj.text}\n   Keywords: ${Array.isArray(obj.keywords) ? obj.keywords.join(', ') : 'none'}\n   Framework mappings: ${mappings}`
          })
          .join('\n\n')
      : 'No governance objectives extracted yet.'

    const frameworkRequirements = buildFrameworkRequirementsContext()

    const truncatedText = doc.parsedText.length > 50000
      ? doc.parsedText.slice(0, 50000) + '\n\n[Document truncated for processing]'
      : doc.parsedText

    const generationId = `gap-analysis-${traceId}`

    const result = await sendGeneralLlmRequest({
      name: 'analyze-policy-gaps',
      systemPrompt: GAP_ANALYSIS_SYSTEM_PROMPT,
      userPrompt: buildGapAnalysisUserPrompt({
        documentTitle: doc.title || 'Untitled Document',
        policyText: truncatedText,
        frameworkRequirements,
        governanceObjectives: objectivesContext,
      }),
      schema: PolicyGapAnalysisResponseSchema,
      temperature: 0.3,
      generationId,
      modelName: modelNames.fast,
    })

    let gapsCreated = 0
    for (const gap of result.gaps) {
      const gapId = `GAP-${String(++gapsCreated).padStart(4, '0')}-${crypto.randomUUID().slice(0, 8)}`

      await payload.create({
        collection: 'policy-gap-analyses',
        data: {
          gapId,
          policyName: gap.policyName,
          gapDescription: gap.gapDescription,
          frameworksAffected: gap.frameworksAffected.map((f: any) => ({
            frameworkName: f.frameworkName,
            sectionRef: f.sectionRef,
          })),
          priority: gap.priority,
          action: gap.action,
          confidence: gap.confidence,
          reasoning: gap.reasoning,
          sourceRun: traceId,
          sourceDocumentType: collectionSlug as any,
          sourceDocument: { relationTo: collectionSlug, value: docId } as any,
          status: 'identified',
        },
      })

      await payload.create({
        collection: 'decision-logs',
        data: {
          traceId,
          action: `Identified policy gap: ${gap.policyName} — ${gap.gapDescription}`,
          entityType: 'policy-gap-analysis',
          entityId: gapId,
          agentType: 'gap_analyzer',
          input: {
            policyName: gap.policyName,
            frameworksAffected: gap.frameworksAffected,
          },
          output: {
            gapDescription: gap.gapDescription,
            priority: gap.priority,
            action: gap.action,
          },
          reasoning: gap.reasoning,
          confidence: gap.confidence,
        },
      })

      await payload.create({
        collection: 'audit-trail-entries',
        data: {
          traceId,
          eventType: 'gap_identified',
          entityType: 'policy-gap-analyses',
          entityId: gapId,
          actor: { type: 'ai_agent', agentName: 'policy-gap-analyzer' },
          details: {
            policyName: gap.policyName,
            priority: gap.priority,
            action: gap.action,
            confidence: gap.confidence,
            frameworksAffected: gap.frameworksAffected.map(
              (f: any) => `${f.frameworkName} ${f.sectionRef}`,
            ),
          },
          sourceTrace: {
            sourceDocumentCollection: collectionSlug,
            sourceDocumentId: String(docId),
          },
        },
      })
    }

    payload.logger.info(
      `Gap analysis complete for ${collectionSlug}/${docId}: ${gapsCreated} gaps identified`,
    )

    return {
      output: {
        success: true,
        message: `Identified ${gapsCreated} policy gaps`,
        gapsCreated,
      },
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    payload.logger.error(`Error in gap analysis: ${message}`)
    return { output: { success: false, message } }
  }
}
