import { getTranslations } from "next-intl/server";
import { FaqHero, FaqAccordion } from "@/components/faq";
import { generatePageMetadata } from "@/lib/seo";

export const generateMetadata = generatePageMetadata("faq");
export const revalidate = 86400;

export default async function FAQPage() {
  const t = await getTranslations("FAQPage");

  const categories = [
    { key: "general", count: 3 },
    { key: "ivDrips", count: 3 },
    { key: "derma", count: 2 },
    { key: "billing", count: 2 },
  ];

  const faqData = categories.map((cat) => {
    const items = [];
    for (let i = 1; i <= cat.count; i++) {
      items.push({
        q: t(`${cat.key}_q${i}`),
        a: t(`${cat.key}_a${i}`),
      });
    }
    return {
      category: t(`${cat.key}_title`),
      items,
    };
  });

  return (
    <div className="flex flex-col bg-background min-h-screen pb-20">
      <FaqHero />
      
      <section className="luxury-container py-16 pb-24">
        <FaqAccordion faqData={faqData} />
      </section>
    </div>
  );
}
