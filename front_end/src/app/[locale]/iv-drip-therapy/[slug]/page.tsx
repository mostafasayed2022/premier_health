import type { Metadata } from "next";
import { isAxiosError } from "axios";
import { notFound } from "next/navigation";
import { fetchIVDripProduct } from "@/lib/api/iv-drip-articles";
import { SITE_URL } from "@/lib/seo";
import { IVDripDetailHero } from "@/components/iv-drip/IVDripDetailHero";
import { IVDripDescription } from "@/components/iv-drip/IVDripDescription";
import { IVDripFAQSection } from "@/components/iv-drip/IVDripFAQSection";
import { IVDripBookingCTA } from "@/components/iv-drip/IVDripBookingCTA";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string; slug: string }> };

// ── generateStaticParams ───────────────────────────────────────────────────────

// ── generateMetadata ───────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const isAr = locale === "ar";

  try {
    const drip = await fetchIVDripProduct(slug, locale);
    const title = isAr
      ? (drip.metaTitle_ar ?? drip.name_ar)
      : (drip.metaTitle ?? drip.name);
    const description = isAr
      ? (drip.metaDescription_ar ?? drip.shortDescription_ar)
      : (drip.metaDescription ?? drip.shortDescription);

    return {
      title: title || "IV Drip Therapy | Premier Health Clinics",
      description: description || "",
      alternates: {
        canonical: `${SITE_URL}/${locale}/iv-drip-therapy/${slug}`,
      },
      openGraph: {
        title: title || "IV Drip Therapy | Premier Health Clinics",
        description: description || "",
        url: `${SITE_URL}/${locale}/iv-drip-therapy/${slug}`,
        images: drip.ogImage ? [{ url: drip.ogImage }] : [],
      },
    };
  } catch {
    return {};
  }
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default async function IVDripDetailPage({ params }: Props) {
  const { locale, slug } = await params;

  let drip;
  try {
    drip = await fetchIVDripProduct(slug, locale);
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) notFound();
    throw error;
  }

  return (
    <main>
      {/* Hero — name, tagline, price, duration */}
      <IVDripDetailHero drip={drip} locale={locale} />

      {/* Rich-text full description */}
      <IVDripDescription drip={drip} locale={locale} />

      {/* FAQs accordion */}
      {drip.faqs && drip.faqs.length > 0 && (
        <IVDripFAQSection faqs={drip.faqs} locale={locale} />
      )}

      {/* Booking CTA — forwards UTM params */}
      <IVDripBookingCTA drip={drip} locale={locale} />
    </main>
  );
}
