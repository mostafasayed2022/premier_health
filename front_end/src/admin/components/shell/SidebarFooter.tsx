"use client";
// admin/components/shell/SidebarFooter.tsx
import React from "react";
import { S } from "../../lib/styles";
import { Icon } from "../../lib/icons";

interface SidebarFooterProps {
  user?: {
    username?: string;
    is_superuser?: boolean;
  } | null;
  logout: () => void;
}

export function SidebarFooter({ user, logout }: SidebarFooterProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={S.sidebarFooter}>
        <div style={S.userBadge}>
          <div style={S.userAvatar}>{user?.username?.[0]?.toUpperCase() || "A"}</div>
          <div style={{ flex: 1, overflow: "hidden" }}>
            <div style={S.userName}>{user?.username || "Admin"}</div>
            <div style={S.userRole}>
              {user?.is_superuser ? "Superuser" : "Staff"}
            </div>
          </div>
        </div>
        <button style={S.logoutBtn} onClick={logout} title="Logout">
          {Icon.logout}
        </button>
      </div>
      <div
        style={{
          padding: "8px 14px 12px",
          borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          fontSize: 10,
          color: "#64748b",
          lineHeight: 1.4,
          textAlign: "center",
        }}
      >
        <div>© 2026 CodeVerse. All rights reserved.</div>
        <div style={{ color: "#94a3b8", marginTop: 2, fontSize: 9 }}>
          Designed &amp; Developed by:
          <div style={{ color: "#C8A96B", fontWeight: 600, marginTop: 1 }}>
            Mostafa Sayed · Mohamed Hossam · Mohamed Salah
          </div>
        </div>
      </div>
    </div>
  );
}
