/**
 * Framework Catalog
 * Reference data for COBIT 2019 and COSO ERM frameworks
 */

import type { FrameworkControl, FrameworkType } from './types.js';

export const COBIT_2019_CONTROLS: FrameworkControl[] = [
  // EDM - Evaluate, Direct and Monitor
  {
    id: 'cobit-edm01',
    framework: 'COBIT2019',
    domain: 'EDM',
    process: 'EDM01',
    controlId: 'EDM01',
    controlName: 'Ensured Governance Framework Setting and Maintenance',
    description: 'Analyze and articulate the requirements for the governance of enterprise IT. Put in place and maintain effective enabling structures, principles and processes.',
    keywords: ['governance', 'framework', 'strategy', 'objectives', 'principles', 'board', 'direction']
  },
  {
    id: 'cobit-edm02',
    framework: 'COBIT2019',
    domain: 'EDM',
    process: 'EDM02',
    controlId: 'EDM02',
    controlName: 'Ensured Benefits Delivery',
    description: 'Optimize the value contribution to the business from the business processes, IT services and IT assets.',
    keywords: ['value', 'benefits', 'optimization', 'shareholders', 'stakeholders', 'sustainable', 'long-term']
  },
  {
    id: 'cobit-edm03',
    framework: 'COBIT2019',
    domain: 'EDM',
    process: 'EDM03',
    controlId: 'EDM03',
    controlName: 'Ensured Risk Optimization',
    description: 'Ensure that IT-related enterprise risk does not exceed the enterprise risk appetite and tolerance.',
    keywords: ['risk', 'appetite', 'tolerance', 'optimization', 'exposure']
  },
  {
    id: 'cobit-edm04',
    framework: 'COBIT2019',
    domain: 'EDM',
    process: 'EDM04',
    controlId: 'EDM04',
    controlName: 'Ensured Resource Optimization',
    description: 'Ensure that adequate and sufficient IT-related capabilities are available to support enterprise objectives.',
    keywords: ['resources', 'capabilities', 'capacity', 'budget', 'optimization']
  },
  {
    id: 'cobit-edm05',
    framework: 'COBIT2019',
    domain: 'EDM',
    process: 'EDM05',
    controlId: 'EDM05',
    controlName: 'Ensured Stakeholder Engagement',
    description: 'Ensure that enterprise IT stakeholders are identified and engaged.',
    keywords: ['stakeholder', 'engagement', 'communication', 'transparency', 'reporting']
  },

  // APO - Align, Plan and Organize
  {
    id: 'cobit-apo01',
    framework: 'COBIT2019',
    domain: 'APO',
    process: 'APO01',
    controlId: 'APO01',
    controlName: 'Managed I&T Management Framework',
    description: 'Clarify and maintain the governance of enterprise IT mission and vision.',
    keywords: ['management', 'framework', 'mission', 'vision', 'culture', 'alignment']
  },
  {
    id: 'cobit-apo02',
    framework: 'COBIT2019',
    domain: 'APO',
    process: 'APO02',
    controlId: 'APO02',
    controlName: 'Managed Strategy',
    description: 'Provide a holistic view of the current business and IT environment, the future direction, and the initiatives required.',
    keywords: ['strategy', 'planning', 'direction', 'roadmap', 'transformation']
  },
  {
    id: 'cobit-apo04',
    framework: 'COBIT2019',
    domain: 'APO',
    process: 'APO04',
    controlId: 'APO04',
    controlName: 'Managed Innovation',
    description: 'Achieve competitive advantage, business innovation, and improved operational effectiveness.',
    keywords: ['innovation', 'technology', 'digital', 'transformation', 'competitive']
  },
  {
    id: 'cobit-apo06',
    framework: 'COBIT2019',
    domain: 'APO',
    process: 'APO06',
    controlId: 'APO06',
    controlName: 'Managed Budget and Costs',
    description: 'Foster partnership between IT and enterprise stakeholders.',
    keywords: ['budget', 'costs', 'financial', 'expenditure', 'capital', 'resources', 'spending']
  },
  {
    id: 'cobit-apo07',
    framework: 'COBIT2019',
    domain: 'APO',
    process: 'APO07',
    controlId: 'APO07',
    controlName: 'Managed Human Resources',
    description: 'Optimize human resources capabilities to meet enterprise objectives.',
    keywords: ['human resources', 'workforce', 'people', 'staff', 'recruitment', 'talent', 'skills', 'capacity']
  },
  {
    id: 'cobit-apo08',
    framework: 'COBIT2019',
    domain: 'APO',
    process: 'APO08',
    controlId: 'APO08',
    controlName: 'Managed Relationships',
    description: 'Manage the relationship between the business and IT.',
    keywords: ['relationships', 'stakeholders', 'engagement', 'communication', 'partnership']
  },
  {
    id: 'cobit-apo11',
    framework: 'COBIT2019',
    domain: 'APO',
    process: 'APO11',
    controlId: 'APO11',
    controlName: 'Managed Quality',
    description: 'Define and communicate quality requirements in all processes.',
    keywords: ['quality', 'assurance', 'standards', 'improvement', 'three lines', 'defence']
  },
  {
    id: 'cobit-apo12',
    framework: 'COBIT2019',
    domain: 'APO',
    process: 'APO12',
    controlId: 'APO12',
    controlName: 'Managed Risk',
    description: 'Continually identify, assess and reduce IT-related risk.',
    keywords: ['risk', 'management', 'assessment', 'mitigation', 'appetite', 'tolerance', 'exposure', 'register']
  },
  {
    id: 'cobit-apo13',
    framework: 'COBIT2019',
    domain: 'APO',
    process: 'APO13',
    controlId: 'APO13',
    controlName: 'Managed Security',
    description: 'Define, operate and monitor a system for information security management.',
    keywords: ['security', 'information', 'protection', 'cyber', 'confidentiality']
  },

  // BAI - Build, Acquire and Implement
  {
    id: 'cobit-bai01',
    framework: 'COBIT2019',
    domain: 'BAI',
    process: 'BAI01',
    controlId: 'BAI01',
    controlName: 'Managed Programs',
    description: 'Manage all programs and projects from the investment portfolio.',
    keywords: ['program', 'project', 'portfolio', 'investment', 'delivery', 'transformation']
  },
  {
    id: 'cobit-bai06',
    framework: 'COBIT2019',
    domain: 'BAI',
    process: 'BAI06',
    controlId: 'BAI06',
    controlName: 'Managed IT Changes',
    description: 'Manage all changes in a controlled manner.',
    keywords: ['change', 'management', 'control', 'transition', 'implementation']
  },

  // DSS - Deliver, Service and Support
  {
    id: 'cobit-dss04',
    framework: 'COBIT2019',
    domain: 'DSS',
    process: 'DSS04',
    controlId: 'DSS04',
    controlName: 'Managed Continuity',
    description: 'Establish and maintain a plan to enable the business and IT to respond to incidents.',
    keywords: ['continuity', 'resilience', 'recovery', 'disaster', 'business continuity', 'operational']
  },
  {
    id: 'cobit-dss05',
    framework: 'COBIT2019',
    domain: 'DSS',
    process: 'DSS05',
    controlId: 'DSS05',
    controlName: 'Managed Security Services',
    description: 'Protect enterprise information to maintain the level of information security risk acceptable.',
    keywords: ['security', 'cyber', 'protection', 'threat', 'vulnerability', 'attack', 'defence']
  },

  // MEA - Monitor, Evaluate and Assess
  {
    id: 'cobit-mea01',
    framework: 'COBIT2019',
    domain: 'MEA',
    process: 'MEA01',
    controlId: 'MEA01',
    controlName: 'Managed Performance and Conformance Monitoring',
    description: 'Collect, validate and evaluate business, IT and process goals and metrics.',
    keywords: ['performance', 'monitoring', 'metrics', 'KPI', 'KRI', 'measurement']
  },
  {
    id: 'cobit-mea02',
    framework: 'COBIT2019',
    domain: 'MEA',
    process: 'MEA02',
    controlId: 'MEA02',
    controlName: 'Managed System of Internal Control',
    description: 'Continuously monitor and evaluate the control environment.',
    keywords: ['internal control', 'control environment', 'assurance', 'audit', 'monitoring']
  },
  {
    id: 'cobit-mea03',
    framework: 'COBIT2019',
    domain: 'MEA',
    process: 'MEA03',
    controlId: 'MEA03',
    controlName: 'Managed Compliance with External Requirements',
    description: 'Ensure that the enterprise is compliant with all applicable external requirements.',
    keywords: ['compliance', 'regulatory', 'legal', 'requirements', 'external', 'laws', 'regulations']
  },
  {
    id: 'cobit-mea04',
    framework: 'COBIT2019',
    domain: 'MEA',
    process: 'MEA04',
    controlId: 'MEA04',
    controlName: 'Managed Assurance',
    description: 'Enable the organization to design and develop efficient and effective assurance initiatives.',
    keywords: ['assurance', 'audit', 'independent', 'review', 'evaluation']
  }
];

export const COSO_ERM_CONTROLS: FrameworkControl[] = [
  // Governance & Culture
  {
    id: 'coso-gc-01',
    framework: 'COSO_ERM',
    domain: 'Governance & Culture',
    controlId: 'GC-01',
    controlName: 'Exercises Board Risk Oversight',
    description: 'The board of directors provides oversight of the strategy and carries out governance responsibilities.',
    keywords: ['board', 'oversight', 'governance', 'directors', 'supervision']
  },
  {
    id: 'coso-gc-02',
    framework: 'COSO_ERM',
    domain: 'Governance & Culture',
    controlId: 'GC-02',
    controlName: 'Establishes Operating Structures',
    description: 'The organization establishes operating structures in the pursuit of strategy and business objectives.',
    keywords: ['structure', 'operating', 'organization', 'framework', 'management']
  },
  {
    id: 'coso-gc-03',
    framework: 'COSO_ERM',
    domain: 'Governance & Culture',
    controlId: 'GC-03',
    controlName: 'Defines Desired Culture',
    description: 'The organization defines the desired behaviors that characterize the entity\'s desired culture.',
    keywords: ['culture', 'values', 'ethics', 'behavior', 'tone']
  },
  {
    id: 'coso-gc-04',
    framework: 'COSO_ERM',
    domain: 'Governance & Culture',
    controlId: 'GC-04',
    controlName: 'Demonstrates Commitment to Core Values',
    description: 'The organization demonstrates a commitment to integrity and ethical values.',
    keywords: ['integrity', 'ethics', 'values', 'commitment', 'conduct']
  },
  {
    id: 'coso-gc-05',
    framework: 'COSO_ERM',
    domain: 'Governance & Culture',
    controlId: 'GC-05',
    controlName: 'Attracts, Develops, and Retains Capable Individuals',
    description: 'The organization is committed to building human capital in alignment with strategy.',
    keywords: ['talent', 'human capital', 'recruitment', 'development', 'retention', 'people']
  },

  // Strategy & Objective-Setting
  {
    id: 'coso-so-01',
    framework: 'COSO_ERM',
    domain: 'Strategy & Objective-Setting',
    controlId: 'SO-01',
    controlName: 'Analyzes Business Context',
    description: 'The organization considers potential effects of business context on risk profile.',
    keywords: ['context', 'environment', 'business', 'external', 'internal']
  },
  {
    id: 'coso-so-02',
    framework: 'COSO_ERM',
    domain: 'Strategy & Objective-Setting',
    controlId: 'SO-02',
    controlName: 'Defines Risk Appetite',
    description: 'The organization defines risk appetite in the context of creating, preserving, and realizing value.',
    keywords: ['risk appetite', 'tolerance', 'threshold', 'acceptable', 'limit']
  },
  {
    id: 'coso-so-03',
    framework: 'COSO_ERM',
    domain: 'Strategy & Objective-Setting',
    controlId: 'SO-03',
    controlName: 'Evaluates Alternative Strategies',
    description: 'The organization evaluates alternative strategies and potential impact on risk profile.',
    keywords: ['strategy', 'alternatives', 'options', 'evaluation', 'impact']
  },
  {
    id: 'coso-so-04',
    framework: 'COSO_ERM',
    domain: 'Strategy & Objective-Setting',
    controlId: 'SO-04',
    controlName: 'Formulates Business Objectives',
    description: 'The organization considers risk while establishing business objectives.',
    keywords: ['objectives', 'goals', 'targets', 'business', 'strategic']
  },

  // Performance
  {
    id: 'coso-perf-01',
    framework: 'COSO_ERM',
    domain: 'Performance',
    controlId: 'PERF-01',
    controlName: 'Identifies Risk',
    description: 'The organization identifies risk that impacts the achievement of its strategy and business objectives.',
    keywords: ['identify', 'risk', 'recognition', 'detection', 'emerging']
  },
  {
    id: 'coso-perf-02',
    framework: 'COSO_ERM',
    domain: 'Performance',
    controlId: 'PERF-02',
    controlName: 'Assesses Severity of Risk',
    description: 'The organization assesses the severity of risk.',
    keywords: ['assess', 'severity', 'impact', 'likelihood', 'magnitude']
  },
  {
    id: 'coso-perf-03',
    framework: 'COSO_ERM',
    domain: 'Performance',
    controlId: 'PERF-03',
    controlName: 'Prioritizes Risks',
    description: 'The organization prioritizes risks as a basis for selecting responses to risks.',
    keywords: ['prioritize', 'ranking', 'order', 'importance', 'critical']
  },
  {
    id: 'coso-perf-04',
    framework: 'COSO_ERM',
    domain: 'Performance',
    controlId: 'PERF-04',
    controlName: 'Implements Risk Responses',
    description: 'The organization identifies and selects risk responses.',
    keywords: ['response', 'mitigation', 'treatment', 'action', 'control']
  },
  {
    id: 'coso-perf-05',
    framework: 'COSO_ERM',
    domain: 'Performance',
    controlId: 'PERF-05',
    controlName: 'Develops Portfolio View',
    description: 'The organization develops and evaluates a portfolio view of risk.',
    keywords: ['portfolio', 'aggregate', 'enterprise-wide', 'holistic', 'consolidated']
  },

  // Review & Revision
  {
    id: 'coso-rr-01',
    framework: 'COSO_ERM',
    domain: 'Review & Revision',
    controlId: 'RR-01',
    controlName: 'Assesses Substantial Change',
    description: 'The organization identifies and assesses changes that may substantially affect strategy.',
    keywords: ['change', 'substantial', 'material', 'significant', 'transformation']
  },
  {
    id: 'coso-rr-02',
    framework: 'COSO_ERM',
    domain: 'Review & Revision',
    controlId: 'RR-02',
    controlName: 'Reviews Risk and Performance',
    description: 'The organization reviews entity performance and considers risk.',
    keywords: ['review', 'performance', 'monitoring', 'evaluation', 'assessment']
  },
  {
    id: 'coso-rr-03',
    framework: 'COSO_ERM',
    domain: 'Review & Revision',
    controlId: 'RR-03',
    controlName: 'Pursues Improvement in ERM',
    description: 'The organization pursues improvement of enterprise risk management.',
    keywords: ['improvement', 'enhancement', 'continuous', 'maturity', 'evolution']
  },

  // Information, Communication & Reporting
  {
    id: 'coso-icr-01',
    framework: 'COSO_ERM',
    domain: 'Information, Communication & Reporting',
    controlId: 'ICR-01',
    controlName: 'Leverages Information and Technology',
    description: 'The organization leverages the entity\'s information and technology systems.',
    keywords: ['information', 'technology', 'systems', 'data', 'digital']
  },
  {
    id: 'coso-icr-02',
    framework: 'COSO_ERM',
    domain: 'Information, Communication & Reporting',
    controlId: 'ICR-02',
    controlName: 'Communicates Risk Information',
    description: 'The organization uses communication channels to support enterprise risk management.',
    keywords: ['communication', 'reporting', 'channels', 'stakeholder', 'transparency']
  },
  {
    id: 'coso-icr-03',
    framework: 'COSO_ERM',
    domain: 'Information, Communication & Reporting',
    controlId: 'ICR-03',
    controlName: 'Reports on Risk, Culture, and Performance',
    description: 'The organization reports on risk, culture, and performance at multiple levels.',
    keywords: ['reporting', 'disclosure', 'transparency', 'board', 'executive']
  }
];

export const ALL_FRAMEWORK_CONTROLS: FrameworkControl[] = [
  ...COBIT_2019_CONTROLS,
  ...COSO_ERM_CONTROLS
];

export function getControlsByFramework(framework: FrameworkType): FrameworkControl[] {
  return ALL_FRAMEWORK_CONTROLS.filter(c => c.framework === framework);
}

export function getControlById(id: string): FrameworkControl | undefined {
  return ALL_FRAMEWORK_CONTROLS.find(c => c.id === id);
}

export function searchControlsByKeyword(keyword: string): FrameworkControl[] {
  const lowerKeyword = keyword.toLowerCase();
  return ALL_FRAMEWORK_CONTROLS.filter(c => 
    c.keywords.some(k => k.toLowerCase().includes(lowerKeyword)) ||
    c.controlName.toLowerCase().includes(lowerKeyword) ||
    c.description.toLowerCase().includes(lowerKeyword)
  );
}
