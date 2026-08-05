"use client";

import { useTranslations } from "next-intl";
import { Award, CheckCircle, GraduationCap } from "lucide-react";
import { DoctorData } from "./types";

interface DoctorDetailQualificationsProps {
  doctor: DoctorData;
}

export function DoctorDetailQualifications({ doctor }: DoctorDetailQualificationsProps) {
  const t = useTranslations("DoctorProfile");

  return (
    <section className="luxury-container py-16">
      <div className="grid gap-10 md:grid-cols-2">
        {/* Education & Training */}
        <div>
          <h2 className="text-2xl font-serif text-primary mb-2 flex items-center gap-3">
            <GraduationCap size={22} className="text-accent" />
            {t("educationTitle")}
          </h2>
          <div className="h-[2px] w-14 bg-accent mb-6" />
          <div className="flex flex-col gap-4">
            {(doctor.education || []).map((edu, i) => (
              <div key={i} className="flex items-start gap-4 bg-beige rounded-2xl p-4">
                <div className="h-2 w-2 rounded-full bg-accent mt-2 shrink-0" />
                <p className="text-sm text-primary font-medium">{edu}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Specializations & Skills */}
        <div>
          <h2 className="text-2xl font-serif text-primary mb-2 flex items-center gap-3">
            <Award size={22} className="text-accent" />
            {t("specializationsTitle")}
          </h2>
          <div className="h-[2px] w-14 bg-accent mb-6" />
          <div className="flex flex-col gap-3">
            {(doctor.specializations || []).map((spec, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white rounded-xl border border-accent/10 p-3.5 shadow-sm"
              >
                <CheckCircle size={15} className="text-accent shrink-0" />
                <span className="text-sm text-primary font-medium">{spec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
