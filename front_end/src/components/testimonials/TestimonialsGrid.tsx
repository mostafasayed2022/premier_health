"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, Play, X, Sparkles, Video, FileText } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { getTestimonials } from "@/lib/api";
import { TestimonialItem } from "@/lib/types";
import Image from "next/image";

const TestimonialCard = React.memo(({ 
  item, 
  isAr, 
  t, 
  onPlayVideo 
}: { 
  item: TestimonialItem, 
  isAr: boolean, 
  t: any, 
  onPlayVideo: (url: string) => void 
}) => {
  const hasVideo = Boolean(item.video_file_url || item.video_url);
  const videoTarget = item.video_file_url || item.video_url;
  const ratingCount = Math.max(0, Math.min(5, Math.floor(Number(item.rating) || 5)));
  const reviewContent = isAr
    ? item.text_ar || (item as any).description_ar || item.text || (item as any).description || ""
    : item.text || (item as any).description || item.text_ar || (item as any).description_ar || "";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="relative overflow-hidden rounded-[36px] border border-white/80 bg-gradient-to-br from-white/95 to-[#FAF7F2]/90 backdrop-blur-sm shadow-md hover:shadow-md hover:-translate-y-1.5 transition-all duration-500 p-8 flex flex-col justify-between h-full card-gold-accent min-h-[380px]">
        {/* Decorative golden accent vertical bar */}
        <div className="absolute left-0 inset-y-0 w-[4px] bg-gradient-to-b from-accent to-accent-light" />

        {/* Watermark Quote Icon in Background */}
        <div className="absolute top-8 right-8 text-accent/5 pointer-events-none select-none">
          <Quote size={110} strokeWidth={1} />
        </div>

        {/* Video Thumbnail Container if available */}
        {hasVideo && (
          <div
            onClick={() => onPlayVideo(videoTarget!)}
            className="relative aspect-video w-full rounded-2xl overflow-hidden mb-6 cursor-pointer bg-slate-900 group/video flex items-center justify-center border border-accent/20 shadow-md"
          >
            <div className="absolute inset-0 bg-[#2A3F50] opacity-90 flex items-center justify-center">
              <div className="absolute inset-0 opacity-15 pointer-events-none">
                <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full border border-white" />
                <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full border border-white" />
              </div>
            </div>

            <div className="relative z-10 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center text-white scale-95 group-hover/video:scale-105 transition-all duration-300 shadow-lg group-hover/video:bg-accent group-hover/video:border-accent">
              <Play size={18} fill="currentColor" className="ml-0.5" />
            </div>

            <span className="absolute bottom-3 left-3 bg-primary/80 backdrop-blur-sm rounded-full px-3 py-1 text-[9px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5 border border-white/10">
              <Video size={11} className="text-accent" />
              {t("playVideo")}
            </span>
          </div>
        )}

        <div className="relative z-10 flex-1 flex flex-col items-center text-center justify-between">
          {/* Stars */}
          <div className="flex items-center gap-1.5 mb-4">
            {[...Array(ratingCount)].map((_, i) => (
              <Star
                key={i}
                size={18}
                fill="#C8A96B"
                className="text-accent animate-pulse"
                style={{ animationDelay: (i * 120) + "ms" }}
              />
            ))}
          </div>

          {/* Review Description Text */}
          <blockquote className="text-[#4E4331] text-base md:text-lg font-serif italic leading-relaxed text-center w-full max-w-xl mx-auto my-4 flex-1 whitespace-pre-wrap break-words">
            {`"${reviewContent}"`}
          </blockquote>

          {/* Golden Divider */}
          <div className="w-16 h-px bg-accent/30 my-4" />

          {/* Client Info Section */}
          <div className="flex flex-col items-center gap-3">
            {item.image_url ? (
              <Image
                src={item.image_url}
                alt={isAr ? item.name_ar || item.name : item.name}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover shadow-inner border border-accent/30"
              />
            ) : (
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 text-accent flex items-center justify-center text-lg font-serif font-black shadow-inner border border-accent/30">
                {item.name ? item.name.charAt(0) : "U"}
              </div>
            )}

            <div className="flex flex-col items-center">
              <h4 className="text-base font-serif font-bold text-[#3B3223]">
                {isAr ? item.name_ar || item.name : item.name}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-[9px] uppercase tracking-[0.25em] text-[#8C7A5D] font-black">
                  {isAr ? item.role_ar || item.role : item.role}
                </p>
                <span className="h-1 w-1 rounded-full bg-accent/40" />
                <span className="text-[8px] uppercase font-bold text-[#10B981] tracking-widest">
                  {t("verifiedClient")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
});

export function TestimonialsGrid() {
  const t = useTranslations("Testimonials");
  const locale = useLocale();
  const isAr = locale === "ar";

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [filter, setFilter] = useState<"all" | "videos" | "text">("all");
  const [loading, setLoading] = useState(true);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getTestimonials();
        setTestimonials(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredItems = useMemo(() => {
    return (testimonials || []).filter((item) => {
      if (filter === "all") return true;
      if (filter === "videos") return Boolean(item.video_url || item.video_file_url);
      if (filter === "text") return !item.video_url && !item.video_file_url;
      return true;
    });
  }, [testimonials, filter]);

  const displayList = useMemo(() => {
    return filteredItems;
  }, [filteredItems]);

  const averageRating = useMemo(() => {
    return (
      (displayList || []).reduce((acc, curr) => acc + (Number(curr.rating) || 5), 0) /
      ((displayList || []).length || 1)
    ).toFixed(1);
  }, [displayList]);

  const handlePlayVideo = useCallback((url: string) => {
    setActiveVideoUrl(url);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-accent/20 border-t-accent animate-spin" />
        <p className="text-sm font-medium text-slate-400 font-sans uppercase tracking-widest">
          {locale === "ar" ? "جاري تحميل المراجعات..." : "Loading Client Reviews..."}
        </p>
      </div>
    );
  }

  if (!displayList || displayList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
        <p className="text-lg font-medium text-slate-500 font-serif">
          {locale === "ar" ? "لا توجد مراجعات حالياً." : "No reviews available yet."}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Stats Summary & Filter Buttons */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 pb-8 border-b border-accent/10">
        {/* Rating Summary */}
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-4xl md:text-5xl font-serif font-bold text-primary">
              {averageRating}
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">
              {t("averageRating")}
            </span>
          </div>
          <div className="h-12 w-[1px] bg-accent/20" />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < Math.round(Number(averageRating)) ? "#C8A96B" : "none"}
                  className={i < Math.round(Number(averageRating)) ? "text-accent" : "text-slate-200"}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {locale === "ar"
                ? `بناءً على ${displayList.length} مراجعة حقيقية`
                : `Based on ${displayList.length} authentic reviews`}
            </span>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-50 border border-slate-200 rounded-2xl">
          <button
            onClick={() => setFilter("all")}
            className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
              filter === "all" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-primary"
            }`}
          >
            <span>{t("allReviews")}</span>
          </button>
          <button
            onClick={() => setFilter("videos")}
            className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
              filter === "videos" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-primary"
            }`}
          >
            <Video size={13} className="text-accent" />
            <span>{t("videoReviews")}</span>
          </button>
          <button
            onClick={() => setFilter("text")}
            className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
              filter === "text" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-primary"
            }`}
          >
            <FileText size={13} className="text-accent" />
            <span>{t("textReviews")}</span>
          </button>
        </div>
      </div>

      {/* Grid of Testimonials using Home Card Styling */}
      <motion.div
        layout
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {displayList.map((item: TestimonialItem) => (
            <TestimonialCard 
              key={item.id} 
              item={item} 
              isAr={isAr} 
              t={t} 
              onPlayVideo={handlePlayVideo} 
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Fullscreen Video Player Lightbox */}
      <AnimatePresence>
        {activeVideoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-primary/95 flex flex-col items-center justify-center p-4 md:p-8 backdrop-blur-sm"
            onClick={() => setActiveVideoUrl(null)}
          >
            {/* Top Bar */}
            <div className="w-full max-w-4xl flex items-center justify-between mb-4 z-10">
              <div className="flex items-center gap-2 text-white">
                <Sparkles size={16} className="text-accent animate-pulse" />
                <span className="text-[10px] uppercase font-bold text-accent tracking-widest">
                  {locale === "ar" ? "رأي فيديو لعميل" : "Client Video Review"}
                </span>
              </div>
              <button
                onClick={() => setActiveVideoUrl(null)}
                className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 text-white flex items-center justify-center transition-all duration-300 focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>

            {/* Video Wrapper */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden shadow-md border border-white/10 bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={activeVideoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
