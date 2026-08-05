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
  );
}
