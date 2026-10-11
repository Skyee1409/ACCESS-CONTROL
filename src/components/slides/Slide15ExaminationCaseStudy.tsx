import React from 'react';
import { ExaminationPortalSimulator } from '../interactive/ExaminationPortalSimulator';
import { CyberBadge } from '../layout/CyberBadge';
import { GraduationCap, ShieldAlert, CheckCircle2, Lock, FileText } from 'lucide-react';

export const Slide15ExaminationCaseStudy: React.FC = () => {
  return (
    <div className="slide-content-scroll slide-enter-animation">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <CyberBadge text="CAPSTONE CASE STUDY" variant="coral" icon={<GraduationCap size={12} />} />
            <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#A8B3C7' }}>
              REAL-WORLD ACADEMIC SYSTEM ARCHITECTURE
            </span>
          </div>
          <h2 style={{ fontSize: '28px', color: '#F3F6FC' }}>
            College Examination Portal: Multi-Model Access Architecture
          </h2>
        </div>

        <div style={{
          background: 'rgba(255, 92, 138, 0.1)',
          border: '1px solid #FF5C8A',
          borderRadius: '8px',
          padding: '6px 14px',
          fontSize: '12px',
          color: '#FF84A8',
          fontFamily: 'var(--font-mono)'
        }}>
          Why No Single Model Can Solve This Alone
        </div>
      </div>

      {/* Embedded Working EMS Simulator */}
      <div style={{ marginBottom: '14px' }}>
        <ExaminationPortalSimulator />
      </div>

      {/* Architectural Breakdown Table */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        <div className="cyber-card" style={{ padding: '12px 14px', borderColor: 'rgba(255, 92, 138, 0.4)' }}>
          <span style={{ fontSize: '11px', color: '#FF5C8A', fontWeight: 700, fontFamily: 'var(--font-mono)', display: 'block' }}>
            WHY DAC FAILS
          </span>
          <p style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '4px', lineHeight: 1.4 }}>
            If the Question Setter (Professor) owns the file, they could mistakenly set permissions to world-readable or share it via email/cloud drive.
          </p>
        </div>

        <div className="cyber-card" style={{ padding: '12px 14px', borderColor: 'rgba(53, 213, 232, 0.4)' }}>
          <span style={{ fontSize: '11px', color: '#35D5E8', fontWeight: 700, fontFamily: 'var(--font-mono)', display: 'block' }}>
            WHY MAC IS ESSENTIAL
          </span>
          <p style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '4px', lineHeight: 1.4 }}>
            Question papers are stamped TOP SECRET. The system kernel prevents anyone—even the author—from copying or declassifying the file.
          </p>
        </div>

        <div className="cyber-card" style={{ padding: '12px 14px', borderColor: 'rgba(79, 140, 255, 0.4)' }}>
          <span style={{ fontSize: '11px', color: '#4F8CFF', fontWeight: 700, fontFamily: 'var(--font-mono)', display: 'block' }}>
            WHAT RBAC PROVIDES
          </span>
          <p style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '4px', lineHeight: 1.4 }}>
            Organizes high-level baseline roles: Controller of Exams (CoE), Course Professor, External Evaluator, Student, and Invigilator.
          </p>
        </div>

        <div className="cyber-card" style={{ padding: '12px 14px', borderColor: 'rgba(54, 211, 153, 0.4)' }}>
          <span style={{ fontSize: '11px', color: '#36D399', fontWeight: 700, fontFamily: 'var(--font-mono)', display: 'block' }}>
            WHERE ABAC IS CRITICAL
          </span>
          <p style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '4px', lineHeight: 1.4 }}>
            Evaluates dynamic temporal constraints: Evaluator can only grade assigned course during the 10-day window, with student barcodes masked.
          </p>
        </div>
      </div>
    </div>
  );
};
