"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Star, Award, Languages } from "lucide-react";
import Image from "next/image";
import { getOptimizedImageUrl } from "@/lib/utils/image";
import { DoctorData } from "./types";

interface DoctorCardProps {
  doctor: DoctorData;
}

import React from "react";

export const DoctorCard = React.memo(function DoctorCard({ doctor }: DoctorCardProps) {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === "ar";

  const optimizedPhoto = getOptimizedImageUrl(doctor.photo, 600, 75);

  return (
    <Link href={`/doctor/${doctor.id}`} className="group block h-full">
      <div className="h-full bg-white rounded-3xl border border-accent/10 shadow-sm overflow-hidden hover:-translate-y-2 transition-transform duration-300 card-gold-accent">
        {/* Photo */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={optimizedPhoto}
            alt={doctor.name}
            fill
            quality={75}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="bg-accent text-white text-[9px] uppercase tracking-wider font-bold px-3 py-1 rounded-full">
              {isAr ? doctor.specialty_ar : doctor.specialty}
            </span>
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-2.5 py-1">
              <Star size={10} className="text-accent fill-current" />
              <span className="text-[10px] text-white font-bold">
                {doctor.rating}
              </span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-6">
          <h3 className="text-base font-serif font-bold text-primary group-hover:text-accent transition-colors">
            {isAr ? doctor.name_ar : doctor.name}
          </h3>
          <p className="text-[10px] uppercase tracking-wider text-accent font-bold mt-1">
            {isAr ? doctor.position_ar : doctor.position}
          </p>
          <div className="flex items-center gap-4 mt-4 text-[10px] text-foreground/75 border-t border-accent/10 pt-4">
            <span className="flex items-center gap-1">
              <Award size={11} className="text-accent" />
              {t("Doctors.experience", { years: doctor.experience || 0 })}
            </span>
            <span className="flex items-center gap-1">
              <Languages size={11} className="text-accent" />
              {(doctor.languages || ["English"]).slice(0, 2).join(", ")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
});
