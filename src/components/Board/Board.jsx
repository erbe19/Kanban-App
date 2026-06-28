import React, { useState } from 'react';
import { useBoardStore } from '../../store/useBoardStore';
import { useFilterStore } from '../../store/useFilterStore';
import { Column } from '../Column/column';
import { TaskModal } from '../TaskModal/TaskModal';
import { Plus } from 'lucide-react';

const isToday     = (d) => { if (!d) return false; return new Date(d).toDateString() === new Date().toDateString(); };
const isThisWeek  = (d) => { if (!d) return false; const t = new Date(); const dd = new Date(d); const s = new Date(t); s.setDate(t.getDate()-t.getDay()); const e = new Date(s); e.setDate(s.getDate()+6); return dd>=s&&dd<=e; };
const isOverdue   = (d) => { if (!d) return false; return new Date(d) < new Date(new Date().toDateString()); };

export const Board = () => {
  const { columns, tasks, searchQuery, addColumn } = useBoardStore();
  const { selectedLabel, selectedAssignee, selectedPriority, dueDateFilter } = useFilterStore();

  const [modalOpen, setModalOpen]     = useState(false);
  const [activeCol, setActiveCol]     = useState('');
  const [selectedTask, setSelectedTask] = useState(null);

  // ── Filter logic (searchQuery reactive karena pakai Zustand subscribe) ──
  const filterTasks = (colTasks) => (colTasks || []).filter(t => {
    const q = (searchQuery || '').toLowerCase().trim();
    const matchSearch   = !q || (t.title||'').toLowerCase().includes(q) || (t.description||'').toLowerCase().includes(q);
    const matchLabel    = !selectedLabel    || t.label    === selectedLabel;
    const matchPriority = !selectedPriority || t.priority === selectedPriority;
    const matchAssignee = !selectedAssignee || (t.assignee||[]).includes(selectedAssignee);
    let   matchDueDate  = true;
    if (dueDateFilter === 'today')     matchDueDate = isToday(t.dueDate);
    if (dueDateFilter === 'this_week') matchDueDate = isThisWeek(t.dueDate);
    if (dueDateFilter === 'overdue')   matchDueDate = isOverdue(t.dueDate);
    return matchSearch && matchLabel && matchPriority && matchAssignee && matchDueDate;
  });

  const handleAddColumn = () => {
    const name = window.prompt('Nama kolom baru:');
    if (name?.trim()) addColumn(name.trim());
  };

  return (
    <div className="board-container">
      {columns.map(col => (
        <Column
          key={col}
          name={col}
          tasks={filterTasks(tasks[col])}
          onAddTask={(n) => { setSelectedTask(null); setActiveCol(n); setModalOpen(true); }}
          onEditTask={(task, n) => { setSelectedTask(task); setActiveCol(n); setModalOpen(true); }}
        />
      ))}

      <div onClick={handleAddColumn} style={{
        minWidth: '200px', height: '48px', border: '2px dashed #cbd5e1',
        borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '6px', cursor: 'pointer', color: '#94a3b8', fontSize: '13px', fontWeight: '500',
        alignSelf: 'flex-start', flexShrink: 0,
      }}>
        <Plus size={15} /> Add new List
      </div>

      {modalOpen && (
        <TaskModal
          isOpen={modalOpen}
          columnName={activeCol}
          task={selectedTask}
          onClose={() => { setModalOpen(false); setSelectedTask(null); }}
        />
      )}
    </div>
  );
};
