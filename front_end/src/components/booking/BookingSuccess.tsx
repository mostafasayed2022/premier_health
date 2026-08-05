"use client";

import { useTranslations } from "next-intl";
import { CheckCircle2, Calendar, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface BookingSuccessProps {
  onReset: () => void;
}

export function BookingSuccess({ onReset }: BookingSuccessProps) {
  const t = useTranslations("Booking");

  return (
    <div className="min-h-screen bg-slate-50/60 flex items-center justify-center p-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="bg-white rounded-3xl shadow-md border border-accent/25 p-8 sm:p-14 max-w-lg w-full text-center relative overflow-hidden"
      >
        {/* Subtle Luxury Gradient Background Glow */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-accent/10 via-amber-500/5 to-transparent pointer-events-none" />

        {/* Animated Check Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="relative h-20 w-20 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-accent/20 text-accent"
        >
          <CheckCircle2 size={44} strokeWidth={2.2} />
          <Sparkles size={16} className="absolute -top-1 -right-1 text-amber-500 animate-pulse" />
        </motion.div>

        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-3">
          {t("successTitle")}
        </h2>

        <div className="h-[2px] w-20 bg-accent/40 mx-auto mb-4" />

        <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed mb-8 font-medium">
          {t("successText")}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onReset}
            className="w-full sm:w-auto bg-primary hover:bg-accent text-white px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-primary/20 active:scale-95 flex items-center justify-center gap-2"
          >
            <Sparkles size={15} />
            <span>{t("bookAnother")}</span>
          </button>

          <Link
            href="/profile/patient"
            className="w-full sm:w-auto bg-beige/60 hover:bg-beige text-primary border border-accent/30 px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
          >
            <Calendar size={15} />
            <span>{t("appointments")}</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
