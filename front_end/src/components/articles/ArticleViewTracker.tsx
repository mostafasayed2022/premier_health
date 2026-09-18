"use client";

import { useEffect } from "react";
import { trackViewArticle } from "@/lib/analytics/iv-drip-articles-events";
import type { ArticleDetail } from "@/lib/types/articles";

interface Props {
  article: ArticleDetail;
  locale: string;
}

/** Fires the GTM view_article event once on mount. Zero UI output. */
export function ArticleViewTracker({ article, locale }: Props) {
  useEffect(() => {
    trackViewArticle({
      article_id: article.id,
      article_title: article.title,
      article_slug: article.slug,
      article_category: article.category?.slug,
      reading_time: article.readingTimeMinutes,
      locale,
    });
  }, [article.id, article.title, article.slug, article.category, article.readingTimeMinutes, locale]);

  return null;
}
