import React from 'react';
import { AuthComparisonTester } from '../interactive/AuthComparisonTester';
import { CyberBadge } from '../layout/CyberBadge';
import { Key, UserCheck, Shield } from 'lucide-react';

export const Slide05AuthnVsAuthz: React.FC = () => {
  return (
    <div className="slide-content-scroll slide-enter-animation">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <CyberBadge text="CORE DISTINCTION" variant="cyan" />
            <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#A8B3C7' }}>
              IDENTITY VS PERMISSION ENFORCEMENT
            </span>
          </div>
          <h2 style={{ fontSize: '28px', color: '#F3F6FC' }}>
            Authentication (AuthN) vs. Authorization (AuthZ)
          </h2>
        </div>

        <div style={{
          background: 'rgba(79, 140, 255, 0.1)',
          border: '1px solid #4F8CFF',
          borderRadius: '8px',
          padding: '6px 14px',
          fontSize: '12px',
          color: '#72A5FF',
          fontFamily: 'var(--font-mono)'
        }}>
          401 Unauthorized (AuthN) vs 403 Forbidden (AuthZ)
        </div>
      </div>

      {/* Embedded Interactive Metaphor Tester */}
      <div style={{ marginBottom: '16px' }}>
        <AuthComparisonTester />
      </div>

      {/* Technical Protocol Comparison Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        <div className="cyber-card" style={{ padding: '12px 16px' }}>
          <span style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
            CHALLENGE QUESTION
          </span>
          <div style={{ fontSize: '13px', color: '#FFF', fontWeight: 600, marginTop: '2px' }}>
            AuthN asks: "Who are you?" <br />
            AuthZ asks: "What rights do you hold?"
          </div>
        </div>

        <div className="cyber-card" style={{ padding: '12px 16px' }}>
          <span style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
            STANDARDS & PROTOCOLS
          </span>
          <div style={{ fontSize: '13px', color: '#FFF', fontWeight: 600, marginTop: '2px' }}>
            AuthN: OpenID Connect, SAML 2.0, Kerberos <br />
            AuthZ: OAuth 2.0 Scopes, XACML, OPA Rego
          </div>
        </div>

        <div className="cyber-card" style={{ padding: '12px 16px' }}>
          <span style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
            HTTP ERROR CODE SEMANTICS
          </span>
          <div style={{ fontSize: '13px', color: '#FFF', fontWeight: 600, marginTop: '2px' }}>
            AuthN Missing: HTTP 401 Unauthorized <br />
            AuthZ Refused: HTTP 403 Forbidden
          </div>
        </div>
      </div>
    </div>
  );
};
