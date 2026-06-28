import React, { useState, useRef, useEffect } from 'react';
import { MEMBERS } from '../../utils/constants';
import { Plus, X } from 'lucide-react';

export const AssigneeSection = ({ selectedAssignees, setSelectedAssignees }) => {
  const [open, setOpen] = useState(false);
  const dropRef = useRef(null);

  // Klik di luar → tutup dropdown
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggle = (id) => {
    const next = selectedAssignees.includes(id)
      ? selectedAssignees.filter(a => a !== id)
      : [...selectedAssignees, id];
    setSelectedAssignees(next);
    // Auto-close jika SEMUA member sudah dipilih
    if (next.length === MEMBERS.length) setOpen(false);
  };

  const removeOne = (id, e) => {
    e.stopPropagation();
    setSelectedAssignees(selectedAssignees.filter(a => a !== id));
  };

  const selected   = MEMBERS.filter(m => selectedAssignees.includes(m.id));
  const unselected = MEMBERS.filter(m => !selectedAssignees.includes(m.id));

  return (
    <div>
      <span style={{ fontSize: '11px', fontWeight: '600', color: '#94a3b8', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Assignee</span>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
        {/* Avatar terpilih — klik X untuk hapus */}
        {selected.map((m) => (
          <div key={m.id} style={{ position: 'relative', cursor: 'pointer' }}
            title={`Hapus ${m.name}`}
          >
            <img src={m.avatarUrl} alt={m.name}
              style={{ width: '34px', height: '34px', borderRadius: '50%', border: '2px solid #3b82f6', display: 'block' }} />
            <button
              onClick={(e) => removeOne(m.id, e)}
              style={{
                position: 'absolute', top: '-4px', right: '-4px',
                width: '14px', height: '14px', borderRadius: '50%',
                background: '#ef4444', color: '#fff', border: '1px solid #fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', padding: 0, fontSize: '8px', lineHeight: 1,
              }}>
              <X size={8} />
            </button>
          </div>
        ))}

        {/* Tombol + buka dropdown */}
        {unselected.length > 0 && (
          <div style={{ position: 'relative' }} ref={dropRef}>
            <button
              type="button"
              onClick={() => setOpen(v => !v)}
              style={{
                width: '34px', height: '34px', borderRadius: '50%',
                border: '2px dashed #cbd5e1', background: '#f8fafc',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', flexShrink: 0,
              }}>
              <Plus size={15} color="#94a3b8" />
            </button>

            {open && (
              <div style={{
                position: 'absolute', top: '40px', left: 0,
                background: '#fff', border: '1px solid #e2e8f0',
                borderRadius: '12px', padding: '6px',
                boxShadow: '0 10px 24px rgba(0,0,0,0.12)',
                zIndex: 500, minWidth: '170px',
              }}>
                {unselected.map(m => (
                  <div key={m.id} onClick={() => toggle(m.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', color: '#1e293b', transition: 'background 0.1s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f0f7ff'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <img src={m.avatarUrl} alt="" style={{ width: '26px', height: '26px', borderRadius: '50%' }} />
                    <span style={{ fontWeight: '500' }}>{m.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
