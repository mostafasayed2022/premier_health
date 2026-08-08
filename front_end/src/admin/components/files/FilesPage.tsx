"use client";
// admin/components/files/FilesPage.tsx
import React from "react";
import { Icon } from "../../lib/icons";
import { useDropzone } from "react-dropzone";
import { useFilesPage } from "./useFilesPage";
import { DropZone } from "./DropZone";
import { FilesPageHero } from "./FilesPageHero";
import { UploadQueueUI } from "./UploadQueueUI";
import { FilesTable } from "./FilesTable";

// ─── Files Page ────────────────────────────────────────────────────────────
export function FilesPage() {
  const {
    files,
    loading,
    uploading,
    deleting,
    search,
    setSearch,
    uploadQueue,
    setUploadQueue,
    handleUpload,
    handleDelete,
    filtered,
  } = useFilesPage();

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto relative font-sans">
      <FilesPageHero totalFiles={files.length} />

      <DropZone onFiles={handleUpload} uploading={uploading} />

      <UploadQueueUI
        uploadQueue={uploadQueue}
        setUploadQueue={setUploadQueue}
      />

      <div className="flex gap-2.5 mb-4 items-center mt-4">
        <div className="relative flex-1 max-w-sm">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none flex items-center">
            {Icon.search}
          </span>
          <input
            className="w-full pl-9 pr-3 py-2 bg-white border border-[#C8A96B]/15 rounded-xl text-slate-800 text-sm outline-none shadow-sm focus:border-[#C8A96B]/40 transition-colors"
            placeholder="Search files…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="p-12 flex items-center justify-center text-slate-500 text-sm">
          {Icon.spinner}
          <span className="ml-3 opacity-60">Loading files…</span>
        </div>
      ) : (
        <FilesTable
          filtered={filtered}
          search={search}
          deleting={deleting}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}
