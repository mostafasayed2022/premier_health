"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Stethoscope } from "lucide-react";
import Image from "next/image";
import type { Department } from "@/lib/types";

interface BranchSpecialtiesSectionProps {
  departments: Department[];
  isLoading: boolean;
}

export function BranchSpecialtiesSection({
  departments,
  isLoading,
}: BranchSpecialtiesSectionProps) {
  const t = useTranslations("Branches");
  const locale = useLocale();
  const isAr = locale === "ar";

  const departmentSpecialties = departments.slice(0, 4);

  return (
    <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
      {/* Ambient glow backgrounds */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C8A96B]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#385366]/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="luxury-container relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[#C8A96B] font-bold text-xs tracking-widest uppercase flex items-center gap-1.5">
              <Sparkles size={13} className="text-[#C8A96B]" />
              {t("specialtiesSubtitle")}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white mt-2">
              {t("specialtiesTitle")}
            </h2>
          </div>
          <Link
            href="/departments"
            aria-label={isAr ? "عرض جميع التخصصات" : "View all specialties"}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#C8A96B] hover:text-white transition-colors"
          >
            <span>{t("viewAllSpecialties")}</span>
            <ArrowRight size={16} className="rtl:rotate-180" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 h-72 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white/10 rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {departmentSpecialties.map((dept: Department, idx: number) => {
              const imageUrl =
                dept.image_url ||
                dept.photo ||
                "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800";

              return (
                <motion.div
                  key={dept.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative rounded-3xl overflow-hidden bg-slate-800/80 border border-white/15 flex flex-col justify-between h-72 p-6 transition-transform duration-500 hover:-translate-y-1.5 hover:border-[#C8A96B]/50"
                >
                  <Image
                    src={imageUrl}
                    alt={isAr ? dept.name_ar : dept.name}
                    fill
                    className="object-cover opacity-40 group-hover:scale-105 group-hover:opacity-50 transition-all duration-700 pointer-events-none"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-[#C8A96B]">
                      <Stethoscope size={18} />
                    </span>
                    {dept.doctorsCount > 0 && (
                      <span className="text-[10px] font-bold text-white/80 uppercase bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                        {dept.doctorsCount} {t("specialistsCount")}
                      </span>
                    )}
                  </div>

                  <div className="relative z-10">
                    <h3 className="font-serif text-xl font-bold text-white mb-1 group-hover:text-[#C8A96B] transition-colors">
                      {isAr ? dept.name_ar : dept.name}
                    </h3>
                    <p className="text-xs text-white/70 line-clamp-2 leading-relaxed">
                      {isAr ? dept.description_ar : dept.description}
                    </p>
                    <Link
                      href={`/department/${dept.slug}`}
                      aria-label={`${isAr ? "اقرأ المزيد عن قسم" : "Learn more about"} ${isAr ? dept.name_ar : dept.name}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C8A96B] mt-3 hover:underline"
                    >
                      <span>{t("learnMore")}</span>
                      <ArrowRight size={12} className="rtl:rotate-180" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
