import React from "react";
import { S } from "../../lib/styles";
import { Icon } from "../../lib/icons";
import { getItemIcon, GROUPS, matchesGroup } from "../../hooks/useSidebar";
import type { SchemaListing } from "../../api/admin";

interface DashboardNavCardsProps {
  schemas: SchemaListing[];
  navigateTo: (path: string) => void;
}

export const DashboardNavCards = React.memo(function DashboardNavCards({
  schemas,
  navigateTo,
}: DashboardNavCardsProps) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <h2
          style={{
            fontSize: 13,
            fontFamily: "var(--admin-sans, sans-serif)",
            fontWeight: 700,
            color: "#5A4E3E",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            margin: 0,
          }}
        >
          Quick Management Modules
        </h2>
      </div>

      <div style={{ ...S.dashGrid, marginBottom: 16 }} className="admin-dash-grid">
        {GROUPS.slice(0, 2).map((group) => {
          const items = schemas.filter((schema) => matchesGroup(schema.name, group));
          if (!items.length) return null;
          return (
            <details key={group.id} style={{ ...S.dashCard, display: "block", padding: 0, borderRadius: 16, border: "1px solid rgba(200, 169, 107, 0.3)" }}>
              <summary style={{ padding: 22, cursor: "pointer", color: "#5A4E3E", fontWeight: 700 }}>
                <span style={{ display: "inline-flex", gap: 12, alignItems: "center" }}>
                  <span style={{ color: "#C8A96B" }}>{group.icon}</span>{group.label}
                </span>
              </summary>
              <div style={{ padding: "0 16px 16px", display: "grid", gap: 6 }}>
                {items.map((item) => (
                  <button type="button" key={item.name} onClick={() => navigateTo(`/admin/${item.name.toLowerCase()}`)}
                    style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(200, 169, 107, 0.2)", background: "#fff", textAlign: "left", color: "#5A4E3E", cursor: "pointer" }}>
                    {item.label}
                  </button>
                ))}
              </div>
            </details>
          );
        })}
      </div>
      <div style={S.dashGrid} className="admin-dash-grid">
        {/* Files Card */}
        <button
          key="files"
          style={{
            ...S.dashCard,
            borderRadius: 16,
            border: "1px solid rgba(200, 169, 107, 0.2)",
            transition: "all 0.2s ease",
          }}
          onClick={() => navigateTo("/admin/files")}
        >
          <div style={{ ...S.dashCardIcon, color: "#C8A96B", display: "flex" }}>
            {Icon.file}
          </div>
          <div style={S.dashCardName}>Uploaded Files</div>
          <div style={S.dashCardSub}>Manage Cloudinary &amp; local media</div>
          <div style={S.dashCardArrow}>{Icon.chevronRight}</div>
        </button>

        {/* Model Schemas Cards */}
        {schemas?.filter((schema) => !GROUPS.slice(0, 2).some((group) => matchesGroup(schema.name, group))).map((s) => {
          const cardIcon = getItemIcon(s.name);
          return (
            <button
              key={s.name}
              style={{
                ...S.dashCard,
                borderRadius: 16,
                border: "1px solid rgba(200, 169, 107, 0.2)",
                transition: "all 0.2s ease",
              }}
              onClick={() => navigateTo(`/admin/${s.name.toLowerCase()}`)}
            >
              <div
                style={{
                  ...S.dashCardIcon,
                  color: "#C8A96B",
                  display: "flex",
                }}
              >
                {cardIcon}
              </div>
              <div style={S.dashCardName}>{s.label}</div>
              <div style={S.dashCardSub}>
                View &amp; manage {s.label.toLowerCase()}
              </div>
              <div style={S.dashCardArrow}>{Icon.chevronRight}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
});
