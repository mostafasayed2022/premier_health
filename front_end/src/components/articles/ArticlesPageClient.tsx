"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import type { ArticlesListResponse, ArticleSummary, ArticleCategory } from "@/lib/types/articles";
import { ArticlesHero } from "./ArticlesHero";
import { CategoryFilter } from "./CategoryFilter";
import { ArticleCard } from "./ArticleCard";

interface Props {
  initialData: ArticlesListResponse;
  categories?: ArticleCategory[];
  locale: string;
  initialCategory?: string;
  initialPage: number;
}

export function ArticlesPageClient({
  initialData,
  categories: propCategories,
  locale,
  initialCategory,
  initialPage,
}: Props) {
  const t = useTranslations("Articles");
  const router = useRouter();
  const pathname = usePathname();

  const [activeCategory, setActiveCategory] = useState(initialCategory ?? "");

  // Use provided categories or fallback to collecting from results
  const categories =
    propCategories && propCategories.length > 0
      ? propCategories
      : Array.from(
          new Map(
            initialData.results
              .filter((a) => a.category)
              .map((a) => [a.category!.slug, a.category!]),
          ).values(),
        );

  function handleCategoryChange(slug: string) {
    setActiveCategory(slug);
    const params = new URLSearchParams();
    if (slug) params.set("category", slug);
    router.push(`${pathname}?${params.toString()}` as any);
  }

  const articles: ArticleSummary[] = initialData.results;

  return (
    <>
      {initialData.page && <ArticlesHero page={initialData.page} />}

      {categories.length > 0 && (
        <CategoryFilter
          categories={categories}
          activeSlug={activeCategory}
          locale={locale}
          onChange={handleCategoryChange}
        />
      )}

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {articles.length === 0 ? (
            <p className="text-center text-foreground/50 py-20">{t("noArticles")}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} locale={locale} />
              ))}
            </div>
          )}

          {(initialData.next || initialData.previous) && (
            <div className="flex justify-center gap-4 mt-12">
              {initialData.previous && (
                <button
                  onClick={() =>
                    router.push(`${pathname}?page=${initialPage - 1}${activeCategory ? `&category=${activeCategory}` : ""}` as any)
                  }
                  className="px-6 py-2.5 rounded-full border border-accent/30 text-accent text-sm font-medium hover:bg-accent hover:text-white transition-colors"
                >
                  ←
                </button>
              )}
              {initialData.next && (
                <button
                  onClick={() =>
                    router.push(`${pathname}?page=${initialPage + 1}${activeCategory ? `&category=${activeCategory}` : ""}` as any)
                  }
                  className="px-6 py-2.5 rounded-full bg-accent text-white text-sm font-medium hover:bg-accent-light transition-colors"
                >
                  →
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
