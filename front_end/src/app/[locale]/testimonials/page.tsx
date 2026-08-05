"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { TestimonialsHero } from "@/components/testimonials/TestimonialsHero";

const TestimonialsGrid = dynamic(
  () =>
    import("@/components/testimonials/TestimonialsGrid").then(
      (mod) => mod.TestimonialsGrid
    ),
  {
    loading: () => (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <Loader2 className="w-12 h-12 text-accent animate-spin" />
        <p className="text-sm font-medium text-slate-400 font-sans uppercase tracking-widest">
          Loading Client Reviews...
        </p>
      </div>
    ),
  }
);

export default function TestimonialsPage() {
  return (
    <div className="flex flex-col bg-[#FDFCFB] min-h-screen pb-24">
      <TestimonialsHero />

      {/* Main Grid Container */}
      <section className="luxury-container mt-12 px-4 md:px-8">
        <TestimonialsGrid />
      </section>
    </div>
  );
}
