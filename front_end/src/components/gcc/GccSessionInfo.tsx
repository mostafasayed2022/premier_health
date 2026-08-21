// ─── GccSessionInfo.tsx ───────────────────────────────────────────────────────
// Answers common questions about the IV Therapy session process

import { Clock, MapPin, CheckCircle, PhoneCall } from "lucide-react";

const infoItems = [
  {
    icon: Clock,
    question: "كم تستغرق الجلسة؟",
    answer:
      "تتراوح مدة جلسة IV Therapy بين 30 و 60 دقيقة حسب البروتوكول العلاجي المختار وتقييمك الطبي.",
  },
  {
    icon: CheckCircle,
    question: "ماذا يحدث قبل الجلسة؟",
    answer:
      "يبدأ طبيبنا بتقييم صحي مختصر يشمل سؤالك عن حالتك الصحية والأدوية التي تتناولها لتحديد أنسب البروتوكولات.",
  },
  {
    icon: MapPin,
    question: "أين تُقام الجلسات؟",
    answer:
      "في 3 فروع مجهزة طبياً: فيرمونت نايل سيتي في قلب القاهرة، أركان بلازا بالشيخ زايد، وEDNC سوديك بالتجمع الخامس.",
  },
  {
    icon: PhoneCall,
    question: "كيف أحجز؟",
    answer:
      "يمكنك الحجز مسبقاً قبل وصولك إلى القاهرة عبر موقعنا، أو التواصل مع Concierge عبر واتساب لمساعدتك في اختيار الموعد والفرع المناسب.",
  },
];

export function GccSessionInfo() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-amber-600 font-bold text-sm uppercase tracking-widest mb-2">
            كل ما تحتاج معرفته
          </p>
          <h2 className="text-3xl font-bold text-[#0d2235]">
            معلومات الجلسة
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {infoItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.question}
                className="rounded-2xl border border-slate-100 p-6 hover:border-amber-200 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-amber-600" />
                  </div>
                  <h3 className="font-bold text-[#0d2235] text-sm leading-tight pt-1.5">
                    {item.question}
                  </h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed pr-12">
                  {item.answer}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
