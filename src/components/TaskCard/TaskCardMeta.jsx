import React from 'react';
import { Calendar, CheckSquare, Paperclip } from 'lucide-react';

const fmtDate = (d) => {
  if (!d) return '';
  try {
    return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  } catch { return d; }
};

export const TaskCardMeta = ({ dueDate, checklist = [], attachmentCount = 0 }) => {
  const total = checklist.length;
  const done  = checklist.filter(c => c.isCompleted).length;
  if (!dueDate && total === 0 && attachmentCount === 0) return null;

  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
      {dueDate && (
        <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#64748b', fontSize: '11px' }}>
          <Calendar size={11} strokeWidth={2} />
          {fmtDate(dueDate)}
        </span>
      )}
      {total > 0 && (
        <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#64748b', fontSize: '11px' }}>
          <CheckSquare size={11} strokeWidth={2} />
          {done}/{total}
        </span>
      )}
      {attachmentCount > 0 && (
        <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#64748b', fontSize: '11px' }}>
          <Paperclip size={11} strokeWidth={2} />
          {attachmentCount}
        </span>
      )}
    </div>
  );
};
