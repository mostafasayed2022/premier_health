// admin/components/image-picker/ImagePreview.tsx
"use client";
import React from "react";
import Image from "next/image";

const VIDEO_EXTENSIONS = ["mp4", "mov", "webm", "avi", "mkv", "m4v", "ogv", "mp3", "ogg"];

/**
 * Detect whether a URL points to a video.
 *
 * Two strategies are used because Cloudinary public_ids sometimes omit
 * the file extension (e.g. ".../video/upload/uploads/1/my_video"):
 *
 *  1. Extension check — works for direct file URLs or Cloudinary URLs that
 *     include the extension (.mp4, .mov, etc.).
 *  2. Cloudinary path check — Cloudinary video URLs always contain
 *     "/video/upload/" in the path regardless of extension.
 */
function isVideoUrl(url: string): boolean {
  if (!url) return false;

  // 1. Extension check (strip query params first)
  const cleanUrl = url.split("?")[0];
  const ext = cleanUrl.split(".").pop()?.toLowerCase() || "";
  if (VIDEO_EXTENSIONS.includes(ext)) return true;

  // 2. Cloudinary resource-type path check
  if (url.includes("/video/upload/")) return true;

  return false;
}

interface ImagePreviewProps {
  previewUrl: string;
  onRemove: () => void;
}

export function ImagePreview({ previewUrl, onRemove }: ImagePreviewProps) {
  const isVideo = isVideoUrl(previewUrl);
  return (
    <div className="flex items-center gap-2">
      {isVideo ? (
        <video
          src={previewUrl}
          className="rounded-lg border border-black/10 bg-black"
          style={{ width: 80, height: 80, objectFit: "cover" }}
          controls={false}
          muted
          playsInline
        />
      ) : (
        <Image
          src={previewUrl}
          alt="Preview"
          width={80}
          height={80}
          className="rounded-lg object-cover border border-black/10"
          unoptimized
        />
      )}
      <button
        type="button"
        onClick={onRemove}
        className="bg-transparent border-none text-red-500 cursor-pointer text-sm underline"
      >
        Remove
      </button>
    </div>
  );
}
