"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Award,
  ShieldCheck,
  HeartPulse,
  Heart,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

interface ValueItem {
  key: "excellence" | "integrity" | "patientCare" | "compassion" | "innovation";
  icon: typeof Award;
  num: string;
  arabicNum: string;
  badge: { en: string; ar: string };
}

const valueItems: ValueItem[] = [
  {
    key: "excellence",
    icon: Award,
    num: "01",
    arabicNum: "٠١",
    badge: { en: "Standard", ar: "معيارنا" },
  },
  {
    key: "integrity",
    icon: ShieldCheck,
    num: "02",
    arabicNum: "٠٢",
    badge: { en: "Trust", ar: "ثقة وأمانة" },
  },
  {
    key: "patientCare",
    icon: HeartPulse,
    num: "03",
    arabicNum: "٠٣",
    badge: { en: "Focus", ar: "أولويتنا" },
  },
  {
    key: "compassion",
    icon: Heart,
    num: "04",
    arabicNum: "٠٤",
    badge: { en: "Empathy", ar: "رعاية إنسانية" },
  },
  {
    key: "innovation",
    icon: Sparkles,
    num: "05",
    arabicNum: "٠٥",
    badge: { en: "Future", ar: "تطور مستمر" },
  },
];

export function AboutCoreValues() {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-white to-[#FAF7F2]">
      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-r from-[#C8A96B]/10 via-[#1F3D5A]/5 to-[#C8A96B]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#C8A96B]/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#1F3D5A]/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="luxury-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C8A96B]/10 border border-[#C8A96B]/30 text-[#C8A96B] mb-4 shadow-sm backdrop-blur-sm"
          >
            <Sparkles size={12} className="animate-pulse text-[#C8A96B]" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-bold">
              {t("About.coreValuesTag")}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#1F3D5A] tracking-tight leading-tight mb-4"
          >
            {t("About.coreValuesTitle")}
          </motion.h2>

          {/* Ornamental Divider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-3 my-2"
          >
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#C8A96B]" />
            <div className="w-2 h-2 rotate-45 border border-[#C8A96B] bg-[#C8A96B]/20" />
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#C8A96B]" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-sm md:text-base text-[#1E293B]/70 leading-relaxed max-w-2xl mt-2 font-normal"
          >
            {t("About.coreValuesDesc")}
          </motion.p>
        </div>

        {/* 5 Core Values Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {valueItems.map((item, index) => {
            const Icon = item.icon;
            const numberDisplay = isAr ? item.arabicNum : item.num;
            const badgeText = isAr ? item.badge.ar : item.badge.en;

            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.09 }}
                className="group relative flex flex-col justify-between rounded-3xl bg-white p-7 md:p-8 border border-[#C8A96B]/20 shadow-sm hover:shadow-xl hover:shadow-[#C8A96B]/15 hover:border-[#C8A96B]/60 transition-all duration-500 hover:-translate-y-2.5 overflow-hidden"
              >
                {/* Top Subtle Hover Glow Aura */}
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-[#C8A96B]/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none opacity-0 group-hover:opacity-100" />

                {/* Subtle Card Background Pattern Accent */}
                <div className="absolute inset-0 bg-gradient-to-b from-white via-[#FAF7F2]/40 to-white opacity-90 -z-10" />

                <div>
                  {/* Top Row: Number Watermark & Mini Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#1F3D5A]/5 text-[#1F3D5A] group-hover:bg-[#C8A96B]/15 group-hover:text-[#917232] transition-colors duration-300">
                      {badgeText}
                    </span>
                    <span className="font-serif text-3xl font-light text-[#C8A96B]/30 group-hover:text-[#C8A96B]/80 transition-colors duration-300 select-none">
                      {numberDisplay}
                    </span>
                  </div>

                  {/* Icon Container with Logo Colors (Gold Gradient & Deep Navy) */}
                  <div className="mb-6 flex">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#EBD9B5] via-[#C8A96B] to-[#9E7E3F] text-[#1F3D5A] flex items-center justify-center shadow-md shadow-[#C8A96B]/30 border-2 border-white/70 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-[#C8A96B]/45 transition-all duration-500">
                      <Icon
                        size={26}
                        className="transition-transform duration-500 group-hover:rotate-6 text-[#1F3D5A] drop-shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Value Title */}
                  <h3 className="text-lg md:text-xl font-serif font-bold text-[#1F3D5A] mb-3 group-hover:text-[#C8A96B] transition-colors duration-300 leading-snug">
                    {t(`About.values.${item.key}.title`)}
                  </h3>

                  {/* Value Description */}
                  <p className="text-xs md:text-sm text-[#1E293B]/70 leading-relaxed font-normal">
                    {t(`About.values.${item.key}.desc`)}
                  </p>
                </div>

                {/* Bottom Interactive Expanding Gold Line */}
                <div className="mt-8 pt-4 border-t border-[#C8A96B]/10">
                  <div className="h-[2px] w-8 bg-[#C8A96B]/40 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-[#C8A96B] group-hover:to-[#dfca9b] transition-all duration-500 rounded-full" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 flex items-center justify-center gap-3 text-xs md:text-sm text-[#1F3D5A]/80 bg-white/80 border border-[#C8A96B]/25 rounded-2xl py-3.5 px-6 max-w-xl mx-auto shadow-sm backdrop-blur-sm"
        >
          <CheckCircle2 size={18} className="text-[#C8A96B] shrink-0" />
          <span className="font-medium text-center">
            {isAr
              ? "معايير رعاية صحية وطبية عالمية تضع صحتك وراحتك في المقام الأول"
              : "World-class clinical healthcare standards prioritizing your wellness and comfort"}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
