import { CardsSkeleton } from "@/components/common/loading/CardsSkeleton";

export default function Loading() {
  return (
    <div className="luxury-container pt-32 pb-20">
      <div className="h-12 w-64 bg-slate-200 animate-pulse rounded-lg mx-auto mb-16" />
      <CardsSkeleton count={6} />
    </div>
  );
}
