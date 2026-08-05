"use client";

import { useState } from "react";
import { PatientProfile, UpdatePatientPayload } from "@/lib/types";
import { useUpdatePatientProfile } from "@/lib/api/hooks";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface EditPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: PatientProfile;
}

export function EditPatientModal({
  isOpen,
  onClose,
  patient,
}: EditPatientModalProps) {
  const [firstName, setFirstName] = useState(patient.firstName || "");
  const [lastName, setLastName] = useState(patient.lastName || "");
  const [phone, setPhone] = useState(patient.phone || "");
  const [dateOfBirth, setDateOfBirth] = useState(patient.dateOfBirth || "");
  const [gender, setGender] = useState<UpdatePatientPayload["gender"]>(
    (patient.gender as any) || "female",
  );

  const updateMutation = useUpdatePatientProfile({
    onSuccess: () => {
      toast.success("Patient profile updated successfully!");
      onClose();
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update profile.");
    },
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: UpdatePatientPayload = {
      firstName,
      lastName,
      phone,
      dateOfBirth,
      gender,
    };

    updateMutation.mutate(payload);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-card rounded-3xl border border-border p-6 shadow-md space-y-6 my-8 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div>
            <h3 className="text-xl font-bold text-foreground">
              Edit Patient Profile
            </h3>
            <p className="text-xs text-muted-foreground">
              Update your personal and emergency details
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground text-sm font-semibold cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-input text-sm text-foreground focus:ring-2 focus:ring-emerald-500/40"
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
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-input text-sm text-foreground focus:ring-2 focus:ring-emerald-500/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-input text-sm text-foreground focus:ring-2 focus:ring-emerald-500/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-input text-sm text-foreground focus:ring-2 focus:ring-emerald-500/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-1">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-input text-sm text-foreground focus:ring-2 focus:ring-emerald-500/40"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-md cursor-pointer disabled:opacity-50"
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
