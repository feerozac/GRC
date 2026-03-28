import crypto from 'crypto'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { handlePreflight } from '@/lib/cors'

export const OPTIONS = handlePreflight

export const POST = async (
  req: Request,
  { params }: { params: Promise<{ draftId: string }> },
) => {
  const { draftId } = await params

  try {
    const payload = await getPayload({ config: configPromise })
    const body = await req.json()

    const { userId, userName, rationale } = body

    if (!userId || !rationale) {
      return Response.json(
        { error: 'Missing required fields: userId, rationale' },
        { status: 400 },
      )
    }

    const draft = await payload.findByID({ collection: 'policy-drafts', id: draftId }) as any

    if (!draft) {
      return Response.json({ error: `Draft ${draftId} not found` }, { status: 404 })
    }

    const challengeId = `CHG-${crypto.randomUUID().slice(0, 8)}`

    const challenge = await payload.create({
      collection: 'challenges',
      data: {
        challengeId,
        policyDraft: parseInt(draftId, 10) || (draftId as any),
        challengedBy: userName || userId,
        rationale,
        status: 'open',
      },
    })

    await payload.update({
      collection: 'policy-drafts',
      id: draftId,
      data: { status: 'in-review' },
    })

    await payload.create({
      collection: 'decision-logs',
      data: {
        traceId: draft.sourceRun || `manual-${draftId}`,
        action: `Challenge raised on policy draft: ${draft.policyName} ${draft.version}`,
        entityType: 'policy-draft',
        entityId: draft.draftId,
        agentType: 'human_review',
        input: { userId, draftId: draft.draftId, rationale },
        output: { challengeId, status: 'open' },
        reasoning: rationale,
        confidence: draft.overallConfidence,
      },
    })

    await payload.create({
      collection: 'audit-trail-entries',
      data: {
        traceId: draft.sourceRun || `manual-${draftId}`,
        eventType: 'policy_challenge_raised',
        entityType: 'policy-drafts',
        entityId: draft.draftId,
        actor: { type: 'user', agentName: userName || userId },
        details: {
          challengeId,
          policyName: draft.policyName,
          rationale,
          challengedBy: userName || userId,
        },
      },
    })

    return Response.json({
      message: 'Challenge raised successfully',
      challengeId,
      draftId: draft.draftId,
      status: 'open',
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return Response.json({ error: message }, { status: 500 })
  }
}
