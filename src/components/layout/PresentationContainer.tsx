import React, { useState, useEffect, useRef } from 'react';
import { NavigationBar } from './NavigationBar';
import { ProgressBar } from './ProgressBar';
import { PresenterNotesModal } from './PresenterNotesModal';
import { OverviewModal } from './OverviewModal';
import { KeyboardShortcutsModal } from './KeyboardShortcutsModal';
import { SLIDES_METADATA } from '../../data/presentationData';

interface PresentationContainerProps {
  currentSlideIndex: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectSlide: (index: number) => void;
  children: React.ReactNode;
}

export const PresentationContainer: React.FC<PresentationContainerProps> = ({
  currentSlideIndex,
  totalSlides,
  onPrev,
  onNext,
  onSelectSlide,
  children
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const currentSlideMeta = SLIDES_METADATA[currentSlideIndex];

  // Fullscreen toggle handler
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.warn('Fullscreen request failed:', err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        });
      }
    }
  };

  // Sync fullscreen change event
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  // Global Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing inside an input/select
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      // Close modal on Escape if one is open, otherwise exit fullscreen
      if (e.key === 'Escape') {
        if (isNotesOpen || isOverviewOpen || isHelpOpen) {
          setIsNotesOpen(false);
          setIsOverviewOpen(false);
          setIsHelpOpen(false);
          return;
        }
      }

      // Notes modal toggle
      if (e.key === 'n' || e.key === 'N') {
        setIsNotesOpen(prev => !prev);
        setIsOverviewOpen(false);
        setIsHelpOpen(false);
        return;
      }

      // Overview modal toggle
      if (e.key === 'o' || e.key === 'O') {
        setIsOverviewOpen(prev => !prev);
        setIsNotesOpen(false);
        setIsHelpOpen(false);
        return;
      }

      // Fullscreen toggle
      if (e.key === 'f' || e.key === 'F') {
        handleToggleFullscreen();
        return;
      }

      // Help shortcuts modal toggle
      if (e.key === '?') {
        setIsHelpOpen(prev => !prev);
        setIsNotesOpen(false);
        setIsOverviewOpen(false);
        return;
      }

      // Arrow navigation / Spacebar
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        onNext();
        return;
      }

      if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        e.preventDefault();
        onPrev();
        return;
      }

      // Number keys 1-9 direct jump
      if (e.key >= '1' && e.key <= '9') {
        const target = parseInt(e.key, 10) - 1;
        if (target < totalSlides) {
          onSelectSlide(target);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, totalSlides, isNotesOpen, isOverviewOpen, isHelpOpen, onNext, onPrev, onSelectSlide]);

  return (
    <div ref={containerRef} className="presentation-viewport">
      {/* Top Scrubbable Progress Bar */}
      <ProgressBar 
        currentSlide={currentSlideIndex} 
        totalSlides={totalSlides} 
        onSelectSlide={onSelectSlide} 
      />

      {/* 16:9 Canvas Stage */}
      <main className="slide-canvas-wrapper" role="region" aria-label="Slide Presentation Canvas">
        <div className="slide-frame">
          {children}
        </div>
      </main>

      {/* Bottom Control & Status Navigation Bar */}
      <NavigationBar
        currentSlideIndex={currentSlideIndex}
        totalSlides={totalSlides}
        currentSlideMeta={currentSlideMeta}
        isFullscreen={isFullscreen}
        onPrev={onPrev}
        onNext={onNext}
        onToggleFullscreen={handleToggleFullscreen}
        onOpenOverview={() => setIsOverviewOpen(true)}
        onOpenNotes={() => setIsNotesOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      {/* Modals & Overlays */}
      <PresenterNotesModal
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        slideMeta={currentSlideMeta}
        slideNumber={currentSlideIndex + 1}
        totalSlides={totalSlides}
      />

      <OverviewModal
        isOpen={isOverviewOpen}
        onClose={() => setIsOverviewOpen(false)}
        slides={SLIDES_METADATA}
        currentSlideIndex={currentSlideIndex}
        onSelectSlide={onSelectSlide}
      />

      <KeyboardShortcutsModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </div>
  );
};
