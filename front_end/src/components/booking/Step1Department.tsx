"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { getDepartments, Department } from "@/lib/api";
import { Stethoscope, Check } from "lucide-react";
import Image from "next/image";

interface Step1DepartmentProps {
  selected: string;
  onSelect: (id: string) => void;
}

export function Step1Department({ selected, onSelect }: Step1DepartmentProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDepartments().then((data) => {
      if (data) {
        setDepartments(data);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-8 h-8 rounded-full border-4 border-accent/20 border-t-accent animate-spin" />
      </div>
    );
  }

  if (departments.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-foreground/70 font-medium">
          {isAr ? "لا توجد أقسام متاحة حالياً." : "No departments available right now."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
      {departments.map((dept) => {
        const isSelected = selected === dept.id;
        const photoSrc = dept.image_url || dept.photo;
        const name = isAr ? (dept.name_ar || dept.name) : (dept.name || dept.name_ar);
        const desc = isAr ? (dept.description_ar || dept.description) : (dept.description || dept.description_ar);

        return (
          <button
            key={dept.id}
            type="button"
            onClick={() => onSelect(dept.id)}
            className={`group relative flex items-center gap-3 sm:gap-4 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border-2 text-left rtl:text-right transition-all duration-300 active:scale-[0.98] ${
              isSelected
                ? "border-accent bg-accent/8 ring-2 ring-accent/30 shadow-md shadow-accent/10 translate-y-[-2px]"
                : "border-accent/15 bg-white hover:border-accent/50 hover:shadow-lg hover:-translate-y-1"
            }`}
          >
            {/* Image / Icon Container */}
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl overflow-hidden shrink-0 border border-accent/20 bg-beige/50 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              {photoSrc ? (
                <Image
                  src={photoSrc}
                  alt={name || "Department"}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              ) : (
                <div
                  className={`w-full h-full flex items-center justify-center transition-colors ${
                    isSelected
                      ? "bg-accent text-white"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  <Stethoscope size={20} className="sm:hidden" />
                  <Stethoscope size={22} className="hidden sm:block" />
                </div>
              )}
            </div>

            {/* Department Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-serif font-bold text-primary text-sm sm:text-base leading-snug truncate group-hover:text-accent transition-colors">
                {name}
              </h3>
              <p className="text-[11px] sm:text-xs text-foreground/75 mt-0.5 sm:mt-1 line-clamp-2 leading-relaxed">
                {desc}
              </p>
            </div>

            {/* Selection Status Badge */}
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
