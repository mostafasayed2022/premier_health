"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { Plus, Minus, Sparkles } from "lucide-react";

export default function FAQSection() {
  const t = useTranslations();
  const currentLocale = useLocale();
  const isAr = currentLocale === "ar";

  const [activeFaq, setActiveFaq] = React.useState<number | null>(null);

  const faqs = [
    {
      q: t("Faqs.q1"),
      a: t("Faqs.a1"),
    },
    {
      q: t("Faqs.q2"),
      a: t("Faqs.a2"),
    },
    {
      q: t("Faqs.q3"),
      a: t("Faqs.a3"),
    },
  ];

  return (
    <section className="luxury-container max-w-4xl">
      <div className="relative text-center mb-12 flex flex-col items-center gap-4">
        {/* Ambient backlight glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-24 bg-accent/10 rounded-full blur-[80px] pointer-events-none select-none" />

        <span className="relative z-10 text-accent text-[10px] uppercase tracking-[0.25em] font-bold bg-accent/5 border border-accent/30 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5">
          <Sparkles size={10} className="text-accent animate-pulse" />
          {t("Home.faqBadge")}
        </span>

        <h2 className="relative z-10 text-3xl md:text-5xl font-serif font-light text-primary tracking-tight leading-tight">
          {t("Home.faqTitle")}
        </h2>

        <p className="relative z-10 text-sm md:text-base text-foreground/80 leading-relaxed max-w-2xl font-medium">
          {t("Home.faqSubtitle")}
        </p>

        <div className="relative z-10 flex items-center gap-4 w-full justify-center mt-2">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-accent/50" />
          <div className="w-2 h-2 rotate-45 border border-accent/80 bg-white" />
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-accent/50" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {faqs.map((faq, idx) => {
          const isOpen = activeFaq === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-accent/10 overflow-hidden shadow-sm transition-all duration-300"
            >
              <button
                onClick={() => setActiveFaq(isOpen ? null : idx)}
                className="w-full flex items-center justify-between px-6 py-5 text-left rtl:text-right text-sm md:text-base font-serif font-bold text-primary hover:text-accent transition-colors focus:outline-none"
              >
                <span>{faq.q}</span>
                {isOpen ? (
                  <Minus size={16} className="text-accent shrink-0" />
                ) : (
                  <Plus size={16} className="text-accent shrink-0" />
                )}
              </button>
              {isOpen && (
                <div className="px-6 pb-5 text-xs md:text-sm text-foreground/95 leading-relaxed font-semibold border-t border-accent/5 pt-4 animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
