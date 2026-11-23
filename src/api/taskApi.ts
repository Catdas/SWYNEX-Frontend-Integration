import { apiClient } from './client';
import { Task, CreateTaskDTO, UpdateTaskDTO, TaskFilters, ApiResponse } from '../types';

// Fallback initial in-memory data for graceful offline / demo resilience
export const fallbackInitialTasks: Task[] = [
  {
    id: 'd9b01234-5678-4abc-def0-123456789abc',
    projectId: 'proj_swyn_001',
    taskNumber: 101,
    title: 'Implement database models and Prisma persistence layer',
    description: 'Define relational schema for Users, Projects, and Tasks with validation.',
    status: 'DONE',
    priority: 'URGENT',
    points: 8,
    position: 0,
    assignee: { id: 'u1', fullName: 'Tharun M.', email: 'tharun@swynex.tech', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60' },
    dueDate: '2026-11-28T18:00:00Z',
    createdAt: new Date().toISOString()
  },
  {
    id: 'e8c12345-6789-4bcd-efa1-234567890bcd',
    projectId: 'proj_swyn_001',
    taskNumber: 102,
    title: 'Build RESTful Tasks CRUD endpoints with Zod validation',
    description: 'Implement POST, GET, PUT, PATCH, and DELETE routes with strict schema guards.',
    status: 'IN_REVIEW',
    priority: 'HIGH',
    points: 5,
    position: 1,
    assignee: { id: 'u2', fullName: 'Sarah Lin', email: 'sarah.lin@swynex.tech', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60' },
    dueDate: '2026-12-01T18:00:00Z',
    createdAt: new Date().toISOString()
  },
  {
    id: 'f7d23456-7890-4cde-fab2-345678901cde',
    projectId: 'proj_swyn_001',
    taskNumber: 103,
    title: 'Design interactive frontend Kanban board with real-time feedback',
    description: 'Build responsive UI, loading states, error boundaries, and optimistic updates.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    points: 5,
    position: 2,
    assignee: { id: 'u1', fullName: 'Tharun M.', email: 'tharun@swynex.tech', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60' },
    dueDate: '2026-12-05T18:00:00Z',
    createdAt: new Date().toISOString()
  },
  {
    id: 'a6e34567-8901-4def-abc3-456789012def',
    projectId: 'proj_swyn_001',
    taskNumber: 104,
    title: 'Integrate loading skeletons and error state banners',
    description: 'Ensure graceful user feedback on async state transitions and network failures.',
    status: 'TODO',
    priority: 'MEDIUM',
    points: 3,
    position: 3,
    assignee: null,
    dueDate: '2026-12-10T18:00:00Z',
    createdAt: new Date().toISOString()
  },
  {
    id: 'b5f45678-9012-4efa-bcd4-567890123efa',
    projectId: 'proj_swyn_001',
    taskNumber: 105,
    title: 'Deploy frontend and backend to production staging',
    description: 'Setup continuous integration GitHub Actions pipeline and container build.',
    status: 'BACKLOG',
    priority: 'LOW',
    points: 2,
    position: 4,
    assignee: null,
    dueDate: '2026-12-15T18:00:00Z',
    createdAt: new Date().toISOString()
  }
];

export const TaskApi = {
  // Fetch tasks with query filters
  async getTasks(filters: TaskFilters = {}): Promise<ApiResponse<Task[]>> {
    const params = new URLSearchParams();
    if (filters.status) params.set('status', filters.status);
    if (filters.priority) params.set('priority', filters.priority);
    if (filters.search) params.set('search', filters.search);
    if (filters.page) params.set('page', String(filters.page));
    if (filters.limit) params.set('limit', String(filters.limit));

    const query = params.toString() ? `?${params.toString()}` : '';
    return apiClient<Task[]>(`/tasks${query}`);
  },

  // Fetch single task by ID
  async getTaskById(id: string): Promise<ApiResponse<Task>> {
    return apiClient<Task>(`/tasks/${id}`);
  },

  // Create new task
  async createTask(data: CreateTaskDTO): Promise<ApiResponse<Task>> {
    return apiClient<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  // Partial update task (PATCH)
  async patchTask(id: string, data: UpdateTaskDTO): Promise<ApiResponse<Task>> {
    return apiClient<Task>(`/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  },

  // Full update task (PUT)
  async updateTask(id: string, data: UpdateTaskDTO): Promise<ApiResponse<Task>> {
    return apiClient<Task>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  // Delete task
  async deleteTask(id: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient<{ message: string }>(`/tasks/${id}`, {
      method: 'DELETE'
    });
  },

  // Check backend health
  async checkHealth(): Promise<boolean> {
    try {
      await apiClient<{ status: string }>('/health');
      return true;
    } catch {
      return false;
    }
  }
};
