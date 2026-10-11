import React from 'react';

interface ProgressBarProps {
  currentSlide: number;
  totalSlides: number;
  onSelectSlide: (index: number) => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentSlide, totalSlides, onSelectSlide }) => {
  const percentage = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <div style={{ width: '100%', background: '#0B1224', borderBottom: '1px solid #1E3156', padding: '6px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div 
        style={{ 
          flex: 1, 
          height: '4px', 
          background: 'rgba(30, 49, 86, 0.6)', 
          borderRadius: '4px', 
          position: 'relative',
          cursor: 'pointer' 
        }}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const ratio = Math.max(0, Math.min(1, clickX / rect.width));
          const targetIndex = Math.min(totalSlides - 1, Math.floor(ratio * totalSlides));
          onSelectSlide(targetIndex);
        }}
      >
        <div 
          style={{ 
            width: `${percentage}%`, 
            height: '100%', 
            background: 'linear-gradient(90deg, #4F8CFF 0%, #35D5E8 100%)', 
            borderRadius: '4px',
            boxShadow: '0 0 10px rgba(53, 213, 232, 0.7)',
            transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }} 
        />
        {/* Subtle slide notch markers */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'space-between', pointerEvents: 'none' }}>
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <div 
              key={idx} 
              style={{ 
                width: '1px', 
                height: '100%', 
                background: idx <= currentSlide ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)' 
              }} 
            />
          ))}
        </div>
      </div>
      <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', minWidth: '48px', textAlign: 'right' }}>
        <span style={{ color: '#35D5E8', fontWeight: 'bold' }}>{Math.round(percentage)}%</span>
      </div>
    </div>
  );
};
