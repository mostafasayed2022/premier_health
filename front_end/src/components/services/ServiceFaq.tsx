"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ServiceData } from "./types";

interface ServiceFaqProps {
  service: ServiceData;
}

export function ServiceFaq({ service }: ServiceFaqProps) {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === "ar";
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!service.faq || service.faq.length === 0) return null;

  return (
    <section className="bg-beige/40 py-16 rounded-3xl mt-12 border border-accent/5">
      <div className="luxury-container max-w-3xl mx-auto">
        <h2 className="text-3xl font-serif text-primary mb-2 text-center">
          {t("Services.treatmentFaq")}
        </h2>
        <div className="h-[2px] w-16 bg-accent mx-auto mb-10" />

        <div className="flex flex-col gap-4">
          {service.faq.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-accent/10 overflow-hidden shadow-sm transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left rtl:text-right text-sm font-serif font-bold text-primary hover:text-accent transition-colors focus:outline-none"
              >
                <span>{isAr ? item.q_ar : item.q}</span>
                {openFaq === i ? (
                  <ChevronUp size={16} className="text-accent shrink-0" />
                ) : (
                  <ChevronDown size={16} className="text-accent shrink-0" />
                )}
              </button>
              {openFaq === i && (
                <div className="px-6 pb-5 text-xs text-foreground/85 leading-relaxed border-t border-accent/10 pt-4 font-medium bg-beige/5">
                  {isAr ? item.a_ar : item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
