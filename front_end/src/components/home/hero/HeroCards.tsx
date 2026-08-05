"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Activity, Award, MapPin } from "lucide-react";

export default function HeroCards() {
  const t = useTranslations("Home");

  return (
    <div className="luxury-container relative z-30 w-full px-6 mt-12 md:mt-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 w-[calc(100%+3rem)] md:w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {/* Card 1: Specialists */}
        <Link
          href="/doctors"
          className="min-w-[80vw] sm:min-w-[40vw] md:min-w-0 snap-center group flex flex-col justify-between p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 shadow-lg hover:shadow-md cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="h-10 w-10 rounded-full bg-accent/15 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
              <Award size={18} />
            </div>
            <ArrowRight size={14} className="text-white/40 group-hover:text-accent group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-all" />
          </div>
          <div>
            <h3 className="font-serif text-base font-bold text-white group-hover:text-accent transition-colors">
              {t("cardSpecialistsTitle")}
            </h3>
            <p className="text-[11px] text-white/60 mt-1 leading-relaxed">
              {t("cardSpecialistsDesc")}
            </p>
          </div>
        </Link>

        {/* Card 2: IV Drips */}
        <Link
          href="/services"
          className="min-w-[80vw] sm:min-w-[40vw] md:min-w-0 snap-center group flex flex-col justify-between p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 shadow-lg hover:shadow-md cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="h-10 w-10 rounded-full bg-accent/15 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
              <Activity size={18} />
            </div>
            <ArrowRight size={14} className="text-white/40 group-hover:text-accent group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-all" />
          </div>
          <div>
            <h3 className="font-serif text-base font-bold text-white group-hover:text-accent transition-colors">
              {t("cardDripsTitle")}
            </h3>
            <p className="text-[11px] text-white/60 mt-1 leading-relaxed">
              {t("cardDripsDesc")}
            </p>
          </div>
        </Link>

        {/* Card 3: Aesthetics */}
        <Link
          href="/services"
          className="min-w-[80vw] sm:min-w-[40vw] md:min-w-0 snap-center group flex flex-col justify-between p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 shadow-lg hover:shadow-md cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="h-10 w-10 rounded-full bg-accent/15 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
              <Sparkles size={18} />
            </div>
            <ArrowRight size={14} className="text-white/40 group-hover:text-accent group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-all" />
          </div>
          <div>
            <h3 className="font-serif text-base font-bold text-white group-hover:text-accent transition-colors">
              {t("cardAestheticsTitle")}
            </h3>
            <p className="text-[11px] text-white/60 mt-1 leading-relaxed">
              {t("cardAestheticsDesc")}
            </p>
          </div>
        </Link>

        {/* Card 4: Branches */}
        <Link
          href="/branches"
          className="min-w-[80vw] sm:min-w-[40vw] md:min-w-0 snap-center group flex flex-col justify-between p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 shadow-lg hover:shadow-md cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="h-10 w-10 rounded-full bg-accent/15 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
              <MapPin size={18} />
            </div>
            <ArrowRight size={14} className="text-white/40 group-hover:text-accent group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-all" />
          </div>
          <div>
            <h3 className="font-serif text-base font-bold text-white group-hover:text-accent transition-colors">
              {t("cardBranchesTitle")}
            </h3>
            <p className="text-[11px] text-white/60 mt-1 leading-relaxed">
              {t("cardBranchesDesc")}
            </p>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
