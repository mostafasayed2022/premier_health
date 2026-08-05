"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import {
  getDepartments,
  getServicesByDepartment,
  Department,
  Service,
} from "@/lib/api";
import { Check, Clock, Sparkles } from "lucide-react";
import Image from "next/image";

interface Step2ServiceProps {
  deptId: string;
  selected: string;
  onSelect: (id: string) => void;
}

export function Step2Service({
  deptId,
  selected,
  onSelect,
}: Step2ServiceProps) {
  const locale = useLocale();
  const isAr = locale === "ar";

  const [departments, setDepartments] = useState<Department[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getDepartments(),
      deptId ? getServicesByDepartment(Number(deptId)) : Promise.resolve([])
    ]).then(([depts, svcs]) => {
      if (depts) setDepartments(depts);
      if (svcs) setServices(svcs);
      setLoading(false);
    });
  }, [deptId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-8 h-8 rounded-full border-4 border-accent/20 border-t-accent animate-spin" />
      </div>
    );
  }

  const dept = departments.find((d) => d.id === deptId);
  const filteredServices = services.filter(
    (s) => !s.category || s.category === dept?.slug,
  );

  if (filteredServices.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-foreground/70 font-medium">
          {isAr ? "لا توجد خدمات متاحة حالياً في هذا القسم." : "No services available in this department right now."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {filteredServices.map((svc) => {
        const isSelected = selected === svc.id;
        const name = isAr ? (svc.name_ar || svc.name) : (svc.name || svc.name_ar);
        const desc = isAr ? (svc.description_ar || svc.description) : (svc.description || svc.description_ar);

        return (
          <button
            key={svc.id}
            type="button"
            onClick={() => onSelect(svc.id)}
            className={`group relative flex items-start gap-4 p-5 rounded-2xl border-2 text-left rtl:text-right transition-all duration-300 active:scale-95 ${
              isSelected
                ? "border-accent bg-accent/8 ring-2 ring-accent/30 shadow-md shadow-accent/10 translate-y-[-2px]"
                : "border-accent/15 bg-white hover:border-accent/50 hover:shadow-lg hover:-translate-y-1"
            }`}
          >
            {/* Service Photo / Icon */}
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-accent/20 bg-beige/50 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform mt-0.5">
              {svc.photo ? (
                <Image
                  src={svc.photo}
                  alt={name || "Service"}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              ) : (
                <div
                  className={`w-full h-full flex items-center justify-center text-2xl transition-colors ${
                    isSelected ? "bg-accent text-white" : "bg-primary/10 text-primary"
                  }`}
                >
                  <Sparkles size={24} />
                </div>
              )}
            </div>

            {/* Service Details */}
            <div className="flex-1 min-w-0">
              <h3 className="font-serif font-bold text-primary text-base leading-snug truncate group-hover:text-accent transition-colors">
                {name}
              </h3>
              <p className="text-xs text-foreground/75 mt-1 line-clamp-2 leading-relaxed">
                {desc}
              </p>
              
              <div className="flex items-center gap-3 mt-3">
                {svc.price != null && (
                  <span className="inline-block px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent font-bold text-xs">
                    ${svc.price}
                  </span>
                )}
                {svc.duration && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-foreground/60 font-medium">
                    <Clock size={12} className="text-accent" />
                    {svc.duration}
                  </span>
                )}
              </div>
            </div>

            {/* Selection Checkmark */}
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
