"use client";

// ─── IVPackageCards.tsx ──────────────────────────────────────────────────────
// Main 3-column responsive pricing & package comparison cards.
// Desktop: 3 columns | Tablet: 2/3 columns | Mobile: stacked.
// Visual distinction: Ultimate Restore features luxury gold elevation.

import { useTranslations } from "next-intl";
import { Check, MessageCircle, Sparkles, Crown, Zap, ShieldAlert } from "lucide-react";
import { CONTACT } from "@/lib/config/contact";
import { trackClickWhatsApp } from "@/lib/analytics/events";
import { usePathname } from "next/navigation";

export function IVPackageCards() {
  const t = useTranslations("IVPackages");
  const pathname = usePathname();

  const handlePackageWhatsApp = (packageName: string) => {
    trackClickWhatsApp({
      location: pathname,
      page_path: pathname,
      service_name: `IV Package - ${packageName}`,
      cta_position: "package_card",
      phone_type: "EG",
    });
  };

  const packages = [
    {
      id: "pkg1",
      name: t("pkg1.name"),
      price: t("pkg1.price"),
      bestFor: t("pkg1.bestFor"),
      benefits: [
        t("pkg1.benefits.0"),
        t("pkg1.benefits.1"),
        t("pkg1.benefits.2"),
        t("pkg1.benefits.3"),
        t("pkg1.benefits.4"),
      ],
      nutrients: [
        t("pkg1.nutrients.0"),
        t("pkg1.nutrients.1"),
        t("pkg1.nutrients.2"),
        t("pkg1.nutrients.3"),
        t("pkg1.nutrients.4"),
        t("pkg1.nutrients.5"),
      ],
      cta: t("pkg1.cta"),
      waMsg: t("pkg1.waMsg"),
      isPremium: false,
      isPopular: false,
      badge: null,
      theme: "standard",
    },
    {
      id: "pkg2",
      name: t("pkg2.name"),
      price: t("pkg2.price"),
      bestFor: t("pkg2.bestFor"),
      benefits: [
        t("pkg2.benefits.0"),
        t("pkg2.benefits.1"),
        t("pkg2.benefits.2"),
        t("pkg2.benefits.3"),
        t("pkg2.benefits.4"),
      ],
      nutrients: [
        t("pkg2.nutrients.0"),
        t("pkg2.nutrients.1"),
        t("pkg2.nutrients.2"),
        t("pkg2.nutrients.3"),
        t("pkg2.nutrients.4"),
        t("pkg2.nutrients.5"),
        t("pkg2.nutrients.6"),
        t("pkg2.nutrients.7"),
        t("pkg2.nutrients.8"),
      ],
      cta: t("pkg2.cta"),
      waMsg: t("pkg2.waMsg"),
      isPremium: false,
      isPopular: true,
      badge: t("popularBadge"),
      theme: "popular",
    },
    {
      id: "pkg3",
      name: t("pkg3.name"),
      price: t("pkg3.price"),
      bestFor: t("pkg3.bestFor"),
      benefits: [
        t("pkg3.benefits.0"),
        t("pkg3.benefits.1"),
        t("pkg3.benefits.2"),
        t("pkg3.benefits.3"),
        t("pkg3.benefits.4"),
      ],
      nutrients: [
        t("pkg3.nutrients.0"),
        t("pkg3.nutrients.1"),
        t("pkg3.nutrients.2"),
        t("pkg3.nutrients.3"),
        t("pkg3.nutrients.4"),
        t("pkg3.nutrients.5"),
        t("pkg3.nutrients.6"),
        t("pkg3.nutrients.7"),
        t("pkg3.nutrients.8"),
        t("pkg3.nutrients.9"),
        t("pkg3.nutrients.10"),
        t("pkg3.nutrients.11"),
      ],
      cta: t("pkg3.cta"),
      waMsg: t("pkg3.waMsg"),
      isPremium: true,
      isPopular: false,
      badge: t("ultimateBadge"),
      theme: "ultimate",
    },
  ];

  return (
    <section id="packages" className="py-20 lg:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C8A96B]/15 border border-[#C8A96B]/30 text-[#8E7036] text-xs font-bold mb-3 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A96B]" />
            <span>{t("packagesBadge")}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1E293B] tracking-tight mb-4">
            {t("packagesTitle")}
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
            {t("packagesSubtitle")}
          </p>
        </div>

        {/* 3 Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg) => {
            const isUltimate = pkg.isPremium;
            const encodedWa = encodeURIComponent(pkg.waMsg);

            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl transition-all duration-300 flex flex-col justify-between ${
                  isUltimate
                    ? "bg-[#0D2235] text-white border-2 border-[#C8A96B] shadow-2xl shadow-[#C8A96B]/20 lg:-translate-y-2.5 p-8"
                    : pkg.isPopular
                    ? "bg-white text-[#1E293B] border-2 border-[#C8A96B]/70 shadow-xl shadow-slate-200/60 p-7 lg:p-8"
                    : "bg-[#FAF8F5] text-[#1E293B] border border-[#E2E8F0] shadow-sm hover:shadow-md p-7 lg:p-8"
                }`}
              >
                {/* Top Badge for Popular / Ultimate */}
                {pkg.badge && (
                  <div
                    className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-black tracking-wider uppercase flex items-center gap-1.5 shadow-md ${
                      isUltimate
                        ? "bg-gradient-to-r from-[#D4AF37] via-[#C8A96B] to-[#B89647] text-[#0D2235] border border-amber-300"
                        : "bg-[#2A3F50] text-[#C8A96B] border border-[#C8A96B]/40"
                    }`}
                  >
                    {isUltimate ? (
                      <Crown className="w-3.5 h-3.5 fill-current" />
                    ) : (
                      <Zap className="w-3.5 h-3.5 fill-current" />
                    )}
                    <span>{pkg.badge}</span>
                  </div>
                )}

                {/* Card Header: Title, Best For, Price */}
                <div>
                  <div className="mb-6 border-b pb-6 border-current/10">
                    <h3
                      className={`text-2xl font-serif font-black mb-2 ${
                        isUltimate ? "text-[#C8A96B]" : "text-[#1E293B]"
                      }`}
                    >
                      {pkg.name}
                    </h3>
                    <p
                      className={`text-xs sm:text-sm font-medium min-h-[40px] leading-relaxed ${
                        isUltimate ? "text-white/80" : "text-[#64748B]"
                      }`}
                    >
                      <span className="font-bold opacity-90">{t("bestFor")}: </span>
                      {pkg.bestFor}
                    </p>

                    <div className="mt-5 flex items-baseline gap-1">
                      <span
                        className={`text-3xl sm:text-4xl font-black font-serif ${
                          isUltimate ? "text-white" : "text-[#1E293B]"
                        }`}
                      >
                        {pkg.price}
                      </span>
                    </div>
                  </div>

                  {/* Key Benefits List */}
                  <div className="mb-6">
                    <h4
                      className={`text-xs font-bold uppercase tracking-wider mb-3.5 ${
                        isUltimate ? "text-[#C8A96B]" : "text-[#8E7036]"
                      }`}
                    >
                      {t("keyBenefits")}
                    </h4>
                    <ul className="space-y-2.5">
                      {pkg.benefits.map((benefit, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm leading-snug"
                        >
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                              isUltimate
                                ? "bg-[#C8A96B]/20 text-[#C8A96B]"
                                : "bg-emerald-500/15 text-emerald-600"
                            }`}
                          >
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <span
                            className={
                              isUltimate ? "text-white/90" : "text-[#334155]"
                            }
                          >
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Core Nutrients Chips */}
                  <div className="mb-8">
                    <h4
                      className={`text-xs font-bold uppercase tracking-wider mb-3.5 ${
                        isUltimate ? "text-[#C8A96B]" : "text-[#8E7036]"
                      }`}
                    >
                      {t("coreNutrients")}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {pkg.nutrients.map((nutrient, nIdx) => (
                        <span
                          key={nIdx}
                          className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${
                            isUltimate
                              ? "bg-white/10 text-white/95 border-white/15"
                              : "bg-white text-[#1E293B] border-slate-200"
                          }`}
                        >
                          {nutrient}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* WhatsApp Action Button */}
                <div className="pt-2">
                  <a
                    href={`${CONTACT.whatsapp_url_eg}?text=${encodedWa}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handlePackageWhatsApp(pkg.name)}
                    className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all duration-300 shadow-md ${
                      isUltimate
                        ? "bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-green-500/20 hover:shadow-green-500/35 hover:-translate-y-0.5"
                        : "bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-green-500/15 hover:shadow-green-500/30 hover:-translate-y-0.5"
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>{pkg.cta}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
