"use client";
// admin/components/shell/SidebarGroupItem.tsx
import React from "react";
import { S } from "../../lib/styles";
import { Icon } from "../../lib/icons";
import type { GroupDef } from "../../hooks/useSidebar";
import type { SchemaListing } from "../../api/admin";

interface SidebarGroupItemProps {
  group: GroupDef;
  items: SchemaListing[];
  isOpen: boolean;
  currentModel?: string | null;
  toggleGroup: (id: string) => void;
  navigate: (to: string) => void;
  getItemIcon: (name: string) => React.ReactNode;
}

export function SidebarGroupItem({
  group,
  items,
  isOpen,
  currentModel,
  toggleGroup,
  navigate,
  getItemIcon,
}: SidebarGroupItemProps) {
  const hasActiveChild = items.some(
    (it) => currentModel?.toLowerCase() === it.name.toLowerCase()
  );

  return (
    <div style={{ marginBottom: 6 }}>
      {/* Group Accordion Header */}
      <button
        type="button"
        style={{
          ...S.navItem,
          color: hasActiveChild ? "#C8A96B" : "#e2e8f0",
          fontWeight: hasActiveChild ? 600 : 500,
          justifyContent: "space-between",
          background: hasActiveChild ? "rgba(200, 169, 107, 0.08)" : "transparent",
          borderRadius: 10,
          padding: "9px 12px",
        }}
        onClick={() => toggleGroup(group.id)}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: "#C8A96B", opacity: hasActiveChild ? 1 : 0.8, display: "flex" }}>
            {group.icon}
          </span>
          <span style={{ fontSize: 13, letterSpacing: "0.02em" }}>{group.label}</span>
        </div>
        <span style={{ opacity: 0.7, display: "flex", transition: "transform 0.2s" }}>
          {isOpen ? Icon.chevronDown : Icon.chevronRight}
        </span>
      </button>

      {/* Group Dropdown Sub-Items */}
      {isOpen && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            marginTop: 3,
            marginBottom: 6,
            paddingLeft: 10,
            borderLeft: "2px solid rgba(200, 169, 107, 0.2)",
            marginLeft: 18,
          }}
        >
          {items.map((s) => {
            const active = currentModel?.toLowerCase() === s.name.toLowerCase();
            const itemIcon = getItemIcon(s.name);
            return (
              <button
                key={s.name}
                style={{
                  ...S.navItem,
                  padding: "8px 12px",
                  fontSize: 12.5,
                  gap: 9,
                  ...(active ? S.navItemActive : {}),
                }}
                onClick={() => navigate(`/admin/${s.name.toLowerCase()}`)}
              >
                <span style={{ color: active ? "#C8A96B" : "#94a3b8", display: "flex" }}>
                  {itemIcon}
                </span>
                <span>{s.label}</span>
                {active && (
                  <span style={{ marginLeft: "auto", opacity: 0.6 }}>
                    {Icon.chevronRight}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
