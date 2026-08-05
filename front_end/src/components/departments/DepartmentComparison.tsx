"use client";

import { useTranslations } from "next-intl";

export function DepartmentComparison() {
  const t = useTranslations("DeptComparison");

  return (
    <section className="bg-beige py-16 rounded-3xl mt-8 border border-accent/5">
      <div className="luxury-container">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-serif text-primary mb-4">
              {t("title")}
            </h2>
            <div className="h-[2px] w-16 bg-accent mb-6" />
            <p className="text-sm text-foreground/80 leading-relaxed mb-4 font-medium">
              {t("desc1")}
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed font-medium">
              {t("desc2")}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                label: t("oralLabel"),
                pct: "30%",
                color: "bg-gray-200",
                desc: t("oralDesc"),
              },
              {
                label: t("ivLabel"),
                pct: "100%",
                color: "bg-accent",
                desc: t("ivDesc"),
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-accent/10 text-center shadow-sm hover:-translate-y-1 transition-transform"
              >
                <div className="text-4xl font-serif font-black text-primary mb-2">
                  {item.pct}
                </div>
                <div className={`h-2 w-full rounded-full mb-3 ${item.color} opacity-70`} />
                <p className="text-sm font-bold text-primary">{item.label}</p>
                <p className="text-xs text-foreground/50 mt-1 font-bold">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
