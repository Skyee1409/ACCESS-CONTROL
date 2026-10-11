export interface AbacSubject {
  id: string;
  name: string;
  role: string;
  department: string;
  seniorityYears: number;
  clearanceLevel: number; // 1 to 3
}

export interface AbacResource {
  id: string;
  title: string;
  department: string;
  classification: 'Standard' | 'Confidential' | 'Restricted';
  requiredClearance: number;
}

export interface AbacEnvironment {
  network: 'hospital_lan' | 'public_wifi';
  device: 'managed_encrypted' | 'personal_unmanaged';
  timeSlot: 'business_hours' | 'emergency_night' | 'off_hours_midnight';
}

export const ABAC_SUBJECTS: AbacSubject[] = [
  {
    id: 'alice',
    name: 'Dr. Alice Carter',
    role: 'Attending Cardiothoracic Surgeon',
    department: 'Surgery',
    seniorityYears: 12,
    clearanceLevel: 3
  },
  {
    id: 'bob',
    name: 'Dr. Bob Miller',
    role: 'Pediatric Resident',
    department: 'Pediatrics',
    seniorityYears: 2,
    clearanceLevel: 1
  },
  {
    id: 'carol',
    name: 'Carol Henderson',
    role: 'Billing & Compliance Manager',
    department: 'Finance',
    seniorityYears: 6,
    clearanceLevel: 2
  }
];

export const ABAC_RESOURCES: AbacResource[] = [
  {
    id: 'cardiac_surgery_record',
    title: 'Operative Bypass Protocol #8492',
    department: 'Surgery',
    classification: 'Confidential',
    requiredClearance: 2
  },
  {
    id: 'pediatric_chart',
    title: 'Pediatric Immunization Record #3104',
    department: 'Pediatrics',
    classification: 'Standard',
    requiredClearance: 1
  },
  {
    id: 'hospital_financial_ledger',
    title: 'Executive Compensation & Insurance Settlement',
    department: 'Finance',
    classification: 'Restricted',
    requiredClearance: 3
  }
];

export type AbacAction = 'READ' | 'EDIT' | 'EXPORT_DOWNLOAD' | 'BREAK_GLASS';
