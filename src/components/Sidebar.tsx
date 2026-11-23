import React from 'react';
import { Kanban, BarChart3, ShieldCheck, FolderKanban } from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, setCurrentTab }) => {
  const menuItems = [
    { id: 'board', label: 'Kanban Board', icon: Kanban },
    { id: 'analytics', label: 'Sprint Analytics', icon: BarChart3 },
    { id: 'api-docs', label: 'API Integration Info', icon: ShieldCheck }
  ];

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950/40 p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">Workspace</p>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? 'bg-emerald-600/15 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div>
          <div className="flex items-center justify-between px-3 mb-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Sprint</p>
            <FolderKanban className="h-3.5 w-3.5 text-slate-500" />
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-xs font-mono text-emerald-400">SWYN Sprint 2</span>
            <p className="text-xs text-slate-300 font-medium">Frontend & API Sync</p>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800/80">
        <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
          <p className="text-slate-300 font-semibold mb-1">SWYNEX Internship</p>
          <p className="text-slate-400">Task 3: Frontend Integration</p>
          <div className="mt-2 text-emerald-400 flex items-center space-x-1 font-mono">
            <span>Author: Tharun M.</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
