import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorBannerProps {
  message: string;
  onRetry?: () => void;
  isRetrying?: boolean;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ message, onRetry, isRetrying }) => {
  return (
    <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm shadow-lg">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-xl bg-red-500/10 text-red-400 shrink-0 border border-red-500/20">
          <AlertCircle className="h-5 w-5" />
        </div>
        <div>
          <h4 className="font-semibold text-red-200">API Communication Error</h4>
          <p className="text-xs text-red-300/80 mt-0.5">{message}</p>
        </div>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          disabled={isRetrying}
          className="px-4 py-2 rounded-xl bg-red-600/30 hover:bg-red-600/50 text-red-200 border border-red-500/40 text-xs font-semibold flex items-center space-x-2 transition self-end sm:self-auto disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isRetrying ? 'animate-spin' : ''}`} />
          <span>{isRetrying ? 'Connecting...' : 'Retry Connection'}</span>
        </button>
      )}
    </div>
  );
};
