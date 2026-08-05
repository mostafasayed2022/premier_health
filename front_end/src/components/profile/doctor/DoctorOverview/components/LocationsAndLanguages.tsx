import { DoctorProfileDetails } from "@/lib/types";
import { MapPin, Globe, CheckCircle } from "lucide-react";
import { SectionHeader } from "./DoctorOverviewSubcomponents";

interface LocationsAndLanguagesProps {
  doctor: DoctorProfileDetails;
}

export function LocationsAndLanguages({ doctor }: LocationsAndLanguagesProps) {
  return (
    <div className="space-y-4">
      {/* Branches */}
      <div className="bg-white border border-[#e8e0d5] rounded-2xl p-5 shadow-sm">
        <SectionHeader icon={MapPin} title="Practice Locations" />
        <div className="space-y-2">
          {doctor.branches?.map((branch) => (
            <div key={branch} className="flex items-center gap-2.5">
              <CheckCircle className="w-3.5 h-3.5 shrink-0" style={{ color: "#2d7a55" }} />
              <span className="text-sm font-medium" style={{ color: "#1e293b" }}>{branch}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="bg-white border border-[#e8e0d5] rounded-2xl p-5 shadow-sm">
        <SectionHeader icon={Globe} title="Languages" />
        <div className="flex flex-wrap gap-2">
          {doctor.languages?.map((lang) => (
            <span
              key={lang}
              className="px-3 py-1 rounded-lg text-xs font-semibold"
              style={{ backgroundColor: "#f7f2ea", color: "#998675" }}
            >
              {lang}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
