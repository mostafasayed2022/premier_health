"use client";

import { useTranslations } from "next-intl";
import { Camera, Sparkles } from "lucide-react";
import { PageHero } from "../shared/PageHero";
import { useGallery } from "@/lib/api";

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1629909615957-be38d48fbbe4?auto=format&fit=crop&q=80&w=1600",
];

export function GalleryHero() {
  const t = useTranslations("Gallery");
  const { data: gallery = [] } = useGallery();

  // Extract admin uploaded gallery images
  const adminImages = gallery
    .map((g) => g.image || (g as any).image_url)
    .filter((img): img is string => Boolean(img && img.trim().length > 0));

  const heroImages =
    adminImages.length >= 1
      ? [...adminImages, ...DEFAULT_IMAGES.slice(adminImages.length)]
      : DEFAULT_IMAGES;

  return (
    <PageHero
      title={t("title")}
      subtitle={t("subtitle")}
      badge={{ text: t("heroBadge") }}
      images={heroImages}
      features={[
        {
          icon: <Camera size={14} className="text-[#C8A96B]" />,
          text: t("heroFeature1"),
        },
        {
          icon: <Sparkles size={14} className="text-emerald-400" />,
          text: t("heroFeature2"),
        },
      ]}
    />
  );
}
