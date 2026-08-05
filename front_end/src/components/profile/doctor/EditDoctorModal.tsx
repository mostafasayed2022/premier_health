"use client";

import { useState } from "react";
import { DoctorProfileDetails } from "@/lib/types";
import { useUpdateDoctorProfile } from "@/lib/api/hooks";
import { Save, Loader2, Stethoscope } from "lucide-react";
import { toast } from "sonner";

interface EditDoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: DoctorProfileDetails;
}

export function EditDoctorModal({ isOpen, onClose, doctor }: EditDoctorModalProps) {
  const [firstName, setFirstName] = useState(doctor.firstName || "");
  const [lastName, setLastName] = useState(doctor.lastName || "");
  const [specialization, setSpecialization] = useState(
    doctor.specialization || doctor.specialty || ""
  );
  const [position, setPosition] = useState(doctor.position || "");
  const [licenseNumber, setLicenseNumber] = useState(doctor.licenseNumber || "");
  const [bio, setBio] = useState(doctor.bio || "");

  const updateMutation = useUpdateDoctorProfile({
    onSuccess: () => {
      toast.success("Doctor profile updated successfully!");
      onClose();
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update profile.");
    },
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({
      firstName,
      lastName,
      specialization,
      position,
      licenseNumber,
      bio,
    });
  };

  const inputCls =
    "w-full px-4 py-2.5 rounded-xl bg-background border border-input text-sm text-foreground outline-none focus:ring-2 focus:ring-[#c8a96b]/40";

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-xl bg-card rounded-3xl border border-border p-6 shadow-md space-y-6 my-8 animate-in fade-in zoom-in duration-200">

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div>
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Stethoscope className="w-5 h-5" style={{ color: "#c8a96b" }} />
              Edit Doctor Profile
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Update your professional information
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground text-sm font-semibold cursor-pointer"
          >
            &#x2715;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-1">
                First Name *
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={inputCls}
              />
            </div>
          </div>

          {/* Specialization & Position row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-1">
                Specialization
              </label>
              <input
                type="text"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                placeholder="e.g. Cardiology, Dermatology..."
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-1">
                Title / Position
              </label>
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="e.g. Senior Consultant, Chief Specialist..."
                className={inputCls}
              />
            </div>
          </div>

          {/* License Number */}
          <div>
            <label className="block text-xs font-semibold text-foreground/80 mb-1">
              License Number
            </label>
            <input
              type="text"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              placeholder="e.g. LIC-123456"
              className={inputCls}
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-semibold text-foreground/80 mb-1">
              Professional Bio
            </label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write a short professional biography..."
              className={`${inputCls} resize-none`}
            />
          </div>

          {/* Photo hint */}
          <p className="text-[11px] text-muted-foreground bg-muted/40 rounded-xl px-3 py-2 border border-border">
            To update your profile photo, use the <strong>camera button</strong> on
            your profile picture above.
          </p>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-medium text-xs shadow-md cursor-pointer disabled:opacity-50 transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#385366" }}
            >
              {updateMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
