import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export const ChecklistSection = ({ checklist, setChecklist, newSub, setNewSub }) => {
  const handleAdd = () => {
    if (!newSub.trim()) return;
    setChecklist([...checklist, { id: 'sub_' + Date.now(), title: newSub.trim(), isCompleted: false }]);
    setNewSub('');
  };

  const handleKey = (e) => { if (e.key === 'Enter') { e.preventDefault(); handleAdd(); } };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {checklist.map(item => (
        <div key={item.id} style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: '#f8fafc', padding: '7px 10px', borderRadius: '8px',
          border: '1px solid #f1f5f9',
        }}>
          <input
            type="checkbox"
            checked={item.isCompleted}
            onChange={e => setChecklist(checklist.map(c => c.id === item.id ? { ...c, isCompleted: e.target.checked } : c))}
            style={{ width: '14px', height: '14px', cursor: 'pointer', accentColor: '#3b82f6' }}
          />
          <span style={{
            flex: 1, fontSize: '12px', color: item.isCompleted ? '#94a3b8' : '#1e293b',
            textDecoration: item.isCompleted ? 'line-through' : 'none',
          }}>
            {item.title}
          </span>
          <button onClick={() => setChecklist(checklist.filter(c => c.id !== item.id))}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#cbd5e1', padding: '2px', display: 'flex' }}>
            <Trash2 size={13} />
          </button>
        </div>
      ))}

      {/* Add subtask input */}
      <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
        <input
          type="text"
          value={newSub}
          onChange={e => setNewSub(e.target.value)}
          onKeyDown={handleKey}
          placeholder="+ Add subtask..."
          style={{
            flex: 1, padding: '8px 12px', fontSize: '12px',
            border: '1px solid #e2e8f0', borderRadius: '8px',
            background: '#f8fafc', outline: 'none', color: '#1e293b',
          }}
        />
        <button onClick={handleAdd}
          style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
};
