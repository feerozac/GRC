/**
 * Document Extractor
 * Main extraction logic for governance objectives from documents
 */

import type {
  DocumentType,
  DocumentMetadata,
  ExtractedSection,
  GovernanceObjective,
  ParsedDocument,
  DocumentSection,
  SectionType,
  ConfidenceLevel,
  ExtractionDifficulty
} from './types.js';

import {
  SECTION_PATTERNS,
  extractBulletPoints,
  containsGovernanceKeywords,
  hasResponsibilityVerb,
  findPatternMatches
} from './patterns.js';

let objectiveCounter = 0;

function generateObjectiveId(): string {
  return `OBJ-${String(++objectiveCounter).padStart(4, '0')}`;
}

function resetObjectiveCounter(): void {
  objectiveCounter = 0;
}

export function detectDocumentType(text: string): DocumentType {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('minutes of the meeting') || lowerText.includes('court of directors')) {
    return 'board_minutes';
  }
  if (lowerText.includes('matters reserved to court') || lowerText.includes('governance framework')) {
    return 'governance_framework';
  }
  if (lowerText.includes('annual report') || lowerText.includes('corporate governance report')) {
    return 'annual_report';
  }
  if (lowerText.includes('risk appetite statement') || lowerText.includes('risk appetite framework')) {
    return 'risk_appetite_statement';
  }
  if (lowerText.includes('strategy document') || lowerText.includes('strategic plan')) {
    return 'strategy_document';
  }
  
  return 'unknown';
}

export function parseMarkdownSections(text: string): DocumentSection[] {
  const lines = text.split('\n');
  const sections: DocumentSection[] = [];
  const stack: { section: DocumentSection; level: number }[] = [];
  
  let currentContent: string[] = [];
  
  for (const line of lines) {
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    
    if (headingMatch) {
      const level = headingMatch[1]?.length ?? 1;
      const heading = headingMatch[2]?.trim() ?? '';
      
      // Save current content to parent
      if (stack.length > 0 && currentContent.length > 0) {
        const parent = stack[stack.length - 1];
        if (parent) {
          parent.section.content = currentContent.join('\n').trim();
        }
      }
      currentContent = [];
      
      const newSection: DocumentSection = {
        heading,
        content: '',
        subsections: [],
        level
      };
      
      // Pop stack until we find a parent
      while (stack.length > 0) {
        const top = stack[stack.length - 1];
        if (top && top.level >= level) {
          stack.pop();
        } else {
          break;
        }
      }
      
      if (stack.length > 0) {
        const parent = stack[stack.length - 1];
        if (parent) {
          parent.section.subsections.push(newSection);
        }
      } else {
        sections.push(newSection);
      }
      
      stack.push({ section: newSection, level });
    } else {
      currentContent.push(line);
    }
  }
  
  // Save final content
  if (stack.length > 0 && currentContent.length > 0) {
    const parent = stack[stack.length - 1];
    if (parent) {
      parent.section.content = currentContent.join('\n').trim();
    }
  }
  
  return sections;
}

export function parseDocument(text: string, source: string): ParsedDocument {
  const documentType = detectDocumentType(text);
  const sections = parseMarkdownSections(text);
  
  return {
    rawText: text,
    sections,
    metadata: {
      source,
      documentType,
      extractedAt: new Date().toISOString()
    }
  };
}

export function extractSections(parsedDoc: ParsedDocument): ExtractedSection[] {
  const extractedSections: ExtractedSection[] = [];
  const patternMatches = findPatternMatches(parsedDoc.rawText);
  
  let sectionId = 0;
  
  // Extract from pattern matches
  for (const { pattern, matches } of patternMatches) {
    for (const match of matches) {
      const startIndex = match.index ?? 0;
      const contextStart = Math.max(0, startIndex - 50);
      const contextEnd = Math.min(parsedDoc.rawText.length, startIndex + 2000);
      const content = parsedDoc.rawText.slice(contextStart, contextEnd);
      
      extractedSections.push({
        id: `SEC-${String(++sectionId).padStart(3, '0')}`,
        title: pattern.name,
        content: content.trim(),
        sectionType: pattern.sectionType
      });
    }
  }
  
  // Also extract from parsed markdown sections
  function processSection(section: DocumentSection): void {
    const sectionType = determineSectionType(section.heading, section.content);
    
    if (sectionType !== 'other') {
      extractedSections.push({
        id: `SEC-${String(++sectionId).padStart(3, '0')}`,
        title: section.heading,
        content: section.content,
        sectionType
      });
    }
    
    for (const subsection of section.subsections) {
      processSection(subsection);
    }
  }
  
  for (const section of parsedDoc.sections) {
    processSection(section);
  }
  
  return extractedSections;
}

function determineSectionType(heading: string, content: string): SectionType {
  const combinedText = `${heading} ${content}`.toLowerCase();
  
  for (const pattern of SECTION_PATTERNS) {
    if (pattern.regex.test(combinedText)) {
      return pattern.sectionType;
    }
  }
  
  // Fallback heuristics
  if (combinedText.includes('board') && combinedText.includes('responsib')) {
    return 'board_responsibilities';
  }
  if (combinedText.includes('risk appetite')) {
    return 'risk_appetite';
  }
  if (combinedText.includes('matters reserved')) {
    return 'matters_reserved';
  }
  if (combinedText.includes('committee') && combinedText.includes('update')) {
    return 'committee_update';
  }
  if (/^\d+\.\s/.test(heading)) {
    return 'agenda_item';
  }
  
  return 'other';
}

export function extractObjectives(sections: ExtractedSection[], sourceDocument: string): GovernanceObjective[] {
  resetObjectiveCounter();
  const objectives: GovernanceObjective[] = [];
  
  for (const section of sections) {
    const sectionObjectives = extractObjectivesFromSection(section, sourceDocument);
    objectives.push(...sectionObjectives);
  }
  
  return objectives;
}

function extractObjectivesFromSection(section: ExtractedSection, sourceDocument: string): GovernanceObjective[] {
  const objectives: GovernanceObjective[] = [];
  
  // Extract bullet points
  const bullets = extractBulletPoints(section.content);
  
  for (const bullet of bullets) {
    if (isLikelyObjective(bullet)) {
      const keywords = containsGovernanceKeywords(bullet);
      const confidence = calculateConfidence(bullet, keywords, section.sectionType);
      
      objectives.push({
        id: generateObjectiveId(),
        text: cleanObjectiveText(bullet),
        sourceSection: section.title,
        sourceSectionType: section.sectionType,
        sourceDocument,
        extractionConfidence: confidence,
        keywords
      });
    }
  }
  
  // If no bullets found, try to extract from prose
  if (bullets.length === 0 && section.sectionType !== 'other') {
    const sentences = extractSentencesWithObjectives(section.content);
    
    for (const sentence of sentences) {
      const keywords = containsGovernanceKeywords(sentence);
      
      if (keywords.length >= 2) {
        objectives.push({
          id: generateObjectiveId(),
          text: cleanObjectiveText(sentence),
          sourceSection: section.title,
          sourceSectionType: section.sectionType,
          sourceDocument,
          extractionConfidence: 'medium',
          keywords
        });
      }
    }
  }
  
  return objectives;
}

function isLikelyObjective(text: string): boolean {
  if (text.length < 20 || text.length > 500) return false;
  
  const hasKeywords = containsGovernanceKeywords(text).length >= 1;
  const hasVerb = hasResponsibilityVerb(text);
  
  return hasKeywords || hasVerb;
}

function calculateConfidence(text: string, keywords: string[], sectionType: SectionType): ConfidenceLevel {
  let score = 0;
  
  // Keywords boost
  score += Math.min(keywords.length * 10, 30);
  
  // Responsibility verb boost
  if (hasResponsibilityVerb(text)) score += 20;
  
  // Section type boost
  if (['board_responsibilities', 'risk_appetite', 'matters_reserved'].includes(sectionType)) {
    score += 30;
  } else if (['strategic_objectives', 'governance_principles'].includes(sectionType)) {
    score += 20;
  }
  
  // Length heuristic
  if (text.length >= 50 && text.length <= 300) score += 10;
  
  if (score >= 60) return 'high';
  if (score >= 35) return 'medium';
  return 'low';
}

function extractSentencesWithObjectives(text: string): string[] {
  const sentences = text.split(/[.;]\s+/).filter(s => s.length > 30);
  return sentences.filter(s => hasResponsibilityVerb(s));
}

function cleanObjectiveText(text: string): string {
  return text
    .replace(/^[-–•]\s*/, '')
    .replace(/[;,]?\s*(?:and)?$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function calculateExtractionDifficulty(
  documentType: DocumentType,
  sectionsFound: number,
  objectivesExtracted: number
): ExtractionDifficulty {
  if (documentType === 'board_minutes' && sectionsFound > 5) {
    return 'easy';
  }
  if (documentType === 'governance_framework' && objectivesExtracted > 10) {
    return 'easy';
  }
  if (documentType === 'annual_report') {
    return sectionsFound > 3 ? 'moderate' : 'hard';
  }
  if (objectivesExtracted > 5) {
    return 'moderate';
  }
  return 'hard';
}
