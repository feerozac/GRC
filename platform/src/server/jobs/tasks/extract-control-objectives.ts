import crypto from 'crypto'
import { Field, Payload, TaskHandler } from 'payload'
import { sendGeneralLlmRequest } from '@/server/llm/general-llm/request'
import { modelNames } from '@/server/llm/general-llm/mappings'
import { CONTROL_OBJECTIVES_SYSTEM_PROMPT } from '@/server/llm/workflows/grc/prompts'
import { ControlObjectivesResponseSchema } from '@/server/llm/workflows/grc/schemas'

export const extractControlObjectivesInputSchema: Field[] = [
  { name: 'governanceObjectiveId', type: 'text', required: true },
  { name: 'traceId', type: 'text', required: true },
]

export const extractControlObjectivesOutputSchema: Field[] = [
  { name: 'success', type: 'checkbox', required: true },
  { name: 'message', type: 'text' },
  { name: 'controlsCreated', type: 'number' },
]

interface Input { governanceObjectiveId: string | number; traceId: string }
interface Output { success: boolean; message?: string; controlsCreated?: number }

export const extractControlObjectivesHandler: TaskHandler<'extract-control-objectives'> = async ({
  input,
  req: { payload },
}: {
  input: Input
  req: { payload: Payload }
}): Promise<{ output: Output }> => {
  try {
    const { governanceObjectiveId, traceId } = input

    const govObj = await payload.findByID({
      collection: 'governance-objectives',
      id: governanceObjectiveId,
    })

    if (!govObj) throw new Error(`Governance objective ${governanceObjectiveId} not found`)

    const generationId = `grc-extract-ctrl-${traceId}-${governanceObjectiveId}`

    const result = await sendGeneralLlmRequest({
      name: 'extract-control-objectives',
      systemPrompt: CONTROL_OBJECTIVES_SYSTEM_PROMPT,
      userPrompt: `Derive control objectives from the following governance objective:\n\nObjective ID: ${govObj.objectiveId}\nText: ${govObj.text}\nSection Type: ${govObj.sourceSectionType}\nKeywords: ${JSON.stringify(govObj.keywords)}\n\nProvide specific, actionable control objectives that would implement or support this governance objective.`,
      schema: ControlObjectivesResponseSchema,
      temperature: 0.4,
      generationId,
      modelName: modelNames.reasoning,
    })

    let controlsCreated = 0
    for (const ctrl of result.controls) {
      const controlId = `CTRL-${String(++controlsCreated).padStart(4, '0')}-${crypto.randomUUID().slice(0, 8)}`

      await payload.create({
        collection: 'control-objectives',
        data: {
          controlId,
          title: ctrl.title,
          description: ctrl.description,
          governanceObjective: governanceObjectiveId as any,
          category: ctrl.category,
          owner: ctrl.owner,
          frequency: ctrl.frequency,
          frameworkReferences: ctrl.frameworkReferences.map((ref: any) => ({
            controlId: ref.controlId,
            controlName: ref.controlName,
          })),
          extractionConfidence: ctrl.confidence,
          reviewStatus: 'pending',
        },
      })

      await payload.create({
        collection: 'decision-logs',
        data: {
          traceId,
          action: `Derived control objective "${ctrl.title}" from governance objective ${govObj.objectiveId}`,
          entityType: 'control-objectives',
          entityId: controlId,
          agentType: 'control_deriver',
          output: ctrl,
          confidence: ctrl.confidence === 'high' ? 0.9 : ctrl.confidence === 'medium' ? 0.7 : 0.4,
        },
      })
    }

    payload.logger.info(`Derived ${controlsCreated} control objectives from governance objective ${govObj.objectiveId}`)

    return {
      output: {
        success: true,
        message: `Derived ${controlsCreated} control objectives`,
        controlsCreated,
      },
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    payload.logger.error(`Error extracting control objectives: ${message}`)
    return { output: { success: false, message } }
  }
}
