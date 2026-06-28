import React from 'react';

const LABEL_STYLES = {
  Bug:       { bg: '#fee2e2', color: '#ef4444' },
  Feature:   { bg: '#dbeafe', color: '#3b82f6' },
  Issue:     { bg: '#fef3c7', color: '#d97706' },
  Undefined: { bg: '#f1f5f9', color: '#64748b' },
};

export const TaskCardBadge = ({ label }) => {
  const s = LABEL_STYLES[label] || LABEL_STYLES.Undefined;
  return (
    <span style={{
      display: 'inline-block',
      background: s.bg, color: s.color,
      padding: '2px 10px', borderRadius: '6px',
      fontSize: '11px', fontWeight: '700', letterSpacing: '0.2px',
    }}>
      {label}
    </span>
  );
};
