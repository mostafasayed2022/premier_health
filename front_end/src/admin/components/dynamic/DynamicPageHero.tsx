import React from "react";
import type { ModelSchema } from "../../api/admin";

interface DynamicPageHeroProps {
  schema: ModelSchema;
  openCreateModal: () => void;
}

export const DynamicPageHero = React.memo(function DynamicPageHero({
  schema,
  openCreateModal,
}: DynamicPageHeroProps) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1F3D5A 0%, #0F172A 100%)",
        borderRadius: 22,
        padding: "28px 32px",
        color: "#FFFFFF",
        boxShadow: "0 12px 32px rgba(15, 23, 42, 0.15)",
        marginBottom: 24,
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(200, 169, 107, 0.25)",
      }}
    >
      {/* Ambient gold glow */}
      <div
        style={{
          position: "absolute",
          top: "-40px",
          right: "-40px",
          width: "180px",
          height: "180px",
          background:
            "radial-gradient(circle, rgba(200, 169, 107, 0.22) 0%, rgba(0,0,0,0) 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "rgba(200, 169, 107, 0.15)",
              border: "1px solid rgba(200, 169, 107, 0.3)",
              padding: "4px 12px",
              borderRadius: 9999,
              fontSize: 10,
              fontWeight: 700,
              color: "#C8A96B",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 10,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "#10B981",
              }}
            />
            Management Module • {schema.name.toUpperCase()}
          </div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              fontFamily: "var(--admin-heading, serif)",
              color: "#FFFFFF",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            {schema.name} Management
          </h1>
          <p
            style={{
              fontSize: 13,
              color: "#94A3B8",
              marginTop: 4,
              marginBottom: 0,
            }}
          >
            View, search, create, and edit {schema.name.toLowerCase()} records
            in real-time.
          </p>
        </div>

        <div>
          <button
            style={{
              padding: "11px 22px",
              fontSize: 13,
              fontWeight: 600,
              borderRadius: 14,
              background: "linear-gradient(135deg, #C8A96B 0%, #B59351 100%)",
              color: "#0F172A",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 4px 14px rgba(200, 169, 107, 0.3)",
              cursor: "pointer",
            }}
            onClick={openCreateModal}
          >
            + New {schema.name}
          </button>
        </div>
      </div>
    </div>
  );
});
