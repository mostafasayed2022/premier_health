// ─── dataLayer.ts ────────────────────────────────────────────────────────────
// SSR-safe dataLayer push with Zero-PII enforcement
// Never crashes the website. Never sends PII to GTM.

import type { DataLayerEvent } from "./types";

// ─── PII Key Blocklist ────────────────────────────────────────────────────────
const PII_KEYS = new Set([
  "name",
  "first_name",
  "last_name",
  "full_name",
  "email",
  "phone",
  "phone_number",
  "mobile",
  "address",
  "street",
  "city_address",
  "diagnosis",
  "medical_history",
  "medical_notes",
  "password",
  "ssn",
  "national_id",
  "dob",
  "date_of_birth",
  "patient_name",
  "patient_email",
  "patient_phone",
  "user_email",
  "user_phone",
]);

// ─── PII Sanitizer ────────────────────────────────────────────────────────────
export function sanitizePII(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    // Skip PII keys entirely
    if (PII_KEYS.has(key.toLowerCase())) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`[Analytics] Blocked PII key: "${key}"`);
      }
      continue;
    }

    // Recursively sanitize nested objects (but not arrays of primitives)
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      result[key] = sanitizePII(value as Record<string, unknown>);
    } else {
      result[key] = value;
    }
  }

  return result;
}

// ─── pushDataLayer ────────────────────────────────────────────────────────────
/**
 * SSR-safe dataLayer push.
 * - Sanitizes all PII before pushing.
 * - Logs in development.
 * - Never throws.
 */
export function pushDataLayer(
  event: string,
  parameters: Record<string, unknown> = {},
): void {
  try {
    // SSR guard
    if (typeof window === "undefined") return;

    // Ensure dataLayer is initialized
    window.dataLayer = window.dataLayer || [];

    const sanitized = sanitizePII(parameters);
    const payload: DataLayerEvent = { event, ...sanitized };

    if (process.env.NODE_ENV === "development") {
      console.log("[Analytics] dataLayer.push:", JSON.stringify(payload, null, 2));
    }

    window.dataLayer.push(payload);
  } catch (err) {
    // Never crash the website
    if (process.env.NODE_ENV === "development") {
      console.error("[Analytics] pushDataLayer error:", err);
    }
  }
}
