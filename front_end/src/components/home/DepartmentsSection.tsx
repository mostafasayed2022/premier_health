"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getDepartments, Department } from "@/lib/api";
import Image from "next/image";
import { useEffect } from "react";

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

  return (
    <section className="relative w-full overflow-hidden py-8 md:py-12">
      <Image
        src="/backgrounds/background1.webp"
        alt="Departments Background"
        fill
        sizes="100vw"
        className="object-cover object-center z-0 pointer-events-none"
      />
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/25 to-primary/55 z-0" />{" "}
      {/* Decorative Glow */}
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-blue-500/10 blur-[140px]" />
      {/* Header */}
      <div className="relative z-20 text-center max-w-2xl mx-auto mb-8 md:mb-12 flex flex-col items-center gap-4">
        {/* Ambient backlight glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-24 bg-accent/20 rounded-full blur-[80px] pointer-events-none select-none" />

        <span className="relative z-10 text-accent text-[10px] uppercase tracking-[0.25em] font-bold bg-white/5 border border-accent/40 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 text-white">
          <Sparkles size={10} className="text-accent animate-pulse" />
          {t("Home.departmentsBadge")}
        </span>

        <h2 className="relative z-10 text-3xl md:text-5xl font-serif font-light text-white tracking-tight leading-tight">
          {t("Home.servicesTitle")}
        </h2>

        <p className="relative z-10 text-sm md:text-base text-white/80 leading-relaxed max-w-2xl font-medium">
          {t("Home.servicesSubtitle")}
        </p>

        <div className="relative z-10 flex items-center gap-4 w-full justify-center mt-2">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-accent/50" />
          <div className="w-2 h-2 rotate-45 border border-accent/80 bg-accent" />
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-accent/50" />
        </div>
      </div>
      {/* Main Container */}
      <div className="relative z-20 overflow-hidden rounded-[32px] bg-white/4 backdrop-blur-sm border border-white/10 shadow-md">
        {" "}
        {/* Content */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:h-[620px]">
          {" "}
          {/* LEFT IMAGE SECTION */}
          <div className="relative lg:w-[60%] h-[300px] md:h-[420px] lg:h-full overflow-hidden">
            {" "}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDepartment.id}
                initial={{
                  opacity: 0,
                  scale: 1.08,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.8,
                }}
                className="absolute inset-0"
              >
                <Image
                  src={activeDepartment.photo}
                  alt={isAr ? activeDepartment.name_ar : activeDepartment.name}
                  fill
                  sizes="(max-width:768px) 100vw, 60vw"
                  loading="lazy"
                  className="
    object-cover
    object-center
    transition-transform
    duration-700
    ease-out
    group-hover:scale-105
  "
                />

                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
              </motion.div>
            </AnimatePresence>
            {/* Floating Glass Card */}
            <motion.div
              key={activeDepartment.slug}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="
            absolute
            bottom-6
            left-6
            right-6
            lg:max-w-[430px]
            rounded-[28px]
            border
            border-white/10
            bg-white/10
            backdrop-blur-sm
            p-6
            z-20
          "
            >
              <span className="text-accent uppercase tracking-[0.25em] text-xs font-semibold">
                {t("Home.luxuryMedicalCare")}
              </span>

              <h3 className="text-2xl lg:text-4xl font-serif text-white mt-4 mb-4 leading-tight">
                {isAr ? activeDepartment.name_ar : activeDepartment.name}
              </h3>

              <p className="text-white/95 leading-relaxed mb-6 font-semibold">
                {isAr
                  ? activeDepartment.description_ar
                  : activeDepartment.description}
              </p>

              <Button
                asChild
                className="
              rounded-full
              bg-accent
              hover:bg-white
              hover:text-primary
              px-8
            "
              >
                <Link href={`/department/${activeDepartment.slug}`}>
                  {t("Departments.explore")}
                </Link>
              </Button>
            </motion.div>
          </div>
          {/* RIGHT SIDEBAR */}
          <div className="lg:w-[40%] bg-black/10 backdrop-blur-sm px-6 py-6 md:px-8 md:py-10 lg:px-12 lg:py-12 flex flex-col justify-center">
            {" "}
            <div className="mb-10">
              <span className="text-accent uppercase tracking-[0.25em] text-xs font-semibold">
                {t("Home.medicalDepartments")}
              </span>

              <h3 className="text-2xl lg:text-4xl font-serif text-white mt-3">
                {t("Home.ourSpecialties")}
              </h3>

              <div className="w-20 h-[2px] bg-accent mt-5" />
            </div>
            <div className="space-y-3 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-accent/20 pr-2">
              {departments.map((dept, index) => {
                const active = dept.id === activeDepartment.id;

                return (
                  <motion.button
                    key={dept.id}
                    onClick={() => setActiveDepartment(dept)}
                    whileHover={{
                      x: isAr ? -6 : 6,
                    }}
                    className={`
                  group
                  w-full
                  text-start
                  rounded-2xl
                  p-4 md:p-6
                  transition-all
                  duration-300
                  border-l-4
                  ${
                    active
                      ? "bg-white/10 border-accent"
                      : "border-transparent hover:bg-white/5"
                  }
                `}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <span className="block text-accent text-xs mb-1 font-semibold">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <h4 className="text-white text-lg font-medium group-hover:text-accent transition-colors">
                          {isAr ? dept.name_ar : dept.name}
                        </h4>
                      </div>

                      <ArrowRight
                        size={18}
                        className={`
                      text-accent
                      shrink-0
                      ${isAr ? "rotate-180" : ""}
                    `}
                      />
                    </div>
                  </motion.button>
                );
              })}
            </div>
            <div className="mt-12 pt-10 border-t border-white/10">
              <p className="text-white/60 italic leading-relaxed">
                {"Home.departmentsFooter"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
