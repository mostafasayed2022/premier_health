"use client";

import { useTranslations } from "next-intl";
import { PageHero } from "../shared/PageHero";
import { HelpCircle } from "lucide-react";

export function FaqHero() {
  const t = useTranslations("Home");

  return (
    <PageHero
      title={t("faqTitle")}
      subtitle={t("faqSubtitle")}
      badge={{ text: t("faqTitle"), icon: <HelpCircle size={12} className="text-[#C8A96B]" /> }}
      images={["https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200"]}
    />
  );
}
