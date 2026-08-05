import {
  Department,
  Doctor,
  Service,
  Branch,
  Appointment,
  Payment,
  TestimonialItem,
} from "./types";

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
      "تسريب الفيتامينات والمغذيات مباشرة في مجرى الدم لضمان أقصى درجات الامتصاص والاستفادة.",
    photo: "/Departments/iv_theapy.webp",
  },
  {
    id: "dep2",
    name: "Dermatology",
    name_ar: "الأمراض الجلدية",
    slug: "dermatology",
    doctorsCount: 6,
    description:
      "Expert diagnostic care for skin conditions, anti-aging therapies, and medical dermatology solutions.",
    description_ar:
      "رعاية تشخيصية متخصصة للأمراض الجلدية وعلاجات مكافحة الشيخوخة والحلول الطبية المتكاملة.",
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
      "تحسينات تجميلية سريرية غير جراحية، فيلر ممتاز، تقليل التجاعيد واستعادة حيوية البشرة.",
    photo: "/Departments/Aesthetics.webp",
  },
  {
    id: "dep4",
    name: "Body Contouring",
    name_ar: "نحت وتنسيق القوام",
    slug: "body-contouring",
    doctorsCount: 6,
    description:
      "State-of-the-art body sculpting, localized fat reduction, and advanced tissue tightening protocols.",
    description_ar:
      "أحدث تقنيات نحت الجسم، تقليل الدهون الموضعية، وبروتوكولات شد الترهلات المتطورة.",
    photo: "/Departments/body_medical.webp",
  },
];

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: "doc1",
    name: "Dr. Bassant",
    name_ar: "د. بسنت",
    specialty: "Dermatology, Aesthetics, IV Therapy & Body Contouring",
    specialty_ar: "الأمراض الجلدية، التجميل، العلاج الوريدي وتنسيق القوام",
    position: "Senior Medical Consultant",
    position_ar: "استشاري أول",
    languages: ["English", "Arabic"],
    languages_ar: ["الإنجليزية", "العربية"],
    experience: 16,
    gender: "Female",
    branch: "Fairmont Nile City",
    branch_ar: "فيرمونت نايل سيتي",
    slug: "dr-bassant",
    bio: "Dr. Bassant is a board-certified specialist with extensive experience across all our medical departments.",
    bio_ar:
      "الدكتورة بسنت هي أخصائية معتمدة تتمتع بخبرة واسعة في جميع أقسامنا الطبية.",
    photo: "/doctors/bassant.jpg",
    certifications: [
      "MD in Clinical Dermatology",
      "European Board of Dermatology",
      "Laser Specialist Certification",
    ],
    certifications_ar: [
      "دكتوراه الجلدية السريرية",
      "البورد الأوروبي للأمراض الجلدية",
      "شهادة متخصص العلاج بالليزر",
    ],
    schedule: [
      "Monday: 10:00 AM - 04:00 PM",
      "Wednesday: 02:00 PM - 08:00 PM",
      "Saturday: 12:00 PM - 06:00 PM",
    ],
    rating: 4.9,
    patients: 2400,
    education: [
      "MD, Faculty of Medicine, Cairo University",
      "Fellowship in Dermatology, London (2012)",
      "European Board of Dermatology — Berlin (2014)",
    ],
    specializations: [
      "Fractional CO2 Laser Resurfacing",
      "Biostimulator Injections",
      "Medical-grade Chemical Peels",
      "HydraFacial & Skin Boosters",
    ],
  },
  {
    id: "doc2",
    name: "Dr. Olivia",
    name_ar: "د. أوليفيا",
    specialty: "Dermatology, Aesthetics, IV Therapy & Body Contouring",
    specialty_ar: "الأمراض الجلدية، التجميل، العلاج الوريدي وتنسيق القوام",
    position: "Aesthetic & Wellness Specialist",
    position_ar: "أخصائية الطب التجميلي والعافية",
    languages: ["English", "Arabic", "French"],
    languages_ar: ["الإنجليزية", "العربية", "الفرنسية"],
    experience: 11,
    gender: "Female",
    branch: "EDNC Sodic",
    branch_ar: "سوديك EDNC",
    slug: "dr-olivia",
    bio: "Dr. Olivia brings her artistic touch to aesthetic medicine and extensive knowledge in wellness treatments.",
    bio_ar:
      "تضفي الدكتورة أوليفيا لمستها الفنية على الطب التجميلي ومعرفتها الواسعة في علاجات العافية.",
    photo: "/doctors/olivia.jpg",
    certifications: [
      "MSc in Aesthetic Medicine",
      "American Academy of Aesthetic Medicine",
      "Thread Lifting Expert Certification",
    ],
    certifications_ar: [
      "ماجستير الطب التجميلي",
      "عضوية الأكاديمية الأمريكية لطب التجميل",
      "شهادة خبير شد الوجه",
    ],
    schedule: [
      "Sunday: 11:00 AM - 05:00 PM",
      "Tuesday: 01:00 PM - 07:00 PM",
      "Thursday: 10:00 AM - 04:00 PM",
    ],
    rating: 5.0,
    patients: 1800,
    education: [
      "MBBCh, Faculty of Medicine",
      "MSc Aesthetic Medicine, London (2017)",
      "AAAM Fellowship (2019)",
    ],
    specializations: [
      "Full-face Liquid Facelift",
      "Botox Contouring & Slimming",
      "Advanced Dermal Fillers",
      "PDO Thread Lifting",
    ],
  },
  {
    id: "doc3",
    name: "Dr. Rama",
    name_ar: "د. راما",
    specialty: "Dermatology, Aesthetics, IV Therapy & Body Contouring",
    specialty_ar: "الأمراض الجلدية، التجميل، العلاج الوريدي وتنسيق القوام",
    position: "Clinical Director",
    position_ar: "المدير الطبي",
    languages: ["English", "Arabic"],
    languages_ar: ["الإنجليزية", "العربية"],
    experience: 19,
    gender: "Female",
    branch: "Arkan Plaza",
    branch_ar: "أركان بلازا",
    slug: "dr-rama",
    bio: "Dr. Rama is an international authority in aesthetic enhancements and cellular rejuvenation.",
    bio_ar: "الدكتورة راما خبيرة دولية في التحسينات التجميلية وتجديد الخلايا.",
    photo: "/doctors/rama.jpg",
    certifications: [
      "Board in Anti-Aging Medicine",
      "MD in Clinical Wellness",
      "International Therapy Association",
    ],
    certifications_ar: [
      "البورد في طب مكافحة الشيخوخة",
      "دكتوراه العافية السريرية",
      "الجمعية الدولية للعلاج",
    ],
    schedule: [
      "Monday: 09:00 AM - 03:00 PM",
      "Thursday: 03:00 PM - 09:00 PM",
      "Saturday: 10:00 AM - 04:00 PM",
    ],
    rating: 4.8,
    patients: 3200,
    education: [
      "MD, University of Munich",
      "Fellowship, Anti-Aging Medicine (2009)",
      "Wellness Certification (2015)",
    ],
    specializations: [
      "Cellular Rejuvenation Protocols",
      "Bespoke Nutrition Formulations",
      "Immunology & Functional Medicine",
      "Micronutrient Therapy",
    ],
  },
  {
    id: "doc4",
    name: "Dr. Sherehan",
    name_ar: "د. شريهان",
    specialty: "Dermatology, Aesthetics, IV Therapy & Body Contouring",
    specialty_ar: "الأمراض الجلدية، التجميل، العلاج الوريدي وتنسيق القوام",
    position: "Lead Sculpting Specialist",
    position_ar: "أخصائية نحت القوام",
    languages: ["English", "Arabic", "Spanish"],
    languages_ar: ["الإنجليزية", "العربية", "الإسبانية"],
    experience: 9,
    gender: "Female",
    branch: "Fairmont Nile City",
    branch_ar: "فيرمونت نايل سيتي",
    slug: "dr-sherehan",
    bio: "Dr. Sherehan specializes in non-surgical treatments achieving structured skin-tightening and overall wellness.",
    bio_ar:
      "تتخصص الدكتورة شريهان في العلاجات غير الجراحية لشد الجلد والعافية الشاملة.",
    photo: "/doctors/sherehan.jpg",
    certifications: [
      "BSc in Physical Therapy & Contouring",
      "Board of Aesthetic Sculpting",
      "Advanced Practitioner Diploma",
    ],
    certifications_ar: [
      "بكالوريوس العلاج الطبيعي",
      "البورد لنحت الجسم التجميلي",
      "دبلوم ممارس متقدم",
    ],
    schedule: [
      "Sunday: 12:00 PM - 06:00 PM",
      "Tuesday: 10:00 AM - 04:00 PM",
      "Friday: 02:00 PM - 08:00 PM",
    ],
    rating: 4.7,
    patients: 1200,
    education: [
      "BSc Physical Therapy, Cairo University",
      "Board of Aesthetic Sculpting (2021)",
      "Advanced Practitioner Diploma (2022)",
    ],
    specializations: [
      "Non-surgical Body Sculpting",
      "HIFU Skin Tightening",
      "RF Body Contouring",
      "Post-op Care",
    ],
  },
  {
    id: "doc5",
    name: "Dr. Yomna",
    name_ar: "د. يمنى",
    specialty: "Dermatology, Aesthetics, IV Therapy & Body Contouring",
    specialty_ar: "الأمراض الجلدية، التجميل، العلاج الوريدي وتنسيق القوام",
    position: "Dermatology & Wellness Consultant",
    position_ar: "استشاري الأمراض الجلدية والعافية",
    languages: ["English", "Arabic"],
    languages_ar: ["الإنجليزية", "العربية"],
    experience: 14,
    gender: "Female",
    branch: "EDNC Sodic",
    branch_ar: "سوديك EDNC",
    slug: "dr-yomna",
    bio: "Dr. Yomna is highly skilled in providing integrated treatments across dermatology, aesthetics, and intravenous therapies.",
    bio_ar:
      "تتمتع الدكتورة يمنى بمهارة عالية في تقديم علاجات متكاملة في الأمراض الجلدية والتجميل والعلاجات الوريدية.",
    photo: "/doctors/yomna.jpg",
    certifications: [
      "Consultant in Clinical Dermatology",
      "Advanced Wellness Certification",
      "Laser and Aesthetics Diploma",
    ],
    certifications_ar: [
      "استشاري الأمراض الجلدية السريرية",
      "شهادة العافية المتقدمة",
      "دبلوم الليزر والتجميل",
    ],
    schedule: [
      "Monday: 11:00 AM - 05:00 PM",
      "Wednesday: 01:00 PM - 07:00 PM",
      "Friday: 10:00 AM - 04:00 PM",
    ],
    rating: 4.9,
    patients: 2100,
    education: [
      "MD, Faculty of Medicine",
      "Fellowship in Aesthetics (2014)",
      "Wellness Integration Course (2018)",
    ],
    specializations: [
      "Comprehensive Skin Care",
      "Anti-aging Treatments",
      "Vitamin Infusions",
      "Body Contouring Procedures",
    ],
  },
  {
    id: "doc6",
    name: "Dr. Zomrd",
    name_ar: "د. زمرد",
    specialty: "Dermatology, Aesthetics, IV Therapy & Body Contouring",
    specialty_ar: "الأمراض الجلدية، التجميل، العلاج الوريدي وتنسيق القوام",
    position: "Senior Aesthetic & Contouring Specialist",
    position_ar: "أخصائي أول التجميل وتنسيق القوام",
    languages: ["English", "Arabic"],
    languages_ar: ["الإنجليزية", "العربية"],
    experience: 12,
    gender: "Female",
    branch: "Arkan Plaza",
    branch_ar: "أركان بلازا",
    slug: "dr-zomrd",
    bio: "Dr. Zomrd combines her expertise in aesthetic medicine with advanced body contouring and nutritional IV therapies for holistic patient care.",
    bio_ar:
      "تجمع الدكتورة زمرد بين خبرتها في الطب التجميلي وتنسيق القوام المتقدم والعلاجات الوريدية الغذائية لتوفير رعاية شاملة للمرضى.",
    photo: "/doctors/zomrd.jpg",
    certifications: [
      "Aesthetic Medicine Professional",
      "Certified Contouring Expert",
      "IV Therapy Administration",
    ],
    certifications_ar: [
      "ممارس مهني في الطب التجميلي",
      "خبير معتمد في تنسيق القوام",
      "إدارة العلاجات الوريدية",
    ],
    schedule: [
      "Tuesday: 09:00 AM - 03:00 PM",
      "Thursday: 02:00 PM - 08:00 PM",
      "Saturday: 11:00 AM - 05:00 PM",
    ],
    rating: 4.8,
    patients: 1950,
    education: [
      "Medical Degree in Dermatology",
      "Specialized Course in Body Sculpting (2016)",
      "Advanced Nutrition Therapy (2019)",
    ],
    specializations: [
      "Advanced Aesthetics",
      "Cryolipolysis & HIFU",
      "NAD+ & Wellness IVs",
      "Skin Rejuvenation",
    ],
  },
];

export const MOCK_SERVICES: Service[] = [
  // IV Therapy (14 items as requested)
  {
    id: "iv-nad",
    name: "NAD+ Cell Rejuvenation Drip",
    name_ar: "تقطير NAD+ لتجديد الخلايا",
    slug: "nad-drip",
    photo: "/Treatments/nad.webp",
    price: 450,
    description:
      "NAD+ IV Therapy directly delivers Nicotinamide Adenine Dinucleotide to rejuvenate cells, boost cellular energy, and improve cognitive function.",
    description_ar:
      "يعمل محلول NAD+ على إيصال أنزيم نيكوتيناميد أدينين ثنائي النيوكليوتيد مباشرة لتجديد خلايا الجسم وتعزيز طاقة الدماغ ووظائف الإدراك.",
    ingredients: "NAD+ Enzyme, Hydrating Normal Saline base",
    ingredients_ar: "إنزيم NAD+، قاعدة محلول ملحي مرطب طبيعي",
    category: "iv-therapy",
    benefits: [
      "Rejuvenates cells",
      "Boosts brain function",
      "Supports anti-aging",
      "Increases energy levels",
    ],
    benefits_ar: [
      "تجديد الخلايا التالفة",
      "تحسين وظائف الدماغ والتركيز",
      "دعم مكافحة الشيخوخة",
      "زيادة مستويات الطاقة",
    ],
    process: [
      "Doctor consultation & vital check",
      "Administering IV line in luxury lounge (90-120 mins)",
      "Post-drip hydration check",
    ],
    process_ar: [
      "استشارة الطبيب وفحص العلامات الحيوية",
      "بدء التقطير الوريدي في استراحة النخبة (90-120 دقيقة)",
      "فحص الترطيب بعد الجلسة",
    ],
    faq: [
      {
        q: "How often should I get NAD+?",
        q_ar: "كم مرة يجب أن أحصل على NAD+؟",
        a: "For optimal anti-aging, a loading protocol of 3-4 drips in 2 weeks is recommended, followed by monthly maintenance.",
        a_ar: "لتحقيق أفضل نتائج مكافحة الشيخوخة، يوصى ببروتوكول مكثف من 3-4 جلسات خلال أسبوعين، تليها جلسة صيانة شهرية.",
      },
    ],
    duration: 60,
  },
  {
    id: "iv-myers",
    name: "Myers Cocktail Drip",
    name_ar: "حقنة كوكتيل مايرز الوريدية",
    slug: "myers-cocktail",
    price: 250,
    photo: "/Treatments/myers.webp",
    description:
      "A revitalizing blend of essential vitamins and minerals designed to boost energy, restore cellular hydration, and speed recovery.",
    description_ar:
      "مزيج من الفيتامينات والمعادن الأساسية المصممة لزيادة الطاقة، استعادة ترطيب الخلايا وتسريع الشفاء.",
    ingredients: "Vitamin C, Magnesium, B-Complex, Calcium",
    ingredients_ar: "فيتامين سي، مغنيسيوم، مركب فيتامين ب، كالسيوم",
    category: "iv-therapy",
    benefits: [
      "Improves immune health",
      "Reduces chronic fatigue",
      "Restores hydration",
      "Restores vitality",
    ],
    benefits_ar: [
      "تحسين الصحة المناعية",
      "تقليل التعب المزمن",
      "استعادة الترطيب المثالي",
      "استعادة الحيوية والنشاط",
    ],
    process: [
      "Vital signs assessment",
      "Infusion in executive lounge (45 mins)",
      "Aftercare guidelines summary",
    ],
    process_ar: [
      "تقييم العلامات الحيوية",
      "جلسة التسريب في صالون النخبة (45 دقيقة)",
      "ملخص نصائح الرعاية اللاحقة",
    ],
    faq: [
      {
        q: "What is Myers Cocktail?",
        q_ar: "ما هو كوكتيل مايرز؟",
        a: "It is the gold standard of IV wellness drips, used since the 1960s to treat fatigue and immune issues.",
        a_ar: "هو المعيار الذهبي لمحاليل العافية الوريدية، ويستخدم منذ الستينيات لعلاج الإجهاد والمشاكل المناعية.",
      },
    ],
    duration: undefined,
  },
  {
    id: "iv-bariatric",
    name: "Bariatric Optimization Drip",
    name_ar: "محلول دعم عمليات التكميم والتحوير",
    slug: "bariatric-drip",
    price: 300,
    photo: "/Treatments/Bariatric.webp",

    description:
      "Highly absorbed nutrient cocktail formulated for recovery and metabolic health after gastric sleeve or gastric bypass operations.",
    description_ar:
      "كوكتيل مغذيات سريع الامتصاص مصمم خصيصاً للتعافي والصحة الأيضية بعد عمليات تكميم أو تحويل مسار المعدة.",
    ingredients: "Vitamin B12, Folate, Iron, Zinc, Multi-vitamins",
    ingredients_ar: "فيتامين ب12، فولات، حديد، زنك، فيتامينات متعددة",
    category: "iv-therapy",
    benefits: [
      "Addresses nutrient deficiencies",
      "Boosts metabolism",
      "Maintains energy levels",
      "Protects hair and nails",
    ],
    benefits_ar: [
      "يعالج النقص الغذائي الحاد",
      "يعزز عملية التمثيل الغذائي",
      "يحافظ على مستويات الطاقة",
      "يحمي الشعر والأظافر من التساقط",
    ],
    process: [
      "Blood work review (if available)",
      "Infusion under specialist supervision (60 mins)",
    ],
    process_ar: [
      "مراجعة تحاليل الدم (إن وجدت)",
      "جلسة التسريب تحت إشراف الأخصائي (60 دقيقة)",
    ],
    faq: [
      {
        q: "Why do bariatric patients need this?",
        q_ar: "لماذا يحتاج مرضى جراحات السمنة لهذا المحلول؟",
        a: "Bypassing the digestive system prevents oral vitamins from fully absorbing. IV bypasses the stomach completely.",
        a_ar: "تجاوز الجهاز الهضمي يمنع الفيتامينات الفموية من الامتصاص الكامل. المحلول يغذي الدم مباشرة ويحميك من الهبوط.",
      },
    ],
    duration: undefined,
  },
  {
    id: "iv-gluta",
    name: "Gluta Detox Drip",
    name_ar: "محلول الجلوتاثيون للتخلص من السموم",
    slug: "gluta-drip",
    price: 280,
    photo: "/Treatments/Detox.webp",

    description:
      "Detoxifies the body, boosts metabolism, and enhances skin clarity by reducing oxidative stress and toxins.",
    description_ar:
      "يخلص الجسم من السموم، يعزز الأيض، ويزيد نقاء البشرة عن طريق تقليل الإجهاد التأكسدي والسموم المتراكمة.",
    ingredients: "High-dose Glutathione, Vitamin C, Normal Saline",
    ingredients_ar: "جرعة عالية من الجلوتاثيون، فيتامين سي، محلول ملحي متوازن",
    category: "iv-therapy",
    benefits: [
      "Detoxifies liver and cells",
      "Increases skin clarity",
      "Enhances collagen synthesis",
    ],
    benefits_ar: [
      "تطهير الكبد والخلايا من السموم",
      "زيادة إشراق ونقاء البشرة",
      "تحفيز إنتاج الكولاجين الطبيعي",
    ],
    process: ["Hydration consultation", "Infusion session (45-60 mins)"],
    process_ar: ["استشارة الترطيب ونقاء البشرة", "جلسة التسريب (45-60 دقيقة)"],
    faq: [
      {
        q: "How many sessions are needed?",
        q_ar: "كم عدد الجلسات المطلوبة؟",
        a: "For skin whitening and liver detox, 5 to 10 sessions spaced weekly yield visible radiance.",
        a_ar: "للتفتيح وإزالة سموم الكبد، تعطي 5 إلى 10 جلسات أسبوعية نتائج واضحة وبشرة متوهجة.",
      },
    ],
    duration: undefined,
  },
  {
    id: "iv-immunity",
    name: "Immunity Boost Drip",
    name_ar: "محلول تعزيز المناعة الفائق",
    slug: "immunity-boost-drip",
    price: 220,
    photo:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600",

    description:
      "Strengthens the immune system, helping the body combat allergies, chronic stress, body aches, and viruses.",
    description_ar:
      "يقوي جهاز المناعة، ويساعد الجسم في مكافحة الحساسية، الإجهاد المزمن، آلام الجسم والالتهابات.",
    ingredients: "Vitamin C, Zinc, Selenium, Hydrating Fluids",
    ingredients_ar: "فيتامين سي بجرعة عالية، زنك، سيلينيوم، سوائل ترطيب",
    category: "iv-therapy",
    benefits: [
      "Strengthens defenses",
      "Reduces allergy symptoms",
      "Combats chronic exhaustion",
    ],
    benefits_ar: [
      "تقوية دفاعات الجسم الطبيعية",
      "تقليل أعراض الحساسية والموسمية",
      "مكافحة التعب والإجهاد المزمن",
    ],
    process: ["Doctor assessment", "IV administration (45 mins)"],
    process_ar: ["تقييم الطبيب العام", "إعطاء المحلول الوريدي (45 دقيقة)"],
    faq: [],
    duration: undefined,
  },
  {
    id: "iv-ginkgo",
    name: "Ginkgo Biloba Brain Booster",
    name_ar: "محلول الجينكو بيلوبا لتنشيط الذاكرة",
    slug: "ginkgo-drip",
    price: 270,
    photo:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600",

    description:
      "Improves cognitive function and memory. Increases blood flow making you feel energetic and focused.",
    description_ar:
      "يحسن الوظائف الإدراكية والذاكرة. يزيد تدفق الدم للدماغ مما يمنحك الطاقة والتركيز والنشاط اليومي.",
    ingredients: "Ginkgo Biloba extract, Vitamin B-Complex, Saline",
    ingredients_ar: "مستخلص الجينكو بيلوبا، مركب فيتامين ب، محلول ملحي",
    category: "iv-therapy",
    benefits: [
      "Enhances memory & concentration",
      "Improves physical stamina",
      "Increases microcirculation",
    ],
    benefits_ar: [
      "تعزيز الذاكرة والتركيز",
      "تحسين القدرة على التحمل البدني",
      "زيادة الدورة الدموية الدقيقة",
    ],
    process: ["Vitals check", "Slow infusion (60 mins)"],
    process_ar: ["فحص الضغط والنبض", "تسريب بطيء وهادئ (60 دقيقة)"],
    faq: [],
    duration: undefined,
  },
  {
    id: "iv-hero",
    name: "Hero Premier Drip",
    name_ar: "محلول هيرو بريمير الفائق للرجال",
    slug: "hero-premier-drip",
    price: 500,
    photo:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600",

    description:
      "A special drip designed for men acting as an energy and brain booster. Enhances endurance, concentration, and performance.",
    description_ar:
      "محلول خاص للرجال يعمل كمحفز للطاقة والذكاء. يعزز التحمل البدني، التركيز، والأداء العام.",
    ingredients:
      "Ginkgo Biloba, L-Arginine, Vitamin B-Complex, Zinc, Sodium Chloride Saline",
    ingredients_ar: "جينكو بيلوبا، إل-أرجينين، مركب فيتامين ب، زنك، محلول ملحي",
    category: "iv-therapy",
    benefits: [
      "Enhances physical endurance",
      "Improves brain focus",
      "Supports testosterone and zinc levels",
    ],
    benefits_ar: [
      "زيادة القدرة على التحمل البدني",
      "تحسين التركيز واليقظة الذهنية",
      "دعم مستويات الزنك والتستوستيرون",
    ],
    process: [
      "Private suite check-in",
      "Medical vital reading",
      "Infusion (75 mins)",
    ],
    process_ar: [
      "الدخول للجناح الخاص",
      "قراءة المؤشرات الحيوية الطبية",
      "بدء التسريب (75 دقيقة)",
    ],
    faq: [],
    duration: undefined,
  },
  {
    id: "iv-recovery",
    name: "Recovery & Hydration Drip",
    name_ar: "محلول الاستشفاء والترطيب السريع",
    slug: "recovery-drip",
    price: 240,
    photo:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=600",

    description:
      "A vital blend to speed up recovery, rehydrate, and restore electrolytes after travel, illness, or intense fatigue.",
    description_ar:
      "مزيج حيوي لتسريع التعافي وإعادة الترطيب واستعادة الكهارل بعد السفر الطويل أو المرض أو الإجهاد الشديد.",
    ingredients: "Electrolytes, Vitamin C, B-Complex, Hydration fluids",
    ingredients_ar: "كهارل متوازنة، فيتامين سي، مركب فيتامين ب، سوائل ترطيب",
    category: "iv-therapy",
    benefits: [
      "Instant dehydration relief",
      "Combats travel fatigue",
      "Speeds recovery post-illness",
    ],
    benefits_ar: [
      "علاج فوري للجفاف والارهاق",
      "مكافحة تعب السفر واختلاف التوقيت",
      "تسريع الشفاء والتعافي بعد المرض",
    ],
    process: ["Assessment", "IV infusion (45 mins)"],
    process_ar: ["تقييم سريع", "التسريب الوريدي (45 دقيقة)"],
    faq: [],
    duration: undefined,
  },
  {
    id: "iv-tokyo",
    name: "Tokyo Whitening & Anti-Aging Drip",
    name_ar: "محلول طوكيو للتفتيح ومحاربة التجاعيد",
    slug: "tokyo-drip",
    price: 350,
    photo:
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=600",

    description:
      "Premium Japanese-inspired drip with high antioxidants for skin lightening, whitening, and amino acids to boost stamina.",
    description_ar:
      "محلول ياباني متميز يحتوي على مضادات أكسدة عالية لتفتيح البشرة ومحاربة الشيخوخة وأحماض أمينية لتعزيز الطاقة.",
    ingredients: "Glutathione, Vitamin C, B-Complex, L-Carnitine, Amino acids",
    ingredients_ar:
      "جلوتاثيون ياباني، فيタミン سي، ب-مركب، إل-كارنيتين، أحماض أمينية",
    category: "iv-therapy",
    benefits: [
      "Whitens and evens skin tone",
      "Increases metabolism",
      "Improves cellular repair",
    ],
    benefits_ar: [
      "تفتيح وتوحيد لون البشرة",
      "زيادة سرعة حرق الدهون والأيض",
      "تحسين إصلاح الخلايا الذاتي",
    ],
    process: ["Skin consult", "Infusion (60 mins)"],
    process_ar: ["استشارة البشرة والترطيب", "جلسة التسريب (60 دقيقة)"],
    faq: [],
    duration: undefined,
  },
  {
    id: "iv-antistress",
    name: "Anti-Stress & Muscle Relax Drip",
    name_ar: "محلول الاسترخاء ومكافحة الإجهاد العصبي",
    slug: "anti-stress-drip",
    price: 260,
    photo:
      "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=600",

    description:
      "A natural blend of vitamins and amino acids to calm nerves, relax tense muscles, and reduce anxiety levels.",
    description_ar:
      "مزيج طبيعي من الفيتامينات والأحماض الأمينية لتهدئة الأعصاب وإرخاء العضلات المتشنجة وتقليل مستويات التوتر.",
    ingredients: "Magnesium, Taurine, B-Complex, Vitamin C",
    ingredients_ar: "مغنيسيوم بجرعة مهدئة، تاورين، فيتامين ب مركب، فيتامين سي",
    category: "iv-therapy",
    benefits: [
      "Relaxes tense muscles",
      "Reduces anxiety & promotes deep sleep",
      "Calms the nervous system",
    ],
    benefits_ar: [
      "إرخاء العضلات المشدودة",
      "تقليل القلق والمساعدة على النوم العميق",
      "تهدئة الجهاز العصبي المتعب",
    ],
    process: ["Stress factor consult", "Therapeutic infusion (60 mins)"],
    process_ar: [
      "استشارة تحديد عوامل التوتر",
      "التسريب العلاجي المريح (60 دقيقة)",
    ],
    faq: [],
    duration: undefined,
  },
  {
    id: "iv-selenium",
    name: "Selenium Thyroid Drip",
    name_ar: "محلول السيلينيوم لدعم الغدة والمناعة",
    slug: "selenium-drip",
    price: 210,
    photo:
      "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=600",
    description:
      "Essential mineral drip to regulate metabolic processes, support thyroid gland function, and strengthen hair follicles.",
    description_ar:
      "محلول معدني أساسي لتنظيم عمليات التمثيل الغذائي ودعم وظيفة الغدة الدرقية وتقوية بصيلات الشعر من الجذور.",
    ingredients: "Selenium trace minerals, Sodium chloride saline",
    ingredients_ar: "معدن السيلينيوم النادر، محلول ملح الصوديوم المائي",
    category: "iv-therapy",
    benefits: [
      "Supports thyroid metabolic health",
      "Strengthens hair roots",
      "High antioxidant support",
    ],
    benefits_ar: [
      "دعم الصحة الأيضية للغدة الدرقية",
      "تقوية جذور وبصيلات الشعر",
      "مضاد أكسدة قوي جداً للخلايا",
    ],
    process: ["Assessment", "IV drip session (45 mins)"],
    process_ar: ["فحص سريع للعلامات", "جلسة التنقيط الوريدي (45 دقيقة)"],
    faq: [],
    duration: undefined,
  },
  {
    id: "iv-skinwhite",
    name: "Skin Whitening Drip",
    name_ar: "محلول تبييض ونضارة البشرة",
    slug: "skin-whitening-drip",
    price: 320,
    photo:
      "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=600",
    description:
      "Contains a potent blend of antioxidants to lighten skin tone, fade dark spots, and reveal radiant, even-toned skin.",
    description_ar:
      "يحتوي على مزيج قوي من مضادات الأكسدة لتفتيح لون البشرة، إزالة البقع الداكنة وتوحيد لون البشرة.",
    ingredients:
      "High-concentration Glutathione, Collagen peptide booster, Vitamin C",
    ingredients_ar: "جلوتاثيون عالي التركيز، محفز ببتيد الكولاجين، فيتامين سي",
    category: "iv-therapy",
    benefits: [
      "Fades pigmentation & dark spots",
      "Evens out skin tone",
      "Restores youthful glow",
    ],
    benefits_ar: [
      "إخفاء التصبغات والبقع الداكنة",
      "توحيد لون خلايا البشرة بالكامل",
      "استعادة نضارة وتوهج الشباب",
    ],
    process: ["Tone assessment", "Infusion in private suite (60 mins)"],
    process_ar: [
      "تقييم درجة لون البشرة",
      "جلسة التسريب في جناح خاص (60 دقيقة)",
    ],
    faq: [],
    duration: undefined,
  },
  {
    id: "iv-mega",
    name: "Mega Premier Drip",
    name_ar: "محلول ميجا بريمير الطبي الفائق",
    slug: "mega-premier-drip",
    price: 480,
    photo:
      "https://images.unsplash.com/photo-1579684389782-64d84b5e905d?auto=format&fit=crop&q=80&w=600",
    description:
      "Maximum strength multi-vitamin and mineral infusion. Restores complete hydration, strength, and immunity.",
    description_ar:
      "محلول الفيتامينات والمعادن بتركيزه الأقصى. يعيد الترطيب والقوة والنشاط الفائق للجسم بالكامل.",
    ingredients: "Double-dose Vitamins, Amino acids, Trace minerals, Magnesium",
    ingredients_ar: "فيتامينات مضاعفة، أحماض أمينية، معادن نادرة، مغنيسيوم",
    category: "iv-therapy",
    benefits: [
      "Maximum nutrient replenishment",
      "Combats chronic exhaustion",
      "Deep cellular recovery",
    ],
    benefits_ar: [
      "تعويض أقصى للمغذيات المفقودة",
      "مكافحة التعب المزمن والهبوط",
      "استشفاء خلوي عميق جداً",
    ],
    process: ["Specialist check", "Mega infusion session (90 mins)"],
    process_ar: ["فحص الأخصائي الدقيق", "جلسة التسريب الكبرى (90 دقيقة)"],
    faq: [],
    duration: undefined,
  },
  {
    id: "iv-lpremier",
    name: "L-Premier Energy booster",
    name_ar: "محلول إل-بريمير لتعزيز الطاقة وحرق الدهون",
    slug: "l-premier-drip",
    price: 400,
    photo:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600",
    description:
      "Energy booster drip designed for athletes and wellness clients. Promotes cellular energy and speeds muscle recovery.",
    description_ar:
      "محلول معزز للطاقة مصمم للرياضيين وعملاء الصحة النخبة. يحفز حرق الدهون وسرعة تعافي العضلات.",
    ingredients: "L-Arginine, L-Carnitine, Vitamin B-Complex, Saline",
    ingredients_ar: "إل-أرجينين، إل-كارنيتين، فيتامينات ب المركبة، محلول ملحي",
    category: "iv-therapy",
    benefits: [
      "Increases athletic endurance",
      "Speeds up muscle recovery",
      "Promotes fat metabolism",
    ],
    benefits_ar: [
      "زيادة قدرة التحمل الرياضي",
      "تسريع استشفاء العضلات بعد التمارين",
      "تعزيز حرق الدهون الخلوية",
    ],
    process: ["Fitness review", "Infusion session (60 mins)"],
    process_ar: ["مراجعة أهداف اللياقة", "جلسة التسريب (60 دقيقة)"],
    faq: [],
    duration: undefined,
  },
  {
    id: "der-hydra",
    name: "Premium Hydrafacial",
    name_ar: "جلسة الهيدرافيشيل الممتازة للوجه",
    slug: "hydrafacial",
    price: 150,
    photo:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600",

    description:
      "A non-invasive multi-step treatment that combines cleansing, exfoliation, extraction, hydration, and antioxidant protection.",
    description_ar:
      "علاج غير جراحي متعدد الخطوات يجمع بين التنظيف والتقشير والاستخلاص والترطيب والحماية بمضادات الأكسدة.",
    category: "dermatology",
    benefits: [
      "Deeply cleanses pores",
      "Improves skin texture",
      "Delivers instant hydration",
    ],
    benefits_ar: [
      "تنظيف عميق للمسامات",
      "تحسين ملمس ونعومة الجلد",
      "منح ترطيب فوري مذهل للبشرة",
    ],
    process: [
      "Cleanse & Peel",
      "Extract & Hydrate",
      "Fuse & Protect with serums",
    ],
    process_ar: [
      "التنظيف والتقشير اللطيف",
      "الاستخلاص والترطيب بالمسامات",
      "تغذية وحماية البشرة بالأمصال المغذية",
    ],
    faq: [],
    duration: undefined,
  },
  {
    id: "der-carbon",
    name: "Carbon Laser Peel",
    name_ar: "جلسة التقشير الكربوني بالليزر",
    slug: "carbon-laser",
    price: 180,
    photo:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600",

    description:
      "A revolutionary laser treatment that is highly beneficial for acne-prone skin, oily skin, and uneven skin tone.",
    description_ar:
      "علاج ثوري بالليزر مفيد جداً للبشرة المعرضة لحب الشباب، البشرة الدهنية، وتوحيد تباين لون الجلد.",
    category: "dermatology",
    benefits: [
      "Reduces pore size",
      "Cleanses oil and sebum",
      "Stimulates collagen production",
    ],
    benefits_ar: [
      "تقليل وتضييق المسام الواسعة",
      "تنظيف الدهون والزيوت الزائدة بالوجه",
      "تحفيز إنتاج كولاجين البشرة",
    ],
    process: [
      "Application of thin carbon lotion",
      "Laser pulses capture carbon particles and impurities",
      "Soothing cooling mask application",
    ],
    process_ar: [
      "وضع طبقة رقيقة من لوشن الكربون الأسود",
      "إطلاق نبضات الليزر للتخلص من الكربون والشوائب",
      "وضع قناع التبريد والترطيب المهدئ",
    ],
    faq: [],
    duration: undefined,
  },
  {
    id: "der-filler",
    name: "Filler & Botox Enhancements",
    name_ar: "علاجات البوتوكس والفيلر الفاخرة",
    slug: "filler-botox",
    price: 350,
    photo:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600",

    description:
      "Injectable fillers and wrinkle-relaxing Botox tailored to lift contours, smooth fine lines, and restore facial volume.",
    description_ar:
      "حقن الفيلر التجميلية والبوتوكس المرخي للعضلات والمصمم خصيصاً لرفع الملامح وتنعيم التجاعيد التعبيرية واستعادة حجم الوجه.",
    category: "aesthetics",
    benefits: [
      "Smoothes wrinkles",
      "Restores youthful facial volume",
      "Provides immediate contour lifting",
    ],
    benefits_ar: [
      "تنعيم خطوط وتجاعيد الوجه",
      "استعادة حجم ملامح الوجه الطبيعي",
      "توفير شد ورفع فوري للوجنتين والشفاه",
    ],
    process: [
      "Anatomic facial mapping",
      "Applying topical anesthetic",
      "Precision injection by consultant (20-30 mins)",
    ],
    process_ar: [
      "تحديد الملامح التشريحية للوجه",
      "وضع مخدر موضعي لطيف",
      "الحقن الدقيق بواسطة الطبيب الاستشاري (20-30 دقيقة)",
    ],
    faq: [],
    duration: undefined,
  },
  {
    id: "der-booster",
    name: "Skin Boosters Treatment",
    name_ar: "إبر نضارة وترطيب البشرة (Skin Boosters)",
    slug: "skin-boosters",
    price: 290,
    photo:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",

    description:
      "Infuses the skin with high-concentration hyaluronic acid and essential nutrients to enhance moisture, glow, and elasticity.",
    description_ar:
      "حقن الوجه بحمض الهيالورونيك عالي التركيز والمغذيات الحيوية لتعزيز الرطوبة العميقة والنضارة والمرونة الطبيعية.",
    category: "aesthetics",
    benefits: [
      "Deep dermal hydration",
      "Enhances natural radiance",
      "Smoothes fine dry lines",
    ],
    benefits_ar: [
      "ترطيب عميق لطبقات الجلد الداخلية",
      "تعزيز الإشراق واللمعان الطبيعي",
      "تنعيم الخطوط الدقيقة الناتجة عن الجفاف",
    ],
    process: [
      "Skincare clean",
      "Micro-injections across target zones",
      "Calming gel massage",
    ],
    process_ar: [
      "تنظيف البشرة وتعقيمها",
      "حقن مجهري دقيق في المناطق المستهدفة",
      "تدليك لطيف بجل التبريد المهدئ",
    ],
    faq: [],
    duration: undefined,
  },
  {
    id: "der-biostim",
    name: "Collagen Biostimulators",
    name_ar: "حقن محفزات الكولاجين الحيوية (Radiesse/Sculptra)",
    slug: "biostimulators",
    price: 600,
    photo:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=600",

    description:
      "Injectable treatments using advanced Sculptra or Radiesse to trigger natural long-term collagen synthesis, restoring structural tightness.",
    description_ar:
      "حقن تجميلية متطورة باستخدام راديس أو سكلبترا لتحفيز إنتاج الكولاجين الذاتي طويل الأمد واستعادة شد وتماسك البشرة.",
    category: "aesthetics",
    benefits: [
      "Stimulates long-term collagen growth",
      "Rebuilds facial volume naturally",
      "Improves skin thickness and elasticity",
    ],
    benefits_ar: [
      "تحفيز نمو الكولاجين لسنوات طويلة",
      "إعادة بناء ملامح الوجه بشكل طبيعي تدريجي",
      "تحسين سماكة ومرونة الجلد المشدود",
    ],
    process: [
      "Volume assessment",
      "Mapping injection coordinates",
      "Injections (30 mins)",
    ],
    process_ar: [
      "تقييم الحجم وتحديد الترهلات",
      "رسم نقاط الحقن بدقة",
      "إجراء حقن المحفزات (30 دقيقة)",
    ],
    faq: [],
    duration: undefined,
  },
  {
    id: "der-fractional",
    name: "Fractional Laser Resurfacing",
    name_ar: "جلسة الفراكشنال ليزر لتجديد البشرة",
    slug: "fractional-laser",
    price: 250,
    photo:
      "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&q=80&w=600",

    description:
      "Advanced laser treatment that targets damaged skin cells, erasing acne scars, wrinkles, and sun spots.",
    description_ar:
      "علاج متطور بالليزر يستهدف خلايا البشرة التالفة، لإزالة آثار حب الشباب والتجاعيد وتصبغات الشمس.",
    category: "dermatology",
    benefits: [
      "Drastically reduces acne scars",
      "Smoothes deep wrinkles",
      "Evens skin pigmentations",
    ],
    benefits_ar: [
      "تقليل آثار وحفر حب الشباب بشكل كبير",
      "تنعيم التجاعيد العميقة بالوجه",
      "توحيد لون تصبغات الجلد",
    ],
    process: [
      "Anesthetic cream mask (30 mins)",
      "Laser scanner therapy (20 mins)",
      "Applying healing soothing cream",
    ],
    process_ar: [
      "وضع كريم مخدر موضعي (30 دقيقة)",
      "جلسة العلاج بالليزر (20 دقيقة)",
      "وضع كريم ترميم وترطيب طبي مهدئ",
    ],
    faq: [],
    duration: undefined,
  },
  {
    id: "der-threads",
    name: "Luxury Thread Lift",
    name_ar: "جلسة شد الوجه والرقبة بالخيوط التجميلية",
    slug: "threads",
    price: 450,
    photo:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600",

    description:
      "Minimally invasive lift using dissolvable polydioxanone (PDO) threads to reposition sagging tissue and define jawlines.",
    description_ar:
      "عملية شد غير جراحية بسيطة باستخدام خيوط البوليديوكسانون (PDO) القابلة للذوبان لشد الجلد المترهل وتحديد الفك.",
    category: "aesthetics",
    benefits: [
      "Immediate mechanical lifting effect",
      "Stimulates cellular collagen synthesis",
      "Redefines jawlines and cheeks",
    ],
    benefits_ar: [
      "تأثير شد ميكانيكي فوري واضح",
      "تحفيز خلايا البشرة لإنتاج الكولاجين",
      "تحديد خطوط الفك والخدين بشكل محدد",
    ],
    process: [
      "Disinfection & local anesthesia",
      "Threading sutures placement via cannula",
      "Post-treatment ice cooling and care plan",
    ],
    process_ar: [
      "التعقيم الكامل والتخدير الموضعي اللطيف",
      "وضع خيوط الشد عبر الكانيولا المخصصة",
      "التبريد بالثلج بعد العملية ووضع خطة الرعاية اللاحقة",
    ],
    faq: [],
    duration: undefined,
  },
  {
    id: "der-hifu",
    name: "HIFU Non-Surgical Lift",
    name_ar: "جلسة الهايفو (HIFU) لشد الوجه والرقبة",
    slug: "hifu",
    photo:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600",
    price: 400,
    description:
      "High-Intensity Focused Ultrasound targeting deep structural skin layers to lift and tighten without incisions or downtime.",
    description_ar:
      "تقنية الموجات فوق الصوتية المركزة عالية الكثافة التي تستهدف طبقات الجلد العميقة لشدها ورفعها بدون أي جراحة أو فترة تعافي.",
    category: "body-contouring",
    benefits: [
      "Tightens deep muscle and skin structures",
      "Completely non-invasive with zero downtime",
      "Lifts cheeks, brows, and double chins",
    ],
    benefits_ar: [
      "شد عضلات الوجه العميقة والجلد بالكامل",
      "غير جراحي وآمن تماماً بدون تعطل عن العمل",
      "رفع الخدود والحواجب والتخلص من اللغد",
    ],
    process: [
      "Ultrasound gel application",
      "HIFU device passes emitting thermal waves",
      "Applying sunscreen and cooling serum",
    ],
    process_ar: [
      "وضع جل الموجات فوق الصوتية الخاص",
      "تمرير جهاز الهايفو لبث النبضات الحرارية العميقة",
      "وضع كريم الحماية من الشمس وسيروم التبريد",
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
    photo:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
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
    photo:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800",
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
      "https://www.google.com/maps?q=Arkan+Plaza,+El-Bostan,+First+Al+Sheikh+Zayed,+Giza+Governorate+3242304&ftid=0x14585b0525c31285:0xe916bcf3ee2db2ad&entry=gps&shh=CAE&lucs=,94297699,94231188,94280568,47071704,94218641,94282134,100799877,94286869&g_ep=CAISEjI2LjE3LjIuOTAyNzg4MTI0MBgAINeCAypJLDk0Mjk3Njk5LDk0MxM1MTcfMDllNTQzNTFjZjA5NWUyZSZzaG5kbD0tMSZzb3VyY2U9c2gveC9rcC9sb2NhbC8zJmVudHJ5cG9pbnQ9c2gveC9rcC9sb2NhbA%3D%3D&skid=2551fc83-1da8-4ec7-9379-9b5f7b7fcff0&g_st=ic",
    photo:
      "https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&q=80&w=800",
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
    photo:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800",
    country: "UAE 🇦🇪",
    services: ["IV Therapy", "Aesthetics", "Dermatology", "Body Contouring"],
  },
];

export const MOCK_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t1",
    name: "Yasmine Mansour",
    name_ar: "ياسمين منصور",
    role: "Business Executive",
    role_ar: "رائدة أعمال",
    rating: 5,
    text: "The NAD+ drip therapy at Premier Health Fairmont is extraordinary. I felt a surge of mental clarity and energy within hours. The luxury suites are incredibly private and comfortable.",
    text_ar:
      "علاج NAD+ الوريدي في فرع فيرمونت استثنائي. شعرت بوضوح ذهني ونشاط رائع خلال ساعات فقط. أجنحة العلاج خاصة جداً ومريحة للغاية وتليق بالنخبة.",
  },
  {
    id: "t2",
    name: "Karim Hegazi",
    name_ar: "كريم حجازي",
    role: "Professional Athlete",
    role_ar: "رياضي محترف",
    rating: 5,
    text: "For post-training recovery, the L-Premier drip is my absolute go-to. Bypassing digestion means direct absorption, giving me immediate muscle recovery. Exceptional standards.",
    text_ar:
      "للاستشفاء بعد التمارين الشاقة، محلول إل-بريمير هو خياري المفضل دائماً. وصول المغذيات للدم مباشرة يمنح عضلاتي تعافياً فورياً. مستوى رائع من الخدمة.",
  },
  {
    id: "t3",
    name: "Nadine El-Sayegh",
    name_ar: "نادين الصايغ",
    role: "Beauty & Anti-Aging Client",
    role_ar: "عميلة الطب التجميلي",
    rating: 5,
    text: "I visited Dr. Layla for skin boosters and filler. The results are incredibly natural, and the clinic's design is more like an Apple-level wellness sanctuary. Truly world-class.",
    text_ar:
      "زرت د. ليلى للحصول على إبر النضارة والفيلر. النتيجة طبيعية للغاية وتصاميم العيادة تشبه ملاذات العافية الراقية لأبل. تجربة عالمية فاخرة بكل المقاييس.",
  },
  {
    id: "t4",
    name: "Hana El-Shorbagy",
    name_ar: "هناء الشوربجي",
    role: "Aesthetic Client",
    role_ar: "عميلة قسم التجميل",
    rating: 5,
    text: "My laser skin resurfacing experience at EDNC Sodic branch was absolutely life-changing. Here's my video review of the results!",
    text_ar:
      "تجربتي في تجديد البشرة بالليزر في فرع سوديك EDNC غيرت حياتي تماماً. إليكم مراجعتي بالفيديو للنتائج!",
    video_url:
      "https://assets.mixkit.co/videos/preview/mixkit-beautiful-woman-smiling-at-dermatology-clinic-40899-large.mp4",
  },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "ap-819",
    customerName: "Farida Rostom",
    customerPhone: "+20 100 123 4567",
    department: "Dermatology",
    service: "Premium Hydrafacial",
    branch: "Fairmont Nile City",
    doctor: "Dr. Ahmed Refaat",
    date: "2026-06-25",
    time: "11:00 AM",
    status: "Confirmed",
    amount: 150,
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
  },
  {
    id: "ap-820",
    customerName: "Sherif Younes",
    customerPhone: "+20 111 987 6543",
    department: "IV Drip Therapy",
    service: "NAD+ Cell Rejuvenation Drip",
    branch: "Arkan Plaza",
    doctor: "Dr. Marcus Vance",
    date: "2026-06-26",
    time: "03:00 PM",
    status: "Pending",
    amount: 450,
    paymentStatus: "Unpaid",
  },
  {
    id: "ap-821",
    customerName: "Mariam Roushdy",
    customerPhone: "+971 52 444 8888",
    department: "Aesthetics",
    service: "Filler & Botox Enhancements",
    branch: "EDNC Sodic",
    doctor: "Dr. Layla Kamel",
    date: "2026-06-28",
    time: "01:00 PM",
    status: "Rescheduled",
    amount: 350,
    paymentStatus: "Paid",
    paymentMethod: "Apple Pay",
  },
];

export const MOCK_PAYMENTS: Payment[] = [
  {
    id: "pay-101",
    appointmentId: "ap-819",
    customerName: "Farida Rostom",
    amount: 150,
    method: "Credit Card",
    date: "2026-06-24",
    status: "Succeeded",
  },
  {
    id: "pay-102",
    appointmentId: "ap-821",
    customerName: "Mariam Roushdy",
    amount: 350,
    method: "Apple Pay",
    date: "2026-06-24",
    status: "Succeeded",
  },
];

export const MOCK_GALLERY = [
  {
    id: "g1",
    title: "Fairmont Nile City Reception",
    title_ar: "استقبال فرع فيرمونت نايل سيتي",
    category: "facility",
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800",
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
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
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
    image:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800",
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
    image:
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&q=80&w=800",
    description:
      "Comfortable and professional consultation environment to plan your wellness journey.",
    description_ar: "بيئة استشارية مriحة ومهنية لتخطيط رحلة العافية الخاصة بك.",
  },
  {
    id: "g5",
    title: "Premium IV Drip Infusion",
    title_ar: "تسريب الفيتامينات بالوريد الفاخر",
    category: "treatment",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
    description:
      "Cellular rejuvenation formulations engineered to restore your body.",
    description_ar: "تركيبات تجديد الخلايا المصممة لاستعادة نشاط جسمك وحيويته.",
  },
  {
    id: "g6",
    title: "Advanced Laser Resurfacing Laser System",
    title_ar: "جهاز الليزر المتطور لتجديد البشرة",
    category: "equipment",
    image:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800",
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
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800",
    description:
      "Comprehensive medical and cosmetic skin analysis by our elite consultants.",
    description_ar: "تحليل طبي وتجميلي شامل للبشرة بواسطة نخبة من استشاريينا.",
  },
];
