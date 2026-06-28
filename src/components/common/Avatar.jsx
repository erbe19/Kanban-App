import React from 'react';
import { MEMBERS } from '../../utils/constants';

export const Avatar = ({ id, size = 24 }) => {
  const member = MEMBERS.find(m => m.id === id);
  if (!member) return null;
  return (
    <img src={member.avatarUrl} alt={member.name} title={member.name} style={{ width: `${size}px`, height: `${size}px`, borderRadius: '50%', border: '2px solid #fff' }} />
  );
};