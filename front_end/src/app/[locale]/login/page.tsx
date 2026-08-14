// app/[locale]/login/page.tsx
"use client";

import React from "react";
import { usePatientLogin } from "./usePatientLogin";
import { LogIn, ArrowLeft, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { T } from "@/i18n/T";

export default function PatientLoginPage() {
  const t = useTranslations("Auth");
  const {
    loading,
    loginForm,
    updateField, // ← Changed name
    handleLogin,
    showPassword,
    setShowPassword,
    error,
    emailRef,
    lockedUntil,
  } = usePatientLogin();

  const isLocked = lockedUntil && Date.now() < lockedUntil;

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
          <div className="relative overflow-hidden rounded-full border border-accent/15 p-0.5 bg-beige/50 shadow-sm">
            <Image
              src="/logo/logo1.webp"
              alt="Premier Health"
              width={65}
              height={65}
              className="rounded-full object-contain"
            />
          </div>
          <h2 className="text-xl font-bold tracking-wider text-primary font-serif">
            <span className="text-[#998675]">PREMIER</span>
            <span className="text-[#385366] font-light ml-1.5 rtl:mr-1.5">
              HEALTH
            </span>
          </h2>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
            {t("portalAccess")}
          </p>
        </div>

        {/* Form Title */}
        <div className="text-center">
          <h1 className="text-lg font-serif font-bold text-primary">
            {t("welcomeBack")}
          </h1>
          <p className="text-[11px] text-slate-400 mt-1">
            {t("welcomeBackDesc")}
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-[11px] px-4 py-2.5 rounded-xl text-center font-medium">
            {error}
          </div>
        )}

        {/* Locked Banner */}
        {isLocked && (
          <div className="bg-amber-50 border border-amber-200 text-amber-700 text-[11px] px-4 py-2.5 rounded-xl text-center font-medium">
            <T
              en={`Account temporarily locked. Please wait ${Math.ceil((lockedUntil - Date.now()) / 1000 / 60)} minute(s).`}
              ar={`الحساب مغلق مؤقتاً. يرجى الانتظار ${Math.ceil((lockedUntil - Date.now()) / 1000 / 60)} دقيقة.`}
              de={`Konto vorübergehend gesperrt. Bitte warten Sie ${Math.ceil((lockedUntil - Date.now()) / 1000 / 60)} Minute(n).`}
              es={`Cuenta bloqueada temporalmente. Por favor, espere ${Math.ceil((lockedUntil - Date.now()) / 1000 / 60)} minuto(s).`}
              fr={`Compte temporairement verrouillé. Veuillez patienter ${Math.ceil((lockedUntil - Date.now()) / 1000 / 60)} minute(s).`}
              it={`Account temporaneamente bloccato. Si prega di attendere ${Math.ceil((lockedUntil - Date.now()) / 1000 / 60)} minuto/i.`}
              tr={`Hesap geçici olarak kilitlendi. Lütfen ${Math.ceil((lockedUntil - Date.now()) / 1000 / 60)} dakika bekleyin.`}
              ru={`Аккаунт временно заблокирован. Пожалуйста, подождите ${Math.ceil((lockedUntil - Date.now()) / 1000 / 60)} мин.`}
            />
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {/* Username / Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] uppercase tracking-widest font-bold text-foreground/60">
              {t("emailOrUsername")}
            </label>
            <input
              ref={emailRef}
              type="text"
              required
              value={loginForm.username}
              onChange={(e) => updateField("username", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-accent/20 text-xs focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/5 bg-[#FAF9F6] text-primary font-medium transition-all duration-200"
              placeholder={t("usernameOrEmailPlaceholder")}
              disabled={loading || !!isLocked}
            />
          </div>

          {/* Password with toggle */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] uppercase tracking-widest font-bold text-foreground/60">
              {t("password")}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={loginForm.password}
                onChange={(e) => updateField("password", e.target.value)}
                className="w-full px-4 py-3 pr-10 rounded-xl border border-accent/20 text-xs focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/5 bg-[#FAF9F6] text-primary font-medium transition-all duration-200"
                placeholder="••••••••"
                disabled={loading || !!isLocked}
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
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-[10px] text-accent hover:underline font-bold transition-colors"
            >
              {t("forgotPassword") || "Forgot password?"}
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !!isLocked}
            className="mt-1 w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-[#152a3f] hover:from-accent hover:to-accent text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 shadow-[0_4px_16px_rgba(31,61,90,0.15)] hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none disabled:transform-none"
          >
            <LogIn size={14} />
            {loading ? t("authenticating") : t("login")}
          </button>
        </form>

        {/* Footer Link to Register */}
        <div className="text-center border-t border-accent/10 pt-4 mt-2">
          <p className="text-[11px] text-slate-500">
            {t("noAccount")}{" "}
            <Link
              href="/register"
              className="text-accent hover:text-primary font-bold hover:underline transition-colors ml-1 rtl:mr-1"
            >
              {t("createOne")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
