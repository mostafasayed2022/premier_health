"use client";

import React, { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { getGallery } from "@/lib/api";
import { GalleryItem } from "@/lib/types";

export function GalleryGrid() {
  const t = useTranslations("Gallery");
  const locale = useLocale();
  const isAr = locale === "ar";

  const [items, setItems] = useState<GalleryItem[]>([]);
  const [filter, setFilter] = useState<"all" | "facility" | "treatment" | "equipment">("all");
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getGallery();
        setItems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredItems = items.filter((item) => {
    if (filter === "all") return true;
    return item.category === filter;
  });

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => (prev! + 1) % filteredItems.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === "Escape") setActiveImageIndex(null);
      if (e.key === "ArrowRight") {
        if (isAr) handlePrev();
        else handleNext();
      }
      if (e.key === "ArrowLeft") {
        if (isAr) handleNext();
        else handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex, filteredItems, isAr]);

  const categories = [
    { key: "all", label: t("categoryAll") },
    { key: "facility", label: t("categoryFacility") },
    { key: "treatment", label: t("categoryTreatment") },
    { key: "equipment", label: t("categoryEquipment") },
  ] as const;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-accent/20 border-t-accent animate-spin" />
        <p className="text-sm font-medium text-slate-400 font-sans uppercase tracking-widest">
          {locale === "ar" ? "جاري تحميل المعرض..." : "Loading Sanctuary Gallery..."}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Category Tabs - Minimalist Style */}
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mb-12 relative z-10 border-b border-slate-200/60 pb-3">
        {categories.map((cat) => {
          const isActive = filter === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => {
                setFilter(cat.key);
                setActiveImageIndex(null);
              }}
              className="relative py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 focus:outline-none"
            >
              <span className={`transition-colors duration-300 ${isActive ? "text-[#D4AF37]" : "text-slate-400 hover:text-slate-600"}`}>
                {cat.label}
              </span>
              {isActive && (
                <motion.span
                  layoutId="activeFilterUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              key={item.id}
              className="flex flex-col gap-3 group"
            >
              {/* Image Frame */}
              <div
                onClick={() => setActiveImageIndex(idx)}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-slate-100 border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={isAr ? item.title_ar : item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-900 flex items-center justify-center text-white text-3xl">
                    🎬
                  </div>
                )}
                {(item.media_type === "video" || item.video_file_url || item.video_url) && (
                  <div className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-full flex items-center gap-1">
                    <span>▶</span> {locale === "ar" ? "فيديو" : "VIDEO"}
                  </div>
                )}
              </div>

              {/* Text Details - Simple and Clean Underneath */}
              <div className="flex flex-col gap-1 px-1">
                <span className="text-[9px] text-[#D4AF37] font-semibold uppercase tracking-widest">
                  {item.category === "facility" ? t("categoryFacility")
                    : item.category === "treatment" ? t("categoryTreatment")
                    : t("categoryEquipment")}
                </span>
                <h4 className="text-slate-800 text-base font-serif font-medium leading-tight group-hover:text-[#D4AF37] transition-colors duration-300">
                  {isAr ? item.title_ar : item.title}
                </h4>
                { (isAr ? item.description_ar : item.description) && (
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-1 font-light">
                    {isAr ? item.description_ar : item.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-[#0B131B] flex flex-col justify-between p-4 md:p-8 overflow-hidden select-none"
            onClick={() => setActiveImageIndex(null)}
          >
            {/* Prominent Fixed X Close Button */}
            <button
              onClick={() => setActiveImageIndex(null)}
              className="fixed top-5 right-5 md:top-8 md:right-8 z-[10000] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none shadow-md backdrop-blur-sm group"
              aria-label="Close modal"
            >
              <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Top Bar Header Badge */}
            <div className="w-full flex items-center justify-between z-10 pt-2 px-2 md:px-4">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-accent animate-pulse" />
                <span className="text-[11px] uppercase font-bold text-accent tracking-widest">
                  {locale === "ar" ? "معرض بريمير هيلث" : "Premier Health Gallery"}
                </span>
              </div>
            </div>

            {/* Main Center Container for Arrow Navigation & Image */}
            <div className="relative flex-1 w-full flex items-center justify-center my-auto py-2">
              {/* Navigation Left Arrow */}
              <button
                onClick={isAr ? handleNext : handlePrev}
                className="absolute left-2 md:left-8 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/15 bg-black/60 hover:bg-accent/20 hover:border-accent/50 text-white flex items-center justify-center transition-all duration-300 focus:outline-none backdrop-blur-sm group shadow-md"
              >
                <ChevronLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
              </button>

              {/* Central Image/Video Container - Strictly Centered */}
              <motion.div
                key={activeImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-5xl h-[55vh] md:h-[62vh] flex items-center justify-center px-4"
                onClick={(e) => e.stopPropagation()}
              >
                {filteredItems[activeImageIndex].video_file_url ? (
                  <video
                    src={filteredItems[activeImageIndex].video_file_url!}
                    controls
                    autoPlay
                    className="max-h-[55vh] md:max-h-[62vh] w-auto max-w-full rounded-2xl shadow-md ring-1 ring-white/10"
                  />
                ) : filteredItems[activeImageIndex].video_url ? (
                  <iframe
                    src={filteredItems[activeImageIndex].video_url!}
                    className="w-full h-[50vh] max-h-[62vh] rounded-2xl ring-1 ring-white/10 shadow-md"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                ) : (
                  <Image
                    src={filteredItems[activeImageIndex].image}
                    alt={isAr ? filteredItems[activeImageIndex].title_ar : filteredItems[activeImageIndex].title}
                    fill
                    sizes="100vw"
                    className="object-contain rounded-xl drop-shadow-md select-none"

                  />
                )}
              </motion.div>

              {/* Navigation Right Arrow */}
              <button
                onClick={isAr ? handlePrev : handleNext}
                className="absolute right-2 md:right-8 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/15 bg-black/60 hover:bg-accent/20 hover:border-accent/50 text-white flex items-center justify-center transition-all duration-300 focus:outline-none backdrop-blur-sm group shadow-md"
              >
                <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Bottom Details High-Contrast Solid Card */}
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="w-full max-w-2xl mx-auto text-center flex flex-col items-center gap-2 px-6 py-4 rounded-2xl bg-[#16222F] border border-white/15 shadow-md mb-2"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-[10px] text-accent uppercase font-bold tracking-[0.25em] px-3.5 py-1 rounded-full bg-accent/20 border border-accent/30">
                {filteredItems[activeImageIndex].category === "facility" ? t("categoryFacility")
                  : filteredItems[activeImageIndex].category === "treatment" ? t("categoryTreatment")
                  : t("categoryEquipment")}
              </span>
              <h3 className="text-xl md:text-2xl font-serif text-white font-semibold tracking-wide">
                {isAr ? filteredItems[activeImageIndex].title_ar : filteredItems[activeImageIndex].title}
              </h3>
              { (isAr ? filteredItems[activeImageIndex].description_ar : filteredItems[activeImageIndex].description) && (
                <p className="text-slate-200 text-xs md:text-sm max-w-lg leading-relaxed font-normal">
                  {isAr ? filteredItems[activeImageIndex].description_ar : filteredItems[activeImageIndex].description}
                </p>
              )}
              {/* Index Counter */}
              <span className="text-[11px] text-slate-400 font-mono tracking-widest mt-1">
                {activeImageIndex + 1} / {filteredItems.length}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
