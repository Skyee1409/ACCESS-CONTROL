import React, { useState } from 'react';
import { Cloud, HeartPulse, Terminal, Shield, Building2, Code2, CheckCircle2, ArrowRight } from 'lucide-react';
import { CyberBadge } from '../layout/CyberBadge';

export const Slide12RealWorldApplications: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<string>('cloud');

  const sectors = [
    {
      id: 'cloud',
      name: 'Cloud Infrastructure (AWS / Azure)',
      icon: <Cloud size={18} color="#FFBF69" />,
      tag: 'HYBRID RBAC + ABAC',
      architecture: 'AWS IAM integrates RBAC roles (assumed by developers or EC2/Lambda) with ABAC Condition Keys (evaluating tags, client IP, MFA age, and request time).',
      policyExample: `{
  "Effect": "Allow",
  "Action": "s3:GetObject",
  "Resource": "arn:aws:s3:::prod-customer-vault/*",
  "Condition": {
    "StringEquals": { "aws:PrincipalTag/Department": "FintechOps" },
    "Bool": { "aws:MultiFactorAuthPresent": "true" },
    "IpAddress": { "aws:SourceIp": "198.51.100.0/24" }
  }
}`,
      keyInsight: 'Pure RBAC would require creating separate roles for every department IP combination. ABAC conditions keep role count minimal.'
    },
    {
      id: 'health',
      name: 'Healthcare EHR (Epic / Cerner)',
      icon: <HeartPulse size={18} color="#FF5C8A" />,
      tag: 'RBAC + BREAK-GLASS ABAC',
      architecture: 'Electronic Health Record systems assign clinicians RBAC roles (Doctor, Nurse), but use dynamic ABAC checks to ensure the patient is actively admitted to their care ward.',
      policyExample: `RULE BreakGlassEmergencyOverride:
  TARGET: Resource.Type == "PatientMedicalRecord"
  CONDITION: 
    Subject.Role IN ["EmergencyPhysician", "TraumaSurgeon"]
    AND Action == "EmergencyRead"
  DECISION: PERMIT
  OBLIGATION: 
    DispatchImmediateSMSAlert(ChiefMedicalOfficer)
    ImmutableSIEMAuditSink(Severity="CRITICAL_OVERRIDE")`,
      keyInsight: 'Patient life safety requires that authorization never blocks emergency surgery. Dynamic Break-Glass overrides guarantee patient care while strictly logging actions.'
    },
    {
      id: 'os',
      name: 'Operating Systems (Linux / SELinux)',
      icon: <Terminal size={18} color="#35D5E8" />,
      tag: 'DAC + MAC KERNEL',
      architecture: 'Every standard Linux file has DAC permissions (rwx). On top of this, Security-Enhanced Linux (SELinux) enforces Mandatory Access Control through Type Enforcement labels.',
      policyExample: `# Traditional Linux DAC
$ ls -l /var/www/html/index.php
-rw-r--r-- 1 apache webgroup 4096 Oct 10 12:00 index.php

# SELinux MAC Security Context (User:Role:Type:Level)
$ ls -Z /var/www/html/index.php
system_u:object_r:httpd_sys_content_t:s0 index.php`,
      keyInsight: 'Even if an attacker exploits an Apache remote code execution vulnerability, the SELinux kernel label blocks the process from reading /etc/shadow or pivoting into /root.'
    },
    {
      id: 'defense',
      name: 'Defense & Military (DoD / NATO)',
      icon: <Shield size={18} color="#36D399" />,
      tag: 'STRICT MULTILEVEL MAC',
      architecture: 'Multilevel Security (MLS) networks like SIPRNet (Secret) and JWICS (Top Secret) enforce hardware and kernel-level Bell-LaPadula isolation.',
      policyExample: `SECURITY CONTEXT EVALUATION:
  Subject Clearance: SECRET (Rank 3)
  Target Clearance:  TOP SECRET (Rank 4)
  Rule Violation:    Bell-LaPadula Simple Security ("No Read Up")
  Kernel Reaction:   HARD TERMINATION [SIGKILL]
  Audit Flag:        Counter-Intelligence Security Alert Logged`,
      keyInsight: 'In military environments, compromise of confidentiality can result in loss of human life. Human operators cannot be trusted to set permissions manually.'
    },
    {
      id: 'finance',
      name: 'Fintech & SWIFT Banking',
      icon: <Building2 size={18} color="#4F8CFF" />,
      tag: 'CONSTRAINED RBAC (DUAL CONTROL)',
      architecture: 'High-value wire transfers ($1M+) mandate Dual Control / Separation of Duties (Maker-Checker architecture).',
      policyExample: `TRANSACTION_VERIFICATION:
  Authorizer 1 (Maker):   Alice (Role: TreasuryOfficer) -> Drafts $5,000,000 Transfer
  Authorizer 2 (Checker): Bob (Role: ComplianceDirector) -> Verifies Beneficiary SWIFT IBAN
  Constraint Check:       Maker.ID != Checker.ID (MUTUAL EXCLUSION ENFORCED)`,
      keyInsight: 'Separation of duties prevents both rogue employee embezzlement and single-credential extortion by external attackers.'
    }
  ];

  const activeSector = sectors.find(s => s.id === selectedSector) || sectors[0];

  return (
    <div className="slide-content-scroll slide-enter-animation">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <CyberBadge text="PRODUCTION DEPLOYMENTS" variant="amber" />
            <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#A8B3C7' }}>
              INDUSTRY ARCHITECTURES IN ACTION
            </span>
          </div>
          <h2 style={{ fontSize: '28px', color: '#F3F6FC' }}>
            Real-World Applications: Cloud, Healthcare, OS & Defense
          </h2>
        </div>

        <div style={{
          background: 'rgba(255, 191, 105, 0.1)',
          border: '1px solid #FFBF69',
          borderRadius: '8px',
          padding: '6px 14px',
          fontSize: '12px',
          color: '#FFBF69',
          fontFamily: 'var(--font-mono)'
        }}>
          Modern Systems are Almost Always Hybrid
        </div>
      </div>

      {/* Main Grid: Sector Selector Tabs on Left, Active Deep-Dive on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.9fr', gap: '16px', flex: 1, minHeight: 0 }}>
        {/* Left Column: Sector Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {sectors.map(sec => {
            const isSelected = selectedSector === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setSelectedSector(sec.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  background: isSelected ? 'rgba(79, 140, 255, 0.18)' : 'rgba(17, 26, 46, 0.65)',
                  border: isSelected ? '1px solid #4F8CFF' : '1px solid #1E3156',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {sec.icon}
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: isSelected ? '#FFF' : '#E2E8F0', display: 'block' }}>
                      {sec.name}
                    </span>
                    <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#35D5E8' }}>
                      {sec.tag}
                    </span>
                  </div>
                </div>
                <ArrowRight size={14} color={isSelected ? '#4F8CFF' : '#64748B'} />
              </button>
            );
          })}
        </div>

        {/* Right Column: Code & Architecture Showcase */}
        <div className="cyber-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', background: 'rgba(14, 22, 41, 0.9)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '16px', color: '#F3F6FC', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {activeSector.icon}
              <span>{activeSector.name}</span>
            </h3>
            <span style={{
              background: 'rgba(53, 213, 232, 0.15)',
              border: '1px solid rgba(53, 213, 232, 0.4)',
              color: '#35D5E8',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              padding: '2px 8px',
              borderRadius: '4px'
            }}>
              {activeSector.tag}
            </span>
          </div>

          <p style={{ fontSize: '12.5px', color: '#CBD5E1', lineHeight: 1.5 }}>
            {activeSector.architecture}
          </p>

          {/* Code / Policy Window */}
          <div style={{
            background: '#080D1B',
            border: '1px solid #1E3156',
            borderRadius: '8px',
            padding: '12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: '#35D5E8',
            overflowX: 'auto',
            maxHeight: '160px',
            lineHeight: 1.45
          }}>
            <pre style={{ margin: 0 }}>{activeSector.policyExample}</pre>
          </div>

          <div style={{
            marginTop: 'auto',
            background: 'rgba(54, 211, 153, 0.08)',
            border: '1px solid rgba(54, 211, 153, 0.3)',
            borderRadius: '8px',
            padding: '10px 14px',
            fontSize: '11.5px',
            color: '#E2E8F0',
            lineHeight: 1.45
          }}>
            <strong style={{ color: '#36D399' }}>Architectural Insight: </strong>
            {activeSector.keyInsight}
          </div>
        </div>
      </div>
    </div>
  );
};
