import React, { useState } from 'react';
import { Shield, ShieldAlert, ShieldCheck, CheckCircle2, XCircle, Lock, Layers, Users, Key } from 'lucide-react';
import { CyberBadge } from '../layout/CyberBadge';

export const Slide13SecurityPrinciples: React.FC = () => {
  const [activePrinciple, setActivePrinciple] = useState<number>(0);

  const principles = [
    {
      title: 'Principle of Least Privilege (PoLP)',
      badge: 'FOUNDATIONAL AXIOM',
      color: '#36D399',
      icon: <Lock size={20} color="#36D399" />,
      tagline: 'Grant only the minimum permissions necessary to complete the task.',
      explanation: 'Users, processes, and service accounts must operate using the minimal set of privileges required to perform their valid job functions. If an application only needs to read customer names, it must never receive table drop or write permissions.',
      realWorldExample: 'Modern AWS IAM role policies scoped to specific S3 bucket prefixes with Just-In-Time (JIT) 1-hour expiration rather than permanent root access.'
    },
    {
      title: 'Separation of Duties (SoD)',
      badge: 'DUAL CONTROL / MAKER-CHECKER',
      color: '#4F8CFF',
      icon: <Users size={20} color="#4F8CFF" />,
      tagline: 'High-consequence tasks require two distinct authorized actors.',
      explanation: 'No single individual should possess sufficient access rights to independently execute a catastrophic or fraudulent transaction. By splitting authority across multiple roles, insider threats and accidental blunders are systematically mitigated.',
      realWorldExample: 'In banking SWIFT networks, one officer drafts a $10M international wire transfer, while an independent risk manager must review and cryptographically authorize it.'
    },
    {
      title: 'Fail-Safe Defaults (Default Deny)',
      badge: 'IMPLICIT DENY ENGINE',
      color: '#FF5C8A',
      icon: <ShieldAlert size={20} color="#FF5C8A" />,
      tagline: 'Access is strictly prohibited unless an explicit allow rule permits it.',
      explanation: 'If a policy engine does not find an affirmative rule granting access, the default decision must always be DENY. Permissive configurations that allow everything unless blacklisted are the root cause of countless cloud breaches.',
      realWorldExample: 'AWS IAM policy evaluation: If no statement says "Effect: Allow", access is denied. If even one statement says "Effect: Deny", it overrides all allows.'
    },
    {
      title: 'Need-to-Know Principle',
      badge: 'OPERATIONAL RELEVANCE',
      color: '#35D5E8',
      icon: <Key size={20} color="#35D5E8" />,
      tagline: 'Security clearance alone does not grant access without operational necessity.',
      explanation: 'Holding a high clearance or senior executive title does not entitle a person to browse all confidential dossiers. Access requires both valid clearance AND an active operational assignment.',
      realWorldExample: 'A CIA officer holding Top Secret SCI clearance cannot read documents from an unrelated intelligence division without an active mission need.'
    },
    {
      title: 'Defense in Depth',
      badge: 'LAYERED RESILIENCE',
      color: '#FFBF69',
      icon: <Layers size={20} color="#FFBF69" />,
      tagline: 'Layer multiple concentric authorization gates across all tiers.',
      explanation: 'Never rely on perimeter authentication alone. Implement authorization checks at the edge API gateway, inside the application business logic, and at the database row-level security tier.',
      realWorldExample: 'WAF blocks untrusted countries, API gateway verifies OAuth JWT scopes, microservice evaluates ABAC policy, and PostgreSQL enforces tenant row-level security (RLS).'
    }
  ];

  const current = principles[activePrinciple];

  return (
    <div className="slide-content-scroll slide-enter-animation">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <CyberBadge text="DEFENSIVE ARCHITECTURE" variant="green" />
            <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#A8B3C7' }}>
              TIMELESS CYBERSECURITY FIRST PRINCIPLES
            </span>
          </div>
          <h2 style={{ fontSize: '28px', color: '#F3F6FC' }}>
            Least Privilege & Foundational Security Principles
          </h2>
        </div>

        <div style={{
          background: 'rgba(54, 211, 153, 0.1)',
          border: '1px solid #36D399',
          borderRadius: '8px',
          padding: '6px 14px',
          fontSize: '12px',
          color: '#36D399',
          fontFamily: 'var(--font-mono)'
        }}>
          Jerome Saltzer & Michael Schroeder (1975)
        </div>
      </div>

      {/* 5 Principles Horizontal Selector Tabs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '8px',
        marginBottom: '16px'
      }}>
        {principles.map((pr, idx) => {
          const isSelected = activePrinciple === idx;
          return (
            <button
              key={idx}
              onClick={() => setActivePrinciple(idx)}
              style={{
                background: isSelected ? 'rgba(79, 140, 255, 0.2)' : 'rgba(17, 26, 46, 0.65)',
                border: isSelected ? `1px solid ${pr.color}` : '1px solid #1E3156',
                borderRadius: '8px',
                padding: '10px 8px',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: isSelected ? pr.color : '#64748B',
                fontWeight: 700,
                display: 'block'
              }}>
                PRINCIPLE 0{idx + 1}
              </span>
              <span style={{
                fontSize: '11.5px',
                fontWeight: 600,
                color: isSelected ? '#FFF' : '#A8B3C7',
                display: 'block',
                marginTop: '2px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {pr.title.split(' ')[0]} {pr.title.split(' ')[1]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Principle Deep Dive Card */}
      <div className="cyber-card" style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', background: 'rgba(14, 22, 41, 0.9)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {current.icon}
            </div>
            <div>
              <h3 style={{ fontSize: '18px', color: '#F3F6FC', fontWeight: 700 }}>
                {current.title}
              </h3>
              <p style={{ fontSize: '12px', color: current.color, fontWeight: 600 }}>
                "{current.tagline}"
              </p>
            </div>
          </div>

          <span style={{
            background: 'rgba(255,255,255,0.06)',
            border: `1px solid ${current.color}`,
            color: current.color,
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            padding: '3px 10px',
            borderRadius: '4px',
            fontWeight: 700
          }}>
            {current.badge}
          </span>
        </div>

        <div style={{
          background: '#090F1F',
          border: '1px solid #1E3156',
          borderRadius: '10px',
          padding: '16px',
          fontSize: '13px',
          color: '#E2E8F0',
          lineHeight: 1.6
        }}>
          {current.explanation}
        </div>

        <div style={{
          marginTop: 'auto',
          background: 'rgba(53, 213, 232, 0.08)',
          border: '1px solid rgba(53, 213, 232, 0.3)',
          borderRadius: '10px',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px'
        }}>
          <CheckCircle2 size={16} color="#35D5E8" style={{ marginTop: '2px', flexShrink: 0 }} />
          <div style={{ fontSize: '12px', color: '#CBD5E1', lineHeight: 1.45 }}>
            <strong style={{ color: '#35D5E8' }}>Production Implementation Example: </strong>
            {current.realWorldExample}
          </div>
        </div>
      </div>
    </div>
  );
};
