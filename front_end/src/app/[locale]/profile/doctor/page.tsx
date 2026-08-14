"use client";

import { useState } from "react";
import { useMyDoctorProfile, useUpdateDoctorProfile } from "@/lib/api/hooks";
import { ProfileHeader } from "@/components/profile/shared/ProfileHeader";
import { ProfileStats } from "@/components/profile/shared/ProfileStats";
import { ProfileTabs, TabItem } from "@/components/profile/shared/ProfileTabs";
import { DoctorOverview } from "@/components/profile/doctor/DoctorOverview/DoctorOverview";
import { DoctorScheduleManager } from "@/components/profile/doctor/DoctorScheduleManager/DoctorScheduleManager";
import { DoctorAppointments } from "@/components/profile/doctor/DoctorAppointments/DoctorAppointments";
import { EditDoctorModal } from "@/components/profile/doctor/EditDoctorModal";
import { Stethoscope, Clock, Loader2, Calendar } from "lucide-react";
import { T } from "@/i18n/T";

export default function DoctorProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data: doctor, isLoading, error } = useMyDoctorProfile();
  const updateDoctorMutation = useUpdateDoctorProfile();

  const handleFileUploaded = (fileId: number, fileUrl: string) => {
    updateDoctorMutation.mutate({ imageId: fileId, photo: fileUrl });
  };

  const handleAvatarUpdate = (newUrl: string, fileId?: number) => {
    if (fileId) {
      handleFileUploaded(fileId, newUrl);
    }
  };

  const tabs: TabItem[] = [
    {
      id: "overview",
      label: (
        <T
          en="Doctor Bio"
          ar="السيرة الذاتية للطبيب"
          de="Arzt-Bio"
          es="Biografía del médico"
          fr="Bio du médecin"
          it="Biografia del medico"
          tr="Doktor Özgeçmişi"
          ru="Биография врача"
        />
      ),
      icon: Stethoscope,
    },
    {
      id: "appointments",
      label: (
        <T
          en="Appointments"
          ar="المواعيد"
          de="Termine"
          es="Citas"
          fr="Rendez-vous"
          it="Appuntamenti"
          tr="Randevular"
          ru="Записи"
        />
      ),
      icon: Calendar,
      badge: doctor?.bookings?.length,
    },
    {
      id: "schedule",
      label: (
        <T
          en="Schedule Manager"
          ar="إدارة الجدول والمواعيد"
          de="Zeitplanverwaltung"
          es="Administrador de horarios"
          fr="Gestionnaire d'horaires"
          it="Gestione orari"
          tr="Program Yöneticisi"
          ru="Управление расписанием"
        />
      ),
      icon: Clock,
      badge: doctor?.availability?.length,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: "#385366" }} />
        <p className="text-sm font-medium text-[#959ead]">
          <T
            en="Loading Doctor Profile..."
            ar="جاري تحميل الملف الشخصي للطبيب..."
            de="Arztprofil wird geladen..."
            es="Cargando perfil del médico..."
            fr="Chargement du profil du médecin..."
            it="Caricamento del profilo del medico..."
            tr="Doktor Profili Yükleniyor..."
            ru="Загрузка профиля врача..."
          />
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-center">
        <p className="text-lg font-bold text-rose-600">
          <T
            en="Failed to load profile"
            ar="تعذر تحميل الملف الشخصي"
            de="Profil konnte nicht geladen werden"
            es="No se pudo cargar el perfil"
            fr="Impossible de charger le profil"
            it="Impossibile caricare il profilo"
            tr="Profil yüklenemedi"
            ru="Не удалось загрузить профиль"
          />
        </p>
        <p className="text-sm text-[#959ead]">{error.message}</p>
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
          onEditClick={() => setIsEditModalOpen(true)}
          onAvatarUpdate={handleAvatarUpdate}
          onFileUploaded={handleFileUploaded}
        />

        <ProfileStats
          role="doctor"
          stats={{
            patientsTreated: doctor.patientsTreated,
            rating: doctor.rating,
            experienceYears: doctor.experienceYears,
            availabilitySlots: doctor.availability?.length ?? 0,
          }}
        />

        <div className="space-y-6">
          <ProfileTabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={(tabId) => setActiveTab(tabId)}
          />

          {activeTab === "overview" && <DoctorOverview doctor={doctor} />}
          {activeTab === "appointments" && <DoctorAppointments />}
          {activeTab === "schedule" && (
            <DoctorScheduleManager
              initialSlots={doctor.availability}
              bookings={doctor.bookings}
              availableBranches={doctor.branchesDetail}
              onSave={(slots) =>
                updateDoctorMutation.mutate({ availability: slots })
              }
            />
          )}
        </div>

        <EditDoctorModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          doctor={doctor}
        />
      </div>
    </div>
  );
}

