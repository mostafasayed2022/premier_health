import { AboutHeroSection } from "@/components/about/AboutHeroSection";
import { AboutTimeline } from "@/components/about/AboutTimeline";
import { AboutMissionVision } from "@/components/about/AboutMissionVision";
import { AboutWhyChooseUs } from "@/components/about/AboutWhyChooseUs";
import { DepartmentComparison } from "@/components/departments";
import { generatePageMetadata } from "@/lib/seo";

export const generateMetadata = generatePageMetadata("about");
export const revalidate = 86400;

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <AboutHeroSection />
      <AboutTimeline />
      <AboutMissionVision />
      <DepartmentComparison />
      <AboutWhyChooseUs />
    </div>
  );
}
