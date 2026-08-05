"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Images, ArrowRight, Maximize2 } from "lucide-react";
import Image from "next/image";
import type { Branch, GalleryItem } from "@/lib/types";

interface BranchGallerySectionProps {
  branches: Branch[];
  selectedBranchId: string;
  onSelectBranch: (id: string) => void;
  displayItems: (GalleryItem | any)[];
  isLoading: boolean;
  onOpenItem: (index: number) => void;
}

export function BranchGallerySection({
  branches,
  selectedBranchId,
  onSelectBranch,
  displayItems,
  isLoading,
  onOpenItem,
}: BranchGallerySectionProps) {
  const t = useTranslations("Branches");
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <section className="luxury-container pb-20">
      <div className="bg-slate-900/90 rounded-3xl p-8 md:p-12 border border-[#C8A96B]/20 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-[#C8A96B]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 relative z-10">
          <div>
            <span className="text-[#C8A96B] font-bold text-xs tracking-widest uppercase flex items-center gap-1.5 mb-2">
              <Images size={14} className="text-[#C8A96B]" />
              {t("galleryPreviewSubtitle")}
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
              {t("galleryPreviewTitle")}
            </h2>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#C8A96B] hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full border border-[#C8A96B]/30 w-fit"
          >
            <span>{t("exploreGallery")}</span>
            <ArrowRight size={16} className="rtl:rotate-180" />
          </Link>
        </div>

        {/* Branch Filter Tabs */}
        {branches.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 relative z-10 no-scrollbar">
            <button
              onClick={() => onSelectBranch("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                selectedBranchId === "all"
                  ? "bg-[#C8A96B] text-slate-950 shadow-md"
                  : "bg-white/5 hover:bg-white/15 text-slate-300 border border-white/10"
              }`}
            >
              {t("allBranches")}
            </button>
            {branches.map((br: any) => (
              <button
                key={br.id}
                onClick={() => onSelectBranch(String(br.id))}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                  selectedBranchId === String(br.id)
                    ? "bg-[#C8A96B] text-slate-950 shadow-md"
                    : "bg-white/5 hover:bg-white/15 text-slate-300 border border-white/10"
                }`}
              >
                {isAr ? br.name_ar || br.name : br.name}
              </button>
            ))}
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 relative z-10 animate-pulse">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="aspect-[4/3] bg-white/10 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 relative z-10">
            {displayItems.map((item, idx) => (
              <motion.div
                key={item.id || idx}
                whileHover={{ scale: 1.03 }}
                onClick={() => onOpenItem(idx)}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group border border-white/10 shadow-md bg-slate-800"
              >
                <Image
                  src={item.image}
                  alt={isAr ? item.title_ar || item.title : item.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                  <span className="text-[11px] font-serif text-white font-medium truncate">
                    {isAr ? item.title_ar || item.title : item.title}
                  </span>
                  <Maximize2 size={12} className="text-[#C8A96B] shrink-0" />
                </div>
                {item.branch_name && (
                  <div className="absolute top-2 left-2 rtl:left-auto rtl:right-2">
                    <span className="text-[9px] bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md text-[#C8A96B] font-bold border border-white/10">
                      {item.branch_name}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
