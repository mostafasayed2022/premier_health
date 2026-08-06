import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroContent() {
  const t = useTranslations("Home");

  return (
    <div className="luxury-container relative z-25 flex-1 flex flex-col justify-center my-auto px-6">
      <div className="max-w-3xl text-center md:text-left rtl:md:text-right flex flex-col items-center md:items-start gap-6 text-white pt-6 md:pt-12">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 w-fit mx-auto md:mx-0 px-4 py-1.5 rounded-full border border-accent/40 bg-white/5 backdrop-blur-sm text-accent font-bold uppercase tracking-[0.25em] text-[10px]">
          <Sparkles size={12} className="animate-pulse" />
          {t("luxuryMedicalCare")}
        </div>

        {/* Title */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.1] text-white tracking-tight">
          {t("heroTitleLine1")}
          <br />
          <span className="italic text-accent font-serif font-light">
            {t("heroTitleLine2")}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-xl font-medium">
          {t("heroSubtitle")}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4 w-full sm:w-auto">
          <Link
            href="/book-appointment"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-accent hover:accent-accent-light text-primary hover:scale-105 active:scale-95 px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-md"
          >
            {t("bookNow")}
            <ArrowRight size={16} className="rtl:rotate-180" />
          </Link>
          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/20 bg-white/10 text-white hover:bg-white hover:text-primary hover:scale-105 active:scale-95 px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300"
          >
            {t("exploreServices")}
          </Link>
        </div>
      </div>
    </div>
  );
}
