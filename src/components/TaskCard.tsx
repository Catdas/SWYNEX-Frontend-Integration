import React from 'react';
import { Task, TaskPriority } from '../types';
import { ArrowRight, ArrowLeft, Trash2, Calendar } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onClick: (task: Task) => void;
  onMove: (taskId: string, direction: 'prev' | 'next') => void;
  onDelete: (taskId: string) => void;
  isUpdating?: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onClick,
  onMove,
  onDelete,
  isUpdating
}) => {
  const priorityColors: Record<TaskPriority, string> = {
    LOW: 'bg-slate-700/60 text-slate-300 border-slate-600',
    MEDIUM: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    HIGH: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    URGENT: 'bg-red-500/15 text-red-400 border-red-500/30'
  };

  return (
    <div
      onClick={() => onClick(task)}
      className={`group bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer space-y-3 relative overflow-hidden ${
        isUpdating ? 'opacity-50 pointer-events-none' : ''
      }`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-medium text-slate-400">
          SWYN-{task.taskNumber}
        </span>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      {/* Title */}
      <h4 className="text-sm font-semibold text-slate-100 line-clamp-2 group-hover:text-emerald-400 transition">
        {task.title}
      </h4>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-slate-400 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Metadata */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs text-slate-400">
        <div className="flex items-center space-x-2">
          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">
            {task.points} pts
          </span>
          {task.dueDate && (
            <div className="flex items-center space-x-1 text-[11px] text-slate-400">
              <Calendar className="h-3 w-3" />
              <span>{new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
            </div>
          )}
        </div>

        {task.assignee ? (
          <img
            src={task.assignee.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60'}
            alt={task.assignee.fullName}
            title={task.assignee.fullName}
            className="w-6 h-6 rounded-full border border-slate-700 object-cover"
          />
        ) : (
          <span className="text-[10px] text-slate-500 italic">Unassigned</span>
        )}
      </div>

      {/* Move / Action Buttons */}
      <div
        className="flex items-center justify-between pt-1 border-t border-slate-800/40"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onMove(task.id, 'prev')}
            title="Move back"
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition text-xs"
          >
            <ArrowLeft className="h-3 w-3" />
          </button>
          <button
            onClick={() => onMove(task.id, 'next')}
            title="Advance stage"
            className="p-1 rounded bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 hover:text-white transition text-xs"
          >
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <button
          onClick={() => onDelete(task.id)}
          title="Delete task"
          className="p-1 rounded hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};
