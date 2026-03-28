import { Field, Payload, TaskHandler } from 'payload'
import {
  mapObjectiveToFrameworks,
} from '@/server/handlers/grc-extraction/mapper'
import type { GovernanceObjective as ExtractorObjective, FrameworkType } from '@/server/handlers/grc-extraction/types'

export const mapToFrameworkInputSchema: Field[] = [
  { name: 'governanceObjectiveId', type: 'text', required: true },
  { name: 'traceId', type: 'text', required: true },
]

export const mapToFrameworkOutputSchema: Field[] = [
  { name: 'success', type: 'checkbox', required: true },
  { name: 'message', type: 'text' },
  { name: 'mappingsCreated', type: 'number' },
]

interface Input { governanceObjectiveId: string | number; traceId: string }
interface Output { success: boolean; message?: string; mappingsCreated?: number }

export const mapToFrameworkHandler: TaskHandler<'map-to-framework'> = async ({
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

    const extractorObjective: ExtractorObjective = {
      id: govObj.objectiveId,
      text: govObj.text,
      sourceSection: govObj.sourceSection || '',
      sourceSectionType: (govObj.sourceSectionType as any) || 'other',
      sourceDocument: String(govObj.sourceDocument),
      extractionConfidence: (govObj.extractionConfidence as any) || 'medium',
      keywords: Array.isArray(govObj.keywords) ? govObj.keywords as string[] : [],
    }

    const frameworks: FrameworkType[] = ['COBIT2019', 'COSO_ERM']
    const mappings = mapObjectiveToFrameworks(extractorObjective, frameworks)

    const frameworkMappings = mappings.map((m) => ({
      controlId: m.controlId,
      controlName: m.controlId,
      similarityScore: m.similarityScore,
      confidence: m.confidence,
      matchedKeywords: m.matchedKeywords,
      rationale: m.rationale,
    }))

    await payload.update({
      collection: 'governance-objectives',
      id: governanceObjectiveId,
      data: { frameworkMappings },
    })

    await payload.create({
      collection: 'decision-logs',
      data: {
        traceId,
        action: `Mapped governance objective ${govObj.objectiveId} to ${mappings.length} framework controls`,
        entityType: 'framework-mapping',
        entityId: govObj.objectiveId,
        agentType: 'framework_mapper',
        input: { objectiveText: govObj.text, keywords: govObj.keywords },
        output: { mappings: frameworkMappings },
        confidence: mappings.length > 0
          ? mappings.reduce((sum, m) => sum + m.similarityScore, 0) / mappings.length
          : 0,
      },
    })

    payload.logger.info(`Mapped ${mappings.length} framework controls to governance objective ${govObj.objectiveId}`)

    return {
      output: {
        success: true,
        message: `Created ${mappings.length} framework mappings`,
        mappingsCreated: mappings.length,
      },
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    payload.logger.error(`Error mapping to framework: ${message}`)
    return { output: { success: false, message } }
  }
}
