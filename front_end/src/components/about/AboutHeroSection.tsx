"use client";

import { useLocale, useTranslations } from "next-intl";
import { ShieldCheck, Award } from "lucide-react";
import { PageHero } from "../shared/PageHero";

export function AboutHeroSection() {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === "ar";

  const images = [
    "/AboutPreview/about_slider1.webp",
    "/AboutPreview/about_slider2.webp",
    "/AboutPreview/about_slider3.webp",
    "/AboutPreview/about.webp",
  ];

  return (
    <PageHero
      title={t("About.title")}
      subtitle={t("About.desc")}
      badge={{ text: t("About.heritage") }}
      images={images}
      features={[
        {
          icon: <Award size={14} className="text-[#C8A96B]" />,
          text: isAr ? "تاريخ طبي عريق" : "Heritage of Medical Care",
        },
        {
          icon: <ShieldCheck size={14} className="text-emerald-400" />,
          text: isAr ? "استشاريون معتمدون عالمياً" : "World-Class Specialists",
        },
      ]}
    />
  );
}
