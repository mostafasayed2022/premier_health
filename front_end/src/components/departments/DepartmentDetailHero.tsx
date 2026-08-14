"use client";

import { useTranslations } from "next-intl";
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

  return (
    <section className="relative overflow-hidden w-full min-h-[360px] sm:min-h-[420px] md:min-h-[50vh] flex items-center py-8 sm:py-14 md:py-20 bg-[#385366] rounded-none md:rounded-[32px] border-y md:border border-accent/15 mb-6 sm:mb-8 md:mb-12">
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
      <div className="absolute inset-3 sm:inset-4 border border-white/10 rounded-2xl sm:rounded-[24px] pointer-events-none z-15" />

      <div className="luxury-container relative z-20 w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[11px] sm:text-xs text-white/60 mb-4 sm:mb-8">
          <Link
            href="/departments"
            className="hover:text-accent transition-colors"
          >
            {t("Departments.title")}
          </Link>
          <span>/</span>
          <span className="text-white font-medium line-clamp-1">
            {department.name}
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl bg-white/10 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl shadow-md flex flex-col gap-3.5 sm:gap-4 text-white"
        >
          <span className="inline-block w-fit px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-accent/20 border border-accent/30 text-accent text-[9px] sm:text-[10px] uppercase tracking-widest font-bold">
            {t("Departments.medicalDepartment")}
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif text-white leading-tight">
            {department.name}
          </h1>
          <div className="h-[2px] w-16 sm:w-20 bg-accent shrink-0" />
          <p className="text-white/90 text-xs sm:text-sm md:text-base leading-relaxed font-medium">
            {department.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
