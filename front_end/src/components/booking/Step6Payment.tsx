"use client";

import { useLocale, useTranslations } from "next-intl";
import { Check, ShieldCheck, Banknote, CreditCard, Building2, Smartphone } from "lucide-react";

interface Step6PaymentProps {
  selected: string;
  onSelect: (method: string) => void;
}

export function Step6Payment({ selected, onSelect }: Step6PaymentProps) {
  const t = useTranslations("Booking");
  const locale = useLocale();
  const isAr = locale === "ar";

  const methods = [
    {
      id: "cash",
      icon: Banknote,
      label: t("payCash"),
      subtitle: isAr ? "ادفع مباشرة عند وصولك للعيادة" : "Pay at reception upon arrival",
    },
    {
      id: "card",
      icon: CreditCard,
      label: t("payCard"),
      subtitle: isAr ? "دفع آمن بالبطاقة البنكية" : "Secure card payment at clinic",
    },
    {
      id: "insurance",
      icon: Building2,
      label: t("payInsurance"),
      subtitle: isAr ? "تغطية كاملة أو جزئية بالتأمين" : "Coverage via supported providers",
    },
    {
      id: "paymob",
      icon: Smartphone,
      label: t("payOnline"),
      subtitle: isAr ? "دفع إلكتروني فوري عبر بوابة Paymob" : "Instant online payment via Paymob",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
        {methods.map((m) => {
          const isSelected = selected === m.id;
          const MethodIcon = m.icon;

          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onSelect(m.id)}
              className={`group relative flex items-center gap-3 sm:gap-4 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border-2 text-left rtl:text-right transition-all duration-300 active:scale-[0.98] ${
                isSelected
                  ? "border-accent bg-accent/8 ring-2 ring-accent/30 shadow-md shadow-accent/10 translate-y-[-2px]"
                  : "border-accent/15 bg-white hover:border-accent/50 hover:shadow-lg hover:-translate-y-1"
              }`}
            >
              {/* Method Icon Box */}
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 ${
                  isSelected
                    ? "bg-accent text-white border-accent shadow-sm"
                    : "bg-beige/60 border-accent/20 text-primary group-hover:bg-accent/10"
                }`}
              >
                <MethodIcon size={18} className="sm:hidden" />
                <MethodIcon size={22} className="hidden sm:block" />
              </div>

              {/* Method Text */}
              <div className="flex-1 min-w-0">
                <h3 className="font-serif font-bold text-primary text-sm sm:text-base group-hover:text-accent transition-colors">
                  {m.label}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-foreground/70 mt-0.5 font-medium line-clamp-1">
                  {m.subtitle}
                </p>
              </div>

              {/* Checkmark Badge */}
              <div
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ml-auto rtl:ml-0 rtl:mr-auto ${
                  isSelected
                    ? "bg-accent text-white scale-110 shadow-md"
                    : "border-2 border-accent/30 bg-transparent group-hover:border-accent"
                }`}
              >
                {isSelected && <Check size={12} strokeWidth={3} className="sm:hidden" />}
                {isSelected && <Check size={14} strokeWidth={3} className="hidden sm:block" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Trust Security Banner */}
      <div className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/60 text-amber-900 text-xs font-medium">
        <ShieldCheck size={16} className="text-accent shrink-0" />
        <span>
          {isAr
            ? "دفع آمن ومحمي بأعلى معايير التشفير • تأكيد فوري للموعد"
            : "Encrypted 256-bit secure transaction • Instant appointment confirmation"}
        </span>
      </div>
    </div>
  );
}
