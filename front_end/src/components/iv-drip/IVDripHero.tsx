import Image from "next/image";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { CalendarPlus, ArrowDown } from "lucide-react";
import type { IVDripPageContent } from "@/lib/types/iv-drip";

interface Props {
  page: IVDripPageContent;
  locale: string;
}

export async function IVDripHero({ page, locale }: Props) {
  const t = await getTranslations({ locale, namespace: "IVDrip" });
  const isAr = locale === "ar";

  const heroImage = page.heroImage || "/hero/hero1.webp";

  return (
    <section className="bg-white pt-16 pb-12 md:pt-24 md:pb-16 border-b border-neutral-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        {/* Eyebrow badge */}
        <span className="inline-block text-xs uppercase tracking-widest text-accent font-semibold mb-4 border border-accent/30 rounded-full px-4 py-1 bg-beige/40">
          Premier Health Clinics
        </span>

        {/* Centered Main Title (Matching Image 2) */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary tracking-tight leading-tight mb-5 max-w-4xl mx-auto">
          {isAr ? page.title_ar : page.title}
        </h1>

        {/* Centered Subtitle Paragraph (Matching Image 2) */}
        <p className="text-base md:text-lg text-foreground/75 leading-relaxed max-w-3xl mx-auto mb-8 font-normal">
          {isAr ? page.shortDescription_ar : page.shortDescription}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <Link
            href="/book-appointment"
            className="inline-flex items-center gap-2 bg-[#1b3a6b] hover:bg-[#152e55] text-white font-medium px-8 py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02]"
          >
            <CalendarPlus size={18} />
            <span>{t("bookNow")}</span>
          </Link>

          <a
            href="#products-menu"
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-primary font-medium px-7 py-3.5 rounded-full transition-all duration-300"
          >
            <span>{t("exploreMenu")}</span>
            <ArrowDown size={16} />
          </a>
        </div>

        {/* Dedicated Product / Treatment Showcase Banner (Matching Image 2) */}
        <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-xl border border-slate-100 bg-[#f4f5f7] min-h-[300px] sm:min-h-[400px] md:min-h-[480px]">
          <Image
            src={heroImage}
            alt={isAr ? page.title_ar : page.title}
            fill
            priority
            quality={90}
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
