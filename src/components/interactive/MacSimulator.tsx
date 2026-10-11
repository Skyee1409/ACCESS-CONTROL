import React, { useState } from 'react';
import { MAC_SECURITY_LEVELS, MAC_SAMPLE_DOCUMENTS } from '../../data/macData';
import { Shield, ShieldAlert, ShieldCheck, ArrowRight, Lock, Eye, Edit3, Info } from 'lucide-react';

export const MacSimulator: React.FC = () => {
  const [modelMode, setModelMode] = useState<'blp' | 'biba'>('blp'); // Bell-LaPadula vs Biba
  const [userLevelId, setUserLevelId] = useState<string>('secret');
  const [docId, setDocId] = useState<string>('doc-3');
  const [action, setAction] = useState<'READ' | 'WRITE'>('READ');

  const userLevel = MAC_SECURITY_LEVELS.find(l => l.id === userLevelId) || MAC_SECURITY_LEVELS[2];
  const selectedDoc = MAC_SAMPLE_DOCUMENTS.find(d => d.id === docId) || MAC_SAMPLE_DOCUMENTS[2];
  const docLevel = MAC_SECURITY_LEVELS.find(l => l.id === selectedDoc.levelId) || MAC_SECURITY_LEVELS[2];

  // Evaluate rule:
  // Bell-LaPadula (Confidentiality):
  // READ: User Rank >= Doc Rank ("No Read Up")
  // WRITE: User Rank <= Doc Rank ("No Write Down")
  // Biba (Integrity):
  // READ: User Rank <= Doc Rank ("No Read Down")
  // WRITE: User Rank >= Doc Rank ("No Write Up")
  
  let isAllowed = false;
  let ruleName = '';
  let ruleExplanation = '';

  if (modelMode === 'blp') {
    if (action === 'READ') {
      isAllowed = userLevel.rank >= docLevel.rank;
      ruleName = 'Simple Security Property ("No Read Up")';
      ruleExplanation = isAllowed
        ? `Subject Clearance (${userLevel.name}, Rank ${userLevel.rank}) ≥ Object Classification (${docLevel.name}, Rank ${docLevel.rank}). Reading permitted without secret exposure.`
        : `VIOLATION: Subject Clearance (${userLevel.name}, Rank ${userLevel.rank}) is LESS than Object Classification (${docLevel.name}, Rank ${docLevel.rank}). Unauthorized clearance!`;
    } else {
      isAllowed = userLevel.rank <= docLevel.rank;
      ruleName = '*-Property / Star Property ("No Write Down")';
      ruleExplanation = isAllowed
        ? `Subject Clearance (${userLevel.name}, Rank ${userLevel.rank}) ≤ Object Classification (${docLevel.name}, Rank ${docLevel.rank}). Writing permitted; no classified data leaked downward.`
        : `VIOLATION: Subject Clearance (${userLevel.name}, Rank ${userLevel.rank}) is HIGHER than Object Classification (${docLevel.name}, Rank ${docLevel.rank}). High-clearance subject cannot write into low-classification file to prevent data declassification/leakage!`;
    }
  } else {
    // Biba Model
    if (action === 'READ') {
      isAllowed = userLevel.rank <= docLevel.rank;
      ruleName = 'Simple Integrity Property ("No Read Down")';
      ruleExplanation = isAllowed
        ? `Subject Integrity (${userLevel.rank}) ≤ Object Integrity (${docLevel.rank}). Subject reads high-integrity data without risk of contamination.`
        : `VIOLATION: Reading low-integrity data could corrupt the decision-making of a high-integrity subject!`;
    } else {
      isAllowed = userLevel.rank >= docLevel.rank;
      ruleName = '*-Integrity Property ("No Write Up")';
      ruleExplanation = isAllowed
        ? `Subject Integrity (${userLevel.rank}) ≥ Object Integrity (${docLevel.rank}). High-integrity subject can write/modify lower-integrity target.`
        : `VIOLATION: Low-integrity subject cannot write or alter high-integrity objects!`;
    }
  }

  return (
    <div className="cyber-card" style={{ padding: '20px', background: 'rgba(14, 22, 41, 0.85)' }}>
      {/* Top Header & Model Mode Switch */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Lock size={18} color="#35D5E8" />
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#F3F6FC' }}>
            MAC KERNEL CLEARANCE VERIFIER
          </span>
        </div>

        {/* Model Selector */}
        <div style={{ display: 'flex', background: '#080D1B', border: '1px solid #1E3156', borderRadius: '8px', padding: '3px' }}>
          <button
            onClick={() => setModelMode('blp')}
            style={{
              background: modelMode === 'blp' ? 'rgba(53, 213, 232, 0.2)' : 'transparent',
              border: modelMode === 'blp' ? '1px solid #35D5E8' : '1px solid transparent',
              color: modelMode === 'blp' ? '#35D5E8' : '#A8B3C7',
              padding: '4px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Bell-LaPadula (Confidentiality)
          </button>
          <button
            onClick={() => setModelMode('biba')}
            style={{
              background: modelMode === 'biba' ? 'rgba(255, 191, 105, 0.2)' : 'transparent',
              border: modelMode === 'biba' ? '1px solid #FFBF69' : '1px solid transparent',
              color: modelMode === 'biba' ? '#FFBF69' : '#A8B3C7',
              padding: '4px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Biba (Integrity)
          </button>
        </div>
      </div>

      {/* Main 3-Column Configuration */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 1.2fr', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
        {/* Left: Subject Clearance */}
        <div style={{ background: '#090F1F', border: '1px solid #1E3156', borderRadius: '12px', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', color: '#A8B3C7', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              1. Subject Clearance
            </span>
            <span style={{
              background: userLevel.glowColor,
              border: `1px solid ${userLevel.badgeColor}`,
              color: userLevel.badgeColor,
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700
            }}>
              Rank {userLevel.rank} / 4
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {MAC_SECURITY_LEVELS.map(lvl => (
              <button
                key={lvl.id}
                onClick={() => setUserLevelId(lvl.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: userLevelId === lvl.id ? 'rgba(79, 140, 255, 0.2)' : 'rgba(17, 26, 46, 0.6)',
                  border: userLevelId === lvl.id ? `1px solid ${lvl.badgeColor}` : '1px solid #1E3156',
                  color: userLevelId === lvl.id ? '#FFF' : '#A8B3C7',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12.5px',
                  fontWeight: userLevelId === lvl.id ? 700 : 400
                }}
              >
                <span>{lvl.name}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: lvl.badgeColor }}>
                  Tier {lvl.rank}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Center: Action Operation */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '12px', color: '#A8B3C7', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            2. Operation
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
            <button
              onClick={() => setAction('READ')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: action === 'READ' ? 'rgba(53, 213, 232, 0.25)' : 'rgba(17, 26, 46, 0.6)',
                border: action === 'READ' ? '1px solid #35D5E8' : '1px solid #1E3156',
                color: action === 'READ' ? '#35D5E8' : '#A8B3C7',
                padding: '10px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <Eye size={16} />
              <span>READ</span>
            </button>

            <button
              onClick={() => setAction('WRITE')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: action === 'WRITE' ? 'rgba(255, 191, 105, 0.25)' : 'rgba(17, 26, 46, 0.6)',
                border: action === 'WRITE' ? '1px solid #FFBF69' : '1px solid #1E3156',
                color: action === 'WRITE' ? '#FFBF69' : '#A8B3C7',
                padding: '10px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <Edit3 size={16} />
              <span>WRITE</span>
            </button>
          </div>

          <ArrowRight size={20} color="#64748B" />
        </div>

        {/* Right: Object Classification */}
        <div style={{ background: '#090F1F', border: '1px solid #1E3156', borderRadius: '12px', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', color: '#A8B3C7', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              3. Object Label
            </span>
            <span style={{
              background: docLevel.glowColor,
              border: `1px solid ${docLevel.badgeColor}`,
              color: docLevel.badgeColor,
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700
            }}>
              {docLevel.name} (Tier {docLevel.rank})
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {MAC_SAMPLE_DOCUMENTS.map(doc => {
              const dl = MAC_SECURITY_LEVELS.find(l => l.id === doc.levelId) || MAC_SECURITY_LEVELS[0];
              return (
                <button
                  key={doc.id}
                  onClick={() => setDocId(doc.id)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    background: docId === doc.id ? 'rgba(53, 213, 232, 0.15)' : 'rgba(17, 26, 46, 0.6)',
                    border: docId === doc.id ? `1px solid ${dl.badgeColor}` : '1px solid #1E3156',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: docId === doc.id ? '#FFF' : '#E2E8F0' }}>
                      {doc.title}
                    </span>
                    <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: dl.badgeColor, fontWeight: 700 }}>
                      {dl.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Decision Engine Result Panel */}
      <div style={{
        background: isAllowed ? 'rgba(54, 211, 153, 0.12)' : 'rgba(255, 92, 138, 0.12)',
        border: `1px solid ${isAllowed ? '#36D399' : '#FF5C8A'}`,
        borderRadius: '12px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: isAllowed ? 'rgba(54, 211, 153, 0.2)' : 'rgba(255, 92, 138, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            {isAllowed ? <ShieldCheck size={24} color="#36D399" /> : <ShieldAlert size={24} color="#FF5C8A" />}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
                fontWeight: 800,
                color: isAllowed ? '#36D399' : '#FF5C8A'
              }}>
                {isAllowed ? 'ACCESS PERMITTED [200 OK]' : 'SECURITY ACCESS VIOLATION [403 DENIED]'}
              </span>
              <span style={{ fontSize: '11px', color: '#A8B3C7', background: '#080D1B', padding: '2px 8px', borderRadius: '4px' }}>
                Rule: {ruleName}
              </span>
            </div>
            <p style={{ fontSize: '12.5px', color: '#E2E8F0', lineHeight: 1.45 }}>
              {ruleExplanation}
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'right', minWidth: '160px', fontFamily: 'var(--font-mono)' }}>
          <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>ENFORCEMENT KERNEL:</span>
          <span style={{ fontSize: '12px', color: '#35D5E8', fontWeight: 600 }}>SELinux / MLS Label Engine</span>
        </div>
      </div>
    </div>
  );
};
