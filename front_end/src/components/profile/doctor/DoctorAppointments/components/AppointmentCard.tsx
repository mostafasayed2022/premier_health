"use client";

import { Appointment } from "@/lib/types";
import { User, CheckCircle2, XCircle, Calendar, Clock, MapPin, Stethoscope } from "lucide-react";
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
  const isCancelled = apt.status.toLowerCase() === "cancelled";

  return (
    <div className="p-5 rounded-2xl bg-white border border-[#e8e0d5] shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-2xl bg-[#eef2f5] text-[#385366] flex items-center justify-center shrink-0 shadow-2xs">
          <Stethoscope className="w-5 h-5" />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-bold text-base text-[#1e293b]">
              {apt.service}
            </h4>
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                isConfirmed
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : isCompleted
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : isCancelled
                      ? "bg-rose-50 text-rose-700 border-rose-200"
                      : "bg-[#f7f2ea] text-[#959ead] border-[#e8e0d5]"
              }`}
            >
              {isConfirmed ? (
                <CheckCircle2 className="w-3 h-3" />
              ) : isCompleted ? (
                <CheckCircle2 className="w-3 h-3" />
              ) : (
                <XCircle className="w-3 h-3" />
              )}
              {apt.status}
            </span>
          </div>

          <p className="text-xs font-medium text-[#4a5568]">
            <span className="text-[#959ead]">
              <T
                en="Patient:"
                ar="المريض:"
                de="Patient:"
                es="Paciente:"
                fr="Patient:"
                it="Paziente:"
                tr="Hasta:"
                ru="Пациент:"
              />
            </span>{" "}
            <span className="font-bold text-[#1e293b]">
              {(apt as any).customerName || apt.doctor || "Patient"}
            </span>
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#959ead] pt-1">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#c8a96b]" />
              <span className="font-medium text-[#4a5568]">{apt.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#c8a96b]" />
              <span className="font-medium text-[#4a5568]">{apt.time}</span>
            </div>
            {apt.branch && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#c8a96b]" />
                <span className="font-medium text-[#4a5568]">{apt.branch}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-[#e8e0d5] justify-between md:justify-end shrink-0">
        <div className="text-right">
          <span className="text-[11px] text-[#959ead] block font-medium">
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
          <span className="text-sm font-bold text-[#1e293b]">
            ${apt.amount}
          </span>
        </div>
        {isConfirmed && (
          <button
            onClick={() => onRescheduleClick(apt)}
            className="px-4 py-2 rounded-xl text-white font-bold text-xs shadow-sm cursor-pointer transition-all hover:opacity-90"
            style={{ backgroundColor: "#385366" }}
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

