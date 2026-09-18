"use client";

import { useTranslations } from "next-intl";
import type { ArticleCategory } from "@/lib/types/articles";

interface Props {
  categories: ArticleCategory[];
  activeSlug: string;
  locale: string;
  onChange: (slug: string) => void;
}

export function CategoryFilter({ categories, activeSlug, locale, onChange }: Props) {
  const t = useTranslations("Articles");
  const isAr = locale === "ar";

  return (
    <section className="bg-beige border-b border-accent/10 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
          {/* "All" pill */}
          <button
            onClick={() => onChange("")}
            className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeSlug === ""
                ? "bg-primary text-white shadow"
                : "bg-white text-foreground/70 border border-accent/20 hover:border-accent/50 hover:text-primary"
            }`}
          >
            {t("allCategories")}
          </button>

          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => onChange(cat.slug)}
              className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeSlug === cat.slug
                  ? "bg-primary text-white shadow"
                  : "bg-white text-foreground/70 border border-accent/20 hover:border-accent/50 hover:text-primary"
              }`}
            >
              {isAr ? cat.name_ar : cat.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
