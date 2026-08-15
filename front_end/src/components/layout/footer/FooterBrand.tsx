import Image from "next/image";
import { Shield } from "lucide-react";
import { useTranslations } from "next-intl";

export function FooterBrand() {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-5">
      {/* White-styled logo header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-sm shrink-0">
          <Image
            src="/logo/logo.webp"
            alt="Logo"
            width={38}
            height={38}
            className="object-contain"
          />
        </div>
        <div className="flex items-center font-sans text-lg md:text-xl tracking-wider select-none">
          <span className="text-accent font-bold">PREMIER</span>
          <span className="text-white font-light ml-1.5 rtl:mr-1.5">
            HEALTH
          </span>
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
