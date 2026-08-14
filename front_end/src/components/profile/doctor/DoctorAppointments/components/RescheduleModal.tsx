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
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl border border-[#e8e0d5] p-6 sm:p-7 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-[#e8e0d5]">
          <h3 className="text-base sm:text-lg font-bold text-[#1e293b]">
            <T
              en="Reschedule Appointment"
              ar="إعادة جدولة الموعد"
              de="Termin umbuchen"
              es="Reprogramar cita"
              fr="Reprogrammer le rendez-vous"
              it="Riprogramma appuntamento"
              tr="Randevuyu Yeniden Planla"
              ru="Перенести запись"
            />
          </h3>
          <button
            onClick={() => setSelectedBooking(null)}
            className="w-8 h-8 rounded-xl bg-[#f7f2ea] text-[#959ead] hover:text-[#1e293b] hover:bg-[#e8e0d5] flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="text-xs text-[#4a5568] space-y-1.5 p-3.5 bg-[#f7f2ea] rounded-2xl border border-[#e8e0d5]">
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
                ru="Пациент"
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
                ru="Услуга"
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
                ru="Филиал"
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
                ru="Текущий"
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
                ru="Новая дата"
              /> *
            </label>
            <input
              type="date"
              required
              value={rescheduleDate}
              onChange={(e) => setRescheduleDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#e8e0d5] text-sm text-[#1e293b] placeholder-[#959ead] font-medium outline-none focus:ring-2 focus:ring-[#385366]/30 focus:border-[#385366] transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#1e293b] mb-1">
                <T
                  en="Start Time"
                  ar="وقت البدء"
                  de="Startzeit"
                  es="Hora de inicio"
                  fr="Heure de début"
                  it="Ora di inizio"
                  tr="Başlangıç Saati"
                  ru="Время начала"
                /> *
              </label>
              <input
                type="time"
                required
                value={rescheduleStartTime}
                onChange={(e) => setRescheduleStartTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#e8e0d5] text-sm text-[#1e293b] placeholder-[#959ead] font-medium outline-none focus:ring-2 focus:ring-[#385366]/30 focus:border-[#385366] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1e293b] mb-1">
                <T
                  en="End Time"
                  ar="وقت الانتهاء"
                  de="Endzeit"
                  es="Hora de finalización"
                  fr="Heure de fin"
                  it="Ora di fine"
                  tr="Bitiş Saati"
                  ru="Время окончания"
                /> *
              </label>
              <input
                type="time"
                required
                value={rescheduleEndTime}
                onChange={(e) => setRescheduleEndTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#e8e0d5] text-sm text-[#1e293b] placeholder-[#959ead] font-medium outline-none focus:ring-2 focus:ring-[#385366]/30 focus:border-[#385366] transition-all"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e8e0d5]">
            <button
              type="button"
              onClick={() => setSelectedBooking(null)}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#4a5568] hover:bg-[#f7f2ea] transition-colors cursor-pointer"
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
                ru="Отмена"
              />
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#385366] hover:bg-[#2A3F50] text-white font-bold text-xs shadow-md cursor-pointer flex items-center gap-1.5 transition-all"
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
                  ru="Перенос записи..."
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
                  ru="Подтвердить перенос"
                />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
