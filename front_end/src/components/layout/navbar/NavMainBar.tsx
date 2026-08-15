"use client";

import * as React from "react";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X, Globe, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { LANGUAGES, useNavItems } from "./NavbarConstants";

interface NavMainBarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export function NavMainBar({ isOpen, setIsOpen }: NavMainBarProps) {
  const [langOpen, setLangOpen] = React.useState(false);
  const t = useTranslations("Nav");
  const currentLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const navItems = useNavItems();

  const handleLanguageChange = (newLocale: string) => {
    setLangOpen(false);
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="w-full bg-white relative z-40">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 flex h-[76px] lg:h-[90px] items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Premier Health Homepage"
          className="flex items-center gap-3 group focus:outline-none shrink-0"
        >
          <div className="relative w-12 h-12 lg:w-14 lg:h-14 shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo/logo.webp"
              alt="Premier Health"
              fill
              priority
              sizes="(max-width: 1024px) 48px, 56px"
              className="object-contain"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-primary font-black text-xl lg:text-2xl tracking-tight leading-none mb-1">
              PREMIER <span className="text-accent font-medium">HEALTH</span>
            </span>
            <span className="text-[9px] lg:text-[11px] text-slate-400 font-bold tracking-[0.2em] uppercase leading-none">
              {t("tagline")}
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => {
            if (item.hasDropdown) {
              const isAnySubActive = item.subItems?.some(
                (sub) => pathname === sub.href,
              );
              return (
                <div key={item.href} className="relative group py-2">
                  <button
                    className={`text-[12px] xl:text-[13px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1 focus:outline-none ${
                      isAnySubActive
                        ? "text-primary"
                        : "text-slate-500 hover:text-primary"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      size={12}
                      className="opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover:block pt-2 z-50">
                    <div className="w-48 rounded-xl border border-slate-100 bg-white p-1.5 shadow-md">
                      {item.subItems?.map((sub) => {
                        const isSubActive = pathname === sub.href;
                        return (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-[11px] xl:text-[12px] font-bold transition-all duration-300 ${
                              isSubActive
                                ? "bg-slate-50 text-primary border-l-2 border-accent"
                                : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                            }`}
                          >
                            <span>{sub.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] bg-[#C8A96B] transition-all duration-300 ${
                      isAnySubActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </div>
              );
            }

            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[12px] xl:text-[13px] font-bold uppercase tracking-wider transition-all duration-300 py-2 relative group ${
                  isActive
                    ? "text-primary"
                    : "text-slate-500 hover:text-primary"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] bg-[#C8A96B] transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* CTA & Mobile Menu */}
        <div className="flex items-center gap-3">
          <Button
            asChild
            className="hidden sm:flex rounded-lg bg-primary hover:bg-accent text-white transition-all duration-300 font-bold uppercase text-[11px] xl:text-[12px] tracking-widest px-6 xl:px-8 py-2.5 xl:py-3 h-auto shadow-[0_4px_14px_rgba(56,83,102,0.25)] hover:shadow-md hover:-translate-y-0.5"
          >
            <Link href="/book-appointment">{t("book")}</Link>
          </Button>

          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Language Switcher (Matching Desktop Style with Flags) */}
            <div className="relative">
              <button
                onClick={() => {
                  setLangOpen(!langOpen);
                  if (isOpen) setIsOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors shadow-sm focus:outline-none"
                aria-expanded={langOpen}
                aria-label="Change Language"
              >
                <span
                  className={`fi fi-${LANGUAGES.find((l) => l.code === currentLocale)?.flag ?? "un"} rounded-sm shadow-sm shrink-0`}
                  style={{
                    width: "1.25rem",
                    height: "0.9rem",
                    display: "inline-block",
                  }}
                />
                <span className="uppercase font-bold text-[11px]">
                  {currentLocale}
                </span>
                <ChevronDown
                  size={12}
                  className={`opacity-70 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
                />
              </button>

              {langOpen && (
                <>
                  {/* Backdrop to close dropdown on tap outside */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setLangOpen(false)}
                  />
                  <div className="absolute right-0 rtl:right-auto rtl:left-0 top-full mt-2 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl animate-fade-in z-50">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`flex w-full items-center gap-2.5 justify-between rounded-lg px-3 py-2 text-start text-xs font-bold transition-colors ${
                          currentLocale === lang.code
                            ? "bg-slate-100 text-primary"
                            : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span
                            className={`fi fi-${lang.flag} rounded-sm shadow-sm shrink-0`}
                            style={{
                              width: "1.25rem",
                              height: "0.9rem",
                              display: "inline-block",
                            }}
                          />
                          <span>{lang.label}</span>
                        </span>
                        {currentLocale === lang.code && (
                          <Check size={13} className="text-primary shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button
              className="flex p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-primary transition-colors shadow-sm"
              onClick={() => {
                setIsOpen(!isOpen);
                if (langOpen) setLangOpen(false);
              }}
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
