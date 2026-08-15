"use client";

import { useTranslations } from "next-intl";
import { Award, Calendar, Languages } from "lucide-react";
import { DoctorData } from "./types";

interface DoctorDetailStatsProps {
  doctor: DoctorData;
}

export function DoctorDetailStats({ doctor }: DoctorDetailStatsProps) {
  const t = useTranslations();
  const getLanguagesCount = () => {
    if (Array.isArray(doctor.languages)) return doctor.languages.length;
    if (typeof doctor.languages === "string" && (doctor.languages as string).trim() !== "") {
      return (doctor.languages as string).split(",").filter((s) => s.trim().length > 0).length;
    }
    return 2;
  };
  const stats = [
    {
      icon: Award,
      label: t("Doctors.yearsExp"),
      value: `${doctor.experience ?? 10}+`,
    },
    {
      icon: Calendar,
      label: t("Doctors.patients"),
      value: `${doctor.patients ?? 500}+`,
    },
    {
      icon: Languages,
      label: t("Doctors.languages"),
      value: getLanguagesCount().toString(),
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-[#faf8f5] rounded-2xl p-4 border border-accent/15 shadow-sm text-center card-gold-accent hover:-translate-y-1 transition-all duration-300"
        >
          <stat.icon size={20} className="text-accent mx-auto mb-1.5" />
          <p className="text-2xl font-serif font-black text-primary">
            {stat.value}
          </p>
          <p className="text-[10px] text-foreground/60 mt-0.5 font-bold">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
