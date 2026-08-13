/**
 * admin/api/client.ts
 *
 * Core HTTP client for the headless admin panel.
 *
 * Responsibilities:
 *  - Attach Authorization: Bearer <access_token> to every request
 *  - Intercept 401 → attempt silent token refresh → retry original request
 *  - On refresh failure → clear tokens → redirect to /admin/login
 *  - Standardized error envelope parsing
 */

const RAW_BASE = (
  (typeof process !== "undefined"
    ? process.env?.NEXT_PUBLIC_API_URL || process.env?.NEXT_PUBLIC_API_BASE_URL
    : undefined) || "http://92.205.178.100:8000/api"
).trim().replace(/\/+$/, "");

/**
 * Constructs a normalized full API URL.
 * Automatically ensures the URL contains a single `/api/` prefix and avoids `/api/api/`.
 */
export function getFullApiUrl(path: string): string {
  const apiBase = RAW_BASE.endsWith("/api") ? RAW_BASE : `${RAW_BASE}/api`;
  let cleanPath = path.replace(/^\/+/, "");
  if (cleanPath.startsWith("api/")) {
    cleanPath = cleanPath.substring(4);
  }
  return `${apiBase}/${cleanPath}`;
}

// ─── Token storage ────────────────────────────────────────────────────────

const TOKEN_KEY = "admin_access";
const REFRESH_KEY = "admin_refresh";

export const tokenStorage = {
  getAccess: () =>
    typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null,
  getRefresh: () =>
    typeof window !== "undefined" ? localStorage.getItem(REFRESH_KEY) : null,
  set: (access: string, refresh: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEY, access);
      localStorage.setItem(REFRESH_KEY, refresh);
    }
  },
  clear: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_KEY);
      localStorage.removeItem("admin_user");
    }
  },
};

// ─── Error types ─────────────────────────────────────────────────────────

export class ApiError extends Error {
  status: number;
  data: Record<string, unknown>;

  constructor(status: number, data: Record<string, unknown>) {
    let message = (data?.detail as string) ?? (data?.error as string);
    if (!message && data && typeof data === "object") {
      const parts = Object.entries(data)
        .map(([field, errs]) => {
          const formatted = Array.isArray(errs)
            ? errs.join(", ")
            : String(errs);
          return `${field}: ${formatted}`;
        })
        .filter(Boolean);
      if (parts.length > 0) {
        message = parts.join(" | ");
      }
    }
    super(message || `HTTP ${status}`);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

// ─── Token refresh ────────────────────────────────────────────────────────

let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const refresh = tokenStorage.getRefresh();
    if (!refresh) throw new ApiError(401, { detail: "No refresh token" });

    const res = await fetch(getFullApiUrl("auth/refresh/"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (!res.ok) {
      tokenStorage.clear();
      if (typeof window !== "undefined") {
        window.location.href = "/admin/login";
      }
      throw new ApiError(401, {
        detail: "Session expired. Please log in again.",
      });
    }

    const data = await res.json();
    tokenStorage.set(data.access, data.refresh ?? refresh);
    return data.access as string;
  })().finally(() => {
    refreshPromise = null;
  });

  return refreshPromise;
}

// ─── Core fetch wrapper ───────────────────────────────────────────────────

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

export async function apiFetch<T = unknown>(
  path: string,
  options: RequestOptions = {},
  _retry = true,
): Promise<T> {
  const { params, ...init } = options;

  let url = getFullApiUrl(path);
  if (params && Object.keys(params).length > 0) {
    const qs = new URLSearchParams(
      Object.fromEntries(
        Object.entries(params)
          .filter(([, v]) => v !== undefined && v !== null)
          .map(([k, v]) => [k, String(v)]),
      ),
    );
    url += `?${qs}`;
  }

  const access = tokenStorage.getAccess();
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && !(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  if (access) {
    headers.set("Authorization", `Bearer ${access}`);
  }

  const res = await fetch(url, { ...init, headers });

  // Silent token refresh on 401
  if (res.status === 401 && _retry) {
    try {
      const newAccess = await refreshAccessToken();
      headers.set("Authorization", `Bearer ${newAccess}`);
      return apiFetch<T>(path, options, false);
    } catch {
      tokenStorage.clear();
      if (typeof window !== "undefined") {
        window.location.href = "/admin/login";
      }
      throw new ApiError(401, { detail: "Authentication failed." });
    }
  }

  if (res.status === 401) {
    tokenStorage.clear();
    if (typeof window !== "undefined") {
      window.location.href = "/admin/login";
    }
  }

  if (!res.ok) {
    let errorData: Record<string, unknown> = {};
    try {
      errorData = await res.json();
    } catch {
      errorData = { detail: res.statusText };
    }
    throw new ApiError(res.status, errorData);
  }

  // 204 No Content
  if (res.status === 204) return null as T;

  return res.json() as Promise<T>;
}

// ─── Convenience helpers ──────────────────────────────────────────────────

export const api = {
  get: <T>(path: string, params?: RequestOptions["params"]) =>
    apiFetch<T>(path, { method: "GET", params }),

  post: <T>(path: string, body: unknown) =>
    apiFetch<T>(path, { method: "POST", body: JSON.stringify(body) }),

  put: <T>(path: string, body: unknown) =>
    apiFetch<T>(path, { method: "PUT", body: JSON.stringify(body) }),

  patch: <T>(path: string, body: unknown) =>
    apiFetch<T>(path, { method: "PATCH", body: JSON.stringify(body) }),

  delete: <T>(path: string) => apiFetch<T>(path, { method: "DELETE" }),

  upload: <T>(path: string, formData: FormData) =>
    apiFetch<T>(path, { method: "POST", body: formData }),
};
