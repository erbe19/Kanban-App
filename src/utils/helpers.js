export const formatDate = (dateString) => {
  if (!dateString) return '-';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};
export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High': return '#ef4444';
    case 'Medium': return '#f59e0b';
    case 'Low': return '#10b981';
    default: return '#64748b';
  }
};