import { getTranslations } from "next-intl/server";
import type { ArticleSummary } from "@/lib/types/articles";
import { ArticleCard } from "./ArticleCard";

interface Props {
  articles: ArticleSummary[];
  locale: string;
}

export async function RelatedArticles({ articles, locale }: Props) {
  const t = await getTranslations({ locale, namespace: "Articles" });

  return (
    <section className="py-16 bg-beige">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-10">
          {t("relatedTitle")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard key={article.id} article={article} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
