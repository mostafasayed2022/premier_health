import React from "react";

export function HeroSkeleton() {
  return (
    <div className="w-full h-[60vh] min-h-[400px] bg-slate-100 animate-pulse relative overflow-hidden flex flex-col justify-center px-8 md:px-20">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-200/50 to-transparent" />
      
      <div className="relative z-10 flex flex-col gap-4 max-w-2xl">
        <div className="h-4 w-32 bg-slate-200 rounded-full" />
        <div className="h-12 md:h-16 w-3/4 bg-slate-200 rounded-xl" />
        <div className="h-12 md:h-16 w-1/2 bg-slate-200 rounded-xl" />
        
        <div className="h-4 w-full bg-slate-200 rounded-full mt-4" />
        <div className="h-4 w-5/6 bg-slate-200 rounded-full" />
        
        <div className="flex gap-4 mt-8">
          <div className="h-12 w-40 bg-slate-200 rounded-xl" />
          <div className="h-12 w-40 bg-slate-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
