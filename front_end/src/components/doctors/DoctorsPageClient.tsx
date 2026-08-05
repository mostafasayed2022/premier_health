"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState, useMemo } from "react";
import { useDoctors } from "@/lib/api";
import { motion } from "framer-motion";
import { Search, Loader2 } from "lucide-react";
import { DoctorsHero, DoctorCard } from "@/components/doctors";

export function DoctorsPageClient() {
  const [search, setSearch] = useState("");
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === "ar";
  const { data: doctors = [], isLoading } = useDoctors();

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return doctors.filter((d) => (
      !q ||
      d.name.toLowerCase().includes(q) ||
      d.specialty.toLowerCase().includes(q) ||
      (d.name_ar && d.name_ar.includes(q))
    ));
  }, [doctors, search]);

  return (
    <div className="flex flex-col bg-background min-h-screen pb-20">
      <DoctorsHero />

      <section className="luxury-container pt-10 pb-20">
        {/* Search */}
        <div className="relative max-w-md mx-auto w-full mb-12">
          <Search
            size={16}
            className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 -translate-y-1/2 text-foreground/50"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              isAr ? "ابحث باسم الطبيب أو التخصص..." : "Search doctor by name or specialty..."
            }
            className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-3 bg-card border border-border/60 rounded-xl text-sm font-medium focus:outline-none focus:border-accent text-foreground transition-all"
          />
        </div>

        {/* List */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
            <p className="text-sm font-medium text-foreground/60">
              {isAr ? "جاري تحميل الأطباء..." : "Loading elite doctors..."}
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-foreground/60 font-medium">
            {isAr ? "لم نجد أطباء يطابقون بحثك." : "No doctors match your search."}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filtered.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}
