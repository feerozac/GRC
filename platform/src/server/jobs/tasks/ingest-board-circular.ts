import { File } from 'formdata-node'
import { Field, Payload, TaskHandler } from 'payload'
import { MinioService } from '@/server/services/storage/minio'
import { PdfParserService } from '@/server/services/pdf-parser/zerox'

export const ingestBoardCircularInputSchema: Field[] = [
  { name: 'docId', type: 'text', required: true },
]

export const ingestBoardCircularOutputSchema: Field[] = [
  { name: 'success', type: 'checkbox', required: true },
  { name: 'message', type: 'text' },
  { name: 'parsedTextLength', type: 'number' },
]

interface Input { docId: string | number }
interface Output { success: boolean; message?: string; parsedTextLength?: number }

export const ingestBoardCircularHandler: TaskHandler<'ingest-board-circular'> = async ({
  input,
  req: { payload },
}: {
  input: Input
  req: { payload: Payload }
}): Promise<{ output: Output }> => {
  try {
    const { docId } = input
    const doc = await payload.findByID({ collection: 'board-circulars', id: docId })

    if (!doc) throw new Error(`Board circular ${docId} not found`)

    if (doc.parsedText && doc.extractionStatus === 'parsed') {
      return {
        output: {
          success: true,
          message: 'Document already parsed',
          parsedTextLength: doc.parsedText.length,
        },
      }
    }

    if (!doc.s3Key) throw new Error('Document has no S3 key')

    await payload.update({
      collection: 'board-circulars',
      id: docId,
      data: { extractionStatus: 'parsing' },
    })

    const buffer = await MinioService.getFile(doc.s3Key)
    const file = new File([buffer], doc.s3Key, { type: 'application/pdf' })

    const result = await PdfParserService.parse(file)
    const parsedText = result.pages.map((p: { content: string }) => p.content).join('\n\n')

    await payload.update({
      collection: 'board-circulars',
      id: docId,
      data: {
        parsedText,
        extractionStatus: 'parsed',
      },
    })

    return {
      output: {
        success: true,
        message: 'Board circular parsed successfully',
        parsedTextLength: parsedText.length,
      },
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    payload.logger.error(`Error ingesting board circular: ${message}`)

    try {
      await payload.update({
        collection: 'board-circulars',
        id: input.docId,
        data: { extractionStatus: 'error', errorMessage: message },
      })
    } catch { /* best effort */ }

    return { output: { success: false, message } }
  }
}
