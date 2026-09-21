"use client";

import Image from "next/image";
import type { ArticlesPageContent } from "@/lib/types/articles";

interface Props {
  page: ArticlesPageContent;
}

export function ArticlesHero({ page }: Props) {

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-slate-950 text-center">
      {/* Background Image: background2.webp - Fully Visible */}
      {page.heroImage && <Image
        src={page.heroImage}
        alt={page.title}
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover object-center z-0 opacity-100 pointer-events-none"
      />}

      {/* Subtle light luxury tint overlay to ensure text readability without hiding the background */}
      <div className="absolute inset-0 bg-black/30 z-[1] pointer-events-none" />

      {/* Ambient lighting glows */}
      <div className="absolute inset-0 pointer-events-none z-[2] overflow-hidden">
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-[#C8A96B]/20 blur-[100px]" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-[#1b3a6b]/30 blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10 text-center">
        <span className="inline-block text-xs uppercase tracking-widest text-[#C8A96B] font-bold mb-4 border border-[#C8A96B]/50 rounded-full px-5 py-1.5 bg-black/40 backdrop-blur-md shadow-sm">
          Premier Health
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 drop-shadow-lg tracking-tight">
          {page.title}
        </h1>
        <div className="h-[2px] w-20 bg-[#C8A96B] mx-auto mb-6" />
        <p className="text-white/95 max-w-2xl mx-auto text-base md:text-lg font-medium drop-shadow-md leading-relaxed">
          {page.shortDescription}
        </p>
      </div>
    </section>
  );
}
