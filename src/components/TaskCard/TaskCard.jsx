import React from 'react';
import { useBoardStore } from '../../store/useBoardStore';
import { TaskCardBadge } from './TaskCardBadge';
import { TaskCardMeta } from './TaskCardMeta';
import { Avatar } from '../common/Avatar';

export const TaskCard = ({ task, columnName, onEditTask }) => {
  const setDraggedTask  = useBoardStore(s => s.setDraggedTask);
  const clearDraggedTask = useBoardStore(s => s.clearDraggedTask);

  const checklist  = task.checklist || [];
  const total      = checklist.length;
  const done       = checklist.filter(c => c.isCompleted).length;
  const progress   = total > 0 ? Math.round((done / total) * 100) : -1; // -1 = tidak ada checklist

  return (
    <div
      className="task-card"
      draggable
      onDragStart={() => setDraggedTask(task.id, columnName)}
      onDragEnd={clearDraggedTask}
      onClick={() => onEditTask(task, columnName)}
      style={{
        background: '#ffffff', borderRadius: '10px',
        border: '1px solid #e8edf3',
        cursor: 'grab', overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}
    >
      {/* Cover Image */}
      {task.coverImage && (
        <img src={task.coverImage} alt="cover"
          style={{ width: '100%', height: '120px', objectFit: 'cover', display: 'block' }} />
      )}

      <div style={{ padding: '12px' }}>
        {/* Label Badge */}
        {task.label && (
          <div style={{ marginBottom: '8px' }}>
            <TaskCardBadge label={task.label} />
          </div>
        )}

        {/* Progress bar di bawah badge — sesuai gambar 4 */}
        {progress >= 0 && (
          <div style={{ height: '3px', background: '#e2e8f0', borderRadius: '3px', marginBottom: '8px' }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: progress === 100 ? '#10b981' : '#3b82f6',
              borderRadius: '3px',
              transition: 'width 0.3s ease',
            }} />
          </div>
        )}

        {/* Judul */}
        <p style={{ margin: '0 0 8px 0', fontSize: '13px', fontWeight: '600', color: '#2d3748', lineHeight: '1.45' }}>
          {task.title}
        </p>

        {/* Meta: due date, checklist count, attachment count */}
        <TaskCardMeta
          dueDate={task.dueDate}
          checklist={checklist}
          attachmentCount={task.attachments?.length || 0}
        />

        {/* Assignee Avatars */}
        {task.assignee && task.assignee.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
            {task.assignee.slice(0, 3).map((id, idx) => (
              <div key={id} style={{ marginLeft: idx === 0 ? 0 : '-6px', zIndex: 10 - idx }}>
                <Avatar id={id} size={24} />
              </div>
            ))}
            {task.assignee.length > 3 && (
              <div style={{
                width: '24px', height: '24px', borderRadius: '50%',
                background: '#e2e8f0', border: '2px solid #fff',
                marginLeft: '-6px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '9px', fontWeight: '700', color: '#64748b',
              }}>
                +{task.assignee.length - 3}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
