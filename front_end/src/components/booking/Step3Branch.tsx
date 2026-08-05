"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { getBranchesByService, Branch } from "@/lib/api";
import { MapPin, Check, Phone } from "lucide-react";
import Image from "next/image";

interface Step3BranchProps {
  selected: string;
  onSelect: (id: string) => void;
  serviceId?: string;
}

export function Step3Branch({
  selected,
  onSelect,
  serviceId,
}: Step3BranchProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (serviceId) {
      setLoading(true);
      getBranchesByService(Number(serviceId)).then((data) => {
        if (data) {
          setBranches(data);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [serviceId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-8 h-8 rounded-full border-4 border-accent/20 border-t-accent animate-spin" />
      </div>
    );
  }

  if (branches.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-foreground/70 font-medium">
          {isAr ? "لا توجد فروع متاحة حالياً لهذه الخدمة." : "No branches available for this service right now."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {branches.map((branch) => {
        const isSelected = selected === branch.id;
        const photoSrc = branch.image_url || branch.photo;
        const name = isAr ? (branch.name_ar || branch.name) : (branch.name || branch.name_ar);
        const address = isAr ? (branch.address_ar || branch.address) : (branch.address || branch.address_ar);

        return (
          <button
            key={branch.id}
            type="button"
            onClick={() => onSelect(branch.id)}
            className={`group relative flex items-start gap-4 p-5 rounded-2xl border-2 text-left rtl:text-right transition-all duration-300 active:scale-95 ${
              isSelected
                ? "border-accent bg-accent/8 ring-2 ring-accent/30 shadow-md shadow-accent/10 translate-y-[-2px]"
                : "border-accent/15 bg-white hover:border-accent/50 hover:shadow-lg hover:-translate-y-1"
            }`}
          >
            {/* Branch Image Preview */}
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-accent/20 bg-beige/50 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform mt-0.5">
              {photoSrc ? (
                <Image
                  src={photoSrc}
                  alt={name || "Branch"}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              ) : (
                <div
                  className={`w-full h-full flex items-center justify-center transition-colors ${
                    isSelected ? "bg-accent text-white" : "bg-primary/10 text-primary"
                  }`}
                >
                  <MapPin size={24} />
                </div>
              )}
            </div>

            {/* Branch Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-serif font-bold text-primary text-base leading-snug truncate group-hover:text-accent transition-colors">
                {name}
              </h3>
              <div className="flex items-start gap-1.5 mt-1.5 text-xs text-foreground/75">
                <MapPin size={13} className="text-accent shrink-0 mt-0.5" />
                <span className="line-clamp-2 leading-relaxed">{address}</span>
              </div>
              {branch.phone && (
                <div className="flex items-center gap-1.5 mt-2 text-[11px] text-foreground/60 font-mono">
                  <Phone size={11} className="text-accent shrink-0" />
                  <span>{branch.phone}</span>
                </div>
              )}
            </div>

            {/* Selection Checkmark Badge */}
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ml-auto rtl:ml-0 rtl:mr-auto mt-0.5 ${
                isSelected
                  ? "bg-accent text-white scale-110 shadow-md"
                  : "border-2 border-accent/30 bg-transparent group-hover:border-accent"
              }`}
            >
              {isSelected && <Check size={14} strokeWidth={3} />}
            </div>
          </button>
        );
      })}
    </div>
  );
}
