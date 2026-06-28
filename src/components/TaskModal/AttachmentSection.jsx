import React from 'react';
import { Paperclip, FileText, Image as ImgIcon, X } from 'lucide-react';

const getIcon = (name = '') => {
  if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(name)) return <ImgIcon size={13} color="#3b82f6" />;
  return <FileText size={13} color="#64748b" />;
};

export const AttachmentSection = ({ attachments = [], setAttachments, onBrowse }) => {
  const removeItem = (i) => setAttachments && setAttachments(prev => prev.filter((_, idx) => idx !== i));

  return (
    <div>
      <span style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', display: 'block', marginBottom: '8px' }}>
        Attachments
      </span>

      {/* File list */}
      {attachments.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '8px' }}>
          {attachments.map((att, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '6px 10px', background: '#f8fafc', borderRadius: '8px', fontSize: '12px', color: '#475569', border: '1px solid #f1f5f9' }}>
              {getIcon(att)}
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{att}</span>
              {setAttachments && (
                <button onClick={() => removeItem(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#cbd5e1', display: 'flex', padding: '1px', flexShrink: 0 }}>
                  <X size={12} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Drop zone / Browse button */}
      <div
        onClick={onBrowse}
        style={{
          border: '2px dashed #e2e8f0', borderRadius: '10px',
          padding: '16px 12px', textAlign: 'center',
          color: '#94a3b8', fontSize: '12px', cursor: 'pointer',
          transition: 'border-color 0.2s, background 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.background = '#f0f7ff'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = 'transparent'; }}
      >
        <Paperclip size={18} style={{ display: 'block', margin: '0 auto 5px' }} />
        Drag & Drop files here or{' '}
        <span style={{ color: '#3b82f6', fontWeight: '600' }}>browse from device</span>
      </div>
    </div>
  );
};
