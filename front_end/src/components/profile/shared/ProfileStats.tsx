"use client";

import { Calendar, CheckCircle, FileText, Users, Star, Award, Clock } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────

interface ProfileStatsProps {
  role: "patient" | "doctor";
  stats: {
    totalAppointments?: number;
    completedVisits?: number;
    totalDocuments?: number;
    patientsTreated?: number;
    rating?: number;
    experienceYears?: number;
    availabilitySlots?: number;
  };
}

interface StatItem {
  title: string;
  value: string | number;
  icon: React.ElementType;
  accent: string;
  bg: string;
}

// ─── Component ────────────────────────────────────────────────────────────

export function ProfileStats({ role, stats }: ProfileStatsProps) {
  const patientItems: StatItem[] = [
    {
      title: "Total Bookings",
      value: stats.totalAppointments ?? 0,
      icon: Calendar,
      accent: "#385366",
      bg: "#eef2f5",
    },
    {
      title: "Completed Visits",
      value: stats.completedVisits ?? 0,
      icon: CheckCircle,
      accent: "#2d7a55",
      bg: "#edf7f2",
    },
    {
      title: "Medical Records",
      value: stats.totalDocuments ?? 0,
      icon: FileText,
      accent: "#998675",
      bg: "#f7f2ea",
    },
  ];

  const doctorItems: StatItem[] = [
    {
      title: "Patients Treated",
      value: stats.patientsTreated ? `${stats.patientsTreated.toLocaleString()}+` : "3,000+",
      icon: Users,
      accent: "#385366",
      bg: "#eef2f5",
    },
    {
      title: "Rating",
      value: stats.rating ? `${stats.rating} / 5` : "4.95",
      icon: Star,
      accent: "#a38448",
      bg: "#fff8ee",
    },
    {
      title: "Experience",
      value: `${stats.experienceYears ?? 14} Yrs`,
      icon: Award,
      accent: "#998675",
      bg: "#f7f2ea",
    },
    {
      title: "Weekly Slots",
      value: `${stats.availabilitySlots ?? 5}`,
      icon: Clock,
      accent: "#2d7a55",
      bg: "#edf7f2",
    },
  ];

  const items = role === "patient" ? patientItems : doctorItems;
  const cols = role === "doctor" ? "sm:grid-cols-4" : "sm:grid-cols-3";

  return (
    <div className={`grid grid-cols-2 ${cols} gap-3`}>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.title}
            className="bg-white border border-[#e8e0d5] rounded-2xl p-4 flex items-center gap-4 shadow-sm"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: item.bg }}
            >
              <Icon className="w-4.5 h-4.5" style={{ color: item.accent }} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-[#959ead] font-medium leading-tight">{item.title}</p>
              <p className="text-lg font-bold leading-tight mt-0.5" style={{ color: "#1e293b" }}>
                {item.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
