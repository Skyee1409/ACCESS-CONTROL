export interface ModelComparisonItem {
  id: 'dac' | 'mac' | 'rbac' | 'abac';
  name: string;
  fullName: string;
  tagline: string;
  color: string;
  badge: string;
  decisionAuthority: string;
  granularity: string;
  flexibilityScore: number; // 1-10
  securityScore: number;    // 1-10
  complexityScore: number;  // 1-10
  scalabilityScore: number; // 1-10
  contextAwareScore: number;// 1-10
  bestUsedFor: string;
  majorRisk: string;
  keyStandard: string;
  pros: string[];
  cons: string[];
}

export const COMPARISON_MODELS: ModelComparisonItem[] = [
  {
    id: 'dac',
    name: 'DAC',
    fullName: 'Discretionary Access Control',
    tagline: 'Owner-Driven Decentralized Autonomy',
    color: '#FFBF69',
    badge: 'DECENTRALIZED',
    decisionAuthority: 'Resource Creator / Owner',
    granularity: 'Object-level (Read, Write, Execute)',
    flexibilityScore: 9,
    securityScore: 4,
    complexityScore: 3,
    scalabilityScore: 3,
    contextAwareScore: 2,
    bestUsedFor: 'Personal workstations, desktop filesystems, collaborative document shares (Google Docs).',
    majorRisk: 'Privilege escalation via Trojan horses; inadvertent public sharing by untrained users.',
    keyStandard: 'POSIX / Linux chmod & Windows NTFS Discretionary ACLs',
    pros: [
      'Simple mental model for end-users',
      'No central administrator required for everyday file sharing',
      'Extremely high owner flexibility and fast changes'
    ],
    cons: [
      'No centralized governance or enterprise audit visibility',
      'Subject to Trojan horse permission propagation',
      'Vulnerable to careless data leaks by owners'
    ]
  },
  {
    id: 'mac',
    name: 'MAC',
    fullName: 'Mandatory Access Control',
    tagline: 'Kernel-Enforced Multilevel Clearances',
    color: '#35D5E8',
    badge: 'HIGH ASSURANCE',
    decisionAuthority: 'System Kernel / Central Security Policy',
    granularity: 'Security Label & Classification Level',
    flexibilityScore: 2,
    securityScore: 10,
    complexityScore: 8,
    scalabilityScore: 5,
    contextAwareScore: 4,
    bestUsedFor: 'Military defense (DoD), intelligence systems, NSA SELinux, critical infrastructure.',
    majorRisk: 'Operational paralysis and user friction due to rigid administrative constraints.',
    keyStandard: 'Bell-LaPadula (Confidentiality) & Biba (Integrity) Models, Common Criteria EAL 5-7',
    pros: [
      'Mathematically proven containment of data spills',
      'Immune to Trojan horse and malware privilege escalations',
      'Strict separation of classified compartments'
    ],
    cons: [
      'Extreme administrative overhead and labeling costs',
      'Virtually zero flexibility for dynamic modern workflows',
      'High friction slows operational innovation'
    ]
  },
  {
    id: 'rbac',
    name: 'RBAC',
    fullName: 'Role-Based Access Control',
    tagline: 'Enterprise Governance through Organizational Roles',
    color: '#4F8CFF',
    badge: 'ENTERPRISE STANDARD',
    decisionAuthority: 'Identity & Access Administrator',
    granularity: 'Role-to-Permission mapping',
    flexibilityScore: 6,
    securityScore: 7,
    complexityScore: 5,
    scalabilityScore: 8,
    contextAwareScore: 3,
    bestUsedFor: 'Enterprise SaaS, hospital clinical systems, ERP (SAP), corporate Active Directory.',
    majorRisk: 'Role Explosion: Hundreds of hyper-specific roles created for transient exceptions.',
    keyStandard: 'ANSI/INCITS 359-2004 & NIST Special Publication 800-162',
    pros: [
      'Directly maps to corporate hierarchy and job functions',
      'Streamlines employee onboarding and offboarding',
      'Enables structured Separation of Duties (SoD)'
    ],
    cons: [
      'Prone to severe Role Explosion in complex environments',
      'Completely blind to runtime context (time, location, device)',
      'Coarse-grained; hard to restrict specific data records'
    ]
  },
  {
    id: 'abac',
    name: 'ABAC',
    fullName: 'Attribute-Based Access Control',
    tagline: 'Dynamic Runtime Context for Zero Trust',
    color: '#36D399',
    badge: 'ZERO TRUST READY',
    decisionAuthority: 'Central Policy Engine (PDP) evaluating Boolean logic',
    granularity: 'Fine-grained attribute predicates (Subject + Resource + Action + Env)',
    flexibilityScore: 10,
    securityScore: 9,
    complexityScore: 9,
    scalabilityScore: 9,
    contextAwareScore: 10,
    bestUsedFor: 'Cloud Native / AWS IAM condition policies, Zero Trust perimeter, IoT, fintech microservices.',
    majorRisk: 'High computational overhead during evaluation and cognitive complexity debugging policies.',
    keyStandard: 'eXtensible Access Control Markup Language (XACML) & Open Policy Agent (OPA)',
    pros: [
      'Infinite granularity based on live environmental context',
      'Eliminates role explosion by using conditional logic',
      'Foundational requirement for true Zero Trust architecture'
    ],
    cons: [
      'High policy authoring and governance complexity',
      'Potential latency overhead during PDP rule evaluation',
      'Difficult to audit "who has access to what" across all combinations'
    ]
  }
];

export const RADAR_DATA = [
  { metric: 'Flexibility', DAC: 9, MAC: 2, RBAC: 6, ABAC: 10 },
  { metric: 'Security Assurance', DAC: 4, MAC: 10, RBAC: 7, ABAC: 9 },
  { metric: 'Ease of Setup', DAC: 9, MAC: 2, RBAC: 7, ABAC: 4 },
  { metric: 'Scalability', DAC: 3, MAC: 5, RBAC: 8, ABAC: 9 },
  { metric: 'Context Awareness', DAC: 2, MAC: 3, RBAC: 3, ABAC: 10 }
];
