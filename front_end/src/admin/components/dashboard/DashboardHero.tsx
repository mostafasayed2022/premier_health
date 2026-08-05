import React from "react";
import { S } from "../../lib/styles";
import { Icon } from "../../lib/icons";

interface DashboardHeroProps {
  user: any;
  navigateTo: (path: string) => void;
}

export const DashboardHero = React.memo(function DashboardHero({
  user,
  navigateTo,
}: DashboardHeroProps) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1F3D5A 0%, #0F172A 100%)",
        borderRadius: 22,
        padding: "32px 36px",
        color: "#FFFFFF",
        boxShadow: "0 12px 32px rgba(15, 23, 42, 0.15)",
        marginBottom: 28,
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(200, 169, 107, 0.25)",
      }}
    >
      {/* Decorative gold ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: "220px",
          height: "220px",
          background:
            "radial-gradient(circle, rgba(200, 169, 107, 0.25) 0%, rgba(0,0,0,0) 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
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
              padding: "5px 14px",
              borderRadius: 9999,
              fontSize: 11,
              fontWeight: 700,
              color: "#C8A96B",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 12,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                backgroundColor: "#10B981",
              }}
            />
            Live Healthcare System • Active
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
            Welcome back, {user?.username || "Admin"} 👋
          </h1>
          <p
            style={{
              fontSize: 13,
              color: "#94A3B8",
              marginTop: 6,
              marginBottom: 0,
            }}
          >
            PremierCare Executive Healthcare Command Center &amp; Live
            Management System.
          </p>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button
            style={{
              ...S.btn,
              ...S.btnPrimary,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "11px 20px",
              fontSize: 13,
              fontWeight: 600,
              boxShadow: "0 4px 14px rgba(200, 169, 107, 0.3)",
            }}
            onClick={() => window.open("/book-appointment", "_blank")}
          >
            {Icon.plus} New Booking
          </button>
          <button
            style={{
              ...S.btn,
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              color: "#FFFFFF",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "11px 18px",
              fontSize: 13,
            }}
            onClick={() => navigateTo("/admin/files")}
          >
            {Icon.file} Files
          </button>
        </div>
      </div>
    </div>
  );
});
