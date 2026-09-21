import { getTranslations } from "next-intl/server";
import type { IVDripProductSummary } from "@/lib/types/iv-drip";
import { IVProductCard } from "./IVProductCard";

interface Props {
  products: IVDripProductSummary[];
  locale: string;
}

export async function IVProductsGrid({ products, locale }: Props) {
  const t = await getTranslations({ locale, namespace: "IVDrip" });

  const sorted = [...products].sort((a, b) => {
    // Featured first, then by order
    if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
    return a.order - b.order;
  });

  return (
    <section className="py-20 bg-beige">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            {t("productsTitle")}
          </h2>
          <p className="text-foreground/70 max-w-xl mx-auto text-sm md:text-base">
            {t("productsSubtitle")}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {sorted.map((product) => (
            <IVProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
