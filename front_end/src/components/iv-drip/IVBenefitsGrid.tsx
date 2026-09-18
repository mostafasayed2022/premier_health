import { getTranslations } from "next-intl/server";
import type { IVBenefit } from "@/lib/types/iv-drip";

interface Props {
  benefits: IVBenefit[];
  locale: string;
}

export async function IVBenefitsGrid({ benefits, locale }: Props) {
  const t = await getTranslations({ locale, namespace: "IVDrip" });
  const isAr = locale === "ar";

  if (!benefits.length) return null;

  return (
    <section className="py-20 bg-beige">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            {t("benefitsTitle")}
          </h2>
          <p className="text-foreground/70 max-w-xl mx-auto text-sm md:text-base">
            {t("benefitsSubtitle")}
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits
            .sort((a, b) => a.order - b.order)
            .map((benefit) => (
              <div
                key={benefit.id}
                className="bg-white rounded-3xl p-8 border border-accent/15 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 card-gold-accent"
              >
                {/* Icon */}
                {benefit.icon && (
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-5 text-accent text-2xl">
                    {/* Supports emoji, icon name, or URL */}
                    {benefit.icon.startsWith("http") ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={benefit.icon}
                        alt=""
                        className="w-6 h-6 object-contain"
                      />
                    ) : (
                      <span>{benefit.icon}</span>
                    )}
                  </div>
                )}

                <h3 className="text-lg font-serif font-bold text-primary mb-2">
                  {isAr ? benefit.title_ar : benefit.title}
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {isAr ? benefit.description_ar : benefit.description}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
