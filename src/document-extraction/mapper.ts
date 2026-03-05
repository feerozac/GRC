/**
 * Framework Mapper
 * Maps extracted governance objectives to COBIT/COSO framework controls
 */

import type {
  GovernanceObjective,
  FrameworkControl,
  FrameworkMapping,
  FrameworkType,
  ConfidenceLevel
} from './types.js';

import { ALL_FRAMEWORK_CONTROLS, COBIT_2019_CONTROLS, COSO_ERM_CONTROLS } from './framework-catalog.js';

interface SimilarityResult {
  control: FrameworkControl;
  score: number;
  matchedKeywords: string[];
}

export function mapObjectiveToFrameworks(
  objective: GovernanceObjective,
  frameworks: FrameworkType[] = ['COBIT2019', 'COSO_ERM']
): FrameworkMapping[] {
  const mappings: FrameworkMapping[] = [];
  
  const controls = ALL_FRAMEWORK_CONTROLS.filter(c => 
    frameworks.includes(c.framework)
  );
  
  const similarities = calculateSimilarities(objective, controls);
  
  // Take top matches (score > threshold)
  const topMatches = similarities
    .filter(s => s.score > 0.2)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  
  for (const match of topMatches) {
    mappings.push({
      objectiveId: objective.id,
      controlId: match.control.id,
      framework: match.control.framework,
      similarityScore: match.score,
      confidence: scoreToConfidence(match.score),
      matchedKeywords: match.matchedKeywords,
      rationale: generateRationale(objective, match)
    });
  }
  
  return mappings;
}

function calculateSimilarities(
  objective: GovernanceObjective,
  controls: FrameworkControl[]
): SimilarityResult[] {
  const results: SimilarityResult[] = [];
  const objectiveText = objective.text.toLowerCase();
  const objectiveKeywords = new Set(objective.keywords.map(k => k.toLowerCase()));
  
  for (const control of controls) {
    const { score, matchedKeywords } = calculateControlSimilarity(
      objectiveText,
      objectiveKeywords,
      control
    );
    
    results.push({ control, score, matchedKeywords });
  }
  
  return results;
}

function calculateControlSimilarity(
  objectiveText: string,
  objectiveKeywords: Set<string>,
  control: FrameworkControl
): { score: number; matchedKeywords: string[] } {
  let score = 0;
  const matchedKeywords: string[] = [];
  
  // Keyword overlap scoring
  const controlKeywords = control.keywords.map(k => k.toLowerCase());
  for (const keyword of controlKeywords) {
    if (objectiveKeywords.has(keyword) || objectiveText.includes(keyword)) {
      score += 0.15;
      matchedKeywords.push(keyword);
    }
  }
  
  // Control name similarity
  const controlNameWords = control.controlName.toLowerCase().split(/\s+/);
  for (const word of controlNameWords) {
    if (word.length > 3 && objectiveText.includes(word)) {
      score += 0.1;
    }
  }
  
  // Description similarity
  const descWords = control.description.toLowerCase().split(/\s+/);
  let descMatches = 0;
  for (const word of descWords) {
    if (word.length > 4 && objectiveText.includes(word)) {
      descMatches++;
    }
  }
  score += Math.min(descMatches * 0.03, 0.2);
  
  // Domain-specific boosting
  score += domainBoost(objectiveText, control);
  
  // Cap at 1.0
  return { score: Math.min(score, 1.0), matchedKeywords };
}

function domainBoost(objectiveText: string, control: FrameworkControl): number {
  let boost = 0;
  
  // Risk-related objectives match APO12 and COSO Performance
  if (objectiveText.includes('risk') && 
      (control.controlId.includes('APO12') || control.domain === 'Performance')) {
    boost += 0.15;
  }
  
  // Board/governance objectives match EDM01 and COSO Governance
  if ((objectiveText.includes('board') || objectiveText.includes('governance')) &&
      (control.controlId.includes('EDM01') || control.domain === 'Governance & Culture')) {
    boost += 0.15;
  }
  
  // Strategy objectives match APO02 and COSO Strategy
  if (objectiveText.includes('strategy') &&
      (control.controlId.includes('APO02') || control.domain === 'Strategy & Objective-Setting')) {
    boost += 0.15;
  }
  
  // Cyber/security objectives match DSS05 and APO13
  if ((objectiveText.includes('cyber') || objectiveText.includes('security')) &&
      (control.controlId.includes('DSS05') || control.controlId.includes('APO13'))) {
    boost += 0.2;
  }
  
  // HR/workforce objectives match APO07 and COSO GC-05
  if ((objectiveText.includes('workforce') || objectiveText.includes('staff') || 
       objectiveText.includes('recruit') || objectiveText.includes('people')) &&
      (control.controlId.includes('APO07') || control.controlId === 'GC-05')) {
    boost += 0.2;
  }
  
  // Budget/financial objectives match APO06
  if ((objectiveText.includes('budget') || objectiveText.includes('cost') || 
       objectiveText.includes('capital') || objectiveText.includes('financial')) &&
      control.controlId.includes('APO06')) {
    boost += 0.15;
  }
  
  // Compliance objectives match MEA03
  if ((objectiveText.includes('compliance') || objectiveText.includes('regulatory') ||
       objectiveText.includes('law')) &&
      control.controlId.includes('MEA03')) {
    boost += 0.2;
  }
  
  // Continuity/resilience objectives match DSS04
  if ((objectiveText.includes('continuity') || objectiveText.includes('resilience') ||
       objectiveText.includes('recovery')) &&
      control.controlId.includes('DSS04')) {
    boost += 0.2;
  }
  
  // Three lines of defence matches APO11
  if (objectiveText.includes('three lines') || objectiveText.includes('3lod') ||
      objectiveText.includes('defence model')) {
    if (control.controlId.includes('APO11')) boost += 0.25;
  }
  
  return boost;
}

function scoreToConfidence(score: number): ConfidenceLevel {
  if (score >= 0.6) return 'high';
  if (score >= 0.35) return 'medium';
  return 'low';
}

function generateRationale(objective: GovernanceObjective, match: SimilarityResult): string {
  const control = match.control;
  const keywordList = match.matchedKeywords.slice(0, 3).join(', ');
  
  let rationale = `Objective relates to ${control.controlName}`;
  
  if (match.matchedKeywords.length > 0) {
    rationale += ` based on shared concepts: ${keywordList}`;
  }
  
  if (control.domain) {
    rationale += `. Falls under ${control.framework} ${control.domain} domain`;
  }
  
  rationale += `.`;
  
  return rationale;
}

export function mapAllObjectives(
  objectives: GovernanceObjective[],
  frameworks: FrameworkType[] = ['COBIT2019', 'COSO_ERM']
): FrameworkMapping[] {
  const allMappings: FrameworkMapping[] = [];
  
  for (const objective of objectives) {
    const mappings = mapObjectiveToFrameworks(objective, frameworks);
    allMappings.push(...mappings);
  }
  
  return allMappings;
}

export function getMappingSummary(mappings: FrameworkMapping[]): {
  byFramework: Record<FrameworkType, number>;
  byConfidence: Record<ConfidenceLevel, number>;
  averageScore: number;
} {
  const byFramework: Record<string, number> = {};
  const byConfidence: Record<ConfidenceLevel, number> = { high: 0, medium: 0, low: 0 };
  let totalScore = 0;
  
  for (const mapping of mappings) {
    byFramework[mapping.framework] = (byFramework[mapping.framework] ?? 0) + 1;
    byConfidence[mapping.confidence]++;
    totalScore += mapping.similarityScore;
  }
  
  return {
    byFramework: byFramework as Record<FrameworkType, number>,
    byConfidence,
    averageScore: mappings.length > 0 ? totalScore / mappings.length : 0
  };
}

export function findBestMapping(
  objective: GovernanceObjective,
  framework: FrameworkType
): FrameworkMapping | null {
  const controls = framework === 'COBIT2019' ? COBIT_2019_CONTROLS : COSO_ERM_CONTROLS;
  const mappings = mapObjectiveToFrameworks(objective, [framework]);
  
  if (mappings.length === 0) return null;
  
  return mappings.reduce((best, current) => 
    current.similarityScore > best.similarityScore ? current : best
  );
}
