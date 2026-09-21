"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { getOptimizedImageUrl } from "@/lib/utils/image";
import type { IVDripProductSummary } from "@/lib/types/iv-drip";

interface Props {
  product: IVDripProductSummary;
  locale: string;
}

export function IVProductCard({ product, locale }: Props) {
  const t = useTranslations("IVDrip");
  const isAr = locale === "ar";

  const imageUrl = getOptimizedImageUrl(product.image, 600, 75);

  return (
    <Link
      href={`/iv-drip-therapy/${product.slug}`}
      className="group block h-full"
    >
      <div className="h-full bg-white rounded-3xl border border-slate-200/70 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden">
        {/* Clean Physical Product Showcase Container */}
        <div className="relative h-64 w-full bg-[#f4f5f7] p-6 flex items-center justify-center overflow-hidden border-b border-slate-100">
          <div className="relative w-full h-full flex items-center justify-center">
            {product.image && <Image
              src={imageUrl}
              alt={isAr ? product.name_ar : product.name}
              fill
              quality={80}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
            />}
          </div>

          {/* Featured badge */}
          {product.isFeatured && (
            <div className="absolute top-3.5 start-3.5 flex items-center gap-1 bg-accent text-white text-[10px] font-semibold rounded-full px-3 py-1 shadow-sm">
              <Sparkles size={10} />
              <span>{t("featured")}</span>
            </div>
          )}

          {/* Duration */}
          <div className="absolute bottom-3.5 end-3.5 flex items-center gap-1 bg-white/95 backdrop-blur-xs text-slate-700 text-xs font-medium rounded-full px-3 py-1 border border-slate-200/70 shadow-xs">
            <Clock size={11} className="text-accent" />
            <span>{t("duration", { minutes: product.durationMinutes })}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col justify-between gap-4">
          <div>
            <h3 className="text-xl font-serif font-bold text-primary group-hover:text-accent transition-colors mb-1.5 line-clamp-2">
              {isAr ? product.name_ar : product.name}
            </h3>
            <p className="text-xs text-accent font-medium mb-3 italic line-clamp-1">
              {isAr ? product.tagline_ar : product.tagline}
            </p>
            <p className="text-xs text-foreground/70 leading-relaxed line-clamp-3">
              {isAr ? product.shortDescription_ar : product.shortDescription}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <p className="text-lg font-serif font-bold text-primary">
              {t("price", { price: product.price })}
            </p>
            <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
              <ArrowRight
                size={15}
                className="text-accent group-hover:text-white rtl:rotate-180 transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
