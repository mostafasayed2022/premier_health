// src/i18n/routing.ts
import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // ✅ جميع اللغات المدعومة
  locales: ["en", "ar", "fr", "de", "es", "it", "tr", "ru"],

  // ✅ اللغة الافتراضية
  defaultLocale: "en",

  // ✅ اكتشاف اللغة من المتصفح
  localeDetection: true,

  // ✅ Prefix للغات (دايماً يظهر في الـ URL)
  localePrefix: "always",
});

// ✅ أدوات التنقل (useRouter, usePathname, Link)
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);