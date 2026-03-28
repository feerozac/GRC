import { Field, Payload, PayloadRequest, TypeWithID, RunningJob, RunTaskFunctions, RunInlineTaskFunction, WorkflowConfig } from 'payload'
import { z } from 'zod'
import { controlIntoText } from '@/server/handlers/authoritative-doc/common/utils'
import { langfuse } from '@/server/llm/observability/langfuse'
import { TestCase, TestRun, TestSuite, DevPanel, AuthoritativeDocument, InputFile } from '@/payload-types'
import { type TestCaseResult } from '@/server/jobs/tasks/evaluate-test-case'

// Define the input schema for the workflow
export const processTestRunInputSchema: Field[] = [
  {
    name: 'traceId',
    type: 'text',
    required: true,
  },
  {
    name: 'currentTestRun',
    type: 'relationship',
    relationTo: 'test-runs',
    required: true,
    maxDepth: 1,
  },
  {
    name: 'choosedAuthoritativeDocument',
    type: 'relationship',
    relationTo: 'authoritative-documents',
    required: true,
    maxDepth: 1,
  },
  {
    name: 'choosedTestSuites',
    type: 'relationship',
    relationTo: 'test-suites',
    required: true,
    hasMany: true,
    maxDepth: 1,
  },
]

// Define the workflow object directly
export const processTestRunWorkflow = {
  slug: 'process-test-run',
  label: 'Process Test Run',
  inputSchema: processTestRunInputSchema,
  // Define handler with explicit parameter types
  handler: async ({ job, tasks, req }) => {
    const { traceId, currentTestRun, choosedAuthoritativeDocument, choosedTestSuites } = job.input
    const payload = req.payload

    const authoritativeDocument = choosedAuthoritativeDocument as AuthoritativeDocument
    const testRun = currentTestRun as TestRun
    const testSuites = choosedTestSuites as TestSuite[]
    const userDocumentFiles = testRun.input as InputFile[]
    const userDocument = userDocumentFiles.map(d => d.parsedText).join('\n')

    const trace = langfuse.trace({
      id: traceId,
      name: `test-run-workflow-${authoritativeDocument.docType}`,
      input: {
        testRun: testRun.title,
        choosedTestSuites: testSuites.map(s => s.title),
      },
    })

    payload.logger.info(`Processing test run ${testRun.title} with authoritative document ${authoritativeDocument.id}`)

    try {
      const devPanel = await payload.findGlobal({
        slug: 'dev-panel',
      })

      const limitTests = devPanel.limitTests

      // Get the configurable batch size from the dev-panel global with fallback
      const DEFAULT_BATCH_SIZE = 5
      // Type casting since workflowBatchSize is not yet in the DevPanel type
      const configuredBatchSize = (devPanel as DevPanel & { workflowBatchSize?: number }).workflowBatchSize
      // Use default if configured value is undefined, null, or not a positive number
      const processingBatchSize = configuredBatchSize && configuredBatchSize > 0 ? configuredBatchSize : DEFAULT_BATCH_SIZE

      for (const suite of testSuites) {
        const allSuiteCases = suite.testCases?.docs as TestCase[]
        const testCasesList = allSuiteCases.slice(0, limitTests ? 3 : undefined)

        if (testCasesList.length === 0) {
          continue
        }

        const suiteResults: TestCaseResult[] = []
        for (let i = 0; i < testCasesList.length; i += processingBatchSize) {
          const batchCases = testCasesList.slice(i, i + processingBatchSize)

          const batchResultsPromises = batchCases.map(async (testCase: TestCase & TypeWithID) => {
            const controlText = controlIntoText({
              id: testCase.id,
              title: testCase.title,
              content: testCase.content || null,
            })
            const methodology = testCase.methodology

            if (!methodology) {
              payload.logger.error(`Methodology missing for test case: ${testCase.id}. Skipping this test case.`)
              return null // Return null to indicate this test case should be skipped
            }

            const taskId = `${testCase.id}-${job.id}`

            try {
              // Await the task completion, but don't rely on its direct return value
              const taskResult = await tasks['evaluate-test-case'](taskId, {
                input: {
                  userDocument,
                  controlText,
                  methodology,
                  traceId,
                  testCaseId: testCase.id,
                },
              })

              if (!taskResult) {
                payload.logger.error(`!!! taskResult is falsy in job.taskStatus for case ${testCase.id}, taskId ${taskId} !!!`)
                throw new Error(`Task 'evaluate-test-case' result not found in job.taskStatus for case ${testCase.id}`)
              }

              return taskResult // Return the retrieved result
            } catch (taskError) {
              payload.logger.error({ err: taskError }, `Task 'evaluate-test-case' failed for case ${testCase.id}, taskId ${taskId}`)
              throw taskError
            }
          })

          // Resolve all promises for the batch
          const batchResults = await Promise.all(batchResultsPromises)

          // Filter out any null results (skipped test cases without methodology)
          const validBatchResults = batchResults.filter(result => result !== null) as TestCaseResult[]

          suiteResults.push(...validBatchResults)

          // Fetch the *latest* state before updating, as job.taskStatus might not be instantly reflected
          const currentTestState = await payload.findByID({
            collection: 'test-runs',
            id: testRun.id,
          })

          const currentResults = [...(currentTestState.result || [])]
          const suiteIndex = currentResults.findIndex(res => res.suites?.suite === suite.id)

          if (suiteIndex > -1) {
            // Ensure the suites object exists before accessing cases
            if (currentResults[suiteIndex].suites) {
              const existingCases = currentResults[suiteIndex].suites.cases || []
              const existingCaseIds = new Set(existingCases.map(c => c.case))
              // Filter to get only unique results not already in the test
              const newUniqueResults = suiteResults.filter(sr => sr && sr.case && !existingCaseIds.has(sr.case))
              currentResults[suiteIndex].suites.cases = [...existingCases, ...newUniqueResults]
            } else {
              // This case should ideally not happen if suiteIndex > -1, but handle defensively
              payload.logger.warn(`Suite found at index ${suiteIndex} but suites property is missing. Re-adding suite.`)
              currentResults[suiteIndex] = {
                suites: {
                  suite: suite.id,
                  cases: suiteResults,
                },
              }
            }
          } else {
            currentResults.push({
              suites: {
                suite: suite.id,
                cases: suiteResults,
              },
            })
          }

          await payload.update({
            collection: 'test-runs',
            id: testRun.id,
            data: {
              result: currentResults,
              status: 'PENDING',
            },
          })

          trace.update({
            output: {
              batchComplete: i + batchCases.length,
              totalCasesInSuite: testCasesList.length,
              suite: suite.title,
            },
          })
        }
      }

      await payload.update({
        collection: 'test-runs',
        id: testRun.id,
        data: { status: 'COMPLETED' },
      })

      trace.update({ output: { status: 'COMPLETED' } })
      payload.logger.info(`Workflow for TestRun ${testRun.id} completed successfully.`)
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      payload.logger.error(`Error in process-test-run workflow for TestRun ${testRun.id}: ${errorMessage}`)

      try {
        await payload.update({
          collection: 'test-runs',
          id: testRun.id,
          data: { status: 'FAILED' as TestRun['status'] },
        })
      } catch (updateError) {
        payload.logger.error({ err: updateError }, `Failed to update TestRun ${testRun.id} status to FAILED`)
      }

      trace.update({ output: { status: 'FAILED', error: errorMessage } })
      // Re-throw the original error to ensure the job runner knows it failed
      throw error
    }
  },
} as WorkflowConfig<'process-test-run'>

export default processTestRunWorkflow
