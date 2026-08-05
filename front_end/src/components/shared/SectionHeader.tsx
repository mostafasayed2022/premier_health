"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeader({ title, subtitle, centered = true }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`max-w-3xl ${centered ? "mx-auto text-center" : ""} mb-12 md:mb-16`}
    >
      <h2 className="text-3xl md:text-5xl font-serif text-[#0F172A] leading-[1.2] tracking-tight mb-4 md:mb-6">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
