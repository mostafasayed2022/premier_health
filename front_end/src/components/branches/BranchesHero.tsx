"use client";

import { useTranslations } from "next-intl";
import { MapPin, Clock } from "lucide-react";
import { PageHero } from "../shared/PageHero";
import { useBranches } from "@/lib/api";

const DEFAULT_IMAGES = [
  "/hero/hero1.webp",
  "/hero/hero2.webp",
  "/hero/hero3.webp",
  "/hero/hero4.webp",
];

export function BranchesHero() {
  const t = useTranslations("Branches");
  const { data: branches = [] } = useBranches();

  // Extract admin uploaded branch images
  const adminImages = branches
    .map((b) => b.image_url || b.photo)
    .filter((img): img is string => Boolean(img && img.trim().length > 0));

  // Combine admin images with fallback defaults if fewer than 2 images uploaded
  const heroImages =
    adminImages.length >= 1
      ? [...adminImages, ...DEFAULT_IMAGES.slice(adminImages.length)]
      : DEFAULT_IMAGES;

  return (
    <PageHero
      title={t("ourBranches")}
      subtitle={t("subtitle")}
      badge={{ text: t("ourLocations") }}
      images={heroImages}
      features={[
        {
          icon: <MapPin size={14} className="text-[#C8A96B]" />,
          text: t("heroFeature1"),
        },
        {
          icon: <Clock size={14} className="text-emerald-400" />,
          text: t("heroFeature2"),
        },
      ]}
    />
  );
}
