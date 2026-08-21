"use client";

// ─── IVPackagesHero.tsx ──────────────────────────────────────────────────────
// Luxury Hero for IV Therapy Packages using Premier Health brand aesthetics.

import Image from "next/image";
import { Sparkles, MessageCircle, ShieldCheck, Zap, Droplets } from "lucide-react";
import { useTranslations } from "next-intl";
import { CONTACT } from "@/lib/config/contact";
import { trackClickWhatsApp } from "@/lib/analytics/events";
import { usePathname } from "next/navigation";

export function IVPackagesHero() {
  const t = useTranslations("IVPackages");
  const pathname = usePathname();

  const handleHeroWhatsApp = () => {
    trackClickWhatsApp({
      location: pathname,
      page_path: pathname,
      service_name: "IV Therapy Packages",
      cta_position: "packages_hero",
      phone_type: "EG",
    });
  };

  const encodedMsg = encodeURIComponent(t("heroMsg"));

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0d2235] text-white pt-28 pb-20">
      {/* Background Image with luxury parallax style */}
      <Image
        src="/AboutPreview/layout3.webp"
        alt="Premier Health IV Therapy Suite"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center z-0 scale-105"
      />

      {/* Dark Luxury Gradient Overlay for crisp contrast & focus */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d2235]/95 via-[#0d2235]/85 to-[#0d2235] z-5 pointer-events-none" />

      {/* Ambient Lighting & Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#C8A96B]/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-[#C8A96B]/40 text-[#C8A96B] text-xs sm:text-sm font-bold mb-6 shadow-lg">
          <Sparkles className="w-4 h-4 text-[#C8A96B] animate-spin-slow" />
          <span>{t("heroBadge")}</span>
        </div>

        {/* Main H1 Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight leading-tight text-white mb-6 max-w-4xl drop-shadow-md">
          {t("heroTitle")}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-white/90 max-w-3xl leading-relaxed mb-10 font-medium drop-shadow-sm">
          {t("heroSubtitle")}
        </p>

        {/* Primary WhatsApp Booking CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-12">
          <a
            href={`${CONTACT.whatsapp_url_eg}?text=${encodedMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleHeroWhatsApp}
            className="group inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-base sm:text-lg px-9 py-4 rounded-2xl shadow-xl shadow-green-500/25 hover:shadow-green-500/40 hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>{t("heroCta")}</span>
          </a>
        </div>

        {/* Micro Value Tags */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-2xl w-full text-xs sm:text-sm text-white/85">
          <div className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <Droplets className="w-4 h-4 text-[#C8A96B]" />
            <span>100% Bioavailability</span>
          </div>
          <div className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <ShieldCheck className="w-4 h-4 text-[#C8A96B]" />
            <span>Physician Supervised</span>
          </div>
          <div className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <Zap className="w-4 h-4 text-[#C8A96B]" />
            <span>Immediate Cellular Vitality</span>
          </div>
        </div>
      </div>
    </section>
  );
}
