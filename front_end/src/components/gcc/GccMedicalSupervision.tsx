// ─── GccMedicalSupervision.tsx ────────────────────────────────────────────────
// Medical supervision value proposition for GCC visitors

import { Stethoscope, ClipboardList, UserCheck, HeartPulse } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "تقييم طبي أولي",
    desc: "يقوم الطبيب بإجراء تقييم صحي شامل قبل الجلسة لضمان ملاءمة البروتوكول العلاجي لاحتياجاتك.",
  },
  {
    icon: Stethoscope,
    title: "تصميم البروتوكول العلاجي",
    desc: "تُحدَّد تركيبة المحلول الوريدي بناءً على تقييمك الطبي وتاريخك الصحي.",
  },
  {
    icon: UserCheck,
    title: "إشراف طبي أثناء الجلسة",
    desc: "طاقم طبي متخصص يرافقك طوال فترة الجلسة التي تتراوح بين 30-60 دقيقة.",
  },
  {
    icon: HeartPulse,
    title: "متابعة ما بعد الجلسة",
    desc: "توصيات طبية بعد الجلسة ودعم Concierge لضمان أفضل النتائج خلال إقامتك.",
  },
];

export function GccMedicalSupervision() {
  return (
    <section className="py-16 bg-[#0d2235] text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <p className="text-amber-400 font-bold text-sm uppercase tracking-widest mb-3">
              الرعاية الطبية أولاً
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              إشراف طبي متكامل
              <br />
              <span className="text-amber-300">في كل خطوة</span>
            </h2>
            <p className="text-white/70 text-base leading-relaxed mb-6">
              لسنا مجرد جلسات تقديم مغذيات — نحن نقدم رعاية طبية حقيقية
              بأعلى المعايير. كل جلسة تبدأ بتقييم طبي شامل وتنتهي بمتابعة
              متخصصة.
            </p>
            <div className="flex items-center gap-3 bg-amber-400/10 border border-amber-400/20 rounded-xl p-4">
              <Stethoscope size={20} className="text-amber-400 flex-shrink-0" />
              <p className="text-white/80 text-sm">
                جميع الجلسات تحت إشراف <strong className="text-white">أطباء مرخصين</strong> ومتخصصين في الطب الداخلي
              </p>
            </div>
          </div>

          {/* Right: Steps */}
          <div className="flex flex-col gap-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="flex gap-4 bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-400/20 flex items-center justify-center">
                    <Icon size={20} className="text-amber-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 rounded px-1.5 py-0.5">
                        {idx + 1}
                      </span>
                      <h3 className="font-bold text-sm text-white">{step.title}</h3>
                    </div>
                    <p className="text-white/60 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
