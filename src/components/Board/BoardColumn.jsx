import React from 'react';
import { useTaskFilter } from '../../hooks/useTaskFilter';
import { useDragDrop } from '../../hooks/useDragDrop';
import { TaskCard } from '../TaskCard/TaskCard';

export const BoardColumn = ({ title, rawTasks, onEditTask }) => {
  const filteredTasks = useTaskFilter(rawTasks); const { handleDrop, handleDragOver } = useDragDrop();
  return (
    <div onDragOver={handleDragOver} onDrop={e => handleDrop(e, title)} style={{ background: '#f1f5f9', borderRadius: '8px', width: '260px', minWidth: '260px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '70vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2px 4px' }}><span style={{ fontSize: '12px', fontWeight: 'bold', color: '#334155' }}>{title}</span><span style={{ background: '#e2e8f0', padding: '2px 6px', borderRadius: '10px', fontSize: '10px', fontWeight: 'bold' }}>{filteredTasks.length}</span></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto', flex: 1 }}>{filteredTasks.map(task => <TaskCard key={task.id} task={task} columnName={title} onEditTask={onEditTask} />)}</div>
    </div>
  );
};