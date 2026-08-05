"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/client";
import { toast } from "sonner";

export interface StatsData {
  daily_bookings: { date: string; count: number }[];
  branch_bookings: { branch: string; count: number }[];
  doctor_bookings: { doctor: string; count: number }[];
  payment_stats: { status: string; count: number }[];
}

export function useDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  const [stats, setStats] = useState<StatsData | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      // Load aggregate statistics
      const statsData = await api.get<StatsData>("/api/admin/stats/");
      setStats(statsData);

      // Load recent bookings list (fetch first page with page_size=50)
      const bookingsData = await api.get<any>("/api/bookings/", {
        page_size: 50,
      });
      setBookings(bookingsData.results || bookingsData || []);
    } catch (error: any) {
      toast.error(
        "Failed to load dashboard statistics: " + (error.message || error),
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const navigateTo = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router],
  );

  const handleDeleteBooking = useCallback(async (row: any) => {
    if (confirm("Are you sure you want to delete this booking?")) {
      try {
        await api.delete(`/api/bookings/${row.id}/`);
        toast.success("Booking deleted successfully");
        setBookings((prev) => prev.filter((b) => b.id !== row.id));
      } catch (e: any) {
        toast.error("Failed to delete booking: " + e.message);
      }
    }
  }, []);

  return {
    user,
    stats,
    bookings,
    loading,
    navigateTo,
    handleDeleteBooking,
  };
}
