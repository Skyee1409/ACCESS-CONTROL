import React, { useState } from 'react';
import { UserCheck, Key, Shield, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

export const AuthComparisonTester: React.FC = () => {
  const [analogyMode, setAnalogyMode] = useState<'airport' | 'hotel' | 'web'>('airport');
  const [authStep, setAuthStep] = useState<'authn_passed' | 'authz_passed' | 'authz_denied'>('authn_passed');

  const analogies = {
    airport: {
      authn: {
        title: 'Authentication (AuthN)',
        badge: 'WHO ARE YOU?',
        metaphor: 'Passport Control / Border Security',
        description: 'Officer inspects your biometric passport, checks facial scan, and stamps entry.',
        artifact: 'Verified Passport (Digital Identity)',
        result: 'Identity confirmed: John Doe (Citizen #94821)'
      },
      authz: {
        title: 'Authorization (AuthZ)',
        badge: 'WHAT CAN YOU ACCESS?',
        metaphor: 'Boarding Gate & Seat Assignment',
        description: 'Gate scanner checks if your ticket permits boarding Flight AF402 and grants Business Lounge access.',
        artifact: 'Boarding Pass (Scoped Token / Ticket)',
        result: 'Permitted: Gate 12, Seat 14A. Denied: First Class Lounge (Standard ticket only).'
      }
    },
    hotel: {
      authn: {
        title: 'Authentication (AuthN)',
        badge: 'WHO ARE YOU?',
        metaphor: 'Front Desk Check-in',
        description: 'Receptionist verifies your government photo ID and credit card reservation.',
        artifact: 'Guest Registration Card',
        result: 'Identity verified: Alice Walker (Confirmed Guest)'
      },
      authz: {
        title: 'Authorization (AuthZ)',
        badge: 'WHAT CAN YOU ACCESS?',
        metaphor: 'RFID Room Keycard',
        description: 'Card unlocks Room 408 and 4th Floor Elevator. Fails on Room 409 and Penthouse Suite.',
        artifact: 'NFC Keycard (Access Token / Capability)',
        result: 'Door lock reads card permissions: Room 408 [UNLOCK]. Room 409 [LOCKED - 403].'
      }
    },
    web: {
      authn: {
        title: 'Authentication (AuthN)',
        badge: 'WHO ARE YOU?',
        metaphor: 'SSO / Identity Provider (OIDC)',
        description: 'User enters password, approves MFA push on smartphone, IDP issues ID Token.',
        artifact: 'OpenID Connect ID Token (JWT id_token)',
        result: '{ sub: "usr_941", email: "alice@hospital.org", mfa: true }'
      },
      authz: {
        title: 'Authorization (AuthZ)',
        badge: 'WHAT CAN YOU ACCESS?',
        metaphor: 'API Gateway / Policy Decision Point',
        description: 'OAuth2 server issues access_token with scopes. Policy engine verifies claims on endpoint.',
        artifact: 'OAuth2 Access Token (JWT with Scopes)',
        result: '{ scope: ["patients:read", "records:view"], role: "physician" }'
      }
    }
  };

  const current = analogies[analogyMode];

  return (
    <div className="cyber-card" style={{ padding: '20px', background: 'rgba(14, 22, 41, 0.85)' }}>
      {/* Top Metaphor Selector */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <span style={{ fontSize: '13px', fontWeight: 700, color: '#F3F6FC' }}>
          INTUITIVE MENTAL MODELS // AUTHENTICATION VS AUTHORIZATION
        </span>
        <div style={{ display: 'flex', background: '#080D1B', border: '1px solid #1E3156', borderRadius: '8px', padding: '3px' }}>
          {(['airport', 'hotel', 'web'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setAnalogyMode(mode)}
              style={{
                background: analogyMode === mode ? 'rgba(79, 140, 255, 0.25)' : 'transparent',
                border: analogyMode === mode ? '1px solid #4F8CFF' : '1px solid transparent',
                color: analogyMode === mode ? '#FFF' : '#A8B3C7',
                padding: '4px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {mode} Metaphor
            </button>
          ))}
        </div>
      </div>

      {/* Side-by-Side Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        {/* AuthN Card */}
        <div style={{
          background: '#090F1F',
          border: '1px solid #35D5E8',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <UserCheck size={18} color="#35D5E8" />
              <h4 style={{ fontSize: '14px', color: '#35D5E8', fontWeight: 700 }}>
                {current.authn.title}
              </h4>
            </div>
            <span style={{
              background: 'rgba(53, 213, 232, 0.15)',
              border: '1px solid rgba(53, 213, 232, 0.4)',
              color: '#35D5E8',
              fontSize: '10px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '4px'
            }}>
              {current.authn.badge}
            </span>
          </div>

          <div style={{ fontSize: '12px', color: '#FFF', fontWeight: 600 }}>
            Metaphor: {current.authn.metaphor}
          </div>

          <p style={{ fontSize: '12px', color: '#A8B3C7', lineHeight: 1.45 }}>
            {current.authn.description}
          </p>

          <div style={{
            marginTop: 'auto',
            background: 'rgba(17, 26, 46, 0.8)',
            border: '1px solid #1E3156',
            borderRadius: '8px',
            padding: '8px 12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px'
          }}>
            <span style={{ color: '#64748B', display: 'block' }}>VERIFIED IDENTITY ARTIFACT:</span>
            <span style={{ color: '#36D399' }}>✓ {current.authn.result}</span>
          </div>
        </div>

        {/* AuthZ Card */}
        <div style={{
          background: '#090F1F',
          border: '1px solid #4F8CFF',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Key size={18} color="#4F8CFF" />
              <h4 style={{ fontSize: '14px', color: '#4F8CFF', fontWeight: 700 }}>
                {current.authz.title}
              </h4>
            </div>
            <span style={{
              background: 'rgba(79, 140, 255, 0.15)',
              border: '1px solid rgba(79, 140, 255, 0.4)',
              color: '#4F8CFF',
              fontSize: '10px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '4px'
            }}>
              {current.authz.badge}
            </span>
          </div>

          <div style={{ fontSize: '12px', color: '#FFF', fontWeight: 600 }}>
            Metaphor: {current.authz.metaphor}
          </div>

          <p style={{ fontSize: '12px', color: '#A8B3C7', lineHeight: 1.45 }}>
            {current.authz.description}
          </p>

          <div style={{
            marginTop: 'auto',
            background: 'rgba(17, 26, 46, 0.8)',
            border: '1px solid #1E3156',
            borderRadius: '8px',
            padding: '8px 12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px'
          }}>
            <span style={{ color: '#64748B', display: 'block' }}>PERMISSION DECISION ARTIFACT:</span>
            <span style={{ color: '#4F8CFF' }}>⚡ {current.authz.result}</span>
          </div>
        </div>
      </div>

      {/* Golden Rule Summary Banner */}
      <div style={{
        background: 'rgba(255, 191, 105, 0.08)',
        border: '1px solid rgba(255, 191, 105, 0.3)',
        borderRadius: '8px',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '12px'
      }}>
        <span style={{ color: '#FFBF69', fontWeight: 600 }}>
          💡 THE GOLDEN RULE: Authentication ALWAYS precedes Authorization. Proving who you are does NOT automatically grant you permission to do anything!
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', color: '#A8B3C7', fontSize: '11px' }}>
          AuthN → Identity | AuthZ → Privilege
        </span>
      </div>
    </div>
  );
};
