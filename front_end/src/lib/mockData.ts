import { Department, Doctor, Service, Branch } from "./types";

// MOCK DATASETS (Fallback if Django API is offline)
export const MOCK_DEPARTMENTS: Department[] = [
  {
    id: "dep1",
    name: "IV Drip Therapy",
    name_ar: "العلاج بالتقطير الوريدي",
    slug: "iv-therapy",
    doctorsCount: 6,
    description:
      "Rejuvenating vitamin and nutrient infusions delivered directly to your bloodstream for maximum absorption.",
    description_ar:
      "علاجات تسريب الفيتامينات والمغذيات المباشرة لمجرى الدم لتحقيق أعلى درجات الامتصاص والنشاط الخلوي الفوري.",
    photo: "/Departments/iv_theapy.webp",
  },
  {
    id: "dep2",
    name: "Dermatology",
    name_ar: "الجلدية والعناية بالبشرة",
    slug: "dermatology",
    doctorsCount: 6,
    description:
      "Expert diagnostic care for skin conditions, anti-aging therapies, and medical dermatology solutions.",
    description_ar:
      "تشخيص وعلاج الحالات الجلدية بأحدث أجهزة الليزر وحلول مكافحة الشيخوخة والنضارة السريرية المتقدمة.",
    photo: "/Departments/dermatology.webp",
  },
  {
    id: "dep3",
    name: "Aesthetics",
    name_ar: "الطب التجميلي",
    slug: "aesthetics",
    doctorsCount: 6,
    description:
      "Non-surgical clinical aesthetic enhancements, premium fillers, wrinkle reduction, and volume restoration.",
    description_ar:
      "علاجات تجميلية متقدمة بدون جراحة، حقن الفيلر والبوتوكس، شد الوجه وتجديد شباب الملامح بدقة فائقة.",
    photo: "/Departments/Aesthetics.webp",
  },
  {
    id: "dep4",
    name: "Body & Medical",
    name_ar: "نحت القوام والعناية الطبية",
    slug: "body-contouring",
    doctorsCount: 6,
    description:
      "Advanced non-invasive contouring treatments to tone, firm, and sculpt the body with precision.",
    description_ar:
      "أحدث بروتوكولات نحت وتنسيق القوام غير الجراحية لشد العضلات وتفتيت الدهون واستعادة الرشاقة المثالية.",
    photo: "/Departments/body_medical.webp",
  },
];

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: "doc1",
    name: "Dr. Sarah Al-Mansoor",
    name_ar: "د. سارة المنصور",
    specialty: "IV Wellness & Micronutrition",
    specialty_ar: "العلاج بالوريد والتغذية العلاجية",
    position: "Senior Clinical Director",
    position_ar: "المدير الطبي الإكلينيكي",
    languages: ["English", "Arabic", "French"],
    languages_ar: ["الإنجليزية", "العربية", "الفرنسية"],
    experience: 14,
    gender: "Female",
    branch: "Dubai Medical Harbour",
    branch_ar: "مرسى دبي الطبي",
    slug: "dr-sarah-al-mansoor",
    bio: "Pioneer in customized intravenous therapies and preventative longevity medicine with over a decade of clinical excellence across Zurich, London, and the GCC.",
    bio_ar:
      "رائدة في العلاجات الوريدية التخصصية وطب مكافحة الشيخوخة والوقاية، بخبرة تزيد عن 14 عاماً في مراكز طبية مرموقة بزيورخ ولندن ودول الخليج.",
    photo: "/hero/hero1.webp",
    certifications: [
      "Board Certified in Anti-Aging & Regenerative Medicine (ABAARM)",
      "Fellowship in Metabolic & Nutritional Medicine (MMI)",
      "UK GMC Specialist Register",
    ],
    certifications_ar: [
      "البورد الأمريكي في طب مكافحة الشيخوخة والتجديد",
      "زمالة الطب الأيضي والغذائي المتقدم",
      "عضو السجل التخصصي للمجلس الطبي البريطاني",
    ],
    schedule: ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"],
    rating: 4.95,
    patients: 2400,
    education: [
      "MD, King's College London School of Medicine",
      "MSc in Clinical Nutrition, University of Oxford",
    ],
    specializations: [
      "High-Dose NAD+ Therapies",
      "Cellular Detoxification Protocols",
      "Executive Immune Optimization",
      "Post-Surgical IV Recovery",
    ],
  },
  {
    id: "doc2",
    name: "Dr. Elena Vance",
    name_ar: "د. إيلينا فانس",
    specialty: "Aesthetic Dermatology & Lasers",
    specialty_ar: "الجلدية التجميلية والعلاج بالليزر",
    position: "Lead Consultant Dermatologist",
    position_ar: "استشاري أول الأمراض الجلدية والتجميل",
    languages: ["English", "Spanish", "Arabic"],
    languages_ar: ["الإنجليزية", "الإسبانية", "العربية"],
    experience: 16,
    gender: "Female",
    branch: "Fairmont Nile City",
    branch_ar: "فيرمونت نايل سيتي",
    slug: "dr-elena-vance",
    bio: "Internationally renowned aesthetic dermatologist specializing in subtle facial rejuvenation, advanced skin remodeling, and cutting-edge energy devices.",
    bio_ar:
      "استشارية دولية متميزة في علاج وتجميل الجلد، متخصصة في تجديد نضارة الوجه الطبيعية وعلاجات الليزر المتقدمة بأعلى المعايير العالمية.",
    photo: "/hero/hero2.webp",
    certifications: [
      "European Board of Dermatology & Venereology (EBDV)",
      "Fellow, American Academy of Dermatology (FAAD)",
      "Diploma in Aesthetic Medicine, Paris Descartes",
    ],
    certifications_ar: [
      "البورد الأوروبي في الأمراض الجلدية والتناسلية",
      "زمالة الأكاديمية الأمريكية للأمراض الجلدية",
      "دبلوم الطب التجميلي من جامعة باريس ديكارت",
    ],
    schedule: ["Sunday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    rating: 4.98,
    patients: 3100,
    education: [
      "MD with Distinction, Complutense University of Madrid",
      "Residency in Dermatology, Hospital Clínico San Carlos",
    ],
    specializations: [
      "Subtle Full-Face Harmonization",
      "Hybrid Laser Resurfacing",
      "Targeted Melasma & Pigmentation Therapies",
      "Biostimulator Treatments (Sculptra / Radiesse)",
    ],
  },
  {
    id: "doc3",
    name: "Dr. Marcus Thorne",
    name_ar: "د. ماركوس ثورن",
    specialty: "Regenerative & Anti-Aging Medicine",
    specialty_ar: "الطب التجديدي ومكافحة الشيخوخة",
    position: "Senior Medical Consultant",
    position_ar: "استشاري أول الطب التجديدي",
    languages: ["English", "German", "Arabic"],
    languages_ar: ["الإنجليزية", "الألمانية", "العربية"],
    experience: 20,
    gender: "Male",
    branch: "Arkan Plaza",
    branch_ar: "أركان بلازا",
    slug: "dr-marcus-thorne",
    bio: "Distinguished practitioner in functional medicine and cellular vitality, dedicated to optimizing metabolic performance and systemic well-being for high-performing individuals.",
    bio_ar:
      "طبيب استشاري رائد في الطب الوظيفي والحيوي، يكرس خبرته لتعزيز النشاط الأيضي والحيوي للوصول إلى أعلى مستويات الأداء البدني والذهني.",
    photo: "/hero/hero3.webp",
    certifications: [
      "German Board of Internal Medicine (Facharzt)",
      "Institute for Functional Medicine Certified Practitioner (IFMCP)",
      "International Society of Regenerative Medicine Member",
    ],
    certifications_ar: [
      "البورد الألماني في الأمراض الباطنية",
      "شهادة معهد الطب الوظيفي الأمريكي (IFMCP)",
      "عضو الجمعية الدولية للطب التجديدي",
    ],
    schedule: ["Monday", "Tuesday", "Wednesday", "Saturday", "Sunday"],
    rating: 4.92,
    patients: 2800,
    education: [
      "Doctor of Medicine, Charité University Hospital Berlin",
      "Fellowship in Regenerative Sciences, Heidelberg University",
    ],
    specializations: [
      "NAD+ Mitochondrial Rejuvenation",
      "Cardiometabolic Optimization",
      "Executive Stress Reversal",
      "Heavy Metal Detoxification Therapies",
    ],
  },
  {
    id: "doc4",
    name: "Dr. Tariq Al-Hashimi",
    name_ar: "د. طارق الهاشمي",
    specialty: "Body Contouring & Non-Surgical Aesthetics",
    specialty_ar: "نحت القوام والتجميل الطبي غير الجراحي",
    position: "Consultant Physician",
    position_ar: "طبيب استشاري",
    languages: ["English", "Arabic"],
    languages_ar: ["الإنجليزية", "العربية"],
    experience: 12,
    gender: "Male",
    branch: "EDNC Sodic",
    branch_ar: "سوديك EDNC",
    slug: "dr-tariq-al-hashimi",
    bio: "Expert in body sculpting technologies, muscle toning, and localized fat management through state-of-the-art non-invasive medical modalities.",
    bio_ar:
      "خبير رائد في تقنيات نحت وتنسيق القوام وبناء العضلات والتخلص من الدهون الموضعية بأحدث الحلول الطبية غير الجراحية الفعالة والآمنة.",
    photo: "/hero/hero4.webp",
    certifications: [
      "Fellowship in Aesthetic Medicine, Queen Mary University London",
      "Board Certified in Physical Medicine & Rehabilitation",
      "International Association for Physicians in Aesthetic Medicine",
    ],
    certifications_ar: [
      "زمالة الطب التجميلي من جامعة كوين ماري لندن",
      "البورد التخصصي في الطب الطبيعي وإعادة التأهيل",
      "عضو الرابطة الدولية لأطباء التجميل",
    ],
    schedule: ["Sunday", "Monday", "Wednesday", "Thursday", "Saturday"],
    rating: 4.89,
    patients: 1900,
    education: [
      "MBBS, Cairo University Faculty of Medicine",
      "Postgraduate Diploma in Aesthetic Medicine, University of London",
    ],
    specializations: [
      "HIFU Deep Tissue Tightening",
      "Targeted Cryolipolysis & RF Sculpting",
      "Cellulite Smoothing Protocols",
      "Post-Bariatric Skin Optimization",
    ],
  },
];

export const MOCK_SERVICES: Service[] = [
  {
    id: "iv-myers",
    name: "Myers' Cocktail Gold Standard",
    name_ar: "محلول مايرز الذهبي الأصلي",
    slug: "myers-cocktail",
    price: 180,
    photo: "/Treatments/myers.webp",
    description:
      "The world-renowned original IV wellness infusion balancing high-potency B-complex vitamins, magnesium, calcium, and ascorbic acid to eliminate fatigue and boost vitality.",
    description_ar:
      "المحلول الوريدي الأصلي الأكثر شهرة عالمياً بمزيج متوازن من فيتامينات ب المركبة، المغنيسيوم، الكالسيوم وفيتامين سي لاستعادة الحيوية والنشاط ومكافحة الإرهاق.",
    ingredients:
      "Magnesium Chloride, Calcium Gluconate, Thiamine (B1), Riboflavin (B2), Pyridoxine (B6), Niacinamide, D-Panthenol, Ascorbic Acid (Vitamin C)",
    ingredients_ar:
      "كلوريد المغنيسيوم، جلوكونات الكالسيوم، ثيامين (ب1)، ريبوفلافين (ب2)، بيريدوكسين (ب6)، نياسيناميد، دي-بانثينول، فيتامين سي النقي",
    category: "iv-therapy",
    benefits: [
      "Rapidly combats acute and chronic physical fatigue",
      "Supports healthy nerve function and muscle relaxation",
      "Promotes deep hydration and immune resilience",
      "Restores micronutrient balance immediately",
    ],
    benefits_ar: [
      "مكافحة فورية للإجهاد والتعب البدني والذهني المزمن",
      "دعم صحة الأعصاب واسترخاء العضلات المشدودة",
      "ترطيب عميق وسريع لجميع خلايا الجسم",
      "تعويض فوري لنقص الفيتامينات والمعادن الأساسية",
    ],
    process: [
      "Pre-infusion vitals check and medical consultation",
      "Custom compounding in sterile pharmacy station",
      "Relaxing 45-minute intravenous administration in private luxury suite",
      "Post-treatment hydration check",
    ],
    process_ar: [
      "فحص العلامات الحيوية واستشارة الطبيب المختص",
      "تحضير التركيبة المعقمة بدقة متناهية",
      "جلسة تسريب هادئة ومريحة لمدة 45 دقيقة في جناحك الخاص",
      "متابعة ما بعد الجلسة للتأكد من تمام الراحة والنشاط",
    ],
    faq: [
      {
        q: "How quickly will I feel the effects?",
        q_ar: "متى سأشعر بالنتائج؟",
        a: "Most patients report increased energy, mental clarity, and refreshed wellness within 1 to 2 hours following the infusion.",
        a_ar: "يشعر معظم عملائنا بارتفاع ملحوظ في مستويات الطاقة والصفاء الذهني خلال 1 إلى 2 ساعة بعد الجلسة مباشرة.",
      },
      {
        q: "Is the Myers' Cocktail safe for frequent administration?",
        q_ar: "هل يعتبر المحلول آمناً للاستخدام المتكرر؟",
        a: "Yes. Formulated with water-soluble vitamins, any excess is naturally processed by the body. Weekly or bi-weekly sessions are common for ongoing vitality.",
        a_ar: "نعم، تركيبته تعتمد على فيتامينات ذائبة في الماء يمتصها الجسم بسهولة ويتخلص من الفائض بشكل طبيعي وآمن.",
      },
    ],
    duration: undefined,
  },
  {
    id: "iv-nad",
    name: "NAD+ Longevity & Cellular Rejuvenation",
    name_ar: "محلول NAD+ لتجديد الخلايا ومكافحة الشيخوخة",
    slug: "nad-plus-infusion",
    price: 450,
    photo: "/Treatments/nad.webp",
    description:
      "Medical-grade Nicotinamide Adenine Dinucleotide (NAD+) coenzyme infusion engineered to power mitochondrial repair, enhance brain function, and promote cellular longevity.",
    description_ar:
      "تسريب إنزيم NAD+ الخلوي النقي بتركيز طبي عالي لتحفيز إصلاح الميتوكوندريا، تجديد طاقة الخلايا، وتعزيز وظائف الدماغ والشباب الدائم.",
    ingredients:
      "Pure Coenzyme NAD+ (250mg - 500mg), Sterile Balanced Electrolyte Saline Carrier",
    ingredients_ar:
      "إنزيم NAD+ النقي عالي التركيز (250 - 500 ملغ)، محلول كهرلي معقم متوازن",
    category: "iv-therapy",
    benefits: [
      "Elevates cellular ATP energy at the mitochondrial level",
      "Enhances memory, cognitive clarity, and mental endurance",
      "Activates Sirtuin longevity genes for anti-aging",
      "Supports DNA repair and metabolic optimization",
    ],
    benefits_ar: [
      "مضاعفة إنتاج طاقة ATP الخلوية في الميتوكوندريا",
      "تعزيز التركيز والذاكرة والقدرة على التفكير بصفاء",
      "تنشيط جينات السيرتوين المسؤولة عن إطالة عمر الخلايا",
      "دعم إصلاح الحمض النووي (DNA) وتسريع التمثيل الغذائي",
    ],
    process: [
      "Comprehensive medical evaluation by attending physician",
      "Carefully calibrated micro-infusion rate control",
      "Administered over 90-120 minutes in private VIP lounger",
      "Vital signs monitored continuously by specialized nurse",
    ],
    process_ar: [
      "تقييم طبي شامل من قبل الطبيب المعالج",
      "ضبط معدل التسريب الدقيق لضمان أقصى درجات الراحة",
      "جلسة تسريب على مدى 90-120 دقيقة في جناح كبار الشخصيات",
      "متابعة دورية مستمرة للمؤشرات الحيوية طوال الجلسة",
    ],
    faq: [
      {
        q: "What makes NAD+ superior to standard vitamins?",
        q_ar: "ما الذي يميز NAD+ عن الفيتامينات التقليدية؟",
        a: "NAD+ is a critical coenzyme found in every single living cell that directly fuels mitochondrial energy and repairs DNA damage that accumulates with age.",
        a_ar: "إنزيم NAD+ هو المحرك الرئيسي للطاقة في كل خلية حية، وينخفض مستواه مع التقدم في العمر، وإعادة تزويد الجسم به يجدد حيوية الخلايا مباشرة.",
      },
    ],
    duration: undefined,
  },
  {
    id: "iv-detox",
    name: "Master Detox & Glutathione Glow",
    name_ar: "محلول ديتوكس الكبد وتوهج الجلوتاثيون",
    slug: "master-detox-glutathione",
    price: 280,
    photo: "/Treatments/Detox.webp",
    description:
      "High-potency Master Antioxidant formulation combining pharmaceutical Glutathione, high-dose Ascorbic Acid, and Alpha-Lipoic Acid to eliminate oxidative stress and illuminate skin.",
    description_ar:
      "تركيبة مضادات الأكسدة الفائقة تجمع بين الجلوتاثيون الصيدلاني، جرعة عالية من فيتامين سي، وحمض الألفا ليبويك لتنقية الكبد وإشراق البشرة.",
    ingredients:
      "Setria® Pharmaceutical Glutathione (2000mg), High-Dose Vitamin C (15g), Alpha-Lipoic Acid, N-Acetylcysteine (NAC)",
    ingredients_ar:
      "جلوتاثيون صيدلاني نقي (2000 ملغ)، فيتامين سي عالي الجرعة (15 غرام)، حمض الألفا ليبويك، إن-أسيتيل سيستيين (NAC)",
    category: "iv-therapy",
    benefits: [
      "Deep hepatic detoxification and heavy-metal binding",
      "Visible reduction in skin pigmentation and dark spots",
      "Neutralizes destructive free radicals systemic-wide",
      "Enhances natural collagen synthesis and skin elasticity",
    ],
    benefits_ar: [
      "تنقية عميقة لخلايا الكبد من السموم والشوائب المتراكمة",
      "تفتيح وتوحيد لون البشرة وتقليل التصبغات والبقع الداكنة",
      "تحييد الجذور الحرة الضارة وحماية الخلايا من التلف",
      "تحفيز إنتاج الكولاجين الطبيعي وزيادة نضارة ومرونة الجلد",
    ],
    process: [
      "Consultation and antioxidant requirement assessment",
      "Slow intravenous infusion of high-dose antioxidant blend",
      "Glutathione push in final phase for maximum absorption",
      "Post-drip glowing hydration check",
    ],
    process_ar: [
      "استشارة طبية وتحديد الاحتياج الدقيق لمضادات الأكسدة",
      "تسريب وريدي بطيء لمزيج الفيتامينات ومضادات الأكسدة",
      "حقن الجلوتاثيون النقي في المرحلة الختامية لتحقيق أقصى فاعلية",
      "متابعة فورية للترطيب والانتعاش",
    ],
    faq: [
      {
        q: "How many sessions are recommended for visible skin glow?",
        q_ar: "كم عدد الجلسات الموصى بها لملاحظة نضارة البشرة؟",
        a: "A course of 4 to 6 weekly sessions typically achieves radiant, even-toned skin and comprehensive cellular detoxification.",
        a_ar: "ينصح ببرنامج من 4 إلى 6 جلسات أسبوعية للحصول على نضارة وتوهج فائق وتوحيد ملحوظ في لون البشرة.",
      },
    ],
    duration: undefined,
  },
  {
    id: "iv-bariatric",
    name: "Bariatric & Metabolic Optimization Drip",
    name_ar: "محلول دعم عمليات التكميم والتحوير",
    slug: "bariatric-drip",
    price: 300,
    photo: "/Treatments/Bariatric.webp",
    description:
      "Specialized high-bioavailability nutrient cocktail formulated to restore metabolic health, prevent post-operative deficiencies, and protect hair and nails.",
    description_ar:
      "كوكتيل مغذيات سريع الامتصاص مصمم خصيصاً للتعافي والصحة الأيضية بعد عمليات جراحة السمنة والتكميم لتعويض النقص وحماية الشعر والأظافر.",
    ingredients:
      "Active Methylcobalamin (B12), Folate, Iron, Zinc, Multi-Mineral complex, Hydrating Fluids",
    ingredients_ar:
      "فيتامين ب12 النشط، حمض الفوليك، حديد، زنك، مركب معادن نادرة، سوائل ترطيب معقمة",
    category: "iv-therapy",
    benefits: [
      "Directly addresses acute post-bariatric nutritional deficits",
      "Bypasses compromised gastrointestinal absorption",
      "Protects hair from thinning and strengthens nail health",
      "Sustains healthy metabolic and energy levels",
    ],
    benefits_ar: [
      "علاج فوري ومباشر لنقص الفيتامينات والمعادن بعد جراحات السمنة",
      "تجاوز الجهاز الهضمي والامتصاص المباشر في مجرى الدم",
      "حماية الشعر من التساقط وتقوية صحة الأظافر والجلد",
      "الحفاظ على مستويات الطاقة والنشاط ومقاومة الخمول",
    ],
    process: [
      "Blood lab work review and physician assessment",
      "Formulation custom-tailored to patient deficiency profile",
      "60-minute intravenous infusion in quiet suite",
      "Post-infusion monitoring and dietary guidance",
    ],
    process_ar: [
      "مراجعة تحاليل الدم وتقييم الطبيب المختص",
      "تخصيص تركيبة المحلول حسب النقص الموجود في التحاليل",
      "جلسة تسريب هادئة لمدة 60 دقيقة في جناح خاص",
      "متابعة العلامات وتقديم نصائح المتابعة الغذائية",
    ],
    faq: [
      {
        q: "Why is IV therapy preferred after bariatric surgery?",
        q_ar: "لماذا يفضل العلاج بالوريد بعد جراحات السمنة؟",
        a: "Bypassing the digestive tract ensures 100% absorption of vital vitamins and minerals that oral supplements cannot adequately deliver.",
        a_ar: "لأن التسريب الوريدي يتجاوز الجهاز الهضمي تماماً ويضمن وصول 100% من المغذيات إلى الدم مباشرة بدون الاعتماد على الامتصاص المعوي.",
      },
    ],
    duration: undefined,
  },
  {
    id: "der-hydra",
    name: "Medical Grade Hydrafacial MD",
    name_ar: "جلسة الهيدرافيشيل الطبية المتكاملة",
    slug: "hydrafacial",
    price: 180,
    photo: "/Departments/Aesthetics.webp",
    description:
      "Advanced multi-step vortex technology combining deep pore suction, botanical exfoliation, targeted extractions, and antioxidant infusion for glass skin.",
    description_ar:
      "تقنية الدوامة الهيدروليكية المتقدمة لتنظيف وتقشير المسام بعمق واستخلاص الشوائب وترطيب البشرة بمضادات الأكسدة والببتيدات لبشرة ناعمة ونضرة.",
    ingredients: "Hyaluronic Acid, Salicylic Acid, Glycolic Acid, Peptides",
    ingredients_ar:
      "حمض الهيالورونيك، حمض الساليسيليك، حمض الجليكوليك، ببتيدات مغذية",
    category: "dermatology",
    benefits: [
      "Painless, instant extraction of blackheads and impurities",
      "Refines enlarged pores and balances sebum production",
      "Infuses deep moisture and intense radiance",
      "Zero downtime with immediate glass-skin luminosity",
    ],
    benefits_ar: [
      "تنظيف فوري وغير مؤلم للرؤوس السوداء والشوائب والدهون",
      "تضييق وتنقية المسام الواسعة وموازنة إفراز الدهون",
      "ترطيب عميق وتغذية غنية للبشرة بالأمصال ومضادات الأكسدة",
      "نتائج فورية مذهلة ونضارة فائقة بدون أي فترة تعافي",
    ],
    process: [
      "Step 1: Vortex Cleansing & Gentle Peel",
      "Step 2: Painless Vortex Extraction of Debris",
      "Step 3: Antioxidant & Hyaluronic Acid Fusion",
      "Step 4: Custom LED Light Therapy for Collagen Activation",
    ],
    process_ar: [
      "الخطوة 1: التنظيف اللطيف والتقشير السطحي بحمض الجليكوليك",
      "الخطوة 2: استخلاص الشوائب والدهون بدون ألم بتقنية الشفط الدوامي",
      "الخطوة 3: تشبيع البشرة بحمض الهيالورونيك ومضادات الأكسدة",
      "الخطوة 4: العلاج بالضوء LED الطبي لتحفيز الكولاجين وتهدئة البشرة",
    ],
    faq: [],
    duration: undefined,
  },
  {
    id: "der-carbon",
    name: "Hollywood Carbon Laser Peel",
    name_ar: "جلسة تقشير الكربون بالليزر (هوليوود بيل)",
    slug: "carbon-laser",
    price: 220,
    photo: "/Departments/dermatology.webp",
    description:
      "Q-switched laser treatment utilizing liquid carbon paste to eliminate dead skin cells, shrink enlarged pores, and stimulate collagen synthesis.",
    description_ar:
      "علاج ليزر متطور باستخدام جزيئات الكربون الطبي لتنظيف المسام العميقة وتقشير الخلايا الميتة وتحفيز إنتاج الكولاجين لتوحيد لون وملمس البشرة.",
    ingredients: "Medical Liquid Carbon, Soothing Calming Serums",
    ingredients_ar: "لوشن الكربون الطبي، سيروم التبريد والترطيب المهدئ",
    category: "dermatology",
    benefits: [
      "Dramatically tightens dilated pores and smooths texture",
      "Controls acne breakouts and destroys bacterial build-up",
      "Brightens uneven tone and lightens surface pigmentation",
      "Stimulates dermal collagen production without peeling",
    ],
    benefits_ar: [
      "شد وتضييق المسام الواسعة وتنعيم ملمس البشرة",
      "مكافحة حب الشباب والحد من البكتيريا المسببة للالتهابات",
      "تفتيح التصبغات السطحية وتوحيد لون البشرة وإشراقها",
      "تحفيز إنتاج الكولاجين بدون تقشر مرئي أو احمرار مزعج",
    ],
    process: [
      "Application of medical liquid carbon suspension",
      "Q-switched laser pulses to vaporize carbon and debris",
      "Cooling hydration mask application",
      "Broad-spectrum medical sunscreen finishing",
    ],
    process_ar: [
      "توزيع طبقة لوشن الكربون الطبي على الوجه بالتساوي",
      "إطلاق نبضات الليزر لتفتيت جزيئات الكربون والشوائب",
      "وضع قناع الترطيب والتبريد الطبي المهدئ",
      "تطبيق واقي الشمس الطبي الفاخر لحماية النتائج",
    ],
    faq: [],
    duration: undefined,
  },
  {
    id: "der-filler",
    name: "Signature Facial Fillers & Botox",
    name_ar: "حقن الفيلر والبوتوكس التجميلية المتطورة",
    slug: "filler-botox",
    price: 350,
    photo: "/Departments/body_medical.webp",
    description:
      "Expert physician-led facial harmonization using premium FDA-approved hyaluronic acid fillers and neuromodulators for elegant, natural-looking rejuvenation.",
    description_ar:
      "علاجات تجميلية دقيقة بإشراف كبار الاستشاريين باستخدام أجود أنواع الفيلر والبوتوكس المعتمدة عالمياً لتحديد الملامح وتنعيم التجاعيد بنتيجة طبيعية متناسقة.",
    ingredients: "FDA-approved Hyaluronic Acid, Botulinum Toxin Type A",
    ingredients_ar: "حمض هيالورونيك صيدلاني معتمد، بوتولينيوم توكسين نقي",
    category: "aesthetics",
    benefits: [
      "Smooths dynamic expression lines and forehead creases",
      "Restores lost cheek and mid-face volume gracefully",
      "Defines jawline and enhances lip contour with subtlety",
      "Natural results preserving full facial mobility",
    ],
    benefits_ar: [
      "تنعيم خطوط وتجاعيد الجبهة وحول العينين بدون تجميد للملامح",
      "استعادة امتلاء ونضارة الخدين ومنطقة منتصف الوجه",
      "تحديد خط الفك وإبراز الشفاه بشكل طبيعي جذاب",
      "نتائج راقية تحافظ على تعابير الوجه الطبيعية تماماً",
    ],
    process: [
      "Detailed 3D facial assessment and anatomy mapping",
      "Topical anesthetic cream for complete patient comfort",
      "Precision micro-cannula injections by expert doctor",
      "Immediate symmetry check and aftercare plan",
    ],
    process_ar: [
      "تقييم دقيق للملامح وتحديد نقاط الحقن التشريحية بدقة",
      "وضع كريم التخدير الموضعي لضمان راحة تامة أثناء الجلسة",
      "الحقن الدقيق باستخدام الكانيولا الميكروسكوبية الآمنة",
      "مراجعة فورية لتناسق النتائج وتقديم إرشادات العناية",
    ],
    faq: [],
    duration: undefined,
  },
  {
    id: "body-hifu",
    name: "Ultra-Lift HIFU Non-Surgical Contouring",
    name_ar: "جلسة الهايفو (HIFU) لشد ونحت القوام والوجه",
    slug: "hifu",
    price: 420,
    photo: "/Departments/body_medical.webp",
    description:
      "High-Intensity Focused Ultrasound targeting the deep SMAS foundational layer to lift, tighten, and sculpt without surgery or downtime.",
    description_ar:
      "تقنية الموجات فوق الصوتية المركزة عالية الكثافة لاستهداف طبقات الجلد والنسيج الضام العميقة لشد الترهلات ونحت الملامح بدون جراحة أو فترة نقاهة.",
    ingredients:
      "High-Intensity Focused Ultrasound Energy, Medical Ultrasound Gel",
    ingredients_ar: "طاقة الموجات فوق الصوتية المركزة، جل التوصيل الطبي المهدئ",
    category: "body-contouring",
    benefits: [
      "Lifts sagging jawline, neck, and submental fullness",
      "Tightens loose skin and stimulates deep collagen matrix",
      "Long-lasting progressive improvements over 3 to 6 months",
      "Zero incisions, zero scars, and zero downtime",
    ],
    benefits_ar: [
      "شد ترهلات الفك والرقبة والتخلص من الذقن المزدوج",
      "شد الجلد المترهل وتحفيز شبكة الكولاجين العميقة لشهور",
      "نتائج مستمرة في التحسن الطبيعي على مدى 3 إلى 6 أشهر",
      "جلسة آمنة تماماً بدون أي جراحة أو ندوب أو انقطاع عن العمل",
    ],
    process: [
      "Target area marking and depth planning",
      "Application of conductive ultrasound gel",
      "Precision energy delivery across defined vector lines",
      "Immediate soothing gel application",
    ],
    process_ar: [
      "تحديد المنطقة المستهدفة وضبط عمق النبضات المطلوب",
      "وضع جل التوصيل الطبي الخاص بالأجهزة فوق الصوتية",
      "تمرير الجهاز وإطلاق النبضات الحرارية المركزة بدقة",
      "تطبيق جل الترطيب والتبريد المهدئ للبشرة",
    ],
    faq: [],
    duration: undefined,
  },
];

export const MOCK_BRANCHES: Branch[] = [
  {
    id: "br1",
    name: "Fairmont Nile City",
    name_ar: "فيرمونت نايل سيتي",
    address: "Fairmont Nile City Hotel, Nile Corniche, Cairo, Egypt",
    address_ar: "فندق فيرمونت نايل سيتي، كورنيش النيل، القاهرة، مصر",
    phone: "+20 120 064 4663",
    hours: "09:00 AM - 09:00 PM (Daily)",
    hours_ar: "09:00 ص - 09:00 م (يومياً)",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.1118122394747!2d31.226330076296766!3d30.062333974914194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840e676101c51%3A0xc3f3b92cbfa9e7b!2sFairmont%20Nile%20City!5e0!3m2!1sen!2seg!4v1710000000000!5m2!1sen!2seg",
    mapUrl:
      "https://www.google.com/maps/place/Premier+Health/@30.0723728,31.2267631,18z/data=!4m6!3m5!1s0x1458413b92031a19:0xe4dfaac55744481b!8m2!3d30.0719202!4d31.2275839!16s%2Fg%2F11fjy46mpx?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D",
    photo: "/AboutPreview/about.webp",
    country: "Egypt 🇪🇬",
    services: ["IV Therapy", "Dermatology", "Aesthetics", "Body Contouring"],
  },
  {
    id: "br2",
    name: "EDNC Sodic",
    name_ar: "سوديك EDNC",
    address: "EDNC Commercial Complex, Sodic Development, New Cairo, Egypt",
    address_ar: "مجمع EDNC التجاري، مشروع سوديك، القاهرة الجديدة، مصر",
    phone: "+20 120 064 4663",
    hours: "10:00 AM - 10:00 PM (Daily)",
    hours_ar: "10:00 ص - 10:00 م (يومياً)",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.1235122394747!2d31.486330076296766!3d30.023333974914194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145823126fefeb8b%3A0x6e9f16d1cd78df22!2sEDNC%20Sodic!5e0!3m2!1sen!2seg!4v1710000000000!5m2!1sen!2seg",
    mapUrl:
      "https://google.com/maps?q=2G87+5RC+D+solutions,+Eastown,+New+Cairo+1,+Cairo+Government+4728114&ftid=0x1458230004fbc3e3:0x98b9fb5e4bf6a4f4&entry=gps&shh=CAE&lucs=,94297699,94275415,94231188,94280568,47071704,94218641,94282134,94286869&g_ep=CAISEjI2LjAzLjEuODU1MjUwMDQwMBgAIIgnKkgsOTQyOTc2OTksOTQyNzU0MTUsOTQyMzExODgsOTQyODA1NjgsNDcwNzE3MDQsOTQyMTg2NDEsOTQyODIxMzQsOTQyODY4NjlCAkVH&skid=f7e4aece-800e-42dc-9b0c-031178891e80&g_st=ic",
    photo: "/AboutPreview/about_slider1.webp",
    country: "Egypt 🇪🇬",
    services: ["IV Therapy", "Aesthetics", "Dermatology"],
  },
  {
    id: "br3",
    name: "Arkan Plaza",
    name_ar: "أركان بلازا",
    address: "Building 4, Arkan Plaza, Sheikh Zayed City, Giza, Egypt",
    address_ar: "مبنى 4، أركان بلازا، مدينة الشيخ زايد، الجيزة، مصر",
    phone: "+20 120 064 4663",
    hours: "10:00 AM - 10:00 PM (Daily)",
    hours_ar: "10:00 ص - 10:00 م (يومياً)",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.5123122394747!2d30.996330076296766!3d29.983333974914194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145851234fefeb8b%3A0x6e9f16d1cd78df23!2sArkan%20Plaza!5e0!3m2!1sen!2seg!4v1710000000000!5m2!1sen!2seg",
    mapUrl:
      "https://www.google.com/maps/place/Premier+Health/@30.0125,30.9963,17z",
    photo: "/AboutPreview/about_slider2.webp",
    country: "Egypt 🇪🇬",
    services: ["IV Therapy", "Dermatology"],
  },
  {
    id: "br4",
    name: "Dubai Medical Harbour",
    name_ar: "مرسى دبي الطبي",
    address: "Penthouse Level, Marina Heights, Dubai Marina, UAE",
    address_ar:
      "طابق البنتهاوس، مارينا هايتس، مرسى دبي، الإمارات العربية المتحدة",
    phone: "+971 50 120 0313",
    hours: "09:00 AM - 09:00 PM (Daily)",
    hours_ar: "09:00 ص - 09:00 م (يومياً)",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.6123122394747!2d55.136330076296766!3d25.083333974914194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f1234fefeb8b%3A0x6e9f16d1cd78df24!2sDubai%20Marina!5e0!3m2!1sen!2sae!4v1710000000000!5m2!1sen!2sae",
    mapUrl: "https://maps.google.com/?q=Dubai+Marina+Medical+Centre",
    photo: "/AboutPreview/about_slider3.webp",
    country: "UAE 🇦🇪",
    services: ["IV Therapy", "Aesthetics", "Dermatology", "Body Contouring"],
  },
];

export const MOCK_GALLERY = [
  {
    id: "g1",
    title: "Fairmont Nile City Reception",
    title_ar: "استقبال فرع فيرمونت نايل سيتي",
    category: "facility",
    image: "/AboutPreview/about.webp",
    description:
      "Welcome to our Fairmont Nile City sanctuary, featuring elegant design and panoramic Nile views.",
    description_ar:
      "مرحباً بكم في ملاذنا بفيرمونت نايل سيتي، الذي يتميز بتصميم أنيق وإطلالات بانورامية على النيل.",
  },
  {
    id: "g2",
    title: "Elite IV Drip Treatment Suite",
    title_ar: "جناح العلاج بالتقطير الوريدي المتميز",
    category: "facility",
    image: "/AboutPreview/about_slider1.webp",
    description:
      "Private IV therapy suites designed for ultimate comfort and cell rejuvenation.",
    description_ar:
      "أجنحة العلاج الوريدي الخاصة المصممة لتوفير أقصى درجات الراحة وتجديد الخلايا.",
  },
  {
    id: "g3",
    title: "Advanced Aesthetic Treatment",
    title_ar: "علاج تجميلي متطور للوجه",
    category: "treatment",
    image: "/AboutPreview/about_slider2.webp",
    description:
      "Skincare professionals performing signature micro-needling and facial rejuvenation.",
    description_ar:
      "أخصائيو البشرة يقومون بعلاجات الإبر الدقيقة المتميزة وتجديد خلايا الوجه.",
  },
  {
    id: "g4",
    title: "Clinical Consultation Office",
    title_ar: "مكتب الاستشارات الطبية",
    category: "facility",
    image: "/AboutPreview/about_slider3.webp",
    description:
      "Comfortable and professional consultation environment to plan your wellness journey.",
    description_ar: "بيئة استشارية مريحة ومهنية لتخطيط رحلة العافية الخاصة بك.",
  },
  {
    id: "g5",
    title: "Premium IV Drip Infusion",
    title_ar: "تسريب الفيتامينات بالوريد الفاخر",
    category: "treatment",
    image: "/Departments/iv_theapy.webp",
    description:
      "Cellular rejuvenation formulations engineered to restore your body.",
    description_ar: "تركيبات تجديد الخلايا المصممة لاستعادة نشاط جسمك وحيويته.",
  },
  {
    id: "g6",
    title: "Advanced Laser Resurfacing Laser System",
    title_ar: "جهاز الليزر المتطور لتجديد البشرة",
    category: "equipment",
    image: "/Departments/dermatology.webp",
    description:
      "State-of-the-art dermatological equipment to guarantee safe and precise outcomes.",
    description_ar:
      "أحدث المعدات والأجهزة الجلدية لضمان نتائج آمنة ودقيقة تماماً.",
  },
  {
    id: "g7",
    title: "Professional Dermatology Examination",
    title_ar: "الفحص الجلدي المهني الدقيق",
    category: "treatment",
    image: "/Departments/Aesthetics.webp",
    description:
      "Comprehensive medical and cosmetic skin analysis by our elite consultants.",
    description_ar: "تحليل طبي وتجميلي شامل للبشرة بواسطة نخبة من استشاريينا.",
  },
];
