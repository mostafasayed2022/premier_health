"use client";

// ─── GTMProvider.tsx ──────────────────────────────────────────────────────────
// Thin client component that captures attribution on mount.
// GTM itself is loaded via GoogleTagManager.tsx in [locale]/layout.tsx.
// This component does NOT re-install GTM.

import { useEffect } from "react";
import { captureAttribution } from "@/lib/analytics/attribution";

/**
 * Mount this once in the global layout (inside <body>).
 * It silently captures UTM/click-ID attribution from the URL on every page load.
 * No UI rendered — purely side-effect.
 */
export function GTMProvider(): null {
  useEffect(() => {
    captureAttribution();
  }, []);

  return null;
}
