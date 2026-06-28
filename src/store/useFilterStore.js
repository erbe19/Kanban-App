import { create } from 'zustand';

export const useFilterStore = create((set) => ({
  searchQuery:      '',
  selectedLabel:    '',
  selectedAssignee: '',
  selectedPriority: '',
  dueDateFilter:    '', // 'today' | 'this_week' | 'overdue' | ''

  setSearchQuery:      (q) => set({ searchQuery: q }),
  setSelectedLabel:    (l) => set({ selectedLabel: l }),
  setSelectedAssignee: (a) => set({ selectedAssignee: a }),
  setSelectedPriority: (p) => set({ selectedPriority: p }),
  setDueDateFilter:    (d) => set({ dueDateFilter: d }),
  resetFilters: () => set({
    searchQuery: '', selectedLabel: '', selectedAssignee: '',
    selectedPriority: '', dueDateFilter: ''
  }),
}));
