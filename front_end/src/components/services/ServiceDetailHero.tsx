"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { ServiceData } from "./types";

interface ServiceDetailHeroProps {
  service: ServiceData;
}

export function ServiceDetailHero({ service }: ServiceDetailHeroProps) {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <section className="relative overflow-hidden w-full min-h-[35vh] md:min-h-[50vh] flex items-center py-12 md:py-20 bg-[#385366] rounded-none md:rounded-[32px] border-y md:border border-accent/15 mb-8 md:mb-12">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={service.photo}
          alt={isAr ? service.name_ar : service.name}
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
          <Link href="/services" className="hover:text-accent transition-colors">
            {t("Nav.services")}
          </Link>
          <span>/</span>
          <span className="text-white/80">{isAr ? service.name_ar : service.name}</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-12 lg:grid-cols-12 items-center"
        >
          {/* Details column */}
          <div className="lg:col-span-7 flex flex-col gap-4 text-white text-left rtl:text-right">
            <span className="inline-block w-fit px-4 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-[9px] uppercase tracking-widest font-bold">
              {service.category.replace("-", " ")}
            </span>
            <h1 className="text-3xl md:text-5xl font-serif text-white leading-tight">
              {isAr ? service.name_ar : service.name}
            </h1>
            <div className="h-[1px] w-20 bg-accent shrink-0" />
            <p className="text-white/90 text-xs md:text-sm leading-relaxed font-medium max-w-xl">
              {isAr ? service.description_ar : service.description}
            </p>
            <div className="flex gap-4 mt-4">
              <Link
                href="/book-appointment"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white px-8 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95"
              >
                {t("Home.bookNow")}
                <ArrowRight size={13} className="rtl:rotate-180" />
              </Link>
            </div>
          </div>

          {/* Pricing glassmorphic card */}
          <div className="lg:col-span-5 bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <p className="text-white/60 text-[10px] uppercase tracking-widest">
                {t("Services.startingFrom")}
              </p>
            </div>
            <div className="text-5xl font-serif font-black text-accent">${service.price}</div>
            {service.ingredients && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-[10px] text-white/50 uppercase tracking-wider mb-2">
                  {t("Services.ingredients")}
                </p>
                <p className="text-xs text-white/80 italic leading-relaxed">
                  {isAr ? service.ingredients_ar : service.ingredients}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
