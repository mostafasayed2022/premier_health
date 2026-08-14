"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Star, MessageSquare } from "lucide-react";
import { PageHero } from "../shared/PageHero";
import { getTestimonials } from "@/lib/api";

const DEFAULT_IMAGES = [
  "/hero/hero1.webp",
  "/hero/hero2.webp",
  "/hero/hero3.webp",
  "/hero/hero4.webp",
];

export function TestimonialsHero() {
  const t = useTranslations("Testimonials");
  const [heroImages, setHeroImages] = useState<string[]>(DEFAULT_IMAGES);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const data = await getTestimonials();
        const adminImages = (data || [])
          .map((item) => item.image_url)
          .filter((img): img is string => Boolean(img && img.trim().length > 0));

        if (adminImages.length >= 1) {
          setHeroImages([
            ...adminImages,
            ...DEFAULT_IMAGES.slice(adminImages.length),
          ]);
        }
      } catch (err) {
        console.error("Failed to load testimonial images:", err);
      }
    }
    loadTestimonials();
  }, []);

  return (
    <PageHero
      title={t("title")}
      subtitle={t("subtitle")}
      badge={{ text: t("heroBadge") }}
      images={heroImages}
      features={[
        {
          icon: <Star size={14} className="text-[#C8A96B]" fill="#C8A96B" />,
          text: t("heroFeature1"),
        },
        {
          icon: <MessageSquare size={14} className="text-emerald-400" />,
          text: t("heroFeature2"),
        },
      ]}
    />
  );
}
