import { PDFParse } from 'pdf-parse'

/**
 * Extract text from a PDF buffer using pdf-parse (pure Node.js, no external
 * service required). Used as a fallback when the Zerox vision service is
 * unavailable. Works well for text-based PDFs; scanned/image PDFs will
 * return empty text.
 */
export async function extractTextFromPdfBuffer(buffer: Buffer): Promise<string> {
  // pdf-parse v2 marks `load` as private in types but it's the required
  // entry point at runtime. Use `any` to bypass the type restriction.
  const parser: any = new PDFParse(new Uint8Array(buffer))
  await parser.load()
  const result = await parser.getText()
  return result.text as string
}
