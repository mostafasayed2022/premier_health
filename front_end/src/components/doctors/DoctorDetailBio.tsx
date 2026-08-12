"use client";

import { useTranslations } from "next-intl";
import { DoctorData } from "./types";

interface DoctorDetailBioProps {
  doctor: DoctorData;
}

export function DoctorDetailBio({ doctor }: DoctorDetailBioProps) {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-6">
      {/* Bio text */}
      <div>
        <h3 className="text-base font-serif font-bold text-primary mb-2">
          {t("Doctors.about")}
        </h3>
        <p className="text-sm text-foreground/80 leading-relaxed font-medium">
          {doctor.bio}
        </p>
      </div>

      {/* Languages */}
      <div>
        <p className="text-[10px] uppercase tracking-wider text-accent font-bold mb-3">
          
        </p>
        <div className="flex flex-wrap gap-2">
          
            <span
              
              className="px-3 py-1 rounded-full border border-accent/20 text-xs text-primary font-bold bg-accent/5"
            >
              
            </span>
         
        </div>
      </div>
    </div>
  );
}
