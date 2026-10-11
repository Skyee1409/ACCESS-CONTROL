import React from 'react';
import { AbacSimulator } from '../interactive/AbacSimulator';
import { CyberBadge } from '../layout/CyberBadge';
import { Sliders, Zap, ShieldCheck, Sparkles } from 'lucide-react';

export const Slide10ABAC: React.FC = () => {
  return (
    <div className="slide-content-scroll slide-enter-animation">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <CyberBadge text="CORE MODEL 04" variant="green" />
            <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#A8B3C7' }}>
              ATTRIBUTE-BASED ACCESS CONTROL (ABAC)
            </span>
          </div>
          <h2 style={{ fontSize: '28px', color: '#F3F6FC' }}>
            Attribute-Based Access Control: Dynamic Contextual Engine
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
          Decision = f(Subject, Resource, Action, Environment)
        </div>
      </div>

      {/* Embedded Working ABAC Simulator */}
      <div style={{ marginBottom: '14px' }}>
        <AbacSimulator />
      </div>

      {/* The 4 Attribute Dimensions Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        <div className="cyber-card" style={{ padding: '12px 14px', borderColor: 'rgba(53, 213, 232, 0.4)' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#35D5E8', fontFamily: 'var(--font-mono)' }}>
            Subject Attributes
          </span>
          <p style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '4px', lineHeight: 1.4 }}>
            Role, department, clearance tier, seniority, employee citizenship, security risk score.
          </p>
        </div>

        <div className="cyber-card" style={{ padding: '12px 14px', borderColor: 'rgba(79, 140, 255, 0.4)' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#4F8CFF', fontFamily: 'var(--font-mono)' }}>
            Resource Attributes
          </span>
          <p style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '4px', lineHeight: 1.4 }}>
            Classification label (Confidential, PII, HIPAA), departmental owner, creation timestamp, lifecycle phase.
          </p>
        </div>

        <div className="cyber-card" style={{ padding: '12px 14px', borderColor: 'rgba(255, 191, 105, 0.4)' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#FFBF69', fontFamily: 'var(--font-mono)' }}>
            Action Attributes
          </span>
          <p style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '4px', lineHeight: 1.4 }}>
            Read, write, delete, export/download, approve wire transfer, trigger emergency break-glass.
          </p>
        </div>

        <div className="cyber-card" style={{ padding: '12px 14px', borderColor: 'rgba(54, 211, 153, 0.4)' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#36D399', fontFamily: 'var(--font-mono)' }}>
            Environment Attributes
          </span>
          <p style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '4px', lineHeight: 1.4 }}>
            Time of day, IP geolocation, VPN subnet, device encryption posture, current threat level.
          </p>
        </div>
      </div>
    </div>
  );
};
