import { generatePageMetadata } from "@/lib/seo";
import { IVPackagesPageClient } from "@/components/iv-packages";

export const generateMetadata = generatePageMetadata("iv-therapy-packages");
export const revalidate = 86400;

export default function IVTherapyPackagesPage() {
  return <IVPackagesPageClient />;
}
