"use client";

import { useEffect, type ReactNode } from "react";
import { usePatientAuth } from "@/context/PatientAuthContext";
import { useRouter, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface PatientProtectedRouteProps {
  children: ReactNode;
}

export function PatientProtectedRoute({ children }: PatientProtectedRouteProps) {
  const { isAuthenticated, isLoading } = usePatientAuth();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Auth");

  // Public routes that don't require patient login
  const isPublicRoute =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname.startsWith("/admin");

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isPublicRoute) {
      toast.error(
        t("loginRequired") || "Please register or log in first to continue.",
        {
          id: "site-protected-toast",
        },
      );
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isLoading, isAuthenticated, isPublicRoute, router, pathname, t]);

  // If loading session state, render a clean loading spinner
  if (isLoading && !isPublicRoute) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-[#FAF9F6]">
        <div className="w-9 h-9 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Premier Health...
        </span>
      </div>
    );
  }

  // If unauthenticated on a protected route, render nothing while redirecting
  if (!isAuthenticated && !isPublicRoute) {
    return null;
  }

  return <>{children}</>;
}
