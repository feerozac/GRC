import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { handlePreflight, corsHeaders } from '@/lib/cors'

export const OPTIONS = handlePreflight

/**
 * Fetches all GRC extraction results for a given pipeline run.
 * This endpoint doesn't require Payload auth, so the Netlify frontend
 * can fetch results without a login step.
 *
 * GET /api/grc-results?runId=RUN-xxx
 */
export const GET = async (req: Request) => {
  const headers = corsHeaders(req)

  try {
    const payload = await getPayload({ config: configPromise })
    const url = new URL(req.url)
    const runId = url.searchParams.get('runId')

    if (!runId) {
      return Response.json({ error: 'Missing runId query parameter' }, { status: 400, headers })
    }

    const runs = await payload.find({
      collection: 'pipeline-runs',
      where: { runId: { equals: runId } },
      limit: 1,
    })

    if (runs.docs.length === 0) {
      return Response.json({ error: `Run ${runId} not found` }, { status: 404, headers })
    }

    const run = runs.docs[0] as any
    const traceId = run.traceId

    // Extract numeric docId from polymorphic relationship (handles both
    // populated objects and raw IDs)
    const sourceDoc = run.sourceDocument
    let docId: number | string | undefined
    if (sourceDoc && typeof sourceDoc === 'object') {
      const val = sourceDoc.value
      docId = val && typeof val === 'object' ? val.id : val
    } else {
      docId = sourceDoc
    }

    const [objectives, riskStatements, gaps, drafts] = await Promise.all([
      docId
        ? payload.find({
            collection: 'governance-objectives',
            where: { 'sourceDocument.value': { equals: docId } },
            limit: 100,
            depth: 0,
          })
        : Promise.resolve({ docs: [] as any[] }),

      docId
        ? payload.find({
            collection: 'risk-appetite-statements',
            where: { 'sourceDocument.value': { equals: docId } },
            limit: 100,
            depth: 0,
          })
        : Promise.resolve({ docs: [] as any[] }),

      traceId
        ? payload.find({
            collection: 'policy-gap-analyses',
            where: { sourceRun: { equals: traceId } },
            limit: 100,
            depth: 0,
          })
        : Promise.resolve({ docs: [] as any[] }),

      traceId
        ? payload.find({
            collection: 'policy-drafts',
            where: { sourceRun: { equals: traceId } },
            limit: 100,
            depth: 0,
          })
        : Promise.resolve({ docs: [] as any[] }),
    ])

    const objectiveIds = objectives.docs.map((o: any) => o.id)
    const controls = objectiveIds.length > 0
      ? await payload.find({
          collection: 'control-objectives',
          where: { governanceObjective: { in: objectiveIds } },
          limit: 200,
          depth: 0,
        })
      : { docs: [] as any[] }

    return Response.json({
      runId,
      traceId,
      docId,
      objectives: objectives.docs,
      riskStatements: riskStatements.docs,
      controls: controls.docs,
      gaps: gaps.docs,
      drafts: drafts.docs,
    }, { headers })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return Response.json({ error: message }, { status: 500, headers })
  }
}
