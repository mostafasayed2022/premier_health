"use client";

import { useEffect } from "react";
import { trackViewIVDrip } from "@/lib/analytics/iv-drip-articles-events";
import type { IVDripProductDetail } from "@/lib/types/iv-drip";

interface Props {
  drip: IVDripProductDetail;
  locale: string;
}

/** Fires the GTM view_iv_drip event once on mount. Zero UI output. */
export function IVDripViewTracker({ drip, locale }: Props) {
  useEffect(() => {
    trackViewIVDrip({
      drip_id: drip.id,
      drip_name: drip.name,
      drip_slug: drip.slug,
      price: drip.price,
      locale,
    });
  }, [drip.id, drip.name, drip.slug, drip.price, locale]);

  return null;
}
