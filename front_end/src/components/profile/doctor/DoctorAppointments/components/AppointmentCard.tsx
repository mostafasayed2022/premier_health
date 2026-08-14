"use client";

import { Appointment } from "@/lib/types";
import { User, CheckCircle, XCircle, Calendar, Clock, MapPin } from "lucide-react";
import { T } from "@/i18n/T";

interface AppointmentCardProps {
  apt: Appointment;
  onRescheduleClick: (apt: Appointment) => void;
}

export function AppointmentCard({ apt, onRescheduleClick }: AppointmentCardProps) {
  const isConfirmed =
    apt.status.toLowerCase() === "confirmed" ||
    apt.status.toLowerCase() === "upcoming";
  const isCompleted = apt.status.toLowerCase() === "completed";

  return (
    <div className="p-5 rounded-2xl bg-card border border-border shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 shrink-0">
          <User className="w-6 h-6" />
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-bold text-base text-foreground">
              {apt.service}
            </h4>
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                isConfirmed
                  ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                  : isCompleted
                    ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                    : "bg-muted text-muted-foreground border-border"
              }`}
            >
              {isConfirmed ? (
                <CheckCircle className="w-3 h-3" />
              ) : isCompleted ? (
                <CheckCircle className="w-3 h-3" />
              ) : (
                <XCircle className="w-3 h-3" />
              )}
              {apt.status}
            </span>
          </div>

          <p className="text-xs font-medium text-foreground/80">
            <T
              en="Patient"
              ar="المريض"
              de="Patient"
              es="Paciente"
              fr="Patient"
              it="Paziente"
              tr="Hasta"
              ru="Пациент"
            />:{" "}
            {(apt as any).customerName || apt.doctor || "Patient"}
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground pt-1">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-emerald-500" />
              <span>{apt.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-500" />
              <span>{apt.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-500" />
              <span>{apt.branch}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-border justify-between md:justify-end">
        <div className="text-right">
          <span className="text-xs text-muted-foreground block">
            <T
              en="Session Fee"
              ar="قيمة الجلسة"
              de="Sitzungsgebühr"
              es="Tarifa de la sesión"
              fr="Frais de séance"
              it="Costo della sessione"
              tr="Seans Ücreti"
              ru="Стоимость приема"
            />
          </span>
          <span className="text-sm font-bold text-foreground">
            ${apt.amount}
          </span>
        </div>
        {isConfirmed && (
          <button
            onClick={() => onRescheduleClick(apt)}
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-sm cursor-pointer"
          >
            <T
              en="Reschedule"
              ar="إعادة جدولة"
              de="Umbuchen"
              es="Reprogramar"
              fr="Reprogrammer"
              it="Riprogramma"
              tr="Yeniden Planla"
              ru="Перенести"
            />
          </button>
        )}
      </div>
    </div>
  );
}
