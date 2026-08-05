"use client";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const timelineKeys = ["2018", "2020", "2023"] as const;

export function AboutTimeline() {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <section className="luxury-container py-12">
      <div className="relative text-center mb-12 flex flex-col items-center gap-4">
        {/* Ambient backlight glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-24 bg-[#C8A96B]/10 rounded-full blur-[80px] pointer-events-none select-none" />

        <span className="relative z-10 text-[#C8A96B] text-[10px] uppercase tracking-[0.25em] font-bold bg-[#C8A96B]/5 border border-[#C8A96B]/30 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5">
          <Sparkles size={10} className="text-[#C8A96B] animate-pulse" />
          {t("About.timeline.journeyTag")}
        </span>

        <h2 className="relative z-10 text-3xl md:text-5xl font-serif font-light text-[#1F3D5A] tracking-tight leading-tight">
          {t("About.timeline.historyTitle")}
        </h2>

        <div className="relative z-10 flex items-center gap-4 w-full justify-center mt-2">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#C8A96B]/50" />
          <div className="w-2 h-2 rotate-45 border border-[#C8A96B]/80 bg-white" />
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#C8A96B]/50" />
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-[#C8A96B]/20 -translate-x-1/2" />

        <div className="flex flex-col gap-16">
          {timelineKeys.map((key, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative flex flex-col md:flex-row gap-8 items-start ${
                i % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Year bubble */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 top-0 flex flex-col items-center gap-1 z-10">
                <div className="h-5 w-5 rounded-full bg-[#C8A96B] border-4 border-white shadow-md" />
              </div>

              {/* Content side */}
              <div
                className={`md:w-1/2 ${i % 2 === 0 ? "md:pr-16 pl-16 md:pl-0" : "md:pl-16 pl-16"}`}
              >
                <div className="bg-white rounded-2xl border border-[#C8A96B]/15 shadow-sm p-8 card-gold-accent">
                  <span className="text-3xl font-serif font-bold text-[#C8A96B]/40">
                    {t(`About.timeline.items.${key}.year`)}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-[#1F3D5A] mt-2 mb-3">
                    {t(`About.timeline.items.${key}.title`)}
                  </h3>
                  <p className="text-sm text-[#1E293B]/70 leading-relaxed">
                    {t(`About.timeline.items.${key}.desc`)}
                  </p>
                </div>
              </div>

              {/* Spacer */}
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
