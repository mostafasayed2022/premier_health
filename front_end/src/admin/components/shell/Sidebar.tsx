"use client";
// admin/components/shell/Sidebar.tsx
import React from "react";
import { S } from "../../lib/styles";
import { useSidebar } from "../../hooks/useSidebar";
import type { SchemaListing } from "../../api/admin";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarNavSection } from "./SidebarNavSection";
import { SidebarGroupItem } from "./SidebarGroupItem";
import { SidebarFooter } from "./SidebarFooter";

interface SidebarProps {
  schemas: SchemaListing[];
  currentModel?: string | null;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ schemas, currentModel, isOpen, onClose }: SidebarProps) {
  const {
    user,
    logout,
    openGroups,
    toggleGroup,
    groupedSchemas,
    unGroupedSchemas,
    navigate,
    isActive,
    getItemIcon,
  } = useSidebar({ schemas, currentModel, onClose });

  return (
    <aside style={S.sidebar} className={`admin-sidebar ${isOpen ? "open" : ""}`}>
      {/* Header UI Component */}
      <SidebarHeader onClose={onClose} />

      {/* Navigation Section UI Component */}
      <SidebarNavSection navigate={navigate} isActive={isActive} />

      {/* Management Models Section */}
      <div style={S.sidebarSection}>
        <div style={S.sidebarSectionLabel}>Management</div>

        {/* Grouped Accordion Items */}
        {groupedSchemas.map(({ group, items }) => (
          <SidebarGroupItem
            key={group.id}
            group={group}
            items={items}
            isOpen={Boolean(openGroups[group.id])}
            currentModel={currentModel}
            toggleGroup={toggleGroup}
            navigate={navigate}
            getItemIcon={getItemIcon}
          />
        ))}

        {/* Standalone / Un-grouped Models */}
        {unGroupedSchemas.length > 0 && (
          <div style={{ marginTop: 12, paddingTop: 8, borderTop: "1px solid rgba(200, 169, 107, 0.15)" }}>
            {unGroupedSchemas.map((s) => {
              const active = currentModel?.toLowerCase() === s.name.toLowerCase();
              const itemIcon = getItemIcon(s.name);
              return (
                <button
                  key={s.name}
                  style={{ ...S.navItem, ...(active ? S.navItemActive : {}) }}
                  onClick={() => navigate(`/admin/${s.name.toLowerCase()}`)}
                >
                  <span style={{ color: active ? "#C8A96B" : "#94a3b8", display: "flex" }}>
                    {itemIcon}
                  </span>
                  <span>{s.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer User Badge & Logout UI Component */}
      <SidebarFooter user={user} logout={logout} />
    </aside>
  );
}
