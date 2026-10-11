import { QuizQuestion } from '../types/presentation';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Under the Bell-LaPadula Mandatory Access Control (MAC) model, which scenario is strictly prohibited to guarantee Confidentiality?',
    scenario: 'An intelligence analyst holding a "Top Secret" clearance is drafting an incident briefing document, while an unclassified contractor is reviewing routine public notices.',
    options: [
      {
        id: 'A',
        text: 'A user with "Secret" clearance reading a document classified as "Confidential"',
        isCorrect: false
      },
      {
        id: 'B',
        text: 'A user with "Top Secret" clearance writing sensitive operational data into an "Unclassified" file',
        isCorrect: true
      },
      {
        id: 'C',
        text: 'A user with "Top Secret" clearance reading a document marked "Secret"',
        isCorrect: false
      },
      {
        id: 'D',
        text: 'A security officer appending audit log entries to an append-only system file',
        isCorrect: false
      }
    ],
    explanation: 'Correct! The Bell-LaPadula model enforces two fundamental rules: the Simple Security Property ("No Read Up") and the *-Property / Star Property ("No Write Down"). Writing from a higher clearance (Top Secret) down to a lower classification (Unclassified) is prohibited to prevent high-level classified data from being leaked or declassified.',
    conceptTag: 'MAC'
  },
  {
    id: 2,
    question: 'An enterprise healthcare network has created over 850 distinct roles like "Doctor_Cardiology_NightShift_ICU_Floor4", leading to an unmanageable governance crisis known as Role Explosion. Which access control paradigm directly eliminates this problem?',
    scenario: 'Administrators struggle to keep up with hundreds of hybrid roles created for situational combinations of department, floor, and shift time.',
    options: [
      {
        id: 'A',
        text: 'Discretionary Access Control (DAC), by delegating file ownership to individual nurses and doctors',
        isCorrect: false
      },
      {
        id: 'B',
        text: 'Attribute-Based Access Control (ABAC), by evaluating dynamic conditions (Department, Shift, Location) at runtime',
        isCorrect: true
      },
      {
        id: 'C',
        text: 'Mandatory Access Control (MAC), by assigning Top Secret labels to all hospital patients',
        isCorrect: false
      },
      {
        id: 'D',
        text: 'Static ACLs, by manually writing IP addresses into individual server firewall tables',
        isCorrect: false
      }
    ],
    explanation: 'Correct! Attribute-Based Access Control (ABAC) eliminates role explosion by evaluating dynamic attributes (Subject role: "Doctor", Environment shift: "Night", Subject department: "Cardiology", Resource floor: "ICU") dynamically using Boolean policies, without needing to create hundreds of static bespoke roles.',
    conceptTag: 'ABAC'
  },
  {
    id: 3,
    question: 'What is the defining characteristic of Discretionary Access Control (DAC)?',
    scenario: 'Alice creates a financial forecast spreadsheet on an operating system and needs to decide who in her department can modify it.',
    options: [
      {
        id: 'A',
        text: 'The operating system kernel enforces security labels that cannot be altered even by system administrators',
        isCorrect: false
      },
      {
        id: 'B',
        text: 'Access rights are derived exclusively from organizational job titles in active directory',
        isCorrect: false
      },
      {
        id: 'C',
        text: 'The creator or owner of the resource has full discretion to grant or revoke access permissions for others',
        isCorrect: true
      },
      {
        id: 'D',
        text: 'Access is granted automatically based on geographic proximity to the primary data center',
        isCorrect: false
      }
    ],
    explanation: 'Correct! In DAC, "discretion" belongs to the resource owner. The creator of an object has total autonomy to assign read, write, and execute permissions (as seen in Unix chmod and Windows NTFS). However, this introduces risk if the owner unintentionally overshares sensitive files.',
    conceptTag: 'DAC'
  },
  {
    id: 4,
    question: 'Which core security principle requires that high-consequence operations (such as approving university degree certificates or transferring $1M) involve at least two distinct individuals to prevent fraud and errors?',
    scenario: 'A fintech payment gateway ensures that an engineer who authors a transaction cannot be the same individual who authorizes its final settlement.',
    options: [
      {
        id: 'A',
        text: 'Separation of Duties (SoD) / Dual Control',
        isCorrect: true
      },
      {
        id: 'B',
        text: 'Fail-Safe Defaults (Implicit Deny)',
        isCorrect: false
      },
      {
        id: 'C',
        text: 'Defense in Depth',
        isCorrect: false
      },
      {
        id: 'D',
        text: 'Open Design Principle',
        isCorrect: false
      }
    ],
    explanation: 'Correct! Separation of Duties (SoD), also known as Dual Control or Maker-Checker, dictates that critical tasks require authorization from multiple parties, ensuring that no single compromised credential or rogue insider can execute catastrophic actions unilaterally.',
    conceptTag: 'PRINCIPLES'
  },
  {
    id: 5,
    question: 'In our College Examination Management System (EMS), an External Evaluator needs to grade answer scripts for Course CS401. Why is ABAC essential alongside RBAC for this workflow?',
    scenario: 'Professor Smith is an External Evaluator. He must evaluate scripts for CS401, but ONLY between June 10 and June 20, from an authorized institutional portal IP, without seeing student identifying details.',
    options: [
      {
        id: 'A',
        text: 'RBAC cannot represent the role of "Evaluator" in a database table',
        isCorrect: false
      },
      {
        id: 'B',
        text: 'ABAC is required to enforce dynamic contextual constraints such as evaluation date windows, course-matching attributes, and anonymization masking',
        isCorrect: true
      },
      {
        id: 'C',
        text: 'DAC is required because Professor Smith owns the university\'s core database schema',
        isCorrect: false
      },
      {
        id: 'D',
        text: 'MAC prevents all professors from using web browsers during the summer break',
        isCorrect: false
      }
    ],
    explanation: 'Correct! While RBAC establishes the basic role ("External Evaluator"), ABAC is required to enforce the fine-grained runtime conditions: matching course ID, temporal evaluation window (June 10–20), IP subnet, and dynamic stripping of student identity tokens (anonymization).',
    conceptTag: 'CASE STUDY'
  }
];
