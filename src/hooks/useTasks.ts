import { useState, useEffect, useCallback } from 'react';
import { Task, TaskStatus, TaskPriority, CreateTaskDTO, TaskFilters } from '../types';
import { TaskApi, fallbackInitialTasks } from '../api/taskApi';
import { ToastMessage } from '../components/Toast';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = `toast_${Date.now()}_${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Fetch tasks from API with graceful fallback
  const fetchTasks = useCallback(async (filters: TaskFilters = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await TaskApi.getTasks(filters);
      if (response.success && Array.isArray(response.data)) {
        setTasks(response.data);
        setIsBackendConnected(true);
      } else {
        throw new Error('Malformed API response');
      }
    } catch (err: any) {
      console.warn('[useTasks] Backend API unreachable, falling back to local cache mode:', err.message);
      setIsBackendConnected(false);
      setError('Unable to reach backend API at http://localhost:5000. Running in offline/demo cache mode.');
      setTasks(fallbackInitialTasks);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Create Task
  const createTask = async (dto: CreateTaskDTO) => {
    try {
      if (isBackendConnected) {
        const res = await TaskApi.createTask(dto);
        if (res.success && res.data) {
          setTasks((prev) => [res.data, ...prev]);
          addToast('success', `Created task: ${res.data.title}`);
          return;
        }
      }
      // Offline fallback
      const newTask: Task = {
        id: `offline_${Date.now()}`,
        projectId: 'proj_swyn_001',
        taskNumber: tasks.length + 101,
        title: dto.title,
        description: dto.description || '',
        status: dto.status || 'TODO',
        priority: dto.priority,
        points: dto.points || 1,
        position: 0,
        assignee: { id: 'u1', fullName: 'Tharun M.', email: 'tharun@swynex.tech', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60' },
        createdAt: new Date().toISOString()
      };
      setTasks((prev) => [newTask, ...prev]);
      addToast('success', `Created task: ${newTask.title} (Local cache)`);
    } catch (err: any) {
      addToast('error', err.message || 'Failed to create task');
      throw err;
    }
  };

  // Advance or retreat task stage
  const moveTask = async (taskId: string, direction: 'prev' | 'next') => {
    const statusOrder: TaskStatus[] = ['BACKLOG', 'TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'];
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const currentIndex = statusOrder.indexOf(task.status);
    const targetIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (targetIndex < 0 || targetIndex >= statusOrder.length) return;

    const newStatus = statusOrder[targetIndex];

    // Optimistic UI update
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );

    if (isBackendConnected) {
      try {
        await TaskApi.patchTask(taskId, { status: newStatus });
      } catch (err: any) {
        // Rollback on server failure
        setTasks((prev) =>
          prev.map((t) => (t.id === taskId ? { ...t, status: task.status } : t))
        );
        addToast('error', 'Failed to update task status on server. Rolled back.');
        return;
      }
    }

    addToast('info', `Moved to ${newStatus.replace('_', ' ')}`);
  };

  // Update Status directly
  const updateTaskStatus = async (taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
    if (isBackendConnected) {
      try {
        await TaskApi.patchTask(taskId, { status: newStatus });
      } catch {
        addToast('error', 'Failed to update status on server');
      }
    }
  };

  // Update Priority directly
  const updateTaskPriority = async (taskId: string, newPriority: TaskPriority) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, priority: newPriority } : t))
    );
    if (isBackendConnected) {
      try {
        await TaskApi.patchTask(taskId, { priority: newPriority });
      } catch {
        addToast('error', 'Failed to update priority on server');
      }
    }
  };

  // Delete Task
  const deleteTask = async (taskId: string) => {
    const previous = [...tasks];
    setTasks((prev) => prev.filter((t) => t.id !== taskId));

    if (isBackendConnected) {
      try {
        await TaskApi.deleteTask(taskId);
        addToast('success', 'Task deleted successfully');
      } catch (err: any) {
        setTasks(previous);
        addToast('error', 'Failed to delete task on server. Rolled back.');
      }
    } else {
      addToast('success', 'Task removed from local state');
    }
  };

  return {
    tasks,
    isLoading,
    error,
    isBackendConnected,
    toasts,
    fetchTasks,
    createTask,
    moveTask,
    updateTaskStatus,
    updateTaskPriority,
    deleteTask,
    dismissToast
  };
}
