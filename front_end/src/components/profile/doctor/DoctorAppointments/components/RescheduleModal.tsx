"use client";

import { DoctorProfileBooking } from "@/lib/types";
import { toast } from "sonner";
import { T } from "@/i18n/T";

interface RescheduleModalProps {
  selectedBooking: DoctorProfileBooking | null;
  setSelectedBooking: (b: DoctorProfileBooking | null) => void;
  rescheduleDate: string;
  setRescheduleDate: (d: string) => void;
  rescheduleStartTime: string;
  setRescheduleStartTime: (t: string) => void;
  rescheduleEndTime: string;
  setRescheduleEndTime: (t: string) => void;
  rescheduleMutation: any; // using any for the mutation object from react-query
  refetch: () => void;
}

export function RescheduleModal({
  selectedBooking,
  setSelectedBooking,
  rescheduleDate,
  setRescheduleDate,
  rescheduleStartTime,
  setRescheduleStartTime,
  rescheduleEndTime,
  setRescheduleEndTime,
  rescheduleMutation,
  refetch,
}: RescheduleModalProps) {
  if (!selectedBooking) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card rounded-3xl border border-border p-6 shadow-md space-y-5 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <h3 className="text-lg font-bold text-foreground">
            <T
              en="Reschedule Appointment"
              ar="إعادة جدولة الموعد"
              de="Termin umbuchen"
              es="Reprogramar cita"
              fr="Reprogrammer le rendez-vous"
              it="Riprogramma appuntamento"
              tr="Randevuyu Yeniden Planla"
            />
          </h3>
          <button
            onClick={() => setSelectedBooking(null)}
            className="text-muted-foreground hover:text-foreground text-sm font-semibold cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="text-xs text-muted-foreground space-y-1 p-3 bg-muted/40 rounded-2xl border border-border/50">
          <p>
            <span className="font-bold text-foreground/80">
              <T
                en="Patient"
                ar="المريض"
                de="Patient"
                es="Paciente"
                fr="Patient"
                it="Paziente"
                tr="Hasta"
              />:
            </span>{" "}
            {selectedBooking.patientName}
          </p>
          <p>
            <span className="font-bold text-foreground/80">
              <T
                en="Service"
                ar="الخدمة"
                de="Dienstleistung"
                es="Servicio"
                fr="Service"
                it="Servizio"
                tr="Hizmet"
              />:
            </span>{" "}
            {selectedBooking.serviceName}
          </p>
          <p>
            <span className="font-bold text-foreground/80">
              <T
                en="Location"
                ar="الفرع"
                de="Standort"
                es="Ubicación"
                fr="Emplacement"
                it="Ubicazione"
                tr="Konum"
              />:
            </span>{" "}
            {selectedBooking.branchName}
          </p>
          <p>
            <span className="font-bold text-foreground/80">
              <T
                en="Current"
                ar="الحالي"
                de="Aktuell"
                es="Actual"
                fr="Actuel"
                it="Corrente"
                tr="Mevcut"
              />:
            </span>{" "}
            {selectedBooking.date} ({selectedBooking.startTime.slice(0, 5)})
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (rescheduleStartTime >= rescheduleEndTime) {
              toast.error("Start time must be before end time.");
              return;
            }
            rescheduleMutation.mutate(
              {
                bookingId: selectedBooking.id,
                payload: {
                  date: rescheduleDate,
                  startTime: rescheduleStartTime,
                  endTime: rescheduleEndTime,
                },
              },
              {
                onSuccess: () => {
                  setSelectedBooking(null);
                  refetch();
                },
              }
            );
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-semibold text-foreground/80 mb-1">
              <T
                en="New Date"
                ar="التاريخ الجديد"
                de="Neues Datum"
                es="Nueva fecha"
                fr="Nouvelle date"
                it="Nuova data"
                tr="Yeni Tarih"
              /> *
            </label>
            <input
              type="date"
              required
              value={rescheduleDate}
              onChange={(e) => setRescheduleDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-background border border-input text-sm text-foreground focus:ring-2 focus:ring-emerald-500/40"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-1">
                <T
                  en="Start Time"
                  ar="وقت البدء"
                  de="Startzeit"
                  es="Hora de inicio"
                  fr="Heure de début"
                  it="Ora di inizio"
                  tr="Başlangıç Saati"
                /> *
              </label>
              <input
                type="time"
                required
                value={rescheduleStartTime}
                onChange={(e) => setRescheduleStartTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-background border border-input text-sm text-foreground focus:ring-2 focus:ring-emerald-500/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-1">
                <T
                  en="End Time"
                  ar="وقت الانتهاء"
                  de="Endzeit"
                  es="Hora de finalización"
                  fr="Heure de fin"
                  it="Ora di fine"
                  tr="Bitiş Saati"
                /> *
              </label>
              <input
                type="time"
                required
                value={rescheduleEndTime}
                onChange={(e) => setRescheduleEndTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-background border border-input text-sm text-foreground focus:ring-2 focus:ring-emerald-500/40"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
            <button
              type="button"
              onClick={() => setSelectedBooking(null)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer"
              disabled={rescheduleMutation.isPending}
            >
              <T
                en="Cancel"
                ar="إلغاء"
                de="Abbrechen"
                es="Cancelar"
                fr="Annuler"
                it="Annulla"
                tr="İptal"
              />
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-md cursor-pointer flex items-center gap-1.5"
              disabled={rescheduleMutation.isPending}
            >
              {rescheduleMutation.isPending ? (
                <T
                  en="Rescheduling..."
                  ar="جاري إعادة الجدولة..."
                  de="Umbuchung läuft..."
                  es="Reprogramando..."
                  fr="Reprogrammation en cours..."
                  it="Riprogrammazione..."
                  tr="Yeniden planlanıyor..."
                />
              ) : (
                <T
                  en="Confirm Reschedule"
                  ar="تأكيد إعادة الجدولة"
                  de="Umbuchung bestätigen"
                  es="Confirmar reprogramación"
                  fr="Confirmer la re-programmation"
                  it="Conferma riprogrammazione"
                  tr="Yeniden Planlamayı Onayla"
                />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
