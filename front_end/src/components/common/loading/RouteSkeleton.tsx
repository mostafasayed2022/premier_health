import React from "react";
import { HeroSkeleton } from "./HeroSkeleton";
import { CardsSkeleton } from "./CardsSkeleton";

export function RouteSkeleton() {
  return (
    <div className="flex flex-col gap-8 md:gap-16 w-full animate-in fade-in duration-500 pb-20">
      <HeroSkeleton />
      <div className="luxury-container">
        <CardsSkeleton count={3} />
      </div>
      <div className="luxury-container">
        <CardsSkeleton count={3} />
      </div>
    </div>
  );
}
