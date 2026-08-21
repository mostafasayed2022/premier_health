"use client";

// ─── GccDoctors.tsx ───────────────────────────────────────────────────────────
// Real Verified Medical Team for GCC Landing Page with WhatsApp, Call & Booking
// Real Doctors: Dr. Bassant & Dr. Rama

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Award,
  CheckCircle2,
  CalendarCheck,
  MessageCircle,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { CONTACT } from "@/lib/config/contact";
import {
  trackClickWhatsApp,
  trackClickCall,
  trackStartBooking,
} from "@/lib/analytics/events";
import { getDoctors, Doctor } from "@/lib/api";

const PAGE_PATH = "/gcc/iv-theropy/ar";

interface VerifiedDoctor {
  id: number;
  name_ar: string;
  name_en: string;
  title_ar: string;
  specialty_ar: string;
  experience_years: number;
  patients_count: number;
  bio_ar: string;
  image_url: string;
  badges_ar: string[];
}

const REAL_VERIFIED_DOCTORS: VerifiedDoctor[] = [
  {
    id: 1,
    name_ar: "د. بسنت",
    name_en: "Dr. Bassant",
    title_ar: "المدير الإكلينيكي واستشارية الجلدية والطب التجديدي",
    specialty_ar: "الأمراض الجلدية والعلاجات الوريدية ومكافحة الشيخوخة",
    experience_years: 10,
    patients_count: 340,
    bio_ar:
      "استشارية متخصصة معتمدة تتمتع بخبرة تزيد عن 10 سنوات في تصميم بروتوكولات الحقن الوريدي IV Therapy والتقطير الخلوي والعلاجات الجلدية التجميلية المتطورة.",
    image_url:
      "https://res.cloudinary.com/u3q5mcfx/image/upload/v1/uploads/1/bassant_rv6jda.jpg",
    badges_ar: ["إشراف مباشر", "بروتوكولات دقيقة", "خبرة 10+ سنوات"],
  },
  {
    id: 2,
    name_ar: "د. راما",
    name_en: "Dr. Rama",
    title_ar: "المدير الإكلينيكي واستشارية تجديد الخلايا والـ Wellness",
    specialty_ar: "علاجات NAD+ التجديدية والطب الوقائي ومغذيات الطاقة",
    experience_years: 12,
    patients_count: 500,
    bio_ar:
      "خبرة دولية واسعة في بروتوكولات NAD+ واستعادة النشاط الحيوي بعد السفر والإرهاق، مع تقييم صحي شامل يضمن أفضل امتصاص وأعلى درجات الأمان.",
    image_url:
      "https://res.cloudinary.com/u3q5mcfx/image/upload/v1/uploads/1/rama_x7yai6.jpg",
    badges_ar: ["استشارات خاصة", "علاجات NAD+ المتقدمة", "خبرة 12+ سنة"],
  },
];

export function GccDoctors() {
  const [doctors, setDoctors] = useState<VerifiedDoctor[]>(REAL_VERIFIED_DOCTORS);

  useEffect(() => {
    getDoctors()
      .then((apiDocs) => {
        if (apiDocs && apiDocs.length > 0) {
          const merged = REAL_VERIFIED_DOCTORS.map((curated) => {
            const match = apiDocs.find((d) => String(d.id) === String(curated.id));
            if (!match) return curated;
            return {
              ...curated,
              image_url: match.photo || match.image_url || curated.image_url,
              experience_years: match.experience || curated.experience_years,
              patients_count: match.patients || curated.patients_count,
            };
          });
          setDoctors(merged);
        }
      })
      .catch(() => {
        // Fallback to verified real doctors
      });
  }, []);

  return (
    <section className="py-20 bg-[#0a1b2a] text-white relative overflow-hidden" id="gcc-doctors">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-400/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Award size={13} className="text-amber-400" />
            <span>نخبة الأطباء والاستشاريين</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            إشراف طبي مباشر من كبار الاستشاريين
          </h2>
          <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            كل جلسة IV Therapy تخضع لتقييم طبي شخصي مسبق بإشراف أطبائنا المتخصصين لضمان أعلى مستويات الأمان والفعالية.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white/[0.04] border border-white/10 hover:border-amber-400/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-black/50 group"
            >
              <div>
                {/* Doctor Avatar & Quick Info */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6 text-center sm:text-right">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shrink-0 border-2 border-amber-400/30 group-hover:border-amber-400 shadow-xl bg-slate-800">
                    <Image
                      src={doc.image_url}
                      alt={doc.name_ar}
                      fill
                      sizes="128px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                        {doc.experience_years}+ سنوات خبرة
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-amber-300 transition-colors mb-1">
                      {doc.name_ar}
                    </h3>
                    <p className="text-amber-400 text-xs font-semibold mb-1">
                      {doc.title_ar}
                    </p>
                    <p className="text-white/60 text-xs">
                      {doc.specialty_ar}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-white/75 text-xs sm:text-sm leading-relaxed mb-6 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                  {doc.bio_ar}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {doc.badges_ar.map((badge, bIdx) => (
                    <span
                      key={bIdx}
                      className="flex items-center gap-1.5 text-[11px] font-medium text-white/80 bg-white/5 border border-white/10 px-3 py-1 rounded-xl"
                    >
                      <CheckCircle2 size={12} className="text-amber-400" />
                      <span>{badge}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Book, WhatsApp, Call */}
              <div className="space-y-2.5 pt-2">
                {/* Primary Booking Button */}
                <Link
                  href="/ar/book-appointment"
                  onClick={() =>
                    trackStartBooking({
                      service_name: `استشارة مع ${doc.name_ar}`,
                      booking_source: "gcc_doctor_card",
                    })
                  }
                  className="w-full flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#0d2235] font-bold text-xs sm:text-sm py-3 px-6 rounded-xl transition-all shadow-md shadow-amber-400/20 hover:-translate-y-0.5"
                >
                  <CalendarCheck size={16} />
                  <span>حجز استشارة مع {doc.name_ar}</span>
                </Link>

                {/* WhatsApp & Call Direct Links */}
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`${CONTACT.whatsapp_url_eg}?text=${encodeURIComponent(
                      `مرحباً، أود الاستفسار وحجز موعد استشارة مع ${doc.name_ar} بخصوص جلسات IV Therapy [Ref: doc_${doc.id}]`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackClickWhatsApp({
                        location: PAGE_PATH,
                        page_path: PAGE_PATH,
                        service_name: `استشارة مع ${doc.name_ar}`,
                        cta_position: "gcc_doctor_card",
                        phone_type: "EG",
                      })
                    }
                    className="flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs py-2.5 px-3 rounded-xl transition-all shadow-md shadow-green-600/20"
                  >
                    <MessageCircle size={14} />
                    <span>واتساب {doc.name_ar}</span>
                  </a>

                  <a
                    href={CONTACT.tel_eg}
                    onClick={() =>
                      trackClickCall({
                        location: PAGE_PATH,
                        page_path: PAGE_PATH,
                        service_name: `استشارة مع ${doc.name_ar}`,
                        cta_position: "gcc_doctor_card",
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
