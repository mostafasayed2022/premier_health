// ─── Axios Client Configuration & Interceptors ───────────────────────────────

import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000/api/";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

// ─── Locale Detector ─────────────────────────────────────────────────────────

/**
 * Reads the active locale from the URL path (e.g. /ar/booking → "ar").
 * next-intl always prefixes the locale: localePrefix: "always"
 * Falls back to "en" when running server-side or on an unknown path.
 */
function getActiveLocale(): string {
  if (typeof window === "undefined") return "en";
  const supported = ["en", "ar", "fr", "de", "es", "it", "tr", "ru"];
  if (window.location.pathname.startsWith("/gcc/")) return "ar";
  const segment = window.location.pathname.split("/")[1];
  return supported.includes(segment) ? segment : "en";
}

// ─── Request Interceptor: Accept-Language + Bearer Token ─────────────────────

api.interceptors.request.use((config) => {
  // 1. Prevent duplicate /api/ in URL when baseURL already ends with /api
  if (config.url) {
    const rawBase = (config.baseURL || API_BASE_URL || "")
      .trim()
      .replace(/\/+$/, "");
    let cleanUrl = config.url.replace(/^\/+/, "");
    if (rawBase.endsWith("/api") && cleanUrl.startsWith("api/")) {
      config.url = cleanUrl.substring(4);
    }
  }

  // 2. Attach locale so Django returns translated content in base fields
  if (!config.headers["Accept-Language"]) config.headers["Accept-Language"] = getActiveLocale();

  // 3. Attach auth token when available
  const token =
    typeof window !== "undefined"
      ? (/^\/(admin|dashboard)(\/|$)/.test(window.location.pathname)
        ? localStorage.getItem("admin_access")
        : localStorage.getItem("patient_access"))
      : null;
  if (
    token &&
    token !== "undefined" &&
    token !== "null" &&
    token.trim() !== ""
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── Response Interceptor: Handle 401 Unauthorized ───────────────────────────

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined" && !/^\/(admin|dashboard)(\/|$)/.test(window.location.pathname)) {
        localStorage.removeItem("patient_access");
        localStorage.removeItem("patient_refresh");
        localStorage.removeItem("patient_user");
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

// Axios configuration سليم

// Interceptors نظيفة

// Token handling كويس
