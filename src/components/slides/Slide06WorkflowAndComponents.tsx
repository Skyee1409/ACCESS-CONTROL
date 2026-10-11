import React from 'react';
import { ArchitectureWorkflowStepper } from '../interactive/ArchitectureWorkflowStepper';
import { CyberBadge } from '../layout/CyberBadge';
import { Server, Cpu, Database, FileCheck } from 'lucide-react';

export const Slide06WorkflowAndComponents: React.FC = () => {
  return (
    <div className="slide-content-scroll slide-enter-animation">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <CyberBadge text="REFERENCE ARCHITECTURE" variant="blue" />
            <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#A8B3C7' }}>
              NIST SP 800-162 & OASIS XACML 3.0
            </span>
          </div>
          <h2 style={{ fontSize: '28px', color: '#F3F6FC' }}>
            Access Control Architecture & Runtime Request Flow
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
          PEP (Enforcer) ⇄ PDP (Brain) ⇄ PIP (Data) ⇄ PAP (Rules)
        </div>
      </div>

      {/* Embedded Interactive Stepper */}
      <div style={{ marginBottom: '16px' }}>
        <ArchitectureWorkflowStepper />
      </div>

      {/* 4 Architectural Acronym Definitions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        <div className="cyber-card" style={{ padding: '12px 14px', borderColor: 'rgba(53, 213, 232, 0.4)' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#35D5E8', fontFamily: 'var(--font-mono)' }}>
            PEP (Enforcement Point)
          </span>
          <p style={{ fontSize: '11.5px', color: '#A8B3C7', marginTop: '4px', lineHeight: 1.4 }}>
            The gateway, proxy, or firewall that physically intercepts requests and blocks unauthorized packets.
          </p>
        </div>

        <div className="cyber-card" style={{ padding: '12px 14px', borderColor: 'rgba(54, 211, 153, 0.4)' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#36D399', fontFamily: 'var(--font-mono)' }}>
            PDP (Decision Point)
          </span>
          <p style={{ fontSize: '11.5px', color: '#A8B3C7', marginTop: '4px', lineHeight: 1.4 }}>
            The central decision brain evaluating Boolean access logic; completely stateless and decoupled from the app.
          </p>
        </div>

        <div className="cyber-card" style={{ padding: '12px 14px', borderColor: 'rgba(255, 191, 105, 0.4)' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#FFBF69', fontFamily: 'var(--font-mono)' }}>
            PIP (Information Point)
          </span>
          <p style={{ fontSize: '11.5px', color: '#A8B3C7', marginTop: '4px', lineHeight: 1.4 }}>
            The context supplier: fetches user department, device health, risk score, and environmental attributes.
          </p>
        </div>

        <div className="cyber-card" style={{ padding: '12px 14px', borderColor: 'rgba(79, 140, 255, 0.4)' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#4F8CFF', fontFamily: 'var(--font-mono)' }}>
            PAP (Administration Point)
          </span>
          <p style={{ fontSize: '11.5px', color: '#A8B3C7', marginTop: '4px', lineHeight: 1.4 }}>
            The management console where security architects author, test, and commit organizational policies.
          </p>
        </div>
      </div>
    </div>
  );
};
