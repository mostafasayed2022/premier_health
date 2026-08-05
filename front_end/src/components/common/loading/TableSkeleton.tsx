import React from "react";

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm animate-pulse">
      {/* Header */}
      <div className="h-14 bg-slate-50 border-b border-slate-100 px-6 flex items-center gap-4">
        <div className="h-4 bg-slate-200 rounded w-1/4" />
        <div className="h-4 bg-slate-200 rounded w-1/4" />
        <div className="h-4 bg-slate-200 rounded w-1/4" />
        <div className="h-4 bg-slate-200 rounded w-1/4" />
      </div>
      
      {/* Rows */}
      <div className="flex flex-col">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-16 border-b border-slate-50 px-6 flex items-center gap-4">
            <div className="h-4 bg-slate-100 rounded w-1/4" />
            <div className="h-4 bg-slate-100 rounded w-1/4" />
            <div className="h-4 bg-slate-100 rounded w-1/4" />
            <div className="h-4 bg-slate-100 rounded w-1/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
