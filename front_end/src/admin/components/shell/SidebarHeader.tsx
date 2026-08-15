"use client";
// admin/components/shell/SidebarHeader.tsx
import React from "react";
import Link from "next/link";
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
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        <Image
          src="/logo/logo.webp"
          alt="Premier Health"
          width={36}
          height={36}
          style={{
            objectFit: "contain",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <span style={{ ...S.sidebarLogoText, display: "flex", gap: "4px", lineHeight: 1, marginBottom: 3 }}>
            PREMIER{" "}
            <span style={{ color: "#C8A96B", fontWeight: 500 }}>HEALTH</span>
          </span>
          <span
            style={{
              fontSize: 8.5,
              color: "rgba(255, 255, 255, 0.5)",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            Medical Care
          </span>
        </div>
      </Link>
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
