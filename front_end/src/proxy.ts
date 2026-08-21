import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { type NextRequest, NextResponse } from "next/server";

// ─── i18n middleware (handles locale prefixes) ────────────────────────────────
const intlMiddleware = createMiddleware(routing);

// ─── Cookie keys (must match auth.ts COOKIE_KEYS) ────────────────────────────
const COOKIE_PATIENT = "patient_access";
const COOKIE_ADMIN = "admin_access";

// ─── Edge-safe JWT role decoder ───────────────────────────────────────────────
function decodeRole(token: string): string | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    if (payload.exp && Date.now() / 1000 > payload.exp) return null;
    const role = (payload.role as string | undefined)?.toLowerCase();
    if (role === "admin" || role === "doctor" || role === "patient")
      return role;
    return null;
  } catch {
    return null;
  }
}

function getRoleFromCookies(request: NextRequest): string | null {
  const adminToken = request.cookies.get(COOKIE_ADMIN)?.value;
  if (adminToken) {
    const r = decodeRole(adminToken);
    if (r) return r;
  }
  const patientToken = request.cookies.get(COOKIE_PATIENT)?.value;
  if (patientToken) {
    const r = decodeRole(patientToken);
    if (r) return r;
  }
  return null;
}

// ─── Middleware ───────────────────────────────────────────────────────────────

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect localized admin and dashboard routes to non-localized ones
  const localePrefixRegex = /^\/(en|ar|fr|de|es|it|tr)(\/(admin|dashboard).*)$/;
  const match = pathname.match(localePrefixRegex);
  if (match) {
    return NextResponse.redirect(new URL(match[2], request.url));
  }

  // ── /admin/* — completely outside next-intl (no locale prefix) ─────────────
  if (pathname.startsWith("/admin")) {
    // /admin/login is always public
    if (pathname.startsWith("/admin/login")) return NextResponse.next();

    const role = getRoleFromCookies(request);
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return NextResponse.next();
  }

  // ── /dashboard/* — outside next-intl (no locale prefix) ─────────────
  if (pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  // ── /gcc/* — standalone landing pages, bypass next-intl entirely ───────────
  // These pages have their own layout with lang="ar" dir="rtl" and do not
  // use next-intl providers. Do not add a locale prefix to these routes.
  if (pathname.startsWith("/gcc/")) {
    return NextResponse.next();
  }

  // ── Everything else → next-intl adds locale prefix ─────────────────────────
  return intlMiddleware(request);
}

export const config = {
  // IMPORTANT: /admin, /dashboard, and /gcc are deliberately excluded from the
  // catch-all so next-intl never tries to locale-prefix them.
  matcher: [
    "/",
    "/(en|ar|fr|de|es|it|tr)/:path*",
    "/((?!api|_next|_vercel|admin|dashboard|gcc|.*\\..*).*)",
  ],
};
