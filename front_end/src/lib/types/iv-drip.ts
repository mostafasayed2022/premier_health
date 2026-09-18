// ─── IV Drip Therapy — Domain Types ──────────────────────────────────────────
// Follows project pattern: `field` (English) + `field_ar` (Arabic)
// Backend: django-modeltranslation on iv_therapy app

// ── Page-level singleton (GET /api/iv-drip-therapy/) ─────────────────────────
export interface IVDripPageContent {
  heroImage: string;          // absolute URL
  title: string;
  title_ar: string;
  shortDescription: string;
  shortDescription_ar: string;
}

// ── "What are the benefits?" section ─────────────────────────────────────────
export interface IVBenefit {
  id: number;
  icon: string;               // icon name or URL
  title: string;
  title_ar: string;
  description: string;
  description_ar: string;
  order: number;
}

// ── "How is it administered?" section ────────────────────────────────────────
export interface IVAdministrationStep {
  id: number;
  stepNumber: number;
  title: string;
  title_ar: string;
  description: string;
  description_ar: string;
  icon: string | null;
}

// ── Product (Drip) — List item ────────────────────────────────────────────────
export interface IVDripProductSummary {
  id: number;
  name: string;
  name_ar: string;
  slug: string;
  tagline: string;
  tagline_ar: string;
  shortDescription: string;
  shortDescription_ar: string;
  image: string;              // absolute URL
  price: string;              // decimal as string e.g. "350.00"
  durationMinutes: number;
  isFeatured: boolean;
  order: number;
}

// ── Product (Drip) — Full detail (GET /api/iv-drip-therapy/{slug}/) ───────────
export interface IVDripProductDetail extends IVDripProductSummary {
  fullDescription: string;    // pre-rendered HTML (rich text)
  fullDescription_ar: string;
  faqs: IVDripFAQ[];
  // SEO
  metaTitle: string | null;
  metaTitle_ar: string | null;
  metaDescription: string | null;
  metaDescription_ar: string | null;
  ogImage: string | null;
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
export interface IVDripFAQ {
  id: number;
  question: string;
  question_ar: string;
  answer: string;
  answer_ar: string;
  order: number;
}

// ── Full API response — main page ─────────────────────────────────────────────
export interface IVDripPageResponse {
  page: IVDripPageContent;
  benefits: IVBenefit[];
  administrationSteps: IVAdministrationStep[];
  products: IVDripProductSummary[];
}
