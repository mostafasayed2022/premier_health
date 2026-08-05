"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { ServiceData } from "./types";

interface ServiceBenefitsProps {
  service: ServiceData;
}

export function ServiceBenefits({ service }: ServiceBenefitsProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const t = useTranslations("Services");

  const defaultBenefitsEn = [
    "Delivers visible, clinically proven outcomes with zero to minimal downtime.",
    "Customized therapy tailored specifically to your skin and health profile.",
    "Administered by certified medical experts under strict clinical protocols.",
    "Uses premium FDA-approved products and state-of-the-art technology.",
  ];

  const defaultBenefitsAr = [
    "نتائج ملحوظة ومثبتة سريرياً مع سرعة في التعافي وممارسة الحياة الطبيعية.",
    "علاج مخصص بدقة يناسب نوع بشرتك وحالتك الصحية الخاصة.",
    "يجرى بواسطة أطباء واستشاريين معتمدين وفق أعلى معايير السلامة.",
    "استخدام أحدث الأجهزة والمستحضرات المعتمدة عالمياً.",
  ];

  const rawList = isAr ? service?.benefits_ar : service?.benefits;
  const benefitsList =
    Array.isArray(rawList) && rawList.length > 0
      ? rawList
      : isAr
      ? defaultBenefitsAr
      : defaultBenefitsEn;

  return (
    <div>
      <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">
        {t("benefits") || (isAr ? "فوائد ومميزات العلاج" : "Key Treatment Benefits")}
      </h2>
      <div className="h-[2px] w-16 bg-[#C8A96B] mb-8" />
      <div className="flex flex-col gap-4">
        {benefitsList.map((benefit, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: isAr ? 15 : -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-4 bg-[#FAF7F2] rounded-2xl p-4 border border-[#C8A96B]/15"
          >
            <CheckCircle size={18} className="text-[#C8A96B] shrink-0" />
            <span className="text-sm text-slate-900 font-medium">{benefit}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
