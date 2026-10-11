import React, { useState } from 'react';
import { Shield, Eye, Lock, FileCode, CheckCircle, Database, Server, Smartphone, Users } from 'lucide-react';
import { CyberBadge } from '../layout/CyberBadge';

export const Slide03WhatIsAccessControl: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'triad' | 'iaaa' | 'reference_monitor'>('triad');

  return (
    <div className="slide-content-scroll slide-enter-animation">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <CyberBadge text="FOUNDATIONAL THEORY" variant="blue" />
            <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#A8B3C7' }}>
              SECURITY ARCHITECTURE 101
            </span>
          </div>
          <h2 style={{ fontSize: '28px', color: '#F3F6FC' }}>
            What Is Access Control? The Core Reference Model
          </h2>
        </div>

        {/* Tab switchers */}
        <div style={{ display: 'flex', background: '#080D1B', border: '1px solid #1E3156', borderRadius: '8px', padding: '3px' }}>
          <button
            onClick={() => setActiveTab('triad')}
            style={{
              background: activeTab === 'triad' ? 'rgba(53, 213, 232, 0.2)' : 'transparent',
              border: activeTab === 'triad' ? '1px solid #35D5E8' : '1px solid transparent',
              color: activeTab === 'triad' ? '#35D5E8' : '#A8B3C7',
              padding: '4px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Subject / Object Triad
          </button>
          <button
            onClick={() => setActiveTab('iaaa')}
            style={{
              background: activeTab === 'iaaa' ? 'rgba(79, 140, 255, 0.2)' : 'transparent',
              border: activeTab === 'iaaa' ? '1px solid #4F8CFF' : '1px solid transparent',
              color: activeTab === 'iaaa' ? '#4F8CFF' : '#A8B3C7',
              padding: '4px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            The IAAA Pipeline
          </button>
          <button
            onClick={() => setActiveTab('reference_monitor')}
            style={{
              background: activeTab === 'reference_monitor' ? 'rgba(54, 211, 153, 0.2)' : 'transparent',
              border: activeTab === 'reference_monitor' ? '1px solid #36D399' : '1px solid transparent',
              color: activeTab === 'reference_monitor' ? '#36D399' : '#A8B3C7',
              padding: '4px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            The Reference Monitor
          </button>
        </div>
      </div>

      {/* Main Content Area based on Tab */}
      {activeTab === 'triad' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
          <div style={{
            background: 'rgba(53, 213, 232, 0.06)',
            border: '1px solid rgba(53, 213, 232, 0.25)',
            borderRadius: '10px',
            padding: '14px 20px',
            fontSize: '14px',
            color: '#E2E8F0',
            lineHeight: 1.5
          }}>
            <strong style={{ color: '#35D5E8' }}>Formal Definition: </strong>
            Access Control is the programmatic process of granting or revoking specific capabilities to a <strong>Subject</strong> (user, process, or service) attempting to execute an <strong>Operation</strong> on an <strong>Object</strong> (file, API, database record, hardware device).
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {/* Subject */}
            <div className="cyber-card" style={{ padding: '20px', borderColor: 'rgba(79, 140, 255, 0.4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(79, 140, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4F8CFF' }}>
                  <Users size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', color: '#4F8CFF' }}>1. The Subject</h3>
                  <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#A8B3C7' }}>Active Entity</span>
                </div>
              </div>
              <p style={{ fontSize: '12.5px', color: '#A8B3C7', lineHeight: 1.5, marginBottom: '12px' }}>
                The entity initiating an action. Subjects are active agents requesting system resources.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11.5px', color: '#E2E8F0', fontFamily: 'var(--font-mono)' }}>
                <span>• Human User (alice@company.com)</span>
                <span>• Background Service Daemon / Pod</span>
                <span>• Microservice API Consumer</span>
              </div>
            </div>

            {/* Operation */}
            <div className="cyber-card" style={{ padding: '20px', borderColor: 'rgba(53, 213, 232, 0.4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(53, 213, 232, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#35D5E8' }}>
                  <Lock size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', color: '#35D5E8' }}>2. The Operation</h3>
                  <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#A8B3C7' }}>Action / Verb</span>
                </div>
              </div>
              <p style={{ fontSize: '12.5px', color: '#A8B3C7', lineHeight: 1.5, marginBottom: '12px' }}>
                The specific action being attempted on the target resource.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11.5px', color: '#E2E8F0', fontFamily: 'var(--font-mono)' }}>
                <span>• READ: View data contents</span>
                <span>• WRITE / EDIT: Mutate or create data</span>
                <span>• EXECUTE: Run binary code</span>
                <span>• DELETE / DROP: Purge records</span>
              </div>
            </div>

            {/* Object */}
            <div className="cyber-card" style={{ padding: '20px', borderColor: 'rgba(54, 211, 153, 0.4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(54, 211, 153, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#36D399' }}>
                  <Database size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', color: '#36D399' }}>3. The Object</h3>
                  <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#A8B3C7' }}>Passive Entity</span>
                </div>
              </div>
              <p style={{ fontSize: '12.5px', color: '#A8B3C7', lineHeight: 1.5, marginBottom: '12px' }}>
                The passive asset being accessed or manipulated by the subject.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11.5px', color: '#E2E8F0', fontFamily: 'var(--font-mono)' }}>
                <span>• Filesystem Document (.pdf, .sh)</span>
                <span>• SQL Database Table / Row</span>
                <span>• Cloud S3 Bucket / Blob</span>
                <span>• REST / GraphQL API Endpoint</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View 2: The IAAA Pipeline */}
      {activeTab === 'iaaa' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', flex: 1 }}>
          {[
            {
              step: 'I',
              title: 'Identification',
              question: 'Who are you claiming to be?',
              desc: 'The subject asserts an identity to the computing system.',
              examples: 'Username, Employee ID #, API Key ID, Email address'
            },
            {
              step: 'A',
              title: 'Authentication',
              question: 'Can you prove your identity?',
              desc: 'The system validates proof through knowledge, possession, or biometrics.',
              examples: 'Password, FIDO2 WebAuthn token, TOTP MFA code, Facial scan'
            },
            {
              step: 'A',
              title: 'Authorization',
              question: 'What actions are you allowed?',
              desc: 'Enforcing security policy to permit or deny specific actions on objects.',
              examples: 'DAC permissions, MAC clearances, RBAC roles, ABAC attributes'
            },
            {
              step: 'A',
              title: 'Accountability',
              question: 'What actions did you execute?',
              desc: 'Tracing every attempted action to an immutable, non-repudiable audit trail.',
              examples: 'SIEM log stream, CloudTrail, Syslog, Write-Once-Read-Many (WORM)'
            }
          ].map((item, idx) => (
            <div key={idx} className="cyber-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '28px',
                fontWeight: 900,
                color: idx === 2 ? '#35D5E8' : '#4F8CFF',
                marginBottom: '4px'
              }}>
                {item.step}
              </span>
              <h3 style={{ fontSize: '16px', color: '#F3F6FC', marginBottom: '4px' }}>
                {item.title}
              </h3>
              <span style={{ fontSize: '12px', color: '#FFBF69', fontWeight: 600, marginBottom: '10px' }}>
                "{item.question}"
              </span>
              <p style={{ fontSize: '12.5px', color: '#A8B3C7', lineHeight: 1.45, marginBottom: '14px' }}>
                {item.desc}
              </p>
              <div style={{ marginTop: 'auto', background: '#080D1B', border: '1px solid #1E3156', borderRadius: '6px', padding: '8px 10px', fontSize: '11px', color: '#35D5E8', fontFamily: 'var(--font-mono)' }}>
                {item.examples}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View 3: The Reference Monitor */}
      {activeTab === 'reference_monitor' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', flex: 1, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h3 style={{ fontSize: '18px', color: '#36D399' }}>
              Anderson's 1972 Reference Monitor Concept
            </h3>
            <p style={{ fontSize: '13px', color: '#A8B3C7', lineHeight: 1.6 }}>
              In James Anderson's seminal 1972 Computer Security Technology Planning Study, he defined the <strong>Reference Monitor</strong> as the abstract machine that mediates all access between subjects and objects. To be secure, it must satisfy three immutable axioms:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ background: '#090F1F', border: '1px solid #36D399', borderRadius: '8px', padding: '12px 14px' }}>
                <span style={{ color: '#36D399', fontWeight: 700, fontSize: '13px', display: 'block' }}>
                  1. Complete Mediation (Always Invoked)
                </span>
                <span style={{ fontSize: '12px', color: '#CBD5E1' }}>
                  Every single access attempt must be intercepted without exception. No backdoor or bypass path may exist.
                </span>
              </div>

              <div style={{ background: '#090F1F', border: '1px solid #4F8CFF', borderRadius: '8px', padding: '12px 14px' }}>
                <span style={{ color: '#4F8CFF', fontWeight: 700, fontSize: '13px', display: 'block' }}>
                  2. Tamper-Proof (Self-Protecting)
                </span>
                <span style={{ fontSize: '12px', color: '#CBD5E1' }}>
                  The reference monitor mechanism itself must be strictly isolated from unauthorized modification or memory corruption.
                </span>
              </div>

              <div style={{ background: '#090F1F', border: '1px solid #FFBF69', borderRadius: '8px', padding: '12px 14px' }}>
                <span style={{ color: '#FFBF69', fontWeight: 700, fontSize: '13px', display: 'block' }}>
                  3. Formally Verifiable (Small & Analyzable)
                </span>
                <span style={{ fontSize: '12px', color: '#CBD5E1' }}>
                  The codebase and logic must be sufficiently compact and mathematically structured to be formally proven correct.
                </span>
              </div>
            </div>
          </div>

          {/* Reference Monitor Architecture Graphic */}
          <div style={{
            background: '#080D1B',
            border: '1px solid #1E3156',
            borderRadius: '12px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px',
            textAlign: 'center'
          }}>
            <div style={{ background: 'rgba(79, 140, 255, 0.15)', border: '1px solid #4F8CFF', borderRadius: '8px', padding: '10px 20px', width: '80%' }}>
              <span style={{ fontSize: '12px', color: '#4F8CFF', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                SUBJECT (User / Process)
              </span>
            </div>

            <span style={{ color: '#64748B', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>↓ Access Request</span>

            <div style={{
              background: 'rgba(54, 211, 153, 0.15)',
              border: '2px solid #36D399',
              borderRadius: '10px',
              padding: '16px 20px',
              width: '95%',
              boxShadow: '0 0 20px rgba(54, 211, 153, 0.2)'
            }}>
              <span style={{ fontSize: '13px', color: '#36D399', fontWeight: 800, display: 'block' }}>
                REFERENCE MONITOR / SECURITY KERNEL
              </span>
              <span style={{ fontSize: '11px', color: '#A8B3C7' }}>
                Evaluates Security Database & Policies
              </span>
            </div>

            <span style={{ color: '#64748B', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>↓ Mediated Access</span>

            <div style={{ background: 'rgba(53, 213, 232, 0.15)', border: '1px solid #35D5E8', borderRadius: '8px', padding: '10px 20px', width: '80%' }}>
              <span style={{ fontSize: '12px', color: '#35D5E8', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                OBJECT (File / DB / API)
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
