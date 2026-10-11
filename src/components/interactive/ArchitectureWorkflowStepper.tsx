import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, ShieldCheck, Database, Server, Cpu, FileCheck } from 'lucide-react';

export const ArchitectureWorkflowStepper: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    {
      id: 1,
      title: 'Step 1: Access Request Initiated',
      component: 'Subject (Client / App)',
      acronym: 'SUBJECT',
      color: '#4F8CFF',
      description: 'An authenticated user (e.g. Dr. Alice) attempts an action: "POST /api/v1/prescriptions" requesting to prescribe 50mg Tramadol for Patient #849.',
      technicalDetails: 'Payload includes JWT access token containing subject identity, client device fingerprint, and requested endpoint.'
    },
    {
      id: 2,
      title: 'Step 2: Request Intercepted',
      component: 'Policy Enforcement Point',
      acronym: 'PEP',
      color: '#35D5E8',
      description: 'The API Gateway or reverse proxy intercepts the inbound HTTP packet before it ever touches application logic or the patient database.',
      technicalDetails: 'Acts as a strict bouncer. The target microservice does not execute without explicit signed PERMIT approval from the PDP.'
    },
    {
      id: 3,
      title: 'Step 3: Context Enrichment',
      component: 'Policy Information Point',
      acronym: 'PIP',
      color: '#FFBF69',
      description: 'The PEP queries the PIP to enrich the request with dynamic contextual attributes: Doctor shift status, patient emergency flag, device encryption status.',
      technicalDetails: 'Queries Active Directory, HR databases, SIEM geolocations, and hospital bed assignment APIs in real time.'
    },
    {
      id: 4,
      title: 'Step 4: Boolean Policy Evaluation',
      component: 'Policy Decision Point',
      acronym: 'PDP',
      color: '#36D399',
      description: 'The PDP (the "brain") matches enriched attributes against authoritative security policies authored in the Policy Administration Point (PAP).',
      technicalDetails: 'Evaluates Open Policy Agent (OPA Rego) or XACML 3.0 Boolean rule expressions. Renders verdict: PERMIT, DENY, or NOT_APPLICABLE.'
    },
    {
      id: 5,
      title: 'Step 5: Authorization Verdict Dispatched',
      component: 'PDP Decision Response',
      acronym: 'PDP → PEP',
      color: '#36D399',
      description: 'The PDP delivers its cryptographic verdict back to the PEP along with mandatory obligations (e.g., "Must record high-severity audit log").',
      technicalDetails: 'Response: { "decision": "Permit", "obligations": ["audit_trail_sink", "session_watermark"] }'
    },
    {
      id: 6,
      title: 'Step 6: Enforcement & Immutable Audit',
      component: 'PEP Enforcement & SIEM Log',
      acronym: 'PEP / SIEM',
      color: '#4F8CFF',
      description: 'PEP forwards the sanitized request to the backend microservice, executes the transaction, and delivers an immutable audit record to Splunk/Elastic.',
      technicalDetails: 'HTTP 200 OK returned to Dr. Alice. Prescription written; audit log immutably sealed with SHA-256 hash.'
    }
  ];

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2500);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, steps.length]);

  const activeStepData = steps[currentStep];

  return (
    <div className="cyber-card" style={{ padding: '20px', background: 'rgba(14, 22, 41, 0.85)' }}>
      {/* Step Indicators Top Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Server size={18} color="#35D5E8" />
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#F3F6FC' }}>
            NIST / XACML RUNTIME PIPELINE (PEP ⇄ PDP ⇄ PIP ⇄ PAP)
          </span>
        </div>

        {/* Stepper Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="cyber-button"
            style={{ padding: '4px 10px', fontSize: '12px' }}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            <span>{isPlaying ? 'Pause' : 'Auto Play'}</span>
          </button>
          <button
            onClick={() => { setCurrentStep(0); setIsPlaying(false); }}
            className="cyber-button"
            style={{ padding: '4px 10px', fontSize: '12px' }}
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Visual Pipeline Nodes */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: '8px',
        marginBottom: '16px'
      }}>
        {steps.map((st, idx) => {
          const isCurrent = idx === currentStep;
          const isPast = idx < currentStep;
          return (
            <div
              key={st.id}
              onClick={() => { setCurrentStep(idx); setIsPlaying(false); }}
              style={{
                background: isCurrent ? 'rgba(53, 213, 232, 0.2)' : isPast ? 'rgba(79, 140, 255, 0.1)' : 'rgba(17, 26, 46, 0.6)',
                border: isCurrent ? '1px solid #35D5E8' : isPast ? '1px solid #4F8CFF' : '1px solid #1E3156',
                borderRadius: '8px',
                padding: '8px',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                color: isCurrent ? '#35D5E8' : isPast ? '#4F8CFF' : '#64748B',
                display: 'block'
              }}>
                STEP 0{idx + 1}
              </span>
              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                color: isCurrent ? '#FFF' : '#A8B3C7',
                display: 'block',
                marginTop: '2px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {st.acronym}
              </span>
            </div>
          );
        })}
      </div>

      {/* Active Step Detailed Showcase */}
      <div style={{
        background: '#090F1F',
        border: `1px solid ${activeStepData.color}`,
        borderRadius: '12px',
        padding: '16px 20px',
        marginBottom: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              background: 'rgba(255,255,255,0.08)',
              color: activeStepData.color,
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '4px'
            }}>
              {activeStepData.acronym}
            </span>
            <h4 style={{ fontSize: '15px', color: '#F3F6FC', fontWeight: 700 }}>
              {activeStepData.title}: {activeStepData.component}
            </h4>
          </div>
          <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#A8B3C7' }}>
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>

        <p style={{ fontSize: '13px', color: '#E2E8F0', lineHeight: 1.5, marginBottom: '10px' }}>
          {activeStepData.description}
        </p>

        <div style={{
          background: 'rgba(8, 13, 27, 0.9)',
          border: '1px solid #1E3156',
          borderRadius: '8px',
          padding: '8px 12px',
          fontFamily: 'var(--font-mono)',
          fontSize: '11.5px',
          color: '#35D5E8'
        }}>
          <span style={{ color: '#64748B' }}>TECHNICAL SPECIFICATION // </span>
          {activeStepData.technicalDetails}
        </div>
      </div>

      {/* Navigation Footer for Stepper */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={() => { setCurrentStep(prev => Math.max(0, prev - 1)); setIsPlaying(false); }}
          disabled={currentStep === 0}
          className="cyber-button"
          style={{ padding: '6px 12px', fontSize: '12px' }}
        >
          <ChevronLeft size={14} />
          <span>Previous Step</span>
        </button>

        <span style={{ fontSize: '11px', color: '#64748B', fontFamily: 'var(--font-mono)' }}>
          Reference: IETF RFC 2904 & OASIS XACML 3.0 Standard
        </span>

        <button
          onClick={() => { setCurrentStep(prev => Math.min(steps.length - 1, prev + 1)); setIsPlaying(false); }}
          disabled={currentStep === steps.length - 1}
          className="cyber-button cyber-button-primary"
          style={{ padding: '6px 14px', fontSize: '12px' }}
        >
          <span>Next Step</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};
