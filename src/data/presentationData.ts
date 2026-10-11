import { SlideMeta } from '../types/presentation';

export const SLIDES_METADATA: SlideMeta[] = [
  {
    id: 1,
    slug: 'title',
    title: 'ACCESS CONTROL: Foundations, Architectures & Implementation',
    category: 'INTRODUCTION',
    durationSeconds: 45,
    summary: 'Masterclass overview on DAC, MAC, RBAC, and ABAC in modern cybersecurity architectures.',
    presenterNotes: {
      talkDuration: '45 seconds',
      talkingPoints: [
        'Welcome students and security engineering peers to this deep-dive masterclass.',
        'Access Control is the bedrock of defensive cybersecurity and Zero Trust systems.',
        'Introduce the four cornerstones: DAC, MAC, RBAC, and ABAC.',
        'Highlight that today we explore theoretical models, architectural workflows, interactive hands-on sandboxes, and a real-world university portal case study.'
      ],
      script: 'Good morning, everyone. Welcome to our masterclass on Access Control. In information security, keeping adversaries out of our perimeter is only half the battle. What happens once an identity is inside the system? That is where Access Control operates. Today, we will demystify the four quintessential paradigms: Discretionary, Mandatory, Role-Based, and Attribute-Based Access Control. By the end of this session, you will understand not just how they work on paper, but how to architect them in real-world infrastructure.'
    }
  },
  {
    id: 2,
    slug: 'agenda',
    title: 'Session Roadmap & Learning Objectives',
    category: 'INTRODUCTION',
    durationSeconds: 45,
    summary: 'Roadmap of the 4 key instructional phases covering foundations, core models, industry application, and case evaluation.',
    presenterNotes: {
      talkDuration: '45 seconds',
      talkingPoints: [
        'Phase 1: Foundations (IAAA model, business rationale, AuthN vs AuthZ, NIST XACML workflow).',
        'Phase 2: The Core Models with interactive simulation engines.',
        'Phase 3: Deep comparative analysis, industry sectors, least privilege, and anti-patterns.',
        'Phase 4: College Examination Portal case study and scored 5-question comprehension quiz.'
      ],
      script: 'Let us examine our trajectory for today. We have structured this session into four rigorous phases. We start with foundational security theory—clarifying the vital distinction between authentication and authorization, and examining the NIST reference architecture. Next, we will spend dedicated time exploring each of the four access models with interactive live simulators. Then, we bridge theory to practice by analyzing enterprise challenges like role explosion and privilege creep. Finally, we analyze a complex examination portal case study and test your knowledge.'
    }
  },
  {
    id: 3,
    slug: 'what-is-access-control',
    title: 'What Is Access Control? Core Concepts & Reference Model',
    category: 'FOUNDATIONS',
    durationSeconds: 50,
    summary: 'Formal definition of access control, the IAAA framework, subjects, objects, operations, and the Reference Monitor.',
    presenterNotes: {
      talkDuration: '50 seconds',
      talkingPoints: [
        'Define access control as the selective restriction of access to resources.',
        'Clarify the IAAA sequence: Identification, Authentication, Authorization, Accountability.',
        'Introduce the Reference Monitor concept: Complete mediation, tamper-proof, verifiable.',
        'Define the fundamental triad of access requests: Subject, Object, and Operation.'
      ],
      script: 'At its core, access control is the mechanism that dictates who can access what, under what conditions, and what actions they can perform. In classical computer security, we speak of the IAAA model: you identify yourself with a username, authenticate with a credential, receive authorization based on policy, and are held accountable through immutable audit logs. The engine enforcing this is the Reference Monitor. Remember Anderson\'s criteria from 1972: an effective reference monitor must be tamper-proof, always invoked, and small enough to be thoroughly verified.'
    }
  },
  {
    id: 4,
    slug: 'why-it-matters',
    title: 'Why Access Control Matters: Defense, Compliance & The Stakes',
    category: 'FOUNDATIONS',
    durationSeconds: 50,
    summary: 'The impact on CIA triad, credential abuse statistics, insider threats, regulatory compliance, and lateral movement prevention.',
    presenterNotes: {
      talkDuration: '50 seconds',
      talkingPoints: [
        'Impact on Confidentiality, Integrity, and Availability (CIA Triad).',
        'Industry statistics: over 80% of data breaches involve compromised credentials or over-privileged access.',
        'Compliance standards mandate strict access control: HIPAA, PCI-DSS, GDPR, ISO 27001.',
        'Containment of lateral movement during active cyber incidents.'
      ],
      script: 'Why do we dedicate entire security architectures to access control? Because perimeter firewalls cannot save you if an authenticated user has unrestricted access. When an attacker compromises an endpoint or credential, access control is the primary defensive barrier preventing lateral movement. Excessive permissions are the number one enabler of catastrophic data exfiltration. Whether adhering to HIPAA in healthcare, PCI-DSS in payment systems, or protecting national secrets, granular access control is the cornerstone of regulatory compliance.'
    }
  },
  {
    id: 5,
    slug: 'authn-vs-authz',
    title: 'Authentication (AuthN) vs Authorization (AuthZ)',
    category: 'FOUNDATIONS',
    durationSeconds: 55,
    summary: 'Unpacking the crucial difference between identity verification and permission enforcement through airport and hotel analogies.',
    presenterNotes: {
      talkDuration: '55 seconds',
      talkingPoints: [
        'AuthN answers: "Who are you?" (Proof of Identity).',
        'AuthZ answers: "What are you permitted to do?" (Scope of Rights).',
        'Use intuitive analogies: Airport passport control vs boarding pass gate access; Hotel check-in vs room keycard.',
        'Protocols and artifacts: SAML/OIDC/Kerberos vs ACLs/RBAC/OAuth2 Scopes.'
      ],
      script: 'One of the most frequent misconceptions in IT is conflating authentication with authorization. Consider an international flight. When you present your passport at border control, they verify your identity—that is Authentication. But your passport alone does not let you board flight 402 to Zurich. For that, you need a boarding pass stamped with seat 14B—that is Authorization. Similarly, in web systems, OpenID Connect proves who you are, while OAuth scopes or policy engines determine whether you can update a database record.'
    }
  },
  {
    id: 6,
    slug: 'components-workflow',
    title: 'Access Control Architecture: The NIST / XACML Engine',
    category: 'FOUNDATIONS',
    durationSeconds: 60,
    summary: 'Architectural pipeline: Subject, Object, Action, Environment, PEP, PDP, PAP, and PIP interaction.',
    presenterNotes: {
      talkDuration: '60 seconds',
      talkingPoints: [
        'Explain the standard XACML architectural components.',
        'PEP (Policy Enforcement Point): The gateway or proxy intercepting requests.',
        'PDP (Policy Decision Point): The brain evaluating logic and returning Permit/Deny.',
        'PIP (Policy Information Point): Context source supplying attributes.',
        'PAP (Policy Administration Point): Where policies are authored and maintained.'
      ],
      script: 'To implement enterprise-grade access control, we rely on the NIST and XACML architectural pattern. Every request follows a six-step handshake. When a subject attempts an action on a resource, the request is intercepted by the Policy Enforcement Point, or PEP. The PEP does not make the decision itself—it asks the Policy Decision Point, or PDP. The PDP consults the Policy Information Point, or PIP, to gather live contextual data like geolocation or time of day, compares it against policies authored at the PAP, and renders a definitive verdict: Permit or Deny.'
    }
  },
  {
    id: 7,
    slug: 'dac',
    title: 'Discretionary Access Control (DAC): Owner-Driven Permissions',
    category: 'CORE MODELS',
    durationSeconds: 55,
    summary: 'Principle of resource ownership, Unix file permissions (rwx/octal), Windows ACLs, benefits, and severe security pitfalls.',
    presenterNotes: {
      talkDuration: '55 seconds',
      talkingPoints: [
        'Core definition: The resource creator/owner has total discretion over permissions.',
        'Standard implementation: POSIX/Linux chmod (Read=4, Write=2, Execute=1), Windows NTFS ACLs.',
        'Key strength: Maximum user autonomy and simplicity for consumer operating systems.',
        'Major vulnerability: The Trojan Horse problem and untracked privilege escalation; users can easily overshare sensitive data.'
      ],
      script: 'Let us examine our first major model: Discretionary Access Control, or DAC. In DAC, ownership is absolute. If you create a file, you own it, and you decide who can read, write, or execute it. We see this daily in Unix chmod commands and Google Drive share settings. While DAC provides exceptional user autonomy and minimal administrative overhead, it has a fatal flaw from an enterprise security perspective: there is no centralized governance. If an employee with read access copies sensitive data to a public folder, the system cannot prevent it.'
    }
  },
  {
    id: 8,
    slug: 'mac',
    title: 'Mandatory Access Control (MAC): System-Enforced Clearances',
    category: 'CORE MODELS',
    durationSeconds: 60,
    summary: 'System-enforced security labels, Bell-LaPadula model (No Read Up, No Write Down), Biba model, SELinux, and defense architectures.',
    presenterNotes: {
      talkDuration: '60 seconds',
      talkingPoints: [
        'Core definition: Access decisions are enforced strictly by the operating system based on fixed security labels.',
        'Clearance levels: Top Secret, Secret, Confidential, Unclassified.',
        'Bell-LaPadula Model (Confidentiality): Simple Security Property (No Read Up) and Star Property (No Write Down).',
        'Biba Model (Integrity): Inverted rules to prevent corrupting high-integrity data.',
        'SELinux and Multilevel Security (MLS) implementations.'
      ],
      script: 'In direct contrast to DAC stands Mandatory Access Control, or MAC. Under MAC, users have zero discretion over permissions. The operating system kernel enforces security labels. Every user has a security clearance, and every object has a sensitivity classification. The foundational model here is Bell-LaPadula, formulated for confidentiality. It dictates two core rules: No Read Up—a Confidential user cannot read Top Secret documents—and No Write Down—a Top Secret user cannot write data into an Unclassified document, preventing accidental or malicious leakage of state secrets.'
    }
  },
  {
    id: 9,
    slug: 'rbac',
    title: 'Role-Based Access Control (RBAC): The Enterprise Workhorse',
    category: 'CORE MODELS',
    durationSeconds: 55,
    summary: 'Users mapped to Roles mapped to Permissions, NIST RBAC standards, role hierarchies, and overcoming role explosion.',
    presenterNotes: {
      talkDuration: '55 seconds',
      talkingPoints: [
        'Core mechanism: Decoupling users from direct permissions through intermediate organizational Roles.',
        'Formula: Users -> Roles -> Permissions.',
        'Hierarchical RBAC: Inheritance of permissions (e.g., Medical Director inherits Doctor permissions).',
        'Separation of Duties (SoD): Mutual exclusion prevents conflicts of interest.',
        'The primary drawback: Role explosion as business logic becomes increasingly nuanced.'
      ],
      script: 'Role-Based Access Control, or RBAC, is the undeniable workhorse of modern enterprise systems. In an organization with ten thousand employees, assigning permissions individually is a recipe for disaster. RBAC solves this by creating an abstraction layer: permissions are bound to roles like "Doctor", "Auditor", or "Engineer", and users are assigned to roles. When an employee switches departments, revoking and reassigning one role immediately updates hundreds of permissions. However, when complex business rules arise, RBAC often suffers from role explosion.'
    }
  },
  {
    id: 10,
    slug: 'abac',
    title: 'Attribute-Based Access Control (ABAC): Dynamic Next-Gen Context',
    category: 'CORE MODELS',
    durationSeconds: 60,
    summary: 'Fine-grained, real-time evaluation of Subject, Resource, Action, and Environmental attributes for Zero Trust.',
    presenterNotes: {
      talkDuration: '60 seconds',
      talkingPoints: [
        'Core mechanism: Dynamic evaluation of Boolean logic based on attributes at runtime.',
        'Four attribute categories: Subject (who), Resource (what), Action (how), and Environment (where/when/device).',
        'Eliminates role explosion by using conditional rules rather than static role assignments.',
        'Essential pillar of modern Zero Trust architectures, AWS IAM Condition Keys, and Open Policy Agent (OPA).',
        'Trade-offs: High computational complexity and difficulty in calculating the blast radius of policy edits.'
      ],
      script: 'Attribute-Based Access Control, or ABAC, represents the next evolutionary leap. Instead of asking "What role does Alice hold?", ABAC evaluates a dynamic formula across four dimensions: Subject attributes, Resource attributes, Action attributes, and Environmental context. For instance: "Allow access IF subject is a Senior Cardiologist, AND resource is a patient record in their clinic, AND action is Read, AND access time is during clinic hours, AND the connection originates from an encrypted hospital workstation." This dynamic flexibility makes ABAC the ideal engine for Zero Trust.'
    }
  },
  {
    id: 11,
    slug: 'model-comparison',
    title: 'Comparative Analysis: DAC vs MAC vs RBAC vs ABAC',
    category: 'ANALYSIS',
    durationSeconds: 50,
    summary: 'Comprehensive multi-variable matrix comparing authority, granularity, complexity, flexibility, and security profiles.',
    presenterNotes: {
      talkDuration: '50 seconds',
      talkingPoints: [
        'Walk through the decision axes: Authority, Flexibility, Complexity, and Security Assurance.',
        'DAC: High flexibility, low security assurance, ideal for desktop operating systems.',
        'MAC: Maximum security assurance, near-zero flexibility, essential for defense and high-assurance kernels.',
        'RBAC: Medium complexity, high manageability, standard for traditional enterprise software.',
        'ABAC: Maximum granularity and context-awareness, high evaluation overhead, backbone of cloud & Zero Trust.'
      ],
      script: 'When architecting a secure system, there is no silver bullet. Selecting an access model requires balancing security assurance, organizational complexity, and administrative overhead. This comparative matrix clarifies the trade-offs. Notice how DAC prioritizes owner freedom at the expense of security assurance, while MAC prioritizes strict containment at the cost of operational rigidity. RBAC provides the sweet spot for organizational hierarchies, whereas ABAC handles modern cloud environments with dynamic environmental factors.'
    }
  },
  {
    id: 12,
    slug: 'real-world-applications',
    title: 'Real-World Applications: Defense, Cloud, Health & Finance',
    category: 'ANALYSIS',
    durationSeconds: 50,
    summary: 'Industry implementations: AWS IAM policy structures, HIPAA-compliant EHRs, SELinux enforcement, and SWIFT wire transfer controls.',
    presenterNotes: {
      talkDuration: '50 seconds',
      talkingPoints: [
        'Cloud Infrastructure: AWS IAM combines RBAC (Roles) with ABAC (Condition keys like aws:SourceIp).',
        'Healthcare: Epic/Cerner EHR systems use RBAC with ABAC Break-Glass emergency override mechanisms.',
        'Operating Systems: Linux employs DAC for user files and SELinux MAC for process sandboxing.',
        'Financial Networks: SWIFT and banking cores mandate strict Dual-Control Separation of Duties.'
      ],
      script: 'Let us see how these models materialize in production. In modern cloud architecture, such as Amazon Web Services, you almost never use pure RBAC. You use Hybrid RBAC and ABAC: you assume an IAM role, but your access is constrained by ABAC conditions such as IP whitelisting or MFA age. In healthcare, patient safety requires "Break-Glass" ABAC exceptions so emergency physicians can override standard access during cardiac arrest. In operating systems, SELinux enforces MAC policies to contain container escapes and zero-day vulnerabilities.'
    }
  },
  {
    id: 13,
    slug: 'security-principles',
    title: 'Foundational Security Principles: Least Privilege & Beyond',
    category: 'ANALYSIS',
    durationSeconds: 55,
    summary: 'Core tenets of authorization: Principle of Least Privilege, Separation of Duties, Need-to-Know, Fail-Safe Defaults, and Defense in Depth.',
    presenterNotes: {
      talkDuration: '55 seconds',
      talkingPoints: [
        'Principle of Least Privilege (PoLP): Grant only the bare minimum permissions needed for the shortest required time.',
        'Separation of Duties (SoD): High-impact tasks require two distinct authorized parties (Maker-Checker).',
        'Need-to-Know: Clearance without legitimate business need does not grant authorization.',
        'Fail-Safe Defaults (Default Deny / Implicit Deny): If an explicit allow rule is absent, access is rejected.',
        'Defense in Depth: Layered authorization checks across network, API gateway, and microservice.'
      ],
      script: 'Regardless of which model you implement, your access architecture must be grounded in enduring security engineering principles. Chief among these is the Principle of Least Privilege: users, processes, and service accounts should possess only the absolute minimum permissions needed to execute their functions. Pair this with Fail-Safe Defaults—otherwise known as Default Deny. If no explicit rule authorizes an action, the system must categorically reject it. Furthermore, high-consequence operations like disbursing millions of dollars require Separation of Duties.'
    }
  },
  {
    id: 14,
    slug: 'security-challenges',
    title: 'Security Pitfalls & Anti-Patterns in Modern Access Systems',
    category: 'ANALYSIS',
    durationSeconds: 50,
    summary: 'Privilege creep, role explosion, shadow admin accounts, over-privileged cloud tokens, and audit blindness.',
    presenterNotes: {
      talkDuration: '50 seconds',
      talkingPoints: [
        'Privilege Creep: Staff accumulate legacy rights as they transfer across departments over time.',
        'Role Explosion: Proliferation of hundreds of single-purpose roles rendering RBAC unmaintainable.',
        'Over-Privileged Service Accounts: Microservices granted wildcard (*:*) admin permissions for developer convenience.',
        'Remediation: Automated access reviews, Just-In-Time (JIT) ephemeral credentials, and least-privilege policy analyzers.'
      ],
      script: 'In practice, access control systems degrade over time without diligent governance. The two most rampant anti-patterns are privilege creep and role explosion. Privilege creep occurs when Alice transitions from Helpdesk to QA to DevOps, retaining all her previous permissions at each step. By year three, Alice has near-god-mode access. Role explosion occurs when engineers create a new role for every edge case until the organization has more roles than employees. Modern teams combat this using Just-In-Time access and automated permission linters.'
    }
  },
  {
    id: 15,
    slug: 'examination-case-study',
    title: 'Case Study: College Examination Management System (EMS)',
    category: 'CASE STUDY',
    durationSeconds: 60,
    summary: 'In-depth university examination case study analyzing why pure DAC or RBAC fails and how a hybrid MAC + RBAC + ABAC architecture succeeds.',
    presenterNotes: {
      talkDuration: '60 seconds',
      talkingPoints: [
        'Scenario: University End-Semester Examination Management System handling confidential question papers and grade moderation.',
        'Actors: Course Professor, Head of Department, Controller of Examinations (CoE), External Evaluator, Student.',
        'Why DAC fails: A professor could mistakenly change permissions or share the question paper repository.',
        'Why pure RBAC is insufficient: External Evaluator needs access only to assigned courses during a strict 10-day evaluation window.',
        'The Architectural Solution: MAC for Top Secret question paper labeling, RBAC for organizational roles, and ABAC for temporal and anonymization constraints.'
      ],
      script: 'To synthesize everything we have learned, let us examine a real-world case study: a University Examination Management System. The stakes are immense: leaking a question paper destroys institutional integrity, while tampering with marks ruins student futures. Why can\'t we use DAC? Because if a professor owns the question paper file, they could inadvertently grant read rights to a teaching assistant or student. Pure RBAC also falls short because external examiners should only grade specific courses during a strict 10-day window. The optimal solution is a hybrid architecture.'
    }
  },
  {
    id: 16,
    slug: 'conclusion-quiz',
    title: 'Conclusion, Interactive Scored Knowledge Verification & Closing',
    category: 'EVALUATION',
    durationSeconds: 55,
    summary: 'Final recap of core takeaways, 5-question interactive scored quiz with real-time feedback, and masterclass sign-off.',
    presenterNotes: {
      talkDuration: '55 seconds',
      talkingPoints: [
        'Summarize the core takeaways: No single model fits every use case; hybrid architectures dominate modern industry.',
        'Reiterate the Zero Trust paradigm: Continuous evaluation of context, identity, and least privilege.',
        'Direct students to complete the 5-question scored quiz to verify their understanding.',
        'Thank the audience and open the floor for Q&A.'
      ],
      script: 'We have journeyed from theoretical foundations to operating system kernels, cloud IAM, and real-world enterprise architectures. As security professionals, your mandate is to remember that access control is not a static checkbox—it is a continuous, living security posture. Today\'s gold standard combines the structural clarity of RBAC with the dynamic, contextual vigilance of ABAC. Now, let us put your mastery to the test with our interactive five-question certification quiz. Thank you for your time, and good luck on the quiz!'
    }
  }
];
