import React, { useState, useRef, useEffect } from 'react';
import { useBoardStore } from '../../store/useBoardStore';
import { TaskCard } from '../TaskCard/TaskCard';
import { MoreHorizontal, Maximize2, Minimize2, Trash2, Edit3, Check, X, Plus } from 'lucide-react';

export const Column = ({ name, tasks = [], onAddTask, onEditTask }) => {
  const { renameColumn, deleteColumn, draggedTaskId, draggedSourceCol, moveTask } = useBoardStore();

  const [isOver, setIsOver] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false); 
  const [showMenu, setShowMenu] = useState(false);       
  const [isEditingName, setIsEditingName] = useState(false);
  const [newNameInput, setNewNameInput] = useState(name);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setShowMenu(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsOver(false);
    if (draggedTaskId && draggedSourceCol) moveTask(draggedTaskId, draggedSourceCol, name);
  };

  return (
    <div
      className="column-card"
      onDragOver={(e) => { e.preventDefault(); setIsOver(true); }}
      onDragLeave={() => setIsOver(false)}
      onDrop={handleDrop}
      style={{
        width: isMaximized ? '460px' : '285px',
        minWidth: isMaximized ? '460px' : '285px',
        maxWidth: isMaximized ? '460px' : '285px',
        border: isOver ? '2px dashed #2f80ed' : '1px solid #e2e8f0',
        backgroundColor: isOver ? '#f0f7ff' : '#f8fafc'
      }}
    >
      {/* Header Kolom */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1, minWidth: 0 }}>
          {isEditingName ? (
            <form onSubmit={(e) => { e.preventDefault(); renameColumn(name, newNameInput); setIsEditingName(false); }} style={{ display: 'flex', gap: '4px', width: '100%' }}>
              <input type="text" value={newNameInput} onChange={(e) => setNewNameInput(e.target.value)} autoFocus style={{ width: '70%', padding: '4px', fontSize: '12px' }} />
              <button type="submit" style={{ background: '#2f80ed', color: '#fff', border: 'none', borderRadius: '4px' }}><Check size={12} /></button>
            </form>
          ) : (
            <>
              <span style={{ fontWeight: '700', fontSize: '14px', color: '#1e293b', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{name}</span>
              
              {/* TOMBOL PLUS BARU - KONTRAST TINGGI & JELAS */}
              <button
                onClick={() => onAddTask(name)}
                style={{ background: '#2f80ed', color: '#ffffff', border: 'none', borderRadius: '6px', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <Plus size={13} strokeWidth={3} />
              </button>

              {/* Titik Tiga CRUD */}
              <div style={{ position: 'relative' }} ref={menuRef}>
                <button onClick={() => setShowMenu(!showMenu)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><MoreHorizontal size={16} /></button>
                {showMenu && (
                  <div style={{ position: 'absolute', top: '22px', left: 0, background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', zIndex: 100, width: '130px', padding: '4px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                    <button onClick={() => { setIsEditingName(true); setShowMenu(false); }} style={{ width: '100%', display: 'flex', gap: '8px', padding: '6px', border: 'none', background: 'none', fontSize: '12px', cursor: 'pointer', alignment: 'left' }}><Edit3 size={12} /> Rename</button>
                    <button onClick={() => { if(confirm('Hapus kolom ini?')) deleteColumn(name); }} style={{ width: '100%', display: 'flex', gap: '8px', padding: '6px', border: 'none', background: 'none', fontSize: '12px', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={12} /> Delete</button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Ikon Perbesar Kolom */}
        <button onClick={() => setIsMaximized(!isMaximized)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
          {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </button>
      </div>

      {/* Item List Kartu */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', flex: 1 }}>
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} columnName={name} onEditTask={onEditTask} />
        ))}
      </div>
    </div>
  );
};