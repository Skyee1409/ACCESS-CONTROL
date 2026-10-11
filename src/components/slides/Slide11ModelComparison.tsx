import React from 'react';
import { ComparisonMatrix } from '../interactive/ComparisonMatrix';
import { CyberBadge } from '../layout/CyberBadge';
import { GitCompare, Layers, ShieldCheck } from 'lucide-react';

export const Slide11ModelComparison: React.FC = () => {
  return (
    <div className="slide-content-scroll slide-enter-animation">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <CyberBadge text="COMPARATIVE ANALYSIS" variant="blue" />
            <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#A8B3C7' }}>
              TRADE-OFF ANALYSIS & RADAR METRICS
            </span>
          </div>
          <h2 style={{ fontSize: '28px', color: '#F3F6FC' }}>
            Comparative Analysis: DAC vs. MAC vs. RBAC vs. ABAC
          </h2>
        </div>

        <div style={{
          background: 'rgba(53, 213, 232, 0.1)',
          border: '1px solid #35D5E8',
          borderRadius: '8px',
          padding: '6px 14px',
          fontSize: '12px',
          color: '#35D5E8',
          fontFamily: 'var(--font-mono)'
        }}>
          Multi-Variable Decision Framework
        </div>
      </div>

      {/* Embedded Comparison Matrix */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <ComparisonMatrix />
      </div>
    </div>
  );
};
