"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Clock, ChevronDown, Sparkles, CalendarPlus } from "lucide-react";
import { trackBookIVDrip } from "@/lib/analytics/iv-drip-articles-events";
import { useAttribution } from "@/hooks/useAttribution";
import type { IVDripProductDetail } from "@/lib/types/iv-drip";
import { IVDripViewTracker } from "./IVDripViewTracker";

interface Props {
  drip: IVDripProductDetail;
  locale: string;
}

interface AccordionSection {
  id: string;
  titleKey: "whoIsItFor" | "howItHelps" | "keyIngredients" | "perfectPairings";
  contentEn: string;
  contentAr: string;
  contentFr: string;
  contentDe: string;
  contentEs: string;
  contentIt: string;
  contentTr: string;
  contentRu: string;
}

const ACCORDION_SECTIONS: AccordionSection[] = [
  {
    id: "who-is-it-for",
    titleKey: "whoIsItFor",
    contentEn:
      "Designed for individuals seeking rapid physical rejuvenation, optimal mental clarity, athletes recovering from exertion, and anyone needing deep cellular hydration.",
    contentAr:
      "مثالي للمراجعين الذين يعانون من الإجهاد البدني أو الذهني، الرياضيين لتسريع استشفاء العضلات، ومن يسعون لترطيب فوري وتعزيز المناعة ومقاومة الإرهاق.",
    contentFr:
      "Conçu pour les personnes recherchant un regain d'énergie rapide, une clarté mentale optimale, les sportifs en récupération et toute personne ayant besoin d'une hydratation cellulaire profonde.",
    contentDe:
      "Ideal für Personen mit geistiger oder körperlicher Erschöpfung, Sportler zur schnellen Regeneration und alle, die eine tiefenwirksame zelluläre Hydratation und Vitalität suchen.",
    contentEs:
      "Diseñado para personas que buscan una rápida revitalización física, claridad mental, atletas en recuperación y quienes necesitan hidratación celular profunda.",
    contentIt:
      "Pensato per chi cerca una rapida rigenerazione fisica, chiarezza mentale, atleti in fase di recupero e chiunque necessiti di una profonda idratazione cellulare.",
    contentTr:
      "Hızlı fiziksel yenilenme, zihinsel berraklık, spor sonrası toparlanma ve derin hücresel hidrasyon arayan herkes için idealdir.",
    contentRu:
      "Разработано для людей, испытывающих усталость, спортсменов для быстрого восстановления и всех, кому необходимо глубокое клеточное увлажнение.",
  },
  {
    id: "how-it-helps",
    titleKey: "howItHelps",
    contentEn:
      "Delivered directly into the bloodstream via cannula, bypassing digestive breakdown for 100% cellular absorption, immediate electrolyte rebalancing, and sustained vitality.",
    contentAr:
      "يصل العلاج مباشرة إلى مجرى الدم بنسبة امتصاص 100% متجاوزاً الجهاز الهضمي، مما يمنح الجسم ترطيباً فورياً ويعيد التوازن الحيوي للخلايا في دقائق.",
    contentFr:
      "Administré directement dans la circulation sanguine pour une biodisponibilité de 100%, évitant la barrière digestive pour une réhydratation instantanée et durable.",
    contentDe:
      "Direkte intravenöse Verabreichung umgeht den Magen-Darm-Trakt und gewährleistet 100 % zelluläre Aufnahme, sofortige Hydratation und langanhaltende Energie.",
    contentEs:
      "Administrado directamente en el torrente sanguíneo, superando la barrera digestiva para un 100% de absorción celular, rehidratación inmediata y vitalidad continua.",
    contentIt:
      "Somministrato direttamente nel flusso sanguigno per un assorbimento cellulare del 100%, superando la barriera digestiva con idratazione immediata ed energia duratura.",
    contentTr:
      "Sindirim bariyerini aşarak doğrudan kan dolaşımına verilir; %100 hücresel emilim, anında elektrolit dengesi ve kalıcı zindelik sağlar.",
    contentRu:
      "Поступает напрямую в кровоток в обход пищеварительного тракта, обеспечивая 100% клеточное усвоение и быстрое восстановление энергетического баланса.",
  },
  {
    id: "key-ingredients",
    titleKey: "keyIngredients",
    contentEn:
      "Formulated with high-dose antioxidants, Vitamin C, B-Complex essentials, Zinc, Magnesium, and balanced electrolyte fluids tailored for maximum physiological support.",
    contentAr:
      "مزيج طبي متوازن يضم فيتامين C عالي التركيز، مجموعة فيتامينات B المركبة، الزنك، المغنيسيوم، مضادات الأكسدة ومحلول الإلكتروليتات المتوازن.",
    contentFr:
      "Formule de qualité médicale associant antioxydants puissants, Vitamine C, complexe de Vitamines B, Zinc, Magnésium et électrolytes équilibrés.",
    contentDe:
      "Medizinische Formulierung mit hochdosierten Antioxidantien, Vitamin C, B-Komplex, Zink, Magnesium und elektrolytischen Infusionslösungen.",
    contentEs:
      "Fórmula de grado médico con antioxidantes de alta dosis, Vitamina C, complejo B, Zinc, Magnesio y fluidos electrolíticos equilibrados.",
    contentIt:
      "Formulazione medica con antiossidanti ad alto dosaggio, Vitamina C, complesso B, Zinco, Magnesio e soluzioni elettrolitiche bilanciate.",
    contentTr:
      "Yüksek doz antioksidanlar, C Vitamini, B Kompleks vitaminleri, Çinko, Magnezyum ve dengeli elektrolit sıvılarıyla formüle edilmiştir.",
    contentRu:
      "Медицинская формула с антиоксидантами высокой концентрации, витамином C, комплексом витаминов группы B, цинком, магнием и электролитами.",
  },
  {
    id: "perfect-pairings",
    titleKey: "perfectPairings",
    contentEn:
      "Pairs synergistically with Hyperbaric Oxygen Therapy (HBOT), HydraFacial deep skin revitalization, or our clinical biomarker wellness blood panels.",
    contentAr:
      "يمكن دمجه مع جلسات الأكسجين عالي الضغط (HBOT)، أو جلسات الهايدرافيشيل للنضارة، أو الفحوصات المخبرية الشاملة لتقييم صحة الجسم العامة.",
    contentFr:
      "S'associe parfaitement avec l'oxygénothérapie hyperbare (HBOT), les soins HydraFacial ou nos bilans sanguins complets de longévité.",
    contentDe:
      "Lässt sich ideal mit hyperbarer Sauerstofftherapie (HBOT), HydraFacial-Behandlungen oder umfassenden Labor-Check-ups kombinieren.",
    contentEs:
      "Combina a la perfección con la Terapia de Oxígeno Hiperbárico (HBOT), tratamientos faciales HydraFacial o paneles médicos completos.",
    contentIt:
      "Si abbina perfettamente con l'ossigenoterapia iperbarica (HBOT), i trattamenti HydraFacial o i nostri check-up completi dei biomarcatori.",
    contentTr:
      "Hiperbarik Oksijen Terapisi (HBOT), HydraFacial cilt bakımı veya kapsamlı biyobelirteç sağlık testlerimizle mükemmel uyum sağlar.",
    contentRu:
      "Идеально сочетается с гипербарической оксигенотерапией (HBOT), процедурами HydraFacial или комплексными лабораторными чекапами.",
  },
];

export function IVDripDetailHero({ drip, locale }: Props) {
  const t = useTranslations("IVDrip");
  const isAr = locale === "ar";
  const searchParams = useSearchParams();
  const attribution = useAttribution();

  // Active accordion section (first open by default)
  const [openSectionId, setOpenSectionId] = useState<string | null>("who-is-it-for");

  // Booking link with attribution parameters
  const utmParams = new URLSearchParams();
  const utmKeys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
  ] as const;
  utmKeys.forEach((key) => {
    const val = searchParams?.get(key) ?? (attribution as Record<string, string>)[key];
    if (val) utmParams.set(key, val);
  });
  utmParams.set("service", drip.slug);
  const bookingHref = `/book-appointment?${utmParams.toString()}`;

  function handleBookingClick() {
    trackBookIVDrip({
      drip_id: drip.id,
      drip_name: drip.name,
      drip_slug: drip.slug,
      price: drip.price,
      booking_source: "iv_drip_detail",
      utm_source: attribution.utm_source,
      utm_medium: attribution.utm_medium,
      utm_campaign: attribution.utm_campaign,
      utm_content: attribution.utm_content,
      utm_term: attribution.utm_term,
      locale,
    });
  }

  function getSectionContent(section: AccordionSection): string {
    switch (locale) {
      case "ar":
        return section.contentAr;
      case "fr":
        return section.contentFr;
      case "de":
        return section.contentDe;
      case "es":
        return section.contentEs;
      case "it":
        return section.contentIt;
      case "tr":
        return section.contentTr;
      case "ru":
        return section.contentRu;
      default:
        return section.contentEn;
    }
  }

  const productImage = drip.image || "/Treatments/nad.webp";

  return (
    <section className="bg-white py-10 md:py-16 border-b border-neutral-100">
      {/* GTM view tracker (client) */}
      <IVDripViewTracker drip={drip} locale={locale} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-foreground/60 font-medium">
          <Link href="/" className="hover:text-primary transition-colors">
            {t("home")}
          </Link>
          <span className="text-foreground/30">/</span>
          <Link href="/iv-drip-therapy" className="hover:text-primary transition-colors">
            {t("pageTitle")}
          </Link>
          <span className="text-foreground/30">/</span>
          <span className="text-primary font-semibold truncate max-w-[200px] sm:max-w-none">
            {isAr ? drip.name_ar : drip.name}
          </span>
        </nav>

        {/* 2-Column Product Showcase Layout: Image side-by-side with Title & Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Standalone Product Card */}
          <div className="lg:col-span-5 w-full">
            <div className="relative w-full rounded-3xl bg-[#f4f5f7] border border-slate-200/60 p-8 sm:p-12 flex flex-col items-center justify-center min-h-[440px] sm:min-h-[500px] shadow-sm">
              {/* Featured Pill */}
              {drip.isFeatured && (
                <div className="absolute top-5 start-5 flex items-center gap-1.5 bg-accent text-white text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-sm">
                  <Sparkles size={12} />
                  <span>{t("featured")}</span>
                </div>
              )}

              {/* Physical Product Display with subtle shadow */}
              <div className="relative w-full h-[340px] sm:h-[400px] md:h-[440px] flex items-center justify-center">
                <Image
                  src={productImage}
                  alt={isAr ? drip.name_ar : drip.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Title, Description, Specs, Accordion & Action Button */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Tagline / Category */}
            <span className="text-xs font-semibold tracking-widest uppercase text-accent mb-2 inline-block">
              Premier IV Therapy
            </span>

            {/* Product Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-primary tracking-tight mb-2 uppercase">
              {isAr ? drip.name_ar : drip.name}
            </h1>

            {/* Subtitle / Tagline */}
            <p className="text-primary/90 text-lg md:text-xl font-medium mb-4 leading-snug">
              {isAr ? drip.tagline_ar : drip.tagline}
            </p>

            {/* Short Description */}
            <p className="text-foreground/75 leading-relaxed text-sm md:text-base mb-6">
              {isAr ? drip.shortDescription_ar : drip.shortDescription}
            </p>

            {/* Specs pills: Price & Duration */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-primary font-serif font-bold text-base">
                {t("price", { price: drip.price })}
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                <Clock size={14} className="text-accent" />
                <span>{t("duration", { minutes: drip.durationMinutes })}</span>
              </span>
            </div>

            {/* Accordion Sections (Matching Screenshot Design) */}
            <div className="border-b border-slate-200/80">
              {ACCORDION_SECTIONS.map((section) => {
                const isOpen = openSectionId === section.id;
                return (
                  <div key={section.id} className="border-t border-slate-200/80">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenSectionId((curr) => (curr === section.id ? null : section.id))
                      }
                      className="w-full py-4 flex items-center justify-between text-start group transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="font-semibold text-primary text-base md:text-lg group-hover:text-accent transition-colors">
                        {t(section.titleKey)}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-primary/60 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-accent" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="pb-5 pt-1 text-sm md:text-base text-foreground/75 leading-relaxed animate-fade-in">
                        <p>{getSectionContent(section)}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* CTA Pill Button (Styled exactly like Reference Image) */}
            <div className="mt-8 flex justify-end rtl:justify-start">
              <Link
                href={bookingHref}
                onClick={handleBookingClick}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1b3a6b] hover:bg-[#152e55] text-white font-medium px-10 py-3.5 shadow-md hover:shadow-lg transition-all text-sm md:text-base hover:scale-[1.02] active:scale-[0.98]"
              >
                <CalendarPlus size={18} />
                <span>{t("bookNow")}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
