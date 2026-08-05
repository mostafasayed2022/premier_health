import { getSeoMetadata } from "@/lib/seo";
import { BranchesPageClient } from "@/components/branches/BranchesPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return getSeoMetadata(locale, "branches");
}

export default function BranchesPage() {
  return <BranchesPageClient />;
}
