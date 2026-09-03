// ─── gtm.ts ───────────────────────────────────────────────────────────────
// Central Google Tag Manager & dataLayer helper
// SSR-safe, Zero-PII sanitized event dispatching

import { pushDataLayer, sanitizePII } from "./dataLayer";
import type { AnalyticsEventName } from "./types";

export const DEFAULT_GTM_ID = "GTM-NHV29W2S";

/**
 * Returns the active GTM Container ID from public environment variables,
 * falling back to the production container ID.
 */
export function getGTMId(): string {
  return process.env.NEXT_PUBLIC_GTM_ID || DEFAULT_GTM_ID;
}

/**
 * Generic, reusable event tracking function.
 * Safely pushes any business event to window.dataLayer.
 *
 * - SSR-safe (no-op on server).
 * - Strips all PII automatically via the Zero-PII sanitizer.
 * - Never throws or disrupts user interactions.
 *
 * Example:
 * ```ts
 * trackEvent("view_service", {
 *   service_id: "iv_advanced_recharge",
 *   service_category: "iv_therapy",
 *   price: 5000,
 *   currency: "EGP",
 * });
 * ```
 */
export function trackEvent(
  eventName: AnalyticsEventName | string,
  data: Record<string, unknown> = {},
): void {
  pushDataLayer(eventName, data);
}

export { pushDataLayer, sanitizePII };
