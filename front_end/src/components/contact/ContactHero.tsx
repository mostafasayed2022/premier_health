"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";

export function ContactHero() {
  const t = useTranslations("Contact");

  return (
    <section className="relative overflow-hidden w-full min-h-[340px] sm:min-h-[400px] md:h-[75vh] md:min-h-[440px] rounded-none md:rounded-[32px] border-y md:border border-accent/20 mb-6 sm:mb-8 md:mb-12 flex items-center py-10 sm:py-16 bg-[#385366]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero/hero3.webp"
          alt="Clinic Concierge Contact Us"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Luxury dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#385366]/95 via-[#385366]/75 to-[#385366]/40 z-10" />
      </div>

      {/* Decorative frame overlay */}
      <div className="absolute inset-3 sm:inset-4 border border-white/10 rounded-2xl sm:rounded-[24px] pointer-events-none z-15" />

      {/* Typography Content */}
      <div className="luxury-container relative z-25 text-center text-white mx-auto flex flex-col items-center gap-3 sm:gap-4 px-4">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-accent/40 bg-accent/15 text-accent text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] font-bold shadow-sm"
        >
          {t("helpBadge")}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl sm:text-4xl md:text-5xl font-serif text-white leading-tight"
        >
          {t("title")}
        </motion.h1>
        <div className="h-[2px] w-16 sm:w-24 bg-accent" />
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/85 max-w-xl text-xs sm:text-sm md:text-base leading-relaxed font-medium"
        >
          {t("subtitle")}
        </motion.p>
      </div>
    </section>
  );
}
