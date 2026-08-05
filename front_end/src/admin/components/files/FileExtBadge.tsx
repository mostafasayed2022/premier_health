import React from "react";

const FILE_EXT_COLORS: Record<string, string> = {
  pdf: "#f87171",
  doc: "#60a5fa",
  docx: "#60a5fa",
  xls: "#4ade80",
  xlsx: "#4ade80",
  csv: "#4ade80",
  png: "#c084fc",
  jpg: "#c084fc",
  jpeg: "#c084fc",
  gif: "#c084fc",
  webp: "#c084fc",
  svg: "#c084fc",
  mp4: "#fb923c",
  mp3: "#fb923c",
  mov: "#fb923c",
  zip: "#fbbf24",
  rar: "#fbbf24",
  "7z": "#fbbf24",
  txt: "#94a3b8",
  md: "#94a3b8",
};

export const FileExtBadge = React.memo(function FileExtBadge({ ext }: { ext?: string }) {
  const color = FILE_EXT_COLORS[ext?.toLowerCase() ?? ""] ?? "#64748b";
  return (
    <span
      className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider"
      style={{ backgroundColor: `${color}1a`, color }}
    >
      {ext || "file"}
    </span>
  );
});
