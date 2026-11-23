import React from 'react';
import { Kanban, Plus } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onAction?: () => void;
  actionText?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No tasks found',
  description = 'No issues match the selected filter criteria or sprint milestone.',
  onAction,
  actionText = 'Create New Task'
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/20">
      <div className="p-4 rounded-2xl bg-slate-800/50 text-slate-400 mb-4 border border-slate-700/50">
        <Kanban className="h-8 w-8 text-slate-400" />
      </div>
      <h3 className="text-base font-semibold text-white mb-1">{title}</h3>
      <p className="text-xs text-slate-400 max-w-sm mb-6">{description}</p>
      {onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center space-x-1.5 transition shadow"
        >
          <Plus className="h-4 w-4" />
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
};
