import React, { useState } from 'react';
import { RBAC_ROLES, RBAC_PERMISSIONS } from '../../data/rbacData';
import { Users, CheckCircle2, XCircle, ArrowRight, Activity, ShieldCheck, ShieldAlert, Sparkles } from 'lucide-react';

export const RbacSimulator: React.FC = () => {
  const [selectedRoleId, setSelectedRoleId] = useState<string>('doctor');
  const [selectedActionId, setSelectedActionId] = useState<string>('prescribe_medication');
  const [auditLog, setAuditLog] = useState<{
    role: string;
    action: string;
    status: 'GRANTED' | 'DENIED';
    message: string;
  } | null>({
    role: 'Attending Physician',
    action: 'Prescribe Controlled Rx',
    status: 'GRANTED',
    message: 'Authorized: Physician role holds prescription authorization privileges.'
  });

  const currentRole = RBAC_ROLES.find(r => r.id === selectedRoleId) || RBAC_ROLES[1];
  const targetPermission = RBAC_PERMISSIONS.find(p => p.id === selectedActionId) || RBAC_PERMISSIONS[2];

  const handleTestPermission = (permId: string) => {
    setSelectedActionId(permId);
    const perm = RBAC_PERMISSIONS.find(p => p.id === permId);
    const hasPerm = currentRole.permissions.includes(permId);

    let reason = '';
    if (hasPerm) {
      reason = `PERMIT: Role "${currentRole.name}" possesses granted entitlement for "${perm?.label}".`;
    } else {
      if (permId === 'prescribe_medication' && currentRole.id === 'nurse') {
        reason = `DENIED (SoD Violation): Separation of Duties strictly prevents Nurses from prescribing controlled medications.`;
      } else if (permId === 'export_audit_logs' && currentRole.id === 'doctor') {
        reason = `DENIED: Physicians cannot export regulatory audit trails to prevent conflict of interest.`;
      } else {
        reason = `DENIED: Entitlement not mapped to "${currentRole.name}" in RBAC role definition table.`;
      }
    }

    setAuditLog({
      role: currentRole.name,
      action: perm?.label || permId,
      status: hasPerm ? 'GRANTED' : 'DENIED',
      message: reason
    });
  };

  return (
    <div className="cyber-card" style={{ padding: '20px', background: 'rgba(14, 22, 41, 0.85)' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Users size={18} color="#4F8CFF" />
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#F3F6FC' }}>
            ENTERPRISE RBAC ENGINE // CLINICAL WORKFLOW MATRIX
          </span>
        </div>
        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#35D5E8' }}>
          MAPPING: Users → Roles → Permissions
        </span>
      </div>

      {/* Main Grid: Role Selection & Permissions Matrix */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '16px', marginBottom: '16px' }}>
        {/* Left: Role Selection Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#A8B3C7' }}>
            Select User Role
          </span>
          {RBAC_ROLES.map(role => {
            const isSelected = selectedRoleId === role.id;
            return (
              <button
                key={role.id}
                onClick={() => {
                  setSelectedRoleId(role.id);
                  const hasPerm = role.permissions.includes(selectedActionId);
                  setAuditLog({
                    role: role.name,
                    action: targetPermission.label,
                    status: hasPerm ? 'GRANTED' : 'DENIED',
                    message: hasPerm 
                      ? `PERMIT: Role "${role.name}" possesses entitlement for "${targetPermission.label}".`
                      : `DENIED: "${targetPermission.label}" not mapped to "${role.name}".`
                  });
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: isSelected ? 'rgba(79, 140, 255, 0.18)' : 'rgba(17, 26, 46, 0.6)',
                  border: isSelected ? `1px solid ${role.color}` : '1px solid #1E3156',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: isSelected ? '#FFF' : '#E2E8F0' }}>
                      {role.name}
                    </span>
                    <span style={{
                      fontSize: '10px',
                      fontFamily: 'var(--font-mono)',
                      color: role.color,
                      background: 'rgba(0,0,0,0.3)',
                      padding: '1px 6px',
                      borderRadius: '4px'
                    }}>
                      {role.permissions.length} perms
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#A8B3C7' }}>{role.title}</span>
                </div>
                <ArrowRight size={14} color={isSelected ? role.color : '#64748B'} />
              </button>
            );
          })}
        </div>

        {/* Right: Permissions Grid for Selected Role */}
        <div style={{ background: '#090F1F', border: '1px solid #1E3156', borderRadius: '12px', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#A8B3C7' }}>
              Entitlements for: <strong style={{ color: currentRole.color }}>{currentRole.name}</strong>
            </span>
            <span style={{ fontSize: '11px', color: '#64748B' }}>Click any action to simulate test</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {RBAC_PERMISSIONS.map(perm => {
              const isGranted = currentRole.permissions.includes(perm.id);
              const isCurrentAction = selectedActionId === perm.id;
              return (
                <div
                  key={perm.id}
                  onClick={() => handleTestPermission(perm.id)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '8px',
                    background: isCurrentAction 
                      ? 'rgba(53, 213, 232, 0.15)' 
                      : isGranted 
                        ? 'rgba(54, 211, 153, 0.08)' 
                        : 'rgba(255, 92, 138, 0.05)',
                    border: isCurrentAction
                      ? '1px solid #35D5E8'
                      : isGranted
                        ? '1px solid rgba(54, 211, 153, 0.3)'
                        : '1px solid rgba(255, 92, 138, 0.2)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: isGranted ? '#F3F6FC' : '#94A3B8' }}>
                      {perm.label}
                    </span>
                    {isGranted ? (
                      <CheckCircle2 size={15} color="#36D399" />
                    ) : (
                      <XCircle size={15} color="#FF5C8A" />
                    )}
                  </div>
                  <span style={{ fontSize: '10.5px', color: '#A8B3C7' }}>
                    {perm.description}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Decision Output & Separation of Duties Feedback */}
      {auditLog && (
        <div style={{
          background: auditLog.status === 'GRANTED' ? 'rgba(54, 211, 153, 0.12)' : 'rgba(255, 92, 138, 0.12)',
          border: `1px solid ${auditLog.status === 'GRANTED' ? '#36D399' : '#FF5C8A'}`,
          borderRadius: '10px',
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-mono)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {auditLog.status === 'GRANTED' ? (
              <ShieldCheck size={20} color="#36D399" />
            ) : (
              <ShieldAlert size={20} color="#FF5C8A" />
            )}
            <div>
              <span style={{
                fontSize: '12.5px',
                fontWeight: 700,
                color: auditLog.status === 'GRANTED' ? '#36D399' : '#FF5C8A'
              }}>
                [{auditLog.status}] {auditLog.role} attempting: "{auditLog.action}"
              </span>
              <p style={{ fontSize: '11.5px', color: '#E2E8F0', marginTop: '2px', fontFamily: 'var(--font-sans)' }}>
                {auditLog.message}
              </p>
            </div>
          </div>
          <span style={{ fontSize: '11px', color: '#64748B' }}>
            POLICY: NIST RBAC
          </span>
        </div>
      )}
    </div>
  );
};
