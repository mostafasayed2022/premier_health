"use client";

// ─── IVMedicalDisclaimer.tsx ────────────────────────────────────────────────
// Compliance & Medical Disclaimer notice adhering to healthcare content safety standards.

import { useTranslations } from "next-intl";
import { Info } from "lucide-react";

export function IVMedicalDisclaimer() {
  const t = useTranslations("IVPackages");

  return (
    <section className="py-10 bg-[#FAF8F5] border-t border-[#E2E8F0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-start gap-3.5 p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm text-xs text-[#64748B] leading-relaxed">
          <Info className="w-5 h-5 text-[#C8A96B] shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-[#1E293B] mb-1">
              {t("disclaimerTitle")}
            </h4>
            <p>{t("disclaimerText")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
