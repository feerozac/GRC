import { PayloadRequest } from 'payload'
import { MinioService } from '@/server/services/storage/minio'
import crypto from 'node:crypto'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': '*',
  'Content-Type': 'application/json',
}

const calculateFileHash = (buffer: Buffer) => {
  return crypto.createHash('sha256').update(buffer).digest('hex')
}

const handler = async (req: PayloadRequest) => {
  const id = req.routeParams?.id

  if (!id) {
    return new Response(JSON.stringify({ error: 'No id provided' }), {
      headers: corsHeaders,
      status: 400,
    })
  }

  const formData = await (req as Request).formData()
  const file = formData?.get('file')

  if (!file || !(file instanceof File)) {
    return new Response(JSON.stringify({ error: 'No file provided' }), {
      headers: corsHeaders,
      status: 400,
    })
  }

  const doc = await req.payload.findByID({
    collection: 'policy-documents',
    id: id as string,
  })

  if (!doc) {
    return new Response(JSON.stringify({ error: 'Policy document not found' }), {
      headers: corsHeaders,
      status: 404,
    })
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer())
    const fileHash = calculateFileHash(buffer)

    const existing = await req.payload.find({
      collection: 'policy-documents',
      where: { hash: { equals: fileHash } },
      limit: 1,
    })

    if (existing.docs.length > 0 && existing.docs[0].parsedText) {
      await req.payload.update({
        collection: 'policy-documents',
        id: doc.id,
        data: {
          hash: fileHash,
          parsedText: existing.docs[0].parsedText,
          s3Url: existing.docs[0].s3Url,
          s3Key: existing.docs[0].s3Key,
          fileType: file.type,
          ingestStatus: 'processed',
          pageCount: existing.docs[0].pageCount,
        },
      })

      return new Response(JSON.stringify({ ok: true, reused: true, docId: doc.id }), {
        headers: corsHeaders,
        status: 200,
      })
    }

    const s3Key = `policy-documents/${doc.id}/${file.name}`
    await MinioService.uploadFile(s3Key, buffer)
    const s3Url = `${process.env.MINIO_URL}/${s3Key}`

    await req.payload.update({
      collection: 'policy-documents',
      id: doc.id,
      data: {
        hash: fileHash,
        s3Key,
        s3Url,
        fileType: file.type,
        ingestStatus: 'processing',
      },
    })

    await req.payload.jobs.queue({
      task: 'ingest-policy-document',
      input: { docId: String(doc.id) },
    })

    return new Response(
      JSON.stringify({ ok: true, docId: doc.id, message: 'Upload complete. Parsing queued.' }),
      { headers: corsHeaders, status: 202 },
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    req.payload.logger.error(`Policy document upload error: ${message}`)

    try {
      await req.payload.update({
        collection: 'policy-documents',
        id: doc.id,
        data: { ingestStatus: 'error', errorMessage: message },
      })
    } catch { /* best effort */ }

    return new Response(JSON.stringify({ error: message }), {
      headers: corsHeaders,
      status: 500,
    })
  }
}

export default handler
