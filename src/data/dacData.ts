export interface DacFile {
  id: string;
  name: string;
  size: string;
  owner: string;
  group: string;
  description: string;
  icon: string;
}

export const DAC_SAMPLE_FILES: DacFile[] = [
  {
    id: 'confidential_budget.xlsx',
    name: 'q4_financial_audit.xlsx',
    size: '2.4 MB',
    owner: 'alice',
    group: 'finance_team',
    description: 'Corporate payroll and executive bonus structures',
    icon: 'file-spreadsheet'
  },
  {
    id: 'prod_deploy.sh',
    name: 'prod_deploy_cluster.sh',
    size: '14.2 KB',
    owner: 'alice',
    group: 'devops_eng',
    description: 'Bash automation script to tear down and rebuild production pods',
    icon: 'terminal'
  },
  {
    id: 'research_notes.md',
    name: 'quantum_cryptanalysis.md',
    size: '48.1 KB',
    owner: 'alice',
    group: 'research_lab',
    description: 'Post-quantum lattice cryptography experimental notes',
    icon: 'file-text'
  }
];

export interface SimulatedDacUser {
  id: string;
  name: string;
  roleDescription: string;
  userType: 'owner' | 'group' | 'others';
  avatarInitials: string;
}

export const SIMULATED_DAC_USERS: SimulatedDacUser[] = [
  {
    id: 'alice',
    name: 'Alice (Creator / Owner)',
    roleDescription: 'Primary creator of this resource. Holds owner-level permissions.',
    userType: 'owner',
    avatarInitials: 'AL'
  },
  {
    id: 'bob',
    name: 'Bob (Colleague in Group)',
    roleDescription: 'Member of the same organizational Unix group. Inherits group permissions.',
    userType: 'group',
    avatarInitials: 'BO'
  },
  {
    id: 'eve',
    name: 'Eve (Public / Other User)',
    roleDescription: 'External user or unauthorized insider. Governed strictly by "Other" permissions.',
    userType: 'others',
    avatarInitials: 'EV'
  }
];
