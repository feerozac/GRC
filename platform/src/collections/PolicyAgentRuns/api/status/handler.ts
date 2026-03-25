import { PayloadRequest } from 'payload'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': '*',
  'Content-Type': 'application/json',
}

const handler = async (req: PayloadRequest) => {
  const id = req.routeParams?.id

  if (!id) {
    return new Response(JSON.stringify({ error: 'No run id provided' }), {
      headers: corsHeaders,
      status: 400,
    })
  }

  const run = await req.payload.findByID({
    collection: 'policy-agent-runs',
    id: id as string,
    depth: 0,
  })

  if (!run) {
    return new Response(JSON.stringify({ error: 'Policy agent run not found' }), {
      headers: corsHeaders,
      status: 404,
    })
  }

  return new Response(
    JSON.stringify({
      id: run.id,
      title: run.title,
      status: run.status,
      currentStep: run.currentStep,
      stepResults: run.stepResults,
      startedAt: run.startedAt,
      completedAt: run.completedAt,
      errorMessage: run.errorMessage,
    }),
    { headers: corsHeaders, status: 200 },
  )
}

export default handler
