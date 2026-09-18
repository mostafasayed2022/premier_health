import { api } from "./client";
import type {
  IVDripPageResponse,
  IVDripProductDetail,
} from "@/lib/types/iv-drip";
import type {
  ArticlesListResponse,
  ArticleDetail,
  ArticlesQueryParams,
  ArticleCategory,
  ArticleSummary,
} from "@/lib/types/articles";

// ─── IV Drip ──────────────────────────────────────────────────────────────────

/**
 * Fetches the main IV Drip page: singleton content + benefits + administration
 * steps + products grid.
 * Falls back cleanly if backend endpoint returns 404 or is offline.
 */
export async function fetchIVDripPage(): Promise<IVDripPageResponse> {
  try {
    const res = await api.get<IVDripPageResponse>("/iv-drip-therapy/");
    return res.data;
  } catch (error) {
    console.warn(
      "[API] /iv-drip-therapy/ returned an error, using fallback data:",
      (error as any)?.message,
    );
    return {
      page: {
        heroImage: "/hero/hero1.webp",
        title: "IV Drip Therapy",
        title_ar: "علاج التقطير الوريدي",
        shortDescription:
          "Premium intravenous therapy tailored to your body's needs",
        shortDescription_ar: "علاج وريدي متميز مصمم خصيصًا لاحتياجات جسمك",
      },
      benefits: [
        {
          id: 1,
          icon: "⚡",
          title: "100% Bioavailability",
          title_ar: "امتصاص حيوي بنسبة 100%",
          description:
            "Direct intravenous delivery bypasses digestive degradation for immediate cellular uptake.",
          description_ar:
            "التوصيل المباشر عبر الوريد يتجاوز الجهاز الهضمي لتحقيق امتصاص خلوي فوري.",
          order: 1,
        },
        {
          id: 2,
          icon: "🛡️",
          title: "Immune Support",
          title_ar: "دعم المناعة",
          description:
            "High-dose antioxidants and micronutrients strengthen your body's natural defense barriers.",
          description_ar:
            "جرعات مركزة من مضادات الأكسدة والمغذيات لتقوية حواجز الدفاع الطبيعية.",
          order: 2,
        },
        {
          id: 3,
          icon: "💧",
          title: "Rapid Cellular Hydration",
          title_ar: "ترطيب خلوي فوري",
          description:
            "Restores electrolyte equilibrium faster than oral hydration, boosting energy.",
          description_ar:
            "يعيد توازن الإلكتروليتات أسرع من السوائل الفموية لرفع مستويات النشاط.",
          order: 3,
        },
      ],
      administrationSteps: [
        {
          id: 1,
          stepNumber: 1,
          icon: null,
          title: "Medical Consultation",
          title_ar: "استشارة طبية أولية",
          description:
            "Our doctor reviews your vitals and medical background to select the optimal formula.",
          description_ar:
            "يقوم طبيبنا بمراجعة علاماتك الحيوية وتاريخك الطبي لاختيار التركيبة الأنسب.",
        },
        {
          id: 2,
          stepNumber: 2,
          icon: null,
          title: "Formula Preparation",
          title_ar: "تحضير التركيبة المعقمة",
          description:
            "Custom medical-grade vitamins and nutrients are freshly prepared in our clinic.",
          description_ar:
            "يتم تحضير الفيتامينات والمغذيات الطبية النقية طازجة في عيادتنا.",
        },
        {
          id: 3,
          stepNumber: 3,
          icon: null,
          title: "Relaxing Session",
          title_ar: "جلسة استرخاء مريحة",
          description:
            "Sit back comfortably for 30 to 45 minutes under continuous nursing care.",
          description_ar:
            "استرخِ في مقاعد مريحة لمدة 30 إلى 45 دقيقة تحت رعاية تمريضية مستمرة.",
        },
        {
          id: 4,
          stepNumber: 4,
          icon: null,
          title: "Immediate Rejuvenation",
          title_ar: "انتعاش ونشاط فوري",
          description:
            "Feel revitalized immediately and resume your day with enhanced vigor.",
          description_ar:
            "اشعر بالحيوية فور انتهاء الجلسة واستأنف يومك بكامل طاقتك.",
        },
      ],
      products: [
        {
          id: 1,
          name: "Immunity & Recovery Drip",
          name_ar: "دريب المناعة والتعافي",
          slug: "immunity-recovery-drip",
          tagline: "High-dose Vitamin C, Zinc & Antioxidants",
          tagline_ar: "جرعة عالية من فيتامين سي والزنك ومضادات الأكسدة",
          shortDescription:
            "Strengthens immunity and accelerates recovery from fatigue and travel exhaustion.",
          shortDescription_ar:
            "يقوي الجهاز المناعي ويسرع التعافي من الإرهاق البدني وإجهاد السفر.",
          image: "/Treatments/Detox.webp",
          price: "3500.00",
          durationMinutes: 45,
          isFeatured: true,
          order: 1,
        },
        {
          id: 2,
          name: "NAD+ Longevity & Vitality",
          name_ar: "دريب NAD+ لطول العمر والنشاط",
          slug: "nad-longevity-vitality",
          tagline: "Cellular Energy, DNA Repair & Anti-Aging",
          tagline_ar: "طاقة خلوية، إصلاح الحمض النووي ومكافحة الشيخوخة",
          shortDescription:
            "Boosts mental clarity, cellular rejuvenation and mitochondrial vitality.",
          shortDescription_ar:
            "يعزز الصفاء الذهني وتجديد الخلايا وحيوية الميتوكوندريا.",
          image: "/Treatments/nad.webp",
          price: "6500.00",
          durationMinutes: 60,
          isFeatured: true,
          order: 2,
        },
        {
          id: 3,
          name: "Glow & Detox Beauty Drip",
          name_ar: "دريب النضارة وإزالة السموم",
          slug: "glow-detox-beauty-drip",
          tagline: "Glutathione, Biotin & Essential Nutrients",
          tagline_ar: "جلوتاثيون، بيوتين وعناصر غذائية حيوية",
          shortDescription:
            "Promotes luminous skin tone, liver detoxification and hair-skin vitality.",
          shortDescription_ar:
            "يمنح البشرة نضارة وإشراقاً ويدعم تنقية الكبد وحيوية الشعر.",
          image: "/Treatments/myers.webp",
          price: "4200.00",
          durationMinutes: 45,
          isFeatured: false,
          order: 3,
        },
      ],
    };
  }
}

/**
 * Fetches a single drip product detail by slug.
 */
export async function fetchIVDripProduct(
  slug: string,
): Promise<IVDripProductDetail> {
  try {
    const res = await api.get<IVDripProductDetail>(`/iv-drip-therapy/${slug}/`);
    return res.data;
  } catch (error) {
    console.warn(
      `[API] /iv-drip-therapy/${slug}/ returned error, using fallback:`,
      (error as any)?.message,
    );
    const pageData = await fetchIVDripPage();
    const found = pageData.products.find((p) => p.slug === slug);
    if (found) {
      return {
        ...found,
        fullDescription: `<p>${found.shortDescription}</p><p>Formulated with medical-grade precision under expert supervision.</p>`,
        fullDescription_ar: `<p>${found.shortDescription_ar}</p><p>تركيبة طبية متطورة بإشراف نخبة من الأطباء المتخصصين.</p>`,
        faqs: [
          {
            id: 1,
            question: "How long does the session take?",
            question_ar: "كم تستغرق الجلسة؟",
            answer: `The session typically lasts ${found.durationMinutes} minutes in a relaxing clinical environment.`,
            answer_ar: `تستغرق الجلسة عادة حوالي ${found.durationMinutes} دقيقة في بيئة طبية مريحة.`,
            order: 1,
          },
          {
            id: 2,
            question: "When will I feel the effects?",
            question_ar: "متى أشعر بالنتائج؟",
            answer:
              "Most patients report increased energy, focus, and hydration within hours after the infusion.",
            answer_ar:
              "يشعر معظم المراجعين بنشاط وتركيز وترطيب ملحوظ خلال ساعات قليلة بعد الجلسة.",
            order: 2,
          },
        ],
        metaTitle: `${found.name} | Premier Health Clinics`,
        metaTitle_ar: `${found.name_ar} | بريمير هيلث`,
        metaDescription: found.shortDescription,
        metaDescription_ar: found.shortDescription_ar,
        ogImage: found.image,
      };
    }
    throw error;
  }
}

/**
 * Fetches all drip slugs for generateStaticParams.
 */
export async function fetchAllDripSlugs(): Promise<{ slug: string }[]> {
  try {
    const data = await fetchIVDripPage();
    return data.products.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

// ─── Articles ─────────────────────────────────────────────────────────────────

const MOCK_CATEGORIES: Record<string, ArticleCategory> = {
  ivDrip: {
    id: 1,
    name: "IV Drip Therapy",
    name_ar: "العلاج الوريدي",
    slug: "iv-drip-therapy",
  },
  longevity: {
    id: 2,
    name: "Longevity & Anti-Aging",
    name_ar: "طب طول العمر ومكافحة الشيخوخة",
    slug: "longevity",
  },
  aesthetic: {
    id: 3,
    name: "Aesthetic Wellness",
    name_ar: "العناية بالبشرة والجمال",
    slug: "aesthetic-wellness",
  },
  nutrition: {
    id: 4,
    name: "Clinical Nutrition",
    name_ar: "التغذية العلاجية",
    slug: "clinical-nutrition",
  },
};

const MOCK_AUTHORS = {
  drAhmed: {
    type: "doctor" as const,
    id: 1,
    name: "Dr. Ahmed Mansour",
    name_ar: "د. أحمد منصور",
    slug: "ahmed-mansour",
    avatar: "/doctor/doctor.webp",
  },
  drSarah: {
    type: "doctor" as const,
    id: 2,
    name: "Dr. Sarah Fahmy",
    name_ar: "د. سارة فهمي",
    slug: "sarah-fahmy",
    avatar: "/doctor/doctor.webp",
  },
  team: {
    type: "plain" as const,
    name: "Premier Medical Team",
    name_ar: "فريق بريمير الطبي",
  },
};

export const MOCK_ARTICLES: Omit<ArticleDetail, "relatedArticles">[] = [
  {
    id: 1,
    title: "The Science Behind IV Therapy: Bioavailability & Cellular Repair",
    title_ar: "العلم وراء العلاج الوريدي: الامتصاص الحيوي وإصلاح الخلايا",
    slug: "the-science-behind-iv-therapy",
    category: MOCK_CATEGORIES.ivDrip,
    tags: ["IV Therapy", "Bioavailability", "Immunity", "Cellular Repair"],
    excerpt:
      "Discover how intravenous micronutrient administration bypasses digestive degradation to deliver 100% bioavailability directly into the bloodstream.",
    excerpt_ar:
      "تعرف على كيفية تجاوز التغذية الوريدية لحواجز الجهاز الهضمي لتحقيق امتصاص حيوي بنسبة 100% ونتائج سريعة على مستوى الخلايا.",
    coverImage: "/backgrounds/background2.webp",
    author: MOCK_AUTHORS.drAhmed,
    publishedAt: "2026-03-10T10:00:00Z",
    readingTimeMinutes: 5,
    metaTitle: "The Science Behind IV Therapy | Premier Health Clinics",
    metaTitle_ar: "العلم وراء العلاج الوريدي | عيادات بريمير هيلث",
    metaDescription:
      "Learn how intravenous micronutrient therapy provides 100% cellular absorption and rapid vitality.",
    metaDescription_ar:
      "تعرف على كيفية تحقيق التغذية الوريدية لامتصاص خلوي بنسبة 100% واستعادة الحيوية فوراً.",
    ogImage: "/backgrounds/background2.webp",
    content: `
      <p class="lead">Intravenous (IV) therapy has transitioned from emergency room protocols to the forefront of preventative and functional medicine.</p>
      <h2>What is 100% Bioavailability?</h2>
      <p>When you consume oral supplements, vitamins and minerals must traverse the gastrointestinal tract. Stomach acid, enzymatic breakdown, and intestinal absorption barriers routinely reduce nutrient absorption to just 15% - 25%.</p>
      <blockquote class="border-s-4 border-accent ps-4 my-6 italic text-foreground/80">"Direct intravenous infusion bypasses the digestive tract entirely, delivering 100% of the active micronutrients directly into circulation where cells need them most."</blockquote>
      <h2>Key Cellular Benefits</h2>
      <ul class="list-disc ps-6 space-y-2 my-4">
        <li><strong>Immediate Hydration:</strong> Balances intracellular and extracellular electrolytes.</li>
        <li><strong>Mitochondrial Support:</strong> Provides co-factors essential for ATP energy synthesis.</li>
        <li><strong>Rapid Antioxidant Delivery:</strong> Neutralizes systemic free radicals on demand.</li>
      </ul>
      <h2>Clinical Indications</h2>
      <p>Whether recovering from physical exhaustion, acute fatigue, or seeking peak performance, customized IV protocols restore biochemical equilibrium faster than any oral regimen.</p>
    `,
    content_ar: `
      <p class="lead">انتقل العلاج بالتقطير الوريدي (IV Therapy) من غرف الطوارئ إلى صدارة الطب الوقائي والوظيفي الحديث كأسرع وسيلة لدعم الخلايا.</p>
      <h2>ما هو الامتصاص الحيوي بنسبة 100%؟</h2>
      <p>عند تناول الفيتامينات والمكملات عن طريق الفم، فإنها تمر عبر الجهاز الهضمي، حيث تتسبب أحماض المعدة والإنزيمات في تكسير جزء كبير منها، مما يقلل معدل الامتصاص الفعلي إلى ما بين 15% و 25% فقط.</p>
      <blockquote class="border-s-4 border-accent ps-4 my-6 italic text-foreground/80">"التوصيل الوريدي المباشر يتجاوز الجهاز الهضمي بالكامل، مما يضمن وصول 100% من المغذيات النشطة مباشرة إلى مجرى الدم والخلايا المستهدفة."</blockquote>
      <h2>الفوائد الحيوية على مستوى الخلية</h2>
      <ul class="list-disc ps-6 space-y-2 my-4">
        <li><strong>ترطيب خلوي فوري:</strong> إعادة توازن الأملاح والإلكتروليتات بين الخلايا.</li>
        <li><strong>دعم الميتوكوندريا:</strong> تزويد مراكز الطاقة الخلوية بالمحفزات الحيوية لإنتاج طاقة ATP.</li>
        <li><strong>مضادات أكسدة مركزة:</strong> التخلص السريع من الشوارد الحرة المسببة للإجهاد التأكسدي.</li>
      </ul>
      <h2>متى تحتاج إلى العلاج الوريدي؟</h2>
      <p>سواء كنت تعاني من إجهاد مزمن، أو ترغب في استعادة نشاطك بعد السفر، أو تسعى لأداء بدني وذهني فائق، فإن الجلسات الوريدية المخصصة توفر حلاً طبياً آمناً ومثبتاً علمياً.</p>
    `,
  },
  {
    id: 2,
    title: "Longevity Medicine: NAD+ Protocols for Healthy Cellular Aging",
    title_ar: "طب طول العمر: بروتوكولات NAD+ لشيخوخة خلوية صحية ونشطة",
    slug: "longevity-medicine-protocols",
    category: MOCK_CATEGORIES.longevity,
    tags: ["Longevity", "NAD+", "Mitochondria", "Anti-Aging"],
    excerpt:
      "Explore the biochemistry of Nicotinamide Adenine Dinucleotide (NAD+) in DNA repair, mitochondrial biogenesis, and slowing biomarkers of aging.",
    excerpt_ar:
      "استكشف الدور الحيوي لإنزيم NAD+ في إصلاح الحمض النووي، وتجديد الميتوكوندريا، ومكافحة المؤشرات الحيوية للشيخوخة.",
    coverImage: "/Treatments/nad.webp",
    author: MOCK_AUTHORS.drSarah,
    publishedAt: "2026-03-12T12:00:00Z",
    readingTimeMinutes: 7,
    metaTitle: "NAD+ Protocols for Longevity | Premier Health Clinics",
    metaTitle_ar: "بروتوكولات NAD+ لطول العمر | عيادات بريمير هيلث",
    metaDescription:
      "Exploring evidence-based longevity interventions including NAD+, cellular nutrition, and lifestyle medicine.",
    metaDescription_ar:
      "استكشاف تدخلات طول العمر القائمة على الأدلة مثل NAD+ والتغذية الخلوية ونمط الحياة الصحي.",
    ogImage: "/Treatments/nad.webp",
    content: `
      <p class="lead">Aging is increasingly understood as a treatable biological process rather than an inevitable decline. At the center of longevity research is NAD+.</p>
      <h2>The Decline of NAD+ with Age</h2>
      <p>Nicotinamide Adenine Dinucleotide (NAD+) is a coenzyme present in every living cell. By age 50, our natural NAD+ levels decline by roughly 50%, leading to reduced mitochondrial efficiency and decreased cellular repair capacity.</p>
      <h2>Sirtuins: The Guardians of the Genome</h2>
      <p>NAD+ is the obligate fuel for sirtuins (SIRT1-7), a family of proteins that regulate cellular health, silence inflammatory genes, and repair DNA breaks.</p>
      <blockquote class="border-s-4 border-accent ps-4 my-6 italic text-foreground/80">"Replenishing NAD+ levels via direct intravenous infusion reactivates sirtuins and re-energizes cellular metabolism."</blockquote>
      <h2>Expected Clinical Outcomes</h2>
      <ul class="list-disc ps-6 space-y-2 my-4">
        <li>Sharper cognitive clarity and alleviation of brain fog</li>
        <li>Enhanced endurance and faster muscular recovery</li>
        <li>Optimized circadian rhythm and restorative sleep patterns</li>
      </ul>
    `,
    content_ar: `
      <p class="lead">أصبح مفهوم التقدم في السن اليوم يُنظر إليه كعملية بيولوجية قابلة للتحسين والإبطاء، وتأتي جزيئات NAD+ في طليعة هذا التحول الطبي.</p>
      <h2>انخفاض مستويات NAD+ مع تقدم العمر</h2>
      <p>يعد NAD+ إنزيماً مساعداً حيوياً موجوداً في كل خلية حية بالجسم. مع بلوغ سن الخمسين، تنخفض مستوياته الطبيعية بنحو 50%، مما يضعف كفاءة الميتوكوندريا ويقلل من قدرة الخلايا على إصلاح نفسها.</p>
      <h2>السيرتوينات: حراس المادة الوراثية</h2>
      <p>يعتبر NAD+ الوقود الأساسي لبروتينات السيرتوين (Sirtuins)، المسؤولة عن تنظيم صحة الخلايا وتثبيط الجينات الالتهابية وإصلاح تلف الحمض النووي (DNA).</p>
      <blockquote class="border-s-4 border-accent ps-4 my-6 italic text-foreground/80">"إعادة تعزيز مستويات NAD+ عبر التقطير الوريدي المباشر يعيد تنشيط عمليات التمثيل الغذائي الخلوي وتجديد الحيوية."</blockquote>
      <h2>النتائج المرجوة من بروتوكول NAD+</h2>
      <ul class="list-disc ps-6 space-y-2 my-4">
        <li>صفاء ذهني فائق والتخلص من الضبابية الدماغية (Brain Fog)</li>
        <li>زيادة القدرة على التحمل وتسريع التعافي العضلي والبدني</li>
        <li>تنظيم الساعة البيولوجية وتحسين جودة النوم العميق</li>
      </ul>
    `,
  },
  {
    id: 3,
    title: "Skin Radiance & Detoxification: The Power of Glutathione",
    title_ar: "نضارة البشرة وتنقيتها: قوة الجلوتاثيون ومضادات الأكسدة",
    slug: "skin-radiance-and-detoxification",
    category: MOCK_CATEGORIES.aesthetic,
    tags: ["Glutathione", "Skin Glow", "Detox", "Antioxidants"],
    excerpt:
      "Why Glutathione is hailed as the master antioxidant for neutralizing free radicals, brightening complexion, and supporting hepatic detoxification.",
    excerpt_ar:
      "لماذا يعتبر الجلوتاثيون سيد مضادات الأكسدة لتفتيح البشرة وتنقيتها من التصبغات ودعم وظائف الكبد الحيوية.",
    coverImage: "/Treatments/Detox.webp",
    author: MOCK_AUTHORS.drSarah,
    publishedAt: "2026-03-14T09:30:00Z",
    readingTimeMinutes: 6,
    metaTitle: "Glutathione & Skin Glow | Premier Health Clinics",
    metaTitle_ar: "الجلوتاثيون ونضارة البشرة | عيادات بريمير هيلث",
    metaDescription:
      "Learn how master antioxidant Glutathione promotes luminous skin tone and comprehensive body detoxification.",
    metaDescription_ar:
      "تعرف على فوائد الجلوتاثيون في نضارة وتفتيح البشرة وتخليص الجسم من السموم.",
    ogImage: "/Treatments/Detox.webp",
    content: `
      <p class="lead">Known as the body's 'Master Antioxidant', Glutathione is a tripeptide synthesized by cells that plays an irreplaceable role in cellular protection.</p>
      <h2>The Dual Role: Liver Detox & Skin Radiance</h2>
      <p>Glutathione binds to lipid-soluble toxins, heavy metals, and oxidative byproducts in the liver, converting them into water-soluble forms for safe elimination.</p>
      <p>Simultaneously, glutathione inhibits the enzyme tyrosinase, shifting melanin synthesis from dark eumelanin to light phaeomelanin, resulting in an even, radiant complexion.</p>
      <h2>Why IV Administration Matters</h2>
      <p>Oral glutathione is almost completely decomposed in the stomach into individual amino acids before entering systemic circulation. Intravenous delivery preserves the intact molecule for maximum bioavailability.</p>
    `,
    content_ar: `
      <p class="lead">يُلقب الجلوتاثيون بـ 'سيد مضادات الأكسدة'، وهو مركب طبيعي ثلاثي الببتيد تنتجه الخلايا لحماية الجسم من الشوارد الحرة والسموم.</p>
      <h2>الدور المزدوج: تنقية الكبد وتوحيد لون البشرة</h2>
      <p>يرتبط الجلوتاثيون بالسموم القابلة للذوبان في الدهون والمعادن الثقيلة في الكبد، ويحولها إلى صيغة قابلة للتصريف خارج الجسم بأمان.</p>
      <p>كما يثبط إنزيم التيروزيناز في خلايا الجلد، مما يوجه إنتاج صبغة الميلانين نحو النغمات الفاتحة، ويمنح البشرة توهجاً وإشراقاً طبيعياً مع تقليل التصبغات.</p>
      <h2>لماذا التقطير الوريدي؟</h2>
      <p>تتفكك حبوب الجلوتاثيون الفموية في أحماض المعدة إلى أحماض أمينية منفصلة قبل وصولها للدم، بينما يضمن الحقن الوريدي وصول الجزيء كاملاً وفعالاً.</p>
    `,
  },
  {
    id: 4,
    title: "Gut Health & The Microbiome: Unlocking Nutrient Absorption",
    title_ar: "صحة الجهاز الهضمي والميكروبيوم: مفتاح امتصاص المغذيات",
    slug: "gut-health-and-microbiome",
    category: MOCK_CATEGORIES.nutrition,
    tags: ["Gut Health", "Microbiome", "Metabolism", "Digestion"],
    excerpt:
      "How systemic inflammation and gut permeability compromise nutrient absorption, and why functional medicine prioritizes gut restoration.",
    excerpt_ar:
      "كيف تؤدي نفاذية الأمعاء والالتهابات الخفية إلى إعاقة امتصاص الغذاء، ولماذا يضع الطب الوظيفي صحة الأمعاء كأولية.",
    coverImage: "/Treatments/Bariatric.webp",
    author: MOCK_AUTHORS.drAhmed,
    publishedAt: "2026-03-15T14:00:00Z",
    readingTimeMinutes: 8,
    metaTitle: "Gut Health & Nutrient Absorption | Premier Health",
    metaTitle_ar: "صحة الأمعاء وامتصاص المغذيات | عيادات بريمير هيلث",
    metaDescription:
      "Explore the clinical link between microbiome balance, gut barrier integrity, and overall vitality.",
    metaDescription_ar:
      "استكشف الرابط العلمي بين توازن الميكروبيوم المعوي وصحة الجسم العامة.",
    ogImage: "/Treatments/Bariatric.webp",
    content: `
      <p class="lead">The human gastrointestinal tract is home to over 100 trillion microorganisms that regulate immunity, hormone balance, and nutrient uptake.</p>
      <h2>The 'Leaky Gut' Dilemma</h2>
      <p>When the delicate intestinal epithelial barrier is compromised by stress, processed diets, or environmental toxins, tight junctions loosen. This permits undigested food particles to enter the bloodstream, triggering systemic micro-inflammation.</p>
      <h2>Restoring Balance: The 4R Protocol</h2>
      <ul class="list-disc ps-6 space-y-2 my-4">
        <li><strong>Remove:</strong> Eliminate inflammatory food triggers and dysbiotic microbes.</li>
        <li><strong>Replace:</strong> Restore digestive enzymes and hydrochloric acid balance.</li>
        <li><strong>Reinoculate:</strong> Seed beneficial flora with targeted spore probiotics.</li>
        <li><strong>Repair:</strong> Provide L-Glutamine, zinc carnosine, and collagen peptides to rebuild mucosal lining.</li>
      </ul>
    `,
    content_ar: `
      <p class="lead">تحتضن أمعاء الإنسان أكثر من 100 تريليون كائن حي دقيق يشكلون ما يُعرف بـ 'الميكروبيوم'، وهو المتحكم الخفي في المناعة، والهرمونات، والامتصاص الغذائي.</p>
      <h2>معضلة 'نفاذية الأمعاء' (Leaky Gut)</h2>
      <p>عندما تتأثر بطانة الأمعاء الحساسة بسبب الإجهاد المستمر أو الأغذية المصنعة، تتباعد الروابط الدقيقة بين الخلايا، مما يسمح للسموم وجزيئات الطعام غير المكتملة بالتسلل للدم مسببة التهابات مزمنة.</p>
      <h2>بروتوكول الترميم المتكامل (4R Protocol)</h2>
      <ul class="list-disc ps-6 space-y-2 my-4">
        <li><strong>الإزالة (Remove):</strong> التخلص من الأطعمة المسببة للتحسس والالتهاب.</li>
        <li><strong>الاستبدال (Replace):</strong> دعم إنزيمات الهضم وأحماض المعدة الطبيعية.</li>
        <li><strong>إعادة الاستزراع (Reinoculate):</strong> تزويد الجهاز الهضمي بالبكتيريا النافعة (Probiotics).</li>
        <li><strong>الترميم (Repair):</strong> استخدام الجلوتامين والزنك لإعادة بناء الغشاء المخاطي المعوي.</li>
      </ul>
    `,
  },
  {
    id: 5,
    title: "The Myers' Cocktail: History and Clinical Indications",
    title_ar: "كوكتيل مايرز الوريدي: تاريخه ودواعيه الطبية المثبتة",
    slug: "myers-cocktail-clinical-indications",
    category: MOCK_CATEGORIES.ivDrip,
    tags: ["Myers Cocktail", "Energy", "Electrolytes", "Fatigue"],
    excerpt:
      "An evidence-based review of Dr. John Myers' landmark formula combining magnesium, B vitamins, and vitamin C for chronic fatigue and vitality.",
    excerpt_ar:
      "مراجعة علمية لتركيبة د. جون مايرز الشهيرة التي تجمع المغنيسيوم وفيتامينات ب المركبة وفيتامين سي لعلاج الإرهاق واستعادة النشاط.",
    coverImage: "/Treatments/myers.webp",
    author: MOCK_AUTHORS.drSarah,
    publishedAt: "2026-03-16T11:15:00Z",
    readingTimeMinutes: 5,
    metaTitle: "Myers Cocktail Review | Premier Health Clinics",
    metaTitle_ar: "مراجعة دريب كوكتيل مايرز | عيادات بريمير هيلث",
    metaDescription:
      "Explore the clinical indications and proven benefits of the classic Myers Cocktail IV infusion.",
    metaDescription_ar:
      "تعرف على التركيبة الطبية والفوائد المثبتة لدريب كوكتيل مايرز الكلاسيكي.",
    ogImage: "/Treatments/myers.webp",
    content: `
      <p class="lead">Originating in the late 1960s with Baltimore physician Dr. John Myers, the 'Myers Cocktail' remains the foundational standard in clinical intravenous therapy.</p>
      <h2>The Classic Composition</h2>
      <p>A synergistic blend designed to quickly replenish cellular micronutrient deficits:</p>
      <ul class="list-disc ps-6 space-y-2 my-4">
        <li><strong>Magnesium Chloride:</strong> Promotes vascular relaxation and muscular recovery.</li>
        <li><strong>B-Complex Vitamins:</strong> Facilitates cellular carbohydrate and lipid metabolism.</li>
        <li><strong>Vitamin C (Ascorbic Acid):</strong> Boosts immune phagocytosis and collagen synthesis.</li>
        <li><strong>Calcium Gluconate:</strong> Supports neuro-muscular signaling.</li>
      </ul>
      <h2>Who Benefits Most?</h2>
      <p>Patients suffering from acute migraines, seasonal allergies, athletic overtraining, or chronic fatigue syndromes report immediate relief and revitalized physical energy.</p>
    `,
    content_ar: `
      <p class="lead">ابتكر الطبيب الأمريكي د. جون مايرز هذه التركيبة في أواخر الستينيات، لتظل حتى اليوم المعيار الذهبي الأساسي في طب العلاج الوريدي.</p>
      <h2>المكونات الأساسية للتركيبة</h2>
      <p>مزيج متكامل من العناصر المتوافقة بيولوجياً لتغذية الخلايا مباشرة:</p>
      <ul class="list-disc ps-6 space-y-2 my-4">
        <li><strong>كلوريد المغنيسيوم:</strong> يرخي الأوعية الدموية ويهدئ التشنجات العضلية.</li>
        <li><strong>مجموعة فيتامينات B:</strong> تدعم الجهاز العصبي وتحويل الغذاء إلى طاقة حيوية.</li>
        <li><strong>فيتامين C عالي النقاوة:</strong> يعزز نشاط الخلايا المناعية وتكوين الكولاجين.</li>
        <li><strong>جلوكونات الكالسيوم:</strong> تعزز توازن الإشارات العصبية والعضلية.</li>
      </ul>
      <h2>الفئات الأكثر استفادة</h2>
      <p>يساعد كوكتيل مايرز المراجعين الذين يعانون من الصداع النصفي، والإجهاد البدني بعد التمارين الشاقة، وحالات الإرهاق المستمر بفضل سرعة تأثيره وتوازنه الطبي الدقيق.</p>
    `,
  },
  {
    id: 6,
    title: "HydraFacial vs Clinical Peels: Choosing Your Ideal Skin Protocol",
    title_ar: "هيدرافيشل أم التقشير الكيميائي: اختيار البروتوكول الأنسب لبشرتك",
    slug: "hydrafacial-vs-clinical-peels",
    category: MOCK_CATEGORIES.aesthetic,
    tags: ["HydraFacial", "Dermatology", "Skincare", "Rejuvenation"],
    excerpt:
      "Comparing vortex-fusion suction technology with medical chemical peels to determine the best treatment for your dermatological goals.",
    excerpt_ar:
      "مقارنة طبية بين تقنية تنظيف المسام بالدوامة المائية (Vortex) وجلسات التقشير الكيميائي الطبي لتحقيق نضارة البشرة بدون فترة نقاهة.",
    coverImage: "/Derma/HYDRAFACIAL.webp",
    author: MOCK_AUTHORS.team,
    publishedAt: "2026-03-17T16:45:00Z",
    readingTimeMinutes: 6,
    metaTitle: "HydraFacial vs Chemical Peels | Premier Health",
    metaTitle_ar: "هيدرافيشل أم التقشير الكيميائي | عيادات بريمير هيلث",
    metaDescription:
      "Learn how to choose between gentle deep hydration or resurfacing chemical peels for optimal complexion health.",
    metaDescription_ar:
      "دليلك الطبي للاختيار بين التنظيف العميق بالهيدرافيشل أو جلسات التقشير الطبي المتخصصة.",
    ogImage: "/Derma/HYDRAFACIAL.webp",
    content: `
      <p class="lead">Maintaining radiant, youthful skin requires choosing the right professional treatment tailored to your skin barrier condition and schedule.</p>
      <h2>HydraFacial: Gentle Vortex Infusion</h2>
      <p>Utilizing patented Vortex-Fusion technology, HydraFacial simultaneously cleanses pores, extracts blackheads painlessly, and saturates the skin with antioxidants, peptides, and hyaluronic acid. It requires zero downtime, making it ideal for event preparation.</p>
      <h2>Clinical Peels: Targeted Resurfacing</h2>
      <p>Chemical peels (such as glycolic, salicylic, or TCA peels) chemically dissolve the bonds holding dead stratum corneum cells together, stimulating cellular turnover. They are superior for stubborn hyperpigmentation and fine lines, though they require 3-7 days of healing.</p>
    `,
    content_ar: `
      <p class="lead">تتطلب العناية بالبشرة المتقدمة اختيار الإجراء السريري الدقيق الذي يناسب طبيعة الحاجز الجلدي وجدول حياتك اليومية.</p>
      <h2>تقنية الهيدرافيشل (HydraFacial)</h2>
      <p>تعتمد على تقنية الدوامة المائية المسجلة لبراءات الاختراع لتنظيف المسام بعمق واستخراج الرؤوس السوداء بدون ألم، مع غمر البشرة في نفس الوقت بمضادات الأكسدة وحمض الهيالورونيك والبيبتيدات. لا تتطلب أي فترة نقاهة (Zero Downtime).</p>
      <h2>التقشير الطبي الكيميائي (Chemical Peels)</h2>
      <p>يعمل التقشير بأحماض الفواكه أو حمض الساليسيليك أو TCA على تفكيك الروابط بين خلايا الجلد الميتة لتحفيز انقسام وتجدد الخلايا. يعتبر مثالياً لعلاج التصبغات العميقة وآثار الحبوب والخطوط الدقيقة، ولكنه قد يتطلب فترة تعافٍ من 3 إلى 7 أيام.</p>
    `,
  },
];

function getMockArticlesList(
  params: ArticlesQueryParams = {},
): ArticlesListResponse {
  let filtered = [...MOCK_ARTICLES];

  if (params.category) {
    filtered = filtered.filter((a) => a.category?.slug === params.category);
  }

  const page = params.page && params.page > 0 ? params.page : 1;
  const pageSize =
    params.page_size && params.page_size > 0 ? params.page_size : 12;
  const startIndex = (page - 1) * pageSize;
  const results = filtered.slice(startIndex, startIndex + pageSize);

  return {
    count: filtered.length,
    next: startIndex + pageSize < filtered.length ? `?page=${page + 1}` : null,
    previous: page > 1 ? `?page=${page - 1}` : null,
    results: results.map(
      ({ content, content_ar, ...summary }) => summary as ArticleSummary,
    ),
  };
}

function getMockArticleDetail(slug: string): ArticleDetail | null {
  const found = MOCK_ARTICLES.find((a) => a.slug === slug);
  if (!found) return null;

  const related = MOCK_ARTICLES.filter((a) => a.slug !== slug)
    .slice(0, 3)
    .map(({ content, content_ar, ...summary }) => summary as ArticleSummary);

  return {
    ...found,
    relatedArticles: related,
  };
}

/**
 * Fetches paginated articles list with optional filters.
 * Seamlessly falls back to rich mock data if API is offline or unpopulated.
 */
export async function fetchArticles(
  params: ArticlesQueryParams = {},
): Promise<ArticlesListResponse> {
  try {
    const res = await api.get<ArticlesListResponse>("/articles/", { params });
    if (res.data && res.data.results && res.data.results.length > 0) {
      return res.data;
    }
  } catch (error) {
    console.warn(
      "[API] /articles/ returned error, using fallback data:",
      (error as any)?.message,
    );
  }
  return getMockArticlesList(params);
}

/**
 * Fetches a single article detail by slug.
 * Seamlessly falls back to rich mock data if API is offline or unpopulated.
 */
export async function fetchArticle(slug: string): Promise<ArticleDetail> {
  try {
    const res = await api.get<ArticleDetail>(`/articles/${slug}/`);
    if (res.data && res.data.title) {
      return res.data;
    }
  } catch (error) {
    console.warn(
      `[API] /articles/${slug}/ returned error, using fallback:`,
      (error as any)?.message,
    );
  }

  const mock = getMockArticleDetail(slug);
  if (mock) return mock;

  throw new Error(`Article not found: ${slug}`);
}

/**
 * Fetches all article slugs for generateStaticParams.
 */
export async function fetchAllArticleSlugs(): Promise<{ slug: string }[]> {
  try {
    const data = await fetchArticles({ page_size: 1000 });
    return data.results.map((a) => ({ slug: a.slug }));
  } catch {
    return MOCK_ARTICLES.map((a) => ({ slug: a.slug }));
  }
}

/**
 * Fetches all article categories.
 */
export async function fetchArticleCategories(): Promise<ArticleCategory[]> {
  try {
    const res = await api.get<ArticleCategory[]>("/articles/categories/");
    if (res.data && res.data.length > 0) return res.data;
  } catch {}
  return Object.values(MOCK_CATEGORIES);
}

// ─── Slug Redirect ────────────────────────────────────────────────────

export type SlugContentType = "ivdripproduct" | "article";

export interface SlugRedirectResult {
  newSlug: string;
  contentType: SlugContentType;
}

/**
 * Check if an old slug has a 301 redirect registered.
 * Used by: middleware.ts
 * Returns null when no redirect exists (proceed normally).
 */
export async function checkSlugRedirect(
  oldSlug: string,
  contentType: SlugContentType,
): Promise<SlugRedirectResult | null> {
  try {
    const res = await api.get<SlugRedirectResult>("/slug-redirect/", {
      params: { old_slug: oldSlug, content_type: contentType },
    });
    return res.data;
  } catch {
    return null;
  }
}
