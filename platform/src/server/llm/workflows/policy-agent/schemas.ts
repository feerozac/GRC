import { z } from 'zod'

export const PolicyObjectiveSchema = z.object({
  theme: z.string().describe('Concise theme of the governance objective (e.g. "Data Encryption Standards", "Third-Party Risk Oversight")'),
  category: z.enum(['Risk', 'Compliance', 'Operational', 'Ethics', 'Strategic', 'Governance']),
  description: z.string().describe('Full extracted objective text from the source document'),
  sourceRef: z.string().describe('Page number, section heading, or document title where this objective was found'),
  sourceDocTitle: z.string().describe('Title of the source document'),
  confidence: z.number().min(0).max(100).describe('Confidence score 0-100 indicating how explicitly the document states this as a governance objective'),
  keywords: z.array(z.string()).describe('Governance domain keywords found in or related to the objective'),
})

export const PolicyObjectivesResponseSchema = z.object({
  chainOfThought: z.string().describe('Step-by-step reasoning about what governance objectives are present in the documents'),
  documentSummary: z.string().describe('Brief summary of the documents and their governance relevance'),
  objectives: z.array(PolicyObjectiveSchema),
})

export type PolicyObjective = z.infer<typeof PolicyObjectiveSchema>
export type PolicyObjectivesResponse = z.infer<typeof PolicyObjectivesResponseSchema>
