/**
 * Document Extraction Types
 * FR-16 & FR-20 Implementation
 */

export type DocumentType = 
  | 'board_minutes'
  | 'governance_framework'
  | 'annual_report'
  | 'risk_appetite_statement'
  | 'strategy_document'
  | 'policy_document'
  | 'unknown';

export type FrameworkType = 
  | 'COBIT2019'
  | 'COSO_ERM'
  | 'ISO27001'
  | 'NIST_CSF'
  | 'HKMA'
  | 'MAS';

export type ExtractionDifficulty = 'easy' | 'moderate' | 'hard';

export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface DocumentMetadata {
  source: string;
  title: string;
  documentType: DocumentType;
  publishDate?: string;
  organization?: string;
  extractedAt: string;
}

export interface ExtractedSection {
  id: string;
  title: string;
  content: string;
  lineStart?: number;
  lineEnd?: number;
  sectionType: SectionType;
}

export type SectionType =
  | 'board_responsibilities'
  | 'risk_appetite'
  | 'matters_reserved'
  | 'agenda_item'
  | 'committee_update'
  | 'strategic_objectives'
  | 'governance_principles'
  | 'risk_management'
  | 'compliance'
  | 'other';

export interface GovernanceObjective {
  id: string;
  text: string;
  sourceSection: string;
  sourceSectionType: SectionType;
  sourceDocument: string;
  extractionConfidence: ConfidenceLevel;
  keywords: string[];
}

export interface FrameworkControl {
  id: string;
  framework: FrameworkType;
  domain?: string;
  process?: string;
  controlId: string;
  controlName: string;
  description: string;
  keywords: string[];
}

export interface FrameworkMapping {
  objectiveId: string;
  controlId: string;
  framework: FrameworkType;
  similarityScore: number;
  confidence: ConfidenceLevel;
  matchedKeywords: string[];
  rationale: string;
}

export interface ExtractionResult {
  metadata: DocumentMetadata;
  sections: ExtractedSection[];
  objectives: GovernanceObjective[];
  mappings: FrameworkMapping[];
  summary: ExtractionSummary;
}

export interface ExtractionSummary {
  totalSectionsFound: number;
  totalObjectivesExtracted: number;
  totalMappingsGenerated: number;
  extractionDifficulty: ExtractionDifficulty;
  frameworksCovered: FrameworkType[];
  averageConfidence: number;
}

export interface ExtractionPattern {
  id: string;
  name: string;
  description: string;
  regex: RegExp;
  sectionType: SectionType;
  priority: number;
}

export interface DocumentSection {
  heading: string;
  content: string;
  subsections: DocumentSection[];
  level: number;
}

export interface ParsedDocument {
  rawText: string;
  sections: DocumentSection[];
  metadata: Partial<DocumentMetadata>;
}
