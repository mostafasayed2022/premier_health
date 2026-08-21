import { useTranslations } from "next-intl";

export const LANGUAGES = [
  { code: "en", label: "English", flag: "gb" },
  { code: "ar", label: "العربية", flag: "sa" },
  { code: "fr", label: "Français", flag: "fr" },
  { code: "de", label: "Deutsch", flag: "de" },
  { code: "es", label: "Español", flag: "es" },
  { code: "it", label: "Italiano", flag: "it" },
  { code: "tr", label: "Türkçe", flag: "tr" },
  { code: "ru", label: "Русский", flag: "ru" },
];

export function useNavItems() {
  const t = useTranslations("Nav");

  return [
    { label: t("home"), href: "/" },
    { label: t("about"), href: "/about" },
    { label: t("departments"), href: "/departments" },
    { label: t("doctors"), href: "/doctors" },
    {
      label: t("services"),
      href: "/services",
      hasDropdown: true,
      subItems: [
        { label: t("services"), href: "/services" },
        { label: t("ivPackages") || "IV Packages", href: "/iv-packages" },
      ],
    },
    {
      label: t("branches"),
      href: "/branches",
      hasDropdown: true,
      subItems: [
        { label: t("branches"), href: "/branches" },
        { label: t("gallery"), href: "/gallery" },
        { label: t("testimonials"), href: "/testimonials" },
      ],
    },
    { label: t("contact"), href: "/contact" },
  ];
}
