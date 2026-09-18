"use client";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import { CalendarPlus } from "lucide-react";
import { trackBookIVDrip } from "@/lib/analytics/iv-drip-articles-events";
import { useAttribution } from "@/hooks/useAttribution";
import type { IVDripProductDetail } from "@/lib/types/iv-drip";

interface Props {
  drip: IVDripProductDetail;
  locale: string;
}

export function IVDripBookingCTA({ drip, locale }: Props) {
  const t = useTranslations("IVDrip");
  const isAr = locale === "ar";
  const searchParams = useSearchParams();
  const attribution = useAttribution();

  // Forward all current UTM params to the booking page
  const utmParams = new URLSearchParams();
  const utmKeys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
  ] as const;
  utmKeys.forEach((key) => {
    const val = searchParams.get(key) ?? (attribution as Record<string, string>)[key];
    if (val) utmParams.set(key, val);
  });
  // Pre-fill drip service in booking wizard
  utmParams.set("service", drip.slug);

  const bookingHref = `/book-appointment?${utmParams.toString()}`;

  function handleClick() {
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

  return (
    <section className="py-16 bg-primary">
      <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
          {isAr ? drip.name_ar : drip.name}
        </h2>
        <p className="text-white/70 text-base mb-8 max-w-lg mx-auto">
          {isAr ? drip.tagline_ar : drip.tagline}
        </p>
        <p className="text-3xl font-serif font-bold text-accent mb-10">
          {t("price", { price: drip.price })}
        </p>
        <Link
          href={bookingHref as any}
          onClick={handleClick}
          className="inline-flex items-center gap-3 bg-accent hover:bg-accent-light text-white font-semibold px-10 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 text-base"
        >
          <CalendarPlus size={20} />
          {t("bookNow")}
        </Link>
      </div>
    </section>
  );
}
