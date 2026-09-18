import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { fetchIVDripPage } from "@/lib/api/iv-drip-articles";
import { SITE_URL } from "@/lib/seo";
import { IVDripHero } from "@/components/iv-drip/IVDripHero";
import { IVBenefitsGrid } from "@/components/iv-drip/IVBenefitsGrid";
import { IVAdministrationSection } from "@/components/iv-drip/IVAdministrationSection";
import { IVProductsGrid } from "@/components/iv-drip/IVProductsGrid";

// ── ISR: revalidate every 60 seconds ──────────────────────────────────────────
export const revalidate = 60;

type Props = { params: Promise<{ locale: string }> };

// ── generateMetadata ───────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  try {
    const t = await getTranslations({ locale, namespace: "IVDrip" });

    return {
      title: t("pageTitle"),
      description: t("pageSubtitle"),
      alternates: {
        canonical: `${SITE_URL}/${locale}/iv-drip-therapy`,
      },
      openGraph: {
        title: t("pageTitle"),
        description: t("pageSubtitle"),
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

  let data;
  try {
    data = await fetchIVDripPage();
  } catch (error) {
    console.error("[IVDripTherapyPage] Failed to fetch page data:", error);
    data = {
      page: {
        heroImage: "/hero/hero1.webp",
        title: "IV Drip Therapy",
        title_ar: "علاج التقطير الوريدي",
        shortDescription:
          "Premium intravenous therapy tailored to your body's needs",
        shortDescription_ar: "علاج وريدي متميز مصمم خصيصًا لاحتياجات جسمك",
      },
      benefits: [],
      administrationSteps: [],
      products: [],
    };
  }

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
