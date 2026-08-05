// hooks/usePatientLogin.ts
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { usePatientAuth } from "@/context/PatientAuthContext";
import { toast } from "sonner";
import axios from "axios";

export function usePatientLogin() {
  const t = useTranslations("Auth");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const { login, isAuthenticated } = usePatientAuth();
  const emailRef = useRef<HTMLInputElement | null>(null);

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  // Auto-focus
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, router, redirectTo]);

  // Update a single field and clear error
  const updateField = (field: "username" | "password", value: string) => {
    setError("");
    setLoginForm((prev) => ({ ...prev, [field]: value }));
  };

  const getErrorMessage = (err: unknown): string => {
    if (axios.isAxiosError(err)) {
      return (
        err.response?.data?.detail || err.response?.data?.message || err.message
      );
    }
    if (err instanceof Error) return err.message;
    return "Login failed. Please try again.";
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (lockedUntil && Date.now() < lockedUntil) {
      const remaining = Math.ceil((lockedUntil - Date.now()) / 1000 / 60);
      toast.error(`Too many attempts. Please wait ${remaining} minute(s).`);
      return;
    }

    if (!loginForm.username.trim()) {
      setError(t("usernameRequired") || "Username or email is required.");
      return;
    }
    if (!loginForm.password) {
      setError(t("passwordRequired") || "Password is required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await login(loginForm.username, loginForm.password);
      setAttempts(0);
      toast.success(t("loginSuccess") || "Login successful!");
      router.push(redirectTo);
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      setError(message);
      toast.error(message);

      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 5) {
        setLockedUntil(Date.now() + 5 * 60 * 1000);
        toast.error("Too many failed attempts. Please wait 5 minutes.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Escape to clear
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLoginForm({ username: "", password: "" });
        setError("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return {
    loading,
    loginForm,
    updateField,
    handleLogin,
    showPassword,
    setShowPassword,
    error,
    emailRef,
    lockedUntil,
    t,
  };
}
