import React from 'react';
import { ShieldAlert, KeyRound, Terminal, Lock, Sparkles, ArrowRight } from 'lucide-react';
import { CyberBadge } from '../layout/CyberBadge';

interface SlideProps {
  onNext: () => void;
  onOpenNotes: () => void;
}

export const Slide01Title: React.FC<SlideProps> = ({ onNext, onOpenNotes }) => {
  return (
    <div className="slide-content-scroll slide-enter-animation" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '40px 20px' }}>
      {/* Top Cyber Badge Row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
        <CyberBadge text="CYBERSECURITY MASTERCLASS" variant="cyan" icon={<ShieldAlert size={14} />} />
        <CyberBadge text="ZERO TRUST ARCHITECTURES" variant="blue" icon={<Terminal size={14} />} />
        <CyberBadge text="ACADEMIC & ENTERPRISE EDITION" variant="amber" icon={<Sparkles size={14} />} />
      </div>

      {/* Main Title */}
      <h1 style={{
        fontSize: '44px',
        fontWeight: 800,
        lineHeight: 1.15,
        maxWidth: '960px',
        marginBottom: '16px',
        letterSpacing: '-0.03em'
      }}>
        ACCESS CONTROL: <br />
        <span className="cyber-gradient-text">Understanding DAC, MAC, RBAC, and ABAC</span>
      </h1>

      {/* Subtitle */}
      <p style={{
        fontSize: '18px',
        color: '#A8B3C7',
        maxWidth: '780px',
        lineHeight: 1.6,
        marginBottom: '36px'
      }}>
        The architectural foundations of identity governance, least privilege enforcement, and context-aware security in modern computing environments.
      </p>

      {/* 4 Pillars Preview Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        width: '100%',
        maxWidth: '1000px',
        marginBottom: '36px',
        textAlign: 'left'
      }}>
        <div className="cyber-card" style={{ padding: '16px', borderColor: 'rgba(255, 191, 105, 0.4)' }}>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#FFBF69', fontWeight: 700, display: 'block' }}>
            MODEL 01 // DAC
          </span>
          <h4 style={{ fontSize: '15px', color: '#FFF', margin: '4px 0 6px 0' }}>Discretionary</h4>
          <p style={{ fontSize: '12px', color: '#A8B3C7' }}>Owner-driven permissions, Unix chmod octals & filesystem ACLs.</p>
        </div>

        <div className="cyber-card" style={{ padding: '16px', borderColor: 'rgba(53, 213, 232, 0.4)' }}>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#35D5E8', fontWeight: 700, display: 'block' }}>
            MODEL 02 // MAC
          </span>
          <h4 style={{ fontSize: '15px', color: '#FFF', margin: '4px 0 6px 0' }}>Mandatory</h4>
          <p style={{ fontSize: '12px', color: '#A8B3C7' }}>Kernel-enforced clearances, Bell-LaPadula multilevel confidentiality.</p>
        </div>

        <div className="cyber-card" style={{ padding: '16px', borderColor: 'rgba(79, 140, 255, 0.4)' }}>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#4F8CFF', fontWeight: 700, display: 'block' }}>
            MODEL 03 // RBAC
          </span>
          <h4 style={{ fontSize: '15px', color: '#FFF', margin: '4px 0 6px 0' }}>Role-Based</h4>
          <p style={{ fontSize: '12px', color: '#A8B3C7' }}>Enterprise job functions, role hierarchies & Separation of Duties.</p>
        </div>

        <div className="cyber-card" style={{ padding: '16px', borderColor: 'rgba(54, 211, 153, 0.4)' }}>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#36D399', fontWeight: 700, display: 'block' }}>
            MODEL 04 // ABAC
          </span>
          <h4 style={{ fontSize: '15px', color: '#FFF', margin: '4px 0 6px 0' }}>Attribute-Based</h4>
          <p style={{ fontSize: '12px', color: '#A8B3C7' }}>Dynamic runtime policies evaluating context, location, time & risk.</p>
        </div>
      </div>

      {/* Start Button & Presenter Hint */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={onNext}
          className="cyber-button cyber-button-primary"
          style={{ padding: '12px 28px', fontSize: '14px', borderRadius: '10px' }}
        >
          <span>Begin Masterclass</span>
          <ArrowRight size={18} />
        </button>

        <button
          onClick={onOpenNotes}
          className="cyber-button cyber-button-cyan"
          style={{ padding: '12px 20px', fontSize: '13px', borderRadius: '10px' }}
        >
          <span>View Presenter Notes (N)</span>
        </button>
      </div>

      <div style={{ marginTop: '24px', fontSize: '12px', color: '#64748B', fontFamily: 'var(--font-mono)' }}>
        Keyboard controls: <kbd>Space</kbd> or <kbd>→</kbd> Next • <kbd>←</kbd> Prev • <kbd>F</kbd> Fullscreen • <kbd>O</kbd> Overview • <kbd>N</kbd> Notes
      </div>
    </div>
  );
};
