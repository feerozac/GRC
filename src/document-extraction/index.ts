/**
 * Document Extraction Module
 * FR-16 & FR-20 Implementation
 * 
 * Extracts governance objectives from board papers, annual reports,
 * and governance documents, then maps them to COBIT/COSO frameworks.
 */

export * from './types.js';
export * from './framework-catalog.js';
export * from './patterns.js';
export * from './extractor.js';
export * from './mapper.js';

import type {
  ExtractionResult,
  DocumentMetadata,
  FrameworkType,
  ExtractionSummary
} from './types.js';

import {
  parseDocument,
  extractSections,
  extractObjectives,
  detectDocumentType,
  calculateExtractionDifficulty
} from './extractor.js';

import { mapAllObjectives, getMappingSummary } from './mapper.js';

/**
 * Main extraction function - processes a document and returns full results
 */
export function extractGovernanceObjectives(
  documentText: string,
  source: string,
  options: {
    frameworks?: FrameworkType[];
    organization?: string;
    publishDate?: string;
  } = {}
): ExtractionResult {
  const frameworks = options.frameworks ?? ['COBIT2019', 'COSO_ERM'];
  
  // Parse document
  const parsedDoc = parseDocument(documentText, source);
  
  // Extract sections
  const sections = extractSections(parsedDoc);
  
  // Extract objectives from sections
  const objectives = extractObjectives(sections, source);
  
  // Map objectives to frameworks
  const mappings = mapAllObjectives(objectives, frameworks);
  
  // Build metadata
  const metadata: DocumentMetadata = {
    source,
    title: extractTitle(documentText) ?? source,
    documentType: parsedDoc.metadata.documentType ?? 'unknown',
    publishDate: options.publishDate,
    organization: options.organization,
    extractedAt: new Date().toISOString()
  };
  
  // Build summary
  const mappingSummary = getMappingSummary(mappings);
  const summary: ExtractionSummary = {
    totalSectionsFound: sections.length,
    totalObjectivesExtracted: objectives.length,
    totalMappingsGenerated: mappings.length,
    extractionDifficulty: calculateExtractionDifficulty(
      metadata.documentType,
      sections.length,
      objectives.length
    ),
    frameworksCovered: frameworks,
    averageConfidence: mappingSummary.averageScore
  };
  
  return {
    metadata,
    sections,
    objectives,
    mappings,
    summary
  };
}

function extractTitle(text: string): string | undefined {
  // Try to find a heading
  const headingMatch = text.match(/^#\s+(.+)$/m);
  if (headingMatch?.[1]) return headingMatch[1];
  
  // Try to find "Minutes of..." pattern
  const minutesMatch = text.match(/minutes\s+of\s+(?:the\s+)?(?:meeting\s+of\s+)?(?:the\s+)?(.+?)(?:\s+held|\s+on)/i);
  if (minutesMatch?.[1]) return `Minutes: ${minutesMatch[1]}`;
  
  return undefined;
}

/**
 * Format results as a markdown report
 */
export function formatResultsAsMarkdown(result: ExtractionResult): string {
  const lines: string[] = [];
  
  lines.push(`# Governance Objectives Extraction Report`);
  lines.push('');
  lines.push(`**Source:** ${result.metadata.source}`);
  lines.push(`**Document Type:** ${result.metadata.documentType}`);
  lines.push(`**Extracted:** ${result.metadata.extractedAt}`);
  lines.push(`**Extraction Difficulty:** ${result.summary.extractionDifficulty}`);
  lines.push('');
  
  lines.push(`## Summary`);
  lines.push('');
  lines.push(`| Metric | Value |`);
  lines.push(`|--------|-------|`);
  lines.push(`| Sections Found | ${result.summary.totalSectionsFound} |`);
  lines.push(`| Objectives Extracted | ${result.summary.totalObjectivesExtracted} |`);
  lines.push(`| Framework Mappings | ${result.summary.totalMappingsGenerated} |`);
  lines.push(`| Average Confidence | ${(result.summary.averageConfidence * 100).toFixed(1)}% |`);
  lines.push('');
  
  lines.push(`## Extracted Objectives`);
  lines.push('');
  lines.push(`| ID | Objective | Section | Confidence |`);
  lines.push(`|----|-----------|---------|------------|`);
  
  for (const obj of result.objectives) {
    const truncatedText = obj.text.length > 80 
      ? obj.text.slice(0, 77) + '...' 
      : obj.text;
    lines.push(`| ${obj.id} | ${truncatedText} | ${obj.sourceSection} | ${obj.extractionConfidence} |`);
  }
  lines.push('');
  
  lines.push(`## Framework Mappings`);
  lines.push('');
  lines.push(`| Objective | Framework | Control | Score | Rationale |`);
  lines.push(`|-----------|-----------|---------|-------|-----------|`);
  
  for (const mapping of result.mappings) {
    const score = (mapping.similarityScore * 100).toFixed(0);
    const shortRationale = mapping.rationale.length > 60 
      ? mapping.rationale.slice(0, 57) + '...'
      : mapping.rationale;
    lines.push(`| ${mapping.objectiveId} | ${mapping.framework} | ${mapping.controlId} | ${score}% | ${shortRationale} |`);
  }
  lines.push('');
  
  return lines.join('\n');
}

/**
 * Format results as JSON for API responses
 */
export function formatResultsAsJSON(result: ExtractionResult): string {
  return JSON.stringify(result, null, 2);
}
