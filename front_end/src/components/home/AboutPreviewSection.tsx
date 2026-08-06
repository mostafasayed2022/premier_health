import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export default function AboutPreviewSection() {
  const t = useTranslations();
  const currentLocale = useLocale();
  const isAr = currentLocale === "ar";

  return (
    <section className="bg-white py-8 md:py-12 border-y border-accent/10">
      <div className="luxury-container grid gap-16 lg:grid-cols-2 lg:items-center">
        <div className="relative w-full grid grid-cols-2 grid-rows-2 gap-3 sm:gap-4 h-[400px] md:h-[500px]">
          {/* Left Large Image */}
          <div className="relative w-full h-full row-span-2 rounded-[2rem] overflow-hidden border border-accent/15 shadow-lg group">
            <div className="absolute inset-0 bg-accent/5 z-10 group-hover:bg-transparent transition-colors duration-500" />
            <Image
              src="/AboutPreview/layout2.webp"
              alt="Premier Health Facility"
              fill
              loading="lazy"
              sizes="250px"
              quality={65}
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          {/* Top Right Image */}
          <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-accent/15 shadow-lg group">
            <div className="absolute inset-0 bg-accent/5 z-10 group-hover:bg-transparent transition-colors duration-500" />
            <Image
              src="/AboutPreview/layout1.webp"
              alt="Premier Health Care"
              fill
              loading="lazy"
              sizes="250px"
              quality={65}
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          {/* Bottom Right Image */}
          <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-accent/15 shadow-lg group">
            <div className="absolute inset-0 bg-accent/5 z-10 group-hover:bg-transparent transition-colors duration-500" />
            <Image
              src="/AboutPreview/layout3.webp"
              alt="Premier Health Team"
              fill
              loading="lazy"
              sizes="250px"
              quality={65}
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 text-left rtl:text-right">
          <div className="inline-block w-fit px-3 py-1 rounded-full border border-accent/30 bg-accent/5 text-[11px] uppercase font-bold tracking-widest text-accent">
            {t("Home.heritage")}
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-accent">
            {t("Home.aboutTitle")}
          </h2>
          <div className="h-[2px] w-16 bg-accent" />
          <div className="space-y-4 text-sm text-foreground/95 leading-relaxed font-semibold">
            <p>{t("Home.aboutText1")}</p>
            <p>{t("Home.aboutText2")}</p>
          </div>
          <Button
            asChild
            variant="outline"
            className="w-fit rounded-full border-accent text-accent hover:bg-accent hover:text-white mt-4 transition-all duration-300 font-semibold px-6"
          >
            <Link href="/about">
              {t("Home.learnMore")}
              <ArrowRight size={14} className="ml-2 rtl:rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
