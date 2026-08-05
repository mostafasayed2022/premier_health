import React from "react";
import { GalleryHero } from "@/components/gallery/GalleryHero";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { generatePageMetadata } from "@/lib/seo";

export const generateMetadata = generatePageMetadata("gallery");

export default async function GalleryPage() {
  return (
    <div className="flex flex-col bg-[#FCFAF7] min-h-screen pb-24">
      <GalleryHero />

      {/* Gallery Grid */}
      <div className="relative z-20 px-4 md:px-0 luxury-container mt-4">
        <GalleryGrid />
      </div>
    </div>
  );
}
