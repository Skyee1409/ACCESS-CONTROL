export interface RbacRole {
  id: string;
  name: string;
  title: string;
  department: string;
  color: string;
  description: string;
  inheritsFrom?: string;
  permissions: string[];
}

export interface RbacPermission {
  id: string;
  label: string;
  category: 'clinical' | 'pharmacy' | 'billing' | 'audit';
  description: string;
}

export const RBAC_PERMISSIONS: RbacPermission[] = [
  {
    id: 'view_general_chart',
    label: 'View Vital Signs & History',
    category: 'clinical',
    description: 'Read routine patient observations, triage vitals, and allergy warnings.'
  },
  {
    id: 'view_psych_notes',
    label: 'View Sensitive Psych Notes',
    category: 'clinical',
    description: 'Restricted psychiatric and behavioral health therapy notes.'
  },
  {
    id: 'prescribe_medication',
    label: 'Prescribe Controlled Rx',
    category: 'pharmacy',
    description: 'Authorize prescription orders and pharmacological regimens.'
  },
  {
    id: 'administer_medication',
    label: 'Administer Doses to Bedside',
    category: 'pharmacy',
    description: 'Scan patient wristband and deliver scheduled medications.'
  },
  {
    id: 'manage_billing',
    label: 'Process Insurance Claims',
    category: 'billing',
    description: 'Submit ICD-10 coding and execute billing invoicing.'
  },
  {
    id: 'export_audit_logs',
    label: 'Export HIPAA Access Logs',
    category: 'audit',
    description: 'Extract immutable system access and modification timestamps.'
  }
];

export const RBAC_ROLES: RbacRole[] = [
  {
    id: 'cmo',
    name: 'Chief Medical Officer',
    title: 'Executive Clinical Director',
    department: 'Hospital Administration',
    color: '#FF5C8A',
    description: 'Executive clinical leader; inherits physician rights plus hospital audit oversight.',
    permissions: [
      'view_general_chart',
      'view_psych_notes',
      'prescribe_medication',
      'manage_billing',
      'export_audit_logs'
    ]
  },
  {
    id: 'doctor',
    name: 'Attending Physician',
    title: 'Lead Care Provider',
    department: 'Cardiology / Internal Med',
    color: '#4F8CFF',
    description: 'Authorized to diagnose, view sensitive notes, and author prescription orders.',
    permissions: [
      'view_general_chart',
      'view_psych_notes',
      'prescribe_medication'
    ]
  },
  {
    id: 'nurse',
    name: 'Registered Nurse (RN)',
    title: 'Bedside Care Specialist',
    department: 'Inpatient Care Unit',
    color: '#35D5E8',
    description: 'Administers medications and updates vitals; cannot write prescriptions (SoD).',
    permissions: [
      'view_general_chart',
      'administer_medication'
    ]
  },
  {
    id: 'pharmacist',
    name: 'Clinical Pharmacist',
    title: 'Medication Safety Officer',
    department: 'Central Pharmacy',
    color: '#FFBF69',
    description: 'Validates drug interactions and prepares dosages; cannot view psychiatric notes.',
    permissions: [
      'view_general_chart',
      'administer_medication'
    ]
  },
  {
    id: 'auditor',
    name: 'Compliance Auditor',
    title: 'HIPAA Regulatory Officer',
    department: 'Risk & Governance',
    color: '#36D399',
    description: 'Monitors adherence and exports logs; strictly prohibited from clinical intervention.',
    permissions: [
      'manage_billing',
      'export_audit_logs'
    ]
  }
];
