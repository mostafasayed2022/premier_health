import { MetadataRoute } from "next";
import { SITE_URL, LOCALES, DEFAULT_LOCALE } from "@/lib/seo";

const PUBLIC_ROUTES = [
  "", // homepage
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
  const now = new Date();

  PUBLIC_ROUTES.forEach((route) => {
    // Build hreflang map for this route across all 8 locales + x-default
    const languages: Record<string, string> = {};
    LOCALES.forEach((loc) => {
      const locPath = route ? `/${loc}/${route}` : `/${loc}`;
      languages[loc] = `${SITE_URL}${locPath}`;
    });
    languages["x-default"] = `${SITE_URL}/${DEFAULT_LOCALE}${
      route ? `/${route}` : ""
    }`;

    // Create a sitemap entry for each locale
    LOCALES.forEach((locale) => {
      const path = route ? `/${locale}/${route}` : `/${locale}`;
      const url = `${SITE_URL}${path}`;

      let priority = 0.8;
      let changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] =
        "weekly";

      if (route === "") {
        priority = 1.0;
        changeFrequency = "daily";
      } else if (route === "book-appointment" || route === "services") {
        priority = 0.9;
        changeFrequency = "weekly";
      } else if (route === "doctors" || route === "departments") {
        priority = 0.85;
        changeFrequency = "weekly";
      } else if (
        route === "privacy-policy" ||
        route === "terms-and-conditions"
      ) {
        priority = 0.3;
        changeFrequency = "monthly";
      }

      entries.push({
        url,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: {
          languages,
        },
      });
    });
  });

  return entries;
}
