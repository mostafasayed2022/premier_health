import { generatePageMetadata } from "@/lib/seo";
import { ServicesPageClient } from "@/components/services/ServicesPageClient";

export const generateMetadata = generatePageMetadata("services");
export const revalidate = 86400;

export default function ServicesPage() {
  return <ServicesPageClient />;
}
