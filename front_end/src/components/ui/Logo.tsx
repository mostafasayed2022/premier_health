import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  href?: string;
  showTagline?: boolean;
}

export function Logo({
  className,
  width = 44,
  height = 44,
  href = "/",
  showTagline = true,
}: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="Premier Health Homepage"
      className={cn("flex items-center gap-3 group focus:outline-none shrink-0", className)}
    >
      <div className="relative shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
        <Image
          src="/logo/logo.webp"
          alt="Premier Health"
          width={width}
          height={height}
          priority
          className="object-contain"
        />
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-primary dark:text-white font-black text-xl tracking-tight leading-none mb-1">
          PREMIER <span className="text-accent font-medium">HEALTH</span>
        </span>
        {showTagline && (
          <span className="text-[9px] text-slate-400 font-bold tracking-[0.2em] uppercase leading-none">
            Medical Care
          </span>
        )}
      </div>
    </Link>
  );
}
