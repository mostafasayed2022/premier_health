import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  href?: string;
}

export function Logo({
  className = "h-12 w-auto",
  width = 80,
  height = 80,
  href = "/",
}: LogoProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 group focus:outline-none"
    >
      <div className="relative overflow-hidden rounded-full border border-accent/10 p-1 bg-beige/50 group-hover:border-accent/30 transition-colors">
        <Image
          src="/logo.png"
          alt="Premier Health Clinic Logo"
          width={width}
          height={height}
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex items-center font-sans text-lg md:text-xl tracking-wider select-none">
        <span className="text-accent font-bold">PREMIER</span>
        <span className="text-primary font-light ml-1 rtl:mr-1">HEALTH</span>
      </div>
    </Link>
  );
}
