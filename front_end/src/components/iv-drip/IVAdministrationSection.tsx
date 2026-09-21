import { getTranslations } from "next-intl/server";
import type { IVAdministrationStep } from "@/lib/types/iv-drip";

interface Props {
  steps: IVAdministrationStep[];
  locale: string;
}

export async function IVAdministrationSection({ steps, locale }: Props) {
  const t = await getTranslations({ locale, namespace: "IVDrip" });
  const isAr = locale === "ar";

  if (!steps.length) return null;

  const sorted = [...steps].sort((a, b) => a.stepNumber - b.stepNumber);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            {t("administrationTitle")}
          </h2>
          <p className="text-foreground/70 max-w-xl mx-auto text-sm md:text-base">
            {t("administrationSubtitle")}
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-accent/20 mx-20" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {sorted.map((step, idx) => (
              <div key={step.id} className="relative flex flex-col items-center text-center">
                {/* Step number bubble */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-6 shadow-lg border-4 border-white">
                  {step.icon ? (
                    <span className="text-2xl text-white">{step.icon}</span>
                  ) : (
                    <span className="text-xl font-serif font-bold text-white">
                      {step.stepNumber}
                    </span>
                  )}
                </div>

                {/* Connector arrow (mobile) */}
                {idx < sorted.length - 1 && (
                  <div className="lg:hidden text-accent/40 text-2xl mb-4">
                    {isAr ? "↑" : "↓"}
                  </div>
                )}

                <h3 className="text-base font-serif font-bold text-primary mb-2">
                  {isAr ? step.title_ar : step.title}
                </h3>
                <p className="text-sm text-foreground/65 leading-relaxed">
                  {isAr ? step.description_ar : step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
