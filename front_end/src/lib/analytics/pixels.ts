// ─── pixels.ts ────────────────────────────────────────────────────────────────
// Typed helpers for firing Meta (Facebook) Pixel and Snap Pixel events.
// Import these wherever you need to fire a tracking event.
// All functions guard against SSR — safe to call in useEffect or event handlers.

// ─── Type Declarations ────────────────────────────────────────────────────────

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    snaptr?: (...args: unknown[]) => void;
  }
}

// ─── Meta Pixel ───────────────────────────────────────────────────────────────

/**
 * Fire a standard Meta Pixel event.
 * @param eventName  e.g. 'PageView', 'Lead', 'Contact', 'Schedule', 'ViewContent'
 * @param params     Optional event parameters object
 */
export function fbTrack(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", eventName, params);
}

// Convenience wrappers ---

/** Fire Meta Pixel Lead event (form submissions, contact requests) */
export function fbTrackLead(contentName = "Contact Form Submission") {
  fbTrack("Lead", { content_name: contentName });
}

/** Fire Meta Pixel Contact event (WhatsApp / phone clicks) */
export function fbTrackContact(contentName: string) {
  fbTrack("Contact", { content_name: contentName });
}

/** Fire Meta Pixel Schedule event (appointment booking confirmed) */
export function fbTrackSchedule(contentName = "Appointment Booking") {
  fbTrack("Schedule", { content_name: contentName });
}

/** Fire Meta Pixel ViewContent event (service / department detail page) */
export function fbTrackViewContent(
  contentName: string,
  contentCategory = "Healthcare Service"
) {
  fbTrack("ViewContent", {
    content_name: contentName,
    content_category: contentCategory,
  });
}

// ─── Snap Pixel ───────────────────────────────────────────────────────────────

export interface SnapViewContentParams {
  price?: number;
  currency?: string;
  item_ids?: string[];
  item_category?: string;
  uuid_c1?: string;
  user_email?: string;
  user_phone_number?: string;
  user_hashed_email?: string;
  user_hashed_phone_number?: string;
}

/**
 * Fire a Snap Pixel event.
 * @param eventName  e.g. 'PAGE_VIEW', 'VIEW_CONTENT', 'ADD_CART', 'PURCHASE'
 * @param params     Optional event parameters object
 */
export function snapTrack(
  eventName: string,
  params?: SnapViewContentParams | Record<string, unknown>
) {
  if (typeof window === "undefined" || !window.snaptr) return;
  window.snaptr("track", eventName, params);
}

/** Fire Snap Pixel VIEW_CONTENT event (service / department detail page) */
export function snapTrackViewContent(
  contentName: string,
  params?: SnapViewContentParams
) {
  snapTrack("VIEW_CONTENT", {
    item_category: contentName,
    ...params,
  });
}
