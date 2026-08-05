"use client";

import { motion, AnimatePresence, MotionValue } from "framer-motion";
import Image from "next/image";

interface HeroSlideshowProps {
  bgIndex: number;
  images: string[];
  translateX: MotionValue<number>;
  translateY: MotionValue<number>;
}

export default function HeroSlideshow({
  bgIndex,
  images,
  translateX,
  translateY,
}: HeroSlideshowProps) {
  return (
    <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={bgIndex}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1.05 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
          style={{ x: translateX, y: translateY }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={images[bgIndex]}
            alt="Premier Care Cinematic Background"
            fill
            priority
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
