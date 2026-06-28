import React from 'react';
export const ProgressBar = ({ percentage = 0 }) => (
  <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
    <div style={{
      height: '100%',
      width: `${Math.min(100, Math.max(0, percentage))}%`,
      background: percentage >= 100 ? '#10b981' : '#3b82f6',
      borderRadius: '4px',
      transition: 'width 0.3s ease',
    }} />
  </div>
);
