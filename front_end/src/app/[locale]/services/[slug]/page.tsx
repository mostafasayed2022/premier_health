"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { useServiceBySlug } from "@/lib/api";
import { Loader2 } from "lucide-react";
import {
  ServiceDetailHero,
  ServiceFaq,
  ServiceCta,
} from "@/components/services";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ServiceDetailPage({ params }: Props) {
  const { slug } = use(params);

  const { data: service, isLoading } = useServiceBySlug(slug);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background py-20">
        <Loader2 className="w-8 h-8 animate-spin text-accent mb-4" />
        <p className="text-sm font-medium text-foreground/60">Loading service details...</p>
      </div>
    );
  }

  if (!service) notFound();

  return (
    <div className="flex flex-col bg-background min-h-screen pb-20">
      <ServiceDetailHero service={service as any} />

      <ServiceFaq service={service as any} />
      
      <div className="luxury-container">
        <ServiceCta />
      </div>
    </div>
  );
}
