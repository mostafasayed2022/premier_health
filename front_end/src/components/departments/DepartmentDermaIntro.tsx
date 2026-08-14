"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { ArrowRight, Sparkles } from "lucide-react";

export interface DepartmentDermaIntroProps {
  services?: any[];
}

export function DepartmentDermaIntro({
  services: customServices,
}: DepartmentDermaIntroProps = {}) {
  const t = useTranslations("DermaIntro");

  const defaultServices = [
    {
      title: t("hydrafacialTitle"),
      label: t("hydrafacialLabel"),
      photo: "/Derma/HYDRAFACIAL.webp",
      desc: t("hydrafacialDesc"),
      slug: "hydrafacial",
    },
    {
      title: t("carbonLaserTitle"),
      label: t("carbonLaserLabel"),
      photo: "/Derma/carbon.webp",
      desc: t("carbonLaserDesc"),
      slug: "carbon-laser",
    },
    {
      title: t("fillerBotoxTitle"),
      label: t("fillerBotoxLabel"),
      photo: "/Derma/BOTOX.webp",
      desc: t("fillerBotoxDesc"),
      slug: "filler-botox",
    },
  ];

  const services =
    customServices && customServices.length > 0
      ? customServices
      : defaultServices;
  return (
    <div className="flex flex-col gap-16 py-12">
      {/* Part A: Derma Header with background2.webp */}
      <section className="py-16 rounded-[36px] border border-[#C8A96B]/25 relative overflow-hidden shadow-lg text-center bg-slate-950">
        {/* Background Image: background2.webp - Fully Visible */}
        <Image
          src="/backgrounds/background2.webp"
          alt="Derma Services Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center z-0 opacity-100 pointer-events-none"
        />

        {/* Ambient lighting glows */}
        <div className="absolute inset-0 pointer-events-none z-5 overflow-hidden">
          <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-[#C8A96B]/15 blur-[100px]" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-slate-900/30 blur-[100px]" />
        </div>

        <div className="luxury-container text-center max-w-3xl mx-auto relative z-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#C8A96B]/40 text-[#C8A96B] text-[10px] uppercase tracking-widest font-bold mb-4 bg-black/40 backdrop-blur-md shadow-sm">
            <Sparkles size={11} className="text-[#C8A96B] animate-pulse" />
            {t("badge")}
          </span>

          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight drop-shadow-md">
            {t("title")}
          </h2>

          <div className="h-[2px] w-20 bg-[#C8A96B] mx-auto mb-6" />

          <p className="text-sm md:text-base text-white/90 leading-relaxed font-medium max-w-2xl mx-auto drop-shadow-sm">
            {t("desc")}
          </p>
        </div>
      </section>

      {/* Part B: YOUR SKIN, OUR EXPERTISE */}
      <section className="luxury-container">
        <div className="text-center mb-12">
          <span className="text-[#C8A96B] text-[10px] uppercase tracking-widest font-bold">
            {t("expertiseBadge")}
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#0F172A] mt-2">
            {t("expertiseTitle")}
          </h2>
          <div className="h-[2px] w-12 bg-[#C8A96B] mx-auto mt-4" />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="h-full"
            >
              <div className="group block h-full bg-white rounded-3xl border border-[#C8A96B]/15 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 card-gold-accent flex flex-col justify-between">
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={svc.photo}
                    alt={svc.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 to-transparent pointer-events-none" />
                  <span className="absolute top-4 left-4 text-[9px] uppercase font-bold tracking-widest text-slate-950 bg-[#C8A96B] px-3 py-1.5 rounded-full shadow-md font-mono">
                    {svc.label}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-slate-900 mb-2 group-hover:text-[#C8A96B] transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4 font-medium">
                      {svc.desc}
                    </p>
                  </div>
                  {/* <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C8A96B] group-hover:text-slate-900 transition-colors mt-auto">
                    {t("viewDetails")}
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                    />
                  </div> */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
