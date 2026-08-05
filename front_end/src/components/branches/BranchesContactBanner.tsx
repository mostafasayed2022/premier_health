"use client";

import { useLocale, useTranslations } from "next-intl";
import { Phone } from "lucide-react";

export function BranchesContactBanner() {
  const t = useTranslations("Branches");
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <section className="bg-beige/60 py-16 border-t border-accent/15">
      <div className="luxury-container text-center">
        <h2 className="text-3xl font-serif text-primary mb-4">
          {t("contactDirectly")}
        </h2>
        <div className="h-[2px] w-16 bg-accent mx-auto mb-8" />
        <div className="flex flex-wrap justify-center gap-6 text-sm text-foreground/80 font-bold">
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-accent" />
            <span className="font-mono text-primary">01200644663</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-accent" />
            <span className="font-mono text-primary">+971 50 120 0313</span>
          </div>
        </div>
      </div>
    </section>
  );
}
