import React, { useState } from 'react';
import { Layers, ShieldCheck, CheckCircle2, ArrowRight, BookOpen, Terminal, Sparkles } from 'lucide-react';
import { CyberBadge } from '../layout/CyberBadge';

interface SlideProps {
  onNavigateToSlide?: (index: number) => void;
}

export const Slide02Agenda: React.FC<SlideProps> = ({ onNavigateToSlide }) => {
  const [activePhase, setActivePhase] = useState<number>(1);

  const phases = [
    {
      num: '01',
      title: 'Phase I: Conceptual & Architectural Foundations',
      slides: 'Slides 03 – 06',
      badge: 'THEORY & PIPELINE',
      color: '#4F8CFF',
      slideIndex: 2,
      topics: [
        'What is Access Control: The IAAA model & Reference Monitor criteria',
        'Why Access Control Matters: Defense against breaches & lateral movement',
        'Authentication (AuthN) vs Authorization (AuthZ) breakdown',
        'NIST/XACML Architecture: PEP, PDP, PAP, and PIP workflow'
      ]
    },
    {
      num: '02',
      title: 'Phase II: The Four Core Access Models',
      slides: 'Slides 07 – 10',
      badge: 'INTERACTIVE SANDBOXES',
      color: '#35D5E8',
      slideIndex: 6,
      topics: [
        'DAC: Discretionary Control, owner autonomy & live chmod simulator',
        'MAC: Mandatory Control, Bell-LaPadula multilevel clearance engine',
        'RBAC: Role-Based Control, enterprise hierarchy & Separation of Duties',
        'ABAC: Attribute-Based Control, dynamic runtime context & Zero Trust'
      ]
    },
    {
      num: '03',
      title: 'Phase III: Comparative Analysis & Practical Engineering',
      slides: 'Slides 11 – 14',
      badge: 'ENTERPRISE STRATEGY',
      color: '#FFBF69',
      slideIndex: 10,
      topics: [
        'Model Comparison Matrix: Trade-offs, radar metrics & decision guide',
        'Real-World Deployments: AWS IAM, Healthcare EHR, and SELinux',
        'Foundational Principles: Least privilege, need-to-know, fail-safe defaults',
        'Security Antipatterns: Privilege creep timeline & role explosion'
      ]
    },
    {
      num: '04',
      title: 'Phase IV: Capstone Synthesis & Verification',
      slides: 'Slides 15 – 16',
      badge: 'CASE STUDY & QUIZ',
      color: '#36D399',
      slideIndex: 14,
      topics: [
        'College Examination Portal Case Study: Multi-stakeholder security',
        'Why DAC fails, why MAC protects papers, why ABAC governs grading',
        'Interactive Scored 5-Question Certification Quiz',
        'Final Architecture Summary, Key Takeaways & Q&A'
      ]
    }
  ];

  return (
    <div className="slide-content-scroll slide-enter-animation">
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <CyberBadge text="SESSION ROADMAP" variant="cyan" icon={<BookOpen size={12} />} />
            <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#A8B3C7' }}>
              4 RIGOROUS PEDAGOGICAL MODULES
            </span>
          </div>
          <h2 style={{ fontSize: '28px', color: '#F3F6FC' }}>
            Curriculum Agenda & Learning Objectives
          </h2>
        </div>

        <div style={{
          background: 'rgba(53, 213, 232, 0.08)',
          border: '1px solid rgba(53, 213, 232, 0.3)',
          borderRadius: '8px',
          padding: '6px 14px',
          fontSize: '12px',
          color: '#35D5E8',
          fontFamily: 'var(--font-mono)'
        }}>
          ⏱️ 60-Minute Masterclass Structure
        </div>
      </div>

      {/* 4 Phases Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', flex: 1, minHeight: 0 }}>
        {phases.map((phase, idx) => {
          const isSelected = activePhase === idx + 1;
          return (
            <div
              key={phase.num}
              onMouseEnter={() => setActivePhase(idx + 1)}
              onClick={() => onNavigateToSlide && onNavigateToSlide(phase.slideIndex)}
              className={`cyber-card ${isSelected ? 'cyber-card-active' : ''}`}
              style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                background: isSelected ? 'rgba(17, 26, 46, 0.9)' : 'rgba(14, 22, 41, 0.65)',
                borderColor: isSelected ? phase.color : '#1E3156'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '24px',
                  fontWeight: 800,
                  color: isSelected ? phase.color : '#64748B'
                }}>
                  {phase.num}
                </span>
                <span style={{
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  background: 'rgba(255,255,255,0.06)',
                  color: phase.color,
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontWeight: 700
                }}>
                  {phase.badge}
                </span>
              </div>

              <h3 style={{ fontSize: '15px', color: '#F3F6FC', marginBottom: '4px', lineHeight: 1.35 }}>
                {phase.title}
              </h3>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#35D5E8', marginBottom: '14px', display: 'block' }}>
                {phase.slides}
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' }}>
                {phase.topics.map((t, tidx) => (
                  <div key={tidx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '11.5px', color: '#A8B3C7' }}>
                    <CheckCircle2 size={13} color={phase.color} style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ lineHeight: 1.4 }}>{t}</span>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: '16px',
                paddingTop: '10px',
                borderTop: '1px solid rgba(30, 49, 86, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '11px',
                color: isSelected ? phase.color : '#64748B'
              }}>
                <span>Jump to module</span>
                <ArrowRight size={13} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
