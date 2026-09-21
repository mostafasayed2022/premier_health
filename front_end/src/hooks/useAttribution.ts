"use client";

// ─── useAttribution.ts ────────────────────────────────────────────────────────
// Client-side hook: captures attribution on mount, returns current attribution.

import { useEffect, useState } from "react";
import { captureAttribution, getAttribution } from "@/lib/analytics/attribution";
import type { Attribution } from "@/lib/analytics/types";

export function useAttribution(): Attribution {
  const [attribution, setAttribution] = useState<Attribution>({});

  useEffect(() => {
    // Capture on every page load (handles first-touch & last-touch logic)
    captureAttribution();
    // Return current attribution for use in the component
    setAttribution(getAttribution());
  }, []);

  return attribution;
}
