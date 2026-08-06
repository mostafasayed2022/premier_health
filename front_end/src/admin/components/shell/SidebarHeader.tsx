"use client";
// admin/components/shell/SidebarHeader.tsx
import React from "react";
import { S } from "../../lib/styles";
import { Icon } from "../../lib/icons";
import Image from "next/image";

interface SidebarHeaderProps {
  onClose?: () => void;
}

export function SidebarHeader({ onClose }: SidebarHeaderProps) {
  return (
    <div
      style={{
        ...S.sidebarHeader,
        alignItems: "center",
        gap: 10,
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Image
          src="/logo/logo1.webp"
          alt="PremierCare"
          width={30}
          height={30}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <span style={{ ...S.sidebarLogoText, display: "flex", gap: "4px" }}>
          PREMIER{" "}
          <span style={{ color: "#C8A96B", fontWeight: 500 }}>HEALTH</span>
        </span>
      </div>
      <button
        className="admin-sidebar-close-btn"
        onClick={onClose}
        style={{
          background: "transparent",
          border: "none",
          color: "#fff",
          cursor: "pointer",
          display: "none",
          alignItems: "center",
        }}
      >
        {Icon.x}
      </button>
    </div>
  );
}
