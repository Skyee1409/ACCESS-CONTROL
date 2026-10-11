import React from 'react';
import { MacSimulator } from '../interactive/MacSimulator';
import { CyberBadge } from '../layout/CyberBadge';
import { ShieldCheck, Lock, Award, Check, X } from 'lucide-react';

export const Slide08MAC: React.FC = () => {
  return (
    <div className="slide-content-scroll slide-enter-animation">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <CyberBadge text="CORE MODEL 02" variant="cyan" />
            <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#A8B3C7' }}>
              MANDATORY ACCESS CONTROL (MAC)
            </span>
          </div>
          <h2 style={{ fontSize: '28px', color: '#F3F6FC' }}>
            Mandatory Access Control: Multilevel Kernel Enforcement
          </h2>
        </div>

        <div style={{
          background: 'rgba(53, 213, 232, 0.1)',
          border: '1px solid #35D5E8',
          borderRadius: '8px',
          padding: '6px 14px',
          fontSize: '12px',
          color: '#35D5E8',
          fontFamily: 'var(--font-mono)'
        }}>
          Bell-LaPadula: "No Read Up // No Write Down"
        </div>
      </div>

      {/* Embedded Working MAC Simulator */}
      <div style={{ marginBottom: '14px' }}>
        <MacSimulator />
      </div>

      {/* Deep Dives into Bell-LaPadula vs Biba */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <div className="cyber-card" style={{ padding: '12px 16px', borderColor: 'rgba(53, 213, 232, 0.4)' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#35D5E8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
            The Bell-LaPadula Model (Confidentiality)
          </span>
          <p style={{ fontSize: '12px', color: '#CBD5E1', lineHeight: 1.45 }}>
            Designed for defense intelligence (DoD). Focuses exclusively on protecting secret information from unauthorized disclosure. Enforces the Simple Security Property (No Read Up) and the *-Property (No Write Down to prevent secret data leakage).
          </p>
        </div>

        <div className="cyber-card" style={{ padding: '12px 16px', borderColor: 'rgba(255, 191, 105, 0.4)' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#FFBF69', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
            The Biba Model (Data Integrity)
          </span>
          <p style={{ fontSize: '12px', color: '#CBD5E1', lineHeight: 1.45 }}>
            Formulated for financial and flight control systems where corrupting data is more dangerous than reading it. Inverts the rules: Simple Integrity Property (No Read Down) and *-Integrity Property (No Write Up into high-integrity objects).
          </p>
        </div>
      </div>
    </div>
  );
};
