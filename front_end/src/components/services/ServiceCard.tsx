"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { getOptimizedImageUrl } from "@/lib/utils/image";
import { ServiceData } from "./types";

interface ServiceCardProps {
  service: ServiceData;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === "ar";

  const defaultPhoto =
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800";
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
          <div className="absolute bottom-4 left-4 rtl:left-auto rtl:right-4 flex items-center gap-1.5 bg-primary/70 backdrop-blur-sm rounded-full px-3.5 py-1.5 border border-white/10 shadow-md">
            <span className="text-xs text-white font-medium capitalize">
              {(service.category || "general").replace("-", " ")}
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
