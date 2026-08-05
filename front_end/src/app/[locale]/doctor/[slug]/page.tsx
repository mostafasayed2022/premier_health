import { notFound } from "next/navigation";
import { getDoctorBySlug } from "@/lib/api";
import { generatePageMetadata } from "@/lib/seo";
import {
  DoctorDetailHero,
  DoctorDetailStats,
  DoctorDetailBio,
  DoctorExcellenceSection,
  DoctorDetailCta,
} from "@/components/doctors";

export const generateMetadata = generatePageMetadata("doctors");

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function DoctorDetailPage({ params }: Props) {
  const { slug } = await params;

  const doctor = await getDoctorBySlug(slug);
  if (!doctor) notFound();

  return (
    <div className="flex flex-col bg-background min-h-screen pb-20">
      <DoctorDetailHero doctor={doctor as any}>
        <DoctorDetailStats doctor={doctor as any} />
        <DoctorDetailBio doctor={doctor as any} />
      </DoctorDetailHero>

      <DoctorExcellenceSection />

      <div className="luxury-container mt-6">
        <DoctorDetailCta doctor={doctor as any} />
      </div>
    </div>
  );
}
