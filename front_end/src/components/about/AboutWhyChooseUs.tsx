"use client";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles } from "lucide-react";

const whyPointKeys = [
  "history",
  "concerns",
  "medications",
  "labTests",
  "needs",
] as const;

export function AboutWhyChooseUs() {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <section className="bg-[#F7F2EA] py-12">
      <div className="luxury-container">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative aspect-square rounded-3xl overflow-hidden border border-[#C8A96B]/15 shadow-md"
          >
            <Image
              src="/AboutPreview/about.webp"
              alt="Premier Health Clinic"
              fill
              sizes="(max-width: 1024px) 100vw, 500px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F3D5A]/50 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 glass-card rounded-2xl p-5">
              <p className="text-sm font-serif font-bold text-[#1F3D5A]">
                {t("About.whyChooseUs.imageBadge")}
              </p>
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="inline-flex items-center gap-1.5 w-fit px-4 py-1.5 rounded-full border border-[#C8A96B]/30 bg-[#C8A96B]/5 text-[#C8A96B] text-[10px] uppercase tracking-[0.2em] font-bold">
                <Sparkles size={10} className="text-[#C8A96B] animate-pulse" />
                {t("About.whyChooseUs.tag")}
              </span>

              <h2 className="text-3xl md:text-4xl font-serif text-[#1F3D5A]">
                {t("About.whyChooseUs.title")}
              </h2>

              <div className="flex items-center gap-3 w-fit my-1">
                <div className="h-[1px] w-12 bg-gradient-to-r from-[#C8A96B] to-transparent rtl:bg-gradient-to-l rtl:from-[#C8A96B] rtl:to-transparent" />
                <div className="w-1.5 h-1.5 rotate-45 border border-[#C8A96B]/80 bg-white" />
                <div className="h-[1px] w-12 bg-gradient-to-l from-[#C8A96B] to-transparent rtl:bg-gradient-to-r rtl:from-[#C8A96B] rtl:to-transparent" />
              </div>

              <p className="text-sm text-[#1E293B]/65 mt-2 leading-relaxed">
                {t("About.whyChooseUs.desc")}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {whyPointKeys.map((key, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-[#C8A96B]/10 shadow-sm"
                >
                  <span className="text-2xl font-serif font-black text-[#C8A96B]/30 shrink-0 w-10 text-center">
                    {t(`About.whyChooseUs.points.${key}.num`)}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-[#1F3D5A] mb-1">
                      {t(`About.whyChooseUs.points.${key}.title`)}
                    </h4>
                    <p className="text-xs text-[#1E293B]/65">
                      {t(`About.whyChooseUs.points.${key}.desc`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
