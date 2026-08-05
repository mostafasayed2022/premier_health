"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { usePatientAuth } from "@/context/PatientAuthContext";
import { useTranslations } from "next-intl";

export function WelcomeToast() {
  const { patientUser, isAuthenticated, isLoading } = usePatientAuth();
  const t = useTranslations("Welcome");

  useEffect(() => {
    if (isLoading) return;

    // Trigger toast only once per browser session
    const hasShownWelcome = sessionStorage.getItem("welcome_toast_shown");
    if (!hasShownWelcome) {
      sessionStorage.setItem("welcome_toast_shown", "true");

      const timer = setTimeout(() => {
        if (isAuthenticated && patientUser) {
          const name = patientUser.first_name || patientUser.username || "";
          toast.success(t("welcomeBack", { name }), {
            duration: 5000,
            description: t("welcomeBackDesc"),
          });
        } else {
          toast.info(t("welcomeGuest"), {
            duration: 5000,
            description: t("welcomeGuestDesc"),
          });
        }
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [isLoading, isAuthenticated, patientUser, t]);

  return null;
}
