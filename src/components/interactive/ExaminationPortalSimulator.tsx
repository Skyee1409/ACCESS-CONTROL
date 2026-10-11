import React, { useState } from 'react';
import { GraduationCap, ShieldCheck, ShieldAlert, FileText, Calendar, Lock, CheckCircle2, XCircle } from 'lucide-react';

export const ExaminationPortalSimulator: React.FC = () => {
  const [actor, setActor] = useState<'professor' | 'coe' | 'external_evaluator' | 'student'>('external_evaluator');
  const [targetResource, setTargetResource] = useState<'question_paper' | 'answer_scripts' | 'published_results'>('answer_scripts');
  const [evaluationDate, setEvaluationDate] = useState<'in_window' | 'outside_window'>('in_window');
  const [assignedCourse, setAssignedCourse] = useState<boolean>(true); // Course CS401 assigned?
  const [anonymizationActive, setAnonymizationActive] = useState<boolean>(true);

  // Decision logic
  let allowed = false;
  let enforcedBy = '';
  let reason = '';

  if (targetResource === 'question_paper') {
    if (actor === 'coe') {
      allowed = true;
      enforcedBy = 'MAC (Top Secret Clearance) + RBAC (Exam Cell)';
      reason = 'PERMIT: Controller of Examinations holds Top Secret clearance and authorization for master question vaults.';
    } else if (actor === 'professor') {
      allowed = false;
      enforcedBy = 'MAC (No Read Up after Submission)';
      reason = 'DENIED: Once submitted, the question paper is sealed with Top Secret MAC classification. Setting Professor cannot view or modify without CoE dual-key authorization.';
    } else {
      allowed = false;
      enforcedBy = 'MAC + RBAC Block';
      reason = 'DENIED: Confidential examination papers strictly barred from unauthorized actors.';
    }
  } else if (targetResource === 'answer_scripts') {
    if (actor === 'external_evaluator') {
      if (assignedCourse && evaluationDate === 'in_window') {
        allowed = true;
        enforcedBy = 'ABAC (Course ID Match + Temporal Window + Anonymized Masking)';
        reason = 'PERMIT: External Evaluator assigned to CS401 accessing scripts during active June 10–20 grading window. Student names dynamically redacted with barcodes.';
      } else if (!assignedCourse) {
        allowed = false;
        enforcedBy = 'ABAC (Attribute mismatch: course_id != assigned_course)';
        reason = 'DENIED: Evaluator is assigned to CS302, not CS401. Attribute mismatch.';
      } else {
        allowed = false;
        enforcedBy = 'ABAC (Temporal constraint: currentDate > evalDeadline)';
        reason = 'DENIED: Evaluation deadline expired on June 20. Portal grading interface locked.';
      }
    } else if (actor === 'coe') {
      allowed = true;
      enforcedBy = 'RBAC (Exam Cell Custodian)';
      reason = 'PERMIT: Exam Cell maintains custody of all submitted answer papers.';
    } else {
      allowed = false;
      enforcedBy = 'RBAC / ABAC';
      reason = 'DENIED: Students cannot access raw unmoderated answer papers.';
    }
  } else {
    // Published results
    if (actor === 'student') {
      allowed = true;
      enforcedBy = 'ABAC (Subject.RollNo === Record.StudentRollNo)';
      reason = 'PERMIT: Student can query and view their own verified grade card (row-level security).';
    } else {
      allowed = true;
      enforcedBy = 'RBAC';
      reason = 'PERMIT: Authorized academic faculty can view published semester results.';
    }
  }

  return (
    <div className="cyber-card" style={{ padding: '20px', background: 'rgba(14, 22, 41, 0.85)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GraduationCap size={18} color="#FF5C8A" />
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#F3F6FC' }}>
            CASE STUDY: UNIVERSITY EXAMINATION MANAGEMENT SYSTEM (EMS)
          </span>
        </div>
        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#FF5C8A' }}>
          HYBRID ARCHITECTURE: MAC + RBAC + ABAC
        </span>
      </div>

      {/* Simulator Inputs Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 1fr', gap: '14px', marginBottom: '16px' }}>
        {/* 1. Select Actor */}
        <div style={{ background: '#090F1F', border: '1px solid #1E3156', borderRadius: '10px', padding: '12px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#A8B3C7', display: 'block', marginBottom: '8px' }}>
            1. Select Actor (Identity & Role)
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[
              { id: 'external_evaluator', name: 'External Evaluator (Prof. Smith)', badge: 'RBAC + ABAC' },
              { id: 'professor', name: 'Internal Course Professor', badge: 'RBAC' },
              { id: 'coe', name: 'Controller of Exams (CoE)', badge: 'MAC + RBAC' },
              { id: 'student', name: 'Undergraduate Student', badge: 'RBAC + ABAC' }
            ].map(act => (
              <button
                key={act.id}
                onClick={() => setActor(act.id as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  background: actor === act.id ? 'rgba(79, 140, 255, 0.2)' : 'rgba(17, 26, 46, 0.6)',
                  border: actor === act.id ? '1px solid #4F8CFF' : '1px solid #1E3156',
                  color: actor === act.id ? '#FFF' : '#A8B3C7',
                  fontSize: '11.5px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span>{act.name}</span>
                <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: '#35D5E8' }}>{act.badge}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Target Resource */}
        <div style={{ background: '#090F1F', border: '1px solid #1E3156', borderRadius: '10px', padding: '12px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#A8B3C7', display: 'block', marginBottom: '8px' }}>
            2. Target Examination Object
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[
              { id: 'question_paper', name: 'Confidential Exam Paper Vault', classif: 'MAC: TOP SECRET' },
              { id: 'answer_scripts', name: 'Semester Answer Scripts (CS401)', classif: 'ABAC: GRADED' },
              { id: 'published_results', name: 'Final Moderated Marksheet', classif: 'RBAC: VERIFIED' }
            ].map(res => (
              <button
                key={res.id}
                onClick={() => setTargetResource(res.id as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  background: targetResource === res.id ? 'rgba(53, 213, 232, 0.15)' : 'rgba(17, 26, 46, 0.6)',
                  border: targetResource === res.id ? '1px solid #35D5E8' : '1px solid #1E3156',
                  color: targetResource === res.id ? '#FFF' : '#A8B3C7',
                  fontSize: '11.5px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span>{res.name}</span>
                <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: '#FFBF69' }}>{res.classif}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Dynamic ABAC Context Conditions */}
        <div style={{ background: '#090F1F', border: '1px solid #1E3156', borderRadius: '10px', padding: '12px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#A8B3C7', display: 'block', marginBottom: '8px' }}>
            3. Dynamic Context (ABAC)
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: '#94A3B8' }}>Grading Window:</span>
              <button
                onClick={() => setEvaluationDate(prev => prev === 'in_window' ? 'outside_window' : 'in_window')}
                style={{
                  background: evaluationDate === 'in_window' ? 'rgba(54, 211, 153, 0.15)' : 'rgba(255, 92, 138, 0.15)',
                  border: `1px solid ${evaluationDate === 'in_window' ? '#36D399' : '#FF5C8A'}`,
                  color: evaluationDate === 'in_window' ? '#36D399' : '#FF5C8A',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  cursor: 'pointer'
                }}
              >
                {evaluationDate === 'in_window' ? 'June 10-20 (Active)' : 'July 05 (Expired)'}
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: '#94A3B8' }}>Course Match:</span>
              <button
                onClick={() => setAssignedCourse(!assignedCourse)}
                style={{
                  background: assignedCourse ? 'rgba(54, 211, 153, 0.15)' : 'rgba(255, 92, 138, 0.15)',
                  border: `1px solid ${assignedCourse ? '#36D399' : '#FF5C8A'}`,
                  color: assignedCourse ? '#36D399' : '#FF5C8A',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  cursor: 'pointer'
                }}
              >
                {assignedCourse ? 'Assigned (CS401)' : 'Unassigned (CS302)'}
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: '#94A3B8' }}>Redaction Mask:</span>
              <button
                onClick={() => setAnonymizationActive(!anonymizationActive)}
                style={{
                  background: anonymizationActive ? 'rgba(53, 213, 232, 0.15)' : 'rgba(255, 191, 105, 0.15)',
                  border: `1px solid ${anonymizationActive ? '#35D5E8' : '#FFBF69'}`,
                  color: anonymizationActive ? '#35D5E8' : '#FFBF69',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  cursor: 'pointer'
                }}
              >
                {anonymizationActive ? 'Barcodes Active' : 'Real Names Exposed'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decision Output Banner */}
      <div style={{
        background: allowed ? 'rgba(54, 211, 153, 0.12)' : 'rgba(255, 92, 138, 0.12)',
        border: `1px solid ${allowed ? '#36D399' : '#FF5C8A'}`,
        borderRadius: '10px',
        padding: '12px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {allowed ? <ShieldCheck size={24} color="#36D399" /> : <ShieldAlert size={24} color="#FF5C8A" />}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span style={{
                fontSize: '13px',
                fontWeight: 800,
                color: allowed ? '#36D399' : '#FF5C8A',
                fontFamily: 'var(--font-mono)'
              }}>
                PORTAL VERDICT: {allowed ? 'ACCESS GRANTED' : 'ACCESS FORBIDDEN'}
              </span>
              <span style={{ fontSize: '11px', color: '#A8B3C7', background: '#080D1B', padding: '1px 6px', borderRadius: '4px' }}>
                Enforced via: {enforcedBy}
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#E2E8F0', lineHeight: 1.4 }}>
              {reason}
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'right', minWidth: '150px', fontFamily: 'var(--font-mono)' }}>
          <span style={{ fontSize: '10px', color: '#64748B', display: 'block' }}>EXAMINATION TRUST:</span>
          <span style={{ fontSize: '11px', color: '#35D5E8', fontWeight: 600 }}>Zero-Tamper Integrity</span>
        </div>
      </div>
    </div>
  );
};
