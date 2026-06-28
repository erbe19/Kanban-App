import { useFilterStore } from '../store/useFilterStore';
import { useBoardStore } from '../store/useBoardStore';

const isToday = (dateStr) => {
  if (!dateStr) return false;
  const today = new Date();
  const d = new Date(dateStr);
  return d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate();
};

const isThisWeek = (dateStr) => {
  if (!dateStr) return false;
  const today = new Date();
  const d = new Date(dateStr);
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  return d >= startOfWeek && d <= endOfWeek;
};

const isOverdue = (dateStr) => {
  if (!dateStr) return false;
  return new Date(dateStr) < new Date(new Date().toDateString());
};

export const useTaskFilter = (tasksArray) => {
  const { selectedLabel, selectedPriority, selectedAssignee, dueDateFilter } = useFilterStore();
  const { searchQuery } = useBoardStore();

  if (!tasksArray) return [];

  return tasksArray.filter((task) => {
    const safeQuery = (searchQuery || '').toLowerCase().trim();

    const matchSearch = !safeQuery || (
      (task.title || '').toLowerCase().includes(safeQuery) ||
      (task.description || '').toLowerCase().includes(safeQuery)
    );
    const matchLabel    = !selectedLabel    || task.label    === selectedLabel;
    const matchPriority = !selectedPriority || task.priority === selectedPriority;
    const matchAssignee = !selectedAssignee || (task.assignee || []).includes(selectedAssignee);

    let matchDueDate = true;
    if (dueDateFilter === 'today')     matchDueDate = isToday(task.dueDate);
    if (dueDateFilter === 'this_week') matchDueDate = isThisWeek(task.dueDate);
    if (dueDateFilter === 'overdue')   matchDueDate = isOverdue(task.dueDate);

    return matchSearch && matchLabel && matchPriority && matchAssignee && matchDueDate;
  });
};
