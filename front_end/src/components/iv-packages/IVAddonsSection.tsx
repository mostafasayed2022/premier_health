"use client";

// ─── IVAddonsSection.tsx ─────────────────────────────────────────────────────
// Optional premium boosters & add-ons section with dedicated WhatsApp inquiry CTA.

import { useTranslations } from "next-intl";
import { PlusCircle, MessageCircle, Sparkles, ShieldPlus } from "lucide-react";
import { CONTACT } from "@/lib/config/contact";
import { trackClickWhatsApp } from "@/lib/analytics/events";
import { usePathname } from "next/navigation";

export function IVAddonsSection() {
  const t = useTranslations("IVPackages");
  const pathname = usePathname();

  const handleAddonsWhatsApp = () => {
    trackClickWhatsApp({
      location: pathname,
      page_path: pathname,
      service_name: "IV Add-Ons",
      cta_position: "addons_section",
      phone_type: "EG",
    });
  };

  const addons = [
    {
      name: t("addons.0.name"),
      desc: t("addons.0.desc"),
    },
    {
      name: t("addons.1.name"),
      desc: t("addons.1.desc"),
    },
    {
      name: t("addons.2.name"),
      desc: t("addons.2.desc"),
    },
    {
      name: t("addons.3.name"),
      desc: t("addons.3.desc"),
    },
    {
      name: t("addons.4.name"),
      desc: t("addons.4.desc"),
    },
  ];

  const encodedAddonsMsg = encodeURIComponent(t("addonsMsg"));

  return (
    <section className="py-20 lg:py-28 bg-[#FAF8F5] relative overflow-hidden border-t border-[#E2E8F0]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C8A96B]/15 border border-[#C8A96B]/30 text-[#8E7036] text-xs font-bold mb-3 uppercase tracking-wider">
            <PlusCircle className="w-3.5 h-3.5 text-[#C8A96B]" />
            <span>{t("addonsBadge")}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1E293B] tracking-tight mb-4">
            {t("addonsTitle")}
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
            {t("addonsSubtitle")}
          </p>
        </div>

        {/* Addons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {addons.map((addon, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#C8A96B]/60 transition-all duration-300 group flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#C8A96B]/20 flex items-center justify-center text-[#C8A96B] shrink-0 group-hover:scale-105 group-hover:bg-[#C8A96B] group-hover:text-white transition-all duration-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#1E293B] text-base font-serif mb-1 group-hover:text-[#8E7036] transition-colors">
                  {addon.name}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  {addon.desc}
                </p>
              </div>
            </div>
          ))}

          {/* Consultation Note Card in the 6th slot for visual balance */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#2A3F50] to-[#1E293B] text-white border border-slate-700/50 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#C8A96B] shrink-0">
              <ShieldPlus className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[#C8A96B] text-base font-serif mb-1">
                {t("consultationNotice")}
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                {t("consultationNoticeDesc")}
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href={`${CONTACT.whatsapp_url_eg}?text=${encodedAddonsMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleAddonsWhatsApp}
            className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-base px-8 py-4 rounded-2xl shadow-lg shadow-green-500/20 hover:shadow-green-500/35 hover:-translate-y-0.5 transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>{t("addonsCta")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
