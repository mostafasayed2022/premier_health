"use client";
// admin/components/dashboard/Dashboard.tsx
import { S } from "../../lib/styles";
import { Icon } from "../../lib/icons";
import type { SchemaListing } from "../../api/admin";
import { useDashboard } from "../../hooks/useDashboard";
import { BookingsTable } from "./BookingsTable";
import { DashboardHero } from "./DashboardHero";
import { DashboardNavCards } from "./DashboardNavCards";
import dynamic from "next/dynamic";
import { AnalyticsCards } from "@/components/dashboard/analytics";

const DashboardCharts = dynamic(
  () => import("./DashboardCharts").then((mod) => mod.DashboardCharts),
  {
    loading: () => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px",
          gap: "10px",
          color: "#64748B",
          fontSize: 13,
          backgroundColor: "#FFFFFF",
          borderRadius: 18,
          border: "1px solid rgba(200, 169, 107, 0.15)",
        }}
      >
        {Icon.spinner} Loading charts...
      </div>
    ),
  },
);

interface DashboardProps {
  schemas: SchemaListing[];
}

export function Dashboard({ schemas }: DashboardProps) {
  const { user, stats, bookings, loading, navigateTo, handleDeleteBooking } =
    useDashboard();

  return (
    <div style={{ ...S.pageWrap, maxWidth: 1280 }}>
      <DashboardHero user={user} navigateTo={navigateTo} />
      {/* ─── Live Analytics Cards ──────────────────────────────────────── */}
      <div style={{ marginBottom: 32 }}>
        <AnalyticsCards />
      </div>
      <DashboardNavCards schemas={schemas} navigateTo={navigateTo} />

      {/* ─── 4. Analytics & Recent Bookings ───────────────────────────── */}
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "60px",
            gap: "10px",
            color: "#64748B",
            fontSize: 13,
            backgroundColor: "#FFFFFF",
            borderRadius: 18,
            border: "1px solid rgba(200, 169, 107, 0.15)",
          }}
        >
          {Icon.spinner} Loading dashboard analytics &amp; records...
        </div>
      ) : (
        <>
          {/* Analytics Charts */}
          {stats && (
            <div style={{ marginBottom: 32 }}>
              <div style={{ marginBottom: 14 }}>
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
                  Analytics &amp; Performance Summary
                </h2>
              </div>
              <DashboardCharts stats={stats} />
            </div>
          )}

          {/* Bookings Table Overview */}
          <div style={{ marginTop: 32 }}>
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
                Recent Bookings Overview
              </h2>
              <button
                style={{
                  ...S.btn,
                  ...S.btnGhost,
                  fontSize: 12,
                  fontWeight: 600,
                  padding: "6px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  color: "#C8A96B",
                  border: "1px solid rgba(200, 169, 107, 0.2)",
                  borderRadius: 10,
                }}
                onClick={() => navigateTo("/admin/booking")}
              >
                <span>Manage All Bookings</span>
                {Icon.chevronRight}
              </button>
            </div>

            <BookingsTable
              bookings={bookings}
              onEdit={() => navigateTo("/admin/booking")}
              onDelete={handleDeleteBooking}
            />
          </div>
        </>
      )}
    </div>
  );
}
