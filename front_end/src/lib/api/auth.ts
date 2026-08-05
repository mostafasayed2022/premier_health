import { api } from "./client";
import { ForgotPasswordEmailData } from "../validations/auth";
import Cookies from "js-cookie";

// ─── Auth API ────────────────────────────────────────────────────────────────

export const authApi = {
  requestPasswordReset: async (data: ForgotPasswordEmailData) => {
    const response = await api.post("/password-reset/request/", data);
    return response.data;
  },

  verifyPasswordResetOtp: async (data: { email: string; code: string }) => {
    const response = await api.post("/password-reset/verify/", data);
    return response.data;
  },

  confirmPasswordReset: async (data: {
    email: string;
    code: string;
    new_password: string;
  }) => {
    const response = await api.post("/password-reset/confirm/", data);
    return response.data;
  },
};

// ─── Token Cookie Keys ────────────────────────────────────────────────────────

/** Cookie keys read by the server-side middleware */
export const COOKIE_KEYS = {
  patient: "patient_access",
  admin: "admin_access",
} as const;

// ─── Save Token (localStorage + cookie so middleware can read it) ─────────────

/**
 * Call this after a successful login for patients.
 * Writes to localStorage AND to a cookie so Next.js middleware can read the role.
 */
export function savePatientToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("patient_access", token);
  Cookies.set(COOKIE_KEYS.patient, token, { expires: 1, sameSite: "Lax" });
}

/**
 * Call this after a successful admin login.
 */
export function saveAdminToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("admin_access", token);
  Cookies.set(COOKIE_KEYS.admin, token, { expires: 1, sameSite: "Lax" });
}

/**
 * Clear all auth tokens from both localStorage and cookies.
 */
export function clearAllTokens(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("patient_access");
  localStorage.removeItem("patient_refresh");
  localStorage.removeItem("patient_user");
  localStorage.removeItem("admin_access");
  localStorage.removeItem("admin_refresh");
  localStorage.removeItem("admin_user");
  Cookies.remove(COOKIE_KEYS.patient);
  Cookies.remove(COOKIE_KEYS.admin);
}

// ─── getUserRole ──────────────────────────────────────────────────────────────

export type UserRole = "admin" | "doctor" | "patient";

/**
 * Decodes a JWT and returns the role claim.
 *
 * - If `token` is provided, it is decoded directly (safe for server-side middleware).
 * - If omitted, the token is read from localStorage (client-side only).
 *
 * Returns null if:
 *  - No token found
 *  - Token is expired
 *  - Token is malformed
 */
export function getUserRole(token?: string): UserRole | null {
  let jwt = token;

  if (!jwt) {
    // Browser-only fallback
    if (typeof window === "undefined") return null;
    jwt =
      localStorage.getItem("patient_access") ??
      localStorage.getItem("admin_access") ??
      undefined;
  }

  if (!jwt) return null;

  try {
    const parts = jwt.split(".");
    if (parts.length !== 3) return null;

    const payload = JSON.parse(atob(parts[1]));

    // Check expiry
    if (payload.exp && Date.now() / 1000 > payload.exp) return null;

    const role = (payload.role as string | undefined)?.toLowerCase();
    if (role === "admin" || role === "doctor" || role === "patient") {
      return role as UserRole;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Returns true if there is a valid, non-expired token for any role.
 */
export function isTokenValid(): boolean {
  return getUserRole() !== null;
}
