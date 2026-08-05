// admin/components/image-picker/UploadButton.tsx
"use client";
import React from "react";
import { Icon } from "@/admin/lib/icons";

interface UploadButtonProps {
  uploading: boolean;
  progress: number;
  hasImage: boolean;
  onClick: () => void;
}

export function UploadButton({
  uploading,
  progress,
  hasImage,
  onClick,
}: UploadButtonProps) {
  return (
    <button
      type="button"
      disabled={uploading}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
        uploading
          ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
          : "bg-white text-[#C8A96B] border-[#C8A96B] hover:bg-[#F7F2EA] cursor-pointer"
      }`}
    >
      {uploading ? (
        <>
          {Icon.spinner} Uploading… {progress}%
        </>
      ) : (
        <>
          {Icon.upload} {hasImage ? "Change Image" : "Upload Image"}
        </>
      )}
    </button>
  );
}
