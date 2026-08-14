import { generatePageMetadata } from "@/lib/seo";
import { BranchesPageClient } from "@/components/branches/BranchesPageClient";

export const generateMetadata = generatePageMetadata("branches");

export default function BranchesPage() {
  return <BranchesPageClient />;
}
