"use client";

import { useState } from "react";
import { useAppointments, useCancelBooking } from "@/lib/api/hooks";
import { Appointment } from "@/lib/types";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  CheckCircle2,
  XCircle,
  AlertCircle,
  AlertTriangle,
  Loader2,
  RefreshCw,
  X,
  Stethoscope,
} from "lucide-react";
import { T } from "@/i18n/T";

const CANCELLATION_REASONS = [
  { id: "schedule_conflict", label: "Schedule conflict / Busy" },
  { id: "reschedule_needed", label: "Need to change date or time" },
  { id: "emergency", label: "Personal emergency" },
  { id: "booked_by_mistake", label: "Booked by mistake" },
  { id: "other", label: "Other reason" },
];

export function PatientAppointments() {
  const { data: appointments, isLoading, isError, refetch } = useAppointments();
  const cancelBookingMutation = useCancelBooking();

  const [filter, setFilter] = useState<"all" | "confirmed" | "completed" | "cancelled">("all");
  const [selectedAppointmentForCancel, setSelectedAppointmentForCancel] = useState<Appointment | null>(null);
  const [cancelReason, setCancelReason] = useState<string>("schedule_conflict");
  const [customReason, setCustomReason] = useState<string>("");

  const confirmedCount = appointments?.filter((a) => {
    const s = a.status.toLowerCase();
    return s === "confirmed" || s === "upcoming" || s === "pending";
  }).length || 0;

  const completedCount = appointments?.filter((a) => a.status.toLowerCase() === "completed").length || 0;
  const cancelledCount = appointments?.filter((a) => a.status.toLowerCase() === "cancelled").length || 0;

  const filteredAppointments = appointments?.filter((apt) => {
    if (filter === "all") return true;
    const s = apt.status.toLowerCase();
    if (filter === "confirmed") return s === "confirmed" || s === "upcoming" || s === "pending";
    if (filter === "completed") return s === "completed";
    if (filter === "cancelled") return s === "cancelled";
    return true;
  });

  const handleOpenCancelModal = (apt: Appointment) => {
    setSelectedAppointmentForCancel(apt);
    setCancelReason("schedule_conflict");
    setCustomReason("");
  };

  const handleCloseCancelModal = () => {
    if (cancelBookingMutation.isPending) return;
    setSelectedAppointmentForCancel(null);
  };

  const handleConfirmCancel = () => {
    if (!selectedAppointmentForCancel) return;

    const reasonText =
      cancelReason === "other"
        ? customReason || "Other reason"
        : CANCELLATION_REASONS.find((r) => r.id === cancelReason)?.label || cancelReason;

    cancelBookingMutation.mutate(
      {
        bookingId: selectedAppointmentForCancel.id,
        reason: reasonText,
      },
      {
        onSuccess: () => {
          setSelectedAppointmentForCancel(null);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white border border-[#e8e0d5] rounded-2xl shadow-xs">
        <Loader2 className="w-8 h-8 animate-spin text-[#385366] mb-3" />
        <p className="text-sm font-medium text-[#959ead]">
          <T
            en="Loading your consultations & visits..."
            ar="جاري تحميل مواعيدك واستشاراتك..."
            de="Ihre Termine werden geladen..."
            es="Cargando sus citas médicas..."
            fr="Chargement de vos rendez-vous..."
            it="Caricamento dei tuoi appuntamenti..."
            tr="Randevularınız yükleniyor..."
            ru="Загрузка ваших записей..."
          />
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white border border-[#e8e0d5] rounded-2xl text-center shadow-xs">
        <AlertCircle className="w-8 h-8 text-rose-500 mb-2" />
        <p className="text-sm font-semibold text-[#1e293b] mb-3">
          <T
            en="Unable to load appointments"
            ar="تعذر تحميل المواعيد"
            de="Termine konnten nicht geladen werden"
            es="No se pudieron cargar las citas"
            fr="Impossible de charger les rendez-vous"
            it="Impossibile caricare gli appuntamenti"
            tr="Randevular yüklenemedi"
            ru="Не удалось загрузить записи"
          />
        </p>
        <button
          onClick={() => refetch()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white text-xs font-semibold cursor-pointer transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#385366" }}
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <T en="Retry" ar="إعادة المحاولة" de="Wiederholen" es="Reintentar" fr="Réessayer" it="Riprova" tr="Yeniden Dene" ru="Повторить" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ── Header & Filter Tabs ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-[#e8e0d5] shadow-xs">
        <div>
          <h3 className="text-base font-bold text-[#1e293b]">
            <T
              en="Consultations & Visits"
              ar="الاستشارات والمواعيد"
              de="Konsultationen & Termine"
              es="Consultas y Visitas"
              fr="Consultations & Rendez-vous"
              it="Consultazioni e Visite"
              tr="Konsültasyonlar ve Randevular"
              ru="Консультации и визиты"
            />
          </h3>
          <p className="text-xs text-[#959ead]">
            <T
              en="View and manage your upcoming, completed, and cancelled medical visits"
              ar="عرض وإدارة مواعيدك الطبية القادمة والمكتملة والملغاة"
              de="Verwalten Sie Ihre anstehenden, abgeschlossenen und stornierten Termine"
              es="Vea y administre sus citas médicas próximas, completadas y canceladas"
              fr="Consultez et gérez vos rendez-vous médicaux à venir, terminés et annulés"
              it="Visualizza e gestisci le tue visite mediche future, completate e cancellate"
              tr="Gelecek, tamamlanan ve iptal edilen randevularınızı görüntüleyin ve yönetin"
              ru="Просмотр и управление предстоящими, завершенными и отмененными визитами"
            />
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#f7f2ea] p-1 rounded-xl border border-[#e8e0d5]">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filter === "all"
                ? "bg-white text-[#1e293b] shadow-xs border border-[#e8e0d5]"
                : "text-[#959ead] hover:text-[#1e293b]"
            }`}
          >
            <T en="All" ar="الكل" de="Alle" es="Todos" fr="Tous" it="Tutti" tr="Tümü" ru="Все" />
            <span className="ml-1.5 text-[10px] px-1.5 py-0.2 rounded-full bg-[#eef2f5] text-[#385366]">
              {appointments?.length || 0}
            </span>
          </button>

          <button
            onClick={() => setFilter("confirmed")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filter === "confirmed"
                ? "bg-white text-[#1e293b] shadow-xs border border-[#e8e0d5]"
                : "text-[#959ead] hover:text-[#1e293b]"
            }`}
          >
            <T en="Upcoming" ar="القادمة" de="Anstehend" es="Próximas" fr="À venir" it="Prossimi" tr="Gelecek" ru="Предстоящие" />
            {confirmedCount > 0 && (
              <span className="ml-1.5 text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-50 text-emerald-700 font-bold">
                {confirmedCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setFilter("completed")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filter === "completed"
                ? "bg-white text-[#1e293b] shadow-xs border border-[#e8e0d5]"
                : "text-[#959ead] hover:text-[#1e293b]"
            }`}
          >
            <T en="Completed" ar="المكتملة" de="Abgeschlossen" es="Completadas" fr="Terminées" it="Completati" tr="Tamamlanan" ru="Завершенные" />
            {completedCount > 0 && (
              <span className="ml-1.5 text-[10px] px-1.5 py-0.2 rounded-full bg-blue-50 text-blue-700 font-bold">
                {completedCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setFilter("cancelled")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filter === "cancelled"
                ? "bg-white text-[#1e293b] shadow-xs border border-[#e8e0d5]"
                : "text-[#959ead] hover:text-[#1e293b]"
            }`}
          >
            <T en="Cancelled" ar="الملغاة" de="Storniert" es="Canceladas" fr="Annulées" it="Cancellati" tr="İptal Edilen" ru="Отмененные" />
            {cancelledCount > 0 && (
              <span className="ml-1.5 text-[10px] px-1.5 py-0.2 rounded-full bg-rose-50 text-rose-700 font-bold">
                {cancelledCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── Appointments List ── */}
      {!filteredAppointments || filteredAppointments.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-[#e8e0d5] shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-[#f7f2ea] flex items-center justify-center mx-auto mb-3 text-[#c8a96b]">
            <Calendar className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-[#1e293b] mb-1">
            <T
              en="No Consultations Found"
              ar="لا توجد مواعيد في هذا القسم"
              de="Keine Termine gefunden"
              es="No se encontraron citas"
              fr="Aucun rendez-vous trouvé"
              it="Nessun appuntamento trovato"
              tr="Randevu Bulunamadı"
              ru="Записи не найдены"
            />
          </h4>
          <p className="text-xs text-[#959ead]">
            <T
              en="You do not have any appointments matching this filter status."
              ar="ليس لديك أي مواعيد تطابق حالة التصفية المحددة."
              de="Sie haben keine Termine, die diesem Filter entsprechen."
              es="No tiene ninguna cita que coincida con este estado."
              fr="Vous n'avez aucun rendez-vous correspondant à ce filtre."
              it="Non hai appuntamenti che corrispondono a questo filtro."
              tr="Bu filtreye uygun herhangi bir randevunuz bulunmamaktadır."
              ru="У вас нет записей, соответствующих выбранному фильтру."
            />
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((apt) => {
            const rawStatus = apt.status.toLowerCase();
            const isConfirmed = rawStatus === "confirmed" || rawStatus === "upcoming" || rawStatus === "pending";
            const isCompleted = rawStatus === "completed";
            const isCancelled = rawStatus === "cancelled";

            return (
              <div
                key={apt.id}
                className="p-5 rounded-2xl bg-white border border-[#e8e0d5] shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-2xl shrink-0 flex items-center justify-center"
                    style={{
                      backgroundColor: isCancelled
                        ? "#fdf0f0"
                        : isCompleted
                        ? "#eef6ff"
                        : "#edf7ee",
                      color: isCancelled
                        ? "#c0392b"
                        : isCompleted
                        ? "#2563eb"
                        : "#2e7d32",
                    }}
                  >
                    <Stethoscope className="w-5 h-5" />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-base text-[#1e293b]">{apt.service}</h4>
                      
                      {/* Status Badge */}
                      <span
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border"
                        style={{
                          backgroundColor: isConfirmed
                            ? "#edf7ee"
                            : isCompleted
                            ? "#eef6ff"
                            : isCancelled
                            ? "#fdf0f0"
                            : "#fef9ee",
                          color: isConfirmed
                            ? "#2e7d32"
                            : isCompleted
                            ? "#2563eb"
                            : isCancelled
                            ? "#c0392b"
                            : "#d97706",
                          borderColor: isConfirmed
                            ? "#c8e6c9"
                            : isCompleted
                            ? "#bfdbfe"
                            : isCancelled
                            ? "#f5c6cb"
                            : "#fde68a",
                        }}
                      >
                        {isConfirmed && <CheckCircle2 className="w-3 h-3" />}
                        {isCompleted && <CheckCircle2 className="w-3 h-3" />}
                        {isCancelled && <XCircle className="w-3 h-3" />}
                        {!isConfirmed && !isCompleted && !isCancelled && <Clock className="w-3 h-3" />}
                        {apt.status}
                      </span>

                      {/* Payment Status Pill */}
                      {apt.paymentStatus && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                            apt.paymentStatus.toLowerCase() === "paid"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          {apt.paymentStatus}
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-medium text-[#4a5568]">
                      <span className="text-[#959ead]">
                        <T en="Doctor:" ar="الطبيب:" de="Arzt:" es="Médico:" fr="Médecin:" it="Medico:" tr="Doktor:" ru="Врач:" />
                      </span>{" "}
                      <span className="font-semibold text-[#1e293b]">{apt.doctor || "Medical Specialist"}</span>
                    </p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#959ead] pt-1">
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

                {/* Right side: Fee & Actions */}
                <div className="flex items-center gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-[#e8e0d5] justify-between md:justify-end shrink-0">
                  <div className="text-right">
                    <span className="text-[11px] text-[#959ead] block font-medium">
                      <T en="Consultation Fee" ar="رسوم الكشف" de="Gebühr" es="Tarifa" fr="Frais" it="Tariffa" tr="Ücret" ru="Стоимость" />
                    </span>
                    <span className="text-sm font-bold text-[#1e293b]">${apt.amount}</span>
                  </div>

                  {isConfirmed && (
                    <button
                      onClick={() => handleOpenCancelModal(apt)}
                      className="px-4 py-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                    >
                      <T
                        en="Cancel Visit"
                        ar="إلغاء الموعد"
                        de="Termin stornieren"
                        es="Cancelar cita"
                        fr="Annuler la visite"
                        it="Cancella visita"
                        tr="Randevuyu İptal Et"
                        ru="Отменить запись"
                      />
                    </button>
                  )}

                  {isCancelled && (
                    <span className="text-xs font-semibold text-rose-500 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200/60">
                      <T
                        en="Cancelled"
                        ar="تم الإلغاء"
                        de="Storniert"
                        es="Cancelada"
                        fr="Annulée"
                        it="Cancellato"
                        tr="İptal Edildi"
                        ru="Отменено"
                      />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Cancel Appointment Confirmation Modal ── */}
      {selectedAppointmentForCancel && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-3xl border border-[#e8e0d5] p-6 sm:p-7 shadow-2xl space-y-5 my-8">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#e8e0d5]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1e293b]">
                    <T
                      en="Cancel Appointment"
                      ar="إلغاء الموعد الطبي"
                      de="Termin stornieren"
                      es="Cancelar cita"
                      fr="Annuler le rendez-vous"
                      it="Cancella appuntamento"
                      tr="Randevuyu İptal Et"
                      ru="Отмена записи"
                    />
                  </h3>
                  <p className="text-xs text-[#959ead]">
                    <T
                      en="Please confirm your cancellation request"
                      ar="يرجى تأكيد طلب إلغاء هذا الموعد"
                      de="Bitte bestätigen Sie Ihre Stornierung"
                      es="Confirme su solicitud de cancelación"
                      fr="Veuillez confirmer votre demande d'annulation"
                      it="Conferma la richiesta di cancellazione"
                      tr="Lütfen iptal talebinizi onaylayın"
                      ru="Пожалуйста, подтвердите отмену"
                    />
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseCancelModal}
                disabled={cancelBookingMutation.isPending}
                className="text-[#959ead] hover:text-[#1e293b] text-sm font-semibold p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Visit Details Card */}
            <div className="p-4 rounded-2xl bg-[#f7f2ea] border border-[#e8e0d5] space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#1e293b] text-sm">
                  {selectedAppointmentForCancel.service}
                </span>
                <span className="font-bold text-[#385366]">
                  ${selectedAppointmentForCancel.amount}
                </span>
              </div>
              <div className="text-[#4a5568] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#c8a96b]" />
                <span>Doctor: <strong>{selectedAppointmentForCancel.doctor}</strong></span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[#4a5568] pt-1">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#c8a96b]" />
                  <span>{selectedAppointmentForCancel.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#c8a96b]" />
                  <span>{selectedAppointmentForCancel.time}</span>
                </div>
              </div>
              {selectedAppointmentForCancel.branch && (
                <div className="flex items-center gap-1.5 text-[#4a5568] pt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#c8a96b]" />
                  <span>{selectedAppointmentForCancel.branch}</span>
                </div>
              )}
            </div>

            {/* Reason selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#1e293b]">
                <T
                  en="Reason for cancellation (optional)"
                  ar="سبب الإلغاء (اختياري)"
                  de="Grund für die Stornierung (optional)"
                  es="Motivo de la cancelación (opcional)"
                  fr="Raison de l'annulation (facultatif)"
                  it="Motivo della cancellazione (opzionale)"
                  tr="İptal nedeni (isteğe bağlı)"
                  ru="Причина отмены (необязательно)"
                />
              </label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#e8e0d5] text-xs text-[#1e293b] outline-none focus:ring-2 focus:ring-[#385366]/30 font-medium"
              >
                {CANCELLATION_REASONS.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.label}
                  </option>
                ))}
              </select>

              {cancelReason === "other" && (
                <input
                  type="text"
                  placeholder="Please specify reason..."
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  className="w-full mt-2 px-3.5 py-2 rounded-xl bg-white border border-[#e8e0d5] text-xs text-[#1e293b] outline-none focus:ring-2 focus:ring-[#385366]/30 font-medium"
                />
              )}
            </div>

            {/* Cancellation Policy Notice */}
            <p className="text-[11px] text-[#959ead] leading-relaxed bg-[#fff8ee] p-3 rounded-xl border border-[#e8d5a8]">
              <T
                en="You can cancel or reschedule appointments free of charge up to 24 hours prior to the scheduled consultation time."
                ar="يمكنك إلغاء الموعد أو إعادة جدولته مجاناً حتى 24 ساعة قبل الموعد المحدد."
                de="Sie können Termine bis zu 24 Stunden vor dem Termin kostenlos stornieren oder verschieben."
                es="Puede cancelar o reprogramar citas de forma gratuita hasta 24 horas antes de la hora programada."
                fr="Vous pouvez annuler ou reporter gratuitement vos rendez-vous jusqu'à 24 heures avant l'heure prévue."
                it="Puoi cancellare o riprogrammare gli appuntamenti gratuitamente fino a 24 ore prima dell'orario stabilito."
                tr="Randevunuzu planlanan saatten 24 saat öncesine kadar ücretsiz olarak iptal edebilir veya erteleyebilirsiniz."
                ru="Вы можете бесплатно отменить или перенести визит за 24 часа до назначенного времени."
              />
            </p>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#e8e0d5]">
              <button
                type="button"
                onClick={handleCloseCancelModal}
                disabled={cancelBookingMutation.isPending}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#4a5568] hover:bg-[#f7f2ea] transition-colors cursor-pointer disabled:opacity-50"
              >
                <T
                  en="Keep Appointment"
                  ar="الاحتفاظ بالموعد"
                  de="Termin behalten"
                  es="Mantener cita"
                  fr="Conserver le rendez-vous"
                  it="Mantieni appuntamento"
                  tr="Randevuyu Koru"
                  ru="Оставить запись"
                />
              </button>

              <button
                type="button"
                onClick={handleConfirmCancel}
                disabled={cancelBookingMutation.isPending}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-sm cursor-pointer transition-all disabled:opacity-50"
              >
                {cancelBookingMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <T
                      en="Cancelling..."
                      ar="جاري الإلغاء..."
                      de="Stornierung..."
                      es="Cancelando..."
                      fr="Annulation..."
                      it="Cancellazione..."
                      tr="İptal ediliyor..."
                      ru="Отмена..."
                    />
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4" />
                    <T
                      en="Yes, Cancel Visit"
                      ar="نعم، إلغاء الموعد"
                      de="Ja, Termin stornieren"
                      es="Sí, cancelar cita"
                      fr="Oui, annuler la visite"
                      it="Sì, cancella visita"
                      tr="Evet, Randevuyu İptal Et"
                      ru="Да, отменить"
                    />
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

