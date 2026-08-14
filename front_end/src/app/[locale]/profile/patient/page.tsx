"use client";

import { useState } from "react";
import { usePatientProfile, useUpdatePatientProfile } from "@/lib/api/hooks";
import { ProfileHeader } from "@/components/profile/shared/ProfileHeader";
import { ProfileStats } from "@/components/profile/shared/ProfileStats";
import { ProfileTabs, TabItem } from "@/components/profile/shared/ProfileTabs";
import { PatientOverview } from "@/components/profile/patient/PatientOverview";
import { PatientAppointments } from "@/components/profile/patient/PatientAppointments";
import { EditPatientModal } from "@/components/profile/patient/EditPatientModal";
import { User, Calendar, Loader2 } from "lucide-react";

export default function PatientProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data: patient, isLoading } = usePatientProfile();
  const updatePatientMutation = useUpdatePatientProfile();

  const handleFileUploaded = (fileId: number, fileUrl: string) => {
    updatePatientMutation.mutate({ imageId: fileId, avatar: fileUrl });
  };

  const handleAvatarUpdate = (newUrl: string, fileId?: number) => {
    if (fileId) {
      handleFileUploaded(fileId, newUrl);
    }
  };

  const tabs: TabItem[] = [
    { id: "overview", label: "Overview", icon: User },
    { id: "appointments", label: "Appointments", icon: Calendar },
  ];

  if (isLoading || !patient) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mb-3" />
        <p className="text-sm font-medium text-muted-foreground">Loading Patient Profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <ProfileHeader
          name={patient.fullName}
          role="patient"
          email={patient.email}
          phone={patient.phone}
          avatar={patient.avatar || ""}
          badge="Premier Health Elite Patient"
          onEditClick={() => setIsEditModalOpen(true)}
          onAvatarUpdate={handleAvatarUpdate}
          onFileUploaded={handleFileUploaded}
        />

        <ProfileStats
          role="patient"
          stats={{
            totalAppointments: patient.totalAppointments,
            completedVisits: patient.completedVisits,
          }}
        />

        <div className="space-y-6">
          <ProfileTabs tabs={tabs} activeTab={activeTab} onChange={(tabId) => setActiveTab(tabId)} />

          {activeTab === "overview" && <PatientOverview patient={patient} />}
          {activeTab === "appointments" && <PatientAppointments />}
        </div>

        <EditPatientModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          patient={patient}
        />
      </div>
    </div>
  );
}
