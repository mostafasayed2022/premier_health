import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { fetchArticles, fetchArticleCategories } from "@/lib/api/iv-drip-articles";
import { SITE_URL } from "@/lib/seo";
import { ArticlesPageClient } from "@/components/articles/ArticlesPageClient";

export const revalidate = 60;

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Articles" });

  return {
    title: t("pageTitle"),
    description: t("pageSubtitle"),
    alternates: { canonical: `${SITE_URL}/${locale}/articles` },
    openGraph: {
      title: t("pageTitle"),
      description: t("pageSubtitle"),
      url: `${SITE_URL}/${locale}/articles`,
    },
  };
}

export default async function ArticlesPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { category, page } = await searchParams;

  const [data, categories] = await Promise.all([
    fetchArticles({
      category,
      page: page ? parseInt(page, 10) : 1,
      page_size: 12,
    }),
    fetchArticleCategories(),
  ]);

  return (
    <main>
      <ArticlesPageClient
        initialData={data}
        categories={categories}
        locale={locale}
        initialCategory={category}
        initialPage={page ? parseInt(page, 10) : 1}
      />
    </main>
  );
}
