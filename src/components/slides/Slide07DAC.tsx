import React from 'react';
import { DacSimulator } from '../interactive/DacSimulator';
import { CyberBadge } from '../layout/CyberBadge';
import { Terminal, Shield, AlertTriangle, Check, X } from 'lucide-react';

export const Slide07DAC: React.FC = () => {
  return (
    <div className="slide-content-scroll slide-enter-animation">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <CyberBadge text="CORE MODEL 01" variant="amber" />
            <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#A8B3C7' }}>
              DISCRETIONARY ACCESS CONTROL (DAC)
            </span>
          </div>
          <h2 style={{ fontSize: '28px', color: '#F3F6FC' }}>
            Discretionary Access Control: Owner-Centric Permissions
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
          Owner Decides: r=4, w=2, x=1 (POSIX / NTFS)
        </div>
      </div>

      {/* Embedded Working DAC Simulator */}
      <div style={{ marginBottom: '14px' }}>
        <DacSimulator />
      </div>

      {/* Strengths & Architectural Pitfalls */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <div className="cyber-card" style={{ padding: '12px 16px', borderColor: 'rgba(54, 211, 153, 0.3)' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#36D399', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Check size={14} /> Architectural Strengths
          </span>
          <p style={{ fontSize: '12px', color: '#CBD5E1', marginTop: '4px', lineHeight: 1.45 }}>
            Exceptional flexibility and user autonomy. Perfect for personal desktop computers, local script execution, and ad-hoc collaborative workspaces where central administrator approval would create friction.
          </p>
        </div>

        <div className="cyber-card" style={{ padding: '12px 16px', borderColor: 'rgba(255, 92, 138, 0.3)' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#FF5C8A', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertTriangle size={14} /> The Fatal Flaw: The Trojan Horse Problem
          </span>
          <p style={{ fontSize: '12px', color: '#CBD5E1', marginTop: '4px', lineHeight: 1.45 }}>
            DAC cannot prevent information propagation. If Bob has read access to Alice's secret file, Bob can copy the contents into a new file he owns and set permissions to World-Readable (<code style={{ color: '#FF5C8A' }}>chmod 777</code>). The system cannot stop this.
          </p>
        </div>
      </div>
    </div>
  );
};
