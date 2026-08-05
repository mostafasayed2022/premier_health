"use client";

/**
 * RoleProtectedRoute
 *
 * Wraps a page/section and redirects unauthorized users.
 *
 * Usage:
 *   <RoleProtectedRoute allowedRoles={['admin', 'doctor']}>
 *     <MyPage />
 *   </RoleProtectedRoute>
 */

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "@/i18n/routing";
import { getUserRole, type UserRole } from "@/lib/api/auth";
import { Loader2 } from "lucide-react";

interface RoleProtectedRouteProps {
  /** Roles that are allowed to access this route */
  allowedRoles: UserRole[];
  /** Where to redirect unauthorized users (default: "/login") */
  redirectTo?: string;
  children: ReactNode;
}

export function RoleProtectedRoute({
  allowedRoles,
  redirectTo = "/login",
  children,
}: RoleProtectedRouteProps) {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "authorized" | "unauthorized">("loading");

  useEffect(() => {
    const role = getUserRole();
    if (role && allowedRoles.includes(role)) {
      setStatus("authorized");
    } else {
      setStatus("unauthorized");
      router.replace(redirectTo as "/login");
    }
  }, [allowedRoles, redirectTo, router]);

  if (status === "loading" || status === "unauthorized") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-[#FAF9F6]">
        <Loader2 className="w-9 h-9 animate-spin text-primary" />
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Verifying Access...
        </span>
      </div>
    );
  }

  return <>{children}</>;
}
