import { generatePageMetadata, SITE_URL } from "@/lib/seo";
import { getBranches } from "@/lib/api";
import { BranchesPageClient } from "@/components/branches/BranchesPageClient";
import type { Branch } from "@/lib/types";

export const generateMetadata = generatePageMetadata("branches");

// ─── Per-branch LocalBusiness / MedicalClinic JSON-LD ──────────────────────
const BRANCH_GEO: Record<string, { lat: string; lng: string; locality: string; region: string }> = {
  "2": {
    lat: "30.0719202",
    lng: "31.2275839",
    locality: "Cairo",
    region: "Cairo Governorate",
  },
  "4": {
    lat: "30.0194029",
    lng: "31.0045291",
    locality: "Sheikh Zayed City",
    region: "Giza Governorate",
  },
  "3": {
    lat: "30.0154326",
    lng: "31.5145233",
    locality: "New Cairo",
    region: "Cairo Governorate",
  },
};

function BranchStructuredData({ branches }: { branches: Branch[] }) {
  const graph = branches.map((b) => {
    const geoInfo = BRANCH_GEO[String(b.id)] || {
      lat: "30.0444",
      lng: "31.2357",
      locality: "Cairo",
      region: "Cairo Governorate",
    };

    return {
      "@type": ["LocalBusiness", "MedicalClinic"],
      "@id": `${SITE_URL}/en/branches#branch-${b.id}`,
      name: b.name,
      alternateName: b.name_ar || undefined,
      url: `${SITE_URL}/en/branches`,
      telephone: b.phone || "+201200644663",
      image: b.image_url || b.photo || `${SITE_URL}/AboutPreview/about.webp`,
      priceRange: "$$$",
      medicalSpecialty: [
        "Dermatology",
        "Aesthetic Medicine",
        "Intravenous Therapy",
        "Regenerative Medicine",
        "Longevity & Anti-Aging",
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: b.address,
        addressLocality: geoInfo.locality,
        addressRegion: geoInfo.region,
        addressCountry: "EG",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: geoInfo.lat,
        longitude: geoInfo.lng,
      },
      ...(b.mapUrl || b.map_url || b.url
        ? { hasMap: b.mapUrl || b.map_url || b.url }
        : {}),
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
          opens: "10:00",
          closes: "22:00",
        },
      ],
      parentOrganization: {
        "@id": `${SITE_URL}/#organization`,
      },
    };
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

// ─── Branches Page (Server Component) ──────────────────────────────────────
// CRITICAL FOR LOCAL SEO: Branch data (names, addresses, phones, hours, maps)
// is rendered on the server into the initial HTML for Googlebot and users.
export default async function BranchesPage() {
  const branches = await getBranches();

  return (
    <>
      {/* Per-branch LocalBusiness / MedicalClinic schema — parsed by Googlebot */}
      {branches.length > 0 && <BranchStructuredData branches={branches} />}

      {/* Main client component: receives SSR branches data directly */}
      <BranchesPageClient initialBranches={branches} />
    </>
  );
}

