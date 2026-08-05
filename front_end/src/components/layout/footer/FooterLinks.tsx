import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export function FooterLinks() {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-serif text-sm uppercase tracking-wider text-accent font-semibold border-b border-white/10 pb-2">
        {t("Footer.quickLinks")}
      </h4>
      <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
        <Link href="/" className="hover:text-accent transition-colors">
          {t("Nav.home")}
        </Link>
        <Link href="/about" className="hover:text-accent transition-colors">
          {t("Nav.about")}
        </Link>
        <Link href="/departments" className="hover:text-accent transition-colors">
          {t("Nav.departments")}
        </Link>
        <Link href="/doctors" className="hover:text-accent transition-colors">
          {t("Nav.doctors")}
        </Link>
        <Link href="/services" className="hover:text-accent transition-colors">
          {t("Nav.services")}
        </Link>
        <Link href="/branches" className="hover:text-accent transition-colors">
          {t("Nav.branches")}
        </Link>
        <Link href="/contact" className="hover:text-accent transition-colors">
          {t("Nav.contact")}
        </Link>
        <Link href="/book-appointment" className="hover:text-accent transition-colors">
          {t("Nav.book")}
        </Link>
      </div>
    </div>
  );
}
