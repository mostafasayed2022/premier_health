"use client";

import { useState, useEffect } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/client";

import type { AdminAnalytics, AdminStatsResponse } from "./types";
import { CARDS } from "./CARDS";
import { AnalyticCard } from "./AnalyticCard";
import { SkeletonCard } from "./SkeletonCard";

// ─── Default Fallback Values ──────────────────────────────────────────────────

const DEFAULT_ANALYTICS: AdminAnalytics = {
  total_bookings: 0,
  bookings_this_month: 0,
  active_bookings: 0,
  completed_bookings: 0,
  cancelled_bookings: 0,
  total_patients: 0,
  total_doctors: 0,
  total_departments: 0,
  total_services: 0,
  total_branches: 0,
  total_staff: 0,
  total_availability: 0,
  total_revenue: 0,
};

// ─── Data Fetcher ─────────────────────────────────────────────────────────────

const fetchAdminStats = async (): Promise<AdminStatsResponse> => {
  const { data } = await api.get<any>("admin/stats/");
  if (data?.analytics) {
    return data as AdminStatsResponse;
  }
  // If backend returned flat or object
  return {
    analytics: {
      ...DEFAULT_ANALYTICS,
      ...(data || {}),
    },
    daily_bookings: data?.daily_bookings || [],
    branch_bookings: data?.branch_bookings || [],
    doctor_bookings: data?.doctor_bookings || [],
    payment_stats: data?.payment_stats || [],
  };
};

// ─── Main Container ───────────────────────────────────────────────────────────

export function AnalyticsCards() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin", "stats"],
    queryFn: fetchAdminStats,
    staleTime: 1000 * 60 * 2, // 2 min
    retry: 1,
    enabled: isMounted,
  });

  if (!isMounted || isLoading) {
    return (
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Loader2 size={16} className="animate-spin text-slate-400" />
          <span className="text-sm font-bold text-slate-400">
            Loading analytics...
          </span>
        </div>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: CARDS.length }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
    );
  }

  const analytics: AdminAnalytics = data?.analytics || DEFAULT_ANALYTICS;

  return (
    <section>
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2
            className="text-lg font-bold tracking-tight"
            style={{
              fontFamily: "var(--admin-heading, sans-serif)",
              color: "#1F3D5A",
            }}
          >
            Analytics &amp; Performance Overview
          </h2>
          <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>
            Real-time database records and statistics
          </p>
        </div>

        {isError ? (
          <span
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full"
            style={{
              background: "rgba(220, 38, 38, 0.1)",
              color: "#DC2626",
              border: "1px solid rgba(220, 38, 38, 0.2)",
            }}
          >
            <AlertCircle size={14} />
            Offline Mode
          </span>
        ) : (
          <span
            className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-1 rounded-full"
            style={{
              background: "rgba(200, 169, 107, 0.15)",
              color: "#998675",
              border: "1px solid rgba(200, 169, 107, 0.25)",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full animate-pulse"
              style={{ background: "#C8A96B" }}
            />
            Live Sync
          </span>
        )}
      </div>

      {/* Cards Grid */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {CARDS.map((config, i) => (
          <AnalyticCard
            key={config.key}
            config={config}
            value={analytics[config.key] ?? 0}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
