import React, { useState, useEffect } from 'react';
import { X, Clock, Play, Pause, RotateCcw, CheckCircle2, Mic } from 'lucide-react';
import { SlideMeta } from '../../types/presentation';
import { CyberBadge } from './CyberBadge';

interface PresenterNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  slideMeta: SlideMeta;
  slideNumber: number;
  totalSlides: number;
}

export const PresenterNotesModal: React.FC<PresenterNotesModalProps> = ({
  isOpen,
  onClose,
  slideMeta,
  slideNumber,
  totalSlides
}) => {
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Reset timer whenever slide changes
  useEffect(() => {
    setTimerSeconds(0);
    setTimerActive(false);
  }, [slideMeta.id]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (timerActive) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive]);

  if (!isOpen) return null;

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="cyber-card" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '820px',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          background: '#0E1629',
          border: '1px solid #35D5E8',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(53, 213, 232, 0.2)',
          borderRadius: '16px',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid #1E3156',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(17, 26, 46, 0.9)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(53, 213, 232, 0.15)',
              border: '1px solid rgba(53, 213, 232, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#35D5E8'
            }}>
              <Mic size={18} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#35D5E8', fontWeight: 600 }}>
                  SLIDE {String(slideNumber).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
                </span>
                <CyberBadge text="PRESENTER NOTES" variant="cyan" />
              </div>
              <h3 style={{ fontSize: '16px', color: '#F3F6FC', marginTop: '2px' }}>
                {slideMeta.title}
              </h3>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Pacing Practice Timer */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#080D1B',
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid #1E3156',
              fontFamily: 'var(--font-mono)'
            }}>
              <Clock size={14} style={{ color: timerSeconds > 60 ? '#FF5C8A' : '#36D399' }} />
              <span style={{ fontSize: '13px', fontWeight: 700, color: timerSeconds > 60 ? '#FF5C8A' : '#F3F6FC' }}>
                {formatTimer(timerSeconds)}
              </span>
              <button
                onClick={() => setTimerActive(!timerActive)}
                style={{ background: 'transparent', border: 'none', color: '#35D5E8', cursor: 'pointer', display: 'flex' }}
                title={timerActive ? 'Pause Timer' : 'Start Timer'}
              >
                {timerActive ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <button
                onClick={() => { setTimerSeconds(0); setTimerActive(false); }}
                style={{ background: 'transparent', border: 'none', color: '#A8B3C7', cursor: 'pointer', display: 'flex' }}
                title="Reset Timer"
              >
                <RotateCcw size={14} />
              </button>
            </div>

            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid #1E3156',
                borderRadius: '8px',
                color: '#A8B3C7',
                padding: '6px',
                cursor: 'pointer',
                display: 'flex'
              }}
              title="Close (Esc)"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Target pacing note */}
          <div style={{
            background: 'rgba(53, 213, 232, 0.06)',
            border: '1px solid rgba(53, 213, 232, 0.25)',
            borderRadius: '10px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={16} color="#35D5E8" />
              <span style={{ fontSize: '13px', color: '#F3F6FC', fontWeight: 500 }}>
                Target Spoken Delivery Duration:
              </span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#35D5E8', fontWeight: 700 }}>
              {slideMeta.presenterNotes.talkDuration}
            </span>
          </div>

          {/* Key Talking Points */}
          <div>
            <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#A8B3C7', marginBottom: '10px' }}>
              Key Talking Points & Concept Cues
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {slideMeta.presenterNotes.talkingPoints.map((point, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  background: 'rgba(17, 26, 46, 0.6)',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid rgba(30, 49, 86, 0.6)'
                }}>
                  <CheckCircle2 size={16} color="#36D399" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', color: '#E2E8F0', lineHeight: 1.45 }}>
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Complete Spoken Script */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#A8B3C7' }}>
                Complete Spoken Script (Classroom-Ready Transcript)
              </h4>
              <span style={{ fontSize: '11px', color: '#64748B', fontFamily: 'var(--font-mono)' }}>
                30–60s Spoken Pace
              </span>
            </div>
            <div style={{
              background: '#080D1B',
              border: '1px solid #1E3156',
              borderRadius: '10px',
              padding: '18px 20px',
              color: '#F3F6FC',
              fontSize: '14.5px',
              lineHeight: 1.7,
              fontFamily: 'Georgia, serif',
              fontStyle: 'normal',
              position: 'relative'
            }}>
              "{slideMeta.presenterNotes.script}"
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div style={{
          padding: '12px 24px',
          borderTop: '1px solid #1E3156',
          background: 'rgba(17, 26, 46, 0.7)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '12px', color: '#64748B' }}>
            Tip: Press <kbd style={{ background: '#080D1B', padding: '2px 6px', borderRadius: '4px', border: '1px solid #1E3156', color: '#35D5E8', fontFamily: 'var(--font-mono)' }}>N</kbd> or <kbd style={{ background: '#080D1B', padding: '2px 6px', borderRadius: '4px', border: '1px solid #1E3156', color: '#35D5E8', fontFamily: 'var(--font-mono)' }}>Esc</kbd> anytime during your presentation to toggle these notes.
          </span>
          <button onClick={onClose} className="cyber-button cyber-button-primary" style={{ padding: '6px 16px' }}>
            Got it, Return to Slide
          </button>
        </div>
      </div>
    </div>
  );
};
