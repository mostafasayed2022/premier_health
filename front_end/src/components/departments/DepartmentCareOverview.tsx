"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ShieldCheck, Stethoscope, Sparkles, Award, UserCheck, Activity } from "lucide-react";

export function DepartmentCareOverview() {
  const t = useTranslations("Departments");

  const pillars = [
    {
      icon: <Stethoscope className="w-6 h-6 text-[#C8A96B]" />,
      title: t("pillar1Title"),
      desc: t("pillar1Desc"),
    },
    {
      icon: <Sparkles className="w-6 h-6 text-emerald-400" />,
      title: t("pillar2Title"),
      desc: t("pillar2Desc"),
    },
    {
      icon: <Award className="w-6 h-6 text-[#C8A96B]" />,
      title: t("pillar3Title"),
      desc: t("pillar3Desc"),
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: t("pillar4Title"),
      desc: t("pillar4Desc"),
    },
  ];

  const steps = [
    { step: "01", title: t("step1Title"), desc: t("step1Desc") },
    { step: "02", title: t("step2Title"), desc: t("step2Desc") },
    { step: "03", title: t("step3Title"), desc: t("step3Desc") },
    { step: "04", title: t("step4Title"), desc: t("step4Desc") },
  ];

  return (
    <section className="luxury-container py-16">
      {/* Pillars Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-[#C8A96B] font-bold text-[10px] uppercase tracking-[0.25em] bg-[#C8A96B]/10 border border-[#C8A96B]/30 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
          <Activity className="w-3 h-3 text-[#C8A96B]" />
          {t("careStandardsBadge")}
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mt-4 leading-tight">
          {t("careStandardsTitle")}
        </h2>
        <div className="h-[2px] w-20 bg-[#C8A96B] mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {pillars.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 rounded-3xl bg-white border border-[#C8A96B]/15 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-3 group card-gold-accent"
          >
            <div className="p-3 rounded-2xl bg-[#FAF7F2] w-fit group-hover:bg-[#C8A96B]/10 transition-colors">
              {item.icon}
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-[#C8A96B] transition-colors">
              {item.title}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Patient Care Journey Workflow Steps */}
      <div className="bg-slate-900 text-white rounded-[36px] p-8 md:p-12 relative overflow-hidden border border-white/10 shadow-lg">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C8A96B]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 text-center max-w-2xl mx-auto mb-10">
          <span className="text-[#C8A96B] font-bold text-[10px] uppercase tracking-widest">
            {t("journeyBadge")}
          </span>
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mt-2">
            {t("journeyTitle")}
          </h3>
        </div>

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-3 group hover:border-[#C8A96B]/50 transition-colors"
            >
              <span className="font-serif text-3xl font-bold text-[#C8A96B]/80 group-hover:text-[#C8A96B] transition-colors">
                {st.step}
              </span>
              <h4 className="font-serif text-base font-bold text-white">
                {st.title}
              </h4>
              <p className="text-xs text-white/70 leading-relaxed font-medium">
                {st.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
