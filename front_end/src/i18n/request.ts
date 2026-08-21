// src/i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { cache } from "react";

/**
 * React request memoized loader for locale messages.
 * Prevents redundant filesystem imports across Server Components during the same render cycle.
 */
export const loadLocaleMessages = cache(async (locale: string) => {
  const namespaces = [
    "Nav",
    "Home",
    "About",
    "Departments",
    "Doctors",
    "Services",
    "Branches",
    "Contact",
    "Booking",
    "Common",
    "DripsIntro",
    "DermaIntro",
    "WhyChooseUs",
    "DeptComparison",
    "DoctorProfile",
    "ServiceCta",
    "Faqs",
    "Footer",
    "FAQPage",
    "Auth",
    "Policy",
    "Gallery",
    "Testimonials",
    "Welcome",
    "Profile",
    "IVPackages",
  ];

  const messages: Record<string, any> = {};

  for (const ns of namespaces) {
    const fileName = ns.toLowerCase();
    try {
      messages[ns] = (
        await import(`../messages/${locale}/${fileName}.json`)
      ).default;
    } catch (err) {
      console.warn(
        `[i18n] Failed to load ${ns} for ${locale}, falling back to ar`,
      );
      try {
        messages[ns] = (
          await import(`../messages/ar/${fileName}.json`)
        ).default;
      } catch (fallbackErr) {
        messages[ns] = {};
      }
    }
  }

  return messages;
});

/**
 * React request memoized loader for individual page namespaces.
 */
export const loadNamespaceMessages = cache(
  async (locale: string, namespace: string) => {
    try {
      return (await import(`../messages/${locale}/${namespace}.json`)).default;
    } catch {
      try {
        return (await import(`../messages/ar/${namespace}.json`)).default;
      } catch {
        return {};
      }
    }
  },
);

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  const messages = await loadLocaleMessages(locale);

  return {
    locale,
    messages,
  };
});
