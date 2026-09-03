"use client";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";

export function AboutMissionVision() {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <section className="bg-[#F7F2EA] py-16">
      <div className="luxury-container">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-[#C8A96B]/15 card-gold-accent flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3.5 rounded-2xl bg-[#1F3D5A]/5 text-[#1F3D5A] border border-[#1F3D5A]/10">
                  <Target size={28} />
                </div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#C8A96B] font-bold">
                  {t("About.ourMission")}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif text-[#1F3D5A] mb-4 font-normal">
                {t("About.missionTitle")}
              </h3>
              <p className="text-sm md:text-base text-[#1E293B]/75 leading-relaxed mb-6 font-normal">
                {t("About.missionDesc")}
              </p>
            </div>
            <p className="text-xs md:text-sm text-[#1E293B]/60 leading-relaxed italic border-l-2 border-[#C8A96B] pl-4 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-4 pt-2">
              "{t("About.missionQuote")}"
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-gradient-to-br from-[#1F3D5A] to-[#152a3f] rounded-3xl p-8 md:p-10 shadow-lg border border-white/10 flex flex-col justify-between text-white"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3.5 rounded-2xl bg-white/10 text-[#C8A96B] border border-white/10">
                  <Eye size={28} />
                </div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#C8A96B] font-bold">
                  {t("About.ourVision")}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif text-white mb-4 font-normal">
                {t("About.visionTitle")}
              </h3>
              <p className="text-sm md:text-base text-white/80 leading-relaxed mb-6 font-normal">
                {t("About.visionDesc")}
              </p>
            </div>
            <p className="text-xs md:text-sm text-white/60 leading-relaxed italic border-l-2 border-[#C8A96B]/60 pl-4 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-4 pt-2">
              "{t("About.visionQuote")}"
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

