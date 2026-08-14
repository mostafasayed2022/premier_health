"use client";

import { useState, useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import { usePatientAuth } from "@/context/PatientAuthContext";
import {
  usePatientProfile,
  useMyDoctorProfile,
  useUpdatePatientProfile,
  useUpdateDoctorProfile,
} from "@/lib/api/hooks";
import { ProfileHeader } from "@/components/profile/shared/ProfileHeader";
import { ProfileStats } from "@/components/profile/shared/ProfileStats";
import { ProfileTabs, TabItem } from "@/components/profile/shared/ProfileTabs";
import { ProfileSettings } from "@/components/profile/shared/ProfileSettings";
import { PatientOverview } from "@/components/profile/patient/PatientOverview";
import { PatientAppointments } from "@/components/profile/patient/PatientAppointments";
import { PatientRecords } from "@/components/profile/patient/PatientRecords";
import { EditPatientModal } from "@/components/profile/patient/EditPatientModal";
import { EditDoctorModal } from "@/components/profile/doctor/EditDoctorModal";
import { DoctorOverview } from "@/components/profile/doctor/DoctorOverview/DoctorOverview";
import { DoctorScheduleManager } from "@/components/profile/doctor/DoctorScheduleManager/DoctorScheduleManager";
import { DoctorAppointments } from "@/components/profile/doctor/DoctorAppointments/DoctorAppointments";
import {
  User,
  Calendar,
  FileText,
  Settings,
  Clock,
  Loader2,
  Stethoscope,
} from "lucide-react";
import { toast } from "sonner";
import { T } from "@/i18n/T";
import { AvailabilitySlot } from "@/lib/types";

// ─── Loading State ────────────────────────────────────────────────────────

function ProfileLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
      <Loader2 className="w-8 h-8 animate-spin" style={{ color: "#385366" }} />
      <p className="text-sm font-medium" style={{ color: "#959ead" }}>
        <T
          en="Loading Premier Health Profile..."
          ar="جاري تحميل الملف الشخصي لبريمير هيلث..."
          de="Premier Health-Profil wird geladen..."
          es="Cargando perfil de Premier Health..."
          fr="Chargement du profil Premier Health..."
          it="Caricamento del profilo Premier Health..."
          tr="Premier Health Profili Yükleniyor..."
          ru="Загрузка профиля Premier Health..."
        />
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────

export default function ProfileHubPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    patientUser,
    isAuthenticated,
    isLoading: authLoading,
  } = usePatientAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Redirect if not authenticated or if user is admin
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    } else if (!authLoading && isAuthenticated) {
      const userRole = patientUser?.role?.toLowerCase();
      if (userRole === "admin") {
        router.push("/admin");
      }
    }
  }, [authLoading, isAuthenticated, patientUser, router]);

  // Determine role based on auth context
  const role =
    patientUser?.role?.toLowerCase() === "doctor" ? "doctor" : "patient";

  const {
    data: patient,
    isLoading: isPatientLoading,
    error: patientError,
  } = usePatientProfile({
    enabled: role === "patient" && isAuthenticated,
  });
  const {
    data: doctor,
    isLoading: isDoctorLoading,
    error: doctorError,
  } = useMyDoctorProfile({
    enabled: role === "doctor" && isAuthenticated,
  });

  const updatePatientMutation = useUpdatePatientProfile();
  const updateDoctorMutation = useUpdateDoctorProfile();

  // ── Avatar upload handlers ────────────────────────────────────────────────
  // ProfileHeader calls onAvatarUpdate(url) for optimistic UI on both roles.
  // After a successful upload it also calls onDoctorFileUploaded(fileId, url)
  // so we can PATCH the integer file PK to the backend (patient & doctor both).
  const handleAvatarUpdate = (newUrl: string) => {
    // Optimistic: update local cache immediately so the avatar renders at once.
    // The real persistence is done in handleFileUploaded via the file ID.
  };

  // Called by ProfileHeader after a successful upload — works for BOTH roles.
  const handleFileUploaded = (fileId: number, fileUrl: string) => {
    if (role === "patient") {
      updatePatientMutation.mutate(
        { imageId: fileId },
        {
          onError: (err) =>
            toast.error(err.message || "Failed to save profile photo."),
        },
      );
    } else {
      updateDoctorMutation.mutate(
        { imageId: fileId },
        {
          onError: (err) =>
            toast.error(err.message || "Failed to save profile photo."),
        },
      );
    }
  };

  const handleSaveDoctorSchedule = (updatedSlots: AvailabilitySlot[]) => {
    updateDoctorMutation.mutate(
      { availability: updatedSlots },
      {
        onError: (err) => {
          toast.error(err.message || "Failed to save schedule.");
        },
      },
    );
  };

  const patientTabs: TabItem[] = [
    {
      id: "overview",
      label: (
        <T
          en="Overview"
          ar="نبذة عامة"
          de="Übersicht"
          es="Resumen"
          fr="Aperçu"
          it="Panoramica"
          tr="Genel Bakış"
          ru="Обзор"
        />
      ),
      icon: User,
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
    },
    {
      id: "records",
      label: (
        <T
          en="Medical Records"
          ar="السجلات الطبية"
          de="Medizinische Akten"
          es="Registros médicos"
          fr="Dossiers médicaux"
          it="Cartelle cliniche"
          tr="Tıbbi Kayıtlar"
          ru="Медицинские карты"
        />
      ),
      icon: FileText,
      badge: patient?.totalDocuments,
    },
    {
      id: "settings",
      label: (
        <T
          en="Settings"
          ar="الإعدادات"
          de="Einstellungen"
          es="Configuración"
          fr="Paramètres"
          it="Impostazioni"
          tr="Ayarlar"
          ru="Настройки"
        />
      ),
      icon: Settings,
    },
  ];

  const doctorTabs: TabItem[] = [
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
    },
    {
      id: "schedule",
      label: (
        <T
          en="Schedule"
          ar="الجدول"
          de="Zeitplan"
          es="Horario"
          fr="Calendrier"
          it="Programma"
          tr="Program"
          ru="Расписание"
        />
      ),
      icon: Clock,
    },
  ];

  const currentTabs = role === "patient" ? patientTabs : doctorTabs;
  const isLoading =
    !isMounted || authLoading || (role === "patient" ? isPatientLoading : isDoctorLoading);
  const error = role === "patient" ? patientError : doctorError;

  if (isLoading) return <ProfileLoading />;
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <p className="text-lg font-bold text-red-500">
          <T
            en="Failed to load profile"
            ar="فشل تحميل الملف الشخصي"
            de="Profil konnte nicht geladen werden"
            es="Error al cargar el perfil"
            fr="Échec du chargement du profil"
            it="Impossibile caricare il profilo"
            tr="Profil yüklenemedi"
            ru="Не удалось загрузить профиль"
          />
        </p>
        <p className="text-sm text-gray-500">{error.message}</p>
      </div>
    );
  }
  if (!isAuthenticated) return null; // Will redirect in useEffect

  return (
    <div
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#f7f2ea" }}
    >
      <div className="max-w-5xl mx-auto space-y-5">
        {/* ── Profile Header ── */}
        {role === "patient" && patient && (
          <ProfileHeader
            name={patient.fullName}
            role="patient"
            email={patient.email}
            phone={patient.phone}
            // location={patient.address}
            avatar={patient.avatar || ""}
            badge="Premier Health Patient"
            onEditClick={() => setIsEditModalOpen(true)}
            onAvatarUpdate={handleAvatarUpdate}
            onDoctorFileUploaded={handleFileUploaded}
          />
        )}
        {role === "doctor" && doctor && (
          <ProfileHeader
            name={doctor.name}
            role="doctor"
            email={doctor.email}
            phone={doctor.phone || ""}
            location={doctor.branches?.[0] || ""}
            avatar={doctor.photo}
            badge={doctor.position || doctor.specialty}
            rating={doctor.rating}
            patientsCount={doctor.patientsTreated}
            onEditClick={() => setIsEditModalOpen(true)}
            onAvatarUpdate={handleAvatarUpdate}
            onDoctorFileUploaded={handleFileUploaded}
          />
        )}

        {/* ── KPI Stats ── */}
        {role === "patient" && patient && (
          <ProfileStats
            role="patient"
            stats={{
              totalAppointments: patient.totalAppointments,
              completedVisits: patient.completedVisits,
              totalDocuments: patient.totalDocuments,
            }}
          />
        )}
        {role === "doctor" && doctor && (
          <ProfileStats
            role="doctor"
            stats={{
              patientsTreated: doctor.patientsTreated,
              rating: doctor.rating,
              experienceYears: doctor.experienceYears,
              availabilitySlots: doctor.availability?.length || 5,
            }}
          />
        )}

        {/* ── Tabs ── */}
        <div className="space-y-5">
          <ProfileTabs
            tabs={currentTabs}
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          {/* Patient panels */}
          {role === "patient" && (
            <>
              {activeTab === "overview" && patient && (
                <PatientOverview patient={patient} />
              )}
              {activeTab === "appointments" && <PatientAppointments />}
              {activeTab === "records" && <PatientRecords />}
              {activeTab === "settings" && <ProfileSettings />}
            </>
          )}

          {/* Doctor panels */}
          {role === "doctor" && (
            <>
              {activeTab === "overview" && doctor && (
                <DoctorOverview doctor={doctor} />
              )}
              {activeTab === "appointments" && <DoctorAppointments />}
              {activeTab === "schedule" && doctor && (
                <DoctorScheduleManager
                  initialSlots={doctor.availability}
                  bookings={doctor.bookings}
                  availableBranches={doctor.branchesDetail}
                  onSave={handleSaveDoctorSchedule}
                />
              )}
            </>
          )}
        </div>

        {/* ── Edit Modals ── */}
        {role === "patient" && patient && (
          <EditPatientModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            patient={patient}
          />
        )}
        {role === "doctor" && doctor && (
          <EditDoctorModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            doctor={doctor}
          />
        )}
      </div>
    </div>
  );
}
