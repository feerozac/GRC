import { File } from 'formdata-node'
import { Field, Payload, TaskHandler } from 'payload'
import { MinioService } from '@/server/services/storage/minio'
import { PdfParserService } from '@/server/services/pdf-parser/zerox'
import { extractTextFromPdfBuffer } from '@/server/services/pdf-parser/local'

const MAX_STORED_TEXT = 500_000

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

    if (doc.parsedText) {
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

    let parsedText: string
    try {
      const file = new File([buffer], doc.s3Key, { type: 'application/pdf' })
      const result = await PdfParserService.parse(file)
      parsedText = result.pages.map((p: { content: string }) => p.content).join('\n\n')
    } catch (zeroxError) {
      payload.logger.warn(
        `Zerox failed for board circular ${docId}, falling back to local PDF parser: ${zeroxError}`,
      )
      parsedText = await extractTextFromPdfBuffer(buffer)
    }

    if (parsedText.length > MAX_STORED_TEXT) {
      payload.logger.info(
        `Truncating parsedText for board circular ${docId}: ${parsedText.length} → ${MAX_STORED_TEXT} chars`,
      )
      parsedText = parsedText.slice(0, MAX_STORED_TEXT)
    }

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
