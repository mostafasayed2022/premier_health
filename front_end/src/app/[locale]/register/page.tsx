// app/[locale]/register/page.tsx
"use client";

import React from "react";
import { usePatientRegister } from "./usePatientRegister";
import { UserPlus, ArrowLeft, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import type { RegisterFormData } from "@/lib/validations/auth";

// ── Helper: Field with error ──────────────────────────────────
interface FieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

function FormField({ label, required, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[9px] uppercase tracking-widest font-bold text-foreground/60">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <span className="text-[10px] text-red-500 font-medium">{error}</span>
      )}
    </div>
  );
}

export default function PatientRegisterPage() {
  const t = useTranslations("Auth");
  const {
    loading,
    registerForm,
    setRegisterForm,
    handleRegister,
    showPassword,
    setShowPassword,
    errors,
    formError,
  } = usePatientRegister();

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#FAF9F6] via-[#F4EFE6] to-[#EAE3D2] flex items-center justify-center p-6 select-none font-sans relative overflow-hidden">
      {/* Glowing luxury background decorations */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] top-[-10%] left-[-10%] pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-primary/5 blur-[140px] bottom-[-20%] right-[-10%] pointer-events-none" />

      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-md p-8 flex flex-col gap-6 relative overflow-hidden card-gold-accent transition-all duration-300 hover:shadow-md">
        {/* Back Link */}
        <Link
          href="/"
          className="absolute top-6 left-6 text-[10px] uppercase tracking-wider font-bold text-slate-400 hover:text-primary flex items-center gap-1 transition-all bg-white/60 border border-slate-100 hover:border-slate-200 px-3 py-1 rounded-full shadow-sm"
        >
          <ArrowLeft size={12} className="shrink-0" /> {t("home")}
        </Link>

        {/* Logo and Header */}
        <div className="flex flex-col items-center text-center gap-2.5 mt-6">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <Image
              src="/logo/logo.webp"
              alt="Premier Health"
              width={64}
              height={64}
              priority
              className="object-contain"
            />
          </div>
          <h2 className="text-xl font-bold tracking-wider text-primary font-serif">
            <span className="text-[#998675]">PREMIER</span>
            <span className="text-[#385366] font-light ml-1.5 rtl:mr-1.5">
              HEALTH
            </span>
          </h2>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
            {t("createAccountTitle")}
          </p>
        </div>

        {/* Form Title */}
        <div className="text-center">
          <h1 className="text-lg font-serif font-bold text-primary">
            {t("registerTitle")}
          </h1>
          <p className="text-[11px] text-slate-400 mt-1">{t("registerDesc")}</p>
        </div>

        {/* Form Error Banner */}
        {formError && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-[11px] px-4 py-2.5 rounded-xl text-center font-medium">
            {formError}
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <FormField label={t("firstName")} required error={errors.firstName}>
              <input
                type="text"
                required
                value={registerForm.firstName}
                onChange={(e) => setRegisterForm("firstName", e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none focus:ring-4 bg-[#FAF9F6] text-primary font-medium transition-all duration-200 ${
                  errors.firstName
                    ? "border-red-300 focus:border-red-400 focus:ring-red-50"
                    : "border-accent/20 focus:border-accent focus:ring-accent/5"
                }`}
                placeholder={t("firstNamePlaceholder")}
                disabled={loading}
              />
            </FormField>
            <FormField label={t("lastName")} required error={errors.lastName}>
              <input
                type="text"
                required
                value={registerForm.lastName}
                onChange={(e) => setRegisterForm("lastName", e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none focus:ring-4 bg-[#FAF9F6] text-primary font-medium transition-all duration-200 ${
                  errors.lastName
                    ? "border-red-300 focus:border-red-400 focus:ring-red-50"
                    : "border-accent/20 focus:border-accent focus:ring-accent/5"
                }`}
                placeholder={t("lastNamePlaceholder")}
                disabled={loading}
              />
            </FormField>
          </div>

          {/* Email */}
          <FormField label={t("emailAddress")} required error={errors.email}>
            <input
              type="email"
              required
              value={registerForm.email}
              onChange={(e) => setRegisterForm("email", e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none focus:ring-4 bg-[#FAF9F6] text-primary font-medium transition-all duration-200 ${
                errors.email
                  ? "border-red-300 focus:border-red-400 focus:ring-red-50"
                  : "border-accent/20 focus:border-accent focus:ring-accent/5"
              }`}
              placeholder="example@mail.com"
              disabled={loading}
            />
          </FormField>

          {/* Password */}
          <FormField label={t("password")} required error={errors.password}>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={registerForm.password}
                onChange={(e) => setRegisterForm("password", e.target.value)}
                className={`w-full px-4 py-3 pr-10 rounded-xl border text-xs focus:outline-none focus:ring-4 bg-[#FAF9F6] text-primary font-medium transition-all duration-200 ${
                  errors.password
                    ? "border-red-300 focus:border-red-400 focus:ring-red-50"
                    : "border-accent/20 focus:border-accent focus:ring-accent/5"
                }`}
                placeholder={t("passwordPlaceholder") || "Min. 8 characters"}
                disabled={loading}
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-accent transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </FormField>

          {/* Phone */}
          <FormField label={t("phoneNumber")} required error={errors.phone}>
            <input
              type="tel"
              required
              value={registerForm.phone}
              onChange={(e) => setRegisterForm("phone", e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none focus:ring-4 bg-[#FAF9F6] text-primary font-medium transition-all duration-200 ${
                errors.phone
                  ? "border-red-300 focus:border-red-400 focus:ring-red-50"
                  : "border-accent/20 focus:border-accent focus:ring-accent/5"
              }`}
              placeholder="+20 xxx xxx xxxx"
              disabled={loading}
            />
          </FormField>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-primary to-[#152a3f] hover:from-accent hover:to-accent text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(31,61,90,0.15)] hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none disabled:transform-none"
          >
            {loading ? (
              t("creatingAccount")
            ) : (
              <>
                <UserPlus size={14} />
                {t("createAccount")}
              </>
            )}
          </button>
        </form>

        {/* Footer Link to Login */}
        <div className="text-center border-t border-accent/10 pt-4 mt-2">
          <p className="text-[11px] text-slate-500">
            {t("alreadyHaveAccount")}{" "}
            <Link
              href="/login"
              className="text-accent hover:text-primary font-bold hover:underline transition-colors ml-1 rtl:mr-1"
            >
              {t("login")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
