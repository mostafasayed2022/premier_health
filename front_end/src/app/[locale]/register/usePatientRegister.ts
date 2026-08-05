// hooks/usePatientRegister.ts
"use client";

import React, { useState, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { usePatientAuth } from "@/context/PatientAuthContext";
import { toast } from "sonner";
import axios from "axios";
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth";
import { ZodError } from "zod";

export function usePatientRegister() {
  const t = useTranslations("Auth");
  const locale = useLocale();
  const isAr = locale === "ar";
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const { register, isAuthenticated } = usePatientAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, router, redirectTo]);

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterFormData, string>>
  >({});
  const [formError, setFormError] = useState("");
  const [registerForm, setRegisterForm] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });

  // ── Update field and clear its error ───────────────────────
  const updateField = useCallback(
    (field: keyof RegisterFormData, value: string) => {
      setRegisterForm((prev) => ({ ...prev, [field]: value }));
      // Clear field-level error when user types
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
      // Clear form-level error
      setFormError("");
    },
    [],
  );

  // ── Get server error message safely ────────────────────────
  const getErrorMessage = useCallback((err: unknown): string => {
    if (axios.isAxiosError(err)) {
      // Handle Django REST Framework field errors
      const data = err.response?.data;
      if (data) {
        // Try common DRF error formats
        return (
          data.detail ||
          data.message ||
          data.error ||
          data.email?.[0] ||
          data.password?.[0] ||
          data.phone?.[0] ||
          data.firstName?.[0] ||
          data.lastName?.[0] ||
          err.message
        );
      }
      return err.message;
    }
    if (err instanceof Error) {
      return err.message;
    }
    return "Registration failed. Please try again.";
  }, []);

  // ── Handle registration ────────────────────────────────────
  const handleRegister = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      setErrors({});
      setFormError("");

      // Validate with Zod
      try {
        registerSchema.parse(registerForm);
      } catch (err) {
        if (err instanceof ZodError) {
          const fieldErrors: Partial<Record<keyof RegisterFormData, string>> =
            {};

          err.issues.forEach((issue) => {
            const field = issue.path[0] as keyof RegisterFormData | undefined;
            if (field && !fieldErrors[field]) {
              fieldErrors[field] = issue.message;
            }
          });

          setErrors(fieldErrors);
          const firstError = err.issues[0]?.message || "Validation failed.";
          toast.error(firstError);
          return;
        }
        // Re-throw if it's not a ZodError (shouldn't happen with parse)
        throw err;
      }

      setLoading(true);

      try {
        await register({
          email: registerForm.email,
          password: registerForm.password,
          phoneNumber: registerForm.phone,
          firstName: registerForm.firstName,
          lastName: registerForm.lastName,
        });
        toast.success(t("registerSuccess") || "Account created successfully!");
        router.push(`/login?redirect=${encodeURIComponent(redirectTo)}`);
      } catch (err: unknown) {
        const message = getErrorMessage(err);
        setFormError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    },
    [registerForm, register, router, t, getErrorMessage],
  );

  return {
    isAr,
    loading,
    registerForm,
    setRegisterForm: updateField,
    handleRegister,
    showPassword,
    setShowPassword,
    errors,
    formError,
    t,
  };
}
