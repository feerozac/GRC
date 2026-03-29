import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { handlePreflight } from '@/lib/cors'

export const OPTIONS = handlePreflight

/**
 * Fetches all GRC extraction results for a given pipeline run.
 * This endpoint doesn't require Payload auth, so the Netlify frontend
 * can fetch results without a login step.
 *
 * GET /api/grc-results?runId=RUN-xxx
 */
export const GET = async (req: Request) => {
  try {
    const payload = await getPayload({ config: configPromise })
    const url = new URL(req.url)
    const runId = url.searchParams.get('runId')

    if (!runId) {
      return Response.json({ error: 'Missing runId query parameter' }, { status: 400 })
    }

    const runs = await payload.find({
      collection: 'pipeline-runs',
      where: { runId: { equals: runId } },
      limit: 1,
    })

    if (runs.docs.length === 0) {
      return Response.json({ error: `Run ${runId} not found` }, { status: 404 })
    }

    const run = runs.docs[0] as any
    const traceId = run.traceId
    const sourceDoc = run.sourceDocument
    const docId = typeof sourceDoc === 'object' ? sourceDoc?.value : sourceDoc

    const [objectives, riskStatements, controls, gaps, drafts] = await Promise.all([
      docId
        ? payload.find({
            collection: 'governance-objectives',
            where: { 'sourceDocument.value': { equals: docId } },
            limit: 100,
          })
        : Promise.resolve({ docs: [] }),

      docId
        ? payload.find({
            collection: 'risk-appetite-statements',
            where: { 'sourceDocument.value': { equals: docId } },
            limit: 100,
          })
        : Promise.resolve({ docs: [] }),

      payload.find({
        collection: 'control-objectives',
        limit: 200,
      }),

      traceId
        ? payload.find({
            collection: 'policy-gap-analyses',
            where: { sourceRun: { equals: traceId } },
            limit: 100,
          })
        : Promise.resolve({ docs: [] }),

      traceId
        ? payload.find({
            collection: 'policy-drafts',
            where: { sourceRun: { equals: traceId } },
            limit: 100,
          })
        : Promise.resolve({ docs: [] }),
    ])

    return Response.json({
      runId,
      traceId,
      docId,
      objectives: objectives.docs,
      riskStatements: riskStatements.docs,
      controls: controls.docs,
      gaps: gaps.docs,
      drafts: drafts.docs,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return Response.json({ error: message }, { status: 500 })
  }
}
