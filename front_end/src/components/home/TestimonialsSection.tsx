"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, Sparkles, ChevronLeft, ChevronRight, Play, Video, X } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { getTestimonials } from "@/lib/api";
import { TestimonialItem } from "@/lib/types";

export default function TestimonialsSection() {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === "ar";

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getTestimonials();
        if (data && data.length > 0) {
          setTestimonials(data);
        }
      } catch (err) {
        console.error("Error loading home testimonials:", err);
      }
    }
    loadData();
  }, []);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const totalItems = testimonials.length;

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const activeTestimonial = testimonials[currentIndex];
  const hasVideo = Boolean(activeTestimonial?.video_file_url || activeTestimonial?.video_url);
  const videoTarget = activeTestimonial?.video_file_url || activeTestimonial?.video_url;
  const ratingCount = Math.max(0, Math.min(5, Math.floor(Number(activeTestimonial?.rating) || 5)));

  const descriptionText = isAr
    ? activeTestimonial?.text_ar || (activeTestimonial as any)?.description_ar || activeTestimonial?.text || (activeTestimonial as any)?.description || ""
    : activeTestimonial?.text || (activeTestimonial as any)?.description || activeTestimonial?.text_ar || (activeTestimonial as any)?.description_ar || "";

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 28 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 60 : -60,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 28 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 },
      },
    }),
  };

  return (
    <section className="relative py-14 md:py-20 bg-[#FAF8F5] overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-10 -left-10 w-96 h-96 rounded-full border border-accent/20" />
        <div className="absolute top-1/2 -right-20 w-[500px] h-[500px] rounded-full border border-primary/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-accent/5" />
      </div>

      {/* Decorative Glow Blobs */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-accent/15 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[450px] w-[450px] rounded-full bg-white/40 blur-[150px]" />
      </div>

      <div className="luxury-container relative z-10">
        {/* Header */}
        <div className="relative text-center mb-16 flex flex-col items-center gap-4">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-24 bg-accent/10 rounded-full blur-[80px] pointer-events-none select-none" />

          <span className="relative z-10 text-accent text-[10px] uppercase tracking-[0.25em] font-bold bg-accent/5 border border-accent/30 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
            <Sparkles size={10} className="text-accent animate-pulse" />
            {t("Home.patientReviews") || "Patient Reviews"}
          </span>

          <h2 className="relative z-10 text-3xl md:text-5xl font-serif font-light text-[#3B3223] tracking-tight leading-tight max-w-2xl">
            {t("Home.testimonialsTitle") || "Voices of Exceptional Care"}
          </h2>

          <p className="relative z-10 text-sm md:text-base text-[#615440] leading-relaxed max-w-xl font-medium">
            {t("Home.testimonialsSubtitle") ||
              "Read authentic experiences from patients who trust our luxury clinical services."}
          </p>

          <div className="relative z-10 flex items-center gap-4 w-full justify-center mt-2">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-accent/50" />
            <div className="w-2 h-2 rotate-45 border border-accent/80 bg-white" />
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-accent/50" />
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto px-4 md:px-12">
          {/* Navigation Controls - Desktop Side Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 w-12 h-12 rounded-full border border-accent/30 bg-white/90 hover:bg-accent hover:border-accent text-accent hover:text-white flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none hidden md:flex"
            aria-label="Previous review"
          >
            <ChevronLeft size={22} className={isAr ? "rotate-180" : ""} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 w-12 h-12 rounded-full border border-accent/30 bg-white/90 hover:bg-accent hover:border-accent text-accent hover:text-white flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none hidden md:flex"
            aria-label="Next review"
          >
            <ChevronRight size={22} className={isAr ? "rotate-180" : ""} />
          </button>

          {/* Review Card - Fixed height to completely eliminate CLS */}
          <div className="relative h-[450px] md:h-[400px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full h-full"
              >
                <Card className="relative overflow-hidden rounded-[36px] border border-white/80 bg-gradient-to-br from-white/95 to-[#FAF7F2]/90 backdrop-blur-sm shadow-md p-8 md:p-12 flex flex-col justify-between h-full card-gold-accent">
                  {/* Decorative golden accent vertical bar */}
                  <div className="absolute left-0 inset-y-0 w-[4px] bg-gradient-to-b from-accent to-accent-light" />

                  {/* Watermark Quote Icon in Background */}
                  <div className="absolute top-10 right-10 text-accent/5 pointer-events-none select-none">
                    <Quote size={130} strokeWidth={1} />
                  </div>

                  <div className="relative z-10 flex-1 flex flex-col items-center text-center">
                    {/* Video Badge / Trigger if available */}
                    {hasVideo && (
                      <button
                        onClick={() => setActiveVideoUrl(videoTarget!)}
                        className="mb-6 px-4 py-1.5 rounded-full bg-primary/90 text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-accent transition-all duration-300 shadow-md border border-accent/30 group"
                      >
                        <Play size={12} fill="currentColor" className="text-accent group-hover:text-white" />
                        <span>{isAr ? "شاهد مراجعة الفيديو" : "Watch Video Review"}</span>
                      </button>
                    )}

                    {/* Stars */}
                    <div className="flex items-center gap-1.5 mb-6">
                      {[...Array(ratingCount)].map((_, idx) => (
                        <Star
                          key={idx}
                          size={18}
                          fill="#C8A96B"
                          className="text-accent animate-pulse"
                          style={{ animationDelay: (idx * 120) + "ms" }}
                        />
                      ))}
                    </div>

                    {/* Review Description Text */}
                    <blockquote className="text-[#4E4331] text-base md:text-xl font-serif italic leading-relaxed text-center w-full max-w-2xl mx-auto mb-8 flex-1 whitespace-pre-wrap break-words overflow-y-auto scrollbar-thin scrollbar-thumb-accent/20 pr-2">
                      {`"${descriptionText}"`}
                    </blockquote>

                    {/* Golden Divider */}
                    <div className="w-16 h-px bg-accent/30 mb-6" />

                    {/* Reviewer Details */}
                    <div className="flex flex-col items-center gap-3">
                      {activeTestimonial.image_url ? (
                        <Image
                          src={activeTestimonial.image_url}
                          alt={isAr ? activeTestimonial.name_ar || activeTestimonial.name : activeTestimonial.name}
                          width={56}
                          height={56}
                          className="h-14 w-14 rounded-full object-cover shadow-inner border border-accent/30"
                        />
                      ) : (
                        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 text-accent flex items-center justify-center text-lg font-serif font-black shadow-inner border border-accent/30">
                          {activeTestimonial.name ? activeTestimonial.name.charAt(0) : "U"}
                        </div>
                      )}

                      <div>
                        <h4 className="text-base md:text-lg font-serif font-bold text-[#3B3223]">
                          {isAr
                            ? activeTestimonial.name_ar || activeTestimonial.name
                            : activeTestimonial.name}
                        </h4>
                        <p className="text-[10px] uppercase tracking-[0.25em] text-[#8C7A5D] font-black mt-1">
                          {isAr
                            ? activeTestimonial.role_ar || activeTestimonial.role
                            : activeTestimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls - Mobile Indicators & Arrows */}
          <div className="flex items-center justify-between mt-8 md:justify-center md:gap-6">
            {/* Mobile Left Arrow */}
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-accent/30 bg-white text-accent flex items-center justify-center transition-all duration-300 md:hidden shadow-sm"
              aria-label="Previous review"
            >
              <ChevronLeft size={18} className={isAr ? "rotate-180" : ""} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: idx === currentIndex ? "28px" : "8px",
                    backgroundColor:
                      idx === currentIndex
                        ? "#C8A96B"
                        : "rgba(200, 169, 107, 0.25)",
                  }}
                  aria-label="Go to review"
                />
              ))}
            </div>

            {/* Mobile Right Arrow */}
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-accent/30 bg-white text-accent flex items-center justify-center transition-all duration-300 md:hidden shadow-sm"
              aria-label="Next review"
            >
              <ChevronRight size={18} className={isAr ? "rotate-180" : ""} />
            </button>
          </div>
        </div>
      </div>

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
    </section>
  );
}
