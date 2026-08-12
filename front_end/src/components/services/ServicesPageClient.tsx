"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { useServices } from "@/lib/api";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import {
  ServicesHero,
  ServicesFilter,
  ServiceCard,
} from "@/components/services";

export function ServicesPageClient() {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const locale = useLocale();
  const isAr = locale === "ar";
  const { data: services = [], isLoading } = useServices();

  const filtered = services.filter((s) => {
    const matchesCategory =
      activeCategory === "all" ||
      s.category === activeCategory ||
      s.department_slug === activeCategory ||
      (s.department_name &&
        s.department_name.toLowerCase() === activeCategory.toLowerCase());
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      (s.name && s.name.toLowerCase().includes(q)) ||
      (s.name_ar && s.name_ar.includes(q)) ||
      (s.description && s.description.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col bg-background min-h-screen pb-20">
      <ServicesHero />
      <ServicesFilter
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        search={search}
        setSearch={setSearch}
      />

      <section className="luxury-container py-12">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
            <p className="text-sm font-medium text-foreground/60">
              {isAr ? "جاري تحميل الخدمات..." : "Loading elite services..."}
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-foreground/60 font-medium">
            {isAr
              ? "لم نجد خدمات تطابق اختيارك."
              : "No services found matching your criteria."}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}
