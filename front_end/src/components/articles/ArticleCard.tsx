"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Clock, ArrowRight } from "lucide-react";
import { getOptimizedImageUrl } from "@/lib/utils/image";
import type { ArticleSummary, ArticleAuthor } from "@/lib/types/articles";

interface Props {
  article: ArticleSummary;
  locale: string;
}

function getAuthorName(author: ArticleAuthor, isAr: boolean): string {
  if (author.type === "plain") return isAr ? author.name_ar : author.name;
  return isAr ? author.name_ar : author.name;
}

export function ArticleCard({ article, locale }: Props) {
  const t = useTranslations("Articles");
  const isAr = locale === "ar";

  const imageUrl = getOptimizedImageUrl(article.coverImage || "/backgrounds/background2.webp", 600, 75);

  let publishDate = "";
  try {
    const rawDate =
      article.publishedAt ||
      (article as any).published_at ||
      (article as any).date;
    if (rawDate) {
      publishDate = new Date(rawDate).toLocaleDateString(
        isAr ? "ar-EG" : "en-US",
        { year: "numeric", month: "short", day: "numeric" }
      );
    }
  } catch {
    publishDate = "";
  }

  return (
    <Link href={`/articles/${article.slug}`} className="group block h-full">
      <div className="h-full bg-white rounded-3xl border border-accent/20 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden card-gold-accent">
        {/* Cover image */}
        <div className="relative h-52 w-full overflow-hidden bg-beige">
          <Image
            src={imageUrl}
            alt={isAr ? article.title_ar : article.title}
            fill
            quality={75}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />

          {/* Category badge */}
          {article.category && (
            <div className="absolute bottom-3 start-3 bg-primary/70 backdrop-blur-sm text-white text-[10px] font-semibold rounded-full px-3 py-1 border border-white/10">
              {isAr ? article.category.name_ar : article.category.name}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col justify-between gap-4">
          <div>
            <h3 className="text-xl font-serif font-bold text-primary group-hover:text-accent transition-colors mb-2 line-clamp-2">
              {isAr ? article.title_ar : article.title}
            </h3>
            <p className="text-xs text-foreground/65 leading-relaxed line-clamp-3">
              {isAr ? article.excerpt_ar : article.excerpt}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-accent/10">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-foreground/50">
                {t("by")} {getAuthorName(article.author, isAr)}
              </span>
              <div className="flex items-center gap-2 text-[10px] text-foreground/50">
                <Clock size={11} />
                <span>{t("readingTime", { minutes: article.readingTimeMinutes })}</span>
                {publishDate && (
                  <>
                    <span>·</span>
                    <span>{publishDate}</span>
                  </>
                )}
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors duration-300 shrink-0">
              <ArrowRight
                size={15}
                className="text-accent group-hover:text-white rtl:rotate-180 transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
