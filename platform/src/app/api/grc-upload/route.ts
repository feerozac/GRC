import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { handlePreflight, corsHeaders } from '@/lib/cors'
import { MinioService } from '@/server/services/storage/minio'

export const OPTIONS = handlePreflight

export const POST = async (req: Request) => {
  const headers = corsHeaders(req)

  try {
    const payload = await getPayload({ config: configPromise })
    const formData = await req.formData()

    const file = formData.get('file')
    const collectionSlug = formData.get('collectionSlug') as string
    const title = formData.get('title') as string

    if (!file || !(file instanceof File)) {
      return Response.json({ error: 'No file provided' }, { status: 400, headers })
    }

    const validSlugs = ['board-circulars', 'annual-reports']
    if (!collectionSlug || !validSlugs.includes(collectionSlug)) {
      return Response.json(
        { error: `Invalid collectionSlug. Must be one of: ${validSlugs.join(', ')}` },
        { status: 400, headers },
      )
    }

    const docTitle = title || file.name.replace(/\.pdf$/i, '')

    const doc = await payload.create({
      collection: collectionSlug as 'board-circulars' | 'annual-reports',
      data: {
        title: docTitle,
        extractionStatus: 'pending',
      },
    })

    const buffer = Buffer.from(await file.arrayBuffer())
    const s3Key = `${collectionSlug}/${doc.id}/${file.name}`
    await MinioService.uploadFile(s3Key, buffer)
    const s3Url = `${process.env.MINIO_URL || 'http://localhost:9000'}/${s3Key}`

    await payload.update({
      collection: collectionSlug as 'board-circulars' | 'annual-reports',
      id: doc.id,
      data: { s3Key, s3Url },
    })

    return Response.json(
      { id: doc.id, title: docTitle, s3Key, collectionSlug },
      { status: 201, headers },
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return Response.json({ error: message }, { status: 500, headers })
  }
}
