import React, { useState } from 'react';
import { COMPARISON_MODELS, RADAR_DATA, ModelComparisonItem } from '../../data/comparisonData';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Check, X, Shield, Zap, Sliders, Users, HelpCircle } from 'lucide-react';

export const ComparisonMatrix: React.FC = () => {
  const [selectedModelId, setSelectedModelId] = useState<string>('rbac');
  const [activeTab, setActiveTab] = useState<'matrix' | 'radar' | 'decision_guide'>('matrix');

  const selectedModel = COMPARISON_MODELS.find(m => m.id === selectedModelId) || COMPARISON_MODELS[2];

  return (
    <div className="cyber-card" style={{ padding: '20px', background: 'rgba(14, 22, 41, 0.85)' }}>
      {/* Top Controls Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '16px' }}>
        {/* Model Highlights Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: '#A8B3C7', fontWeight: 600 }}>FOCUS MODEL:</span>
          {COMPARISON_MODELS.map(model => (
            <button
              key={model.id}
              onClick={() => setSelectedModelId(model.id)}
              style={{
                background: selectedModelId === model.id ? `rgba(79, 140, 255, 0.2)` : 'rgba(17, 26, 46, 0.6)',
                border: selectedModelId === model.id ? `1px solid ${model.color}` : '1px solid #1E3156',
                color: selectedModelId === model.id ? model.color : '#A8B3C7',
                padding: '4px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {model.name}
            </button>
          ))}
        </div>

        {/* View Mode Tabs */}
        <div style={{ display: 'flex', background: '#080D1B', border: '1px solid #1E3156', borderRadius: '8px', padding: '3px' }}>
          <button
            onClick={() => setActiveTab('matrix')}
            style={{
              background: activeTab === 'matrix' ? 'rgba(53, 213, 232, 0.2)' : 'transparent',
              border: activeTab === 'matrix' ? '1px solid #35D5E8' : '1px solid transparent',
              color: activeTab === 'matrix' ? '#35D5E8' : '#A8B3C7',
              padding: '4px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Matrix Table
          </button>
          <button
            onClick={() => setActiveTab('radar')}
            style={{
              background: activeTab === 'radar' ? 'rgba(79, 140, 255, 0.2)' : 'transparent',
              border: activeTab === 'radar' ? '1px solid #4F8CFF' : '1px solid transparent',
              color: activeTab === 'radar' ? '#4F8CFF' : '#A8B3C7',
              padding: '4px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Radar Analysis
          </button>
          <button
            onClick={() => setActiveTab('decision_guide')}
            style={{
              background: activeTab === 'decision_guide' ? 'rgba(54, 211, 153, 0.2)' : 'transparent',
              border: activeTab === 'decision_guide' ? '1px solid #36D399' : '1px solid transparent',
              color: activeTab === 'decision_guide' ? '#36D399' : '#A8B3C7',
              padding: '4px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Decision Guide
          </button>
        </div>
      </div>

      {/* View 1: Matrix Table */}
      {activeTab === 'matrix' && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#090F1F', borderBottom: '2px solid #1E3156' }}>
                <th style={{ padding: '10px 14px', color: '#A8B3C7', fontWeight: 600 }}>Attribute / Dimension</th>
                {COMPARISON_MODELS.map(m => {
                  const isHighlighted = selectedModelId === m.id;
                  return (
                    <th
                      key={m.id}
                      onClick={() => setSelectedModelId(m.id)}
                      style={{
                        padding: '10px 14px',
                        color: m.color,
                        fontWeight: 700,
                        fontFamily: 'var(--font-mono)',
                        cursor: 'pointer',
                        background: isHighlighted ? 'rgba(79, 140, 255, 0.12)' : 'transparent',
                        borderLeft: isHighlighted ? `2px solid ${m.color}` : 'none',
                        borderRight: isHighlighted ? `2px solid ${m.color}` : 'none'
                      }}
                    >
                      {m.name} ({m.fullName})
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {/* Row 1: Authority */}
              <tr style={{ borderBottom: '1px solid rgba(30, 49, 86, 0.6)' }}>
                <td style={{ padding: '10px 14px', color: '#94A3B8', fontWeight: 600 }}>Decision Authority</td>
                {COMPARISON_MODELS.map(m => (
                  <td key={m.id} style={{
                    padding: '10px 14px',
                    color: '#E2E8F0',
                    background: selectedModelId === m.id ? 'rgba(79, 140, 255, 0.08)' : 'transparent'
                  }}>
                    {m.decisionAuthority}
                  </td>
                ))}
              </tr>

              {/* Row 2: Granularity */}
              <tr style={{ borderBottom: '1px solid rgba(30, 49, 86, 0.6)' }}>
                <td style={{ padding: '10px 14px', color: '#94A3B8', fontWeight: 600 }}>Granularity</td>
                {COMPARISON_MODELS.map(m => (
                  <td key={m.id} style={{
                    padding: '10px 14px',
                    color: '#E2E8F0',
                    background: selectedModelId === m.id ? 'rgba(79, 140, 255, 0.08)' : 'transparent'
                  }}>
                    {m.granularity}
                  </td>
                ))}
              </tr>

              {/* Row 3: Security Assurance */}
              <tr style={{ borderBottom: '1px solid rgba(30, 49, 86, 0.6)' }}>
                <td style={{ padding: '10px 14px', color: '#94A3B8', fontWeight: 600 }}>Security Assurance</td>
                {COMPARISON_MODELS.map(m => (
                  <td key={m.id} style={{
                    padding: '10px 14px',
                    background: selectedModelId === m.id ? 'rgba(79, 140, 255, 0.08)' : 'transparent'
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      color: m.securityScore >= 8 ? '#36D399' : m.securityScore >= 6 ? '#FFBF69' : '#FF5C8A'
                    }}>
                      {m.securityScore}/10 ({m.securityScore >= 8 ? 'High' : m.securityScore >= 6 ? 'Medium' : 'Low'})
                    </span>
                  </td>
                ))}
              </tr>

              {/* Row 4: Flexibility */}
              <tr style={{ borderBottom: '1px solid rgba(30, 49, 86, 0.6)' }}>
                <td style={{ padding: '10px 14px', color: '#94A3B8', fontWeight: 600 }}>Flexibility & Autonomy</td>
                {COMPARISON_MODELS.map(m => (
                  <td key={m.id} style={{
                    padding: '10px 14px',
                    background: selectedModelId === m.id ? 'rgba(79, 140, 255, 0.08)' : 'transparent'
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      color: m.flexibilityScore >= 8 ? '#36D399' : m.flexibilityScore >= 6 ? '#FFBF69' : '#FF5C8A'
                    }}>
                      {m.flexibilityScore}/10
                    </span>
                  </td>
                ))}
              </tr>

              {/* Row 5: Primary Risk */}
              <tr style={{ borderBottom: '1px solid rgba(30, 49, 86, 0.6)' }}>
                <td style={{ padding: '10px 14px', color: '#94A3B8', fontWeight: 600 }}>Primary Vulnerability / Risk</td>
                {COMPARISON_MODELS.map(m => (
                  <td key={m.id} style={{
                    padding: '10px 14px',
                    fontSize: '11.5px',
                    color: '#FF84A8',
                    background: selectedModelId === m.id ? 'rgba(79, 140, 255, 0.08)' : 'transparent'
                  }}>
                    {m.majorRisk}
                  </td>
                ))}
              </tr>

              {/* Row 6: Best Used For */}
              <tr>
                <td style={{ padding: '10px 14px', color: '#94A3B8', fontWeight: 600 }}>Ideal Use Case</td>
                {COMPARISON_MODELS.map(m => (
                  <td key={m.id} style={{
                    padding: '10px 14px',
                    fontSize: '11.5px',
                    color: '#A8B3C7',
                    background: selectedModelId === m.id ? 'rgba(79, 140, 255, 0.08)' : 'transparent'
                  }}>
                    {m.bestUsedFor}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* View 2: Radar Comparison */}
      {activeTab === 'radar' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', alignItems: 'center' }}>
          <div style={{ height: '280px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={RADAR_DATA}>
                <PolarGrid stroke="#1E3156" />
                <PolarAngleAxis dataKey="metric" stroke="#A8B3C7" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 10]} stroke="#1E3156" />
                <Radar name="DAC" dataKey="DAC" stroke="#FFBF69" fill="#FFBF69" fillOpacity={0.15} />
                <Radar name="MAC" dataKey="MAC" stroke="#35D5E8" fill="#35D5E8" fillOpacity={0.15} />
                <Radar name="RBAC" dataKey="RBAC" stroke="#4F8CFF" fill="#4F8CFF" fillOpacity={0.25} />
                <Radar name="ABAC" dataKey="ABAC" stroke="#36D399" fill="#36D399" fillOpacity={0.2} />
                <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'var(--font-mono)' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Focused Model Deep Profile */}
          <div style={{ background: '#090F1F', border: `1px solid ${selectedModel.color}`, borderRadius: '12px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h4 style={{ fontSize: '15px', color: selectedModel.color, fontWeight: 700 }}>
                {selectedModel.name} Profile: {selectedModel.fullName}
              </h4>
              <span style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono)', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '4px', color: selectedModel.color }}>
                {selectedModel.badge}
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#A8B3C7', marginBottom: '12px' }}>
              {selectedModel.tagline}
            </p>

            <div style={{ marginBottom: '10px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#36D399', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                Primary Advantages:
              </span>
              {selectedModel.pros.map((p, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#E2E8F0', marginBottom: '2px' }}>
                  <Check size={12} color="#36D399" />
                  <span>{p}</span>
                </div>
              ))}
            </div>

            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#FF5C8A', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                Primary Drawbacks:
              </span>
              {selectedModel.cons.map((c, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#E2E8F0', marginBottom: '2px' }}>
                  <X size={12} color="#FF5C8A" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* View 3: Decision Guide */}
      {activeTab === 'decision_guide' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {COMPARISON_MODELS.map(m => (
            <div
              key={m.id}
              style={{
                background: '#090F1F',
                border: `1px solid ${m.color}`,
                borderRadius: '10px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', fontWeight: 800, color: m.color, fontFamily: 'var(--font-mono)' }}>
                  Choose {m.name} IF:
                </span>
              </div>
              <p style={{ fontSize: '11.5px', color: '#E2E8F0', lineHeight: 1.45 }}>
                {m.bestUsedFor}
              </p>
              <div style={{ marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid #1E3156', fontSize: '10.5px', color: '#A8B3C7' }}>
                <strong style={{ color: '#F3F6FC' }}>Standard:</strong> {m.keyStandard}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
