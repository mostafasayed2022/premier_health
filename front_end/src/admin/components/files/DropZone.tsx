import React from "react";
import { Icon } from "../../lib/icons";
import { useDropzone } from "react-dropzone";

interface DropZoneProps {
  onFiles: (files: File[]) => void;
  uploading: boolean;
}

export const DropZone = React.memo(function DropZone({
  onFiles,
  uploading,
}: DropZoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length) {
        onFiles(acceptedFiles);
      }
    },
    disabled: uploading,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 bg-[#FAF9F6] mb-4 ${
        isDragActive ? "border-[#C8A96B] bg-[#C8A96B]/5" : "border-[#C8A96B]/25"
      } ${uploading ? "opacity-50 pointer-events-none" : ""}`}
    >
      <input {...getInputProps()} />
      <div className="text-[#C8A96B] opacity-80 mb-2 flex justify-center scale-125">
        {uploading ? Icon.spinner : Icon.upload}
      </div>
      <div className="text-sm font-medium text-slate-500 mb-1">
        {uploading ? "Uploading…" : "Drop files here or click to browse"}
      </div>
      <div className="text-xs text-slate-400">
        Any file type · Multiple files supported
      </div>
    </div>
  );
});
