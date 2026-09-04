"use client";

// ─── GccTestimonials.tsx ──────────────────────────────────────────────────────
// Real Verified Testimonials for GCC Landing Page with WhatsApp & Call Concierge
// Actual real patient reviews from Premier Health database

import React, { useEffect, useState } from "react";
import {
  Star,
  Quote,
  Sparkles,
  MessageCircle,
  Phone,
  CalendarCheck,
  Loader2,
} from "lucide-react";
import { getTestimonials } from "@/lib/api";
import { CONTACT } from "@/lib/config/contact";
import {
  trackClickWhatsApp,
  trackClickCall,
  trackStartBooking,
} from "@/lib/analytics/events";
import Link from "next/link";

const PAGE_PATH = "/gcc/iv-therapy/ar";

interface VerifiedTestimonial {
  id: string | number;
  name_ar: string;
  role_ar: string;
  treatment_ar: string;
  rating: number;
  text_ar: string;
  branch_badge_ar: string;
}

// ─── MOCK DATA (commented out — بيانات placeholder غير حقيقية) ───────────────
// const REAL_VERIFIED_TESTIMONIALS: VerifiedTestimonial[] = [
//   {
//     id: 4,
//     name_ar: "جو تالا",
//     role_ar: "رجل أعمال وزائر دائم للقاهرة",
//     treatment_ar: "جلسة NAD+ Cell Rejuvenation Drip",
//     rating: 5,
//     branch_badge_ar: "فرع فيرمونت نايل سيتي",
//     text_ar:
//       "جلسات تقطير NAD+ الوريدي في بريمير هيلث فرع فيرمونت نايل سيتي استثنائية بكل المقاييس. شعرت بصفاء ذهني وطاقة متجددة فورية بعد رحلة سفر طويلة. الأجنحة الفاخرة والخصوصية التامة تمنحك شعوراً بالراحة والاطمئنان.",
//   },
//   {
//     id: 3,
//     name_ar: "كريم حجازي",
//     role_ar: "رياضي محترف",
//     treatment_ar: "جلسة L-Premier Post-Training Recovery",
//     rating: 5,
//     branch_badge_ar: "فرع أركان بلازا الشيخ زايد",
//     text_ar:
//       "للتعافي السريع واستعادة الحيوية بعد المجهود البدني والتمارين الشاقة، جلسة تقطير L-Premier الوريدية هي خياري الأساسي دائماً. الامتصاص المباشر يمنح العضلات استشفاءً سريعاً وبمعايير طبية تفوق التوقعات.",
//   },
//   {
//     id: 2,
//     name_ar: "نادين الصايغ",
//     role_ar: "استشارات النضارة ومكافحة الشيخوخة", // ← وصف خدمة مش وصف شخص
//     treatment_ar: "بروتوكول Glow & Hydrafacial الشامل",
//     rating: 5,
//     branch_badge_ar: "فرع EDNC سوديك التجمع الخامس",
//     text_ar:
//       "قمت بزيارة العيادة لجلسات نضارة البشرة والتقطير الوريدي المصاحب. النتائج طبيعية ومبهرة للغاية، وتصميم العيادة أشبه بملاذ صحي فاخر بمعايير عالمية تضاهي أرقى العيادات في دبي ولندن.",
//   },
// ];
// ─────────────────────────────────────────────────────────────────────────────

export function GccTestimonials() {
  const [testimonials, setTestimonials] = useState<VerifiedTestimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getTestimonials()
      .then((apiData) => {
        if (apiData && apiData.length > 0) {
          const mapped = apiData.slice(0, 3).map((item) => ({
            id: item.id,
            name_ar: item.name_ar || item.name || "",
            role_ar: item.role_ar || item.role || "",
            treatment_ar: item.description_ar || item.description || "",
            rating: item.rating || 5,
            text_ar: item.text_ar || item.text || "",
            branch_badge_ar: "",
          }));
          setTestimonials(mapped);
        }
      })
      .catch(() => {
        // No fallback to mock data — يجب أن تأتي التقييمات من الأدمن دشبورد فقط
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section
      className="py-20 bg-white relative overflow-hidden"
      id="gcc-testimonials"
    >
      {/* Background Accent Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-50 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={13} className="text-amber-600" />
            <span>آراء وتجارب موثقة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0d2235] mb-4">
            تجارب حقيقية لزوارنا الكرام
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            ثقة عملائنا وراحتهم هي مقياس نجاحنا الأول. إليك ما قاله عملاؤنا بعد
            تجربة جلسات العلاج الوريدي والرعاية الطبية في بريمير هيلث.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-16 mb-12">
            <Loader2 size={32} className="animate-spin text-amber-400" />
          </div>
        )}

        {/* Empty State */}
        {!loading && testimonials.length === 0 && (
          <div className="text-center py-16 mb-12 text-slate-400 text-sm">
            لا توجد تقييمات متاحة حالياً.
          </div>
        )}

        {/* Testimonials Grid */}
        {!loading && testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-slate-50/70 border border-slate-200/80 hover:border-amber-400/50 rounded-3xl p-7 lg:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 hover:-translate-y-1 relative group"
              >
                {/* Quote icon */}
                <div className="absolute top-6 left-6 text-amber-200/50 group-hover:text-amber-300/60 transition-colors pointer-events-none">
                  <Quote size={48} />
                </div>

                <div>
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  {/* Review text */}
                  <blockquote className="text-[#1a2d3d] text-sm sm:text-base leading-relaxed mb-6 italic relative z-10">
                    "{t.text_ar}"
                  </blockquote>
                </div>

                {/* Author info */}
                <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-[#0d2235] text-sm sm:text-base">
                      {t.name_ar}
                    </h3>
                    {t.role_ar && (
                      <p className="text-amber-700 text-xs font-medium mt-0.5">
                        {t.role_ar}
                      </p>
                    )}
                  </div>
                  <span className="shrink-0 text-[11px] font-bold text-[#1F3D5A] bg-[#1F3D5A]/8 border border-[#1F3D5A]/20 px-2.5 py-1 rounded-lg">
                    عميل بريمير هيلث
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Interactive Concierge Banner with WhatsApp & Call */}
        <div className="bg-gradient-to-r from-[#0d2235] via-[#1a3a50] to-[#0d2235] rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-[#0d2235]/15 border border-amber-400/20">
          <div className="text-center md:text-right">
            <h3 className="text-xl sm:text-2xl font-bold mb-1 text-white">
              هل ترغب في تجربة نفس الرعاية الفاخرة؟
            </h3>
            <p className="text-white/70 text-xs sm:text-sm">
              فريق الـ Concierge جاهز لتنسيق موعدك في أقرب فرع ومتابعة وصولك خطوة بخطوة.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            {/* Book Button */}
            <Link
              href="/ar/book-appointment"
              onClick={() =>
                trackStartBooking({
                  booking_source: "gcc_testimonials_banner",
                })
              }
              className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#0d2235] font-bold text-xs sm:text-sm py-3 px-5 rounded-xl transition-all shadow-md shadow-amber-400/20"
            >
              <CalendarCheck size={16} />
              <span>احجز جلستك</span>
            </Link>

            {/* WhatsApp Button */}
            <a
              href={`${CONTACT.whatsapp_url_eg}?text=${encodeURIComponent(
                "مرحباً، أود الاستفسار عن تجارب وجلسات IV Therapy في القاهرة [Ref: gcc_reviews_banner]"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackClickWhatsApp({
                  location: PAGE_PATH,
                  page_path: PAGE_PATH,
                  cta_position: "gcc_testimonials_banner",
                  phone_type: "EG",
                })
              }
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm py-3 px-5 rounded-xl transition-all shadow-md shadow-green-600/20"
            >
              <MessageCircle size={16} />
              <span>واتساب Concierge</span>
            </a>

            {/* Direct Call Button */}
            <a
              href={CONTACT.tel_eg}
              onClick={() =>
                trackClickCall({
                  location: PAGE_PATH,
                  page_path: PAGE_PATH,
                  cta_position: "gcc_testimonials_banner",
                  phone_type: "EG",
                })
              }
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl border border-white/20 transition-colors"
            >
              <Phone size={16} className="text-amber-400" />
              <span>اتصال</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
