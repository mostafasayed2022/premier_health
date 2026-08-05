import React from "react";
import { S } from "../../lib/styles";
import { Icon } from "../../lib/icons";
import { getItemIcon } from "../../hooks/useSidebar";
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
        {schemas?.map((s) => {
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
