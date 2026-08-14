"use client";

import { useTranslations } from "next-intl";
import { Stethoscope, Sparkles } from "lucide-react";
import { PageHero } from "../shared/PageHero";

export function DepartmentsHero() {
  const t = useTranslations("Departments");

  const images = [
    "/Treatments/Bariatric.webp",
    "/Treatments/Detox.webp",
    "/Treatments/myers.webp",
    "/Treatments/nad.webp",
  ];

  return (
    <PageHero
      title={t("title")}
      subtitle={t("subtitle")}
      badge={{ text: t("specialties") }}
      images={images}
      features={[
        {
          icon: <Stethoscope size={14} className="text-[#C8A96B]" />,
          text: t("deptHeroFeature1"),
        },
        {
          icon: <Sparkles size={14} className="text-emerald-400" />,
          text: t("deptHeroFeature2"),
        },
      ]}
    />
  );
}
