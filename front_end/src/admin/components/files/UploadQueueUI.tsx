import React from "react";
import Image from "next/image";
import type { UploadQueueItem } from "./useFilesPage";

interface UploadQueueUIProps {
  uploadQueue: UploadQueueItem[];
  setUploadQueue: (queue: UploadQueueItem[]) => void;
}

export const UploadQueueUI = React.memo(function UploadQueueUI({ uploadQueue, setUploadQueue }: UploadQueueUIProps) {
  if (uploadQueue.length === 0) return null;

  return (
    <div className="bg-white border border-[#C8A96B]/15 rounded-2xl p-4 md:px-5 mt-5 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#1F3D5A] m-0">
          Upload Queue (
          {uploadQueue.filter((x) => x.status === "uploading").length}{" "}
          uploading)
        </h3>
        <button
          onClick={() => setUploadQueue([])}
          className="bg-none border-none text-[#C8A96B] text-[11px] font-bold cursor-pointer hover:opacity-80 transition-opacity"
        >
          Clear Queue
        </button>
      </div>
      <div className="flex flex-col gap-3 max-h-[260px] overflow-y-auto">
        {uploadQueue.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-2 border border-slate-100 rounded-xl"
          >
            {item.previewUrl ? (
              <Image
                src={item.previewUrl}
                alt={item.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-lg object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-xl">
                📄
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-slate-800 truncate max-w-[280px]">
                  {item.name}
                </span>
                <span className="text-[10px] text-slate-500">
                  {(item.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
                <div
                  className="h-full transition-all duration-300 ease-in-out"
                  style={{
                    width: `${item.progress}%`,
                    backgroundColor:
                      item.status === "error"
                        ? "#EF4444"
                        : item.status === "success"
                          ? "#10B981"
                          : "#C8A96B",
                  }}
                />
              </div>

              <div className="flex justify-between text-[10px] mt-1">
                <span
                  className={`font-bold ${
                    item.status === "error"
                      ? "text-red-500"
                      : item.status === "success"
                        ? "text-emerald-500"
                        : "text-slate-500"
                  }`}
                >
                  {item.status === "uploading"
                    ? `Uploading... ${item.progress}%`
                    : item.status === "success"
                      ? "Success"
                      : `Failed: ${item.errorMessage}`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
