import type { Metadata } from "next";
import { fetchArticles, fetchArticleCategories } from "@/lib/api/iv-drip-articles";
import { SITE_URL } from "@/lib/seo";
import { ArticlesPageClient } from "@/components/articles/ArticlesPageClient";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { page } = await fetchArticles({ page_size: 1 }, locale);

  return {
    title: page?.title,
    description: page?.shortDescription,
    alternates: { canonical: `${SITE_URL}/${locale}/articles` },
    openGraph: {
      title: page?.title,
      description: page?.shortDescription,
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
    }, locale),
    fetchArticleCategories(locale),
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
