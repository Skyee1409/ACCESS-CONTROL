import React from 'react';
import { PrivilegeCreepSimulator } from '../interactive/PrivilegeCreepSimulator';
import { CyberBadge } from '../layout/CyberBadge';
import { AlertOctagon, UserX, KeyRound, ServerCrash } from 'lucide-react';

export const Slide14SecurityChallenges: React.FC = () => {
  return (
    <div className="slide-content-scroll slide-enter-animation">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <CyberBadge text="ATTACK SURFACE" variant="coral" />
            <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#A8B3C7' }}>
              ANTIPATTERNS & GOVERNANCE DEGRADATION
            </span>
          </div>
          <h2 style={{ fontSize: '28px', color: '#F3F6FC' }}>
            Security Challenges: Privilege Creep & Role Explosion
          </h2>
        </div>

        <div style={{
          background: 'rgba(255, 92, 138, 0.1)',
          border: '1px solid #FF5C8A',
          borderRadius: '8px',
          padding: '6px 14px',
          fontSize: '12px',
          color: '#FF5C8A',
          fontFamily: 'var(--font-mono)'
        }}>
          Entropy: Access Rights Accumulate Over Time
        </div>
      </div>

      {/* Embedded Privilege Creep Simulator */}
      <div style={{ marginBottom: '14px' }}>
        <PrivilegeCreepSimulator />
      </div>

      {/* 3 Antipattern Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        <div className="cyber-card" style={{ padding: '12px 14px', borderColor: 'rgba(255, 92, 138, 0.4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <AlertOctagon size={16} color="#FF5C8A" />
            <h4 style={{ fontSize: '13px', color: '#FF5C8A' }}>Role Explosion in RBAC</h4>
          </div>
          <p style={{ fontSize: '11.5px', color: '#CBD5E1', lineHeight: 1.4 }}>
            Creating hundreds of static roles for every one-off departmental exception (e.g. "Doctor_Cardiology_NightShift_Floor3"). Results in unmaintainable RBAC chaos.
          </p>
        </div>

        <div className="cyber-card" style={{ padding: '12px 14px', borderColor: 'rgba(255, 191, 105, 0.4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <KeyRound size={16} color="#FFBF69" />
            <h4 style={{ fontSize: '13px', color: '#FFBF69' }}>Over-Privileged Service Accounts</h4>
          </div>
          <p style={{ fontSize: '11.5px', color: '#CBD5E1', lineHeight: 1.4 }}>
            Engineers granting <code style={{ color: '#FFBF69' }}>AdministratorAccess</code> to microservice tokens because configuring exact least privilege is tedious during development.
          </p>
        </div>

        <div className="cyber-card" style={{ padding: '12px 14px', borderColor: 'rgba(53, 213, 232, 0.4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <UserX size={16} color="#35D5E8" />
            <h4 style={{ fontSize: '13px', color: '#35D5E8' }}>Shadow & Orphan Accounts</h4>
          </div>
          <p style={{ fontSize: '11.5px', color: '#CBD5E1', lineHeight: 1.4 }}>
            Former contractors and departed employees whose cloud IAM access keys, SSH keys, or SaaS logins were never de-provisioned during offboarding.
          </p>
        </div>
      </div>
    </div>
  );
};
