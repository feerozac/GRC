import crypto from 'crypto'
import { Field, Payload, TaskHandler } from 'payload'
import { sendGeneralLlmRequest } from '@/server/llm/general-llm/request'
import { modelNames } from '@/server/llm/general-llm/mappings'
import { RISK_APPETITE_SYSTEM_PROMPT } from '@/server/llm/workflows/grc/prompts'
import { RiskAppetiteResponseSchema } from '@/server/llm/workflows/grc/schemas'

export const extractRiskAppetiteInputSchema: Field[] = [
  { name: 'docId', type: 'text', required: true },
  { name: 'collectionSlug', type: 'text', required: true },
  { name: 'traceId', type: 'text', required: true },
]

export const extractRiskAppetiteOutputSchema: Field[] = [
  { name: 'success', type: 'checkbox', required: true },
  { name: 'message', type: 'text' },
  { name: 'statementsCreated', type: 'number' },
]

interface Input { docId: string | number; collectionSlug: string; traceId: string }
interface Output { success: boolean; message?: string; statementsCreated?: number }

export const extractRiskAppetiteHandler: TaskHandler<'extract-risk-appetite'> = async ({
  input,
  req: { payload },
}: {
  input: Input
  req: { payload: Payload }
}): Promise<{ output: Output }> => {
  try {
    const { docId, collectionSlug, traceId } = input
    const doc = await payload.findByID({ collection: collectionSlug as any, id: docId })

    if (!doc?.parsedText) throw new Error(`Document ${docId} has no parsed text`)

    const generationId = `grc-extract-risk-${traceId}`

    const truncatedText = doc.parsedText.length > 60000
      ? doc.parsedText.slice(0, 60000) + '\n\n[Document truncated for processing]'
      : doc.parsedText

    const result = await sendGeneralLlmRequest({
      name: 'extract-risk-appetite',
      systemPrompt: RISK_APPETITE_SYSTEM_PROMPT,
      userPrompt: `Extract risk appetite statements from the following document:\n\nTitle: ${doc.title}\nOrganization: ${doc.organization || 'Unknown'}\n\n---\n\n${truncatedText}`,
      schema: RiskAppetiteResponseSchema,
      temperature: 0.3,
      generationId,
      modelName: modelNames.fast,
    })

    let statementsCreated = 0
    for (const stmt of result.statements) {
      const statementId = `RISK-${String(++statementsCreated).padStart(4, '0')}-${crypto.randomUUID().slice(0, 8)}`

      await payload.create({
        collection: 'risk-appetite-statements',
        data: {
          statementId,
          statement: stmt.statement,
          riskCategory: stmt.riskCategory,
          appetiteLevel: stmt.appetiteLevel,
          toleranceThreshold: stmt.toleranceThreshold,
          sourceDocumentType: collectionSlug as any,
          sourceDocument: { relationTo: collectionSlug, value: docId },
          sourceSection: stmt.sourceSection,
          extractionConfidence: stmt.confidence,
          reviewStatus: 'pending',
        },
      })

      await payload.create({
        collection: 'audit-trail-entries',
        data: {
          traceId,
          eventType: 'risk_appetite_extracted',
          entityType: 'risk-appetite-statements',
          entityId: statementId,
          actor: { type: 'ai_agent', agentName: 'risk-appetite-extractor' },
          details: {
            riskCategory: stmt.riskCategory,
            appetiteLevel: stmt.appetiteLevel,
            confidence: stmt.confidence,
          },
          sourceTrace: {
            sourceDocumentCollection: collectionSlug,
            sourceDocumentId: String(docId),
            sourceSection: stmt.sourceSection,
            sourceText: stmt.statement.slice(0, 500),
          },
        },
      })
    }

    payload.logger.info(`Extracted ${statementsCreated} risk appetite statements from ${collectionSlug}/${docId}`)

    return {
      output: {
        success: true,
        message: `Extracted ${statementsCreated} risk appetite statements`,
        statementsCreated,
      },
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    payload.logger.error(`Error extracting risk appetite: ${message}`)
    return { output: { success: false, message } }
  }
}
