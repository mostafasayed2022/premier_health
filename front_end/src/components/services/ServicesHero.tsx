"use client";

import { useTranslations } from "next-intl";
import { Sparkles, ShieldCheck } from "lucide-react";
import { PageHero } from "../shared/PageHero";
import { useServices } from "@/lib/api";

const DEFAULT_IMAGES = [
  "/Departments/iv_theapy.webp",
  "/Departments/Aesthetics.webp",
  "/Departments/dermatology.webp",
  "/Departments/body_medical.webp",
];

export function ServicesHero() {
  const t = useTranslations("Services");
  const { data: services = [] } = useServices();

  // Extract dynamic images uploaded/added for services
  const dynamicImages = services
    .map((service) => service.photo || service.image_url)
    .filter((img): img is string => Boolean(img && img.trim().length > 0));

  // Use dynamic images from services, with fallback defaults if none are uploaded
  const heroImages =
    dynamicImages.length > 0
      ? Array.from(new Set([...dynamicImages, ...DEFAULT_IMAGES])).slice(0, 8)
      : DEFAULT_IMAGES;

  return (
    <PageHero
      title={t("title")}
      subtitle={t("subtitle")}
      badge={{ text: t("premiumTreatments") }}
      images={heroImages}
      features={[
        {
          icon: <Sparkles size={14} className="text-[#C8A96B]" />,
          text: t("heroFeature1"),
        },
        {
          icon: <ShieldCheck size={14} className="text-emerald-400" />,
          text: t("heroFeature2"),
        },
      ]}
    />
  );
}
