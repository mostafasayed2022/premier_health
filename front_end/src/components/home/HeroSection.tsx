import HeroSlideshow from "./hero/HeroSlideshow";
import HeroContent from "./hero/HeroContent";
import HeroCards from "./hero/HeroCards";

export function HeroSection() {
  const images = [
    "/hero/hero1.webp",
    "/hero/hero2.webp",
    "/hero/hero3.webp",
    "/hero/hero4.webp",
  ];

  return (
    <section className="relative min-h-[75vh] md:min-h-[85vh] w-full overflow-hidden bg-[#243642] flex flex-col justify-between pt-16 md:pt-20 pb-8 md:pb-10">
      {/* Background Ken Burns Slideshow */}
      <HeroSlideshow images={images} />

      {/* Main Content Area (SSR Pure HTML <h1>, <p>, CTAs) */}
      <HeroContent />

      {/* Interactive Bottom Glassmorphic Navigation Cards */}
      <HeroCards />
    </section>
  );
}
