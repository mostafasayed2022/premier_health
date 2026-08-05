import { useTranslations } from "next-intl";

export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "es", label: "Español" },
  { code: "it", label: "Italiano" },
  { code: "tr", label: "Türkçe" },
];

export function useNavItems() {
  const t = useTranslations("Nav");
  
  return [
    { label: t("home"), href: "/" },
    { label: t("about"), href: "/about" },
    { label: t("departments"), href: "/departments" },
    { label: t("doctors"), href: "/doctors" },
    { label: t("services"), href: "/services" },
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
