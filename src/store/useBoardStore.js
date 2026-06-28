import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { INITIAL_TASKS, COLUMNS, MEMBERS } from '../utils/constants';
import toast from 'react-hot-toast';

export const useBoardStore = create(
  persist(
    (set, get) => ({
      columns: COLUMNS,
      tasks: INITIAL_TASKS,
      members: MEMBERS,
      searchQuery: '',
      draggedTaskId: null,
      draggedSourceCol: null,

      // ── Search ──────────────────────────────────────────
      setSearchQuery: (q) => set({ searchQuery: q }),

      // ── Drag & Drop ──────────────────────────────────────
      setDraggedTask: (taskId, sourceCol) => set({ draggedTaskId: taskId, draggedSourceCol: sourceCol }),
      clearDraggedTask: () => set({ draggedTaskId: null, draggedSourceCol: null }),

      // ── CRUD Task ────────────────────────────────────────
      addTask: (columnName, taskData) => {
        const newTask = {
          ...taskData,
          id: 'task_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
          checklist: (taskData.checklist || []).map((c, i) => ({
            id: c.id || 'sub_' + i + '_' + Date.now(),
            title: c.title || c.text || '',
            isCompleted: c.isCompleted || false,
          })),
        };
        set((state) => ({
          tasks: {
            ...state.tasks,
            [columnName]: [...(state.tasks[columnName] || []), newTask],
          },
        }));
        toast.success('Task berhasil dibuat! 🎉');
      },

      updateTask: (columnName, updatedTask) => {
        // Bisa pindah kolom jika targetCol berubah
        const state = get();
        // Hapus dari semua kolom dulu (task bisa pindah kolom via modal)
        let newTasks = { ...state.tasks };
        let foundInCol = columnName;
        // cari task aslinya ada di kolom mana
        for (const col of state.columns) {
          if ((newTasks[col] || []).find(t => t.id === updatedTask.id)) {
            foundInCol = col;
            break;
          }
        }
        // Hapus dari kolom lama
        newTasks[foundInCol] = (newTasks[foundInCol] || []).filter(t => t.id !== updatedTask.id);
        // Tambahkan ke kolom target (columnName = target dari modal)
        const targetCol = columnName;
        newTasks[targetCol] = [...(newTasks[targetCol] || []), {
          ...updatedTask,
          checklist: (updatedTask.checklist || []).map((c, i) => ({
            id: c.id || 'sub_' + i,
            title: c.title || c.text || '',
            isCompleted: c.isCompleted || false,
          })),
        }];
        set({ tasks: newTasks });
        toast.success('Task berhasil diperbarui! ✏️');
      },

      deleteTask: (columnName, taskId) => {
        set((state) => {
          // Hapus dari kolom manapun dia berada
          const newTasks = {};
          for (const col of state.columns) {
            newTasks[col] = (state.tasks[col] || []).filter(t => t.id !== taskId);
          }
          return { tasks: newTasks };
        });
        toast.error('Task dihapus.');
      },

      moveTask: (taskId, sourceCol, targetCol) => set((state) => {
        if (!taskId || !sourceCol || sourceCol === targetCol) return state;
        const taskToMove = (state.tasks[sourceCol] || []).find(t => String(t.id) === String(taskId));
        if (!taskToMove) return state;
        return {
          tasks: {
            ...state.tasks,
            [sourceCol]: (state.tasks[sourceCol] || []).filter(t => String(t.id) !== String(taskId)),
            [targetCol]: [...(state.tasks[targetCol] || []), taskToMove],
          },
        };
      }),

      // ── Column CRUD ──────────────────────────────────────
      addColumn: (name) => set((state) => {
        if (!name.trim() || state.columns.includes(name)) return state;
        return { columns: [...state.columns, name], tasks: { ...state.tasks, [name]: [] } };
      }),

      renameColumn: (oldName, newName) => set((state) => {
        if (!newName.trim() || state.columns.includes(newName)) return state;
        const newColumns = state.columns.map(c => c === oldName ? newName : c);
        const newTasks = { ...state.tasks };
        newTasks[newName] = newTasks[oldName] || [];
        delete newTasks[oldName];
        return { columns: newColumns, tasks: newTasks };
      }),

      deleteColumn: (columnName) => set((state) => ({
        columns: state.columns.filter(c => c !== columnName),
        tasks: Object.fromEntries(Object.entries(state.tasks).filter(([k]) => k !== columnName)),
      })),

      // ── Members ──────────────────────────────────────────
      addMember: (name) => set((state) => ({
        members: [...state.members, {
          id: 'm_' + Date.now(),
          name,
          avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
        }],
      })),

      // ── Import/Export ────────────────────────────────────
      setBoardData: (tasks, columns) => set({ tasks, columns }),
    }),
    { name: 'kanban-adhivasindo-v2' }
  )
);
