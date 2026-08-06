import dynamic from "next/dynamic";
import { HeroSection } from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatesSection";
import AboutPreviewSection from "@/components/home/AboutPreviewSection";
import DepartmentsSection from "@/components/home/DepartmentsSection";

// Below-the-fold sections dynamically imported to reduce initial JS payload
const WhyChooseUsSection = dynamic(
  () => import("@/components/home/WhyChooseUsSection")
);
const DepartmentDripsIntro = dynamic(() =>
  import("@/components/departments/DepartmentDripsIntro").then(
    (mod) => mod.DepartmentDripsIntro
  )
);
const FeaturedTreatmentsSection = dynamic(
  () => import("@/components/home/FeaturedTreatmentsSection")
);
const DepartmentDermaIntro = dynamic(() =>
  import("@/components/departments/DepartmentDermaIntro").then(
    (mod) => mod.DepartmentDermaIntro
  )
);
const TestimonialsSection = dynamic(
  () => import("@/components/home/TestimonialsSection")
);
const BranchesSection = dynamic(
  () => import("@/components/home/BranchesSection")
);
const FAQSection = dynamic(() => import("@/components/home/FAQSection"));
const WelcomeToast = dynamic(() =>
  import("@/components/shared/WelcomeToast").then((mod) => mod.WelcomeToast)
);

import { generatePageMetadata } from "@/lib/seo";

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
