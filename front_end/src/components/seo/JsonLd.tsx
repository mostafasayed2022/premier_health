import React from "react";
import { SITE_URL } from "@/lib/seo";

interface JsonLdProps {
  locale: string;
}

export function JsonLd({ locale }: JsonLdProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${SITE_URL}/#organization`,
    name: "Premier Health Clinic",
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/logo/logo1.webp`,
    image: `${SITE_URL}/logo/logo1.webp`,
    description:
      "Leading luxury wellness clinic offering advanced IV drip therapy, dermatology, and bespoke aesthetic care.",
    telephone: "+201200644663",
    email: "info@premierhealth.com",
    priceRange: "$$$",
    medicalSpecialty: [
      "Dermatology",
      "Aesthetics",
      "IV Therapy",
      "Wellness & Regenerative Medicine",
    ],
    availableLanguage: [
      { "@type": "Language", name: "English", iso6391Code: "en" },
      { "@type": "Language", name: "Arabic", iso6391Code: "ar" },
      { "@type": "Language", name: "French", iso6391Code: "fr" },
      { "@type": "Language", name: "German", iso6391Code: "de" },
      { "@type": "Language", name: "Spanish", iso6391Code: "es" },
      { "@type": "Language", name: "Italian", iso6391Code: "it" },
      { "@type": "Language", name: "Turkish", iso6391Code: "tr" },
      { "@type": "Language", name: "Russian", iso6391Code: "ru" },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Fairmont Nile City",
      addressLocality: "Cairo",
      addressCountry: "EG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "30.0718",
      longitude: "31.2281",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Saturday",
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
        ],
        opens: "08:00",
        closes: "22:00",
      },
    ],
    sameAs: [
      "https://facebook.com/premierhealthclinic",
      "https://instagram.com/premierhealthclinic",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
