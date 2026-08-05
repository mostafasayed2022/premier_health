"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import { FaqSectionData } from "./types";

interface FaqAccordionProps {
  faqData: FaqSectionData[];
}

export function FaqAccordion({ faqData }: FaqAccordionProps) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggle = (key: string) => setOpenItem(openItem === key ? null : key);

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-12">
      {faqData.map((section) => (
        <div key={section.category}>
          <h2 className="text-xl font-serif font-bold text-primary mb-6 pb-3 border-b border-accent/25">
            {section.category}
          </h2>
          <div className="flex flex-col gap-3">
            {section.items.map((item, i) => {
              const key = `${section.category}-${i}`;
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white rounded-2xl border border-accent/10 overflow-hidden shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => toggle(key)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left rtl:text-right text-sm font-serif font-bold text-primary hover:text-accent transition-colors focus:outline-none"
                  >
                    <span>{item.q}</span>
                    {openItem === key ? (
                      <ChevronUp size={16} className="text-accent shrink-0 ml-4 rtl:ml-0 rtl:mr-4" />
                    ) : (
                      <ChevronDown size={16} className="text-accent shrink-0 ml-4 rtl:ml-0 rtl:mr-4" />
                    )}
                  </button>
                  {openItem === key && (
                    <div className="px-6 pb-5 text-sm text-foreground/80 leading-relaxed border-t border-accent/10 pt-4 bg-beige/5 font-medium">
                      {item.a}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
