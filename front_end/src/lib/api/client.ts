// ─── Axios Client Configuration & Interceptors ───────────────────────────────

import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://premiier.pythonanywhere.com/api/";

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
  const supported = ["en", "ar", "fr", "de", "es", "it", "tr"];
  const segment = window.location.pathname.split("/")[1];
  return supported.includes(segment) ? segment : "en";
}

// ─── Request Interceptor: Accept-Language + Bearer Token ─────────────────────

api.interceptors.request.use((config) => {
  // 1. Attach locale so Django returns translated content in base fields
  config.headers["Accept-Language"] = getActiveLocale();

  // 2. Attach auth token when available
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("patient_access") ||
        localStorage.getItem("admin_access") ||
        localStorage.getItem("access_token")
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
      if (typeof window !== "undefined") {
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
