"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { useDepartmentBySlug, useServices } from "@/lib/api";
import { Loader2 } from "lucide-react";
import {
  DepartmentDetailHero,
  DepartmentCareOverview,
  DepartmentDripsIntro,
  DepartmentServicesGrid,
  DepartmentDoctors,
  DepartmentCta,
} from "@/components/departments";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function DepartmentDetailPage({ params }: Props) {
  const { slug } = use(params);

  const { data: department, isLoading: isDeptLoading } =
    useDepartmentBySlug(slug);
  const { data: allServices = [], isLoading: isSvcLoading } = useServices();
  const services = allServices.filter((s) => s.category === slug);

  if (isDeptLoading || isSvcLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background py-20">
        <Loader2 className="w-8 h-8 animate-spin text-accent mb-4" />
        <p className="text-sm font-medium text-foreground/60">
          Loading department details...
        </p>
      </div>
    );
  }

  if (!department) notFound();

  return (
    <div className="flex flex-col bg-background min-h-screen pb-20">
      <DepartmentDetailHero department={department} />

      {/* Core Clinical Standards & Patient Journey Overview */}
      <DepartmentCareOverview />

      {/* Conditional comparison or intro section */}
      {slug === "iv-therapy" && (
        <div className="luxury-container flex flex-col gap-8">
          <DepartmentDripsIntro />
        </div>
      )}

      {/* Services Grid */}
      <DepartmentServicesGrid
        services={services}
        departmentName={department.name}
        departmentName_ar={department.name_ar}
      />

      {/* Specialists List */}
      <DepartmentDoctors slug={slug} />

      {/* Call to Action */}
      <div className="luxury-container">
        <DepartmentCta />
      </div>
    </div>
  );
}
