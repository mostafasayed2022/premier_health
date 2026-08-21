import type { Metadata } from "next";

/**
 * Normalizes and returns the canonical site base URL.
 * Automatically handles localhost, Vercel preview URLs, and custom production domains.
 * Guarantees no trailing slashes.
 */
const getSiteUrl = (): string => {
  let url = "https://www.premierhealthclinics.com";

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    url = process.env.NEXT_PUBLIC_SITE_URL;
  } else if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    url = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  } else if (process.env.VERCEL_URL) {
    url = `https://${process.env.VERCEL_URL}`;
  }

  // Ensure protocol and strip trailing slashes
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = `https://${url}`;
  }
  return url.replace(/\/+$/, "");
};

export const SITE_URL = getSiteUrl();

/**
 * 8 Supported Locales matching next-intl routing
 */
export const LOCALES = [
  "en",
  "ar",
  "fr",
  "de",
  "es",
  "it",
  "tr",
  "ru",
] as const;

export type SupportedLocale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: SupportedLocale = "en";

/**
 * Standard BCP47 OpenGraph Locales
 */
export const OG_LOCALE_MAP: Record<SupportedLocale, string> = {
  en: "en_US",
  ar: "ar_EG",
  fr: "fr_FR",
  de: "de_DE",
  es: "es_ES",
  it: "it_IT",
  tr: "tr_TR",
  ru: "ru_RU",
};

/**
 * Default global SEO metadata per locale
 */
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
      "تجديد الخلايا",
      "نضارة البشرة",
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
      "NAD Drip",
      "Anti-Aging Clinic",
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
      "Perfusion NAD",
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
      "Infusionstherapie",
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
      "Medicina Regenerativa",
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
      "Benessere Integrato",
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
      "Serum Tedavisi",
    ],
  },
  ru: {
    title: "Клиника Premier Health | IV-терапия, дерматология и эстетика",
    description:
      "Premier Health — ведущая медицинская клиника премиум-класса, предлагающая передовую IV-терапию, дерматологию и индивидуальные эстетические процедуры.",
    keywords: [
      "Премиум клиника",
      "IV терапия",
      "Капельницы здоровья",
      "Дерматология",
      "Premier Health",
      "Эстетическая медицина",
      "Омоложение",
    ],
  },
};

/**
 * Route-specific metadata mapping across all 8 supported languages
 */
export const PAGE_META: Record<
  string,
  Record<
    SupportedLocale,
    { title: string; description: string; keywords?: string[] }
  >
> = {
  home: {
    ar: {
      title: "عيادة بريمير هيلث | رعاية صحية وطبية فاخرة",
      description:
        "مركز الرعاية الصحية والطبية المتقدمة. نقدم أفضل بروتوكولات العلاج الوريدي والجلدية والتجميل بأعلى المعايير العالمية.",
      keywords: ["بريمير هيلث", "عيادة فاخرة", "علاج وريدي", "جلدية وتجميل"],
    },
    en: {
      title: "Premier Health Clinic | Luxury Wellness & Aesthetic Medicine",
      description:
        "Experience world-class IV therapy, aesthetic dermatology, and bespoke longevity treatments at Premier Health Clinic.",
      keywords: [
        "Luxury Wellness Clinic",
        "IV Therapy Clinic",
        "Aesthetic Medicine",
        "Premier Health",
      ],
    },
    fr: {
      title:
        "Clinique Premier Health | Médecine Esthétique & Bien-être de Luxe",
      description:
        "Découvrez des perfusions IV de pointe, la dermatologie esthétique et des soins de longévité sur mesure.",
      keywords: ["Clinique Bien-être", "Perfusion IV", "Médecine Esthétique"],
    },
    de: {
      title: "Premier Health Klinik | Luxus-Wellness & Ästhetische Medizin",
      description:
        "Erleben Sie erstklassige IV-Therapie, ästhetische Dermatologie und maßgeschneiderte Behandlungen für Langlebigkeit.",
      keywords: ["Luxus-Wellnessklinik", "IV-Drip-Therapie", "Dermatologie"],
    },
    es: {
      title: "Clínica Premier Health | Bienestar de Lujo y Medicina Estética",
      description:
        "Experimente sueroterapia IV de clase mundial, dermatología estética y tratamientos de longevidad personalizados.",
      keywords: [
        "Clínica Bienestar de Lujo",
        "Sueroterapia IV",
        "Medicina Estética",
      ],
    },
    it: {
      title: "Clinica Premier Health | Benessere di Lusso e Medicina Estetica",
      description:
        "Scopri terapie IV di livello mondiale, dermatologia estetica e trattamenti di longevità personalizzati.",
      keywords: [
        "Clinica Benessere",
        "Terapia Endovenosa",
        "Medicina Estetica",
      ],
    },
    tr: {
      title: "Premier Health Kliniği | Lüks Sağlık ve Estetik Tıp",
      description:
        "Premier Health Kliniği'nde dünya standartlarında IV terapi, estetik dermatoloji ve özel uzun yaşam tedavilerini keşfedin.",
      keywords: ["Lüks Sağlık Kliniği", "IV Terapi", "Estetik Dermatoloji"],
    },
    ru: {
      title:
        "Клиника Premier Health | Премиальное оздоровление и эстетическая медицина",
      description:
        "Откройте для себя передовую IV-терапию, эстетическую дерматологию и индивидуальные протоколы долголетия в Premier Health.",
      keywords: [
        "Премиальная клиника",
        "IV-терапия",
        "Эстетическая дерматология",
        "Premier Health",
      ],
    },
  },
  "iv-packages": {
    ar: {
      title: "باقات العلاج الوريدي | عيادة بريمير هيلث",
      description:
        "استكشف باقات العلاج الوريدي IV Therapy المصممة لدعم الترطيب، استعادة الطاقة، التعافي، والجمال. احجز باقتك عبر الواتساب.",
      keywords: ["باقات العلاج الوريدي", "باقات IV Therapy", "دربات فيتامينات القاهرة", "بريمير هيلث"],
    },
    en: {
      title: "IV Therapy Packages | Premier Health Clinics",
      description:
        "Explore our IV Therapy packages designed to support hydration, energy, recovery, beauty and overall wellness. Choose your package and book via WhatsApp.",
      keywords: ["IV Therapy Packages", "IV Drip Packages", "Premier Health IV", "Wellness Drips"],
    },
    fr: {
      title: "Forfaits de Thérapie IV | Clinique Premier Health",
      description:
        "Découvrez nos forfaits de thérapie IV conçus pour favoriser l'hydratation, l'énergie, la récupération et la beauté. Réservez sur WhatsApp.",
      keywords: ["Forfaits Thérapie IV", "Perfusion IV", "Bien-être IV"],
    },
    de: {
      title: "IV-Therapie-Pakete | Premier Health Klinik",
      description:
        "Entdecken Sie unsere IV-Therapie-Pakete für Hydratation, Energie, Regeneration und Schönheit. Buchen Sie direkt über WhatsApp.",
      keywords: ["IV-Therapie-Pakete", "Infusionstherapie Pakete", "Wellness Infusion"],
    },
    es: {
      title: "Paquetes de Terapia IV | Clínica Premier Health",
      description:
        "Explore nuestros paquetes de Terapia IV diseñados para favorecer la hidratación, energía, recuperación y belleza. Reserve por WhatsApp.",
      keywords: ["Paquetes Terapia IV", "Sueroterapia Paquetes", "Bienestar IV"],
    },
    it: {
      title: "Pacchetti di Terapia IV | Clinica Premier Health",
      description:
        "Scopri i nostri pacchetti di Terapia IV per idratazione, energia, recupero e bellezza. Prenota su WhatsApp.",
      keywords: ["Pacchetti Terapia IV", "Terapia Endovenosa Pacchetti", "Benessere IV"],
    },
    tr: {
      title: "IV Terapi Paketleri | Premier Health Kliniği",
      description:
        "Hidrasyon, enerji, toparlanma ve güzelliği destekleyen IV Terapi paketlerimizi keşfedin. WhatsApp üzerinden randevu alın.",
      keywords: ["IV Terapi Paketleri", "Serum Tedavisi Paketleri", "Premier Health IV"],
    },
    ru: {
      title: "Пакеты IV-Терапии | Клиника Premier Health",
      description:
        "Ознакомьтесь с нашими пакетами IV-терапии для гидратации, энергии, восстановления и красоты. Забронируйте через WhatsApp.",
      keywords: ["Пакеты IV-терапии", "Капельницы здоровья", "Premier Health IV"],
    },
  },
  "iv-therapy-packages": {
    ar: {
      title: "باقات العلاج الوريدي | عيادة بريمير هيلث",
      description:
        "استكشف باقات العلاج الوريدي IV Therapy المصممة لدعم الترطيب، استعادة الطاقة، التعافي، والجمال. احجز باقتك عبر الواتساب.",
      keywords: ["باقات العلاج الوريدي", "باقات IV Therapy", "دربات فيتامينات القاهرة", "بريمير هيلث"],
    },
    en: {
      title: "IV Therapy Packages | Premier Health Clinics",
      description:
        "Explore our IV Therapy packages designed to support hydration, energy, recovery, beauty and overall wellness. Choose your package and book via WhatsApp.",
      keywords: ["IV Therapy Packages", "IV Drip Packages", "Premier Health IV", "Wellness Drips"],
    },
    fr: {
      title: "Forfaits de Thérapie IV | Clinique Premier Health",
      description:
        "Découvrez nos forfaits de thérapie IV conçus pour favoriser l'hydratation, l'énergie, la récupération et la beauté. Réservez sur WhatsApp.",
      keywords: ["Forfaits Thérapie IV", "Perfusion IV", "Bien-être IV"],
    },
    de: {
      title: "IV-Therapie-Pakete | Premier Health Klinik",
      description:
        "Entdecken Sie unsere IV-Therapie-Pakete für Hydratation, Energie, Regeneration und Schönheit. Buchen Sie direkt über WhatsApp.",
      keywords: ["IV-Therapie-Pakete", "Infusionstherapie Pakete", "Wellness Infusion"],
    },
    es: {
      title: "Paquetes de Terapia IV | Clínica Premier Health",
      description:
        "Explore nuestros paquetes de Terapia IV diseñados para favorecer la hidratación, energía, recuperación y belleza. Reserve por WhatsApp.",
      keywords: ["Paquetes Terapia IV", "Sueroterapia Paquetes", "Bienestar IV"],
    },
    it: {
      title: "Pacchetti di Terapia IV | Clinica Premier Health",
      description:
        "Scopri i nostri pacchetti di Terapia IV per idratazione, energia, recupero e bellezza. Prenota su WhatsApp.",
      keywords: ["Pacchetti Terapia IV", "Terapia Endovenosa Pacchetti", "Benessere IV"],
    },
    tr: {
      title: "IV Terapi Paketleri | Premier Health Kliniği",
      description:
        "Hidrasyon, enerji, toparlanma ve güzelliği destekleyen IV Terapi paketlerimizi keşfedin. WhatsApp üzerinden randevu alın.",
      keywords: ["IV Terapi Paketleri", "Serum Tedavisi Paketleri", "Premier Health IV"],
    },
    ru: {
      title: "Пакеты IV-Терапии | Клиника Premier Health",
      description:
        "Ознакомьтесь с нашими пакетами IV-терапии для гидратации, энергии, восстановления и красоты. Забронируйте через WhatsApp.",
      keywords: ["Пакеты IV-терапии", "Капельницы здоровья", "Premier Health IV"],
    },
  },
  about: {
    ar: {
      title: "من نحن | عيادة بريمير هيلث",
      description:
        "تعرف على قصة تأسيس بريمير هيلث ورؤيتنا في تقديم أفضل خدمات الرعاية الصحية والتجميل الفاخر.",
      keywords: ["من نحن بريمير هيلث", "رؤيتنا الطبية", "رعاية صحية فاخرة"],
    },
    en: {
      title: "About Us | Premier Health Clinic",
      description:
        "Learn about Premier Health Clinic's heritage, medical team, and vision for luxury medical care.",
      keywords: [
        "About Premier Health",
        "Medical Heritage",
        "Luxury Healthcare Team",
      ],
    },
    fr: {
      title: "À Propos | Clinique Premier Health",
      description:
        "Découvrez l'histoire de Premier Health, notre équipe médicale et notre vision des soins de luxe.",
      keywords: ["À Propos Premier Health", "Équipe Médicale", "Soins de Luxe"],
    },
    de: {
      title: "Über Uns | Premier Health Klinik",
      description:
        "Erfahren Sie mehr über die Geschichte von Premier Health und unsere medizinische Spitzenversorgung.",
      keywords: [
        "Über Premier Health",
        "Medizinische Exzellenz",
        "Luxuspflege",
      ],
    },
    es: {
      title: "Sobre Nosotros | Clínica Premier Health",
      description:
        "Conozca la historia de Premier Health y nuestro compromiso con la excelencia médica de lujo.",
      keywords: ["Sobre Premier Health", "Historia Médica", "Atención de Lujo"],
    },
    it: {
      title: "Chi Siamo | Clinica Premier Health",
      description:
        "Scopri la storia di Premier Health e il nostro impegno per la cura medica di altissimo livello.",
      keywords: ["Chi Siamo Premier Health", "Storia Clinica", "Cura di Lusso"],
    },
    tr: {
      title: "Hakkımızda | Premier Health Kliniği",
      description:
        "Premier Health Kliniği'nin hikayesini ve lüks sağlık hizmetlerindeki uzmanlığımızı keşfedin.",
      keywords: [
        "Hakkımızda",
        "Premier Health Tarihçesi",
        "Uzman Sağlık Kadrosu",
      ],
    },
    ru: {
      title: "О нас | Клиника Premier Health",
      description:
        "Узнайте больше об истории Premier Health, нашей команде ведущих врачей и философии премиальной медицины.",
      keywords: ["О клинике", "Команда врачей", "Premier Health история"],
    },
  },
  doctors: {
    ar: {
      title: "أطباؤنا واستشاريونا | عيادة بريمير هيلث",
      description:
        "تعرف على نخبة من أفضل الأطباء والاستشاريين المعتمدين دولياً في التجميل والعلاج الوريدي والجلدية.",
      keywords: [
        "أطباء بريمير هيلث",
        "استشاريو جلدية",
        "أطباء تجميل",
        "خبراء العلاج الوريدي",
      ],
    },
    en: {
      title: "Our Medical Specialists | Premier Health Clinic",
      description:
        "Meet our world-class medical consultants and specialists in dermatology, aesthetics, and wellness.",
      keywords: [
        "Specialist Doctors",
        "Dermatology Consultants",
        "Aesthetic Physicians",
        "Premier Health Doctors",
      ],
    },
    fr: {
      title: "Nos Médecins Spécialistes | Clinique Premier Health",
      description:
        "Rencontrez nos consultants médicaux et spécialistes de renommée mondiale.",
      keywords: [
        "Médecins Spécialistes",
        "Dermatologues",
        "Consultants Médicaux",
      ],
    },
    de: {
      title: "Unsere Fachärzte | Premier Health Klinik",
      description:
        "Lernen Sie unsere erstklassigen Fachärzte für Dermatologie, Ästhetik und IV-Therapie kennen.",
      keywords: ["Fachärzte", "Dermatologen", "Ästhetik-Spezialisten"],
    },
    es: {
      title: "Nuestros Médicos Especialistas | Clínica Premier Health",
      description:
        "Conozca a nuestros médicos especialistas de prestigio internacional en estética y salud integral.",
      keywords: ["Médicos Especialistas", "Dermatólogos", "Médicos Estéticos"],
    },
    it: {
      title: "I Nostri Medici Specialisti | Clinica Premier Health",
      description:
        "Incontra i nostri specialisti medici di fama internazionale in dermatologia ed estetica.",
      keywords: ["Medici Specialisti", "Dermatologi", "Medici Estetici"],
    },
    tr: {
      title: "Uzman Doktorlarımız | Premier Health Kliniği",
      description:
        "Dermatoloji, estetik ve bütüncül sağlık alanındaki uzman doktor kadromuzla tanışın.",
      keywords: [
        "Uzman Doktorlar",
        "Dermatoloji Uzmanları",
        "Estetik Doktorları",
      ],
    },
    ru: {
      title: "Наши врачи и специалисты | Клиника Premier Health",
      description:
        "Познакомьтесь с нашими сертифицированными врачами-экспертами в области дерматологии, косметологии и антивозрастной медицины.",
      keywords: [
        "Врачи клиники",
        "Дерматологи",
        "Косметологи",
        "Специалисты Premier Health",
      ],
    },
  },
  departments: {
    ar: {
      title: "الأقسام الطبية التخصصية | عيادة بريمير هيلث",
      description:
        "استكشف أقسامنا الطبية المتميزة بما في ذلك التقطير الوريدي، الجلدية، والتجميل الفاخر.",
      keywords: ["أقسام طبية", "قسم التقطير الوريدي", "قسم الجلدية والتجميل"],
    },
    en: {
      title: "Clinical Departments | Premier Health Clinic",
      description:
        "Explore our specialized medical departments including IV Drips, Dermatology, and Anti-Aging Aesthetics.",
      keywords: [
        "Medical Departments",
        "IV Drip Department",
        "Dermatology Department",
        "Aesthetics Clinic",
      ],
    },
    fr: {
      title: "Départements Médicaux | Clinique Premier Health",
      description:
        "Explorez nos départements spécialisés: perfusions IV, dermatologie et esthétique anti-âge.",
      keywords: [
        "Départements Médicaux",
        "Service Perfusion IV",
        "Dermatologie",
      ],
    },
    de: {
      title: "Medizinische Abteilungen | Premier Health Klinik",
      description:
        "Entdecken Sie unsere Fachabteilungen für IV-Infusionen, Dermatologie und Ästhetik.",
      keywords: ["Medizinische Abteilungen", "IV-Infusionen", "Dermatologie"],
    },
    es: {
      title: "Departamentos Médicos | Clínica Premier Health",
      description:
        "Explore nuestros departamentos especializados en sueroterapia IV, dermatología y antienvejecimiento.",
      keywords: ["Departamentos Médicos", "Sueroterapia IV", "Dermatología"],
    },
    it: {
      title: "Reparti Medici | Clinica Premier Health",
      description:
        "Scopri i nostri reparti specializzati in terapie endovenose, dermatologia ed estetica.",
      keywords: ["Reparti Medici", "Terapia Endovenosa", "Dermatologia"],
    },
    tr: {
      title: "Tıbbi Bölümlerimiz | Premier Health Kliniği",
      description:
        "IV serum tedavileri, dermatoloji ve anti-aging estetik bölümlerimizi keşfedin.",
      keywords: ["Tıbbi Bölümler", "IV Terapi Bölümü", "Dermatoloji Kliniği"],
    },
    ru: {
      title: "Медицинские отделения | Клиника Premier Health",
      description:
        "Ознакомьтесь с нашими специализированными отделениями: IV-инфузии, дерматология, эстетическая и антивозрастная медицина.",
      keywords: [
        "Медицинские отделения",
        "Отделение IV терапии",
        "Отделение дерматологии",
      ],
    },
  },
  services: {
    ar: {
      title: "الخدمات والعلاجات الطبية | عيادة بريمير هيلث",
      description:
        "تصفح قائمة خدماتنا الطبية والعلاجية المصممة بعناية لتجديد حيويتك وتعزيز صحتك ونضارتك.",
      keywords: [
        "خدمات طبية",
        "جلسات نضارة",
        "محلول مايرز",
        "إنزيم NAD",
        "علاجات البشرة",
      ],
    },
    en: {
      title: "Medical & Aesthetic Services | Premier Health Clinic",
      description:
        "Browse our comprehensive clinical and cosmetic wellness services tailored to your exact needs.",
      keywords: [
        "Clinical Services",
        "IV Infusion Menu",
        "Skin Care Treatments",
        "Aesthetic Procedures",
      ],
    },
    fr: {
      title: "Services & Traitements Médicaux | Clinique Premier Health",
      description:
        "Consultez l'ensemble de nos services médicaux et esthétiques personnalisés.",
      keywords: [
        "Services Médicaux",
        "Traitements Esthétiques",
        "Perfusion Bien-être",
      ],
    },
    de: {
      title: "Medizinische Dienstleistungen | Premier Health Klinik",
      description:
        "Überblicken Sie unsere maßgeschneiderten medizinischen und ästhetischen Behandlungen.",
      keywords: [
        "Medizinische Behandlungen",
        "Ästhetische Pflege",
        "IV-Drip-Services",
      ],
    },
    es: {
      title: "Servicios y Tratamientos Médicos | Clínica Premier Health",
      description:
        "Consulte nuestros servicios médicos y estéticos personalizados de alta gama.",
      keywords: [
        "Servicios Médicos",
        "Tratamientos Estéticos",
        "Sueros Vitaminados",
      ],
    },
    it: {
      title: "Servizi e Trattamenti Medici | Clinica Premier Health",
      description:
        "Esplora la gamma completa dei nostri servizi medici ed estetici su misura.",
      keywords: ["Servizi Medici", "Trattamenti Estetici", "Flebo Benessere"],
    },
    tr: {
      title: "Tıbbi ve Estetik Hizmetlerimiz | Premier Health Kliniği",
      description:
        "Sağlığınızı ve güzelliğinizi destekleyen özel tıbbi ve estetik hizmetlerimizi inceleyin.",
      keywords: ["Tıbbi Hizmetler", "Estetik Tedaviler", "IV Vitamin Terapisi"],
    },
    ru: {
      title: "Медицинские и эстетические услуги | Клиника Premier Health",
      description:
        "Полный перечень медицинских, косметологических и инфузионных услуг, разработанных для восстановления энергии и сияния кожи.",
      keywords: [
        "Медицинские услуги",
        "Косметологические процедуры",
        "Капельницы NAD",
        "Уход за кожей",
      ],
    },
  },
  branches: {
    ar: {
      title: "فروعنا ومواقع العيادات | عيادة بريمير هيلث",
      description:
        "تواصل مع فروعنا الفاخرة في القاهرة والإمارات وتعرف على مواقعنا وأوقات العمل.",
      keywords: [
        "فروع بريمير هيلث",
        "عيادة القاهرة",
        "عيادة دبي",
        "فيرمونت نايل سيتي",
      ],
    },
    en: {
      title: "Clinic Locations & Branches | Premier Health Clinic",
      description:
        "Locate our prime clinic locations in Cairo and UAE. Experience luxury healthcare near you.",
      keywords: [
        "Clinic Branches",
        "Cairo Clinic",
        "Dubai Clinic",
        "Fairmont Nile City Branch",
      ],
    },
    fr: {
      title: "Nos Cliniques & Emplacements | Clinique Premier Health",
      description:
        "Trouvez nos cliniques de luxe situées au Caire et aux Émirats Arabes Unis.",
      keywords: [
        "Cliniques Premier Health",
        "Clinique Le Caire",
        "Clinique Dubaï",
      ],
    },
    de: {
      title: "Unsere Standorte & Kliniken | Premier Health Klinik",
      description:
        "Finden Sie unsere exklusiven Klinikstandorte in Kairo und den VAE.",
      keywords: ["Klinikstandorte", "Kairo Klinik", "Dubai Klinik"],
    },
    es: {
      title: "Nuestras Clínicas y Sucursales | Clínica Premier Health",
      description:
        "Encuentre nuestras sucursales de lujo en El Cairo y Emiratos Árabes Unidos.",
      keywords: ["Sucursales Clínicas", "Clínica El Cairo", "Clínica Dubái"],
    },
    it: {
      title: "Le Nostre Sedi e Cliniche | Clinica Premier Health",
      description:
        "Scopri le nostre sedi esclusive al Cairo e negli Emirati Arabi Uniti.",
      keywords: ["Sedi Cliniche", "Clinica Il Cairo", "Clinica Dubai"],
    },
    tr: {
      title: "Şubelerimiz ve Klinik Lokasyonları | Premier Health Kliniği",
      description:
        "Kahire ve BAE'deki lüks klinik şubelerimizin adres ve iletişim bilgilerine ulaşın.",
      keywords: ["Klinik Şubeleri", "Kahire Kliniği", "Dubai Kliniği"],
    },
    ru: {
      title: "Филиалы и локации клиник | Premier Health Clinic",
      description:
        "Адреса и контакты наших премиальных клиник в Каире и ОАЭ. Запишитесь на прием в ближайший филиал.",
      keywords: [
        "Филиалы клиники",
        "Клиника в Каире",
        "Клиника в Дубае",
        "Контакты локаций",
      ],
    },
  },
  contact: {
    ar: {
      title: "تواصل معنا | عيادة بريمير هيلث",
      description:
        "تواصل مع فريق خدمة العملاء في بريمير هيلث للحجز والاستفسارات الطبية على مدار الساعة.",
      keywords: [
        "تواصل مع بريمير هيلث",
        "رقم العيادة",
        "حجز استشارة",
        "خدمة المرضى",
      ],
    },
    en: {
      title: "Contact Us | Premier Health Clinic",
      description:
        "Get in touch with Premier Health Clinic for appointments, inquiries, and VIP health concierge.",
      keywords: [
        "Contact Clinic",
        "Healthcare Concierge",
        "Book Consultation",
        "Patient Support",
      ],
    },
    fr: {
      title: "Contactez-nous | Clinique Premier Health",
      description:
        "Contactez notre équipe pour prendre rendez-vous ou pour toute question médicale.",
      keywords: [
        "Contactez Premier Health",
        "Prendre Rendez-vous",
        "Support Médical",
      ],
    },
    de: {
      title: "Kontakt | Premier Health Klinik",
      description:
        "Kontaktieren Sie unser Team für Terminvereinbarungen und individuelle Beratung.",
      keywords: ["Kontakt Klinik", "Terminberatung", "Kundenservice"],
    },
    es: {
      title: "Contacto | Clínica Premier Health",
      description:
        "Póngase en contacto con nuestro equipo para reservas y consultas médicas.",
      keywords: [
        "Contacto Clínica",
        "Reservar Consulta",
        "Atención al Paciente",
      ],
    },
    it: {
      title: "Contattaci | Clinica Premier Health",
      description:
        "Contatta il nostro team per prenotazioni e consulenze mediche personalizzate.",
      keywords: [
        "Contatti Clinica",
        "Prenotazione Visita",
        "Assistenza Clienti",
      ],
    },
    tr: {
      title: "İletişim | Premier Health Kliniği",
      description:
        "Randevu ve tıbbi danışmanlık talepleriniz için ekibimizle iletişime geçin.",
      keywords: ["İletişim", "Randevu Hattı", "Müşteri Hizmetleri"],
    },
    ru: {
      title: "Контакты и запись | Клиника Premier Health",
      description:
        "Свяжитесь с нашей консьерж-службой для записи на консультацию, процедуру или получения медицинской справки.",
      keywords: [
        "Контакты клиники",
        "Телефон клиники",
        "Запись на прием",
        "Медицинский консьерж",
      ],
    },
  },
  "book-appointment": {
    ar: {
      title: "حجز موعد طبي | عيادة بريمير هيلث",
      description:
        "احجز موعدك الطبي الآن بسهولة في عيادة بريمير هيلث واختر الطبيب والفرع والخدمة المناسبة لك.",
      keywords: [
        "حجز موعد عيادة",
        "حجز تقطير وريدي",
        "حجز موعد جلدية",
        "حجز أونلاين",
      ],
    },
    en: {
      title: "Book Appointment Online | Premier Health Clinic",
      description:
        "Schedule your medical or aesthetic consultation online with Premier Health Clinic in just a few steps.",
      keywords: [
        "Book Appointment Online",
        "Schedule Doctor Visit",
        "IV Drip Booking",
        "Dermatology Appointment",
      ],
    },
    fr: {
      title: "Réserver un Rendez-vous en Ligne | Clinique Premier Health",
      description:
        "Réservez votre consultation médicale ou esthétique en ligne en quelques clics.",
      keywords: [
        "Réserver Rendez-vous",
        "Consultation en Ligne",
        "Prise de Rendez-vous",
      ],
    },
    de: {
      title: "Termin Online Buchen | Premier Health Klinik",
      description:
        "Buchen Sie Ihren Termin für Behandlung oder Beratung bequem online.",
      keywords: ["Online Termin buchen", "Arzttermin buchen", "IV-Drip Termin"],
    },
    es: {
      title: "Reservar Cita Online | Clínica Premier Health",
      description:
        "Reserve su cita médica o estética en línea de forma rápida y sencilla.",
      keywords: [
        "Reservar Cita Online",
        "Agendar Consulta",
        "Cita Dermatología",
      ],
    },
    it: {
      title: "Prenota Appuntamento Online | Clinica Premier Health",
      description:
        "Prenota online la tua visita medica o consulenza estetica con i nostri esperti.",
      keywords: [
        "Prenota Visita Online",
        "Appuntamento Clinica",
        "Prenotazione Trattamento",
      ],
    },
    tr: {
      title: "Online Randevu Al | Premier Health Kliniği",
      description:
        "Premier Health Kliniği'nden doktor ve tedavi randevunuzu online olarak hemen oluşturun.",
      keywords: [
        "Online Randevu",
        "Doktor Randevusu Al",
        "Tedavi Rezervasyonu",
      ],
    },
    ru: {
      title: "Онлайн-запись на прием | Клиника Premier Health",
      description:
        "Запишитесь на консультацию к врачу или процедуру IV-терапии онлайн за несколько простых шагов.",
      keywords: [
        "Онлайн запись",
        "Записаться к врачу",
        "Запись на капельницу",
        "Запись в клинику",
      ],
    },
  },
  gallery: {
    ar: {
      title: "معرض الصور والأجنحة الفاخرة | عيادة بريمير هيلث",
      description:
        "شاهد صور الأجنحة الطبية الفاخرة والأجهزة التكنولوجية الحديثة في فروع بريمير هيلث.",
      keywords: ["معرض بريمير هيلث", "أجنحة فاخرة", "تجهيزات طبية"],
    },
    en: {
      title: "Visual Gallery & Luxury Suites | Premier Health Clinic",
      description:
        "Explore our state-of-the-art clinic suites, advanced medical technology, and serene treatment spaces.",
      keywords: [
        "Clinic Gallery",
        "Luxury Treatment Suites",
        "Medical Facility Photos",
      ],
    },
    fr: {
      title: "Galerie & Espaces de Soins | Clinique Premier Health",
      description:
        "Découvrez nos suites de soins privées et équipements médicaux haut de gamme.",
      keywords: ["Galerie Clinique", "Suites de Luxe", "Espaces de Soins"],
    },
    de: {
      title: "Galerie & Behandlungsräume | Premier Health Klinik",
      description:
        "Entdecken Sie unsere modernen Klinikräume und fortschrittlichen Behandlungsbereiche.",
      keywords: ["Klinik-Galerie", "Luxus-Behandlungssuiten", "Rundgang"],
    },
    es: {
      title: "Galería y Espacios de Tratamiento | Clínica Premier Health",
      description:
        "Conozca nuestras exclusivas instalaciones médicas y áreas de tratamiento de lujo.",
      keywords: ["Galería Clínica", "Instalaciones de Lujo", "Fotos Clínica"],
    },
    it: {
      title: "Galleria e Suite di Trattamento | Clinica Premier Health",
      description:
        "Esplora i nostri ambienti esclusivi e le moderne tecnologie di cura medica.",
      keywords: ["Galleria Clinica", "Suite Esclusive", "Foto Struttura"],
    },
    tr: {
      title: "Görsel Galeri ve Tedavi Alanları | Premier Health Kliniği",
      description:
        "Lüks tedavi odalarımızı ve son teknoloji klinik ekipmanlarımızı inceleyin.",
      keywords: ["Klinik Galerisi", "Tedavi Odaları", "Lüks Sağlık Alanları"],
    },
    ru: {
      title: "Фотогалерея и интерьеры клиники | Premier Health",
      description:
        "Взгляните на премиальные процедурные сьюты, передовое медицинское оборудование и атмосферу уюта клиники Premier Health.",
      keywords: [
        "Галерея клиники",
        "Интерьеры клиники",
        "Премиум кабинеты",
        "Фото Premier Health",
      ],
    },
  },
  faq: {
    ar: {
      title: "الأسئلة الشائعة | عيادة بريمير هيلث",
      description:
        "إجابات شاملة عن كافة الاستفسارات المتعلقة بالعلاجات الوريدية، الجلدية، وأوقات الحجز.",
      keywords: ["أسئلة شائعة", "استفسارات العلاج الوريدي", "أسئلة الجلدية"],
    },
    en: {
      title: "Frequently Asked Questions | Premier Health Clinic",
      description:
        "Find clear answers about our IV therapies, dermatology procedures, booking protocols, and clinical standards.",
      keywords: [
        "FAQ",
        "IV Therapy Questions",
        "Dermatology FAQ",
        "Patient Inquiries",
      ],
    },
    fr: {
      title: "Foire Aux Questions | Clinique Premier Health",
      description:
        "Trouvez des réponses à toutes vos questions sur les perfusions IV et les soins dermatologiques.",
      keywords: ["FAQ Clinique", "Questions Fréquentes", "Soins Médicaux FAQ"],
    },
    de: {
      title: "Häufig Gestellte Fragen | Premier Health Klinik",
      description:
        "Finden Sie Antworten zu unseren IV-Behandlungen, dermatologischen Therapien und Buchungsabläufen.",
      keywords: ["Häufige Fragen", "FAQ IV-Therapie", "Patientenfragen"],
    },
    es: {
      title: "Preguntas Frecuentes | Clínica Premier Health",
      description:
        "Respuestas a las dudas más habituales sobre sueroterapia, dermatología y reservas.",
      keywords: ["Preguntas Frecuentes", "Dudas Sueroterapia", "FAQ Pacientes"],
    },
    it: {
      title: "Domande Frequenti | Clinica Premier Health",
      description:
        "Trova risposte su terapie IV, trattamenti estetici e modalità di prenotazione.",
      keywords: ["Domande Frequenti", "FAQ Terapie", "Assistenza Pazienti"],
    },
    tr: {
      title: "Sıkça Sorulan Sorular | Premier Health Kliniği",
      description:
        "IV serum tedavileri, cilt bakımı ve randevu süreçleri hakkında merak edilen tüm sorular ve yanıtları.",
      keywords: ["Sıkça Sorulan Sorular", "IV Terapi SSS", "Tedavi Bilgileri"],
    },
    ru: {
      title: "Часто задаваемые вопросы (FAQ) | Клиника Premier Health",
      description:
        "Ответы на популярные вопросы о процедурах IV-терапии, косметологии, безопасности и подготовке к приему.",
      keywords: [
        "Частые вопросы",
        "FAQ капельницы",
        "Вопросы дерматологу",
        "Premier Health FAQ",
      ],
    },
  },
  testimonials: {
    ar: {
      title: "آراء وتجارب المرضى | عيادة بريمير هيلث",
      description:
        "اطلع على تجارب وقصص نجاح المرضى مع بروتوكولات العلاج الوريدي والجلدية في بريمير هيلث.",
      keywords: ["آراء المرضى", "تجارب بريمير هيلث", "تقييمات العيادة"],
    },
    en: {
      title: "Client Testimonials & Stories | Premier Health Clinic",
      description:
        "Read verified reviews and real wellness transformation stories from our esteemed clients.",
      keywords: [
        "Patient Testimonials",
        "Clinic Reviews",
        "Real Patient Stories",
      ],
    },
    fr: {
      title: "Témoignages & Avis Clients | Clinique Premier Health",
      description:
        "Découvrez les retours d'expérience authentiques et les avis de nos patients.",
      keywords: [
        "Avis Patients",
        "Témoignages Clinique",
        "Retours d'Expérience",
      ],
    },
    de: {
      title: "Erfahrungsberichte & Bewertungen | Premier Health Klinik",
      description:
        "Lesen Sie authentische Patientenbewertungen und Erfolgsgeschichten unserer Behandlungen.",
      keywords: [
        "Erfahrungsberichte",
        "Patientenbewertungen",
        "Erfolgsgeschichten",
      ],
    },
    es: {
      title: "Testimonios y Opiniones | Clínica Premier Health",
      description:
        "Lea opiniones verificadas e historias reales de pacientes en Premier Health.",
      keywords: [
        "Testimonios Pacientes",
        "Opiniones Clínica",
        "Historias de Éxito",
      ],
    },
    it: {
      title: "Testimonianze e Recensioni | Clinica Premier Health",
      description:
        "Leggi le recensioni autentiche e le esperienze dei nostri pazienti.",
      keywords: ["Recensioni Pazienti", "Testimonianze Clinica", "Opinioni"],
    },
    tr: {
      title: "Hasta Yorumları ve Deneyimleri | Premier Health Kliniği",
      description:
        "Değerli danışanlarımızın kliniğimizdeki tedavi ve bakım deneyimlerini inceleyin.",
      keywords: [
        "Hasta Yorumları",
        "Klinik Değerlendirmeleri",
        "Gerçek Deneyimler",
      ],
    },
    ru: {
      title: "Отзывы пациентов | Клиника Premier Health",
      description:
        "Реальные отзывы и истории пациентов о результатах IV-терапии, косметологических процедур и сервисе Premier Health.",
      keywords: [
        "Отзывы пациентов",
        "Отзывы о клинике",
        "Истории лечения",
        "Premier Health отзывы",
      ],
    },
  },
  "privacy-policy": {
    ar: {
      title: "سياسة الخصوصية | عيادة بريمير هيلث",
      description:
        "التزامنا الكامل بحماية بياناتك وخصوصيتك الطبية وفق أعلى المعايير القانونية والأخلاقية.",
    },
    en: {
      title: "Privacy Policy | Premier Health Clinic",
      description:
        "Our commitment to protecting your personal data, medical records, and digital privacy.",
    },
    fr: {
      title: "Politique de Confidentialité | Clinique Premier Health",
      description:
        "Notre engagement envers la protection de vos données personnelles et médicales.",
    },
    de: {
      title: "Datenschutzerklärung | Premier Health Klinik",
      description:
        "Unser Engagement zum Schutz Ihrer persönlichen Daten und medizinischen Privatsphäre.",
    },
    es: {
      title: "Política de Privacidad | Clínica Premier Health",
      description:
        "Nuestro compromiso con la protección de sus datos personales y privacidad médica.",
    },
    it: {
      title: "Informativa sulla Privacy | Clinica Premier Health",
      description:
        "Il nostro impegno per la protezione dei tuoi dati personali e della riservatezza medica.",
    },
    tr: {
      title: "Gizlilik Politikası | Premier Health Kliniği",
      description:
        "Kişisel verilerinizin ve tıbbi bilgilerinizin korunmasına ilişkin yasal ilkelerimiz.",
    },
    ru: {
      title: "Политика конфиденциальности | Клиника Premier Health",
      description:
        "Политика защиты персональных данных и медицинской тайны пациентов клиники Premier Health.",
    },
  },
  "terms-and-conditions": {
    ar: {
      title: "الشروط والأحكام | عيادة بريمير هيلث",
      description:
        "الشروط والأحكام الخاصة بحجز المواعيد واستخدام الخدمات الطبية في عيادة بريمير هيلث.",
    },
    en: {
      title: "Terms and Conditions | Premier Health Clinic",
      description:
        "Terms and conditions regarding clinical appointments, consultations, and digital services.",
    },
    fr: {
      title: "Conditions Générales | Clinique Premier Health",
      description:
        "Conditions générales relatives aux rendez-vous cliniques et services médicaux.",
    },
    de: {
      title: "Allgemeine Geschäftsbedingungen | Premier Health Klinik",
      description:
        "Bedingungen für Behandlungstermine und Nutzung unserer medizinischen Angebote.",
    },
    es: {
      title: "Términos y Condiciones | Clínica Premier Health",
      description:
        "Términos y condiciones para citas médicas, consultas y servicios de la clínica.",
    },
    it: {
      title: "Termini e Condizioni | Clinica Premier Health",
      description:
        "Termini e condizioni per visite mediche, consulenze e servizi della clinica.",
    },
    tr: {
      title: "Kullanım Şartları ve Koşulları | Premier Health Kliniği",
      description:
        "Premier Health Kliniği tedavi ve randevu hizmetlerine ilişkin genel kullanım koşulları.",
    },
    ru: {
      title: "Условия и положения | Клиника Premier Health",
      description:
        "Правила и условия предоставления медицинских услуг, записи на прием и консультаций.",
    },
  },
};

/**
 * Options to customize SEO metadata generation
 */
export interface SeoMetadataOptions {
  ogImage?: string;
  noIndex?: boolean;
}

/**
 * Generates unified Next.js Metadata object with strict canonical, hreflang alternates, x-default,
 * and high-resolution OpenGraph/Twitter card configurations.
 */
export function getSeoMetadata(
  locale: string,
  pageKey?: string,
  options: SeoMetadataOptions = {},
): Metadata {
  const currentLocale = (
    LOCALES.includes(locale as SupportedLocale) ? locale : DEFAULT_LOCALE
  ) as SupportedLocale;

  const defaultMeta = DEFAULT_META[currentLocale];
  const pageMeta =
    pageKey && PAGE_META[pageKey]
      ? PAGE_META[pageKey][currentLocale]
      : undefined;

  const title = pageMeta?.title || defaultMeta.title;
  const description = pageMeta?.description || defaultMeta.description;
  const keywords = pageMeta?.keywords
    ? Array.from(new Set([...pageMeta.keywords, ...defaultMeta.keywords]))
    : defaultMeta.keywords;

  // Build canonical path
  const isHomePage = !pageKey || pageKey === "home";
  const path = isHomePage
    ? `/${currentLocale}`
    : `/${currentLocale}/${pageKey}`;
  const canonicalUrl = `${SITE_URL}${path}`;

  // Build hreflang map for all 8 supported languages + x-default
  const languageAlternates: Record<string, string> = {};
  LOCALES.forEach((loc) => {
    const locPath = isHomePage ? `/${loc}` : `/${loc}/${pageKey}`;
    languageAlternates[loc] = `${SITE_URL}${locPath}`;
  });

  // x-default ALWAYS points to the defaultLocale ("en") route for international SEO
  languageAlternates["x-default"] = `${SITE_URL}/${DEFAULT_LOCALE}${
    isHomePage ? "" : `/${pageKey}`
  }`;

  // Dedicated Open Graph preview image (1200x630 ideal aspect ratio)
  const ogImageUrl = options.ogImage
    ? options.ogImage.startsWith("http")
      ? options.ogImage
      : `${SITE_URL}${options.ogImage}`
    : `${SITE_URL}/hero/hero1.webp`;

  const ogLocale = OG_LOCALE_MAP[currentLocale] || "en_US";
  const ogAlternateLocales = LOCALES.filter((l) => l !== currentLocale).map(
    (l) => OG_LOCALE_MAP[l],
  );

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(SITE_URL),
    icons: {
      icon: [
        { url: "/logo/logo.webp", type: "image/webp" },
        { url: "/logo/logo.webp", sizes: "32x32", type: "image/webp" },
        { url: "/logo/logo.webp", sizes: "16x16", type: "image/webp" },
        {
          url: "/logo/logo.webp",
          sizes: "180x180",
          type: "image/webp",
        },
      ],
      shortcut: ["/logo/logo.webp"],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: languageAlternates,
    },
    robots: options.noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
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
      locale: ogLocale,
      alternateLocale: ogAlternateLocales,
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${title} - Premier Health Clinic`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

/**
 * Higher-order helper for Next.js App Router static/dynamic pages.
 * Usage in page.tsx:
 * export const generateMetadata = generatePageMetadata("about");
 */
export function generatePageMetadata(
  pageName: string,
  options: SeoMetadataOptions = {},
) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }): Promise<Metadata> {
    const { locale } = await params;
    return getSeoMetadata(locale, pageName, options);
  };
}
