import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f7f2ea] text-[#385366]">
      {/* Container for glowing luxury loader */}
      <div className="relative flex flex-col items-center gap-6">
        {/* Outer Elegant Spinning Circle with Logo in Center */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Inner ring */}
          <div className="absolute inset-0 rounded-full border border-[#998675]/20" />
          {/* Active spinning ring */}
          <div className="absolute inset-0 rounded-full border-t border-r border-[#998675] animate-spin" />

          {/* Logo container inside */}
          <div className="relative w-14 h-14 rounded-full overflow-hidden bg-white/40 flex items-center justify-center p-1.5 shadow-sm">
            <Image
              src="/logo/logo1.jpg"
              alt="Premier Health Logo"
              width={48}
              height={48}
              className="object-contain"

            />
          </div>
        </div>

        {/* Pulse Branding */}
        <div className="flex flex-col items-center text-center select-none animate-pulse">
          <div className="font-sans text-2xl tracking-wider">
            <span className="text-[#998675] font-bold">PREMIER</span>
            <span className="text-[#385366] font-light ml-1.5 rtl:mr-1.5">
              HEALTH
            </span>
          </div>
          <span className="text-[10px] tracking-[0.3em] text-[#998675] uppercase font-bold mt-1.5">
            Wellness & Aesthetics
          </span>
        </div>
      </div>
    </div>
  );
}
