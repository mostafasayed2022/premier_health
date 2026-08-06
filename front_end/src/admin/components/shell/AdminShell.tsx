"use client";
// admin/components/shell/AdminShell.tsx
// Client-side shell: wraps pages with AuthProvider, handles auth redirect, shows Sidebar.
import React, { type ReactNode } from "react";
import { AuthProvider } from "../../context/AuthContext";
import { useAdminShell } from "../../hooks/useAdminShell";
import { Sidebar } from "./Sidebar";
import { Icon } from "../../lib/icons";
import { S } from "../../lib/styles";
import "../../styles/admin.css";
import { Toaster } from "sonner";
import Image from "next/image";

// ─── Inner shell (needs auth context) ─────────────────────────────────────
function InnerShell({ children }: { children: ReactNode }) {
  const {
    isAuthenticated,
    isLoading,
    schemas,
    sidebarOpen,
    setSidebarOpen,
    currentModel,
    isFilesPage,
    isLoginPage,
    toggleSidebar,
    closeSidebar,
  } = useAdminShell();

  // While login page is active, just render its children without the shell
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Show spinner while verifying token
  if (isLoading) {
    return (
      <div className="admin-root" style={{ ...S.centerFlex, height: "100vh" }}>
        {Icon.spinner}
      </div>
    );
  }

  // Not authenticated yet → render nothing (redirect is in flight)
  if (!isAuthenticated) return null;

  return (
    <div className="admin-root admin-shell" style={S.shell}>
      {/* Mobile Header Bar */}
      <div
        className="admin-mobile-topbar"
        style={{
          display: "none",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          background: "#1F3D5A",
          borderBottom: "1px solid rgba(200, 169, 107, 0.15)",
          color: "#fff",
          position: "sticky",
          top: 0,
          zIndex: 40,
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Image
            src="/logo/logo.webp"
            alt="PremierCare"
            width={24}
            height={24}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <span
            style={{
              fontFamily: "var(--admin-heading)",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 2,
              display: "flex",
              gap: "4px",
            }}
          >
            PREMIER{" "}
            <span style={{ color: "#C8A96B", fontWeight: 500 }}>HEALTH</span>
          </span>
        </div>
        <button
          onClick={toggleSidebar}
          style={{
            background: "transparent",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            fontSize: 20,
            display: "flex",
            alignItems: "center",
            padding: 6,
          }}
        >
          {sidebarOpen ? Icon.x : Icon.menu}
        </button>
      </div>

      <Sidebar
        schemas={schemas}
        currentModel={isFilesPage ? null : currentModel}
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />

      {/* Backdrop overlay for mobile */}
      {sidebarOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={closeSidebar}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.4)",
            zIndex: 9990,
            backdropFilter: "blur(2px)",
          }}
        />
      )}

      <main style={S.mainContent} className="admin-main-content">
        {children}
      </main>
    </div>
  );
}

// ─── Public shell wrapper ─────────────────────────────────────────────────
export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <Toaster richColors position="top-center" />
      <InnerShell>{children}</InnerShell>
    </AuthProvider>
  );
}
