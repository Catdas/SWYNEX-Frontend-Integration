import React from 'react';

export const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-3.5 bg-slate-800 rounded w-16"></div>
        <div className="h-4 bg-slate-800 rounded-full w-12"></div>
      </div>
      <div className="space-y-1.5">
        <div className="h-4 bg-slate-800 rounded w-4/5"></div>
        <div className="h-3 bg-slate-800/60 rounded w-2/3"></div>
      </div>
      <div className="flex justify-between items-center pt-2 border-t border-slate-800/80">
        <div className="h-4 bg-slate-800 rounded w-12"></div>
        <div className="h-6 w-6 rounded-full bg-slate-800"></div>
      </div>
    </div>
  );
};

export const ColumnSkeleton: React.FC = () => {
  return (
    <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-4 flex flex-col space-y-3 min-w-[280px]">
      <div className="flex justify-between items-center pb-3 border-b border-slate-800">
        <div className="h-4 bg-slate-800 rounded w-24"></div>
        <div className="h-4 bg-slate-800 rounded-full w-8"></div>
      </div>
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
};

export const BoardSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <ColumnSkeleton />
      <ColumnSkeleton />
      <ColumnSkeleton />
      <ColumnSkeleton />
      <ColumnSkeleton />
    </div>
  );
};
