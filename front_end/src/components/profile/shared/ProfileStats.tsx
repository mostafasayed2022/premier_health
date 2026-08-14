"use client";

import { Calendar, CheckCircle, Users, Star, Award, Clock } from "lucide-react";
import { T } from "@/i18n/T";

// ─── Types ────────────────────────────────────────────────────────────────

interface ProfileStatsProps {
  role: "patient" | "doctor";
  stats: {
    totalAppointments?: number;
    completedVisits?: number;
    totalDocuments?: number;
    patientsTreated?: number;
    rating?: number;
    experienceYears?: number;
    availabilitySlots?: number;
  };
}

interface StatItem {
  id: string;
  title: React.ReactNode;
  value: string | number;
  icon: React.ElementType;
  accent: string;
  bg: string;
}

// ─── Component ────────────────────────────────────────────────────────────

export function ProfileStats({ role, stats }: ProfileStatsProps) {
  const patientItems: StatItem[] = [
    {
      id: "total_bookings",
      title: (
        <T
          en="Total Bookings"
          ar="إجمالي الحجوزات"
          de="Gesamtbuchungen"
          es="Total de Reservas"
          fr="Total des Réservations"
          it="Prenotazioni Totali"
          tr="Toplam Randevular"
          ru="Всего записей"
        />
      ),
      value: stats.totalAppointments ?? 0,
      icon: Calendar,
      accent: "#385366",
      bg: "#eef2f5",
    },
    {
      id: "completed_visits",
      title: (
        <T
          en="Completed Visits"
          ar="الزيارات المكتملة"
          de="Abgeschlossene Besuche"
          es="Visitas Completadas"
          fr="Visites Terminées"
          it="Visite Completate"
          tr="Tamamlanan Ziyaretler"
          ru="Завершенные визиты"
        />
      ),
      value: stats.completedVisits ?? 0,
      icon: CheckCircle,
      accent: "#2d7a55",
      bg: "#edf7f2",
    },
  ];

  const doctorItems: StatItem[] = [
    {
      id: "patients_treated",
      title: (
        <T
          en="Patients Treated"
          ar="المرضى المخدومين"
          de="Behandelte Patienten"
          es="Pacientes Atendidos"
          fr="Patients Traités"
          it="Pazienti Trattati"
          tr="Tedavi Edilen Hastalar"
          ru="Принято пациентов"
        />
      ),
      value:
        stats.patientsTreated !== undefined && stats.patientsTreated !== null
          ? stats.patientsTreated >= 1000
            ? `${stats.patientsTreated.toLocaleString()}+`
            : `${stats.patientsTreated}`
          : "3,000+",
      icon: Users,
      accent: "#385366",
      bg: "#eef2f5",
    },
    {
      id: "doctor_rating",
      title: (
        <T
          en="Doctor Rating"
          ar="تقييم المرضى"
          de="Bewertung"
          es="Calificación"
          fr="Évaluation"
          it="Valutazione"
          tr="Doktor Puanı"
          ru="Рейтинг врача"
        />
      ),
      value: stats.rating ? `${Number(stats.rating).toFixed(2)}` : "4.95",
      icon: Star,
      accent: "#a38448",
      bg: "#fff8ee",
    },
    {
      id: "experience",
      title: (
        <T
          en="Experience"
          ar="سنوات الخبرة"
          de="Erfahrung"
          es="Experiencia"
          fr="Expérience"
          it="Esperienza"
          tr="Deneyim"
          ru="Опыт работы"
        />
      ),
      value: `${stats.experienceYears ?? 14} Yrs`,
      icon: Award,
      accent: "#998675",
      bg: "#f7f2ea",
    },
    {
      id: "weekly_slots",
      title: (
        <T
          en="Weekly Slots"
          ar="المواعيد الأسبوعية"
          de="Wöchentliche Termine"
          es="Horarios Semanales"
          fr="Créneaux Hebdo"
          it="Slot Settimanali"
          tr="Haftalık Randevular"
          ru="Слоты в неделю"
        />
      ),
      value: `${stats.availabilitySlots ?? 0}`,
      icon: Clock,
      accent: "#2d7a55",
      bg: "#edf7f2",
    },
  ];

  const items = role === "patient" ? patientItems : doctorItems;
  const cols = role === "doctor" ? "sm:grid-cols-4" : "sm:grid-cols-2";

  return (
    <div className={`grid grid-cols-2 ${cols} gap-3`}>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className="bg-white border border-[#e8e0d5] rounded-2xl p-4 flex items-center gap-4 shadow-sm"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: item.bg }}
            >
              <Icon className="w-4.5 h-4.5" style={{ color: item.accent }} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-[#959ead] font-medium leading-tight">{item.title}</p>
              <p className="text-lg font-bold leading-tight mt-0.5" style={{ color: "#1e293b" }}>
                {item.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

