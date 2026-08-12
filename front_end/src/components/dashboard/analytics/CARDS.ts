import {
  CalendarCheck,
  Users,
  Stethoscope,
  Building2,
  Layers,
  Wrench,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import type { CardConfig } from "./types";

// ─── PremierCare Logo Color Palette Card Definitions ───────────────────────────
// Brand Colors:
// - Primary Deep Navy: #1F3D5A
// - Luxury Gold Accent: #C8A96B / #DFCA9B
// - Warm Beige / Cream: #F7F2EA / #FAF9F6

export const CARDS: CardConfig[] = [
  {
    key: "total_revenue",
    label: "Total Revenue",
    icon: DollarSign,
    themeVariant: "gold",
    format: (v) =>
      `$${v.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
  },
  {
    key: "total_bookings",
    label: "Total Bookings",
    icon: CalendarCheck,
    themeVariant: "navy",
  },
  {
    key: "bookings_this_month",
    label: "This Month",
    icon: CalendarCheck,
    themeVariant: "gold",
  },
  {
    key: "active_bookings",
    label: "Active Bookings",
    icon: Clock,
    themeVariant: "navy",
  },
  {
    key: "completed_bookings",
    label: "Completed",
    icon: CheckCircle2,
    themeVariant: "gold",
  },
  {
    key: "cancelled_bookings",
    label: "Cancelled",
    icon: XCircle,
    themeVariant: "beige",
  },
  {
    key: "total_patients",
    label: "Total Patients",
    icon: Users,
    themeVariant: "navy",
  },
  {
    key: "total_doctors",
    label: "Doctors",
    icon: Stethoscope,
    themeVariant: "gold",
  },
  {
    key: "total_staff",
    label: "Staff Members",
    icon: Building2,
    themeVariant: "navy",
  },
  {
    key: "total_departments",
    label: "Departments",
    icon: Layers,
    themeVariant: "beige",
  },
  {
    key: "total_services",
    label: "Services",
    icon: Wrench,
    themeVariant: "gold",
  },
  {
    key: "total_branches",
    label: "Branches",
    icon: MapPin,
    themeVariant: "navy",
  },
  {
    key: "total_availability",
    label: "Doctor Slots",
    icon: Clock,
    themeVariant: "beige",
  },
];
