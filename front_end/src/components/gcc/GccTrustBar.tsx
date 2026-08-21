// ─── GccTrustBar.tsx ─────────────────────────────────────────────────────────
// Trust indicators for GCC visitors — medical supervision, premium setting, 3 locations

import { ShieldCheck, Award, MapPin, HeartPulse } from "lucide-react";

const trustItems = [
  {
    icon: HeartPulse,
    title: "إشراف طبي متكامل",
    desc: "تقييم طبي قبل كل جلسة",
  },
  {
    icon: ShieldCheck,
    title: "بيئة طبية خاصة وآمنة",
    desc: "مساحة خاصة ومريحة بالكامل",
  },
  {
    icon: MapPin,
    title: "3 مواقع مميزة",
    desc: "فيرمونت · أركان · سوديك",
  },
  {
    icon: Award,
    title: "فريق طبي متخصص",
    desc: "أطباء وممرضون محترفون",
  },
];

export function GccTrustBar() {
  return (
    <section className="py-10 bg-[#0d2235] text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex flex-col items-center text-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-400/20 flex items-center justify-center">
                  <Icon size={24} className="text-amber-400" />
                </div>
                <div>
                  <p className="font-bold text-sm text-white">{item.title}</p>
                  <p className="text-xs text-white/60 mt-0.5">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
