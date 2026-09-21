import type { Metadata } from "next";
import { isAxiosError } from "axios";
import { notFound } from "next/navigation";
import { fetchArticle } from "@/lib/api/iv-drip-articles";
import { SITE_URL } from "@/lib/seo";
import { ArticleDetailHero } from "@/components/articles/ArticleDetailHero";
import { ArticleBody } from "@/components/articles/ArticleBody";
import { RelatedArticles } from "@/components/articles/RelatedArticles";
import { ArticleViewTracker } from "@/components/articles/ArticleViewTracker";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string; slug: string }> };


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const isAr = locale === "ar";

  try {
    const article = await fetchArticle(slug, locale);
    const title = isAr
      ? (article.metaTitle_ar ?? article.title_ar)
      : (article.metaTitle ?? article.title);
    const description = isAr
      ? (article.metaDescription_ar ?? article.excerpt_ar)
      : (article.metaDescription ?? article.excerpt);

    return {
      title: title || "Article | Premier Health Clinics",
      description: description || "",
      alternates: { canonical: `${SITE_URL}/${locale}/articles/${slug}` },
      openGraph: {
        title: title || "Article | Premier Health Clinics",
        description: description || "",
        url: `${SITE_URL}/${locale}/articles/${slug}`,
        images: article.ogImage
          ? [{ url: article.ogImage }]
          : article.coverImage
            ? [{ url: article.coverImage }]
            : [],
      },
    };
  } catch {
    return {};
  }
}

export default async function ArticleDetailPage({ params }: Props) {
  const { locale, slug } = await params;

  let article;
  try {
    article = await fetchArticle(slug, locale);
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) notFound();
    throw error;
  }

  return (
    <main>
      {/* GTM tracker */}
      <ArticleViewTracker article={article} locale={locale} />

      {/* Hero — cover, title, author, date, reading time */}
      <ArticleDetailHero article={article} locale={locale} />

      {/* Rich-text body */}
      <ArticleBody article={article} locale={locale} />

      {/* Related articles */}
      {article.relatedArticles && article.relatedArticles.length > 0 && (
        <RelatedArticles articles={article.relatedArticles} locale={locale} />
      )}
    </main>
  );
}
