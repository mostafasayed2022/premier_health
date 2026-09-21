"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { captureAttribution } from "@/lib/analytics/attribution";
import { pushDataLayer } from "@/lib/analytics/dataLayer";
import { fbTrack, snapTrack } from "@/lib/analytics/pixels";

export function GTMProvider(): null {
  const pathname = usePathname();
  const previous = useRef<string | null>(null);
  useEffect(() => {
    captureAttribution();
    const locale = pathname.startsWith("/gcc/") ? "ar" : pathname.split("/")[1] || "en";
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    if (previous.current !== pathname) {
      pushDataLayer("page_view", { page_path: pathname, page_location: window.location.origin + pathname, locale });
      previous.current = pathname;
    }
    if (process.env.NEXT_PUBLIC_TRACKING_ENABLED !== "true" || process.env.NEXT_PUBLIC_PIXEL_MODE !== "direct") return;
    let metaSent = false, snapSent = false, attempts = 0;
    const timer = window.setInterval(() => {
      if (!metaSent && window.fbq) { fbTrack("PageView"); metaSent = true; }
      if (!snapSent && window.snaptr) { snapTrack("PAGE_VIEW"); snapSent = true; }
      if (++attempts >= 100 || (metaSent && snapSent)) window.clearInterval(timer);
    }, 100);
    return () => window.clearInterval(timer);
  }, [pathname]);
  return null;
}
