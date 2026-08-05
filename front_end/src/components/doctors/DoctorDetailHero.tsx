"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Star, ShieldCheck, Calendar } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { DoctorData } from "./types";
import { T } from "@/i18n/T";

interface DoctorDetailHeroProps {
  doctor: DoctorData;
  children: React.ReactNode;
}

export function DoctorDetailHero({ doctor, children }: DoctorDetailHeroProps) {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fcfbf9] via-[#f7f2ea] to-[#fcfbf9] py-12 md:py-16 text-primary border-b border-accent/15">
      {/* Decorative Spheres */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="luxury-container relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-foreground/50 mb-8">
          <Link href="/doctors" className="hover:text-accent transition-colors font-medium">
            {t("Doctors.ourSpecialists")}
          </Link>
          <span>/</span>
          <span className="text-primary font-bold">
            {isAr ? doctor.name_ar : doctor.name}
          </span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[360px_1fr] items-start">
          {/* Photo Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* White Wrap with Gold Border */}
            <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-md border border-accent/20 bg-white p-2.5 group">
              <div className="relative h-full w-full rounded-[1.8rem] overflow-hidden">
                <Image
                  src={doctor.photo}
                  alt={doctor.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent pointer-events-none" />

                {/* Verified Badge Header */}
                <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-white/60 rounded-full px-3.5 py-1.5 text-xs text-primary font-medium shadow-md">
                  <ShieldCheck size={14} className="text-accent" />
                  <span>
                    <T
                      en="Verified Specialist"
                      ar="أخصائي معتمد"
                      de="Zertifizierter Spezialist"
                      es="Especialista Certificado"
                      fr="Spécialiste Certifié"
                      it="Specialista Certificato"
                      tr="Onaylı Uzman"
                    />
                  </span>
                </div>
              </div>
            </div>

            {/* Rating & Action Floating Bar */}
            <div className="absolute -bottom-5 left-4 right-4 bg-white border border-accent/20 rounded-2xl p-4 shadow-md">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-accent font-bold mb-0.5">
                    {t("Doctors.rating")}
                  </p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < Math.floor(doctor.rating || 5)
                            ? "fill-accent text-accent"
                            : "text-foreground/20"
                        }
                      />
                    ))}
                    <span className="text-xs font-bold text-primary ml-1">
                      {doctor.rating || 5.0}
                    </span>
                  </div>
                </div>

                <Link
                  href="/book-appointment"
                  className="bg-primary text-white text-xs uppercase tracking-wider font-bold px-4 py-2 rounded-full hover:bg-accent transition-colors shadow-md shrink-0 flex items-center gap-1.5"
                >
                  <Calendar size={13} />
                  <span>{t("Doctors.bookShort")}</span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Info Section */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-[10px] uppercase tracking-widest font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  {isAr ? doctor.specialty_ar : doctor.specialty}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary leading-tight mt-1">
                {isAr ? doctor.name_ar : doctor.name}
              </h1>

              <p className="text-xs uppercase tracking-widest text-accent font-bold">
                {isAr ? doctor.position_ar : doctor.position}
              </p>
            </div>

            {/* Stats & Bio Wrapped in Clean Container */}
            <div className="bg-white border border-accent/15 p-6 md:p-8 rounded-3xl shadow-sm flex flex-col gap-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
