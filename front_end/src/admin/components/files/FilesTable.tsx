import React from "react";
import { Icon } from "../../lib/icons";
import { FileExtBadge } from "./FileExtBadge";
import type { AdminFile } from "./useFilesPage";

interface FilesTableProps {
  filtered: AdminFile[];
  search: string;
  deleting: number | null;
  handleDelete: (file: AdminFile) => void;
}

export const FilesTable = React.memo(function FilesTable({
  filtered,
  search,
  deleting,
  handleDelete,
}: FilesTableProps) {
  return (
    <div className="bg-white border border-[#C8A96B]/15 rounded-2xl overflow-hidden shadow-sm">
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr className="border-b border-[#C8A96B]/15 bg-[#F7F2EA]">
            <th className="px-4.5 py-3.5 text-left text-slate-500 text-[11px] font-bold tracking-wider uppercase">
              Name
            </th>
            <th className="px-4.5 py-3.5 text-left text-slate-500 text-[11px] font-bold tracking-wider uppercase">
              Type
            </th>
            <th className="px-4.5 py-3.5 text-left text-slate-500 text-[11px] font-bold tracking-wider uppercase">
              Size
            </th>
            <th className="px-4.5 py-3.5 text-left text-slate-500 text-[11px] font-bold tracking-wider uppercase">
              Uploaded
            </th>
            <th className="px-4.5 py-3.5 text-slate-500 text-[11px] font-bold tracking-wider uppercase w-[100px] text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="p-12 text-center text-slate-400 italic"
              >
                {search
                  ? "No files match your search"
                  : "No files uploaded yet"}
              </td>
            </tr>
          )}
          {filtered.map((file) => (
            <tr
              key={file.id}
              className="hover:bg-slate-50/50 transition-colors border-b border-[#C8A96B]/8"
            >
              <td className="px-4.5 py-3.5 text-slate-800 align-middle">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 flex">{Icon.file}</span>
                  <span className="text-slate-800 font-medium truncate max-w-xs">
                    {file.original_name}
                  </span>
                </div>
              </td>
              <td className="px-4.5 py-3.5 text-slate-800 align-middle">
                <FileExtBadge ext={file.extension} />
              </td>
              <td className="px-4.5 py-3.5 text-slate-500 align-middle font-mono text-xs opacity-80">
                {file.size_display}
              </td>
              <td className="px-4.5 py-3.5 text-slate-500 align-middle font-mono text-xs opacity-80">
                {new Date(file.created_at).toLocaleString("en-GB")}
              </td>
              <td className="px-4.5 py-3.5 text-slate-800 align-middle text-right">
                <a
                  href={file.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center border border-[#C8A96B]/15 rounded-lg p-2 text-slate-500 cursor-pointer ml-1 transition-all duration-150 hover:bg-slate-50 hover:border-[#C8A96B]/30"
                  title="Download"
                >
                  {Icon.download}
                </a>
                <button
                  className="inline-flex items-center justify-center border border-red-200 rounded-lg p-2 text-red-600 cursor-pointer ml-1 transition-all duration-150 hover:bg-red-50/50 disabled:opacity-50 disabled:pointer-events-none"
                  onClick={() => handleDelete(file)}
                  disabled={deleting === file.id}
                  title="Delete"
                >
                  {deleting === file.id ? Icon.spinner : Icon.trash}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
