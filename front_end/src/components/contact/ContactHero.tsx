"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";

export function ContactHero() {
  const t = useTranslations("Contact");

  return (
    <section className="relative overflow-hidden w-full h-[55vh] min-h-[350px] md:h-[80vh] md:min-h-[420px] rounded-none md:rounded-[32px] border-y md:border border-accent/20 mb-8 md:mb-12 flex items-center bg-[#385366]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1600"
          alt="Clinic Concierge Contact Us"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Luxury dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#385366]/90 via-[#385366]/70 to-[#385366]/40 z-10" />
      </div>

      {/* Decorative frame overlay */}
      <div className="absolute inset-4 border border-white/10 rounded-[24px] pointer-events-none z-15" />

      {/* Typography Content */}
      <div className="luxury-container relative z-25 text-center text-white mx-auto flex flex-col items-center gap-4">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-5 py-2 rounded-full border border-accent/40 bg-accent/15 text-accent text-[9px] uppercase tracking-[0.25em] font-bold"
        >
          {t("helpBadge")}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl font-serif text-white leading-tight"
        >
          {t("title")}
        </motion.h1>
        <div className="h-[2px] w-24 bg-accent" />
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/80 max-w-xl text-xs md:text-sm leading-relaxed font-medium"
        >
          {t("subtitle")}
        </motion.p>
      </div>
    </section>
  );
}
