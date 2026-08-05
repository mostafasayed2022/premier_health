"use client";
// admin/components/shell/SidebarNavSection.tsx
import React from "react";
import { S } from "../../lib/styles";
import { Icon } from "../../lib/icons";

interface SidebarNavSectionProps {
  navigate: (to: string) => void;
  isActive: (path: string) => boolean;
}

export function SidebarNavSection({ navigate, isActive }: SidebarNavSectionProps) {
  return (
    <div style={S.sidebarSection}>
      <div style={S.sidebarSectionLabel}>Navigation</div>
      
      {/* Dashboard Link */}
      <button
        style={{
          ...S.navItem,
          ...(isActive("/admin") ? S.navItemActive : {}),
        }}
        onClick={() => navigate("/admin")}
      >
        {Icon.home}
        <span>Dashboard</span>
      </button>

      {/* Files Link */}
      <button
        style={{
          ...S.navItem,
          ...(isActive("/admin/files") ? S.navItemActive : {}),
        }}
        onClick={() => navigate("/admin/files")}
      >
        {Icon.file}
        <span>Files</span>
        {isActive("/admin/files") && (
          <span style={{ marginLeft: "auto", opacity: 0.5 }}>
            {Icon.chevronRight}
          </span>
        )}
      </button>

      {/* Book Appointment Link (Public Live Site) */}
      <button
        style={{
          ...S.navItem,
          color: "#C8A96B",
          fontWeight: 600,
          background: "rgba(200, 169, 107, 0.08)",
          border: "1px solid rgba(200, 169, 107, 0.2)",
          marginTop: 6,
        }}
        onClick={() => navigate("/book-appointment")}
      >
        {Icon.calendar}
        <span>Book Appointment</span>
        <span style={{ marginLeft: "auto", opacity: 0.7 }}>
          {Icon.externalLink}
        </span>
      </button>
    </div>
  );
}
