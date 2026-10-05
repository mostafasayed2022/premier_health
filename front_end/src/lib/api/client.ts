import axios from "axios";

const PRODUCTION_API_URL =
  "https://api.premierhealthclinics.com/api/";

const LOCAL_API_URL =
  "http://127.0.0.1:8000/api/";

const API_BASE_URL =
  typeof window === "undefined"
    ? (
        process.env.API_URL_SERVER ||
        process.env.NEXT_PUBLIC_API_URL ||
        (process.env.NODE_ENV === "production"
          ? PRODUCTION_API_URL
          : LOCAL_API_URL)
      )
    : (
        process.env.NEXT_PUBLIC_API_URL ||
        PRODUCTION_API_URL
      );

export const SUPPORTED_LOCALES = [
  "ar",
  "fr",
  "de",
  "es",
  "it",
  "tr",
  "ru",
] as const;

function normalizeLocale(locale?: string): string {
  return (locale || "").split("-")[0].trim().toLowerCase();
}

export function getActiveLocale(): string {
  if (typeof window === "undefined") return "en";

  const pathname = window.location.pathname;

  if (pathname.startsWith("/gcc/")) return "ar";

  const segment = pathname.split("/")[1];

  return SUPPORTED_LOCALES.includes(
    segment as (typeof SUPPORTED_LOCALES)[number],
  )
    ? segment
    : "en";
}

export function localizedApiPath(
  path: string,
  locale?: string,
): string {
  let clean = path.replace(/^\/+/, "");

  if (clean.startsWith("api/")) {
    clean = clean.slice(4);
  }

  const normalized = normalizeLocale(locale);

  if (
    !normalized ||
    normalized === "en" ||
    !SUPPORTED_LOCALES.includes(
      normalized as (typeof SUPPORTED_LOCALES)[number],
    )
  ) {
    return clean;
  }

  if (
    clean === normalized ||
    clean.startsWith(`${normalized}/`)
  ) {
    return clean;
  }

  return `${normalized}/${clean}`;
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 8000,
});

api.interceptors.request.use((config) => {
  if (config.url) {
    const rawBase = (config.baseURL || API_BASE_URL)
      .trim()
      .replace(/\/+$/, "");

    let cleanUrl = config.url.replace(/^\/+/, "");

    if (
      rawBase.endsWith("/api") &&
      cleanUrl.startsWith("api/")
    ) {
      cleanUrl = cleanUrl.substring(4);
    }

    if (typeof window !== "undefined") {
      config.url = localizedApiPath(
        cleanUrl,
        getActiveLocale(),
      );
    } else {
      config.url = cleanUrl;
    }
  }

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
    token.trim()
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      typeof window !== "undefined"
    ) {
      localStorage.removeItem("patient_access");
      localStorage.removeItem("patient_refresh");
      localStorage.removeItem("patient_user");
    }

    return Promise.reject(error);
  },
);
