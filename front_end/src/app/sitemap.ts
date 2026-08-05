import { MetadataRoute } from "next";
import { SITE_URL, LOCALES } from "@/lib/seo";

const PUBLIC_ROUTES = [
  "",
  "about",
  "doctors",
  "departments",
  "services",
  "branches",
  "contact",
  "book-appointment",
  "gallery",
  "faq",
  "testimonials",
  "privacy-policy",
  "terms-and-conditions",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  PUBLIC_ROUTES.forEach((route) => {
    LOCALES.forEach((locale) => {
      const path = route ? `/${locale}/${route}` : `/${locale}`;
      const url = `${SITE_URL}${path}`;

      // Alternate languages hreflang map
      const languages: Record<string, string> = {};
      LOCALES.forEach((loc) => {
        const locPath = route ? `/${loc}/${route}` : `/${loc}`;
        languages[loc] = `${SITE_URL}${locPath}`;
      });

      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route === "" ? "daily" : "weekly",
        priority: route === "" ? 1.0 : route === "book-appointment" ? 0.9 : 0.8,
        alternates: {
          languages,
        },
      });
    });
  });

  return entries;
}
