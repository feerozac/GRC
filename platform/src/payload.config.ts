// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig, WorkflowHandler } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { migrations } from '@/server/db/migrations'
import { DevPanel } from '@/globals/DevPanel'
import { Users } from '@/collections/Users/collection'
import { AuthoritativeDocumentsCollection } from '@/collections/AuthoritativeDocuments/collection'
import { TestCasesCollection } from '@/collections/TestCases/collection'
import { TestSuitesCollection } from '@/collections/TestSuites/collection'
import { TestRunsCollection } from '@/collections/TestRuns/collection'
import { InputFilesCollection } from '@/collections/InputFiles/collection'
import { FrameworksCollection } from '@/collections/Frameworks/collection'
import { BoardCircularsCollection } from '@/collections/BoardCirculars/collection'
import { AnnualReportsCollection } from '@/collections/AnnualReports/collection'
import { GovernanceObjectivesCollection } from '@/collections/GovernanceObjectives/collection'
import { ControlObjectivesCollection } from '@/collections/ControlObjectives/collection'
import { RiskAppetiteStatementsCollection } from '@/collections/RiskAppetiteStatements/collection'
import { DecisionLogsCollection } from '@/collections/DecisionLogs/collection'
import { AuditTrailEntriesCollection } from '@/collections/AuditTrailEntries/collection'
import { PolicyAgentRunsCollection } from '@/collections/PolicyAgentRuns/collection'
import { PolicyDocumentsCollection } from '@/collections/PolicyDocuments/collection'
import {
  ingestAuthoritativeDocumentHandler,
  ingestAuthoritativeDocumentInputSchema,
  ingestAuthoritativeDocumentOutputSchema,
} from '@/server/jobs/tasks/ingestAuthoritativeDocument'
import { seedDatabase } from '@/server/db/seeds/onInit'
import { evaluateTestCaseHandler, evaluateTestCaseInputSchema, evaluateTestCaseOutputSchema } from '@/server/jobs/tasks/evaluate-test-case'
import { processTestRunWorkflow, processTestRunInputSchema } from '@/server/jobs/workflows/process-test-run'
import {
  ingestBoardCircularHandler,
  ingestBoardCircularInputSchema,
  ingestBoardCircularOutputSchema,
} from '@/server/jobs/tasks/ingest-board-circular'
import {
  ingestAnnualReportHandler,
  ingestAnnualReportInputSchema,
  ingestAnnualReportOutputSchema,
} from '@/server/jobs/tasks/ingest-annual-report'
import {
  extractGovernanceObjectivesHandler,
  extractGovernanceObjectivesInputSchema,
  extractGovernanceObjectivesOutputSchema,
} from '@/server/jobs/tasks/extract-governance-objectives'
import {
  extractControlObjectivesHandler,
  extractControlObjectivesInputSchema,
  extractControlObjectivesOutputSchema,
} from '@/server/jobs/tasks/extract-control-objectives'
import {
  extractRiskAppetiteHandler,
  extractRiskAppetiteInputSchema,
  extractRiskAppetiteOutputSchema,
} from '@/server/jobs/tasks/extract-risk-appetite'
import {
  mapToFrameworkHandler,
  mapToFrameworkInputSchema,
  mapToFrameworkOutputSchema,
} from '@/server/jobs/tasks/map-to-framework'
import {
  ingestPolicyDocumentHandler,
  ingestPolicyDocumentInputSchema,
  ingestPolicyDocumentOutputSchema,
} from '@/server/jobs/tasks/ingest-policy-document'
import {
  processGrcExtractionWorkflow,
  processGrcExtractionInputSchema,
} from '@/server/jobs/workflows/process-grc-extraction'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  collections: [
    Users,
    AuthoritativeDocumentsCollection,
    TestSuitesCollection,
    TestCasesCollection,
    TestRunsCollection,
    InputFilesCollection,
    FrameworksCollection,
    BoardCircularsCollection,
    AnnualReportsCollection,
    GovernanceObjectivesCollection,
    ControlObjectivesCollection,
    RiskAppetiteStatementsCollection,
    DecisionLogsCollection,
    AuditTrailEntriesCollection,
    PolicyAgentRunsCollection,
    PolicyDocumentsCollection,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    prodMigrations: migrations,
    migrationDir: path.resolve(dirname, 'server/db/migrations'),
    beforeSchemaInit: [
      ({ schema, adapter }) => {
        for (const tableName in adapter.rawTables) {
          const table = adapter.rawTables[tableName]

          for (const fieldName in table.columns) {
            const column = table.columns[fieldName]

            if (column.type === 'enum') {
              ;(column as any).type = 'varchar'
            }
          }
        }
        return schema
      },
    ],
  }),
  sharp,
  globals: [DevPanel],
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  onInit: async payload => {
    await seedDatabase(payload)
  },
  jobs: {
    deleteJobOnComplete: false,
    addParentToTaskLog: true,
    jobsCollectionOverrides: ({ defaultJobsCollection }) => {
      if (!defaultJobsCollection.admin) {
        defaultJobsCollection.admin = {}
      }
      defaultJobsCollection.admin.hidden = false
      return defaultJobsCollection
    },
    tasks: [
      {
        slug: 'ingest-authoritative-document',
        handler: ingestAuthoritativeDocumentHandler,
        label: 'Ingest Authoritative Document',
        inputSchema: ingestAuthoritativeDocumentInputSchema,
        outputSchema: ingestAuthoritativeDocumentOutputSchema,
        retries: 2,
      },
      {
        slug: 'evaluate-test-case',
        handler: evaluateTestCaseHandler,
        label: 'Evaluate Test Case',
        inputSchema: evaluateTestCaseInputSchema,
        outputSchema: evaluateTestCaseOutputSchema,
        retries: 2,
      },
      {
        slug: 'ingest-board-circular',
        handler: ingestBoardCircularHandler,
        label: 'Ingest Board Circular',
        inputSchema: ingestBoardCircularInputSchema,
        outputSchema: ingestBoardCircularOutputSchema,
        retries: 2,
      },
      {
        slug: 'ingest-annual-report',
        handler: ingestAnnualReportHandler,
        label: 'Ingest Annual Report',
        inputSchema: ingestAnnualReportInputSchema,
        outputSchema: ingestAnnualReportOutputSchema,
        retries: 2,
      },
      {
        slug: 'extract-governance-objectives',
        handler: extractGovernanceObjectivesHandler,
        label: 'Extract Governance Objectives',
        inputSchema: extractGovernanceObjectivesInputSchema,
        outputSchema: extractGovernanceObjectivesOutputSchema,
        retries: 2,
      },
      {
        slug: 'extract-control-objectives',
        handler: extractControlObjectivesHandler,
        label: 'Extract Control Objectives',
        inputSchema: extractControlObjectivesInputSchema,
        outputSchema: extractControlObjectivesOutputSchema,
        retries: 2,
      },
      {
        slug: 'extract-risk-appetite',
        handler: extractRiskAppetiteHandler,
        label: 'Extract Risk Appetite Statements',
        inputSchema: extractRiskAppetiteInputSchema,
        outputSchema: extractRiskAppetiteOutputSchema,
        retries: 2,
      },
      {
        slug: 'map-to-framework',
        handler: mapToFrameworkHandler,
        label: 'Map to Framework Controls',
        inputSchema: mapToFrameworkInputSchema,
        outputSchema: mapToFrameworkOutputSchema,
        retries: 2,
      },
      {
        slug: 'ingest-policy-document',
        handler: ingestPolicyDocumentHandler,
        label: 'Ingest Policy Document',
        inputSchema: ingestPolicyDocumentInputSchema,
        outputSchema: ingestPolicyDocumentOutputSchema,
        retries: 2,
      },
    ],
    workflows: [
      {
        slug: 'process-test-run',
        handler: processTestRunWorkflow.handler,
        label: 'Process Test Run',
        inputSchema: processTestRunInputSchema,
        retries: 2,
      },
      {
        slug: 'process-grc-extraction',
        handler: processGrcExtractionWorkflow.handler,
        label: 'Process GRC Extraction',
        inputSchema: processGrcExtractionInputSchema,
        retries: 2,
      },
    ],
    // Automatically run jobs every minute on the default queue
    autoRun: [
      {
        cron: '* * * * *', // Run every minute
        limit: 10, // Process up to 10 jobs per run
        queue: 'default', // Target the default queue
      },
    ],
    // Optional: Add access control if needed, but autoRun handles execution here
    // access: { ... }
  },
})
