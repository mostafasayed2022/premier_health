"use client";
// admin/components/shell/LoginShell.tsx
// Provides AuthProvider for the login page. Redirects to /admin if already authenticated.
import React, { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "../../context/AuthContext";
import "../../styles/admin.css";

function InnerLoginShell({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/admin");
    }
  }, [isLoading, isAuthenticated, router]);

  return <div className="admin-root">{children}</div>;
}

export function LoginShell({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <InnerLoginShell>{children}</InnerLoginShell>
    </AuthProvider>
  );
}
