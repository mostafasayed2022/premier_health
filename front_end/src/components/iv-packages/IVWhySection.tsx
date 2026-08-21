"use client";

// ─── IVWhySection.tsx ────────────────────────────────────────────────────────
// Section explaining cellular benefits & medical superiority of IV Therapy.

import { useTranslations } from "next-intl";
import { Droplets, ShieldCheck, Sparkles, HeartPulse } from "lucide-react";

export function IVWhySection() {
  const t = useTranslations("IVPackages");

  const cards = [
    {
      icon: Droplets,
      title: t("whyCards.bioavailability.title"),
      desc: t("whyCards.bioavailability.desc"),
    },
    {
      icon: ShieldCheck,
      title: t("whyCards.medicalSupervision.title"),
      desc: t("whyCards.medicalSupervision.desc"),
    },
    {
      icon: Sparkles,
      title: t("whyCards.premiumFormulations.title"),
      desc: t("whyCards.premiumFormulations.desc"),
    },
    {
      icon: HeartPulse,
      title: t("whyCards.rapidRecovery.title"),
      desc: t("whyCards.rapidRecovery.desc"),
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FAF8F5] relative overflow-hidden">
      {/* Decorative ambient subtle circle */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#C8A96B]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C8A96B]/15 border border-[#C8A96B]/30 text-[#8E7036] text-xs font-bold mb-3 uppercase tracking-wider">
            <span>{t("whyBadge")}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1E293B] tracking-tight mb-4">
            {t("whyTitle")}
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
            {t("whySubtitle")}
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-white p-7 rounded-3xl border border-[#E2E8F0] shadow-sm hover:shadow-xl hover:border-[#C8A96B]/50 transition-all duration-300 group flex flex-col items-start"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#C8A96B]/25 flex items-center justify-center text-[#C8A96B] mb-5 group-hover:scale-110 group-hover:bg-[#C8A96B] group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1E293B] mb-2 font-serif">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed font-normal">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
