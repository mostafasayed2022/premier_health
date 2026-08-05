"use client";

import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Compass, Info, MapPin, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useState, useEffect } from "react";
import { getBranches, Branch } from "@/lib/api";
import Image from "next/image";

export default function BranchesSection() {
  const t = useTranslations();
  const currentLocale = useLocale();
  const isAr = currentLocale === "ar";
  const [branches, setBranches] = useState<Branch[]>([]);

  useEffect(() => {
    getBranches().then((data) => {
      if (data && data.length > 0) {
        setBranches(data);
      }
    });
  }, []);

  if (!branches || branches.length === 0) {
    return null;
  }

  return (
    <section className="py-20 border-y border-[#C8A96B]/20 relative overflow-hidden bg-[#FAF7F2]">
      {/* Background Image: background2.webp - Fully Visible */}
      <Image
        src="/backgrounds/background2.webp"
        alt="Branches Background"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center z-0 pointer-events-none"
      />

      {/* Subtle Light Luxury Tint Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-[#FAF7F2]/0 z-5 pointer-events-none" />

      {/* Ambient Lighting Orbs */}
      <div className="absolute inset-0 pointer-events-none z-5 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#C8A96B]/15 blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#0F172A]/10 blur-[120px]" />
      </div>

      <div className="luxury-container relative z-10">
        {/* Header */}
        <div className="relative text-center mb-16 flex flex-col items-center gap-4">
          <span className="relative z-10 text-[#C8A96B] text-[10px] uppercase tracking-[0.25em] font-bold bg-black/40 backdrop-blur-md border border-[#C8A96B]/30 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
            <Sparkles size={11} className="text-[#C8A96B] animate-pulse" />
            {t("Home.branchesLabel") || "Our Branches"}
          </span>

          <h2 className="relative z-10 text-3xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight max-w-3xl drop-shadow-md">
            {t("Home.branchesTitle")}
          </h2>

          <p className="relative z-10 text-sm md:text-base text-white/90 font-medium leading-relaxed max-w-2xl drop-shadow-sm">
            {t("Home.branchesSubtitle")}
          </p>

          <div className="relative z-10 flex items-center gap-4 w-full justify-center mt-2">
            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-[#C8A96B]/60" />
            <div className="w-2 h-2 rotate-45 border border-[#C8A96B] bg-[#C8A96B]" />
            <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-[#C8A96B]/60" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {branches.map((branch, i) => {
            const cardPhoto =
              branch.image_url ||
              branch.photo ||
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800";

            return (
              <motion.div
                key={branch.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="h-[460px]"
              >
                <Card className="relative h-full overflow-hidden rounded-[32px] border border-[#C8A96B]/20 shadow-md flex flex-col justify-end group card-gold-accent bg-slate-900">
                  {/* Background image filling card */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={cardPhoto}
                      alt={isAr ? branch.name_ar || branch.name : branch.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    {/* Black/Golden Gradient Mask */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent z-10 transition-opacity duration-300 group-hover:from-slate-950/98" />
                  </div>

                  {/* Content Container */}
                  <div className="relative z-20 p-6 flex flex-col gap-2.5 text-white transition-all duration-300">
                    {/* Floating Country Badge */}
                    {branch.country && (
                      <span className="w-fit text-[9px] uppercase tracking-widest text-[#C8A96B] bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full font-bold shadow-sm border border-[#C8A96B]/30">
                        {branch.country}
                      </span>
                    )}

                    {/* Title */}
                    <h3 className="text-xl font-serif font-bold text-white group-hover:text-[#C8A96B] transition-colors leading-tight">
                      {isAr ? branch.name_ar || branch.name : branch.name}
                    </h3>

                    {/* Collapsible Info (reveals on hover) */}
                    <div className="max-h-0 opacity-0 group-hover:max-h-[150px] group-hover:opacity-100 transition-all duration-500 overflow-hidden ease-in-out">
                      <div className="flex flex-col gap-2.5 text-xs text-slate-200 font-medium mt-1">
                        {branch.address && (
                          <div className="flex items-start gap-2">
                            <MapPin
                              size={14}
                              className="text-[#C8A96B] shrink-0 mt-0.5"
                            />
                            <span className="leading-relaxed">
                              {isAr
                                ? branch.address_ar || branch.address
                                : branch.address}
                            </span>
                          </div>
                        )}
                        {branch.phone && (
                          <div className="flex items-center gap-2">
                            <Phone
                              size={14}
                              className="text-[#C8A96B] shrink-0"
                            />
                            <span className="font-mono">{branch.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex gap-2 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75 mt-3">
                      <Button
                        asChild
                        variant="outline"
                        className="flex-1 rounded-full border-white/30 text-white hover:bg-white/10 text-[9px] uppercase tracking-wider py-1.5 font-bold flex items-center justify-center gap-1.5"
                      >
                        <Link href="/branches">
                          <Info size={11} />
                          {t("Home.details")}
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="default"
                        className="flex-1 rounded-full bg-[#C8A96B] hover:bg-[#B59351] text-slate-950 font-bold text-[9px] uppercase tracking-wider py-1.5 flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <a
                          href={branch.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Compass size={11} />
                          {t("Branches.directions")}
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
