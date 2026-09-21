import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";
import type { ArticleDetail } from "@/lib/types/articles";

interface Props {
  article: ArticleDetail;
  locale: string;
}

export async function ArticleBody({ article, locale }: Props) {
  const t = await getTranslations({ locale, namespace: "Articles" });
  const isAr = locale === "ar";
  const html = isAr ? article.content_ar : article.content;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Back link */}
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-sm text-accent hover:text-primary transition-colors mb-10"
        >
          <ArrowLeft size={15} className="rtl:rotate-180" />
          {t("backToArticles")}
        </Link>

        {/* Rich text */}
        <div
          className="prose prose-lg max-w-none
            prose-headings:font-serif prose-headings:text-primary
            prose-p:text-foreground/75 prose-p:leading-relaxed
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            prose-strong:text-primary
            prose-blockquote:border-accent prose-blockquote:text-foreground/60
            prose-li:text-foreground/75"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </section>
  );
}
