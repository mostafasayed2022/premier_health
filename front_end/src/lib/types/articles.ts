// ─── Articles — Domain Types ──────────────────────────────────────────────────
// Follows project pattern: `field` (English) + `field_ar` (Arabic)
// Backend: articles app

export interface ArticleCategory {
  id: number;
  name: string;
  name_ar: string;
  slug: string;
}

// ── Author — discriminated union ──────────────────────────────────────────────
export type ArticleAuthor =
  | { type: "plain"; name: string; name_ar: string }
  | {
      type: "doctor";
      id: number;
      name: string;
      name_ar: string;
      slug: string;
      avatar: string | null;
    };

// ── Article — List item ───────────────────────────────────────────────────────
export interface ArticleSummary {
  id: number;
  title: string;
  title_ar: string;
  slug: string;
  category: ArticleCategory | null;
  tags: string[];
  excerpt: string;
  excerpt_ar: string;
  coverImage: string;         // absolute URL
  author: ArticleAuthor;
  publishedAt: string;        // ISO 8601
  readingTimeMinutes: number;
}

// ── Article — Full detail (GET /api/articles/{slug}/) ─────────────────────────
export interface ArticleDetail extends ArticleSummary {
  content: string;            // pre-rendered HTML (rich text)
  content_ar: string;
  relatedArticles: ArticleSummary[];
  // SEO
  metaTitle: string | null;
  metaTitle_ar: string | null;
  metaDescription: string | null;
  metaDescription_ar: string | null;
  ogImage: string | null;
}

// ── Paginated response ─────────────────────────────────────────────────────────
export interface ArticlesPageContent {
  title: string;
  shortDescription: string;
  heroImage: string | null;
}

export interface ArticlesListResponse {
  page: ArticlesPageContent | null;
  count: number;
  next: string | null;
  previous: string | null;
  results: ArticleSummary[];
}

// ── Query params for GET /api/articles/ ───────────────────────────────────────
export interface ArticlesQueryParams {
  category?: string;          // category slug
  tag?: string;
  page?: number;
  page_size?: number;
}
