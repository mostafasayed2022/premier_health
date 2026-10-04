import axios from "axios";

// SSR uses localhost directly — avoids public DNS/SSL on the server
const API_BASE_URL =
  typeof window === "undefined"
    ? (process.env.API_URL_SERVER ?? "http://127.0.0.1:8000/api/")
    : (process.env.NEXT_PUBLIC_API_URL ?? "https://api.premierhealthclinics.com/api/");

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 8000,
});

const SUPPORTED = ["ar", "fr", "de", "es", "it", "tr", "ru"];

function getActiveLocale(): string {
  if (typeof window === "undefined") return "en";
  const segment = window.location.pathname.split("/")[1];
  return SUPPORTED.includes(segment) ? segment : "en";
}

/** Pass to any API call that needs a specific locale (SSR pages). */
export function langHeaders(locale?: string) {
  if (!locale || !SUPPORTED.includes(locale)) return {};
  return { headers: { "Accept-Language": locale } };
}

api.interceptors.request.use((config) => {
  // Prevent duplicate /api/api/
  if (config.url) {
    const rawBase = (config.baseURL || API_BASE_URL).trim().replace(/\/+$/, "");
    let cleanUrl = config.url.replace(/^\/+/, "");
    if (rawBase.endsWith("/api") && cleanUrl.startsWith("api/")) {
      config.url = cleanUrl.substring(4);
    }
  }

  // Client-side: read locale from URL; server-side: pages pass it explicitly via langHeaders()
  if (typeof window !== "undefined" && !config.headers["Accept-Language"]) {
    config.headers["Accept-Language"] = getActiveLocale();
  }

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("patient_access") ||
        localStorage.getItem("admin_access") ||
        localStorage.getItem("access_token")
      : null;
  if (token && token !== "undefined" && token !== "null" && token.trim()) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("patient_access");
      localStorage.removeItem("patient_refresh");
      localStorage.removeItem("patient_user");
    }
    return Promise.reject(error);
  },
);
