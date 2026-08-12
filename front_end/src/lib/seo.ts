import type { Metadata } from "next";

const getSiteUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://premier-health-delta.vercel.app";
};

export const SITE_URL = getSiteUrl();
export const LOCALES = ["en", "ar", "fr", "de", "es", "it", "tr"] as const;
export type SupportedLocale = (typeof LOCALES)[number];

export const DEFAULT_META: Record<
  SupportedLocale,
  { title: string; description: string; keywords: string[] }
> = {
  ar: {
    title: "عيادة بريمير هيلث | تقطير وريدي، جلدية وتجميل رفيع المستوى",
    description:
      "مركز بريمير هيلث المتكامل للرعاية الفاخرة والعلاجات الوريدية المتقدمة والتجميل والجلدية في القاهرة والإمارات.",
    keywords: [
      "عيادة تجميل",
      "تقطير وريدي",
      "علاج الجلدية",
      "بريمير هيلث",
      "رعاية صحية فاخرة",
    ],
  },
  en: {
    title: "Premier Health Clinic | IV Therapy, Dermatology & Aesthetics",
    description:
      "Premier Health Clinic is a leading luxury wellness clinic offering advanced IV drip therapy, dermatology, and bespoke aesthetic care.",
    keywords: [
      "Luxury Clinic",
      "IV Therapy",
      "Dermatology",
      "Premier Health",
      "Aesthetic Treatments",
    ],
  },
  fr: {
    title: "Clinique Premier Health | Thérapie IV, Dermatologie & Esthétique",
    description:
      "Premier Health est une clinique de bien-être haut de gamme proposant perfusion IV, dermatologie et soins esthétiques personnalisés.",
    keywords: [
      "Clinique de Luxe",
      "Thérapie IV",
      "Dermatologie",
      "Premier Health",
      "Soins Esthétiques",
    ],
  },
  de: {
    title: "Premier Health Klinik | IV-Therapie, Dermatologie & Ästhetik",
    description:
      "Premier Health Clinic ist eine führende Luxus-Wellnessklinik für fortschrittliche IV-Drip-Therapie, Dermatologie und Ästhetik.",
    keywords: [
      "Luxusklinik",
      "IV-Therapie",
      "Dermatologie",
      "Premier Health",
      "Ästhetische Medizin",
    ],
  },
  es: {
    title: "Clínica Premier Health | Terapia IV, Dermatología y Estética",
    description:
      "Premier Health Clinic es una clínica médica de lujo especializada en sueroterapia IV, dermatología y estética avanzada.",
    keywords: [
      "Clínica de Lujo",
      "Sueroterapia IV",
      "Dermatología",
      "Premier Health",
      "Tratamientos Estéticos",
    ],
  },
  it: {
    title: "Clinica Premier Health | Terapia IV, Dermatologia ed Estetica",
    description:
      "Premier Health Clinic è una clinica medica di lusso per terapia endovenosa IV, dermatologia e trattamenti estetici avanzati.",
    keywords: [
      "Clinica di Lusso",
      "Terapia IV",
      "Dermatologia",
      "Premier Health",
      "Trattamenti Estetici",
    ],
  },
  tr: {
    title: "Premier Health Kliniği | IV Terapi, Dermatoloji ve Estetik",
    description:
      "Premier Health Kliniği, gelişmiş IV serum terapisi, dermatoloji ve kişiye özel estetik bakım sunan lüks sağlık merkezidir.",
    keywords: [
      "Lüks Klinik",
      "IV Terapi",
      "Dermatoloji",
      "Premier Health",
      "Estetik Tedaviler",
    ],
  },
};

export const PAGE_META: Record<
  string,
  Record<SupportedLocale, { title: string; description: string }>
> = {
  about: {
    ar: {
      title: "من نحن | عيادة بريمير هيلث",
      description:
        "تعرف على قصة تأسيس بريمير هيلث ورؤيتنا في تقديم أفضل خدمات الرعاية الصحية والتجميل الفاخر.",
    },
    en: {
      title: "About Us | Premier Health Clinic",
      description:
        "Learn about Premier Health Clinic's heritage, medical team, and vision for luxury medical care.",
    },
    fr: {
      title: "À Propos | Clinique Premier Health",
      description:
        "Découvrez l'histoire de Premier Health, notre équipe médicale et notre vision des soins de luxe.",
    },
    de: {
      title: "Über Uns | Premier Health Klinik",
      description:
        "Erfahren Sie mehr über die Geschichte von Premier Health und unsere medizinische Spitzenversorgung.",
    },
    es: {
      title: "Sobre Nosotros | Clínica Premier Health",
      description:
        "Conozca la historia de Premier Health y nuestro compromiso con la excelencia médica de lujo.",
    },
    it: {
      title: "Chi Siamo | Clinica Premier Health",
      description:
        "Scopri la storia di Premier Health e il nostro impegno per la cura medica di altissimo livello.",
    },
    tr: {
      title: "Hakkımızda | Premier Health Kliniği",
      description:
        "Premier Health Kliniği'nin hikayesini ve lüks sağlık hizmetlerindeki uzmanlığımızı keşfedin.",
    },
  },
  doctors: {
    ar: {
      title: "أطباؤنا | عيادة بريمير هيلث",
      description:
        "تعرف على نخبة من أفضل الأطباء والاستشاريين المتخصصين في التجميل والعلاج الوريدي والجلدية.",
    },
    en: {
      title: "Our Doctors | Premier Health Clinic",
      description:
        "Meet our world-class medical consultants and specialists in dermatology, aesthetics, and wellness.",
    },
    fr: {
      title: "Nos Médecins | Clinique Premier Health",
      description:
        "Rencontrez nos consultants médicaux et spécialistes de renommée mondiale.",
    },
    de: {
      title: "Unsere Ärzte | Premier Health Klinik",
      description:
        "Lernen Sie unsere erstklassigen Fachärzte für Dermatologie, Ästhetik und IV-Therapie kennen.",
    },
    es: {
      title: "Nuestros Médicos | Clínica Premier Health",
      description:
        "Conozca a nuestros médicos especialistas de prestigio internacional en estética y salud integral.",
    },
    it: {
      title: "I Nostri Medici | Clinica Premier Health",
      description:
        "Incontra i nostri specialisti medici di fama internazionale in dermatologia ed estetica.",
    },
    tr: {
      title: "Doktorlarımız | Premier Health Kliniği",
      description:
        "Dermatoloji, estetik ve bütüncül sağlık alanındaki uzman doktor kadromuzla tanışın.",
    },
  },
  departments: {
    ar: {
      title: "الأقسام الطبية | عيادة بريمير هيلث",
      description:
        "استكشف أقسامنا الطبية المتميزة بما في ذلك التقطير الوريدي، الجلدية، والتجميل الفاخر.",
    },
    en: {
      title: "Medical Departments | Premier Health Clinic",
      description:
        "Explore our specialized medical departments including IV Drips, Dermatology, and Anti-Aging Aesthetics.",
    },
    fr: {
      title: "Départements Médicaux | Clinique Premier Health",
      description:
        "Explorez nos départements spécialisés: perfusions IV, dermatologie et esthétique anti-âge.",
    },
    de: {
      title: "Medizinische Abteilungen | Premier Health Klinik",
      description:
        "Entdecken Sie unsere Fachabteilungen für IV-Infusionen, Dermatologie und Ästhetik.",
    },
    es: {
      title: "Departamentos Médicos | Clínica Premier Health",
      description:
        "Explore nuestros departamentos especializados en sueroterapia IV, dermatología y antienvejecimiento.",
    },
    it: {
      title: "Reparti Medici | Clinica Premier Health",
      description:
        "Scopri i nostri reparti specializzati in terapie endovenose, dermatologia ed estetica.",
    },
    tr: {
      title: "Tıbbi Bölümlerimiz | Premier Health Kliniği",
      description:
        "IV serum tedavileri, dermatoloji ve anti-aging estetik bölümlerimizi keşfedin.",
    },
  },
  services: {
    ar: {
      title: "خدماتنا | عيادة بريمير هيلث",
      description:
        "تصفح قائمة خدماتنا الطبية والعلاجية المصممة بعناية لتجديد حيويتك وتعزيز صحتك.",
    },
    en: {
      title: "Our Services | Premier Health Clinic",
      description:
        "Browse our comprehensive clinical and cosmetic wellness services tailored to your exact needs.",
    },
    fr: {
      title: "Nos Services | Clinique Premier Health",
      description:
        "Consultez l'ensemble de nos services médicaux et esthétiques personnalisés.",
    },
    de: {
      title: "Unsere Dienstleistungen | Premier Health Klinik",
      description:
        "Überblicken Sie unsere maßgeschneiderten medizinischen und ästhetischen Behandlungen.",
    },
    es: {
      title: "Nuestros Servicios | Clínica Premier Health",
      description:
        "Consulte nuestros servicios médicos y estéticos personalizados de alta gama.",
    },
    it: {
      title: "I Nostri Servizi | Clinica Premier Health",
      description:
        "Esplora la gamma completa dei nostri servizi medici ed estetici su misura.",
    },
    tr: {
      title: "Hizmetlerimiz | Premier Health Kliniği",
      description:
        "Sağlığınızı ve güzelliğinizi destekleyen özel tıbbi ve estetik hizmetlerimizi inceleyin.",
    },
  },
  branches: {
    ar: {
      title: "فروعنا | عيادة بريمير هيلث",
      description:
        "تواصل مع فروعنا الفاخرة في القاهرة والإمارات وتعرف على مواقعنا وأوقات العمل.",
    },
    en: {
      title: "Our Branches | Premier Health Clinic",
      description:
        "Locate our prime clinic locations in Cairo and UAE. Experience luxury healthcare near you.",
    },
    fr: {
      title: "Nos Branches | Clinique Premier Health",
      description:
        "Trouvez nos cliniques de luxe situées au Caire et aux Émirats Arabes Unis.",
    },
    de: {
      title: "Unsere Standorte | Premier Health Klinik",
      description:
        "Finden Sie unsere exklusiven Klinikstandorte in Kairo und den VAE.",
    },
    es: {
      title: "Nuestras Sucursales | Clínica Premier Health",
      description:
        "Encuentre nuestras sucursales de lujo en El Cairo y Emiratos Árabes Unidos.",
    },
    it: {
      title: "Le Nostre Sedi | Clinica Premier Health",
      description:
        "Scopri le nostre sedi esclusive al Cairo e negli Emirati Arabi Uniti.",
    },
    tr: {
      title: "Şubelerimiz | Premier Health Kliniği",
      description:
        "Kahire ve BAE'deki lüks klinik şubelerimizin adres ve iletişim bilgilerine ulaşın.",
    },
  },
  contact: {
    ar: {
      title: "تواصل معنا | عيادة بريمير هيلث",
      description:
        "تواصل مع فريق خدمة العملاء في بريمير هيلث للحجز والاستفسارات الطبية على مدار الساعة.",
    },
    en: {
      title: "Contact Us | Premier Health Clinic",
      description:
        "Get in touch with Premier Health Clinic for appointments, inquiries, and VIP health concierge.",
    },
    fr: {
      title: "Contactez-nous | Clinique Premier Health",
      description:
        "Contactez notre équipe pour prendre rendez-vous ou pour toute question médicale.",
    },
    de: {
      title: "Kontakt | Premier Health Klinik",
      description:
        "Kontaktieren Sie unser Team für Terminvereinbarungen und individuelle Beratung.",
    },
    es: {
      title: "Contacto | Clínica Premier Health",
      description:
        "Póngase en contacto con nuestro equipo para reservas y consultas médicas.",
    },
    it: {
      title: "Contattaci | Clinica Premier Health",
      description:
        "Contatta il nostro team per prenotazioni e consulenze mediche personalizzate.",
    },
    tr: {
      title: "İletişim | Premier Health Kliniği",
      description:
        "Randevu ve tıbbi danışmanlık talepleriniz için ekibimizle iletişime geçin.",
    },
  },
  "book-appointment": {
    ar: {
      title: "حجز موعد | عيادة بريمير هيلث",
      description:
        "احجز موعدك الطبي الآن بسهولة في عيادة بريمير هيلث واختر الطبيب والفرع المناسب لك.",
    },
    en: {
      title: "Book Appointment | Premier Health Clinic",
      description:
        "Schedule your medical or aesthetic consultation online with Premier Health Clinic.",
    },
    fr: {
      title: "Réserver un Rendez-vous | Clinique Premier Health",
      description:
        "Réservez votre consultation médicale ou esthétique en ligne en quelques clics.",
    },
    de: {
      title: "Termin Buchen | Premier Health Klinik",
      description:
        "Buchen Sie Ihren Termin für Behandlung oder Beratung bequem online.",
    },
    es: {
      title: "Reservar Cita | Clínica Premier Health",
      description:
        "Reserve su cita médica o estética en línea de forma rápida y sencilla.",
    },
    it: {
      title: "Prenota Appuntamento | Clinica Premier Health",
      description:
        "Prenota online la tua visita medica o consulenza estetica con i nostri esperti.",
    },
    tr: {
      title: "Randevu Al | Premier Health Kliniği",
      description:
        "Premier Health Kliniği'nden doktor randevunuzu online olarak hemen oluşturun.",
    },
  },
};

export function getSeoMetadata(locale: string, pageKey?: string): Metadata {
  const currentLocale = (
    LOCALES.includes(locale as SupportedLocale) ? locale : "en"
  ) as SupportedLocale;
  const defaultMeta = DEFAULT_META[currentLocale];
  const pageMeta = pageKey ? PAGE_META[pageKey]?.[currentLocale] : undefined;

  const title = pageMeta?.title || defaultMeta.title;
  const description = pageMeta?.description || defaultMeta.description;
  const path = pageKey ? `/${currentLocale}/${pageKey}` : `/${currentLocale}`;
  const canonicalUrl = `${SITE_URL}${path}`;

  // Build hreflang map for all 7 supported languages + x-default
  const languageAlternates: Record<string, string> = {};
  LOCALES.forEach((loc) => {
    const locPath = pageKey ? `/${loc}/${pageKey}` : `/${loc}`;
    languageAlternates[loc] = `${SITE_URL}${locPath}`;
  });
  languageAlternates["x-default"] =
    `${SITE_URL}${pageKey ? `/${pageKey}` : "/en"}`;

  return {
    title,
    description,
    keywords: defaultMeta.keywords,
    metadataBase: new URL(SITE_URL),
    icons: {
      icon: [
        { url: "/logo/logo1.webp" },
        { url: "/logo/logo1.webp", sizes: "32x32", type: "image/webp" },
        { url: "/logo/logo1.webp", sizes: "16x16", type: "image/webp" },
      ],
      apple: [
        { url: "/logo/logo1.webp", sizes: "180x180", type: "image/webp" },
      ],
      shortcut: ["/logo/logo1.webp"],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: languageAlternates,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Premier Health Clinic",
      locale: currentLocale,
      type: "website",
      images: [
        {
          url: `${SITE_URL}/logo/logo1.webp`,
          width: 1200,
          height: 630,
          alt: "Premier Health Clinic",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/logo/logo1.webp`],
    },
  };
}

/**
 * Helper to easily generate metadata for a given page route.
 * Usage in page.tsx:
 * export const generateMetadata = generatePageMetadata("about");
 */
export function generatePageMetadata(pageName: string) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }): Promise<Metadata> {
    const { locale } = await params;
    return getSeoMetadata(locale, pageName);
  };
}
