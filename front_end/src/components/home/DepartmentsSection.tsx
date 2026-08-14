"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getDepartments, Department } from "@/lib/api";
import Image from "next/image";

export default function DepartmentsSection() {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === "ar";

  const [departments, setDepartments] = useState<Department[]>([]);
  const [activeDepartment, setActiveDepartment] = useState<Department | null>(null);

  useEffect(() => {
    getDepartments().then((data) => {
      if (data && data.length > 0) {
        setDepartments(data);
        setActiveDepartment(data[0]);
      }
    });
  }, []);

  if (!departments || departments.length === 0 || !activeDepartment) {
    return null;
  }

  const activePhoto =
    activeDepartment.photo ||
    activeDepartment.image_url ||
    "/Departments/iv_theapy.webp";

  const activeName = isAr
    ? activeDepartment.name_ar || activeDepartment.name
    : activeDepartment.name;

  const activeDesc = isAr
    ? activeDepartment.description_ar || activeDepartment.description
    : activeDepartment.description;

  return (
    <section className="relative w-full overflow-hidden py-12 md:py-20 lg:py-24">
      {/* Ambient background photo */}
      <Image
        src="/backgrounds/background1.webp"
        alt="Departments Background"
        fill
        sizes="100vw"
        className="object-cover object-center z-0 pointer-events-none"
      />

      {/* Luxury Background Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/40 to-primary/65 z-0 pointer-events-none" />

      {/* Decorative Glow Orbs */}
      <div className="absolute -top-32 -left-32 h-[350px] w-[350px] sm:h-[500px] sm:w-[500px] rounded-full bg-cyan-400/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-[300px] w-[300px] sm:h-[450px] sm:w-[450px] rounded-full bg-accent/15 blur-[120px] pointer-events-none" />

      <div className="luxury-container relative z-20">
        {/* Header */}
        <div className="relative text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16 flex flex-col items-center gap-3 sm:gap-4 px-4">
          {/* Ambient backlight glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 h-20 sm:h-24 bg-accent/20 rounded-full blur-[70px] pointer-events-none select-none" />

          <span className="relative z-10 text-accent text-[10px] sm:text-xs uppercase tracking-[0.25em] font-bold bg-white/5 border border-accent/40 px-3.5 sm:px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 text-white shadow-sm">
            <Sparkles size={11} className="text-accent animate-pulse" />
            {t("Home.departmentsBadge")}
          </span>

          <h2 className="relative z-10 text-2xl sm:text-3xl md:text-5xl font-serif font-light text-white tracking-tight leading-tight">
            {t("Home.servicesTitle")}
          </h2>

          <p className="relative z-10 text-xs sm:text-sm md:text-base text-white/80 leading-relaxed max-w-2xl font-normal">
            {t("Home.servicesSubtitle")}
          </p>

          <div className="relative z-10 flex items-center gap-3 sm:gap-4 w-full justify-center mt-1 sm:mt-2">
            <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent to-accent/60" />
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rotate-45 border border-accent/80 bg-accent" />
            <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent to-accent/60" />
          </div>
        </div>

        {/* Mobile / Tablet Horizontal Category Switcher (Visible below lg) */}
        <div className="block lg:hidden mb-5 sm:mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 px-1 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]">
            {departments.map((dept, idx) => {
              const isActive = dept.id === activeDepartment.id;
              const name = isAr ? dept.name_ar || dept.name : dept.name;

              return (
                <button
                  key={dept.id}
                  onClick={() => setActiveDepartment(dept)}
                  className={`
                    whitespace-nowrap flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 shrink-0 border
                    ${
                      isActive
                        ? "bg-accent text-slate-950 border-accent font-semibold shadow-lg shadow-accent/20 scale-[1.02]"
                        : "bg-white/10 text-white/85 border-white/10 hover:bg-white/15 hover:text-white"
                    }
                  `}
                >
                  <span
                    className={`text-[10px] font-mono font-bold ${
                      isActive ? "text-slate-950" : "text-accent"
                    }`}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span>{name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Card Container */}
        <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] bg-white/[0.04] backdrop-blur-md border border-white/10 shadow-2xl">
          <div className="relative z-10 flex flex-col lg:flex-row lg:h-[620px]">
            {/* ACTIVE DEPARTMENT SHOWCASE (LEFT on desktop, TOP on mobile) */}
            <div className="relative lg:w-[60%] min-h-[440px] sm:min-h-[500px] md:min-h-[540px] lg:h-full overflow-hidden flex flex-col justify-end">
              {/* Background Image with cross-fade */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDepartment.id}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activePhoto}
                    alt={activeName}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 60vw"
                    priority
                    className="object-cover object-center"
                  />

                  {/* Gradient overlays for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent lg:bg-gradient-to-r lg:from-slate-950/90 lg:via-slate-950/50 lg:to-transparent rtl:lg:bg-gradient-to-l" />
                </motion.div>
              </AnimatePresence>

              {/* Floating Department Details Box */}
              <motion.div
                key={activeDepartment.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="
                  relative z-20
                  m-4 sm:m-6 md:m-8 lg:m-8
                  p-5 sm:p-6 md:p-8
                  lg:max-w-[460px]
                  rounded-[20px] sm:rounded-[28px]
                  border border-white/15
                  bg-slate-950/50 sm:bg-slate-950/40
                  backdrop-blur-md
                  shadow-2xl
                "
              >
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <span className="text-accent uppercase tracking-[0.2em] text-[10px] sm:text-xs font-semibold">
                    {t("Home.luxuryMedicalCare")}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-white mb-2.5 sm:mb-3 leading-tight font-normal">
                  {activeName}
                </h3>

                <p className="text-xs sm:text-sm md:text-base text-white/85 leading-relaxed mb-5 sm:mb-6 font-normal line-clamp-3 sm:line-clamp-4 lg:line-clamp-4">
                  {activeDesc}
                </p>

                <div className="flex items-center gap-3">
                  <Button
                    asChild
                    className="
                      rounded-full
                      bg-accent
                      hover:bg-white
                      hover:text-slate-950
                      text-slate-950
                      font-semibold
                      text-xs sm:text-sm
                      px-6 sm:px-8
                      py-2 sm:py-2.5
                      transition-all
                      duration-300
                      shadow-md
                      hover:shadow-accent/30
                      inline-flex
                      items-center
                      gap-2
                    "
                  >
                    <Link href={`/department/${activeDepartment.slug}`}>
                      <span>{t("Departments.explore")}</span>
                      <ArrowUpRight size={16} className="rtl:rotate-[-90deg] shrink-0" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* RIGHT SIDEBAR (Desktop list & Tablet grid) */}
            <div className="lg:w-[40%] bg-black/20 backdrop-blur-md p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-s border-white/10">
              {/* Sidebar Header */}
              <div className="mb-4 sm:mb-6">
                <span className="text-accent uppercase tracking-[0.25em] text-[10px] sm:text-xs font-semibold">
                  {t("Home.medicalDepartments")}
                </span>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif text-white mt-1.5 sm:mt-2 font-normal">
                  {t("Home.ourSpecialties")}
                </h3>

                <div className="w-16 sm:w-20 h-[2px] bg-gradient-to-r from-accent to-transparent mt-3 sm:mt-4" />
              </div>

              {/* Departments List / Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-3 max-h-[320px] sm:max-h-[360px] lg:max-h-[380px] overflow-y-auto pr-1 rtl:pr-0 rtl:pl-1 scrollbar-thin scrollbar-thumb-accent/20 scrollbar-track-transparent">
                {departments.map((dept, index) => {
                  const active = dept.id === activeDepartment.id;
                  const name = isAr ? dept.name_ar || dept.name : dept.name;

                  return (
                    <button
                      key={dept.id}
                      onClick={() => setActiveDepartment(dept)}
                      className={`
                        group
                        w-full
                        text-start
                        rounded-xl sm:rounded-2xl
                        p-3.5 sm:p-4 lg:p-4.5
                        transition-all
                        duration-300
                        border-s-4
                        ${
                          active
                            ? "bg-white/12 border-accent shadow-md shadow-black/20 backdrop-blur-sm"
                            : "border-transparent bg-white/[0.02] hover:bg-white/8 hover:border-accent/40"
                        }
                      `}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={`
                              font-mono text-xs font-bold shrink-0 transition-colors
                              ${active ? "text-accent" : "text-white/40 group-hover:text-accent"}
                            `}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <h4
                            className={`
                              text-sm sm:text-base font-medium truncate transition-colors
                              ${
                                active
                                  ? "text-accent font-semibold"
                                  : "text-white group-hover:text-accent"
                              }
                            `}
                          >
                            {name}
                          </h4>
                        </div>

                        <ArrowRight
                          size={16}
                          className={`
                            shrink-0 transition-all duration-300 rtl:rotate-180
                            ${
                              active
                                ? "text-accent ltr:translate-x-1 rtl:-translate-x-1"
                                : "text-white/30 group-hover:text-accent ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                            }
                          `}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Sidebar Footer Note */}
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-5 border-t border-white/10">
                <p className="text-white/60 text-xs sm:text-sm italic leading-relaxed">
                  {t("Home.departmentsFooter")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

