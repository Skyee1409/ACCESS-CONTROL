import React from 'react';
import { RbacSimulator } from '../interactive/RbacSimulator';
import { CyberBadge } from '../layout/CyberBadge';
import { Users, Shield, Check, X, AlertTriangle } from 'lucide-react';

export const Slide09RBAC: React.FC = () => {
  return (
    <div className="slide-content-scroll slide-enter-animation">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <CyberBadge text="CORE MODEL 03" variant="blue" />
            <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#A8B3C7' }}>
              ROLE-BASED ACCESS CONTROL (RBAC)
            </span>
          </div>
          <h2 style={{ fontSize: '28px', color: '#F3F6FC' }}>
            Role-Based Access Control: Enterprise Governance Standard
          </h2>
        </div>

        <div style={{
          background: 'rgba(79, 140, 255, 0.1)',
          border: '1px solid #4F8CFF',
          borderRadius: '8px',
          padding: '6px 14px',
          fontSize: '12px',
          color: '#4F8CFF',
          fontFamily: 'var(--font-mono)'
        }}>
          NIST Model: Users → Assigned to Roles → Possessing Permissions
        </div>
      </div>

      {/* Embedded Working RBAC Simulator */}
      <div style={{ marginBottom: '14px' }}>
        <RbacSimulator />
      </div>

      {/* 3 Core NIST RBAC Levels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        <div className="cyber-card" style={{ padding: '12px 14px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#35D5E8', fontFamily: 'var(--font-mono)' }}>
            1. Flat / Core RBAC
          </span>
          <p style={{ fontSize: '11.5px', color: '#A8B3C7', marginTop: '4px', lineHeight: 1.4 }}>
            Direct many-to-many mapping between users, roles, and permissions. Streamlines joiner-mover-leaver lifecycles.
          </p>
        </div>

        <div className="cyber-card" style={{ padding: '12px 14px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#4F8CFF', fontFamily: 'var(--font-mono)' }}>
            2. Hierarchical RBAC
          </span>
          <p style={{ fontSize: '11.5px', color: '#A8B3C7', marginTop: '4px', lineHeight: 1.4 }}>
            Roles inherit permissions from subordinate roles (e.g., Medical Director automatically inherits all Attending Physician privileges).
          </p>
        </div>

        <div className="cyber-card" style={{ padding: '12px 14px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#FFBF69', fontFamily: 'var(--font-mono)' }}>
            3. Constrained RBAC (SoD)
          </span>
          <p style={{ fontSize: '11.5px', color: '#A8B3C7', marginTop: '4px', lineHeight: 1.4 }}>
            Enforces Static or Dynamic Separation of Duties. Prevents a single user from holding mutually conflicting roles (e.g. Auditor + Cashier).
          </p>
        </div>
      </div>
    </div>
  );
};
