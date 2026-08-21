// ─── GccWhoItsFor.tsx ─────────────────────────────────────────────────────────
// Target audience section for GCC visitors

import { Plane, Sun, Briefcase, Heart, Sparkles, Activity } from "lucide-react";

const profiles = [
  {
    icon: Plane,
    title: "المسافرون والزوار",
    desc: "تعب السفر وفوارق التوقيت؟ الترطيب الوريدي يعيد نضارتك في أسرع وقت.",
  },
  {
    icon: Briefcase,
    title: "رجال الأعمال",
    desc: "اجتماعات مكثفة وجداول ضيقة؟ استعد طاقتك وتركيزك خلال جلسة قصيرة.",
  },
  {
    icon: Activity,
    title: "محبو الرياضة",
    desc: "تعافَّ بشكل أسرع بعد التمرين المكثف مع بروتوكول التعافي الرياضي.",
  },
  {
    icon: Sun,
    title: "من يعانون من الإرهاق",
    desc: "إرهاق مستمر وطاقة منخفضة؟ جلسة تعزيز الطاقة هي الحل الأمثل.",
  },
  {
    icon: Sparkles,
    title: "المهتمون بالجمال",
    desc: "بشرة مضيئة وشعر قوي — الجلوتاثيون وفيتامين C للجمال من الداخل.",
  },
  {
    icon: Heart,
    title: "المهتمون بالصحة الوقائية",
    desc: "عزز مناعتك وحمِ نفسك من الأمراض الموسمية مع بروتوكول المناعة.",
  },
];

export function GccWhoItsFor() {
  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-amber-600 font-bold text-sm uppercase tracking-widest mb-2">
            لمن هذه الخدمة؟
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0d2235] mb-4">
            IV Therapy مناسب لك إذا…
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            سواء كنت مسافراً أو زائراً أو مقيماً، IV Therapy يناسب كل من يبحث
            عن طاقة وصحة أفضل
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {profiles.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="flex gap-3 p-5 bg-white rounded-2xl border border-slate-100 hover:border-amber-200 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0d2235] text-sm mb-1">{p.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
