"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface HeroSlideshowProps {
  images: string[];
}

export default function HeroSlideshow({ images }: HeroSlideshowProps) {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % images.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={bgIndex}
          initial={bgIndex === 0 ? false : { opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1.05 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={images[bgIndex]}
            alt="Premier Health Cinematic Background"
            fill
            priority={bgIndex === 0}
            fetchPriority={bgIndex === 0 ? "high" : "auto"}
            quality={75}
            sizes="100vw"
            className="object-cover object-top sm:object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Cinematic Premium Overlay Gradients */}
      <div className="absolute inset-0 bg-[#243642]/30 md:bg-[#243642]/40 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#243642] via-[#243642]/50 to-transparent md:via-[#243642]/40 z-10" />
      <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#243642]/80 via-[#243642]/20 to-transparent z-10 rtl:bg-gradient-to-l rtl:from-[#243642]/80 rtl:via-[#243642]/20" />
    </div>
  );
}
