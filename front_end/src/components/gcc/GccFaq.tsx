"use client";

// ─── GccFaq.tsx ───────────────────────────────────────────────────────────────
// GCC-specific FAQ accordion using only actual business capabilities

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "هل يمكنني الحجز قبل الوصول إلى القاهرة؟",
    a: "نعم! يمكنك الحجز عبر موقعنا مسبقاً أو التواصل مع Concierge عبر واتساب لضمان حصولك على الموعد المناسب.",
  },
  {
    q: "أين تقع الفروع؟",
    a: "لدينا 3 فروع: فيرمونت نايل سيتي في قلب القاهرة، أركان بلازا بالشيخ زايد غرب القاهرة، وEDNC سوديك بالتجمع الخامس في القاهرة الجديدة.",
  },
  {
    q: "كم تستغرق جلسة IV Therapy؟",
    a: "تتراوح مدة الجلسة بين 30 و 60 دقيقة حسب البروتوكول العلاجي المختار ونتيجة التقييم الطبي الأولي.",
  },
  {
    q: "هل يوجد تقييم طبي قبل الجلسة؟",
    a: "نعم، يبدأ طبيبنا بتقييم صحي مختصر قبل كل جلسة للتأكد من ملاءمة البروتوكول العلاجي لحالتك الصحية وتحديد أنسب التركيبات لك.",
  },
  {
    q: "كيف يمكنني التواصل مع الـ Concierge؟",
    a: "يمكنك التواصل معنا مباشرةً عبر واتساب أو الاتصال على أرقامنا المتاحة. فريق Concierge متاح للرد على جميع استفساراتك.",
  },
  {
    q: "ما الخدمات المتاحة لزوار الخليج؟",
    a: "نقدم طيفاً واسعاً من جلسات IV Therapy: تعزيز الطاقة، تقوية المناعة، الترطيب، الإشراق والجمال، التعافي، وتعزيز التركيز. كل جلسة مخصصة وفق تقييمك الطبي.",
  },
  {
    q: "هل يمكنني اختيار الفرع؟",
    a: "بالتأكيد. يمكنك اختيار أي فرع يناسب موقع إقامتك أو برنامجك في القاهرة. فريق Concierge يساعدك في اختيار الفرع المناسب.",
  },
];

export function GccFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-amber-600 font-bold text-sm uppercase tracking-widest mb-2">
            الأسئلة الشائعة
          </p>
          <h2 className="text-3xl font-bold text-[#0d2235]">
            لديك تساؤلات؟
          </h2>
        </div>

        <div className="flex flex-col gap-2">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-100 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="flex items-center justify-between w-full text-right p-5 text-[#0d2235] font-bold text-sm hover:bg-slate-50 transition-colors"
                aria-expanded={openIdx === idx}
              >
                <span className="leading-snug">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`flex-shrink-0 mr-3 text-amber-500 transition-transform duration-200 ${
                    openIdx === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIdx === idx && (
                <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-50">
                  <div className="pt-3">{faq.a}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
