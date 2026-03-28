import { PayloadRequest, type Field, type TaskHandler } from 'payload'
import { z } from 'zod'
import { evaluateUserInput } from '@/server/llm/workflows/user-input/evaluate-user-input'
import { TestCase, TestRun } from '@/payload-types'
import { testRunResultFields } from '@/collections/TestRuns/collection'

// Define the input schema for the task
export const evaluateTestCaseInputSchema: Field[] = [
  {
    name: 'userDocument',
    type: 'text',
    required: true,
  },
  {
    name: 'controlText',
    type: 'text',
    required: true,
  },
  {
    name: 'methodology',
    type: 'text',
    required: true,
  },
  {
    name: 'traceId',
    type: 'text',
    required: true,
  },
  {
    name: 'testCaseId',
    type: 'text',
    required: true,
  },
]

// Define the output schema for the task
export const evaluateTestCaseOutputSchema: Field[] = testRunResultFields

export type TestCaseResult = NonNullable<NonNullable<NonNullable<TestRun['result']>[0]['suites']>['cases']>[0]

// Using types extracted from TestRun result structure in payload-types.ts
export const evaluateTestCaseHandler: TaskHandler<'evaluate-test-case'> = async ({ input, req }): Promise<{ output: TestCaseResult }> => {
  // Extract inputs
  const { userDocument, controlText, methodology, traceId, testCaseId } = input

  // Call the evaluateUserInput function
  const evaluationResult = await evaluateUserInput({
    userDocument,
    control: controlText,
    methodology: methodology,
    traceId,
    testCaseId,
  })

  // Transform the result to match the expected structure for a TestCaseResult
  // Using the structure from TestRun.result.suites.cases in payload-types.ts
  const result: TestCaseResult = {
    case: testCaseId,
    summary: {
      status: evaluationResult.summary.status as 'COMPLIANT' | 'PARTIALLY_COMPLIANT' | 'NON_COMPLIANT',
      confidenceLevel: evaluationResult.summary.confidenceLevel,
      briefing: evaluationResult.summary.briefing,
    },
    gaps: evaluationResult.gaps.map(gap => ({
      title: gap.title,
      description: gap.description,
      severity: gap.severity as 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW',
      documentEvidence: gap.documentEvidence.map(evidence => ({
        citation: evidence.citation,
        location: evidence.location,
        context: evidence.context,
      })),
      controlEvidence: gap.controlEvidence.map(evidence => ({
        citation: evidence.citation,
        location: evidence.location,
        context: evidence.context,
      })),
      impact: {
        security: gap.impact.security,
        compliance: gap.impact.compliance,
        operational: gap.impact.operational,
      },
      recommendation: {
        description: gap.recommendation.description,
        priority: gap.recommendation.priority as 'HIGH' | 'MEDIUM' | 'LOW',
        steps: gap.recommendation.steps.map(step => ({
          step,
        })),
      },
    })),
    overallRecommendations: {
      priority: evaluationResult.overallRecommendations.priority as 'HIGH' | 'MEDIUM' | 'LOW',
      dependencies: evaluationResult.overallRecommendations.dependencies.map(d => ({
        dependency: d,
      })),
    },
  }

  // Log successful completion
  req.payload.logger.info({ traceId, testCaseId }, `Completed test case evaluation for case: ${testCaseId}`)

  // Return the result wrapped in an 'output' object
  return { output: result }
}
