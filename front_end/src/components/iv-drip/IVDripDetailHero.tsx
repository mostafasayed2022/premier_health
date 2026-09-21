"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Clock, ChevronDown, Sparkles, CalendarPlus } from "lucide-react";
import { trackBookIVDrip } from "@/lib/analytics/iv-drip-articles-events";
import { useAttribution } from "@/hooks/useAttribution";
import type { IVDripProductDetail } from "@/lib/types/iv-drip";
import { IVDripViewTracker } from "./IVDripViewTracker";

interface Props {
  drip: IVDripProductDetail;
  locale: string;
}

export function IVDripDetailHero({ drip, locale }: Props) {
  const t = useTranslations("IVDrip");
  const isAr = locale === "ar";
  const searchParams = useSearchParams();
  const attribution = useAttribution();

  // Active accordion section (first open by default)
  const [openSectionId, setOpenSectionId] = useState<string | null>("whoIsItFor");

  // Booking link with attribution parameters
  const utmParams = new URLSearchParams();
  const utmKeys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
  ] as const;
  utmKeys.forEach((key) => {
    const val = searchParams?.get(key) ?? (attribution as Record<string, string>)[key];
    if (val) utmParams.set(key, val);
  });
  utmParams.set("service", drip.slug);
  const bookingHref = `/book-appointment?${utmParams.toString()}`;

  function handleBookingClick() {
    trackBookIVDrip({
      drip_id: drip.id,
      drip_name: drip.name,
      drip_slug: drip.slug,
      price: drip.price,
      booking_source: "iv_drip_detail",
      utm_source: attribution.utm_source,
      utm_medium: attribution.utm_medium,
      utm_campaign: attribution.utm_campaign,
      utm_content: attribution.utm_content,
      utm_term: attribution.utm_term,
      locale,
    });
  }

  const sections = ["whoIsItFor", "howItHelps", "keyIngredients", "perfectPairings"] as const;
  const accordionSections = sections.filter((key) => drip[key]?.trim()).map((key) => ({ id: key, titleKey: key, content: drip[key] }));

  const productImage = drip.image;

  return (
    <section className="bg-white py-10 md:py-16 border-b border-neutral-100">
      {/* GTM view tracker (client) */}
      <IVDripViewTracker drip={drip} locale={locale} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-foreground/60 font-medium">
          <Link href="/" className="hover:text-primary transition-colors">
            {t("home")}
          </Link>
          <span className="text-foreground/30">/</span>
          <Link href="/iv-drip-therapy" className="hover:text-primary transition-colors">
            {t("pageTitle")}
          </Link>
          <span className="text-foreground/30">/</span>
          <span className="text-primary font-semibold truncate max-w-[200px] sm:max-w-none">
            {isAr ? drip.name_ar : drip.name}
          </span>
        </nav>

        {/* 2-Column Product Showcase Layout: Image side-by-side with Title & Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Standalone Product Card */}
          <div className="lg:col-span-5 w-full">
            <div className="relative w-full rounded-3xl bg-[#f4f5f7] border border-slate-200/60 p-8 sm:p-12 flex flex-col items-center justify-center min-h-[440px] sm:min-h-[500px] shadow-sm">
              {/* Featured Pill */}
              {drip.isFeatured && (
                <div className="absolute top-5 start-5 flex items-center gap-1.5 bg-accent text-white text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-sm">
                  <Sparkles size={12} />
                  <span>{t("featured")}</span>
                </div>
              )}

              {/* Physical Product Display with subtle shadow */}
              <div className="relative w-full h-[340px] sm:h-[400px] md:h-[440px] flex items-center justify-center">
                {productImage && <Image
                  src={productImage}
                  alt={isAr ? drip.name_ar : drip.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                />}
              </div>
            </div>
          </div>

          {/* Right Column: Title, Description, Specs, Accordion & Action Button */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Tagline / Category */}
            <span className="text-xs font-semibold tracking-widest uppercase text-accent mb-2 inline-block">
              Premier IV Therapy
            </span>

            {/* Product Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-primary tracking-tight mb-2 uppercase">
              {isAr ? drip.name_ar : drip.name}
            </h1>

            {/* Subtitle / Tagline */}
            <p className="text-primary/90 text-lg md:text-xl font-medium mb-4 leading-snug">
              {isAr ? drip.tagline_ar : drip.tagline}
            </p>

            {/* Short Description */}
            <p className="text-foreground/75 leading-relaxed text-sm md:text-base mb-6">
              {isAr ? drip.shortDescription_ar : drip.shortDescription}
            </p>

            {/* Specs pills: Price & Duration */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-primary font-serif font-bold text-base">
                {t("price", { price: drip.price })}
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                <Clock size={14} className="text-accent" />
                <span>{t("duration", { minutes: drip.durationMinutes })}</span>
              </span>
            </div>

            {/* Accordion Sections (Matching Screenshot Design) */}
            <div className="border-b border-slate-200/80">
              {accordionSections.map((section) => {
                const isOpen = openSectionId === section.id;
                return (
                  <div key={section.id} className="border-t border-slate-200/80">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenSectionId((curr) => (curr === section.id ? null : section.id))
                      }
                      className="w-full py-4 flex items-center justify-between text-start group transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="font-semibold text-primary text-base md:text-lg group-hover:text-accent transition-colors">
                        {t(section.titleKey)}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-primary/60 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-accent" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="pb-5 pt-1 text-sm md:text-base text-foreground/75 leading-relaxed animate-fade-in">
                        <p>{section.content}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* CTA Pill Button (Styled exactly like Reference Image) */}
            <div className="mt-8 flex justify-end rtl:justify-start">
              <Link
                href={bookingHref}
                onClick={handleBookingClick}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1b3a6b] hover:bg-[#152e55] text-white font-medium px-10 py-3.5 shadow-md hover:shadow-lg transition-all text-sm md:text-base hover:scale-[1.02] active:scale-[0.98]"
              >
                <CalendarPlus size={18} />
                <span>{t("bookNow")}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
