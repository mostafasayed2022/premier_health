import Image from "next/image";
import { Shield } from "lucide-react";
import { useTranslations } from "next-intl";

export function FooterBrand() {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-5">
      {/* White-styled logo header */}
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-white/10 p-0.5 border border-accent/20">
          <Image
            src="/logo/logo1.jpg"
            alt="Logo"
            width={55}
            height={55}
            className="rounded-full"
          />
        </div>
        <div className="flex items-center font-sans text-lg md:text-xl tracking-wider select-none">
          <span className="text-accent font-bold">PREMIER</span>
          <span className="text-white font-light ml-1.5 rtl:mr-1.5">HEALTH</span>
        </div>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed max-w-[280px]">
        {t("Footer.aboutText")}
      </p>

      <div className="flex items-center gap-2 pt-2 text-accent">
        <Shield size={16} />
        <span className="text-[10px] uppercase font-bold tracking-wider">
          {t("Footer.accredited")}
        </span>
      </div>
    </div>
  );
}
