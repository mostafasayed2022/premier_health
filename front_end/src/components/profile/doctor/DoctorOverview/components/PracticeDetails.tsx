import { DoctorProfileDetails } from "@/lib/types";
import { Stethoscope } from "lucide-react";
import { SectionHeader, InfoRow } from "./DoctorOverviewSubcomponents";

interface PracticeDetailsProps {
  doctor: DoctorProfileDetails;
}

export function PracticeDetails({ doctor }: PracticeDetailsProps) {
  return (
    <div className="md:col-span-2 bg-white border border-[#e8e0d5] rounded-2xl p-6 shadow-sm space-y-5">
      <SectionHeader icon={Stethoscope} title="Practice & Clinical Bio" />

      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        <InfoRow label="Specialty" value={doctor.specialty} />
        <InfoRow label="Title / Position" value={doctor.position} />
        <InfoRow label="License Number" value={doctor.licenseNumber ?? "DHA-LIC-2024-09881"} />
      </div>

      {/* Biography */}
      <div className="space-y-1.5">
        <span className="text-xs text-[#959ead] font-medium">Biography</span>
        <p
          className="text-sm leading-relaxed p-4 rounded-xl"
          style={{ backgroundColor: "#f7f2ea", color: "#4a5568" }}
        >
          {doctor.bio}
        </p>
      </div>
    </div>
  );
}
