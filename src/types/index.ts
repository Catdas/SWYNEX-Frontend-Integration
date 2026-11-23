export type TaskStatus = 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';

export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface User {
  id: string;
  fullName: string;
  email: string;
  role?: string;
  avatarUrl?: string;
}

export interface Project {
  id: string;
  name: string;
  key: string;
}

export interface Task {
  id: string;
  projectId: string;
  taskNumber: number;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  points: number;
  position: number;
  reporter?: User;
  assignee?: User | null;
  dueDate?: string | null;
  createdAt?: string;
  updatedAt?: string;
  project?: Project;
}

export interface CreateTaskDTO {
  title: string;
  description?: string;
  priority: TaskPriority;
  status?: TaskStatus;
  points?: number;
  assigneeId?: string | null;
  dueDate?: string | null;
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string | null;
  status?: TaskStatus;
  priority?: TaskPriority;
  points?: number;
  assigneeId?: string | null;
  dueDate?: string | null;
}

export interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  search?: string;
  page?: number;
  limit?: number;
}

export interface ApiMeta {
  total: number;
  page: number;
  limit: number;
  totalPages?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: ApiMeta;
  message?: string;
  error?: string;
  details?: Array<{ field: string; message: string }>;
}

export type NetworkStatus = 'CONNECTED' | 'DISCONNECTED' | 'CONNECTING';
