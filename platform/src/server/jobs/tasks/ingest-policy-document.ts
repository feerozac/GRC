import { File } from 'formdata-node'
import { Field, Payload, TaskHandler } from 'payload'
import { MinioService } from '@/server/services/storage/minio'
import { PdfParserService } from '@/server/services/pdf-parser/zerox'

export const ingestPolicyDocumentInputSchema: Field[] = [
  { name: 'docId', type: 'text', required: true },
]

export const ingestPolicyDocumentOutputSchema: Field[] = [
  { name: 'success', type: 'checkbox', required: true },
  { name: 'message', type: 'text' },
  { name: 'parsedTextLength', type: 'number' },
  { name: 'pageCount', type: 'number' },
]

interface Input {
  docId: string | number
}

interface Output {
  success: boolean
  message?: string
  parsedTextLength?: number
  pageCount?: number
}

export const ingestPolicyDocumentHandler: TaskHandler<'ingest-policy-document'> = async ({
  input,
  req: { payload },
}: {
  input: Input
  req: { payload: Payload }
}): Promise<{ output: Output }> => {
  try {
    const { docId } = input
    const doc = await payload.findByID({ collection: 'policy-documents', id: docId })

    if (!doc) throw new Error(`Policy document ${docId} not found`)

    if ((doc as any).parsedText && (doc as any).ingestStatus === 'complete') {
      return {
        output: {
          success: true,
          message: 'Document already ingested',
          parsedTextLength: ((doc as any).parsedText as string).length,
          pageCount: (doc as any).pageCount ?? 0,
        },
      }
    }

    if (!doc.s3Key) throw new Error('Document has no S3 key — upload may have failed')

    await payload.update({
      collection: 'policy-documents',
      id: docId,
      data: { ingestStatus: 'processing' },
    })

    const buffer = await MinioService.getFile(doc.s3Key as string)

    const fileType = (doc.fileType as string) || 'application/pdf'
    const fileName = (doc.s3Key as string).split('/').pop() || 'document.pdf'

    let parsedText: string
    let pageCount: number

    if (fileType === 'text/plain') {
      parsedText = buffer.toString('utf-8')
      pageCount = 1
    } else {
      const file = new File([buffer], fileName, { type: fileType })
      const result = await PdfParserService.parse(file)
      parsedText = result.pages.map((p: { content: string }) => p.content).join('\n\n')
      pageCount = result.pages.length
    }

    await payload.update({
      collection: 'policy-documents',
      id: docId,
      data: {
        parsedText,
        pageCount,
        ingestStatus: 'processed',
      },
    })

    await payload.create({
      collection: 'audit-trail-entries',
      data: {
        traceId: `ingest-${docId}`,
        eventType: 'document_parsed',
        entityType: 'policy-documents',
        entityId: String(docId),
        actor: { type: 'ai_agent', agentName: 'policy-research-agent' },
        details: {
          parsedTextLength: parsedText.length,
          pageCount,
          fileType,
        },
      },
    })

    return {
      output: {
        success: true,
        message: 'Policy document parsed successfully',
        parsedTextLength: parsedText.length,
        pageCount,
      },
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    payload.logger.error(`Error ingesting policy document: ${message}`)

    try {
      await payload.update({
        collection: 'policy-documents',
        id: input.docId,
        data: { ingestStatus: 'error', errorMessage: message },
      })
    } catch { /* best effort */ }

    return { output: { success: false, message } }
  }
}
