import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Grid, 
  FileText, 
  Maximize2, 
  Minimize2, 
  HelpCircle,
  ShieldAlert
} from 'lucide-react';
import { SlideMeta } from '../../types/presentation';
import { CyberBadge } from './CyberBadge';

interface NavigationBarProps {
  currentSlideIndex: number;
  totalSlides: number;
  currentSlideMeta: SlideMeta;
  isFullscreen: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToggleFullscreen: () => void;
  onOpenOverview: () => void;
  onOpenNotes: () => void;
  onOpenHelp: () => void;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  currentSlideIndex,
  totalSlides,
  currentSlideMeta,
  isFullscreen,
  onPrev,
  onNext,
  onToggleFullscreen,
  onOpenOverview,
  onOpenNotes,
  onOpenHelp
}) => {
  const categoryVariantMap: Record<SlideMeta['category'], 'blue' | 'cyan' | 'green' | 'amber' | 'coral'> = {
    'INTRODUCTION': 'cyan',
    'FOUNDATIONS': 'blue',
    'CORE MODELS': 'cyan',
    'ANALYSIS': 'amber',
    'CASE STUDY': 'coral',
    'EVALUATION': 'green'
  };

  return (
    <footer style={{
      height: '60px',
      background: '#0B1224',
      borderTop: '1px solid #1E3156',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      gap: '16px',
      zIndex: 10
    }}>
      {/* Left: Branding & Current Topic */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            background: 'linear-gradient(135deg, #4F8CFF 0%, #35D5E8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#080D1B',
            fontWeight: 800
          }}>
            <ShieldAlert size={16} />
          </div>
          <span style={{ fontWeight: 800, fontSize: '13px', letterSpacing: '0.04em', color: '#F3F6FC', whiteSpace: 'nowrap' }}>
            ACCESS CONTROL <span style={{ color: '#35D5E8', fontWeight: 400 }}>MASTERCLASS</span>
          </span>
        </div>

        <div style={{ height: '18px', width: '1px', background: '#1E3156' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
          <CyberBadge 
            text={currentSlideMeta.category} 
            variant={categoryVariantMap[currentSlideMeta.category]} 
          />
          <span style={{ 
            fontSize: '12px', 
            color: 'var(--text-secondary)', 
            whiteSpace: 'nowrap', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis',
            maxWidth: '280px'
          }}>
            {currentSlideMeta.title}
          </span>
        </div>
      </div>

      {/* Center: Slide Navigation & Counter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={onPrev}
          disabled={currentSlideIndex === 0}
          className="cyber-button"
          title="Previous Slide (Left Arrow / Backspace)"
          aria-label="Previous Slide"
          style={{ padding: '6px 12px' }}
        >
          <ChevronLeft size={16} />
          <span style={{ fontSize: '12px' }}>Prev</span>
        </button>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(17, 26, 46, 0.8)',
          border: '1px solid #1E3156',
          borderRadius: '8px',
          padding: '4px 14px',
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          fontWeight: 600
        }}>
          <span style={{ color: '#35D5E8' }}>{String(currentSlideIndex + 1).padStart(2, '0')}</span>
          <span style={{ color: '#64748B' }}>/</span>
          <span style={{ color: '#A8B3C7' }}>{String(totalSlides).padStart(2, '0')}</span>
        </div>

        <button
          onClick={onNext}
          disabled={currentSlideIndex === totalSlides - 1}
          className="cyber-button cyber-button-primary"
          title="Next Slide (Right Arrow / Spacebar)"
          aria-label="Next Slide"
          style={{ padding: '6px 14px' }}
        >
          <span style={{ fontSize: '12px' }}>Next</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Right: Controls (Overview, Notes, Fullscreen, Shortcuts) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={onOpenOverview}
          className="cyber-button"
          title="Slide Overview (O)"
          aria-label="Slide Overview"
        >
          <Grid size={15} />
          <span style={{ fontSize: '12px' }}>Overview</span>
        </button>

        <button
          onClick={onOpenNotes}
          className="cyber-button cyber-button-cyan"
          title="Presenter Notes (N)"
          aria-label="Presenter Notes"
        >
          <FileText size={15} />
          <span style={{ fontSize: '12px' }}>Notes</span>
        </button>

        <button
          onClick={onToggleFullscreen}
          className="cyber-button"
          title={isFullscreen ? 'Exit Fullscreen (Esc or F)' : 'Fullscreen (F)'}
          aria-label="Fullscreen Toggle"
        >
          {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
        </button>

        <button
          onClick={onOpenHelp}
          className="cyber-button"
          title="Keyboard Shortcuts (?)"
          aria-label="Keyboard Shortcuts"
          style={{ padding: '8px 10px' }}
        >
          <HelpCircle size={15} />
        </button>
      </div>
    </footer>
  );
};
