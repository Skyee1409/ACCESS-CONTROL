import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { ShieldAlert, FileText, Lock, Users, AlertOctagon, TrendingUp, CheckCircle } from 'lucide-react';
import { CyberBadge } from '../layout/CyberBadge';

export const Slide04WhyItMatters: React.FC = () => {
  const breachData = [
    { vector: 'Compromised Credentials', percentage: 84, color: '#FF5C8A' },
    { vector: 'Excessive Privilege Escalation', percentage: 76, color: '#FFBF69' },
    { vector: 'Misconfigured S3 / Public ACL', percentage: 68, color: '#35D5E8' },
    { vector: 'Insider Threat / Abuse', percentage: 52, color: '#4F8CFF' },
    { vector: 'Zero-Day Code Exploit', percentage: 22, color: '#36D399' }
  ];

  return (
    <div className="slide-content-scroll slide-enter-animation">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <CyberBadge text="THREAT LANDSCAPE" variant="coral" icon={<ShieldAlert size={12} />} />
            <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#A8B3C7' }}>
              INDUSTRY DATA & COMPLIANCE MANDATES
            </span>
          </div>
          <h2 style={{ fontSize: '28px', color: '#F3F6FC' }}>
            Why Access Control Matters: The High Stakes of Authorization
          </h2>
        </div>

        <div style={{
          background: 'rgba(255, 92, 138, 0.1)',
          border: '1px solid #FF5C8A',
          borderRadius: '8px',
          padding: '6px 14px',
          fontSize: '12px',
          color: '#FF84A8',
          fontFamily: 'var(--font-mono)'
        }}>
          Average Global Breach Cost: $4.88 Million (IBM 2024)
        </div>
      </div>

      {/* Grid: 2 Columns (Left: Stats & Recharts, Right: 3 Core Pillars) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', flex: 1, minHeight: 0 }}>
        {/* Left Column: Attack Vector Recharts Chart */}
        <div className="cyber-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#F3F6FC' }}>
              Primary Vectors in Modern Enterprise Breaches
            </span>
            <span style={{ fontSize: '11px', color: '#64748B', fontFamily: 'var(--font-mono)' }}>
              Source: Verizon DBIR & Ponemon
            </span>
          </div>

          <div style={{ height: '220px', width: '100%', marginBottom: '12px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={breachData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <XAxis type="number" domain={[0, 100]} stroke="#64748B" tick={{ fontSize: 10, fill: '#A8B3C7' }} />
                <YAxis dataKey="vector" type="category" stroke="#64748B" width={170} tick={{ fontSize: 11, fill: '#E2E8F0' }} />
                <Tooltip 
                  contentStyle={{ background: '#090F1F', border: '1px solid #1E3156', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(val: any) => [`${val}% of Incidents`, 'Frequency']}
                />
                <Bar dataKey="percentage" radius={[0, 4, 4, 0]}>
                  {breachData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{
            background: 'rgba(8, 13, 27, 0.8)',
            border: '1px solid #1E3156',
            borderRadius: '8px',
            padding: '10px 14px',
            fontSize: '11.5px',
            color: '#CBD5E1',
            lineHeight: 1.45,
            marginTop: 'auto'
          }}>
            <strong style={{ color: '#FFBF69' }}>Key Takeaway: </strong>
            Over 84% of data breaches occur not through brute-force firewall cracking, but through credential theft and <strong>unfettered internal access rights</strong>. Once inside, lack of granular access control allows adversaries to move laterally with zero friction.
          </div>
        </div>

        {/* Right Column: 3 Critical Reasons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* 1. Lateral Movement Prevention */}
          <div className="cyber-card" style={{ padding: '16px', borderColor: 'rgba(79, 140, 255, 0.4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Lock size={16} color="#4F8CFF" />
              <h4 style={{ fontSize: '14px', color: '#4F8CFF' }}>1. Stopping Lateral Movement</h4>
            </div>
            <p style={{ fontSize: '12px', color: '#A8B3C7', lineHeight: 1.4 }}>
              When an attacker compromises a phishing target (e.g. marketing intern), strict access boundaries prevent them from pivoting into financial databases or production code repositories.
            </p>
          </div>

          {/* 2. Regulatory Compliance Mandates */}
          <div className="cyber-card" style={{ padding: '16px', borderColor: 'rgba(53, 213, 232, 0.4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <FileText size={16} color="#35D5E8" />
              <h4 style={{ fontSize: '14px', color: '#35D5E8' }}>2. Regulatory Compliance Mandates</h4>
            </div>
            <p style={{ fontSize: '12px', color: '#A8B3C7', lineHeight: 1.4, marginBottom: '6px' }}>
              Global standards legally mandate strict access controls with multi-million dollar penalties for violations:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', fontSize: '10.5px', fontFamily: 'var(--font-mono)' }}>
              <span style={{ background: '#080D1B', border: '1px solid #1E3156', padding: '2px 6px', borderRadius: '4px', color: '#35D5E8' }}>HIPAA § 164.312</span>
              <span style={{ background: '#080D1B', border: '1px solid #1E3156', padding: '2px 6px', borderRadius: '4px', color: '#FFBF69' }}>PCI-DSS Req 7/8</span>
              <span style={{ background: '#080D1B', border: '1px solid #1E3156', padding: '2px 6px', borderRadius: '4px', color: '#36D399' }}>GDPR Art 32</span>
              <span style={{ background: '#080D1B', border: '1px solid #1E3156', padding: '2px 6px', borderRadius: '4px', color: '#4F8CFF' }}>ISO 27001 A.9</span>
            </div>
          </div>

          {/* 3. CIA Triad Protection */}
          <div className="cyber-card" style={{ padding: '16px', borderColor: 'rgba(54, 211, 153, 0.4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Users size={16} color="#36D399" />
              <h4 style={{ fontSize: '14px', color: '#36D399' }}>3. Protecting the CIA Triad</h4>
            </div>
            <p style={{ fontSize: '12px', color: '#A8B3C7', lineHeight: 1.4 }}>
              Confidentiality (preventing unauthorized read access), Integrity (preventing malicious write/tamper), and Availability (preventing rogue delete/disruption).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
