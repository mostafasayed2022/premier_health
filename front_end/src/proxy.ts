import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

// next-intl middleware handles locale detection + prefix routing
const intlMiddleware = createIntlMiddleware(routing);

// Supported locales (must match routing.ts)
const LOCALES = ["en", "ar", "fr", "de", "es", "it", "tr", "ru"];

// Routes that need slug-redirect checks
const SLUG_REDIRECT_PATTERNS = [
  {
    // /[locale]/iv-drip-therapy/[slug]
    regex: /^\/([a-z]{2})\/iv-drip-therapy\/([^/]+)$/,
    contentType: "ivdripproduct" as const,
    basePath: "iv-drip-therapy",
  },
  {
    // /[locale]/articles/[slug]
    regex: /^\/([a-z]{2})\/articles\/([^/]+)$/,
    contentType: "article" as const,
    basePath: "articles",
  },
];

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // ── Slug redirect check ────────────────────────────────────────────────────
  for (const pattern of SLUG_REDIRECT_PATTERNS) {
    const match = pathname.match(pattern.regex);
    if (!match) continue;

    const [, locale, slug] = match;
    if (!LOCALES.includes(locale)) continue;

    try {
      const apiBase =
        process.env.NEXT_PUBLIC_API_URL ||
        "https://api.premierhealthclinics.com/api/";

      const res = await fetch(
        `${apiBase}slug-redirect/?old_slug=${encodeURIComponent(slug)}&content_type=${pattern.contentType}`,
        {
          headers: { "Accept-Language": locale },
          next: { revalidate: 3600 }, // cache redirect lookups for 1h
        }
      );

      if (res.ok) {
        const data = await res.json();
        if (data?.newSlug && data.newSlug !== slug) {
          // Build redirect URL, preserving all query params (UTM etc.)
          const redirectUrl = new URL(
            `/${locale}/${pattern.basePath}/${data.newSlug}${search}`,
            request.url
          );
          return NextResponse.redirect(redirectUrl, { status: 301 });
        }
      }
    } catch {
      // Network/parse error → proceed normally, don't crash
    }
    break; // Only one pattern can match
  }

  // ── next-intl handles everything else (locale detection, prefix) ───────────
  return intlMiddleware(request);
}

export const proxy = middleware;
export default middleware;

export const config = {
  matcher: [
    // Match all paths except Next.js internals and static files
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
