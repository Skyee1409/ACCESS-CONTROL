import React from 'react';
import { X, Grid, ArrowRight } from 'lucide-react';
import { SlideMeta } from '../../types/presentation';
import { CyberBadge } from './CyberBadge';

interface OverviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  slides: SlideMeta[];
  currentSlideIndex: number;
  onSelectSlide: (index: number) => void;
}

export const OverviewModal: React.FC<OverviewModalProps> = ({
  isOpen,
  onClose,
  slides,
  currentSlideIndex,
  onSelectSlide
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="cyber-card" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '1100px',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          background: '#0E1629',
          border: '1px solid #4F8CFF',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.95), 0 0 40px rgba(79, 140, 255, 0.25)',
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
              background: 'rgba(79, 140, 255, 0.15)',
              border: '1px solid rgba(79, 140, 255, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#4F8CFF'
            }}>
              <Grid size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', color: '#F3F6FC' }}>
                Slide Overview & Jump Matrix
              </h3>
              <p style={{ fontSize: '12px', color: '#A8B3C7' }}>
                Click any of the 16 slides to navigate instantly. Current: Slide {currentSlideIndex + 1} of {slides.length}
              </p>
            </div>
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

        {/* Grid of 16 Slides */}
        <div style={{
          padding: '24px',
          overflowY: 'auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
          gap: '16px'
        }}>
          {slides.map((slide, idx) => {
            const isCurrent = idx === currentSlideIndex;
            return (
              <div
                key={slide.id}
                onClick={() => {
                  onSelectSlide(idx);
                  onClose();
                }}
                className={`cyber-card ${isCurrent ? 'cyber-card-active' : ''}`}
                style={{
                  padding: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  background: isCurrent ? 'rgba(53, 213, 232, 0.08)' : 'rgba(17, 26, 46, 0.65)',
                  borderColor: isCurrent ? '#35D5E8' : '#1E3156',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: isCurrent ? '#35D5E8' : '#64748B'
                  }}>
                    #{String(idx + 1).padStart(2, '0')}
                  </span>
                  <CyberBadge text={slide.category} variant={isCurrent ? 'cyan' : 'blue'} />
                </div>

                <h4 style={{
                  fontSize: '13.5px',
                  fontWeight: 600,
                  color: isCurrent ? '#FFF' : '#E2E8F0',
                  lineHeight: 1.35
                }}>
                  {slide.title}
                </h4>

                <p style={{
                  fontSize: '11.5px',
                  color: '#A8B3C7',
                  lineHeight: 1.4,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {slide.summary}
                </p>

                <div style={{
                  marginTop: 'auto',
                  paddingTop: '8px',
                  borderTop: '1px solid rgba(30, 49, 86, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '11px',
                  color: isCurrent ? '#35D5E8' : '#64748B'
                }}>
                  <span>{isCurrent ? 'Currently Active' : 'Jump to slide'}</span>
                  <ArrowRight size={12} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
