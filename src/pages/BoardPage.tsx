import React, { useState } from 'react';
import { Task, TaskPriority, TaskStatus, CreateTaskDTO } from '../types';
import { KanbanBoard } from '../components/KanbanBoard';
import { TaskModal } from '../components/TaskModal';
import { CreateTaskModal } from '../components/CreateTaskModal';
import { BoardSkeleton } from '../components/SkeletonLoader';
import { ErrorBanner } from '../components/ErrorBanner';
import { EmptyState } from '../components/EmptyState';
import { Search, Plus } from 'lucide-react';

interface BoardPageProps {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  onRefresh: () => void;
  onCreateTask: (dto: CreateTaskDTO) => Promise<void>;
  onMoveTask: (taskId: string, direction: 'prev' | 'next') => void;
  onUpdateStatus: (taskId: string, newStatus: TaskStatus) => void;
  onUpdatePriority: (taskId: string, newPriority: TaskPriority) => void;
  onDeleteTask: (taskId: string) => void;
}

export const BoardPage: React.FC<BoardPageProps> = ({
  tasks,
  isLoading,
  error,
  onRefresh,
  onCreateTask,
  onMoveTask,
  onUpdateStatus,
  onUpdatePriority,
  onDeleteTask
}) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('ALL');

  const filteredTasks = tasks.filter((t) => {
    const matchesPriority = filterPriority === 'ALL' || t.priority === filterPriority;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesPriority && matchesSearch;
  });

  const handleCreateSubmit = async (dto: CreateTaskDTO) => {
    setIsSubmitting(true);
    try {
      await onCreateTask(dto);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Error Banner when API call fails */}
      {error && (
        <ErrorBanner
          message={error}
          onRetry={onRefresh}
          isRetrying={isLoading}
        />
      )}

      {/* Board Controls Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Sprint Kanban Workflow</h2>
          <p className="text-xs text-slate-400">
            Real-Time Backend API Integration with Optimistic State Updates
          </p>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 sm:flex-initial">
            <Search className="h-3.5 w-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Filter tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 w-full sm:w-44 transition"
            />
          </div>

          {/* Priority Filter */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
          >
            <option value="ALL">All Priorities</option>
            <option value="URGENT">Urgent</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>

          {/* Create Task Button */}
          <button
            onClick={() => setIsCreateOpen(true)}
            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition shadow"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Main Board State: Loading Skeleton vs. Empty State vs. Kanban Board */}
      {isLoading && tasks.length === 0 ? (
        <BoardSkeleton />
      ) : filteredTasks.length === 0 ? (
        <EmptyState
          title={searchQuery || filterPriority !== 'ALL' ? 'No matching tasks' : 'Sprint board is empty'}
          description={
            searchQuery || filterPriority !== 'ALL'
              ? 'Try adjusting your search query or priority filters.'
              : 'Create your first task to begin tracking work in this sprint.'
          }
          onAction={() => setIsCreateOpen(true)}
        />
      ) : (
        <KanbanBoard
          tasks={filteredTasks}
          onTaskClick={(task) => setSelectedTask(task)}
          onMoveTask={onMoveTask}
          onDeleteTask={onDeleteTask}
          onOpenCreateModal={() => setIsCreateOpen(true)}
        />
      )}

      {/* Task Details Modal */}
      <TaskModal
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
        onUpdateStatus={onUpdateStatus}
        onUpdatePriority={onUpdatePriority}
      />

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreateSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};
