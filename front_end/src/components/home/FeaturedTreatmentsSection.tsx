"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle2, FlaskConical, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { getServices, Service } from "@/lib/api";
import Image from "next/image";

export default function FeaturedTreatmentsSection() {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === "ar";
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    getServices().then((data) => {
      if (data && data.length > 0) {
        setServices(data);
      }
    });
  }, []);

  if (!services || services.length === 0) {
    return null;
  }

  return (
    <section className="bg-gradient-to-b from-white via-[#fcfbf9] to-white py-12 md:py-20 relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 -left-32 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[140px]" />
        <div className="absolute top-2/3 -right-32 h-[450px] w-[450px] rounded-full bg-primary/5 blur-[160px]" />
      </div>

      {/* Header */}
      <div className="relative max-w-3xl mx-auto text-center mb-12 md:mb-16 flex flex-col items-center gap-4 relative z-10 px-6">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 text-accent text-[10px] uppercase tracking-[0.25em] font-bold bg-accent/10 border border-accent/30 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm"
        >
          <Sparkles size={12} className="text-accent animate-pulse" />
          {t("Home.featuredTreatments") || "Our Premier Services"}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="relative z-10 text-3xl md:text-5xl font-serif text-primary tracking-tight leading-tight"
        >
          {t("Home.featuredTitle")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative z-10 text-sm md:text-base text-foreground/80 leading-relaxed max-w-2xl font-medium"
        >
          {t("Home.featuredSubtitle")}
        </motion.p>

        <div className="relative z-10 flex items-center gap-4 w-full justify-center mt-2">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-accent/50" />
          <div className="w-2 h-2 rotate-45 border border-accent/80 bg-white" />
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-accent/50" />
        </div>
      </div>

      {/* Services Glassmorphism Cards Grid */}
      <div className="luxury-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 6).map((service, index) => {
            const benefitsList = isAr ? service.benefits_ar : service.benefits;
            const ingredientsText = isAr ? service.ingredients_ar : service.ingredients;
            const categoryTitle = service.category ? service.category.toUpperCase() : "MEDICAL CARE";

            return (
              <motion.div
                key={service.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative rounded-[2.5rem] bg-white/80 backdrop-blur-sm border border-[#e8e0d5] hover:border-accent/40 p-6 md:p-7 shadow-lg hover:shadow-md transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between overflow-hidden"
              >
                {/* Subtle Glow on Card Hover */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/10 rounded-full blur-2xl pointer-events-none group-hover:bg-accent/20 transition-all duration-500" />

                <div>
                  {/* Image Frame */}
                  <div className="relative h-56 w-full rounded-2xl overflow-hidden mb-6 border border-accent/15 shadow-sm bg-[#f7f2ea]">
                    <Image
                      src={service.photo}
                      alt={isAr ? service.name_ar : service.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#243642]/60 via-transparent to-transparent" />
                    
                    {/* Category Badge overlay on image */}
                    <span className="absolute top-4 left-4 text-[9px] uppercase font-bold tracking-widest text-white bg-[#243642]/90 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 shadow-md">
                      {categoryTitle}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-serif text-primary mb-3 group-hover:text-accent transition-colors font-bold">
                    {isAr ? service.name_ar : service.name}
                  </h3>

                  {/* Description */}
                  <p className="text-foreground/80 text-xs md:text-sm leading-relaxed mb-5 font-medium">
                    {isAr ? service.description_ar : service.description}
                  </p>

                  {/* Key Benefits List */}
                  {benefitsList && benefitsList.length > 0 && (
                    <div className="mb-5 pt-3 border-t border-accent/10">
                      <div className="flex flex-col gap-2">
                        {benefitsList.map((benefit, bIdx) => (
                          <div key={bIdx} className="flex items-center gap-2 text-xs font-semibold text-primary">
                            <CheckCircle2 size={14} className="text-accent shrink-0" />
                            <span className="line-clamp-1">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Ingredients Section */}
                  {ingredientsText && (
                    <div className="bg-[#f7f2ea]/60 rounded-2xl p-3.5 border border-accent/15 flex items-start gap-2.5">
                      <FlaskConical size={16} className="text-accent shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[9px] uppercase tracking-wider text-accent font-black mb-0.5">
                          {t("Services.activeFormula") || "Active Formula"}
                        </span>
                        <p className="text-xs text-foreground/85 leading-relaxed font-semibold line-clamp-2">
                          {ingredientsText}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Decorative Bottom Bar (No Price, No Button) */}
                <div className="mt-6 pt-4 border-t border-accent/10 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest">
                    Premier Healthcare Standard
                  </span>
                  <div className="h-2 w-2 rounded-full bg-accent group-hover:scale-150 transition-transform duration-300" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

