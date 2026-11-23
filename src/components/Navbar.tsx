import React from 'react';
import { Layers, UserCircle, RefreshCw, WifiOff } from 'lucide-react';

interface NavbarProps {
  isBackendConnected: boolean;
  onRefresh: () => void;
  isLoading: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isBackendConnected, onRefresh, isLoading }) => {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur px-6 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white shadow-lg shadow-emerald-500/20">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <span className="font-bold text-lg text-white tracking-tight">TaskFlow</span>
            <span className="text-xs ml-2 px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono border border-emerald-500/20">Task 3</span>
          </div>
        </div>

        {/* Live Backend Connection Badge */}
        <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full border text-xs font-medium">
          {isBackendConnected ? (
            <div className="flex items-center space-x-1.5 text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>API Connected (:5000)</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1.5 text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
              <WifiOff className="h-3 w-3" />
              <span>Offline / Local Cache Mode</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition disabled:opacity-50"
          title="Refresh Data from API"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </button>

        <div className="flex items-center space-x-3 pl-3 border-l border-slate-800">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-slate-200 leading-tight">Tharun M.</p>
            <p className="text-xs text-emerald-400">Frontend Integration Lead</p>
          </div>
          <div className="h-9 w-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
            <UserCircle className="h-6 w-6" />
          </div>
        </div>
      </div>
    </header>
  );
};
