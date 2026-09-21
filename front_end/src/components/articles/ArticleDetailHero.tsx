import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Clock, CalendarDays } from "lucide-react";
import { Link } from "@/i18n/routing";
import type { ArticleDetail, ArticleAuthor } from "@/lib/types/articles";

interface Props {
  article: ArticleDetail;
  locale: string;
}

function getAuthorName(author: ArticleAuthor, isAr: boolean): string {
  if (author.type === "plain") return isAr ? author.name_ar : author.name;
  return isAr ? author.name_ar : author.name;
}

function getAuthorHref(author: ArticleAuthor): string | null {
  if (author.type === "doctor") return `/doctors/${author.slug}`;
  return null;
}

export async function ArticleDetailHero({ article, locale }: Props) {
  const t = await getTranslations({ locale, namespace: "Articles" });
  const isAr = locale === "ar";

  let publishDate = "";
  try {
    const rawDate = article.publishedAt || (article as any).published_at || (article as any).date;
    if (rawDate) {
      publishDate = new Date(rawDate).toLocaleDateString(
        isAr ? "ar-EG" : "en-US",
        { year: "numeric", month: "long", day: "numeric" }
      );
    }
  } catch {
    publishDate = "";
  }

  const authorName = getAuthorName(article.author, isAr);
  const authorHref = getAuthorHref(article.author);

  return (
    <section className="relative overflow-hidden bg-slate-950">
      {/* Cover image - Clearly visible */}
      {article.coverImage && <Image
        src={article.coverImage}
        alt={isAr ? article.title_ar : article.title}
        fill
        priority
        quality={90}
        className="object-cover opacity-85"
      />}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/60 to-slate-950/90 z-[1]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 py-20 md:py-28">
        {/* Category */}
        {article.category && (
          <div className="mb-5">
            <span className="inline-block text-xs uppercase tracking-widest text-accent font-semibold border border-accent/40 rounded-full px-4 py-1.5">
              {isAr ? article.category.name_ar : article.category.name}
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight mb-6">
          {isAr ? article.title_ar : article.title}
        </h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-5 text-sm text-white/60">
          {/* Author */}
          <div className="flex items-center gap-2">
            {article.author.type === "doctor" && article.author.avatar && (
              <Image
                src={article.author.avatar}
                alt={authorName}
                width={28}
                height={28}
                className="rounded-full object-cover border border-white/20"
              />
            )}
            <span>
              {t("by")}{" "}
              {authorHref ? (
                <Link href={authorHref as any} className="text-accent hover:underline">
                  {authorName}
                </Link>
              ) : (
                <span className="text-white/80">{authorName}</span>
              )}
            </span>
          </div>

          {/* Date */}
          {publishDate && (
            <div className="flex items-center gap-1.5">
              <CalendarDays size={14} />
              <span>{t("publishedOn", { date: publishDate })}</span>
            </div>
          )}

          {/* Reading time */}
          <div className="flex items-center gap-1.5">
            <Clock size={14} />
            <span>{t("readingTime", { minutes: article.readingTimeMinutes })}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
