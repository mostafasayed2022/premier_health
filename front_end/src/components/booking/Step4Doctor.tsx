"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { getDoctorsByBranch, Doctor } from "@/lib/api";
import { Check, Loader2, AlertCircle, UserCheck } from "lucide-react";
import Image from "next/image";

interface Step4DoctorProps {
  selected: string;
  onSelect: (id: string) => void;
  branchId?: string;
  serviceId?: string;
}

export function Step4Doctor({
  selected,
  onSelect,
  branchId,
  serviceId,
}: Step4DoctorProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const t = useTranslations("Booking");

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!branchId || !serviceId) return;

    let cancelled = false;
    setLoading(true);
    setError(false);

    getDoctorsByBranch(Number(branchId), Number(serviceId))
      .then((data) => {
        if (!cancelled) setDoctors(data ?? []);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [branchId, serviceId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-foreground/60 gap-3">
        <Loader2 size={22} className="animate-spin text-accent" />
        <span className="text-sm font-medium">{t("loadingDoctors")}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-3 p-5 rounded-2xl bg-red-50/80 border border-red-200 text-red-700 text-sm">
        <AlertCircle size={18} className="shrink-0" />
        <span>{t("failedDoctors")}</span>
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-accent/20 bg-beige/30">
        <UserCheck size={32} className="mx-auto text-accent/50 mb-2" />
        <p className="text-sm text-foreground/60 font-medium">
          {t("noDoctors")}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
      {doctors.map((doc) => {
        const isSelected = selected === doc.id;
        const photoSrc = doc.image_url || doc.photo;
        const name = isAr ? doc.name_ar || doc.name : doc.name || doc.name_ar;
        const position = isAr
          ? doc.position_ar || doc.position
          : doc.position || doc.position_ar;

        return (
          <button
            key={doc.id}
            type="button"
            onClick={() => onSelect(doc.id)}
            className={`group relative flex items-center gap-3 sm:gap-4 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border-2 text-left rtl:text-right transition-all duration-300 active:scale-[0.98] ${
              isSelected
                ? "border-accent bg-accent/8 ring-2 ring-accent/30 shadow-xl shadow-accent/10 translate-y-[-2px]"
                : "border-accent/15 bg-white hover:border-accent/50 hover:shadow-lg hover:-translate-y-1"
            }`}
          >
            {/* Avatar Container */}
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 border-2 border-accent/30 bg-beige/60 shadow-sm group-hover:scale-105 transition-transform">
              {photoSrc ? (
                <Image
                  src={photoSrc}
                  alt={name || "Doctor"}
                  fill
                  sizes="64px"
                  className="object-cover object-top"
                />
              ) : (
                <div
                  className={`w-full h-full flex items-center justify-center text-xl sm:text-2xl transition-colors ${
                    isSelected
                      ? "bg-accent text-white"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  🩺
                </div>
              )}
            </div>

            {/* Doctor Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-serif font-bold text-primary text-sm sm:text-base leading-snug truncate group-hover:text-accent transition-colors">
                {name}
              </h3>
              <p className="text-[11px] sm:text-xs text-foreground/75 mt-0.5 sm:mt-1 truncate font-medium">
                {position}
              </p>
              {doc.specialty && (
                <span className="inline-block mt-1.5 sm:mt-2 px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full bg-primary/8 text-primary font-bold text-[9px] sm:text-[10px] uppercase tracking-wider">
                  {isAr ? doc.specialty_ar || doc.specialty : doc.specialty}
                </span>
              )}
            </div>

            {/* Selection Checkmark Badge */}
            <div
              className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ml-auto rtl:ml-0 rtl:mr-auto ${
                isSelected
                  ? "bg-accent text-white scale-110 shadow-md"
                  : "border-2 border-accent/30 bg-transparent group-hover:border-accent"
              }`}
            >
              {isSelected && <Check size={12} strokeWidth={3} className="sm:hidden" />}
              {isSelected && <Check size={14} strokeWidth={3} className="hidden sm:block" />}
            </div>
          </button>
        );
      })}
    </div>
  );
}
