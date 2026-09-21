"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { getOptimizedImageUrl } from "@/lib/utils/image";
import { useDepartments } from "@/lib/api";
import { ServiceData } from "./types";

interface ServiceCardProps {
  service: ServiceData;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === "ar";
  const { data: departments = [] } = useDepartments();

  const getDepartmentLabel = () => {
    if (
      isAr &&
      service.department_name_ar &&
      !/^\d+$/.test(service.department_name_ar)
    ) {
      return service.department_name_ar;
    }
    if (
      !isAr &&
      service.department_name &&
      !/^\d+$/.test(service.department_name)
    ) {
      return service.department_name;
    }

    const rawDept =
      (service as any).department_id ||
      (service as any).department ||
      service.department_slug ||
      service.category;
    const rawStr = String(rawDept || "").toLowerCase();

    const found = departments.find(
      (d) =>
        String(d.id).toLowerCase() === rawStr ||
        d.id.toLowerCase() === `dep${rawStr}` ||
        d.slug.toLowerCase() === rawStr ||
        d.name.toLowerCase() === rawStr,
    );
    if (found) {
      return isAr ? found.name_ar || found.name : found.name;
    }

    if (rawStr === "1" || rawStr === "iv-therapy" || rawStr === "dep1") {
      return isAr ? "العلاج بالتقطير الوريدي" : "IV Drip Therapy";
    }
    if (rawStr === "2" || rawStr === "dermatology" || rawStr === "dep2") {
      return isAr ? "الجلدية والعناية بالبشرة" : "Dermatology";
    }
    if (rawStr === "3" || rawStr === "aesthetics" || rawStr === "dep3") {
      return isAr ? "الطب التجميلي" : "Aesthetics";
    }
    if (rawStr === "4" || rawStr === "body-contouring" || rawStr === "dep4") {
      return isAr ? "نحت القوام والعناية الطبية" : "Body & Medical";
    }

    if (service.department_name && !/^\d+$/.test(service.department_name)) {
      return service.department_name;
    }
    if (service.category && !/^\d+$/.test(service.category)) {
      return service.category.replace("-", " ");
    }
    return isAr ? "الرعاية الطبية" : "Medical Care";
  };

  const defaultPhoto = "/Treatments/Detox.webp";
  const isVideo =
    service.photo &&
    (service.photo.endsWith(".mp4") ||
      service.photo.endsWith(".webm") ||
      service.photo.includes("/video/upload/"));
  const rawPhoto = !service.photo || isVideo ? defaultPhoto : service.photo;
  const photoUrl = getOptimizedImageUrl(rawPhoto, 600, 75);

  return (
    <Link href={`/services/${service.slug}`} className="group block h-full">
      <div className="h-full w-full bg-white rounded-3xl border border-accent/20 shadow-md hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden card-gold-accent">
        {/* Photo Header */}
        <div className="relative h-60 w-full overflow-hidden bg-beige">
          <Image
            src={photoUrl}
            alt={isAr ? service.name_ar : service.name}
            width={400}
            height={250}
            quality={75}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent" />
          <div className="absolute bottom-4 left-4 rtl:left-auto rtl:right-4 flex items-center gap-1.5 bg-primary/80 backdrop-blur-sm rounded-full px-3.5 py-1.5 border border-white/10 shadow-md">
            <span className="text-xs text-white font-medium">
              {getDepartmentLabel()}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-7 flex-1 flex flex-col justify-between gap-4">
          <div>
            <h3 className="text-xl font-serif font-bold text-primary group-hover:text-accent transition-colors mb-2 line-clamp-2">
              {isAr ? service.name_ar : service.name}
            </h3>
            <p className="text-xs text-foreground/75 leading-relaxed line-clamp-3">
              {isAr ? service.description_ar : service.description}
            </p>
            {service.ingredients && (
              <p className="text-[10px] italic text-accent mt-3 line-clamp-2 border-l-2 border-accent/30 pl-2 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-2">
                {isAr ? service.ingredients_ar : service.ingredients}
              </p>
            )}
          </div>

          {/* Footer Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-accent/10 mt-auto">
            <div className="flex flex-col">
              {service.price ? (
                <p className="text-xl font-serif font-bold text-primary">
                  ${service.price}
                </p>
              ) : (
                <span className="text-xs font-bold text-accent tracking-wide uppercase">
                  {t("Services.viewDetails")}
                </span>
              )}
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
  );
}
