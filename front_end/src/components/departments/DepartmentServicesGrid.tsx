"use client";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Service } from "@/lib/api";

interface Props {
  services: Service[];
  departmentName: string;
  departmentName_ar: string;
}

export function DepartmentServicesGrid({
  services,
  departmentName,
  departmentName_ar,
}: Props) {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <section className="luxury-container py-16">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => {
          const defaultPhoto = "/Treatments/Detox.webp";
          const isVideo =
            service.photo &&
            (service.photo.endsWith(".mp4") ||
              service.photo.endsWith(".webm") ||
              service.photo.includes("/video/upload/"));
          const photoUrl = !service.photo || isVideo ? defaultPhoto : service.photo;

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="h-full"
            >
              <Link
                href={`/services/${service.slug}`}
                className="group block h-full"
              >
                <div className="h-full bg-white rounded-3xl border border-accent/20 shadow-md hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden card-gold-accent">
                  {/* Photo Header */}
                  <div className="relative h-60 w-full overflow-hidden bg-beige">
                    <Image
                      src={photoUrl}
                      alt={isAr ? service.name_ar : service.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 rtl:left-auto rtl:right-4 flex items-center gap-1.5 bg-primary/70 backdrop-blur-sm rounded-full px-3.5 py-1.5 border border-white/10">
                      <span className="text-xs text-white font-medium">
                        {t("Departments.serviceBadge")}
                      </span>
                    </div>
                  </div>

                  <div className="p-7 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-serif font-bold text-primary mb-2 group-hover:text-accent transition-colors line-clamp-2">
                        {isAr ? service.name_ar : service.name}
                      </h3>

                      <p className="text-xs text-foreground/75 leading-relaxed line-clamp-3 mb-4">
                        {isAr ? service.description_ar : service.description}
                      </p>

                      {/* Ingredients preview */}
                      {service.ingredients && (
                        <p className="text-[10px] text-accent/80 italic line-clamp-1 border-l-2 border-accent/30 pl-2 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-2">
                          {isAr ? service.ingredients_ar : service.ingredients}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-accent/10 mt-auto">
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-foreground/50 font-bold mb-0.5">
                          {t("Services.startingFrom")}
                        </p>
                        <p className="text-2xl font-serif font-bold text-primary">
                          <span className="text-accent text-base font-sans mr-0.5">$</span>
                          {service.price}
                        </p>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                        <ArrowRight
                          size={15}
                          className="text-accent group-hover:text-white group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
