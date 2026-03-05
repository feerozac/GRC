/**
 * Extraction Patterns
 * Regex patterns for identifying governance sections and objectives
 */

import type { ExtractionPattern, SectionType } from './types.js';

export const SECTION_PATTERNS: ExtractionPattern[] = [
  // Board Responsibilities patterns
  {
    id: 'pat-board-resp-01',
    name: 'Board Responsibilities List',
    description: 'Matches "The Board is responsible for:" followed by bullet points',
    regex: /(?:the\s+)?board(?:\s+of\s+directors)?(?:\s*,?\s*led\s+by[^,]+,)?\s+is\s+responsible\s+for[:\s]*(?:among\s+other\s+matters[:\s]*)?/gi,
    sectionType: 'board_responsibilities',
    priority: 10
  },
  {
    id: 'pat-board-resp-02',
    name: 'Court Responsibilities',
    description: 'Matches Bank of England style "Court\'s responsibilities"',
    regex: /court(?:'s)?\s+responsibilities\s+(?:are\s+set\s+out|include)/gi,
    sectionType: 'board_responsibilities',
    priority: 10
  },
  {
    id: 'pat-board-resp-03',
    name: 'Matters Reserved',
    description: 'Matches "Matters Reserved to Court/Board"',
    regex: /matters\s+reserved\s+to\s+(?:court|the\s+board)/gi,
    sectionType: 'matters_reserved',
    priority: 10
  },

  // Risk Appetite patterns
  {
    id: 'pat-risk-appetite-01',
    name: 'Risk Appetite Statement',
    description: 'Matches risk appetite definitions',
    regex: /(?:our\s+)?risk\s+appetite\s+(?:defines?|is\s+expressed|statement)/gi,
    sectionType: 'risk_appetite',
    priority: 9
  },
  {
    id: 'pat-risk-appetite-02',
    name: 'Risk Appetite Principles',
    description: 'Matches risk appetite principles section',
    regex: /risk\s+appetite\s+is\s+considered[^.]*through\s+the\s+following\s+principles/gi,
    sectionType: 'risk_appetite',
    priority: 9
  },

  // Agenda Items (Board Minutes)
  {
    id: 'pat-agenda-01',
    name: 'Numbered Agenda Item',
    description: 'Matches "## 1. Topic" or "1. Topic" style agenda items',
    regex: /^(?:#{1,3}\s*)?(\d+)\.\s+([A-Z][^.\n]+)/gm,
    sectionType: 'agenda_item',
    priority: 8
  },
  {
    id: 'pat-agenda-02',
    name: 'Committee Update',
    description: 'Matches "Committee Update" sections',
    regex: /(\w+)\s+committee\s+(?:\([^)]+\)\s+)?update/gi,
    sectionType: 'committee_update',
    priority: 8
  },

  // Strategic Objectives
  {
    id: 'pat-strategy-01',
    name: 'Strategic Objectives',
    description: 'Matches strategic objective sections',
    regex: /(?:strategic|business)\s+objectives?(?:\s+include)?[:\s]/gi,
    sectionType: 'strategic_objectives',
    priority: 7
  },
  {
    id: 'pat-strategy-02',
    name: 'Goals and Objectives',
    description: 'Matches goals section',
    regex: /(?:goals?\s+and\s+)?objectives?[:\s]/gi,
    sectionType: 'strategic_objectives',
    priority: 6
  },

  // Governance Principles
  {
    id: 'pat-governance-01',
    name: 'Governance Framework',
    description: 'Matches governance framework sections',
    regex: /(?:corporate\s+)?governance\s+(?:framework|principles|practices)/gi,
    sectionType: 'governance_principles',
    priority: 7
  },

  // Risk Management
  {
    id: 'pat-risk-mgmt-01',
    name: 'Risk Management Approach',
    description: 'Matches risk management sections',
    regex: /(?:our\s+)?(?:approach\s+to\s+)?risk\s+management/gi,
    sectionType: 'risk_management',
    priority: 7
  },
  {
    id: 'pat-risk-mgmt-02',
    name: 'Three Lines of Defence',
    description: 'Matches 3LOD sections',
    regex: /three\s+lines\s+of\s+defence/gi,
    sectionType: 'risk_management',
    priority: 8
  },

  // Compliance
  {
    id: 'pat-compliance-01',
    name: 'Regulatory Compliance',
    description: 'Matches compliance sections',
    regex: /(?:regulatory\s+)?compliance\s+(?:with|requirements?)/gi,
    sectionType: 'compliance',
    priority: 6
  }
];

export const OBJECTIVE_EXTRACTION_PATTERNS = {
  bulletPoint: /^[\s]*[-–•]\s*(.+)$/gm,
  numberedList: /^[\s]*(?:\d+[.)]\s*|\([a-z]\)\s*)(.+)$/gm,
  dashList: /^[\s]*[–—]\s*(.+)$/gm,
  semicolonList: /;\s*and\s*$/i,
  responsibilityVerbs: /\b(ensure|establish|approve|monitor|review|set|maintain|oversee|define|provide|promote|deliver|manage|protect)\b/gi
};

export const GOVERNANCE_KEYWORDS = [
  // Board & Governance
  'board', 'directors', 'governance', 'oversight', 'accountability',
  'fiduciary', 'stewardship', 'chairm', 'executive', 'non-executive',
  
  // Strategy
  'strategy', 'strategic', 'objectives', 'goals', 'mission', 'vision',
  'purpose', 'values', 'culture', 'transformation',
  
  // Risk
  'risk', 'appetite', 'tolerance', 'exposure', 'mitigation', 'assessment',
  'register', 'profile', 'management',
  
  // Control
  'control', 'controls', 'internal control', 'framework', 'assurance',
  'audit', 'compliance', 'policy', 'policies', 'procedures',
  
  // Financial
  'capital', 'budget', 'financial', 'expenditure', 'resources',
  'investment', 'funding', 'cost',
  
  // People
  'workforce', 'human resources', 'talent', 'recruitment', 'staff',
  'employees', 'capacity', 'capabilities',
  
  // Technology & Security
  'technology', 'cyber', 'security', 'resilience', 'continuity',
  'systems', 'infrastructure', 'digital',
  
  // Stakeholders
  'stakeholder', 'shareholder', 'customer', 'regulator', 'engagement',
  'communication', 'transparency', 'reporting'
];

export function findPatternMatches(text: string): Array<{ pattern: ExtractionPattern; matches: RegExpMatchArray[] }> {
  const results: Array<{ pattern: ExtractionPattern; matches: RegExpMatchArray[] }> = [];
  
  for (const pattern of SECTION_PATTERNS) {
    const matches: RegExpMatchArray[] = [];
    let match: RegExpExecArray | null;
    
    const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
    while ((match = regex.exec(text)) !== null) {
      matches.push(match as RegExpMatchArray);
    }
    
    if (matches.length > 0) {
      results.push({ pattern, matches });
    }
  }
  
  return results.sort((a, b) => b.pattern.priority - a.pattern.priority);
}

export function extractBulletPoints(text: string): string[] {
  const bullets: string[] = [];
  const patterns = [
    OBJECTIVE_EXTRACTION_PATTERNS.bulletPoint,
    OBJECTIVE_EXTRACTION_PATTERNS.numberedList,
    OBJECTIVE_EXTRACTION_PATTERNS.dashList
  ];
  
  for (const pattern of patterns) {
    const regex = new RegExp(pattern.source, pattern.flags);
    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
      if (match[1]) {
        bullets.push(match[1].trim());
      }
    }
  }
  
  return bullets;
}

export function containsGovernanceKeywords(text: string): string[] {
  const foundKeywords: string[] = [];
  const lowerText = text.toLowerCase();
  
  for (const keyword of GOVERNANCE_KEYWORDS) {
    if (lowerText.includes(keyword.toLowerCase())) {
      foundKeywords.push(keyword);
    }
  }
  
  return [...new Set(foundKeywords)];
}

export function hasResponsibilityVerb(text: string): boolean {
  return OBJECTIVE_EXTRACTION_PATTERNS.responsibilityVerbs.test(text);
}
