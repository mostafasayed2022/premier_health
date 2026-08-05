"use client";

import { T } from "@/i18n/T";

export type FilterType = "all" | "Upcoming" | "Confirmed" | "Completed";

interface AppointmentsFilterBarProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}

export function AppointmentsFilterBar({ filter, setFilter }: AppointmentsFilterBarProps) {
  const tabs = ["all", "Confirmed", "Completed"] as const;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-border">
      <div>
        <h3 className="text-base font-bold text-foreground">
          <T
            en="Patient Appointments & Bookings"
            ar="حجوزات ومواعيد المرضى"
            de="Patiententermine & Buchungen"
            es="Citas y reservas de pacientes"
            fr="Rendez-vous et réservations des patients"
            it="Appuntamenti e prenotazioni dei pazienti"
            tr="Hasta Randevuları ve Rezervasyonları"
          />
        </h3>
        <p className="text-xs text-muted-foreground">
          <T
            en="Manage patients scheduled for your clinical sessions"
            ar="إدارة قائمة المرضى المحجوزين لجلساتك الطبية"
            de="Verwalten Sie Patienten, die für Ihre klinischen Sitzungen geplant sind"
            es="Administre los pacientes programados para sus sesiones clínicas"
            fr="Gérez les patients programmés pour vos séances cliniques"
            it="Gestisci i pazienti programmati per le tue sessioni cliniche"
            tr="Klinik seanslarınız için planlanan hastaları yönetin"
          />
        </p>
      </div>

      <div className="flex items-center gap-1.5 bg-muted/60 p-1 rounded-xl border border-border/50">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
              filter === tab
                ? "bg-card text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "all" ? (
              <T
                en="All Bookings"
                ar="جميع الحجوزات"
                de="Alle Buchungen"
                es="Todas las reservas"
                fr="Toutes les réservations"
                it="Tutte le prenotazioni"
                tr="Tüm Rezervasyonlar"
              />
            ) : (
              tab
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
