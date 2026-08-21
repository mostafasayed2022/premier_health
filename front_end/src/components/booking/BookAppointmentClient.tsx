"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Stethoscope,
  FlaskConical,
  Building2,
  User,
  Calendar,
  CreditCard,
  ClipboardCheck,
} from "lucide-react";
import {
  useBookingState,
  BookingHero,
  StepIndicator,
  Step1Department,
  Step2Service,
  Step3Branch,
  Step4Doctor,
  Step5DateTime,
  Step6Payment,
  Step7Confirm,
  BookingSuccess,
} from "@/components/booking";

// ─── NOTE ──────────────────────────────────────────────────────────────────────
// PatientProtectedRoute has been intentionally removed.
// Guest booking MUST work without login.
// Authentication is optional — users can choose to login/register in Step 7.
// Backend continues to handle guest patient creation securely.
// ─────────────────────────────────────────────────────────────────────────────

export function BookAppointmentClient() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const t = useTranslations("Booking");

  const {
    step,
    confirmed,
    booking,
    updateBooking,
    resetBooking,
    canProceed,
    nextStep,
    prevStep,
    handleConfirm,
    isSubmitting,
  } = useBookingState();

  if (confirmed) {
    return <BookingSuccess onReset={resetBooking} />;
  }

  const stepTitles = [
    { title: t("selectDept"), icon: Stethoscope },
    { title: t("selectSvc"), icon: FlaskConical },
    { title: t("selectBranch"), icon: Building2 },
    { title: t("selectDoc"), icon: User },
    { title: t("selectDateTime"), icon: Calendar },
    { title: t("paymentMethod"), icon: CreditCard },
    { title: t("reviewTitle"), icon: ClipboardCheck },
  ];

  const currentHeader = stepTitles[step - 1] || stepTitles[0];
  const StepHeaderIcon = currentHeader.icon;

  return (
    <div className="flex flex-col bg-slate-50/60 min-h-screen pb-20 sm:pb-24">
      <BookingHero />

      <div className="luxury-container pt-2 sm:pt-4 max-w-4xl mx-auto px-3 sm:px-6">
        <StepIndicator currentStep={step} />

        <div className="bg-white border border-accent/20 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 shadow-md shadow-primary/5 mb-8 transition-all relative overflow-hidden">
          {/* Top Step Header Banner */}
          <div className="flex items-center gap-3 pb-4 mb-6 sm:pb-6 sm:mb-8 border-b border-accent/15">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 shadow-sm">
              <StepHeaderIcon size={18} className="sm:hidden" />
              <StepHeaderIcon size={20} className="hidden sm:block" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-accent block">
                {t(("step" + step) as any)} • {step} / 7
              </span>
              <h2 className="text-lg sm:text-2xl font-serif font-bold text-primary truncate">
                {currentHeader.title}
              </h2>
            </div>
          </div>

          {/* Dynamic Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: isAr ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isAr ? 20 : -20 }}
              transition={{ duration: 0.25 }}
            >
              {step === 1 && (
                <Step1Department
                  selected={booking.department}
                  onSelect={(id) => updateBooking("department", id)}
                />
              )}
              {step === 2 && (
                <Step2Service
                  deptId={booking.department}
                  selected={booking.service}
                  onSelect={(id) => updateBooking("service", id)}
                />
              )}
              {step === 3 && (
                <Step3Branch
                  selected={booking.branch}
                  onSelect={(id) => updateBooking("branch", id)}
                  serviceId={booking.service}
                />
              )}
              {step === 4 && (
                <Step4Doctor
                  selected={booking.doctor}
                  onSelect={(id) => updateBooking("doctor", id)}
                  branchId={booking.branch}
                  serviceId={booking.service}
                />
              )}
              {step === 5 && (
                <Step5DateTime
                  selectedDate={booking.date}
                  selectedTime={booking.time}
                  onSelect={(d, tVal) => {
                    updateBooking("date", d);
                    updateBooking("time", tVal);
                  }}
                  doctorId={booking.doctor}
                  branchId={booking.branch}
                />
              )}
              {step === 6 && (
                <Step6Payment
                  selected={booking.payment}
                  onSelect={(m) => updateBooking("payment", m)}
                />
              )}
              {step === 7 && (
                <Step7Confirm
                  booking={booking}
                  onEmailChange={(v) => updateBooking("email", v)}
                  onPhoneChange={(v) => updateBooking("phone", v)}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-8 sm:mt-10 pt-4 sm:pt-6 border-t border-accent/15">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-accent/30 text-primary font-bold text-xs sm:text-xs hover:bg-accent/10 active:scale-95 transition-all shadow-sm min-h-[44px]"
              >
                <ArrowLeft size={15} className="rtl:rotate-180" />
                <span>{t("previousStep")}</span>
              </button>
            ) : (
              <div className="hidden sm:block" />
            )}

            {step < 7 ? (
              <button
                type="button"
                disabled={!canProceed}
                onClick={nextStep}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-accent text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-accent/20 hover:bg-accent/90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all min-h-[44px]"
              >
                <span>{t("nextStep")}</span>
                <ArrowRight size={15} className="rtl:rotate-180" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleConfirm}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-bold text-xs tracking-wider uppercase shadow-md shadow-primary/20 hover:bg-primary/90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all min-h-[48px]"
              >
                <CheckCircle size={17} />
                <span>
                  {isSubmitting ? t("submitting") : t("confirmAndPay")}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
