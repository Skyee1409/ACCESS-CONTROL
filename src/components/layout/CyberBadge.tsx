import React from 'react';

interface CyberBadgeProps {
  text: string;
  variant?: 'blue' | 'cyan' | 'green' | 'amber' | 'coral';
  icon?: React.ReactNode;
}

export const CyberBadge: React.FC<CyberBadgeProps> = ({ text, variant = 'cyan', icon }) => {
  return (
    <span className={`badge badge-${variant}`}>
      {icon}
      <span>{text}</span>
    </span>
  );
};
