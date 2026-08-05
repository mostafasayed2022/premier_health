// admin/components/image-picker/ProgressBar.tsx
"use client";
import React from "react";

interface ProgressBarProps {
  visible: boolean;
  progress: number;
}

export function ProgressBar({ visible, progress }: ProgressBarProps) {
  if (!visible) return null;

  return (
    <div className="w-28 h-1 bg-slate-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-[#C8A96B] rounded-full transition-all duration-200"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
