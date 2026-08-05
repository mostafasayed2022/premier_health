"use client";

import { DoctorProfileDetails } from "@/lib/types";
import { PracticeDetails } from "./components/PracticeDetails";
import { LocationsAndLanguages } from "./components/LocationsAndLanguages";

interface DoctorOverviewProps {
  doctor: DoctorProfileDetails;
}

export function DoctorOverview({ doctor }: DoctorOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <PracticeDetails doctor={doctor} />
      <LocationsAndLanguages doctor={doctor} />
    </div>
  );
}
