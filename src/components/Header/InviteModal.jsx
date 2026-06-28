import React, { useState } from 'react';
import { X, UserPlus } from 'lucide-react';
import { useBoardStore } from '../../store/useBoardStore';

export const InviteModal = ({ isOpen, onClose }) => {
  const addMember = useBoardStore((state) => state.addMember);
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      addMember(name.trim());
      setName('');
      onClose(); 
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 9999,
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      backdropFilter: 'blur(2px)'
    }}>
      <div style={{
        background: '#ffffff', borderRadius: '16px', width: '360px',
        padding: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
        position: 'relative', border: '1px solid #e2e8f0'
      }}>
        {/* Header Modal */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UserPlus size={18} color="#3182ce" />
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#2d3748' }}>Invite New Member</h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#a0aec0' }}>
            <X size={18} />
          </button>
        </div>

        {/* Form Input */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#718096', marginBottom: '6px' }}>
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter member's name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              style={{
                width: '100%', padding: '10px 12px', borderRadius: '8px',
                border: '1px solid #cbd5e0', fontSize: '13.5px', outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Tombol Aksi */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f7fafc', color: '#4a5568', fontSize: '13px', cursor: 'pointer', fontWeight: '500' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              style={{
                padding: '8px 16px', borderRadius: '8px', border: 'none',
                background: name.trim() ? '#3182ce' : '#cbd5e0', color: '#ffffff',
                fontSize: '13px', cursor: name.trim() ? 'pointer' : 'not-allowed', fontWeight: '600'
              }}
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};