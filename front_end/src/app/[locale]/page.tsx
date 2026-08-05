import dynamic from "next/dynamic";
import { HeroSection } from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatesSection";
// Standard Static Imports
import AboutPreviewSection from "@/components/home/AboutPreviewSection";
import DepartmentsSection from "@/components/home/DepartmentsSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import { DepartmentDripsIntro } from "@/components/departments/DepartmentDripsIntro";
import FeaturedTreatmentsSection from "@/components/home/FeaturedTreatmentsSection";
import { DepartmentDermaIntro } from "@/components/departments/DepartmentDermaIntro";
import BranchesSection from "@/components/home/BranchesSection";
import FAQSection from "@/components/home/FAQSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";

import { generatePageMetadata } from "@/lib/seo";
import { WelcomeToast } from "@/components/shared/WelcomeToast";

export const generateMetadata = generatePageMetadata("home");

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6 md:gap-12 pb-8 overflow-hidden">
      <WelcomeToast />
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. STATISTICS SECTION */}
      <StatsSection />

      {/* 3. ABOUT PREVIEW */}
      <AboutPreviewSection />

      {/* 4. DEPARTMENTS SECTION */}
      <DepartmentsSection />

      {/* 5. WHY CHOOSE US */}
      <WhyChooseUsSection />

      {/* 5.5 ABOUT OUR DRIPS */}
      <div className="luxury-container">
        <DepartmentDripsIntro />
      </div>

      {/* 6. FEATURED TREATMENTS */}
      <FeaturedTreatmentsSection />

      {/* 6.5 DERMA SERVICES */}
      <DepartmentDermaIntro />

      {/* 7. TESTIMONIALS */}
      <TestimonialsSection />

      {/* 8. BRANCHES PREVIEW */}
      <BranchesSection />

      {/* 9. FAQ ACCORDION */}
      <FAQSection />
    </div>
  );
}
