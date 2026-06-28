import React from 'react';
import { MEMBERS } from '../../utils/constants';
export const BoardHeader = ({ onAddTask }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
    <div><h1 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#0f172a' }}>Adhivasindo</h1><p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>Inovasi berawal dari mimpi</p></div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{ display: 'flex', paddingRight: '4px' }}>{MEMBERS.map(m => <img key={m.id} src={m.avatarUrl} alt="" title={m.name} style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #fff', marginLeft: '-4px' }} />)}</div>
      <button onClick={onAddTask} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>+ Task</button>
    </div>
  </div>
);