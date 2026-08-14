"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export function BookingHero() {
  const t = useTranslations("Booking");

  return (
    <section className="relative overflow-hidden w-full min-h-[220px] sm:min-h-[260px] md:h-[40vh] md:min-h-[320px] rounded-none sm:rounded-[28px] md:rounded-[36px] border-b sm:border border-accent/25 mb-6 sm:mb-8 md:mb-12 flex items-center py-8 sm:py-10 bg-[#2a4152] shadow-md">
      {/* Background Image with Parallax Scale */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero/hero4.webp"
          alt="Luxury Booking Experience"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
        {/* Multi-layered dark luxury gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a4152] via-[#2a4152]/80 to-[#2a4152]/40 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent z-10" />
      </div>

      {/* Decorative luxury frame overlay */}
      <div className="absolute inset-3 sm:inset-6 border border-amber-400/20 rounded-2xl sm:rounded-[28px] pointer-events-none z-15" />

      {/* Typography Content */}
      <div className="luxury-container relative z-25 text-center text-white mx-auto flex flex-col items-center gap-2.5 sm:gap-3.5 px-4">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-amber-400/30 bg-amber-500/10 backdrop-blur-sm text-amber-300 text-[9px] sm:text-xs uppercase tracking-[0.2em] font-bold shadow-sm"
        >
          <Sparkles size={11} className="text-amber-400 animate-pulse" />
          <span>{t("appointments")}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight tracking-tight drop-shadow-md"
        >
          {t("title")}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-[2px] w-16 sm:w-28 bg-gradient-to-r from-transparent via-amber-400 to-transparent my-0.5 sm:my-1"
        />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-white/85 max-w-xl text-xs sm:text-sm md:text-base leading-relaxed font-medium"
        >
          {t("subtitle")}
        </motion.p>
      </div>
    </section>
  );
}
