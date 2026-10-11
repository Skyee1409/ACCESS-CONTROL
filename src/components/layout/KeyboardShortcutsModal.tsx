import React from 'react';
import { X, Keyboard } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: '→ / Space', label: 'Next Slide', desc: 'Advance forward to the next slide' },
    { key: '← / Backspace', label: 'Previous Slide', desc: 'Navigate backward to the prior slide' },
    { key: 'F', label: 'Fullscreen Mode', desc: 'Toggle true 16:9 fullscreen view' },
    { key: 'N', label: 'Presenter Notes', desc: 'Open speech script and pacing stopwatch' },
    { key: 'O', label: 'Slide Overview', desc: 'Open the 16-slide thumbnail grid matrix' },
    { key: 'Esc', label: 'Dismiss / Exit', desc: 'Close open modals or exit fullscreen mode' },
    { key: '?', label: 'Shortcuts Help', desc: 'Display this keyboard shortcut reference' },
    { key: '1 - 9', label: 'Direct Slide Jump', desc: 'Jump immediately to slides 1 through 9' }
  ];

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="cyber-card" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '560px',
          background: '#0E1629',
          border: '1px solid #35D5E8',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.95), 0 0 30px rgba(53, 213, 232, 0.2)',
          borderRadius: '16px',
          overflow: 'hidden'
        }}
      >
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #1E3156',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(17, 26, 46, 0.9)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Keyboard size={18} color="#35D5E8" />
            <h3 style={{ fontSize: '16px', color: '#F3F6FC' }}>Keyboard Navigation Shortcuts</h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#A8B3C7',
              cursor: 'pointer',
              display: 'flex'
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {shortcuts.map((sc, idx) => (
            <div 
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                background: 'rgba(17, 26, 46, 0.6)',
                borderRadius: '8px',
                border: '1px solid #1E3156'
              }}
            >
              <div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#F3F6FC', display: 'block' }}>
                  {sc.label}
                </span>
                <span style={{ fontSize: '11px', color: '#A8B3C7' }}>
                  {sc.desc}
                </span>
              </div>
              <kbd style={{
                background: '#080D1B',
                border: '1px solid #35D5E8',
                borderRadius: '6px',
                padding: '4px 10px',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                fontWeight: 700,
                color: '#35D5E8',
                boxShadow: '0 0 8px rgba(53, 213, 232, 0.2)'
              }}>
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
