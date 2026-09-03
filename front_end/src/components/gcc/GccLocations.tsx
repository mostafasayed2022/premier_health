"use client";

// ─── GccLocations.tsx ─────────────────────────────────────────────────────────
// Premier Health Clinic Locations for GCC Visitors
// Cairo Sanctuaries: Fairmont Nile City, Arkan Plaza (Sheikh Zayed), EDNC Sodic (New Cairo)

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  MessageCircle,
  Navigation,
  Sparkles,
  CheckCircle2,
  Clock,
  CalendarCheck,
} from "lucide-react";
import { CONTACT } from "@/lib/config/contact";
import {
  trackSelectBranch,
  trackClickMap,
  trackClickWhatsApp,
  trackClickCall,
  trackStartBooking,
} from "@/lib/analytics/events";
import { getBranches } from "@/lib/api";

const PAGE_PATH = "/gcc/iv-therapy/ar";

interface VerifiedBranch {
  id: string | number;
  name_ar: string;
  name_en: string;
  badge: string;
  badgeColor: string;
  address_ar: string;
  hours_ar: string;
  phone: string;
  image_url: string;
  map_url: string;
  booking_url: string;
  highlight_ar: string;
  services_ar: string[];
}

// ─── GCC Branches Mock Data (COMMENTED OUT — Now using live dashboard data) ───────
/*
const REAL_VERIFIED_BRANCHES: VerifiedBranch[] = [
  {
    id: 2,
    name_ar: "فرع فيرمونت نايل سيتي",
    name_en: "Fairmont Nile City",
    badge: "وسط القاهرة · كورنيش النيل",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-400/30",
    address_ar: "فندق فيرمونت نايل سيتي، أبراج نايل سيتي، كورنيش النيل، القاهرة",
    hours_ar: "10:00 ص – 10:00 م (يومياً)",
    phone: "+20 12 0064 4663",
    image_url:
      "https://res.cloudinary.com/u3q5mcfx/image/upload/v1/uploads/1/DSC04519_fyazrj.jpg",
    map_url:
      "https://www.google.com/maps/place/Premier+Health/@30.0719202,31.2275839,17z",
    booking_url: "/ar/book-appointment?branch=2",
    highlight_ar:
      "موقع مركزي فاخر داخل فندق فيرمونت، مع أجنحة علاجية خاصة بإطلالة نيلية كاملة، مثالية لزوار الفنادق ووسط العاصمة.",
    services_ar: [
      "بروتوكولات NAD+ لتجديد الخلايا والطاقة",
      "جلسات الترطيب واستعادة النشاط والمناعة",
      "أجنحة VIP خاصة واستقبال فندقي راقٍ",
    ],
  },
  {
    id: 4,
    name_ar: "فرع أركان بلازا (الشيخ زايد)",
    name_en: "Arkan Plaza – Sheikh Zayed",
    badge: "غرب القاهرة · الشيخ زايد",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
    address_ar: "مجمع أركان بلازا الطبي، مدخل الشيخ زايد، 6 أكتوبر",
    hours_ar: "10:00 ص – 10:00 م (يومياً)",
    phone: "+20 12 0064 4663",
    image_url:
      "https://res.cloudinary.com/u3q5mcfx/image/upload/v1/uploads/1/hero1_qimiy7.jpg",
    map_url:
      "https://www.google.com/maps/place/Arkan+Plaza/@30.0194029,31.0045291,17z",
    booking_url: "/ar/book-appointment?branch=4",
    highlight_ar:
      "في أرقى مجمعات الشيخ زايد، عيادة مجهزة بأحدث تقنيات الحقن الوريدي والتجميل الطبي المتطور بأعلى معايير الخصوصية.",
    services_ar: [
      "بروتوكولات الاستشفاء البدني والنشاط",
      "علاجات الجلوتاثيون وتوحيد لون البشرة",
      "جلسات Hydrafacial الطبية المتطورة",
    ],
  },
  {
    id: 3,
    name_ar: "فرع سوديك EDNC (التجمع الخامس)",
    name_en: "EDNC Sodic – New Cairo",
    badge: "شرق القاهرة · التجمع الخامس",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-400/30",
    address_ar: "مجمع EDNC التجاري، مشروع سوديك إيست تاون، شارع التسعين، التجمع الخامس",
    hours_ar: "10:00 ص – 10:00 م (يومياً)",
    phone: "+20 12 0064 4663",
    image_url:
      "https://res.cloudinary.com/u3q5mcfx/image/upload/v1/uploads/1/DSC04539_pxbhlp.jpg",
    map_url:
      "https://www.google.com/maps?q=30.0154326,31.5145233",
    booking_url: "/ar/book-appointment?branch=3",
    highlight_ar:
      "عيادة متطورة في قلب القاهرة الجديدة بالقرب من الجامعة الأمريكية ومناطق التسوق الراقية مع سرعة إنهاء الإجراءات.",
    services_ar: [
      "جلسات الديتوكس ومكافحة الإرهاق",
      "بروتوكولات الـ Wellness الشاملة",
      "خدمة VIP وأجنحة استرخاء هادئة",
    ],
  },
];
*/

export function GccLocations() {
  const [branches, setBranches] = useState<VerifiedBranch[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getBranches()
      .then((apiBranches) => {
        if (apiBranches && apiBranches.length > 0) {
          const mappedApiList: VerifiedBranch[] = apiBranches.map((apiBranch) => {
            const rawAddr = (apiBranch.address_ar || apiBranch.address || "").toLowerCase();
            const inferredBadge =
              rawAddr.includes("أكتوبر") || rawAddr.includes("zayed") || rawAddr.includes("زايد")
                ? "غرب القاهرة · الشيخ زايد"
                : rawAddr.includes("التجمع") || rawAddr.includes("cairo") || rawAddr.includes("سوديك")
                ? "شرق القاهرة · التجمع الخامس"
                : "قلب القاهرة · على النيل";

            const inferredBadgeColor = "bg-amber-500/20 text-amber-300 border-amber-400/30";

            const services =
              Array.isArray(apiBranch.services) && apiBranch.services.length > 0
                ? apiBranch.services.map((s: any) =>
                    typeof s === "string" ? s : s.name || s.name_ar || String(s),
                  )
                : [
                    "جلسات IV Therapy المتقدمة",
                    "بروتوكولات الـ Wellness",
                    "أجنحة خاصة واستقبال راقٍ",
                  ];

            return {
              id: apiBranch.id,
              name_ar: apiBranch.name_ar || apiBranch.name || "فرع عيادات بريمير هيلث",
              name_en: apiBranch.name || "Premier Health Branch",
              badge: inferredBadge,
              badgeColor: inferredBadgeColor,
              address_ar: apiBranch.address_ar || apiBranch.address || "القاهرة، مصر",
              hours_ar: apiBranch.hours_ar || apiBranch.hours || "10:00 ص – 10:00 م (يومياً)",
              phone: apiBranch.phone || "+20 12 0064 4663",
              image_url:
                apiBranch.photo ||
                apiBranch.image_url ||
                (apiBranch as any).image ||
                "/AboutPreview/about.webp",
              map_url:
                apiBranch.mapUrl ||
                apiBranch.map_url ||
                apiBranch.url ||
                "https://maps.google.com",
              booking_url: `/ar/book-appointment?branch=${apiBranch.id}`,
              highlight_ar:
                "عيادة مجهزة بأحدث تقنيات الحقن الوريدي والتجميل الطبي مع أجنحة علاجية خاصة واستقبال فندقي راقٍ.",
              services_ar: services,
            };
          });

          setBranches(mappedApiList);
        }
      })
      .catch(() => {
        // Handled silently
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (!isLoading && branches.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-[#0d2235] text-white relative overflow-hidden" id="gcc-branches">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={13} className="text-amber-400" />
            <span>فروع عياداتنا في القاهرة</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            فروعنا الراقية في القاهرة
          </h2>
          <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            اختر الفرع الأنسب لإقامتك أثناء زيارتك للقاهرة، مع إمكانية التنسيق المسبق مع فريق الـ Concierge لضمان راحتك.
          </p>
        </div>


        {/* 3 Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {branches.map((loc) => (
            <article
              key={loc.id}
              itemScope
              itemType="https://schema.org/MedicalClinic"
              onClick={() =>
                trackSelectBranch({
                  branch_id: loc.id,
                  branch_name: loc.name_ar,
                  page_path: PAGE_PATH,
                })
              }
              className="group bg-white/[0.04] border border-white/10 hover:border-amber-400/40 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/40 flex flex-col justify-between"
            >
              <div>
                {/* Branch Cover Image */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={loc.image_url}
                    alt={loc.name_ar}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    itemProp="image"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d2235] via-[#0d2235]/30 to-transparent" />

                  {/* Badge */}
                  <span
                    className={`absolute top-4 right-4 text-[11px] font-bold px-3 py-1 rounded-full border backdrop-blur-md ${loc.badgeColor}`}
                  >
                    {loc.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3
                    itemProp="name"
                    className="font-bold text-xl text-white mb-3 group-hover:text-amber-300 transition-colors"
                  >
                    {loc.name_ar}
                  </h3>

                  {/* Address */}
                  <div
                    itemProp="address"
                    itemScope
                    itemType="https://schema.org/PostalAddress"
                    className="flex items-start gap-2.5 text-white/70 text-xs mb-3 leading-relaxed"
                  >
                    <MapPin size={15} className="text-amber-400 shrink-0 mt-0.5" />
                    <span itemProp="streetAddress">{loc.address_ar}</span>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-center gap-2.5 text-white/70 text-xs mb-3">
                    <Clock size={15} className="text-amber-400 shrink-0" />
                    <span>مواعيد العمل: {loc.hours_ar}</span>
                    <meta itemProp="openingHours" content="Sa-Th 10:00-22:00" />
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-2.5 text-white/70 text-xs mb-4">
                    <Phone size={15} className="text-amber-400 shrink-0" />
                    <a
                      href={`tel:${loc.phone.replace(/\s+/g, "")}`}
                      itemProp="telephone"
                      className="font-mono hover:text-amber-300 transition-colors"
                    >
                      {loc.phone}
                    </a>
                  </div>

                  {/* Highlight */}
                  <p className="text-white/80 text-xs sm:text-sm mb-5 leading-relaxed bg-white/[0.03] p-3.5 rounded-2xl border border-white/5">
                    {loc.highlight_ar}
                  </p>

                  {/* Services Available */}
                  <div className="space-y-2 mb-2">
                    <span className="text-[11px] font-bold text-amber-400/90 block mb-1">
                      الخدمات المتوفرة بالفرع:
                    </span>
                    {loc.services_ar.map((svc, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-white/75 text-xs">
                        <CheckCircle2 size={13} className="text-amber-400 shrink-0" />
                        <span>{svc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 space-y-2.5">
                {/* Primary Booking CTA */}
                <Link
                  href={loc.booking_url}
                  onClick={() =>
                    trackStartBooking({
                      branch_id: loc.id,
                      branch_name: loc.name_ar,
                      booking_source: "gcc_location_card",
                    })
                  }
                  className="w-full flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#0d2235] font-bold text-xs sm:text-sm py-3 px-4 rounded-xl transition-all shadow-md shadow-amber-400/20 hover:-translate-y-0.5"
                >
                  <CalendarCheck size={16} />
                  <span>احجز جلستك في هذا الفرع</span>
                </Link>

                {/* Google Maps Link */}
                <a
                  href={loc.map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  itemProp="hasMap"
                  onClick={() =>
                    trackClickMap({
                      branch_id: loc.id,
                      branch_name: loc.name_ar,
                      location: PAGE_PATH,
                      page_path: PAGE_PATH,
                    })
                  }
                  className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-2.5 px-4 rounded-xl border border-white/10 transition-colors"
                >
                  <Navigation size={14} className="text-amber-400" />
                  <span>الاتجاهات على خرائط Google</span>
                </a>

                {/* WhatsApp & Call CTAs */}
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`${CONTACT.whatsapp_url_eg}?text=${encodeURIComponent(
                      `مرحباً، أود الاستفسار وحجز جلسة IV Therapy في فرع ${loc.name_ar} [Ref: gcc_branch_${loc.id}]`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackClickWhatsApp({
                        location: PAGE_PATH,
                        page_path: PAGE_PATH,
                        branch_name: loc.name_ar,
                        cta_position: "gcc_locations",
                        phone_type: "EG",
                      })
                    }
                    className="flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs py-2.5 px-3 rounded-xl transition-all shadow-md shadow-green-600/20"
                  >
                    <MessageCircle size={14} />
                    <span>واتساب الفرع</span>
                  </a>

                  <a
                    href={CONTACT.tel_eg}
                    onClick={() =>
                      trackClickCall({
                        location: PAGE_PATH,
                        page_path: PAGE_PATH,
                        branch_name: loc.name_ar,
                        cta_position: "gcc_locations",
                        phone_type: "EG",
                      })
                    }
                    className="flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-2.5 px-3 rounded-xl border border-white/10 transition-colors"
                  >
                    <Phone size={14} className="text-amber-400" />
                    <span>اتصال مباشر</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Concierge Transfer Assistance Banner */}
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-right">
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white mb-1">
              تحتاج إلى تنسيق مسبق أو ترتيب استقبال خاص في الفندق؟
            </h4>
            <p className="text-white/60 text-xs sm:text-sm">
              فريق الـ Concierge جاهز لتحديد الفرع الأقرب لمقر إقامتك وتأكيد موعدك قبل وصولك إلى القاهرة.
            </p>
          </div>
          <a
            href={`${CONTACT.whatsapp_url_eg}?text=${encodeURIComponent(
              "مرحباً، أود استشارة فريق Concierge بخصوص فروع عيادات Premier Health واختيار الفرع الأنسب لمقر إقامتي بالقاهرة"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackClickWhatsApp({
                location: PAGE_PATH,
                page_path: PAGE_PATH,
                cta_position: "gcc_locations_concierge_footer",
                phone_type: "EG",
              })
            }
            className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#0d2235] font-bold text-xs sm:text-sm py-3 px-5 rounded-xl transition-all shrink-0 shadow-md shadow-amber-400/20"
          >
            <MessageCircle size={16} />
            <span>تنسيق مع الـ Concierge</span>
          </a>
        </div>
      </div>
    </section>
  );
}

