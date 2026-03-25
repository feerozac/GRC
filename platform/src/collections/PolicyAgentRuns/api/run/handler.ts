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
  })

  if (!run) {
    return new Response(JSON.stringify({ error: 'Policy agent run not found' }), {
      headers: corsHeaders,
      status: 404,
    })
  }

  if (run.status === 'running') {
    return new Response(JSON.stringify({ error: 'This run is already in progress' }), {
      headers: corsHeaders,
      status: 409,
    })
  }

  const { docs: processedDocs } = await req.payload.find({
    collection: 'policy-documents',
    where: {
      run: { equals: id },
      ingestStatus: { equals: 'processed' },
    },
    limit: 1,
  })

  if (processedDocs.length === 0) {
    return new Response(
      JSON.stringify({ error: 'No processed documents found for this run. Upload and ingest documents first.' }),
      { headers: corsHeaders, status: 422 },
    )
  }

  try {
    await req.payload.update({
      collection: 'policy-agent-runs',
      id: id as string,
      data: {
        status: 'running',
        currentStep: 'extract_objectives',
        startedAt: new Date().toISOString(),
        errorMessage: '',
      },
    })

    await req.payload.jobs.queue({
      task: 'extract-policy-objectives',
      input: { runId: String(id) },
    })

    return new Response(
      JSON.stringify({
        ok: true,
        runId: id,
        message: 'Policy agent pipeline started. Step 1: Extracting objectives.',
        currentStep: 'extract_objectives',
      }),
      { headers: corsHeaders, status: 202 },
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    req.payload.logger.error(`Error starting policy agent run ${id}: ${message}`)

    try {
      await req.payload.update({
        collection: 'policy-agent-runs',
        id: id as string,
        data: { status: 'error', errorMessage: message },
      })
    } catch { /* best effort */ }

    return new Response(JSON.stringify({ error: message }), {
      headers: corsHeaders,
      status: 500,
    })
  }
}

export default handler
