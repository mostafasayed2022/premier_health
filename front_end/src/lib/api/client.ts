// ─── Axios Client Configuration & Interceptors ───────────────────────────────

import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

// ─── Request Interceptor: Attach Bearer Token ────────────────────────────────

api.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("patient_access") ||
        localStorage.getItem("admin_access") ||
        localStorage.getItem("access_token")
      : null;
  if (token && token !== "undefined" && token !== "null" && token.trim() !== "") {
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
