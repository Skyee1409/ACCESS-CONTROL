import React, { useState } from 'react';
import { UserMinus, AlertTriangle, ShieldCheck, ShieldAlert, Sparkles, Clock, Check, X } from 'lucide-react';

export const PrivilegeCreepSimulator: React.FC = () => {
  const [currentYear, setCurrentYear] = useState<1 | 2 | 3>(3);
  const [governanceActive, setGovernanceActive] = useState<boolean>(false);

  const careerStages = [
    {
      year: 1,
      title: 'Year 1: Tier 1 Helpdesk Technician',
      role: 'Helpdesk Support',
      grantedPerms: ['Reset User Passwords', 'View Internal Ticketing', 'Read Knowledge Base'],
      activeNeed: ['Reset User Passwords', 'View Internal Ticketing', 'Read Knowledge Base']
    },
    {
      year: 2,
      title: 'Year 2: QA & Automation Engineer',
      role: 'QA Automation',
      grantedPerms: [
        'Reset User Passwords', 'View Internal Ticketing', 'Read Knowledge Base', // leftover
        'Staging DB Read/Write', 'Jenkins Pipeline Admin', 'AWS Test S3 Access'
      ],
      activeNeed: ['Staging DB Read/Write', 'Jenkins Pipeline Admin', 'AWS Test S3 Access']
    },
    {
      year: 3,
      title: 'Year 3: Production DevOps Engineer',
      role: 'DevOps Lead',
      grantedPerms: [
        'Reset User Passwords', 'View Internal Ticketing', 'Read Knowledge Base', // Year 1 leftovers
        'Staging DB Read/Write', 'Jenkins Pipeline Admin', 'AWS Test S3 Access',   // Year 2 leftovers
        'Prod Kubernetes Cluster Admin', 'AWS Root IAM Management', 'Corporate GitHub Admin', 'Production Database Direct SSH'
      ],
      activeNeed: ['Prod Kubernetes Cluster Admin', 'Corporate GitHub Admin']
    }
  ];

  const currentStage = careerStages[currentYear - 1];

  const displayedPerms = governanceActive
    ? currentStage.activeNeed
    : currentStage.grantedPerms;

  const excessCount = currentStage.grantedPerms.length - currentStage.activeNeed.length;

  return (
    <div className="cyber-card" style={{ padding: '20px', background: 'rgba(14, 22, 41, 0.85)' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle size={18} color="#FF5C8A" />
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#F3F6FC' }}>
            PRIVILEGE CREEP TIMELINE // ACCUMULATION SIMULATOR
          </span>
        </div>

        {/* Governance / JIT Remediation Toggle */}
        <button
          onClick={() => setGovernanceActive(!governanceActive)}
          style={{
            background: governanceActive ? 'rgba(54, 211, 153, 0.25)' : 'rgba(255, 92, 138, 0.2)',
            border: governanceActive ? '1px solid #36D399' : '1px solid #FF5C8A',
            color: governanceActive ? '#36D399' : '#FF5C8A',
            padding: '6px 14px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          {governanceActive ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
          <span>{governanceActive ? 'Automated IAM Governance: ACTIVE' : 'Enforce JIT / Quarterly Access Review'}</span>
        </button>
      </div>

      {/* Year Timeline Selector */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
        {careerStages.map(st => (
          <button
            key={st.year}
            onClick={() => setCurrentYear(st.year as 1 | 2 | 3)}
            style={{
              background: currentYear === st.year ? 'rgba(79, 140, 255, 0.2)' : 'rgba(17, 26, 46, 0.6)',
              border: currentYear === st.year ? '1px solid #4F8CFF' : '1px solid #1E3156',
              borderRadius: '8px',
              padding: '10px 14px',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: currentYear === st.year ? '#35D5E8' : '#64748B',
              fontWeight: 700,
              display: 'block'
            }}>
              YEAR 0{st.year}
            </span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: currentYear === st.year ? '#FFF' : '#A8B3C7' }}>
              {st.role}
            </span>
          </button>
        ))}
      </div>

      {/* Permissions Breakdown Container */}
      <div style={{ background: '#090F1F', border: '1px solid #1E3156', borderRadius: '12px', padding: '16px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#F3F6FC' }}>
              Subject: Alice Henderson // {currentStage.title}
            </span>
            <p style={{ fontSize: '11.5px', color: '#A8B3C7' }}>
              {governanceActive 
                ? 'Strict Least Privilege: Legacy permissions revoked upon each internal transfer.'
                : 'Toxic Accumulation: Prior entitlements were never de-provisioned when role changed.'}
            </p>
          </div>

          <div style={{ textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
            <span style={{
              fontSize: '12px',
              fontWeight: 700,
              color: governanceActive ? '#36D399' : (excessCount > 0 ? '#FF5C8A' : '#36D399')
            }}>
              {displayedPerms.length} Active Entitlements
            </span>
            {!governanceActive && excessCount > 0 && (
              <span style={{ display: 'block', fontSize: '10.5px', color: '#FF5C8A' }}>
                ({excessCount} zombie/excess privileges)
              </span>
            )}
          </div>
        </div>

        {/* Badges of Entitlements */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {displayedPerms.map((perm, idx) => {
            const isExcess = !governanceActive && !currentStage.activeNeed.includes(perm);
            return (
              <span
                key={idx}
                style={{
                  background: isExcess ? 'rgba(255, 92, 138, 0.15)' : 'rgba(54, 211, 153, 0.15)',
                  border: `1px solid ${isExcess ? '#FF5C8A' : '#36D399'}`,
                  color: isExcess ? '#FF84A8' : '#36D399',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  fontSize: '11.5px',
                  fontFamily: 'var(--font-mono)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {isExcess ? <AlertTriangle size={12} color="#FF5C8A" /> : <Check size={12} color="#36D399" />}
                <span>{perm}</span>
                {isExcess && <span style={{ fontSize: '9px', opacity: 0.8 }}>(ORPHAN)</span>}
              </span>
            );
          })}
        </div>
      </div>

      {/* Warning Box */}
      <div style={{
        background: governanceActive ? 'rgba(54, 211, 153, 0.08)' : 'rgba(255, 92, 138, 0.08)',
        border: `1px solid ${governanceActive ? '#36D399' : '#FF5C8A'}`,
        borderRadius: '8px',
        padding: '10px 14px',
        fontSize: '12px',
        color: '#E2E8F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span>
          {governanceActive 
            ? '✓ Automated Certification Review pruned orphan permissions. Blast radius minimized to zero excess access.'
            : '⚠️ CRITICAL RISK: Compromising Alice\'s single laptop gives an attacker access to Helpdesk, QA databases, AND Production Root Kubernetes!'}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#35D5E8' }}>
          MITRE ATT&CK T1078
        </span>
      </div>
    </div>
  );
};
