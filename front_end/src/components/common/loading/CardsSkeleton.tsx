import React from "react";

export function CardsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-pulse">
          {/* Card Image Skeleton */}
          <div className="h-48 bg-slate-100 w-full" />
          
          {/* Card Content Skeleton */}
          <div className="p-6 flex flex-col gap-4">
            <div className="h-6 bg-slate-100 rounded-md w-3/4" />
            <div className="space-y-2">
              <div className="h-4 bg-slate-100 rounded-md w-full" />
              <div className="h-4 bg-slate-100 rounded-md w-5/6" />
            </div>
            
            <div className="flex items-center gap-3 mt-4">
              <div className="w-10 h-10 rounded-full bg-slate-100" />
              <div className="flex flex-col gap-2 w-full">
                <div className="h-3 bg-slate-100 rounded-md w-1/2" />
                <div className="h-3 bg-slate-100 rounded-md w-1/3" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
