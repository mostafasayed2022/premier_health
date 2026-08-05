"use client";

import React, { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { useBranches, useDepartments, useBranchGallery } from "@/lib/api";
import {
  BranchesHero,
  BranchCard,
  BranchesContactBanner,
  BranchGallerySection,
  BranchSpecialtiesSection,
  BranchLightboxModal,
  LightboxItem,
} from "@/components/branches";

export function BranchesPageClient() {
  const locale = useLocale();
  const isAr = locale === "ar";

  const { data: branches = [], isLoading: isBranchesLoading } = useBranches();
  const { data: departments = [], isLoading: isDeptsLoading } = useDepartments();

  const [selectedBranchId, setSelectedBranchId] = useState<string>("all");
  const { data: rawBranchGalleryItems = [], isLoading: isGalleryLoading } = useBranchGallery(
    selectedBranchId
  );

  const [activeBranchImageIndex, setActiveBranchImageIndex] = useState<number | null>(null);
  const [activeGalleryModalIndex, setActiveGalleryModalIndex] = useState<number | null>(null);

  // Fallback to branch cover photos if admin hasn't added branch gallery images yet
  const displayGalleryItems =
    rawBranchGalleryItems.length > 0
      ? rawBranchGalleryItems
      : branches
          .filter(
            (b: any) => selectedBranchId === "all" || String(b.id) === selectedBranchId
          )
          .map((b: any) => ({
            id: String(b.id),
            branch_id: String(b.id),
            title: b.name,
            title_ar: b.name_ar || b.name,
            image:
              b.image_url ||
              b.photo ||
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
            description: b.address || "",
            description_ar: b.address_ar || b.address || "",
            branch_name: isAr ? b.name_ar || b.name : b.name,
          }));

  // Map branches to LightboxItem format for modal
  const branchLightboxItems: LightboxItem[] = branches.map((b: any) => ({
    id: String(b.id),
    image:
      b.image_url ||
      b.photo ||
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
    title: b.name,
    title_ar: b.name_ar || b.name,
    address: b.address,
    address_ar: b.address_ar,
    phone: b.phone,
    country: b.country,
  }));

  // Map gallery items to LightboxItem format for modal
  const galleryLightboxItems: LightboxItem[] = displayGalleryItems.map((item: any) => ({
    id: String(item.id),
    image: item.image,
    title: item.title,
    title_ar: item.title_ar || item.title,
    description: item.description,
    description_ar: item.description_ar || item.description,
    branch_name: item.branch_name,
  }));

  const handleNextBranch = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeBranchImageIndex === null || branches.length === 0) return;
    setActiveBranchImageIndex((prev) => (prev! + 1) % branches.length);
  };

  const handlePrevBranch = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeBranchImageIndex === null || branches.length === 0) return;
    setActiveBranchImageIndex((prev) => (prev! - 1 + branches.length) % branches.length);
  };

  const handleNextGallery = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeGalleryModalIndex === null || displayGalleryItems.length === 0) return;
    setActiveGalleryModalIndex((prev) => (prev! + 1) % displayGalleryItems.length);
  };

  const handlePrevGallery = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeGalleryModalIndex === null || displayGalleryItems.length === 0) return;
    setActiveGalleryModalIndex(
      (prev) => (prev! - 1 + displayGalleryItems.length) % displayGalleryItems.length
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeBranchImageIndex !== null) {
        if (e.key === "Escape") setActiveBranchImageIndex(null);
        if (e.key === "ArrowRight") isAr ? handlePrevBranch() : handleNextBranch();
        if (e.key === "ArrowLeft") isAr ? handleNextBranch() : handlePrevBranch();
      }
      if (activeGalleryModalIndex !== null) {
        if (e.key === "Escape") setActiveGalleryModalIndex(null);
        if (e.key === "ArrowRight") isAr ? handlePrevGallery() : handleNextGallery();
        if (e.key === "ArrowLeft") isAr ? handleNextGallery() : handlePrevGallery();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeBranchImageIndex, activeGalleryModalIndex, branches, displayGalleryItems, isAr]);

  return (
    <div className="flex flex-col bg-background min-h-screen">
      {/* 1. Hero Banner */}
      <BranchesHero />

      {/* 2. Main Branch Cards Grid */}
      <section className="luxury-container py-16">
        {isBranchesLoading ? (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-96 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {branches.map((branch, i) => (
              <BranchCard
                key={branch.id}
                branch={branch}
                index={i}
                onImageClick={(idx) => setActiveBranchImageIndex(idx)}
              />
            ))}
          </div>
        )}
      </section>

      {/* 3. Branch Gallery Preview Section */}
      <BranchGallerySection
        branches={branches}
        selectedBranchId={selectedBranchId}
        onSelectBranch={(id) => setSelectedBranchId(id)}
        displayItems={displayGalleryItems}
        isLoading={isGalleryLoading}
        onOpenItem={(idx) => setActiveGalleryModalIndex(idx)}
      />

      {/* 4. Specialties Available Across Sanctuaries */}
      <BranchSpecialtiesSection
        departments={departments}
        isLoading={isDeptsLoading}
      />

      {/* 5. Contact Banner */}
      <BranchesContactBanner />

      {/* 6. Lightbox Modal for Branch Cards */}
      <BranchLightboxModal
        isOpen={activeBranchImageIndex !== null}
        activeItem={
          activeBranchImageIndex !== null ? branchLightboxItems[activeBranchImageIndex] : null
        }
        activeIndex={activeBranchImageIndex}
        totalItems={branches.length}
        onClose={() => setActiveBranchImageIndex(null)}
        onNext={handleNextBranch}
        onPrev={handlePrevBranch}
      />

      {/* 7. Lightbox Modal for Gallery Showcase */}
      <BranchLightboxModal
        isOpen={activeGalleryModalIndex !== null}
        activeItem={
          activeGalleryModalIndex !== null
            ? galleryLightboxItems[activeGalleryModalIndex]
            : null
        }
        activeIndex={activeGalleryModalIndex}
        totalItems={displayGalleryItems.length}
        onClose={() => setActiveGalleryModalIndex(null)}
        onNext={handleNextGallery}
        onPrev={handlePrevGallery}
      />
    </div>
  );
}
