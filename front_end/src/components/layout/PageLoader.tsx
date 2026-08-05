"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function PageLoader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  // 1. Initial Load: Fade out after 600ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // 2. Intercept page transitions (anchor clicks)
  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && anchor.href && anchor.target !== "_blank") {
        try {
          const targetUrl = new URL(anchor.href);
          const currentUrl = new URL(window.location.href);

          // Only trigger if navigating to a different page within the same origin
          if (
            targetUrl.origin === currentUrl.origin &&
            targetUrl.pathname !== currentUrl.pathname
          ) {
            setIsLoading(true);
          }
        } catch (e) {
          // Ignore invalid URLs
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  // 3. Navigation Complete: Fade out loader when pathname changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // 500ms delay to make it feel smooth and premium
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#f7f2ea] text-[#385366]"
        >
          {/* Container for glowing luxury loader */}
          <div className="relative flex flex-col items-center gap-6">
            {/* Outer Elegant Spinning Circle with Logo in Center */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              {/* Inner ring */}
              <div className="absolute inset-0 rounded-full border border-[#998675]/20" />
              {/* Active spinning ring */}
              <div className="absolute inset-0 rounded-full border-t border-r border-[#998675] animate-spin" />

              {/* Logo container inside */}
              <div className="relative w-14 h-14 rounded-full overflow-hidden bg-white/40 flex items-center justify-center p-1.5 shadow-sm">
                <Image
                  src="/logo/logo1.jpg"
                  alt="Premier Health Logo"
                  width={48}
                  height={48}
                  priority
                  className="rounded-full object-contain"
                />
              </div>
            </div>

            {/* Pulse Branding */}
            <motion.div
              initial={{ opacity: 0.5, scale: 0.98 }}
              animate={{ opacity: [0.5, 1, 0.5], scale: [0.98, 1, 0.98] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center text-center select-none"
            >
              <div className="font-sans text-2xl tracking-wider">
                <span className="text-[#998675] font-bold">PREMIER</span>
                <span className="text-[#385366] font-light ml-1.5 rtl:mr-1.5">
                  HEALTH
                </span>
              </div>
              <span className="text-[10px] tracking-[0.3em] text-[#998675] uppercase font-bold mt-1.5">
                Wellness & Aesthetics
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
