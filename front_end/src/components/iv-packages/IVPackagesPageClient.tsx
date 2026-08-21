"use client";

// ─── IVPackagesPageClient.tsx ────────────────────────────────────────────────
// Unified client layout assembling all modular IV Therapy Packages components.

import { IVPackagesHero } from "./IVPackagesHero";
import { IVWhySection } from "./IVWhySection";
import { IVPackageCards } from "./IVPackageCards";
import { IVAddonsSection } from "./IVAddonsSection";
import { IVBookingCTA } from "./IVBookingCTA";
import { IVMedicalDisclaimer } from "./IVMedicalDisclaimer";

export function IVPackagesPageClient() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#C8A96B]/20 selection:text-[#1E293B]">
      {/* 1. Hero Section */}
      <IVPackagesHero />

      {/* 2. Why IV Therapy Section */}
      <IVWhySection />

      {/* 3. Package Comparison / Cards */}
      <IVPackageCards />

      {/* 4. Optional Premium Add-Ons */}
      <IVAddonsSection />

      {/* 5. Concierge Booking CTA */}
      <IVBookingCTA />

      {/* 6. Medical Disclaimer & Safety Notice */}
      <IVMedicalDisclaimer />
    </main>
  );
}
