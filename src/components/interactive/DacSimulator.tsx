import React, { useState } from 'react';
import { DAC_SAMPLE_FILES, SIMULATED_DAC_USERS } from '../../data/dacData';
import { ShieldCheck, ShieldAlert, FileCode, Check, X, Terminal, AlertTriangle } from 'lucide-react';

interface PermissionSet {
  r: boolean;
  w: boolean;
  x: boolean;
}

export const DacSimulator: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState(DAC_SAMPLE_FILES[0]);
  
  // State for Owner, Group, Others permissions
  const [ownerPerms, setOwnerPerms] = useState<PermissionSet>({ r: true, w: true, x: false });
  const [groupPerms, setGroupPerms] = useState<PermissionSet>({ r: true, w: false, x: false });
  const [otherPerms, setOtherPerms] = useState<PermissionSet>({ r: false, w: false, x: false });
  
  const [selectedUser, setSelectedUser] = useState(SIMULATED_DAC_USERS[0]);
  const [lastActionLog, setLastActionLog] = useState<{
    user: string;
    action: string;
    allowed: boolean;
    reason: string;
    timestamp: string;
  } | null>({
    user: 'Alice (Owner)',
    action: 'Read',
    allowed: true,
    reason: 'Owner has read permission (r) enabled.',
    timestamp: '12:00:01'
  });

  // Calculate octal values
  const calcOctal = (p: PermissionSet) => (p.r ? 4 : 0) + (p.w ? 2 : 0) + (p.x ? 1 : 0);
  const octalString = `${calcOctal(ownerPerms)}${calcOctal(groupPerms)}${calcOctal(otherPerms)}`;
  const symbolicString = `${ownerPerms.r ? 'r' : '-'}${ownerPerms.w ? 'w' : '-'}${ownerPerms.x ? 'x' : '-'}${groupPerms.r ? 'r' : '-'}${groupPerms.w ? 'w' : '-'}${groupPerms.x ? 'x' : '-'}${otherPerms.r ? 'r' : '-'}${otherPerms.w ? 'w' : '-'}${otherPerms.x ? 'x' : '-'}`;

  const isDangerous = otherPerms.w || (otherPerms.r && otherPerms.w && otherPerms.x);

  // Test an action
  const handleSimulateAction = (actionType: 'r' | 'w' | 'x', actionName: string) => {
    let allowed = false;
    let targetPerms: PermissionSet;
    let context = '';

    if (selectedUser.userType === 'owner') {
      targetPerms = ownerPerms;
      context = 'Owner permissions evaluated';
    } else if (selectedUser.userType === 'group') {
      targetPerms = groupPerms;
      context = `Group (${selectedFile.group}) permissions evaluated`;
    } else {
      targetPerms = otherPerms;
      context = 'World / Others permissions evaluated';
    }

    allowed = targetPerms[actionType];

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    setLastActionLog({
      user: selectedUser.name,
      action: actionName,
      allowed,
      reason: allowed 
        ? `PERMIT: ${context} allows ${actionName.toLowerCase()} on ${selectedFile.name}`
        : `DENY: ${context} lacks ${actionName.toLowerCase()} privilege (${actionType})`,
      timestamp: timeStr
    });
  };

  return (
    <div className="cyber-card" style={{ padding: '20px', background: 'rgba(14, 22, 41, 0.85)' }}>
      {/* Top Bar: File Selector & Live chmod Command */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FileCode size={20} color="#FFBF69" />
          <span style={{ fontSize: '13px', color: '#A8B3C7', fontWeight: 600 }}>TARGET OBJECT:</span>
          <select 
            value={selectedFile.id}
            onChange={(e) => {
              const f = DAC_SAMPLE_FILES.find(x => x.id === e.target.value);
              if (f) setSelectedFile(f);
            }}
            style={{
              background: '#080D1B',
              border: '1px solid #1E3156',
              color: '#F3F6FC',
              padding: '6px 12px',
              borderRadius: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px'
            }}
          >
            {DAC_SAMPLE_FILES.map(f => (
              <option key={f.id} value={f.id}>{f.name} ({f.size})</option>
            ))}
          </select>
        </div>

        {/* Live chmod terminal badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: '#080D1B',
          padding: '6px 14px',
          borderRadius: '8px',
          border: isDangerous ? '1px solid #FF5C8A' : '1px solid #35D5E8',
          fontFamily: 'var(--font-mono)'
        }}>
          <Terminal size={14} color={isDangerous ? '#FF5C8A' : '#35D5E8'} />
          <span style={{ fontSize: '13px', color: '#F3F6FC' }}>
            chmod <span style={{ color: isDangerous ? '#FF5C8A' : '#FFBF69', fontWeight: 700 }}>{octalString}</span> {selectedFile.name}
          </span>
          <span style={{ fontSize: '12px', color: '#64748B' }}>
            [{symbolicString}]
          </span>
        </div>
      </div>

      {isDangerous && (
        <div style={{
          background: 'rgba(255, 92, 138, 0.15)',
          border: '1px solid #FF5C8A',
          borderRadius: '8px',
          padding: '8px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '16px',
          color: '#FF84A8',
          fontSize: '12px'
        }}>
          <AlertTriangle size={16} color="#FF5C8A" />
          <span><strong>SECURITY RISK DETECTED:</strong> Granting write permissions to "Others/World" enables any user or process to overwrite or tamper with this file!</span>
        </div>
      )}

      {/* Grid: 3 Permission Columns (Owner, Group, Others) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '20px' }}>
        {/* Owner Column */}
        <div style={{ background: '#090F1F', border: '1px solid #1E3156', borderRadius: '10px', padding: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#35D5E8' }}>Owner (u)</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#FFBF69', fontWeight: 700 }}>
              Octal: {calcOctal(ownerPerms)}
            </span>
          </div>
          <p style={{ fontSize: '11px', color: '#A8B3C7', marginBottom: '10px' }}>User: {selectedFile.owner}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {(['r', 'w', 'x'] as const).map(p => (
              <label key={p} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(17, 26, 46, 0.7)',
                padding: '6px 10px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px'
              }}>
                <span style={{ color: '#E2E8F0' }}>
                  {p === 'r' ? 'Read (4)' : p === 'w' ? 'Write (2)' : 'Execute (1)'}
                </span>
                <input
                  type="checkbox"
                  checked={ownerPerms[p]}
                  onChange={(e) => setOwnerPerms({ ...ownerPerms, [p]: e.target.checked })}
                  style={{ accentColor: '#35D5E8', cursor: 'pointer' }}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Group Column */}
        <div style={{ background: '#090F1F', border: '1px solid #1E3156', borderRadius: '10px', padding: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#4F8CFF' }}>Group (g)</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#FFBF69', fontWeight: 700 }}>
              Octal: {calcOctal(groupPerms)}
            </span>
          </div>
          <p style={{ fontSize: '11px', color: '#A8B3C7', marginBottom: '10px' }}>Group: {selectedFile.group}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {(['r', 'w', 'x'] as const).map(p => (
              <label key={p} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(17, 26, 46, 0.7)',
                padding: '6px 10px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px'
              }}>
                <span style={{ color: '#E2E8F0' }}>
                  {p === 'r' ? 'Read (4)' : p === 'w' ? 'Write (2)' : 'Execute (1)'}
                </span>
                <input
                  type="checkbox"
                  checked={groupPerms[p]}
                  onChange={(e) => setGroupPerms({ ...groupPerms, [p]: e.target.checked })}
                  style={{ accentColor: '#4F8CFF', cursor: 'pointer' }}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Others Column */}
        <div style={{ background: '#090F1F', border: '1px solid #1E3156', borderRadius: '10px', padding: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#FF5C8A' }}>Others / World (o)</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#FFBF69', fontWeight: 700 }}>
              Octal: {calcOctal(otherPerms)}
            </span>
          </div>
          <p style={{ fontSize: '11px', color: '#A8B3C7', marginBottom: '10px' }}>Anyone else on the system</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {(['r', 'w', 'x'] as const).map(p => (
              <label key={p} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(17, 26, 46, 0.7)',
                padding: '6px 10px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px'
              }}>
                <span style={{ color: '#E2E8F0' }}>
                  {p === 'r' ? 'Read (4)' : p === 'w' ? 'Write (2)' : 'Execute (1)'}
                </span>
                <input
                  type="checkbox"
                  checked={otherPerms[p]}
                  onChange={(e) => setOtherPerms({ ...otherPerms, [p]: e.target.checked })}
                  style={{ accentColor: '#FF5C8A', cursor: 'pointer' }}
                />
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Simulation Sandbox */}
      <div style={{
        background: '#080D1B',
        border: '1px solid #1E3156',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '12px', color: '#A8B3C7', fontWeight: 600 }}>SIMULATE ACTOR:</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              {SIMULATED_DAC_USERS.map(user => (
                <button
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  style={{
                    background: selectedUser.id === user.id ? 'rgba(79, 140, 255, 0.25)' : 'rgba(17, 26, 46, 0.6)',
                    border: selectedUser.id === user.id ? '1px solid #4F8CFF' : '1px solid #1E3156',
                    color: selectedUser.id === user.id ? '#FFF' : '#A8B3C7',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  {user.name}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => handleSimulateAction('r', 'Read File')}
              className="cyber-button"
              style={{ fontSize: '12px', padding: '6px 12px' }}
            >
              Test Read
            </button>
            <button
              onClick={() => handleSimulateAction('w', 'Modify / Write File')}
              className="cyber-button"
              style={{ fontSize: '12px', padding: '6px 12px' }}
            >
              Test Write
            </button>
            <button
              onClick={() => handleSimulateAction('x', 'Execute Binary / Script')}
              className="cyber-button"
              style={{ fontSize: '12px', padding: '6px 12px' }}
            >
              Test Execute
            </button>
          </div>
        </div>

        {/* Live Evaluation Output */}
        {lastActionLog && (
          <div style={{
            background: lastActionLog.allowed ? 'rgba(54, 211, 153, 0.1)' : 'rgba(255, 92, 138, 0.1)',
            border: `1px solid ${lastActionLog.allowed ? '#36D399' : '#FF5C8A'}`,
            borderRadius: '8px',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {lastActionLog.allowed ? (
                <ShieldCheck size={18} color="#36D399" />
              ) : (
                <ShieldAlert size={18} color="#FF5C8A" />
              )}
              <span style={{ color: lastActionLog.allowed ? '#36D399' : '#FF5C8A', fontWeight: 600 }}>
                {lastActionLog.reason}
              </span>
            </div>
            <span style={{ color: '#64748B', fontSize: '11px' }}>
              [{lastActionLog.timestamp}]
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
