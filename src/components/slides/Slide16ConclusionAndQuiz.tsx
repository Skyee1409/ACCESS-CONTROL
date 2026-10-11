import React, { useState } from 'react';
import { InteractiveQuiz } from '../interactive/InteractiveQuiz';
import { CyberBadge } from '../layout/CyberBadge';
import { Trophy, HelpCircle, Heart, ShieldCheck, BookOpen, ExternalLink, RotateCcw } from 'lucide-react';

interface SlideProps {
  onRestartPresentation: () => void;
}

export const Slide16ConclusionAndQuiz: React.FC<SlideProps> = ({ onRestartPresentation }) => {
  const [activeTab, setActiveTab] = useState<'quiz' | 'takeaways' | 'references'>('quiz');

  return (
    <div className="slide-content-scroll slide-enter-animation">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <CyberBadge text="EVALUATION & CONCLUSION" variant="green" icon={<Trophy size={12} />} />
            <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#A8B3C7' }}>
              FINAL SYNTHESIS & CERTIFICATION
            </span>
          </div>
          <h2 style={{ fontSize: '28px', color: '#F3F6FC' }}>
            Conclusion, Interactive Knowledge Quiz & Closing
          </h2>
        </div>

        {/* Tab switchers */}
        <div style={{ display: 'flex', background: '#080D1B', border: '1px solid #1E3156', borderRadius: '8px', padding: '3px' }}>
          <button
            onClick={() => setActiveTab('quiz')}
            style={{
              background: activeTab === 'quiz' ? 'rgba(53, 213, 232, 0.2)' : 'transparent',
              border: activeTab === 'quiz' ? '1px solid #35D5E8' : '1px solid transparent',
              color: activeTab === 'quiz' ? '#35D5E8' : '#A8B3C7',
              padding: '4px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            5-Question Scored Quiz
          </button>
          <button
            onClick={() => setActiveTab('takeaways')}
            style={{
              background: activeTab === 'takeaways' ? 'rgba(54, 211, 153, 0.2)' : 'transparent',
              border: activeTab === 'takeaways' ? '1px solid #36D399' : '1px solid transparent',
              color: activeTab === 'takeaways' ? '#36D399' : '#A8B3C7',
              padding: '4px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Core Takeaways
          </button>
          <button
            onClick={() => setActiveTab('references')}
            style={{
              background: activeTab === 'references' ? 'rgba(79, 140, 255, 0.2)' : 'transparent',
              border: activeTab === 'references' ? '1px solid #4F8CFF' : '1px solid transparent',
              color: activeTab === 'references' ? '#4F8CFF' : '#A8B3C7',
              padding: '4px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            References & Standards
          </button>
        </div>
      </div>

      {/* View 1: 5-Question Scored Quiz */}
      {activeTab === 'quiz' && (
        <div style={{ flex: 1, minHeight: 0 }}>
          <InteractiveQuiz />
        </div>
      )}

      {/* View 2: Core Takeaways & Summary */}
      {activeTab === 'takeaways' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ fontSize: '18px', color: '#36D399' }}>
              The 5 Golden Rules of Access Control Engineering
            </h3>

            <div style={{ background: '#090F1F', border: '1px solid #1E3156', borderRadius: '10px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#35D5E8', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>01.</span>
                <span style={{ fontSize: '13px', color: '#E2E8F0' }}>
                  <strong>Authentication != Authorization:</strong> Verifying identity with passwords or MFA does not confer permission. Enforce distinct authorization checks on every object.
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#4F8CFF', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>02.</span>
                <span style={{ fontSize: '13px', color: '#E2E8F0' }}>
                  <strong>Hybrid Architecture is King:</strong> Pure DAC is too reckless; pure MAC is too rigid; pure RBAC suffers role explosion. Modern leaders marry RBAC roles with ABAC dynamic context.
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#36D399', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>03.</span>
                <span style={{ fontSize: '13px', color: '#E2E8F0' }}>
                  <strong>Default Deny is Non-Negotiable:</strong> Always configure access policies to fail closed. In the absence of an explicit permit rule, every request must be denied.
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#FFBF69', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>04.</span>
                <span style={{ fontSize: '13px', color: '#E2E8F0' }}>
                  <strong>Combat Toxic Entropy:</strong> Access rights naturally accumulate over an employee's career (privilege creep). Enforce automated quarterly reviews and Just-In-Time (JIT) access.
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#FF5C8A', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>05.</span>
                <span style={{ fontSize: '13px', color: '#E2E8F0' }}>
                  <strong>Auditing is Part of Authorization:</strong> Access control without immutable non-repudiable audit logs violates the IAAA model and blinds your incident response team.
                </span>
              </div>
            </div>
          </div>

          {/* Right: Thank You & Restart Card */}
          <div className="cyber-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: 'rgba(14, 22, 41, 0.95)' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #35D5E8 0%, #4F8CFF 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#080D1B',
              marginBottom: '16px',
              boxShadow: '0 0 25px rgba(53, 213, 232, 0.4)'
            }}>
              <ShieldCheck size={30} />
            </div>

            <h3 style={{ fontSize: '20px', color: '#F3F6FC', marginBottom: '6px' }}>
              Thank You for Attending!
            </h3>
            <p style={{ fontSize: '13px', color: '#A8B3C7', marginBottom: '20px' }}>
              Masterclass delivered by your Cybersecurity Professor & Identity Governance Lead.
            </p>

            <button
              onClick={onRestartPresentation}
              className="cyber-button cyber-button-primary"
              style={{ padding: '10px 20px', fontSize: '13px' }}
            >
              <RotateCcw size={15} />
              <span>Restart Presentation (Slide 1)</span>
            </button>
          </div>
        </div>
      )}

      {/* View 3: References & Standards */}
      {activeTab === 'references' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', flex: 1 }}>
          <div className="cyber-card" style={{ padding: '16px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#35D5E8', fontFamily: 'var(--font-mono)' }}>
              NIST Standards
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px', fontSize: '12px', color: '#CBD5E1' }}>
              <span>• NIST SP 800-162 (ABAC Guide)</span>
              <span>• ANSI/INCITS 359-2004 (RBAC Standard)</span>
              <span>• NIST SP 800-207 (Zero Trust Architecture)</span>
            </div>
          </div>

          <div className="cyber-card" style={{ padding: '16px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#4F8CFF', fontFamily: 'var(--font-mono)' }}>
              Academic Seminal Papers
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px', fontSize: '12px', color: '#CBD5E1' }}>
              <span>• Anderson (1972) - Computer Security Planning (Reference Monitor)</span>
              <span>• Bell & LaPadula (1973) - Multilevel Security Confidentiality</span>
              <span>• Biba (1977) - Integrity Limitations for DoD</span>
            </div>
          </div>

          <div className="cyber-card" style={{ padding: '16px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#FFBF69', fontFamily: 'var(--font-mono)' }}>
              Industry Specifications
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px', fontSize: '12px', color: '#CBD5E1' }}>
              <span>• OASIS XACML 3.0 Standard</span>
              <span>• Open Policy Agent (OPA) / CNCF Rego</span>
              <span>• IETF RFC 6749 (OAuth 2.0 Authorization)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
