"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { Award, Languages, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useDoctors } from "@/lib/api";

interface DepartmentDoctorsProps {
  slug: string;
}

export function DepartmentDoctors({ slug }: DepartmentDoctorsProps) {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === "ar";

  const { data: allDoctors = [], isLoading } = useDoctors({ department: slug });

  // Filter doctors by specialty matches
  const doctors = allDoctors.filter((doc) => {
    const sp = doc.specialty.toLowerCase();
    if (slug === "iv-therapy") return sp.includes("iv") || sp.includes("wellness") || sp.includes("nutrition");
    if (slug === "dermatology") return sp.includes("derm");
    if (slug === "aesthetics") return sp.includes("aesthetic");
    if (slug === "body-contouring") return sp.includes("body") || sp.includes("sculpt") || sp.includes("contour");
    return false;
  });

  if (doctors.length === 0) return null;

  return (
    <section className="bg-beige/40 py-16 mt-12 rounded-3xl border border-accent/5">
      <div className="luxury-container">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-primary mb-2">
            {t("Departments.departmentSpecialists")}
          </h2>
          <div className="h-[2px] w-16 bg-accent" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/doctor/${doc.slug}`} className="group block">
                <div className="bg-white rounded-2xl border border-accent/10 shadow-sm overflow-hidden hover:-translate-y-1 transition-transform duration-300 card-gold-accent">
                  {/* Photo */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={doc.photo}
                      alt={doc.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-serif font-bold text-primary group-hover:text-accent transition-colors">
                      {isAr ? doc.name_ar : doc.name}
                    </h3>
                    <p className="text-[10px] uppercase tracking-wider text-accent font-bold mt-1">
                      {isAr ? doc.position_ar : doc.position}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-[10px] text-foreground/75 font-semibold">
                      <span className="flex items-center gap-1">
                        <Award size={11} className="text-accent" />
                        {t("Doctors.experience", { years: doc.experience })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Languages size={11} className="text-accent" />
                        {doc.languages.slice(0, 2).join(", ")}
                      </span>
                    </div>
                    <div className="mt-4 pt-3 border-t border-accent/10 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-accent">
                        {t("Doctors.viewProfile")}
                      </span>
                      <ArrowRight size={12} className="text-accent rtl:rotate-180" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
