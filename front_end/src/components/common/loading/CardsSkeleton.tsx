import React from "react";

export function CardsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col bg-white rounded-3xl border border-accent/15 overflow-hidden animate-pulse min-h-[420px]"
        >
          {/* Card Image Skeleton matching h-60 */}
          <div className="h-60 bg-slate-200/70 w-full" />

          {/* Card Content Skeleton matching p-7 */}
          <div className="p-7 flex flex-col justify-between flex-1 gap-4">
            <div className="space-y-3">
              <div className="h-6 bg-slate-200/70 rounded-md w-3/4" />
              <div className="h-4 bg-slate-200/70 rounded-md w-full" />
              <div className="h-4 bg-slate-200/70 rounded-md w-5/6" />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
              <div className="h-5 bg-slate-200/70 rounded-md w-1/4" />
              <div className="w-9 h-9 rounded-full bg-slate-200/70 shrink-0" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
