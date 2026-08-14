import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/*/admin",
          "/*/admin/*",
          "/dashboard",
          "/dashboard/*",
          "/*/dashboard",
          "/*/dashboard/*",
          "/profile",
          "/profile/*",
          "/*/profile",
          "/*/profile/*",
          "/portal",
          "/portal/*",
          "/*/portal",
          "/*/portal/*",
          "/*/login",
          "/*/register",
          "/*/forgot-password",
          "/api",
          "/api/*",
          "/_next/",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
