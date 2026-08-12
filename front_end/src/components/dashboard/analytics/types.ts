// ─── Analytics Types ──────────────────────────────────────────────────────────

export interface AdminAnalytics {
  total_bookings: number;
  bookings_this_month: number;
  active_bookings: number;
  completed_bookings: number;
  cancelled_bookings: number;
  total_patients: number;
  total_doctors: number;
  total_departments: number;
  total_services: number;
  total_branches: number;
  total_staff: number;
  total_availability: number;
  total_revenue: number;
}

export interface AdminStatsResponse {
  analytics: AdminAnalytics;
  daily_bookings: { date: string; count: number }[];
  branch_bookings: { branch: string; count: number }[];
  doctor_bookings: { doctor: string; count: number }[];
  payment_stats: { status: string; count: number }[];
}

export interface CardConfig {
  key: keyof AdminAnalytics;
  label: string;
  icon: React.ElementType;
  themeVariant?: "gold" | "navy" | "beige";
  gradient?: string;
  iconBg?: string;
  iconColor?: string;
  valueColor?: string;
  format?: (v: number) => string;
}
