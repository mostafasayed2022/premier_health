"use client";

import { useLocale, useTranslations } from "next-intl";
import { useDepartments } from "@/lib/api";
import { Search } from "lucide-react";

interface ServicesFilterProps {
  activeCategory: string;
  setActiveCategory: (c: string) => void;
  search: string;
  setSearch: (s: string) => void;
}

export function ServicesFilter({
  activeCategory,
  setActiveCategory,
  search,
  setSearch,
}: ServicesFilterProps) {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === "ar";
  const { data: departments = [] } = useDepartments();
  const categories = ["all", ...departments.map((d) => d.slug)];

  return (
    <div className="luxury-container pt-10 flex flex-col gap-6">
      {/* Search */}
      <div className="relative max-w-md mx-auto w-full">
        <Search
          size={16}
          className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 -translate-y-1/2 text-foreground/50"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("Services.searchPlaceholder")}
          className="w-full pl-10 rtl:pl-0 rtl:pr-10 pr-4 py-3.5 text-sm rounded-full border border-accent/20 bg-white shadow-sm focus:outline-none focus:border-accent text-primary font-medium transition-colors"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((cat) => {
          const dept = departments.find((d) => d.slug === cat);
          const label =
            cat === "all"
              ? t("Common.all")
              : isAr
              ? dept?.name_ar ?? cat
              : dept?.name ?? cat;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-200 border ${
                activeCategory === cat
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-primary border-accent/20 hover:border-accent"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
