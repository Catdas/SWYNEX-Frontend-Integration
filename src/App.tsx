import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { BoardPage } from './pages/BoardPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ApiDocsPage } from './pages/ApiDocsPage';
import { ToastContainer } from './components/Toast';
import { useTasks } from './hooks/useTasks';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('board');
  const {
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
  } = useTasks();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar
        isBackendConnected={isBackendConnected}
        onRefresh={() => fetchTasks()}
        isLoading={isLoading}
      />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-900/30">
          <div className="max-w-7xl mx-auto">
            {currentTab === 'board' && (
              <BoardPage
                tasks={tasks}
                isLoading={isLoading}
                error={error}
                onRefresh={() => fetchTasks()}
                onCreateTask={createTask}
                onMoveTask={moveTask}
                onUpdateStatus={updateTaskStatus}
                onUpdatePriority={updateTaskPriority}
                onDeleteTask={deleteTask}
              />
            )}

            {currentTab === 'analytics' && <AnalyticsPage tasks={tasks} />}

            {currentTab === 'api-docs' && <ApiDocsPage />}
          </div>
        </main>
      </div>

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
};

export default App;
