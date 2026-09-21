"use client";

import React from "react";
import {
  CheckCircle,
  Stethoscope,
  FlaskConical,
  Building2,
  User,
  Calendar,
  Clock,
  CreditCard,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";
import { BookingData } from "./types";
import { useStep7Confirm } from "./useStep7Confirm";
import { useTranslations } from "next-intl";

interface Step7ConfirmProps {
  booking: BookingData;
  onEmailChange: (v: string) => void;
  onPhoneChange: (v: string) => void;
}

export function Step7Confirm({
  booking,
  onEmailChange,
  onPhoneChange,
}: Step7ConfirmProps) {
  const {
    t,
    authMode,
    setAuthMode,
    loginForm,
    setLoginForm,
    registerForm,
    setRegisterForm,
    authLoading,
    patientUser,
    isAuthenticated,
    logout,
    handleLoginSubmit,
    handleRegisterSubmit,
    dept,
    svc,
    branch,
    doc,
    getPaymentLabel,
  } = useStep7Confirm({ booking, onEmailChange, onPhoneChange });

  const tAuth = useTranslations("Auth");

  // Data rows configuration — names are returned already translated by Django
  const detailRows = [
    {
      icon: Stethoscope,
      label: t("step1"),
      value: dept?.name || booking.department || "-",
    },
    {
      icon: FlaskConical,
      label: t("step2"),
      value: svc
        ? `${svc.name}${svc.price != null ? ` — $${svc.price}` : ""}`
        : booking.service || "-",
    },
    {
      icon: Building2,
      label: t("step3"),
      value: branch?.name || booking.branch || "-",
    },
    {
      icon: User,
      label: t("step4"),
      value: doc?.name || booking.doctor || "-",
    },
    {
      icon: Calendar,
      label: t("date"),
      value: booking.date || "-",
    },
    {
      icon: Clock,
      label: t("time"),
      value: booking.time || "-",
    },
    {
      icon: CreditCard,
      label: t("step6"),
      value: getPaymentLabel(booking.payment) || "-",
    },
  ];

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      {/* Booking Summary Card */}
      <div className="bg-beige/60 border border-accent/20 rounded-xl sm:rounded-2xl divide-y divide-accent/15 overflow-hidden shadow-sm">
        {detailRows.map((row, i) => (
          <div
            key={i}
            className="flex items-center gap-3 sm:gap-4 px-3.5 py-3 sm:px-6 sm:py-4 hover:bg-amber-50/40 transition-colors"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
              <row.icon size={15} className="sm:hidden" />
              <row.icon size={16} className="hidden sm:block" />
            </div>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-foreground/75 w-20 sm:w-28 shrink-0">
              {row.label}
            </span>
            <span className="text-xs sm:text-sm text-primary font-bold truncate">
              {row.value || "-"}
            </span>
          </div>
        ))}
      </div>

      {/* Booking Authentication & Contact Section */}
      <div className="bg-white rounded-2xl border border-accent/15 p-6 flex flex-col gap-4">
        {/* Tab Header if NOT logged in */}
        {!isAuthenticated ? (
          <>
            <div className="flex border-b border-accent/10 pb-2 mb-2 gap-4">
              <button
                type="button"
                onClick={() => setAuthMode("guest")}
                className={`text-xs font-bold uppercase tracking-wider pb-1 transition-all ${
                  authMode === "guest"
                    ? "text-primary border-b-2 border-accent"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {t("bookAsGuest")}
              </button>
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                className={`text-xs font-bold uppercase tracking-wider pb-1 transition-all ${
                  authMode === "login"
                    ? "text-primary border-b-2 border-accent"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {tAuth("login")}
              </button>
              <button
                type="button"
                onClick={() => setAuthMode("register")}
                className={`text-xs font-bold uppercase tracking-wider pb-1 transition-all ${
                  authMode === "register"
                    ? "text-primary border-b-2 border-accent"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {tAuth("createAccount")}
              </button>
            </div>
            {authMode === "guest" && (
              <p className="text-[10px] text-slate-400 leading-relaxed -mt-1 mb-1">
                {t("guestNote")}
              </p>
            )}
          </>
        ) : (
          /* Logged-in User Info */
          <div className="flex items-center justify-between border-b border-accent/10 pb-3 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-primary font-bold text-xs uppercase">
                {patientUser?.first_name?.[0] ||
                  patientUser?.username?.[0] ||
                  "?"}
              </div>
              <div>
                <h5 className="text-xs font-bold text-primary">
                  {t("loggedInAs")}{" "}
                  {patientUser?.first_name || patientUser?.username}
                </h5>
                {patientUser?.email && (
                  <p className="text-[10px] text-slate-400">
                    {patientUser.email}
                  </p>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={logout}
              className="text-[10px] uppercase tracking-wider font-bold text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors"
            >
              <LogOut size={12} /> {tAuth("logout")}
            </button>
          </div>
        )}

        {/* Guest / Authenticated Contact Form */}
        {(authMode === "guest" || isAuthenticated) && (
          <div className="flex flex-col gap-4">
            <h4 className="font-serif text-sm font-bold text-primary uppercase tracking-wider">
              {t("contactDetails")}
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="booking-email"
                  className="text-[10px] uppercase tracking-wider font-bold text-foreground/70"
                >
                  {tAuth("emailAddress")} <span className="text-accent">*</span>
                </label>
                <input
                  id="booking-email"
                  type="email"
                  required
                  disabled={isAuthenticated}
                  value={booking.email}
                  onChange={(e) => onEmailChange(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-accent/20 text-xs focus:outline-none focus:border-accent bg-beige/30 text-primary font-medium transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
                  placeholder="example@domain.com"
                  autoComplete="email"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="booking-phone"
                  className="text-[10px] uppercase tracking-wider font-bold text-foreground/70"
                >
                  {tAuth("phoneNumber")} <span className="text-accent">*</span>
                </label>
                <input
                  id="booking-phone"
                  type="tel"
                  required
                  disabled={isAuthenticated}
                  value={booking.phone}
                  onChange={(e) => onPhoneChange(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-accent/20 text-xs focus:outline-none focus:border-accent bg-beige/30 text-primary font-medium transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
                  placeholder="+20 xxx xxx xxxx"
                  autoComplete="tel"
                />
              </div>
            </div>
          </div>
        )}

        {/* Login Form */}
        {authMode === "login" && !isAuthenticated && (
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-3">
            <h4 className="font-serif text-sm font-bold text-primary uppercase tracking-wider">
              {t("loginToAccount")}
            </h4>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="login-username"
                  className="text-[10px] uppercase tracking-wider font-bold text-foreground/70"
                >
                  {tAuth("emailOrUsername")}
                </label>
                <input
                  id="login-username"
                  type="text"
                  required
                  value={loginForm.username}
                  onChange={(e) =>
                    setLoginForm((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-accent/20 text-xs focus:outline-none focus:border-accent bg-beige/30 text-primary font-medium transition-colors"
                  placeholder={tAuth("usernameOrEmailPlaceholder")}
                  autoComplete="username"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="login-password"
                  className="text-[10px] uppercase tracking-wider font-bold text-foreground/70"
                >
                  {tAuth("password")}
                </label>
                <input
                  id="login-password"
                  type="password"
                  required
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-accent/20 text-xs focus:outline-none focus:border-accent bg-beige/30 text-primary font-medium transition-colors"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={authLoading}
              className="mt-2 w-full sm:w-auto px-6 py-2.5 rounded-full bg-primary hover:bg-accent text-white font-bold text-xs uppercase tracking-wider self-end transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogIn size={14} />{" "}
              {authLoading ? t("loggingIn") : tAuth("login")}
            </button>
          </form>
        )}

        {/* Register Form */}
        {authMode === "register" && !isAuthenticated && (
          <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-3">
            <h4 className="font-serif text-sm font-bold text-primary uppercase tracking-wider">
              {tAuth("createAccountTitle")}
            </h4>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="register-firstname"
                  className="text-[10px] uppercase tracking-wider font-bold text-foreground/70"
                >
                  {tAuth("firstName")}
                </label>
                <input
                  id="register-firstname"
                  type="text"
                  value={registerForm.firstName}
                  onChange={(e) =>
                    setRegisterForm((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-accent/20 text-xs focus:outline-none focus:border-accent bg-beige/30 text-primary font-medium transition-colors"
                  placeholder={tAuth("firstNamePlaceholder")}
                  autoComplete="given-name"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="register-lastname"
                  className="text-[10px] uppercase tracking-wider font-bold text-foreground/70"
                >
                  {tAuth("lastName")}
                </label>
                <input
                  id="register-lastname"
                  type="text"
                  value={registerForm.lastName}
                  onChange={(e) =>
                    setRegisterForm((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-accent/20 text-xs focus:outline-none focus:border-accent bg-beige/30 text-primary font-medium transition-colors"
                  placeholder={tAuth("lastNamePlaceholder")}
                  autoComplete="family-name"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="register-email"
                  className="text-[10px] uppercase tracking-wider font-bold text-foreground/70"
                >
                  {tAuth("emailAddress")} <span className="text-accent">*</span>
                </label>
                <input
                  id="register-email"
                  type="email"
                  required
                  value={registerForm.email}
                  onChange={(e) =>
                    setRegisterForm((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-accent/20 text-xs focus:outline-none focus:border-accent bg-beige/30 text-primary font-medium transition-colors"
                  placeholder="john@example.com"
                  autoComplete="email"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="register-password"
                  className="text-[10px] uppercase tracking-wider font-bold text-foreground/70"
                >
                  {tAuth("password")} <span className="text-accent">*</span>
                </label>
                <input
                  id="register-password"
                  type="password"
                  required
                  minLength={8}
                  value={registerForm.password}
                  onChange={(e) =>
                    setRegisterForm((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-accent/20 text-xs focus:outline-none focus:border-accent bg-beige/30 text-primary font-medium transition-colors"
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label
                  htmlFor="register-phone"
                  className="text-[10px] uppercase tracking-wider font-bold text-foreground/70"
                >
                  {tAuth("phoneNumber")} <span className="text-accent">*</span>
                </label>
                <input
                  id="register-phone"
                  type="tel"
                  required
                  value={registerForm.phone}
                  onChange={(e) =>
                    setRegisterForm((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-accent/20 text-xs focus:outline-none focus:border-accent bg-beige/30 text-primary font-medium transition-colors"
                  placeholder="+20 xxx xxx xxxx"
                  autoComplete="tel"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={authLoading}
              className="mt-2 w-full sm:w-auto px-6 py-2.5 rounded-full bg-primary hover:bg-accent text-white font-bold text-xs uppercase tracking-wider self-end transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <UserPlus size={14} />{" "}
              {authLoading ? t("signingUp") : t("signUpAndSave")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
