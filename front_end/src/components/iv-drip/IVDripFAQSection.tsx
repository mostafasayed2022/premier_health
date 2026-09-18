"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import type { IVDripFAQ } from "@/lib/types/iv-drip";

interface Props {
  faqs: IVDripFAQ[];
  locale: string;
}

export function IVDripFAQSection({ faqs, locale }: Props) {
  const t = useTranslations("IVDrip");
  const isAr = locale === "ar";
  const [openId, setOpenId] = useState<number | null>(null);

  const sorted = [...faqs].sort((a, b) => a.order - b.order);

  return (
    <section className="py-16 bg-beige">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <h2 className="text-3xl font-serif font-bold text-primary mb-10 text-center">
          {t("faqTitle")}
        </h2>

        <div className="flex flex-col gap-3">
          {sorted.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-accent/15 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-start rtl:text-end cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-primary text-sm md:text-base">
                    {isAr ? faq.question_ar : faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-accent shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 text-sm text-foreground/70 leading-relaxed border-t border-accent/10 pt-4">
                    {isAr ? faq.answer_ar : faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
