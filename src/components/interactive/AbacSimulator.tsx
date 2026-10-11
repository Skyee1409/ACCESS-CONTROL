import React, { useState } from 'react';
import { ABAC_SUBJECTS, ABAC_RESOURCES, AbacAction, AbacEnvironment } from '../../data/abacData';
import { Sliders, ShieldCheck, ShieldAlert, Cpu, Laptop, Wifi, Clock, AlertTriangle, FileCode } from 'lucide-react';

export const AbacSimulator: React.FC = () => {
  const [subjectId, setSubjectId] = useState<string>('alice');
  const [resourceId, setResourceId] = useState<string>('cardiac_surgery_record');
  const [action, setAction] = useState<AbacAction>('READ');
  
  // Environment attributes
  const [environment, setEnvironment] = useState<AbacEnvironment>({
    network: 'hospital_lan',
    device: 'managed_encrypted',
    timeSlot: 'business_hours'
  });

  const subject = ABAC_SUBJECTS.find(s => s.id === subjectId) || ABAC_SUBJECTS[0];
  const resource = ABAC_RESOURCES.find(r => r.id === resourceId) || ABAC_RESOURCES[0];

  // ABAC Policy Rules Evaluation Engine:
  // Rule 1: Break-Glass Emergency Override (Only doctors can invoke, triggers critical audit)
  const isDoctor = subject.role.includes('Surgeon') || subject.role.includes('Doctor') || subject.role.includes('Resident');
  const isBreakGlass = action === 'BREAK_GLASS';

  // Rule 2: Department match (Subject Dept === Resource Dept)
  const isDeptMatch = subject.department === resource.department;

  // Rule 3: Clearance level check
  const hasClearance = subject.clearanceLevel >= resource.requiredClearance;

  // Rule 4: Export restrictions: Requires managed encrypted device AND hospital LAN
  const isSecureExportEnvironment = environment.device === 'managed_encrypted' && environment.network === 'hospital_lan';

  // Rule 5: Off-hours midnight restriction unless break glass
  const isNormalTime = environment.timeSlot !== 'off_hours_midnight';

  // Decision Logic
  let decision: 'PERMIT' | 'DENY' = 'DENY';
  let failureReasons: string[] = [];
  let successRules: string[] = [];

  if (isBreakGlass) {
    if (isDoctor) {
      decision = 'PERMIT';
      successRules.push('BREAK-GLASS OVERRIDE: Subject is an emergency clinician. Access granted with IMMEDIATE CRITICAL AUDIT LOG ALERT dispatched to Chief Medical Officer.');
    } else {
      decision = 'DENY';
      failureReasons.push('Subject lacks medical clinician credentials to trigger Emergency Break-Glass.');
    }
  } else {
    // Standard ABAC Policy Evaluation
    if (!isDeptMatch) {
      failureReasons.push(`Department Mismatch: Subject is in [${subject.department}], but resource is in [${resource.department}].`);
    } else {
      successRules.push(`Department Alignment: Both subject and object belong to [${subject.department}].`);
    }

    if (!hasClearance) {
      failureReasons.push(`Insufficient Clearance: Subject Level (${subject.clearanceLevel}) < Required Level (${resource.requiredClearance}).`);
    } else {
      successRules.push(`Clearance Validated: Subject clearance level meets or exceeds resource tier.`);
    }

    if (action === 'EXPORT_DOWNLOAD' && !isSecureExportEnvironment) {
      failureReasons.push(`Export DLP Policy: Exporting sensitive EHRs requires Managed Encrypted Device on Hospital Secure LAN.`);
    }

    if (!isNormalTime) {
      failureReasons.push(`Temporal Policy: Sensitive records access prohibited during Suspicious Off-Hours (02:00 AM) without Break-Glass authorization.`);
    }

    decision = failureReasons.length === 0 ? 'PERMIT' : 'DENY';
  }

  return (
    <div className="cyber-card" style={{ padding: '20px', background: 'rgba(14, 22, 41, 0.85)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sliders size={18} color="#36D399" />
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#F3F6FC' }}>
            ABAC RUNTIME ATTRIBUTE ENGINE // XACML POLICY EVALUATOR
          </span>
        </div>
        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#36D399' }}>
          Formula: f(Subject, Resource, Action, Environment) → Decision
        </span>
      </div>

      {/* 4 Attributes Controls Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
        {/* 1. Subject Attributes */}
        <div style={{ background: '#090F1F', border: '1px solid #1E3156', borderRadius: '10px', padding: '12px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#A8B3C7', display: 'block', marginBottom: '8px' }}>
            1. Subject (Who)
          </span>
          <select
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            style={{
              width: '100%',
              background: '#0E1629',
              border: '1px solid #1E3156',
              color: '#F3F6FC',
              padding: '6px 8px',
              borderRadius: '6px',
              fontSize: '12px',
              marginBottom: '8px'
            }}
          >
            {ABAC_SUBJECTS.map(s => (
              <option key={s.id} value={s.id}>{s.name} ({s.department})</option>
            ))}
          </select>
          <div style={{ fontSize: '10.5px', color: '#A8B3C7', fontFamily: 'var(--font-mono)', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span>Role: {subject.role}</span>
            <span>Dept: {subject.department}</span>
            <span>Clearance: Level {subject.clearanceLevel}</span>
          </div>
        </div>

        {/* 2. Resource Attributes */}
        <div style={{ background: '#090F1F', border: '1px solid #1E3156', borderRadius: '10px', padding: '12px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#A8B3C7', display: 'block', marginBottom: '8px' }}>
            2. Resource (What)
          </span>
          <select
            value={resourceId}
            onChange={(e) => setResourceId(e.target.value)}
            style={{
              width: '100%',
              background: '#0E1629',
              border: '1px solid #1E3156',
              color: '#F3F6FC',
              padding: '6px 8px',
              borderRadius: '6px',
              fontSize: '12px',
              marginBottom: '8px'
            }}
          >
            {ABAC_RESOURCES.map(r => (
              <option key={r.id} value={r.id}>{r.title}</option>
            ))}
          </select>
          <div style={{ fontSize: '10.5px', color: '#A8B3C7', fontFamily: 'var(--font-mono)', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span>Dept: {resource.department}</span>
            <span>Class: {resource.classification}</span>
            <span>Req. Level: {resource.requiredClearance}</span>
          </div>
        </div>

        {/* 3. Action Attributes */}
        <div style={{ background: '#090F1F', border: '1px solid #1E3156', borderRadius: '10px', padding: '12px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#A8B3C7', display: 'block', marginBottom: '8px' }}>
            3. Action (How)
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {(['READ', 'EDIT', 'EXPORT_DOWNLOAD', 'BREAK_GLASS'] as AbacAction[]).map(act => (
              <button
                key={act}
                onClick={() => setAction(act)}
                style={{
                  padding: '4px 8px',
                  borderRadius: '5px',
                  background: action === act 
                    ? (act === 'BREAK_GLASS' ? 'rgba(255, 92, 138, 0.25)' : 'rgba(54, 211, 153, 0.25)')
                    : 'rgba(17, 26, 46, 0.6)',
                  border: action === act 
                    ? (act === 'BREAK_GLASS' ? '1px solid #FF5C8A' : '1px solid #36D399')
                    : '1px solid #1E3156',
                  color: action === act 
                    ? (act === 'BREAK_GLASS' ? '#FF5C8A' : '#36D399')
                    : '#A8B3C7',
                  fontSize: '11px',
                  fontWeight: action === act ? 700 : 400,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                {act === 'BREAK_GLASS' ? '🚨 BREAK-GLASS (EMERGENCY)' : act.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Environmental Attributes */}
        <div style={{ background: '#090F1F', border: '1px solid #1E3156', borderRadius: '10px', padding: '12px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#A8B3C7', display: 'block', marginBottom: '8px' }}>
            4. Context (Where/When)
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px' }}>
            {/* Network */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: '#94A3B8' }}>Network:</span>
              <button
                onClick={() => setEnvironment({
                  ...environment,
                  network: environment.network === 'hospital_lan' ? 'public_wifi' : 'hospital_lan'
                })}
                style={{
                  background: environment.network === 'hospital_lan' ? 'rgba(54, 211, 153, 0.15)' : 'rgba(255, 92, 138, 0.15)',
                  border: `1px solid ${environment.network === 'hospital_lan' ? '#36D399' : '#FF5C8A'}`,
                  color: environment.network === 'hospital_lan' ? '#36D399' : '#FF5C8A',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer'
                }}
              >
                {environment.network === 'hospital_lan' ? 'Secure LAN' : 'Public Wi-Fi'}
              </button>
            </div>

            {/* Device */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: '#94A3B8' }}>Device:</span>
              <button
                onClick={() => setEnvironment({
                  ...environment,
                  device: environment.device === 'managed_encrypted' ? 'personal_unmanaged' : 'managed_encrypted'
                })}
                style={{
                  background: environment.device === 'managed_encrypted' ? 'rgba(79, 140, 255, 0.15)' : 'rgba(255, 191, 105, 0.15)',
                  border: `1px solid ${environment.device === 'managed_encrypted' ? '#4F8CFF' : '#FFBF69'}`,
                  color: environment.device === 'managed_encrypted' ? '#4F8CFF' : '#FFBF69',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer'
                }}
              >
                {environment.device === 'managed_encrypted' ? 'Managed PC' : 'Personal Phone'}
              </button>
            </div>

            {/* Time Slot */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: '#94A3B8' }}>Time:</span>
              <button
                onClick={() => setEnvironment({
                  ...environment,
                  timeSlot: environment.timeSlot === 'business_hours' ? 'off_hours_midnight' : 'business_hours'
                })}
                style={{
                  background: environment.timeSlot === 'business_hours' ? 'rgba(53, 213, 232, 0.15)' : 'rgba(255, 92, 138, 0.15)',
                  border: `1px solid ${environment.timeSlot === 'business_hours' ? '#35D5E8' : '#FF5C8A'}`,
                  color: environment.timeSlot === 'business_hours' ? '#35D5E8' : '#FF5C8A',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer'
                }}
              >
                {environment.timeSlot === 'business_hours' ? '08:00–18:00' : '02:00 AM (Off)'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decision Output & Policy Rule Trace */}
      <div style={{
        background: decision === 'PERMIT' ? 'rgba(54, 211, 153, 0.12)' : 'rgba(255, 92, 138, 0.12)',
        border: `1px solid ${decision === 'PERMIT' ? '#36D399' : '#FF5C8A'}`,
        borderRadius: '10px',
        padding: '14px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
          {decision === 'PERMIT' ? (
            <ShieldCheck size={26} color="#36D399" style={{ marginTop: '2px', flexShrink: 0 }} />
          ) : (
            <ShieldAlert size={26} color="#FF5C8A" style={{ marginTop: '2px', flexShrink: 0 }} />
          )}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{
                fontSize: '14px',
                fontWeight: 800,
                color: decision === 'PERMIT' ? '#36D399' : '#FF5C8A',
                fontFamily: 'var(--font-mono)'
              }}>
                POLICY DECISION: {decision}
              </span>
              <span style={{ fontSize: '11px', color: '#64748B' }}>
                Evaluated by PDP in 1.4ms
              </span>
            </div>

            {decision === 'PERMIT' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {successRules.map((rule, idx) => (
                  <span key={idx} style={{ fontSize: '12px', color: '#E2E8F0' }}>
                    ✓ {rule}
                  </span>
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {failureReasons.map((reason, idx) => (
                  <span key={idx} style={{ fontSize: '12px', color: '#FF84A8' }}>
                    ✗ {reason}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{ textAlign: 'right', minWidth: '140px', fontFamily: 'var(--font-mono)' }}>
          <span style={{ fontSize: '10px', color: '#64748B', display: 'block' }}>POLICY ENGINE:</span>
          <span style={{ fontSize: '11px', color: '#36D399', fontWeight: 600 }}>OPA / XACML 3.0</span>
        </div>
      </div>
    </div>
  );
};
