"use client";

import { PatientProfile } from "@/lib/types";
import { User, Phone, Heart } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────

interface PatientOverviewProps {
  patient: PatientProfile;
}

// ─── Sub-components ───────────────────────────────────────────────────────

interface InfoRowProps {
  label: string;
  value?: string;
}
function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="space-y-0.5">
      <span className="text-xs text-[#959ead] font-medium">{label}</span>
      <p className="text-sm font-semibold" style={{ color: "#1e293b" }}>
        {value ?? "—"}
      </p>
    </div>
  );
}

interface SectionHeaderProps {
  icon: React.ElementType;
  title: string;
  iconBg?: string;
  iconColor?: string;
}
function SectionHeader({
  icon: Icon,
  title,
  iconBg = "#eef2f5",
  iconColor = "#385366",
}: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-[#e8e0d5]">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: iconBg }}
      >
        <Icon className="w-4 h-4" style={{ color: iconColor }} />
      </div>
      <h3 className="text-sm font-bold" style={{ color: "#1e293b" }}>
        {title}
      </h3>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────

export function PatientOverview({ patient }: PatientOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* ── Personal Information ── */}
      <div className="bg-white border border-[#e8e0d5] rounded-2xl p-6 shadow-sm">
        <SectionHeader icon={User} title="Personal Information" />

        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <InfoRow label="Full Name" value={patient.fullName} />
          <InfoRow
            label="Date of Birth"
            value={patient.dateOfBirth ?? "1992-06-15"}
          />
          <InfoRow label="Gender" value={patient.gender} />

          {/* Blood Type — special color */}
          {/* <div className="space-y-0.5">
            <span className="text-xs text-[#959ead] font-medium">Blood Type</span>
            <p className="text-sm font-bold" style={{ color: "#c0392b" }}>
              {patient.bloodType ?? "A+"}
            </p>
          </div> */}

          {/* <div className="col-span-2">
            <InfoRow label="Address" value={patient.address} />
          </div> */}
        </div>
      </div>

      {/* ── Right column ── */}
      <div className="space-y-4">
        {/* Medical History & Allergies */}
        <div className="bg-white border border-[#e8e0d5] rounded-2xl p-6 shadow-sm">
          <SectionHeader
            icon={Heart}
            title="Medical History & Allergies"
            iconBg="#fdf0f0"
            iconColor="#c0392b"
          />

          <div className="space-y-4">
            {/* Allergies */}
            {/* <div>
              <span className="text-xs text-[#959ead] font-medium block mb-2">
                Allergies
              </span>
              {patient.allergies && patient.allergies.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {patient.allergies.map((allergy) => (
                    <span
                      key={allergy}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold"
                      style={{
                        backgroundColor: "#fdf0f0",
                        color: "#c0392b",
                        border: "1px solid #f5c6cb",
                      }}
                    >
                      <AlertTriangle className="w-2.5 h-2.5" />
                      {allergy}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-sm italic" style={{ color: "#b0bec5" }}>
                  None listed
                </span>
              )}
            </div> */}

            {/* Medical History Summary */}
            <div>
              <span className="text-xs text-[#959ead] font-medium block mb-1.5">
                Summary
              </span>
              <p
                className="text-sm leading-relaxed p-3.5 rounded-xl"
                style={{ backgroundColor: "#f7f2ea", color: "#4a5568" }}
              >
                {patient.medicalHistory || "No critical conditions reported."}
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div
          className="flex items-center gap-4 p-4 rounded-2xl border"
          style={{ backgroundColor: "#fff8ee", borderColor: "#e8d5a8" }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: "#ffefcc" }}
          >
            <Phone className="w-4 h-4" style={{ color: "#a38448" }} />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-xs text-[#b09e8f] font-medium block">
              Emergency Contact
            </span>
            <span className="text-sm font-bold" style={{ color: "#1e293b" }}>
              {patient.emergencyContactName ?? "Tariq Al-Mansoor"}
            </span>
          </div>
          <span
            className="text-sm font-semibold shrink-0"
            style={{ color: "#a38448" }}
          >
            {patient.emergencyContactPhone ?? "+971 50 112 3344"}
          </span>
        </div>
      </div>
    </div>
  );
}
