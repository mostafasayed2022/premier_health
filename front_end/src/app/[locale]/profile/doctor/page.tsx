"use client";

import { useState } from "react";
import { useMyDoctorProfile, useUpdateDoctorProfile } from "@/lib/api/hooks";
import { ProfileHeader } from "@/components/profile/shared/ProfileHeader";
import { ProfileStats } from "@/components/profile/shared/ProfileStats";
import { ProfileTabs, TabItem } from "@/components/profile/shared/ProfileTabs";
import { DoctorOverview } from "@/components/profile/doctor/DoctorOverview/DoctorOverview";
import { DoctorScheduleManager } from "@/components/profile/doctor/DoctorScheduleManager/DoctorScheduleManager";
import { Stethoscope, Clock, Loader2, User, Calendar } from "lucide-react";

export default function DoctorProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");

  const { data: doctor, isLoading, error } = useMyDoctorProfile();
  const updateDoctorMutation = useUpdateDoctorProfile();

  const handleAvatarUpdate = (newUrl: string) => {
    updateDoctorMutation.mutate({ photo: newUrl });
  };

  const tabs: TabItem[] = [
    { id: "overview", label: "Doctor Bio", icon: User },
    { id: "schedule", label: "Schedule Manager", icon: Calendar },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mb-3" />
        <p className="text-sm font-medium text-muted-foreground">
          Loading Doctor Profile...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <p className="text-lg font-bold text-red-500">Failed to load profile</p>
        <p className="text-sm text-gray-500">{error.message}</p>
      </div>
    );
  }

  if (!doctor) return null;


  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <ProfileHeader
          name={doctor.name}
          role="doctor"
          email={doctor.email}
          phone={doctor.phone || ""}
          location={doctor.branches?.[0] || ""}
          avatar={doctor.photo || ""}
          badge={doctor.specialty}
          rating={doctor.rating}
          patientsCount={doctor.patientsTreated}
          onAvatarUpdate={handleAvatarUpdate}
        />

        <ProfileStats
          role="doctor"
          stats={{
            patientsTreated: doctor.patientsTreated,
            rating: doctor.rating,
            experienceYears: doctor.experienceYears,
            availabilitySlots: doctor.availability?.length || 5,
          }}
        />

        <div className="space-y-6">
          <ProfileTabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={(tabId) => setActiveTab(tabId)}
          />

          {activeTab === "overview" && <DoctorOverview doctor={doctor} />}
          {activeTab === "schedule" && (
            <DoctorScheduleManager
              initialSlots={doctor.availability}
              onSave={(slots) =>
                updateDoctorMutation.mutate({ availability: slots })
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
