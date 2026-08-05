"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";

export function DepartmentCta() {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <section className="bg-primary py-20 text-center rounded-3xl mt-12 overflow-hidden relative shadow-md">
      {/* Decorative Spheres */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-accent blur-2xl" />
        <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-accent-light blur-2xl" />
      </div>

      <div className="luxury-container relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">
          {t("Departments.ctaTitle")}
        </h2>
        <p className="text-white/65 mb-8 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          {t("Departments.ctaSubtitle")}
        </p>
        <Link
          href="/book-appointment"
          className="inline-flex items-center gap-3 bg-accent hover:bg-accent-light text-white px-10 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95"
        >
          {t("Departments.ctaButton")}
          <ArrowRight size={16} className="rtl:rotate-180" />
        </Link>
      </div>
    </section>
  );
}
