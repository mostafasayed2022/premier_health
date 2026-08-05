"use client";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Sparkles,
  Shield,
  Heart,
  Activity,
  CheckCircle,
} from "lucide-react";


const valueKeys = [
  "excellence",
  "integrity",
  "patientCare",
  "compassion",
  "innovation",
] as const;
const valueIcons = [Sparkles, Shield, Heart, Activity, CheckCircle];
const valueLetters = ["A", "B", "C", "D", "E"];

export function AboutMissionVision() {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <>
      {/* Mission & Vision */}
      <section className="bg-[#F7F2EA] py-12">
        <div className="luxury-container">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-10 shadow-sm border border-[#C8A96B]/10 card-gold-accent"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-[#1F3D5A]/5 text-[#1F3D5A]">
                  <Target size={28} />
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C8A96B] font-bold">
                  {t("About.ourMission")}
                </span>
              </div>
              <h3 className="text-2xl font-serif text-[#1F3D5A] mb-4">
                {t("About.missionTitle")}
              </h3>
              <p className="text-sm text-[#1E293B]/75 leading-relaxed mb-4">
                {t("About.missionDesc")}
              </p>
              <p className="text-xs text-[#1E293B]/55 leading-relaxed italic border-l-2 border-[#C8A96B] pl-4 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-4">
                {t("About.missionQuote")}
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-[#1F3D5A] rounded-3xl p-10 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-white/10 text-[#C8A96B]">
                  <Eye size={28} />
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C8A96B] font-bold">
                  {t("About.ourVision")}
                </span>
              </div>
              <h3 className="text-2xl font-serif text-white mb-4">
                {t("About.visionTitle")}
              </h3>
              <p className="text-sm text-white/80 leading-relaxed mb-4">
                {t("About.visionDesc")}
              </p>
              <p className="text-xs text-white/50 leading-relaxed italic border-l-2 border-[#C8A96B]/50 pl-4 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-4">
                {t("About.visionQuote")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="luxury-container py-12">
        <div className="relative text-center mb-12 flex flex-col items-center gap-4">
          {/* Ambient backlight glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-24 bg-accent/10 rounded-full blur-[80px] pointer-events-none select-none" />

          <span className="relative z-10 text-accent text-[10px] uppercase tracking-[0.25em] font-bold bg-accent/5 border border-accent/30 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Sparkles size={10} className="text-accent animate-pulse" />
            {t("About.coreValuesTag")}
          </span>

          <h2 className="relative z-10 text-3xl md:text-5xl font-serif font-light text-primary tracking-tight leading-tight">
            {t("About.coreValuesTitle")}
          </h2>

          <div className="relative z-10 flex items-center gap-4 w-full justify-center mt-2">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-accent/50" />
            <div className="w-2 h-2 rotate-45 border border-accent/80 bg-white" />
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-accent/50" />
          </div>
        </div>
        <p className="text-sm text-[#1E293B]/60 mt-4 max-w-xl mx-auto">
          {t("About.coreValuesDesc")}
        </p>
        <div className="h-[2px] w-20 bg-[#C8A96B] mx-auto mt-4" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {valueKeys.map((key, i) => {
            const Icon = valueIcons[i];
            const letter = valueLetters[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-[#C8A96B]/10 p-7 text-center shadow-sm hover:-translate-y-2 transition-transform duration-300 card-gold-accent group"
              >
                <div className="text-4xl font-serif font-black text-[#C8A96B]/15 group-hover:text-[#C8A96B]/25 transition-colors mb-4">
                  {letter}
                </div>
                <div className="p-3 rounded-xl bg-[#1F3D5A]/5 text-[#1F3D5A] w-fit mx-auto mb-4">
                  <Icon size={22} />
                </div>
                <h4 className="text-sm font-serif font-bold text-[#1F3D5A] mb-2">
                  {t(`About.values.${key}.title`)}
                </h4>
                <p className="text-xs text-[#1E293B]/65 leading-relaxed">
                  {t(`About.values.${key}.desc`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
}
