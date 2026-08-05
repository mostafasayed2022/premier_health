// app/(admin)/admin/[model]/page.tsx
// Dynamic model page — renders DynamicPage for any model name.
import { DynamicPage } from "@/admin/components/dynamic/DynamicPage";

interface PageProps {
  params: Promise<{ model: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { model } = await params;
  return {
    title: `${model.charAt(0).toUpperCase() + model.slice(1)} | PremierCare Admin`,
  };
}

export default async function ModelPage({ params }: PageProps) {
  const { model } = await params;
  return <DynamicPage modelName={model} />;
}
