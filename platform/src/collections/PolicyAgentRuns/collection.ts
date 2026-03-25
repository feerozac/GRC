import { CollectionConfig } from 'payload'
import runHandler from './api/run/handler'
import statusHandler from './api/status/handler'

export const PolicyAgentRunsCollection: CollectionConfig = {
  slug: 'policy-agent-runs',
  admin: {
    useAsTitle: 'title',
    group: 'Policy Agent',
  },
  endpoints: [
    {
      path: '/:id/run',
      method: 'post',
      handler: runHandler,
    },
    {
      path: '/:id/status',
      method: 'get',
      handler: statusHandler,
    },
  ],
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: () => `Policy Agent Run — ${new Date().toISOString().slice(0, 16)}`,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Created', value: 'created' },
        { label: 'Running', value: 'running' },
        { label: 'Completed', value: 'completed' },
        { label: 'Error', value: 'error' },
      ],
      defaultValue: 'created',
      required: true,
    },
    {
      name: 'currentStep',
      type: 'select',
      options: [
        { label: 'Not Started', value: 'not_started' },
        { label: '1. Extract Objectives', value: 'extract_objectives' },
        { label: '2. Research Frameworks', value: 'research_frameworks' },
        { label: '3. Gap Analysis', value: 'gap_analysis' },
        { label: '4. Draft Policies', value: 'draft_policies' },
        { label: '5. Route for Review', value: 'route_for_review' },
        { label: 'Complete', value: 'complete' },
      ],
      defaultValue: 'not_started',
    },
    {
      name: 'stepResults',
      type: 'json',
      admin: { readOnly: true },
    },
    {
      name: 'errorMessage',
      type: 'text',
      admin: {
        condition: (data) => data.status === 'error',
      },
    },
    {
      name: 'startedAt',
      type: 'date',
    },
    {
      name: 'completedAt',
      type: 'date',
    },
    {
      name: 'documents',
      type: 'join',
      collection: 'policy-documents',
      on: 'run',
    },
  ],
}
