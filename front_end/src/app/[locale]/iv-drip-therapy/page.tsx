import type { Metadata } from "next";
import { fetchIVDripPage } from "@/lib/api/iv-drip-articles";
import { SITE_URL } from "@/lib/seo";
import { IVDripHero } from "@/components/iv-drip/IVDripHero";
import { IVBenefitsGrid } from "@/components/iv-drip/IVBenefitsGrid";
import { IVAdministrationSection } from "@/components/iv-drip/IVAdministrationSection";
import { IVProductsGrid } from "@/components/iv-drip/IVProductsGrid";

// Read current dashboard content on every request.
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string }> };

// ── generateMetadata ───────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  try {
    const { page } = await fetchIVDripPage(locale);

    return {
      title: page.title,
      description: page.shortDescription,
      alternates: {
        canonical: `${SITE_URL}/${locale}/iv-drip-therapy`,
      },
      openGraph: {
        title: page.title,
        description: page.shortDescription,
        url: `${SITE_URL}/${locale}/iv-drip-therapy`,
      },
    };
  } catch {
    return {
      title: "IV Drip Therapy | Premier Health Clinics",
    };
  }
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default async function IVDripTherapyPage({ params }: Props) {
  const { locale } = await params;

  const data = await fetchIVDripPage(locale);

  return (
    <main>
      {/* 1. Hero */}
      {data?.page && <IVDripHero page={data.page} locale={locale} />}

      {/* 2. Benefits */}
      {data?.benefits && <IVBenefitsGrid benefits={data.benefits} locale={locale} />}

      {/* 3. How it's administered */}
      {data?.administrationSteps && (
        <IVAdministrationSection
          steps={data.administrationSteps}
          locale={locale}
        />
      )}

      {/* 4. Products grid */}
      {data?.products && (
        <IVProductsGrid products={data.products} locale={locale} />
      )}
    </main>
  );
}
