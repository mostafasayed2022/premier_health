"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Camera, Edit3, Mail, Phone, MapPin, Star, Loader2, Stethoscope, User } from "lucide-react";
import { useFileUpload } from "@/lib/api/hooks";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────

interface ProfileHeaderProps {
  name: string;
  role: "patient" | "doctor";
  email: string;
  phone?: string;
  location?: string;
  avatar: string;
  badge?: string;
  rating?: number;
  patientsCount?: number;
  onEditClick?: () => void;
  onAvatarUpdate?: (newUrl: string, fileId?: number) => void;
  /**
   * Called after a successful file upload with the File's integer PK
   * and URL so the parent can PATCH `image_id` / `image` to the backend.
   */
  onFileUploaded?: (fileId: number, fileUrl: string) => void;
  /** Doctor-only legacy alias */
  onDoctorFileUploaded?: (fileId: number, fileUrl: string) => void;
}

// ─── Component ────────────────────────────────────────────────────────────

export function ProfileHeader({
  name,
  role,
  email,
  phone,
  location,
  avatar,
  badge,
  rating,
  onEditClick,
  onAvatarUpdate,
  onFileUploaded,
  onDoctorFileUploaded,
}: ProfileHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (avatar) {
      setPreviewUrl(null);
    }
  }, [avatar]);

  const fileUploadMutation = useFileUpload({
    onSuccess: (data) => {
      // Always update the UI immediately via the URL
      onAvatarUpdate?.(data.url, data.id);
      setUploadProgress(null);

      // Persist the File FK to backend (patient & doctor)
      if (onFileUploaded) {
        onFileUploaded(data.id, data.url);
      }
      if (onDoctorFileUploaded) {
        onDoctorFileUploaded(data.id, data.url);
      }
    },
    onError: (error) => {
      setUploadProgress(null);
      setPreviewUrl(null);
      toast.error(error.message || "Upload failed");
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file.");
      return;
    }

    // Instant local preview via Blob URL
    const localBlobUrl = URL.createObjectURL(file);
    setPreviewUrl(localBlobUrl);

    // Reset file input value so selecting the same file triggers change event again
    e.target.value = "";

    setUploadProgress(0);
    fileUploadMutation.mutate({
      file,
      onProgress: (percent) => setUploadProgress(percent),
    });
  };

  const isDoctor = role === "doctor";
  const displayAvatar =
    previewUrl ||
    avatar ||
    "/hero/hero1.webp";

  return (
    <div className="bg-white border border-[#e8e0d5] rounded-2xl overflow-hidden shadow-sm">
      {/* Top accent bar */}
      <div
        className="h-1.5 w-full"
        style={{
          background: "linear-gradient(to right, #385366, #c8a96b, #385366)",
        }}
      />

      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

          {/* ── Avatar ── */}
          <div className="relative shrink-0">
            <div
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2"
              style={{ borderColor: isDoctor ? "#c8a96b" : "#385366" }}
            >
              <Image
                src={displayAvatar}
                alt={name}
                fill
                unoptimized
                className="object-cover"
              />
              {uploadProgress !== null && (
                <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center text-white text-xs font-medium rounded-full">
                  <Loader2 className="w-5 h-5 animate-spin mb-1" />
                  <span>{uploadProgress}%</span>
                </div>
              )}
            </div>

            {/* Role indicator dot */}
            <span
              className="absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center"
              style={{ backgroundColor: isDoctor ? "#c8a96b" : "#385366" }}
            >
              {isDoctor
                ? <Stethoscope className="w-2 h-2 text-white" />
                : <User className="w-2 h-2 text-white" />
              }
            </span>

            {/* Upload button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={fileUploadMutation.isPending}
              title="Change photo"
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold text-white cursor-pointer transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#385366" }}
            >
              <Camera className="w-2.5 h-2.5" />
              Change
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* ── Info ── */}
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">

              {/* Name + badge */}
              <div className="space-y-1.5">
                {/* Role pill */}
                <span
                  className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: isDoctor ? "#fff8ee" : "#eef2f5",
                    color: isDoctor ? "#a38448" : "#385366",
                    border: `1px solid ${isDoctor ? "#e8d5a8" : "#c5d5df"}`,
                  }}
                >
                  {isDoctor ? <Stethoscope className="w-2.5 h-2.5" /> : <User className="w-2.5 h-2.5" />}
                  {role === "doctor" ? "Doctor" : "Patient"}
                </span>

                <h1 className="text-xl sm:text-2xl font-bold leading-tight" style={{ color: "#1e293b" }}>
                  {name}
                </h1>

                {badge && (
                  <p className="text-sm font-medium" style={{ color: "#998675" }}>
                    {badge}
                  </p>
                )}
              </div>

              {/* Edit button */}
              {onEditClick && (
                <button
                  onClick={onEditClick}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer transition-all hover:opacity-90 self-center sm:self-start shrink-0"
                  style={{ backgroundColor: "#385366" }}
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>

            {/* Contact info row */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-5 gap-y-2 mt-4 text-sm" style={{ color: "#959ead" }}>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: "#c8a96b" }} />
                {email}
              </span>
              {phone && (
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: "#c8a96b" }} />
                  {phone}
                </span>
              )}
              {location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: "#c8a96b" }} />
                  {location}
                </span>
              )}
              {isDoctor && rating && (
                <span className="flex items-center gap-1 font-semibold" style={{ color: "#c8a96b" }}>
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {rating} / 5.0
                </span>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
