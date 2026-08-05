// admin/components/image-picker/FilePickerModal.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";

export interface AdminFile {
  id: number;
  original_name: string;
  extension: string;
  size_display: string;
  url: string;
}

interface FilePickerModalProps {
  show: boolean;
  search: string;
  loading: boolean;
  files: AdminFile[];
  selectedFileId?: number | null;
  isSelected?: (fileId: number) => boolean;
  multi?: boolean;
  onSearchChange: (value: string) => void;
  onClose: () => void;
  onSelect: (file: AdminFile) => void;
  onSelectMultiple?: (files: AdminFile[]) => void;
}

export function FilePickerModal({
  show,
  search,
  loading,
  files,
  selectedFileId,
  isSelected,
  multi = false,
  onSearchChange,
  onClose,
  onSelect,
  onSelectMultiple,
}: FilePickerModalProps) {
  const [multiSelected, setMultiSelected] = useState<AdminFile[]>([]);

  if (!show) return null;

  const toggleMultiSelect = (file: AdminFile) => {
    setMultiSelected((prev) => {
      const exists = prev.some((f) => f.id === file.id);
      if (exists) return prev.filter((f) => f.id !== file.id);
      return [...prev, file];
    });
  };

  const isMultiSelected = (fileId: number) => {
    return multiSelected.some((f) => f.id === fileId);
  };

  const handleConfirmMulti = () => {
    if (onSelectMultiple && multiSelected.length > 0) {
      onSelectMultiple(multiSelected);
      setMultiSelected([]);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999] p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-medium text-[#1F3D5A] m-0">
              {multi ? "Select Multiple Files (Multi-Row Entry)" : "Select a File"}
            </h3>
            {multi && (
              <p className="text-xs text-slate-500 m-0 mt-0.5">
                Selecting multiple items will automatically create a distinct row record for each file.
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="bg-transparent border-none text-2xl cursor-pointer text-slate-500 px-2 py-1 leading-none"
          >
            ✕
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-3 border-b border-slate-100 flex items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Search media files…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#C8A96B] transition-colors"
          />
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-auto p-4">
          {loading ? (
            <div className="text-center py-10 text-slate-400">
              Loading files…
            </div>
          ) : files.length === 0 ? (
            <div className="text-center py-10 text-slate-400">
              {search ? "No files match your search" : "No files uploaded yet"}
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-3">
              {files.map((file) => {
                const checked = multi
                  ? isMultiSelected(file.id)
                  : isSelected
                  ? isSelected(file.id)
                  : selectedFileId === file.id;

                return (
                  <FileCard
                    key={file.id}
                    file={file}
                    selected={checked}
                    onSelect={(f) => {
                      if (multi) {
                        toggleMultiSelect(f);
                      } else {
                        onSelect(f);
                      }
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Footer for Multi-select */}
        {multi && (
          <div className="flex items-center justify-between px-6 py-3 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
            <span className="text-xs font-semibold text-slate-600">
              {multiSelected.length} file(s) selected
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmMulti}
                disabled={multiSelected.length === 0}
                className="px-4 py-2 text-xs font-bold text-slate-900 bg-[#C8A96B] hover:bg-[#B59351] disabled:opacity-40 rounded-lg transition-colors shadow-sm"
              >
                Add {multiSelected.length} Records (Separate Rows)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── File Card Sub-component ────────────────────────────────────
interface FileCardProps {
  file: AdminFile;
  selected: boolean;
  onSelect: (file: AdminFile) => void;
}

function FileCard({ file, selected, onSelect }: FileCardProps) {
  const isVideo = ["mp4", "mov", "webm", "avi", "mkv"].includes(
    file.extension?.toLowerCase()
  );

  return (
    <div
      onClick={() => onSelect(file)}
      className={`cursor-pointer rounded-xl overflow-hidden text-center p-2 transition-all duration-150 relative ${
        selected
          ? "border-2 border-[#C8A96B] bg-[#F7F2EA]"
          : "border border-slate-200 bg-white hover:border-[#C8A96B]"
      }`}
    >
      {isVideo ? (
        <div className="w-full h-[90px] bg-slate-900 rounded-lg mb-1.5 flex flex-col items-center justify-center text-white p-1">
          <span className="text-xl">🎬</span>
          <span className="text-[9px] text-slate-300 font-mono uppercase mt-1">
            {file.extension}
          </span>
        </div>
      ) : (
        <Image
          src={file.url}
          alt={file.original_name}
          width={130}
          height={90}
          className="w-full h-[90px] object-cover rounded-lg mb-1.5"
          unoptimized
        />
      )}
      <div
        className={`text-[11px] text-slate-700 truncate ${
          selected ? "font-bold" : ""
        }`}
      >
        {file.original_name}
      </div>
      <div className="text-[10px] text-slate-400">{file.size_display}</div>
      {selected && (
        <div className="text-[10px] text-[#C8A96B] font-bold mt-0.5">
          ✓ Selected
        </div>
      )}
    </div>
  );
}
