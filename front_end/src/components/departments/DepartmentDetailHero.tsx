"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import Image from "next/image";
import { Department } from "@/lib/api";

interface DepartmentDetailHeroProps {
  department: Department;
}

export function DepartmentDetailHero({
  department,
}: DepartmentDetailHeroProps) {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <section className="relative overflow-hidden w-full min-h-[35vh] md:min-h-[50vh] flex items-center py-12 md:py-20 bg-[#385366] rounded-none md:rounded-[32px] border-y md:border border-accent/15 mb-8 md:mb-12">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={department.photo}
          alt={department.name}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Deep blue-gold overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#385366]/98 via-[#385366]/85 to-[#385366]/40 z-10 rtl:bg-gradient-to-l rtl:from-[#385366]/98 rtl:via-[#385366]/85" />
      </div>

      {/* Decorative frame overlay */}
      <div className="absolute inset-4 border border-white/10 rounded-[24px] pointer-events-none z-15" />

      <div className="luxury-container relative z-20 w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-white/50 mb-8">
          <Link
            href="/departments"
            className="hover:text-accent transition-colors"
          >
            {t("Departments.title")}
          </Link>
          <span>/</span>
          <span className="text-white/80 font-medium">
            {isAr ? department.name_ar : department.name}
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12 rounded-3xl shadow-md flex flex-col gap-4 text-white"
        >
          <span className="inline-block w-fit px-4 py-1.5 rounded-full bg-accent/20 border border-accent/30 text-accent text-[9px] uppercase tracking-widest font-bold">
            {t("Departments.medicalDepartment")}
          </span>
          <h1 className="text-3xl md:text-5xl font-serif text-white leading-tight">
            {isAr ? department.name_ar : department.name}
          </h1>
          <div className="h-[1px] w-20 bg-accent shrink-0" />
          <p className="text-white/90 text-xs md:text-sm leading-relaxed font-medium">
            {isAr ? department.description_ar : department.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
