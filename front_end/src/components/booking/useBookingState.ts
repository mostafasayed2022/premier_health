import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { BookingData } from "./types";
import { createBooking, getBookingStatus, confirmCyberSourcePayment } from "@/lib/api";
import type { CyberSourceCheckoutSession } from "@/lib/api/endpoints";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { getErrorMessage } from "@/lib/utils/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  trackStartBooking,
  trackSubmitLead,
  trackBookingComplete,
  trackPurchase,
} from "@/lib/analytics/events";
import { getAttribution, cleanAttribution } from "@/lib/analytics/attribution";

const initialBookingData: BookingData = {
  department: "",
  service: "",
  branch: "",
  doctor: "",
  date: "",
  time: "",
  payment: "",
  email: "",
  phone: "",
};

export function useBookingState() {
  const t = useTranslations("Booking");
  const queryClient = useQueryClient();

  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [booking, setBooking] = useState<BookingData>(initialBookingData);
  const [isPolling, setIsPolling] = useState(false);
  const [cyberSourceSession, setCyberSourceSession] = useState<CyberSourceCheckoutSession | null>(null);

  // ─── Idempotency Guards ────────────────────────────────────────────
  // Prevent duplicate analytics events (React StrictMode, re-renders)
  const firedStartBookingRef = useRef(false);
  const firedSubmitLeadRef = useRef(false);
  const firedBookingsRef = useRef<Set<string>>(new Set());

  // ─── TanStack Mutation for Booking ────────────────────────────────
  const bookingMutation = useMutation({
    mutationFn: createBooking,
    onSuccess: (data) => {
      // Online CyberSource checkout is not a confirmed booking yet.
      if (data.cybersource) {
        setCyberSourceSession(data.cybersource);
        queryClient.invalidateQueries({ queryKey: ["bookings"] });
        return;
      }

      toast.success(t("bookingConfirmed"));
      queryClient.invalidateQueries({ queryKey: ["bookings"] });

      // ── booking_complete: only fire after confirmed API success ──
      const bookingId = String(data?.booking?.id ?? "");
      if (bookingId && !firedBookingsRef.current.has(bookingId)) {
        firedBookingsRef.current.add(bookingId);
        trackBookingComplete({
          booking_id: bookingId,
          service_id: booking.service,
          service_name: undefined, // resolved server-side
          branch_id: booking.branch,
          branch_name: undefined,
          value: undefined,
          currency: "EGP",
        });
      }

      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        setConfirmed(true);
      }
    },
    onError: (error: AxiosError | Error | unknown) => {
      // NOTE: booking_complete is deliberately NOT fired here
      const errMsg = getErrorMessage(error, t("bookingFailed"));
      toast.error(errMsg);

      const err = error as AxiosError | undefined;
      if ((err && err.response && err.response.status) === 409) {
        toast.error(t("slotJustBooked"));
        setStep(5);
      }
    },
  });

  // ─── Poll for Payment Status ──────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get("payment_status");
    const bookingId = params.get("booking_id");

    if (!paymentStatus) return;

    window.history.replaceState({}, document.title, window.location.pathname);

    if (paymentStatus === "failed") {
      toast.error(t("paymentFailed"));
      setStep(6);
      return;
    }

    if ((paymentStatus === "processing" || paymentStatus === "success") && bookingId) {
      setIsPolling(true);
      const toastId = toast.loading(t("verifyingPayment"));
      let attempts = 0;
      const maxAttempts = 8;

      const poll = setInterval(async () => {
        attempts++;
        try {
          const data = await getBookingStatus(bookingId);

          if (data.payment_status === "paid") {
            const txnId = data.transaction_id || bookingId;
            const storageKey = `premier_purchased_${txnId}`;
            if (!sessionStorage.getItem(storageKey)) {
              trackPurchase({ transaction_id: txnId, booking_id: bookingId, value: Number(data.amount || 0), currency: data.currency || "EGP" });
              sessionStorage.setItem(storageKey, "1");
            }
            clearInterval(poll);
            setIsPolling(false);
            toast.dismiss(toastId);
            toast.success(t("paymentSuccess"));
            setConfirmed(true);
          } else if (data.status === "cancelled") {
            clearInterval(poll);
            setIsPolling(false);
            toast.dismiss(toastId);
            toast.error(t("paymentFailed"));
            setStep(6);
          } else if (attempts >= maxAttempts) {
            clearInterval(poll);
            setIsPolling(false);
            toast.dismiss(toastId);
            toast.warning(t("verifyingLonger"));
            setTimeout(() => {
              window.location.href = "/dashboard/bookings";
            }, 2000);
          }
        } catch (error) {
          console.error("Error polling booking status:", error);
          if (attempts >= maxAttempts) {
            clearInterval(poll);
            setIsPolling(false);
            toast.dismiss(toastId);
            toast.error(t("cannotVerifyPayment"));
          }
        }
      }, 1500);

      return () => {
        clearInterval(poll);
        toast.dismiss(toastId);
      };
    }
  }, [t]);

  // ─── Booking State Management ─────────────────────────────────────
  const updateBooking = useCallback((key: keyof BookingData, val: string) => {
    setBooking((prev) => ({ ...prev, [key]: val }));
  }, []);

  const resetBooking = useCallback(() => {
    setBooking(initialBookingData);
    setStep(1);
    setConfirmed(false);
    setCyberSourceSession(null);
    firedStartBookingRef.current = false;
    firedSubmitLeadRef.current = false;
  }, []);

  // ─── Validation ──────────────────────────────────────────────────
  const canProceed = useCallback((): boolean => {
    switch (step) {
      case 1:
        return !!booking.department;
      case 2:
        return !!booking.service;
      case 3:
        return !!booking.branch;
      case 4:
        return !!booking.doctor;
      case 5:
        return !!booking.date && !!booking.time;
      case 6:
        return !!booking.payment;
      case 7: {
        // Authenticated users: contact details are auto-synced from profile
        // by useStep7Confirm's effect. Check localStorage as a zero-coupling
        // proxy so we don't block the button before the sync fires.
        const isAuthd =
          typeof window !== "undefined" && !!localStorage.getItem("patient_access");
        if (isAuthd) return true;
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email);
        const phoneValid = booking.phone.replace(/\D/g, "").length >= 10;
        return emailValid && phoneValid;
      }
      default:
        return true;
    }
  }, [step, booking]);

  // ─── Navigation + Analytics ───────────────────────────────────────
  const nextStep = useCallback(() => {
    if (canProceed()) {
      const nextStepNum = Math.min(7, step + 1);
      setStep(nextStepNum);

      // start_booking: fire on first meaningful step transition (1→2)
      if (step === 1 && !firedStartBookingRef.current) {
        firedStartBookingRef.current = true;
        trackStartBooking({
          booking_source: "booking_wizard",
        });
      }

      // submit_lead: fire when user enters contact step (6→7) with dept+service selected
      if (step === 6 && !firedSubmitLeadRef.current) {
        firedSubmitLeadRef.current = true;
        trackSubmitLead({
          lead_type: "booking",
          source: "booking_wizard",
        });
      }
    } else {
      toast.warning(t("completeCurrentStep"));
    }
  }, [canProceed, step, t]);

  const prevStep = useCallback(() => {
    setStep((prev) => Math.max(1, prev - 1));
  }, []);

  // ─── Submit Booking ──────────────────────────────────────────────
  const handleConfirm = useCallback(async () => {
    if (bookingMutation.isPending) return;

    // Get current attribution to attach to booking
    const attribution = cleanAttribution(getAttribution());

    const bookingData = {
      doctor: Number(booking.doctor),
      service: Number(booking.service),
      branch: Number(booking.branch),
      date: booking.date,
      start_time: booking.time,
      payment_method: booking.payment,
      email: booking.email || undefined,
      phone: booking.phone || undefined,
      token:
        typeof window !== "undefined"
          ? localStorage.getItem("patient_access") || undefined
          : undefined,
      // Attach attribution for campaign tracking (Zero-PII)
      attribution: Object.keys(attribution).length > 0 ? attribution : undefined,
    };

    bookingMutation.mutate(bookingData);
  }, [booking, bookingMutation]);

  const handleCyberSourceComplete = useCallback(
    async (resultJwt: string): Promise<"paid" | "failed" | "pending"> => {
      if (!cyberSourceSession) {
        throw new Error("CyberSource checkout session is missing.");
      }

      const verification = await confirmCyberSourcePayment(
        cyberSourceSession.booking_id,
        resultJwt,
      );
      const bookingId = cyberSourceSession.booking_id;

      if (verification.payment_status === "paid") {
        if (bookingId && !firedBookingsRef.current.has(bookingId)) {
          firedBookingsRef.current.add(bookingId);
          trackBookingComplete({
            booking_id: bookingId,
            service_id: booking.service,
            service_name: undefined,
            branch_id: booking.branch,
            branch_name: undefined,
            value: Number(verification.amount || 0),
            currency: verification.currency || "EGP",
          });
        }

        const transactionId = verification.transaction_id || bookingId;
        const storageKey = `premier_purchased_${transactionId}`;
        if (!sessionStorage.getItem(storageKey)) {
          trackPurchase({
            transaction_id: transactionId,
            booking_id: bookingId,
            value: Number(verification.amount || 0),
            currency: verification.currency || "EGP",
          });
          sessionStorage.setItem(storageKey, "1");
        }

        setCyberSourceSession(null);
        setConfirmed(true);
        queryClient.invalidateQueries({ queryKey: ["bookings"] });
        toast.success(t("paymentSuccess"));
        return "paid";
      }

      if (verification.payment_status === "failed") {
        setCyberSourceSession(null);
        setStep(6);
        toast.error(t("paymentFailed"));
        return "failed";
      }

      toast.warning(
        "Payment is awaiting verification. Do not submit another payment yet.",
      );
      return "pending";
    },
    [cyberSourceSession, queryClient, t, booking],
  );

  return {
    step,
    confirmed,
    booking,
    cyberSourceSession,
    handleCyberSourceComplete,
    isSubmitting: bookingMutation.isPending || isPolling,
    isError: bookingMutation.isError,
    error: bookingMutation.error,
    setStep,
    setConfirmed,
    updateBooking,
    resetBooking,
    canProceed: canProceed(),
    nextStep,
    prevStep,
    handleConfirm,
    isPolling,
  };
}
