"use client";

import { Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { T } from "@/i18n/T";

export function AppointmentsLoadingState() {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-card rounded-2xl border border-border">
      <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mb-3" />
      <p className="text-sm font-medium text-muted-foreground">
        <T
          en="Loading assigned patient bookings..."
          ar="جاري تحميل حجوزات المرضى الخاصين بك..."
          de="Assozierte Patientenbuchungen werden geladen..."
          es="Cargando reservas de pacientes asignados..."
          fr="Chargement des réservations de patients assignés..."
          it="Caricamento delle prenotazioni dei pazienti assegnati..."
          tr="Atanan hasta rezervasyonları yükleniyor..."
          ru="Загрузка записей пациентов..."
        />
      </p>
    </div>
  );
}

interface AppointmentsErrorStateProps {
  refetch: () => void;
}

export function AppointmentsErrorState({ refetch }: AppointmentsErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-card rounded-2xl border border-border text-center">
      <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
      <p className="text-sm font-semibold text-foreground mb-3">
        <T
          en="Unable to load doctor bookings"
          ar="تعذر تحميل حجوزات المرضى"
          de="Arztbuchungen können nicht geladen werden"
          es="No se pudieron cargar las reservas del médico"
          fr="Impossible de charger les réservations du médecin"
          it="Impossibile caricare le prenotazioni del medico"
          tr="Doktor rezervasyonları yüklenemedi"
          ru="Не удалось загрузить записи врача"
        />
      </p>
      <button
        onClick={() => refetch()}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-medium cursor-pointer"
      >
        <RefreshCw className="w-3.5 h-3.5" />{" "}
        <T
          en="Retry"
          ar="إعادة المحاولة"
          de="Wiederholen"
          es="Reintentar"
          fr="Réessayer"
          it="Riprova"
          tr="Yeniden Dene"
          ru="Повторить"
        />
      </button>
    </div>
  );
}
