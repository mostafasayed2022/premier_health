// admin/components/image-picker/ImagePickerField.tsx
"use client";
import React, { useState } from "react";
import { useImagePicker, AdminFile } from "@/admin/hooks/useImagePicker";
import { ImagePreview } from "./ImagePreview";
import { UploadButton } from "./UploadButton";
import { ProgressBar } from "./ProgressBar";
import { FilePickerModal } from "./FilePickerModal";

interface ImagePickerFieldProps {
  value: number | null;
  initialImageUrl?: string | null;
  onChange: (fileId: number | null, previewUrl?: string) => void;
  onSelectMultiple?: (files: AdminFile[]) => void;
  multi?: boolean;
  isVideoField?: boolean;
}

export function ImagePickerField({
  value,
  initialImageUrl,
  onChange,
  onSelectMultiple,
  multi = false,
  isVideoField = false,
}: ImagePickerFieldProps) {
  const [isMultiMode, setIsMultiMode] = useState(false);

  const {
    uploading,
    progress,
    previewUrl,
    showFilePicker,
    libraryLoading,
    librarySearch,
    filteredLibrary,
    fileInputRef,
    setLibrarySearch,
    handleFileInputChange,
    triggerFileInput,
    openFilePicker,
    closeFilePicker,
    selectFromLibrary,
    handleRemove,
    isSelected,
  } = useImagePicker({ value, initialImageUrl, onChange, isVideoField });

  const handleOpenSingle = () => {
    setIsMultiMode(false);
    openFilePicker();
  };

  const handleOpenMulti = () => {
    setIsMultiMode(true);
    openFilePicker();
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Preview */}
      {previewUrl && (
        <ImagePreview previewUrl={previewUrl} onRemove={handleRemove} />
      )}

      {/* Buttons row */}
      <div className="flex items-center gap-2 flex-wrap">
        <input
          ref={fileInputRef}
          type="file"
          accept={isVideoField ? "video/*" : "image/*,video/*"}
          className="hidden"
          onChange={handleFileInputChange}
        />

        <UploadButton
          uploading={uploading}
          progress={progress}
          hasImage={!!previewUrl}
          onClick={triggerFileInput}
        />

        <button
          type="button"
          onClick={handleOpenSingle}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 text-xs font-medium hover:bg-slate-50 cursor-pointer transition-colors"
        >
          📁 Browse Single
        </button>

        {onSelectMultiple && (
          <button
            type="button"
            onClick={handleOpenMulti}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#C8A96B]/50 bg-[#F7F2EA] text-[#0F172A] text-xs font-bold hover:bg-[#C8A96B] hover:text-white cursor-pointer transition-colors"
          >
            ✨ Multi-Select (New Rows)
          </button>
        )}

        <ProgressBar visible={uploading} progress={progress} />
      </div>

      {/* Modal */}
      <FilePickerModal
        show={showFilePicker}
        search={librarySearch}
        loading={libraryLoading}
        files={filteredLibrary}
        selectedFileId={value}
        isSelected={isSelected}
        multi={isMultiMode || multi}
        onSearchChange={setLibrarySearch}
        onClose={closeFilePicker}
        onSelect={selectFromLibrary}
        onSelectMultiple={(files) => {
          if (onSelectMultiple) {
            onSelectMultiple(files);
          }
        }}
      />
    </div>
  );
}
