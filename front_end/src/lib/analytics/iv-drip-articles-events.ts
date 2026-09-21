import { pushDataLayer } from "./dataLayer";
import type {
  ViewIVDripParams,
  BookIVDripParams,
  ViewArticleParams,
} from "./types";

function getClientLocale(override?: string): string | undefined {
  if (override) return override;
  if (typeof window === "undefined") return undefined;
  const match = window.location.pathname.match(
    /^\/(en|ar|fr|de|es|it|tr|ru)(\/|$)/,
  );
  return match ? match[1] : undefined;
}

function getClientPathname(override?: string): string | undefined {
  if (override) return override;
  if (typeof window === "undefined") return undefined;
  return window.location.pathname;
}

/** Fire when an IV Drip detail page is viewed (NOT on card mount). */
export function trackViewIVDrip(params: ViewIVDripParams): void {
  pushDataLayer("view_iv_drip", {
    drip_id: params.drip_id,
    drip_name: params.drip_name,
    drip_slug: params.drip_slug,
    price: params.price,
    page_path: getClientPathname(params.page_path),
    locale: getClientLocale(params.locale),
  });
}

/** Fire when the user clicks the booking CTA on a drip detail page. */
export function trackBookIVDrip(params: BookIVDripParams): void {
  pushDataLayer("book_iv_drip", {
    drip_id: params.drip_id,
    drip_name: params.drip_name,
    drip_slug: params.drip_slug,
    price: params.price,
    booking_source: params.booking_source ?? "iv_drip_detail",
    utm_source: params.utm_source,
    utm_medium: params.utm_medium,
    utm_campaign: params.utm_campaign,
    utm_content: params.utm_content,
    utm_term: params.utm_term,
    page_path: getClientPathname(params.page_path),
    locale: getClientLocale(params.locale),
  });
}

/** Fire when an Article detail page is viewed. */
export function trackViewArticle(params: ViewArticleParams): void {
  pushDataLayer("view_article", {
    article_id: params.article_id,
    article_title: params.article_title,
    article_slug: params.article_slug,
    article_category: params.article_category,
    reading_time: params.reading_time,
    page_path: getClientPathname(params.page_path),
    locale: getClientLocale(params.locale),
  });
}
