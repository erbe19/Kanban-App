import { useBoardStore } from '../store/useBoardStore';

export const useDragDrop = () => {
  const moveTask = useBoardStore((state) => state.moveTask);

  const handleDragStart = (e, taskId, sourceCol) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ taskId, sourceCol }));
  };

  const handleDrop = (e, destCol) => {
    e.preventDefault();
    try {
      const data = e.dataTransfer.getData('application/json');
      if (!data) return;
      const { taskId, sourceCol } = JSON.parse(data);
      // moveTask(taskId, sourceCol, targetCol) - urutan sudah benar
      moveTask(taskId, sourceCol, destCol);
    } catch (err) {
      console.error(err);
    }
  };

  return { handleDragStart, handleDrop, handleDragOver: (e) => e.preventDefault() };
};
