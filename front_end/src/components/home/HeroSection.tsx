"use client";

import { useEffect, useRef, useState } from "react";
import {
  useMotionValue,
  useSpring,
  useTransform,
  Variants,
} from "framer-motion";
import HeroSlideshow from "./hero/HeroSlideshow";
import HeroContent from "./hero/HeroContent";
import HeroCards from "./hero/HeroCards";

export function HeroSection() {
  // Slider state for background slideshow
  const [bgIndex, setBgIndex] = useState(0);
  const images = [
    "/hero/hero1.webp",
    "/hero/hero2.webp",
    "/hero/hero3.webp",
    "/hero/hero4.webp",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % images.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [images.length]);

  // Parallax mouse move values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 60, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 60, damping: 15 });

  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], [-12, 12]);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], [-12, 12]);

  const rafId = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const clientX = e.clientX;
    const clientY = e.clientY;
    const currentTarget = e.currentTarget as HTMLElement;

    if (rafId.current !== null) return;
    rafId.current = requestAnimationFrame(() => {
      const rect = currentTarget.getBoundingClientRect();
      const mouseX = (clientX - rect.left) / rect.width - 0.5;
      const mouseY = (clientY - rect.top) / rect.height - 0.5;
      x.set(mouseX);
      y.set(mouseY);
      rafId.current = null;
    });
  };

  const handleMouseLeave = () => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    x.set(0);
    y.set(0);
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.15,
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // premium out-expo
      },
    }),
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[75vh] md:min-h-[85vh] w-full overflow-hidden bg-[#243642] flex flex-col justify-between pt-16 md:pt-20 pb-8 md:pb-10"
    >
      {/* Background Ken Burns Slideshow */}
      <HeroSlideshow
        bgIndex={bgIndex}
        images={images}
        translateX={translateX}
        translateY={translateY}
      />

      {/* Main Content Area */}
      <HeroContent textVariants={textVariants} />

      {/* Interactive Bottom Glassmorphic Pillar Navigation Cards */}
      <HeroCards />
    </section>
  );
}
