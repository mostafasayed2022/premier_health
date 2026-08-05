"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Image from "next/image";

export function ServicesHero() {
  const t = useTranslations("Services");

  return (
    <section className="relative w-full h-[55vh] min-h-[350px] md:h-[80vh] md:min-h-[420px] overflow-hidden flex items-center bg-[#243642] mb-10">
      {/* Background Image with Ken Burns Zoom */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1.02 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="w-full h-full relative"
        >
          <Image
            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1600"
            alt="Premium Treatments Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
        {/* Soft luxury dark gradient mask */}
        <div className="absolute inset-0 bg-[#243642]/65 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#243642]/95 via-[#243642]/40 to-transparent z-10 rtl:bg-gradient-to-l rtl:from-[#243642]/95 rtl:via-[#243642]/40" />
      </div>

      {/* Asymmetric Floating Magazine Glassmorphic Plate */}
      <div className="luxury-container relative z-20 w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-3xl shadow-md flex flex-col gap-3 text-white text-left rtl:text-right"
        >
          <div className="inline-flex items-center gap-1.5 w-fit px-3 py-1 rounded-full border border-accent/40 bg-accent/15 text-accent text-[9px] uppercase tracking-[0.25em] font-bold">
            <Sparkles size={10} className="animate-pulse" />
            {t("premiumTreatments")}
          </div>

          <h1 className="text-3xl md:text-5xl font-serif text-white leading-tight tracking-tight">
            {t("title")}
          </h1>

          <div className="flex items-center gap-3 w-full my-1">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-accent" />
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-accent" />
          </div>

          <p className="text-white/85 text-xs md:text-sm leading-relaxed font-medium">
            {t("subtitle")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
