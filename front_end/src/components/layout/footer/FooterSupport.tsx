import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Clock } from "lucide-react";

export function FooterSupport() {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-serif text-sm uppercase tracking-wider text-accent font-semibold border-b border-white/10 pb-2">
        {t("Footer.support")}
      </h4>
      <div className="flex flex-col gap-3 text-xs text-slate-300">
        <Link
          href="/faq"
          className="hover:text-accent transition-colors flex items-center gap-2"
        >
          <span className="h-1 w-1 rounded-full bg-accent" />
          {t("Footer.faq")}
        </Link>
        <Link
          href="/privacy-policy"
          className="hover:text-accent transition-colors flex items-center gap-2"
        >
          <span className="h-1 w-1 rounded-full bg-accent" />
          {t("Footer.privacy")}
        </Link>
        <Link
          href="/terms-and-conditions"
          className="hover:text-accent transition-colors flex items-center gap-2"
        >
          <span className="h-1 w-1 rounded-full bg-accent" />
          {t("Footer.terms")}
        </Link>
        <div className="flex items-center gap-2 text-[11px] text-accent/80 font-bold bg-white/5 rounded-lg p-2 border border-white/10">
          <Clock size={14} />
          <span>{t("Footer.emergency")}</span>
        </div>
      </div>
    </div>
  );
}
