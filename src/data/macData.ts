export interface SecurityLevel {
  id: string;
  name: string;
  rank: number; // 1 to 4
  badgeColor: string;
  glowColor: string;
  description: string;
}

export const MAC_SECURITY_LEVELS: SecurityLevel[] = [
  {
    id: 'unclassified',
    name: 'Unclassified',
    rank: 1,
    badgeColor: '#A8B3C7',
    glowColor: 'rgba(168, 179, 199, 0.3)',
    description: 'Routine public information; disclosure causes zero national/organizational harm.'
  },
  {
    id: 'confidential',
    name: 'Confidential',
    rank: 2,
    badgeColor: '#4F8CFF',
    glowColor: 'rgba(79, 140, 255, 0.3)',
    description: 'Information that would cause measurable damage to security operations if disclosed.'
  },
  {
    id: 'secret',
    name: 'Secret',
    rank: 3,
    badgeColor: '#FFBF69',
    glowColor: 'rgba(255, 191, 105, 0.3)',
    description: 'Sensitive operational material; unauthorized disclosure would cause serious damage.'
  },
  {
    id: 'top_secret',
    name: 'Top Secret',
    rank: 4,
    badgeColor: '#FF5C8A',
    glowColor: 'rgba(255, 92, 138, 0.4)',
    description: 'Highest classification tier; unauthorized disclosure causes exceptionally grave damage.'
  }
];

export interface MacSampleDocument {
  id: string;
  title: string;
  levelId: string;
  description: string;
}

export const MAC_SAMPLE_DOCUMENTS: MacSampleDocument[] = [
  {
    id: 'doc-1',
    title: 'Public Press Release: Quarterly Research Grant',
    levelId: 'unclassified',
    description: 'General marketing document published to corporate portal.'
  },
  {
    id: 'doc-2',
    title: 'Internal Audit: Subnet Architecture Diagram',
    levelId: 'confidential',
    description: 'Private IT schematic showing internal firewall IP addresses.'
  },
  {
    id: 'doc-3',
    title: 'Defense Tactical Plan: Project Aegis Sentinel',
    levelId: 'secret',
    description: 'Classified satellite encryption keys and radar vectors.'
  },
  {
    id: 'doc-4',
    title: 'Special Access Program (SAP): Black Horizon Nuclear Shield',
    levelId: 'top_secret',
    description: 'Ultra-compartmented strategic response plan.'
  }
];
