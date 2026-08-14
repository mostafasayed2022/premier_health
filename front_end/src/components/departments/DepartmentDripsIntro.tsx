"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Droplets, CheckCircle2 } from "lucide-react";

export function DepartmentDripsIntro() {
  const t = useTranslations("DripsIntro");
  const [activeIndex, setActiveIndex] = useState(0);

  const points = [
    {
      num: "01",
      title: t("step1Title") || "Cellular Hydration",
      desc: t("step1Desc") || "Direct intravenous delivery ensures 100% bioavailability for immediate cellular absorption.",
      photo: "/drip/History.webp",
    },
    {
      num: "02",
      title: t("step2Title") || "Bespoke Formulations",
      desc: t("step2Desc") || "Tailored nutrient blends targeting immunity, energy, anti-aging, and athletic recovery.",
      photo: "/drip/Individual.webp",
    },
    {
      num: "03",
      title: t("step3Title") || "Physician Guided",
      desc: t("step3Desc") || "Administered in luxury private suites under continuous medical supervision.",
      photo: "/drip/Lab.webp",
    },
    {
      num: "04",
      title: t("step4Title") || "Instant Vitality",
      desc: t("step4Desc") || "Rapidly restores electrolyte balance, detoxifies the liver, and clears mental fatigue.",
      photo: "/drip/Medications.webp",
    },
    {
      num: "05",
      title: t("step5Title") || "Lasting Wellness",
      desc: t("step5Desc") || "Sustained physiological benefits that boost overall metabolic health and immunity.",
      photo: "/drip/Concerns.webp",
    },
  ];

  // Auto-cycle through the steps every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % points.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [points.length]);

  return (
    <section className="relative py-8 md:py-12 overflow-hidden bg-gradient-to-b from-[#fcfbf9] via-white to-[#fcfbf9] rounded-[2.5rem] border border-accent/15 my-6 shadow-md">
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="luxury-container relative z-10">
        {/* Compact Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 flex flex-col items-center gap-3">
          <span className="text-accent text-[10px] uppercase tracking-[0.25em] font-bold bg-accent/10 border border-accent/30 px-4 py-1 rounded-full inline-flex items-center gap-1.5 shadow-sm">
            <Droplets size={12} className="text-accent animate-pulse" />
            {t("badge") || "The Science of Hydration"}
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-primary tracking-tight">
            {t("title") || "Advanced IV Infusion Therapy"}
          </h2>

          <p className="text-xs md:text-sm text-foreground/80 leading-relaxed font-medium">
            {t("subtitle") || "Experience molecular-level rejuvenation designed to restore cellular vitality and peak physical energy."}
          </p>
        </div>

        {/* Compact Slider Card Layout */}
        <div className="bg-white border border-[#e8e0d5] rounded-3xl p-5 md:p-7 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center max-w-6xl mx-auto">
          
          {/* Left Column: Step Pills & Dynamic Info */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            {/* Step Navigation Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {points.map((pt, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={pt.num}
                    onClick={() => setActiveIndex(idx)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-300 shrink-0 ${
                      isActive
                        ? "bg-primary text-accent shadow-md border border-accent/40"
                        : "bg-[#f7f2ea] text-primary/70 hover:bg-accent/15 hover:text-primary border border-transparent"
                    }`}
                  >
                    <span className={`text-[10px] ${isActive ? "text-accent font-serif" : "text-primary/50"}`}>
                      {pt.num}
                    </span>
                    <span>Step {pt.num}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Step Content */}
            <div className="min-h-[140px] md:min-h-[150px] flex flex-col justify-between pt-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex flex-col gap-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-accent text-[11px] font-bold uppercase tracking-widest bg-accent/10 px-2.5 py-0.5 rounded-full border border-accent/20">
                      Phase {points[activeIndex].num}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-primary">
                      {points[activeIndex].title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-medium">
                    {points[activeIndex].desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Progress Bar (5s auto-cycle indicator) */}
              <div className="mt-4 pt-3 border-t border-accent/15 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[11px] font-bold text-primary">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span>100% Bioavailable IV Formula</span>
                </div>

                <div className="w-24 h-1.5 rounded-full bg-[#f7f2ea] overflow-hidden">
                  <motion.div
                    key={`progress-${activeIndex}`}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="h-full bg-accent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Compact Image Frame */}
          <div className="lg:col-span-6 relative w-full h-[240px] sm:h-[280px] md:h-[320px] rounded-2xl overflow-hidden border border-accent/20 shadow-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={points[activeIndex].photo}
                  alt={points[activeIndex].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Floating Glass Label on Image */}
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`label-${activeIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/80 backdrop-blur-sm border border-white/40 rounded-xl px-4 py-2.5 flex items-center justify-between shadow-lg"
                >
                  <span className="text-xs font-bold text-primary font-serif">
                    {points[activeIndex].title}
                  </span>
                  <span className="text-[10px] font-bold text-accent uppercase tracking-wider bg-primary/90 px-2 py-0.5 rounded-md">
                    {points[activeIndex].num} / 05
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

