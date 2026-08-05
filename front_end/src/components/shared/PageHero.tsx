"use client";

import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface PageHeroProps {
  title: string;
  subtitle: string;
  badge?: {
    icon?: React.ReactNode;
    text: string;
  };
  images: string[];
  features?: Array<{
    icon?: React.ReactNode;
    text: string;
  }>;
}

export function PageHero({ title, subtitle, badge, images, features }: PageHeroProps) {
  const locale = useLocale();
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative w-full h-[60vh] min-h-[400px] md:h-[82vh] md:min-h-[520px] overflow-hidden flex items-center bg-[#0F172A] mb-12 select-none">
      {/* ── Background Carousel with Ken Burns Motion ── */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={bgIndex}
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1.05, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="w-full h-full absolute inset-0"
          >
            <Image
              src={images[bgIndex]}
              alt={title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* ── Premium Ambient Lighting & Mask Overlays ── */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#C8A96B]/25 blur-[120px] pointer-events-none z-10 animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-[30rem] h-[30rem] rounded-full bg-[#385366]/50 blur-[140px] pointer-events-none z-10" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/92 via-[#0F172A]/60 to-[#0F172A]/30 z-10 rtl:bg-gradient-to-l rtl:from-[#0F172A]/92 rtl:via-[#0F172A]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-[#0F172A]/40 z-10" />
      </div>

      {/* ── Content Container with Glassmorphic Hero Plate ── */}
      <div className="luxury-container relative z-20 w-full flex flex-col items-start pt-8 md:pt-12">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl bg-white/[0.08] dark:bg-slate-900/40 backdrop-blur-xl border border-white/25 dark:border-white/15 p-8 md:p-12 rounded-[32px] md:rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.45)] relative overflow-hidden group flex flex-col gap-4 text-white text-left rtl:text-right"
        >
          {/* Top Light Shimmer Reflection */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />

          {/* Glass Pill Badge */}
          {badge && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] md:text-xs font-bold tracking-widest text-[#C8A96B] uppercase w-fit shadow-inner">
              {badge.icon || <Sparkles size={13} className="text-[#C8A96B] animate-spin-slow" />}
              <span>{badge.text}</span>
            </div>
          )}

          {/* Hero Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-serif text-white leading-[1.15] tracking-tight">
            {title}
          </h1>

          {/* Decorative Divider Accent Line */}
          <div className="flex items-center gap-3 w-full my-1">
            <div className="h-[2px] w-16 bg-gradient-to-r from-[#C8A96B] to-transparent rounded-full" />
            <div className="w-2 h-2 rounded-full bg-[#C8A96B] shadow-[0_0_10px_#C8A96B]" />
          </div>

          {/* Subtitle */}
          <p className="text-slate-200 text-xs md:text-base lg:text-lg font-light leading-relaxed max-w-xl">
            {subtitle}
          </p>

          {/* Micro Glass Features Footer */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 text-[10px] md:text-xs text-white/80 font-medium">
            {features && features.length > 0 ? (
              features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  {feat.icon || <ShieldCheck size={14} className="text-[#C8A96B]" />}
                  <span>{feat.text}</span>
                </div>
              ))
            ) : (
              <>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <ShieldCheck size={14} className="text-[#C8A96B]" />
                  <span>Premier Care Standards</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <Sparkles size={13} className="text-emerald-400" />
                  <span>Personalized Excellence</span>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* ── Slide Indicator Dots (If multiple images) ── */}
      {images.length > 1 && (
        <div className="absolute bottom-6 right-8 z-30 flex items-center gap-2 bg-slate-950/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setBgIndex(idx)}
              className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                idx === bgIndex ? "w-6 bg-[#C8A96B]" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
