import { api } from "./client";
import type { IVDripPageResponse, IVDripProductDetail } from "@/lib/types/iv-drip";
import type { ArticlesListResponse, ArticleDetail, ArticlesQueryParams, ArticleCategory } from "@/lib/types/articles";
const languageConfig = (locale?: string) => locale ? { headers: { "Accept-Language": locale } } : {};

// The dashboard database is the only source of editorial content.
// Empty results stay empty; API failures reach the page error boundary.
export async function fetchIVDripPage(locale?: string): Promise<IVDripPageResponse> {
  return (await api.get<IVDripPageResponse>("/iv-drip-therapy/", languageConfig(locale))).data;
}
export async function fetchIVDripProduct(slug: string, locale?: string): Promise<IVDripProductDetail> {
  return (await api.get<IVDripProductDetail>(`/iv-drip-therapy/${encodeURIComponent(slug)}/`, languageConfig(locale))).data;
}
export async function fetchArticles(params: ArticlesQueryParams = {}, locale?: string): Promise<ArticlesListResponse> {
  return (await api.get<ArticlesListResponse>("/articles/", { params, ...languageConfig(locale) })).data;
}
export async function fetchArticle(slug: string, locale?: string): Promise<ArticleDetail> {
  return (await api.get<ArticleDetail>(`/articles/${encodeURIComponent(slug)}/`, languageConfig(locale))).data;
}
export async function fetchArticleCategories(locale?: string): Promise<ArticleCategory[]> {
  return (await api.get<ArticleCategory[]>("/articles/categories/", languageConfig(locale))).data;
}

// ─── Slug Redirect ────────────────────────────────────────────────────

export type SlugContentType = "ivdripproduct" | "article";

export interface SlugRedirectResult {
  newSlug: string;
  contentType: SlugContentType;
}

/**
 * Check if an old slug has a 301 redirect registered.
 * Used by: middleware.ts
 * Returns null when no redirect exists (proceed normally).
 */
export async function checkSlugRedirect(
  oldSlug: string,
  contentType: SlugContentType,
): Promise<SlugRedirectResult | null> {
  try {
    const res = await api.get<SlugRedirectResult>("/slug-redirect/", {
      params: { old_slug: oldSlug, content_type: contentType },
    });
    return res.data;
  } catch {
    return null;
  }
}
