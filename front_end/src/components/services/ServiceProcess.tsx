"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ServiceData } from "./types";

interface ServiceProcessProps {
  service: ServiceData;
}

export function ServiceProcess({ service }: ServiceProcessProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const t = useTranslations("Services");

  const processList = isAr ? service.process_ar : service.process;

  return (
    <div>
      <h2 className="text-3xl font-serif text-primary mb-2">
        {t("process")}
      </h2>
      <div className="h-[2px] w-16 bg-accent mb-8" />
      <div className="relative flex flex-col gap-0">
        {processList.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: isAr ? -15 : 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-4 pb-6 relative"
          >
            {/* Connection Line */}
            {i < processList.length - 1 && (
              <div className="absolute left-4 top-8 bottom-0 w-[1px] bg-accent/25 rtl:left-auto rtl:right-4" />
            )}
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center z-10 shadow-md">
              {i + 1}
            </div>
            <div className="bg-white rounded-2xl border border-accent/10 shadow-sm p-4 flex-1">
              <p className="text-sm text-primary font-medium">{step}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
