"use client";
import { FooterBrand } from "./footer/FooterBrand";
import { FooterLinks } from "./footer/FooterLinks";
import { FooterSupport } from "./footer/FooterSupport";
import { FooterContact } from "./footer/FooterContact";
import dynamic from "next/dynamic";

const FooterBottom = dynamic(
  () => import("./footer/FooterBottom").then((mod) => mod.FooterBottom),
  { ssr: false },
);

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-primary text-white border-t-2 border-accent/20 pt-16 pb-8">
      {/* Background visual graphics */}
      <div className="absolute top-0 right-0 h-64 w-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-80 w-80 bg-accent/5 rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl" />

      <div className="luxury-container relative z-10">
        <div className="grid gap-12 lg:grid-cols-4 md:grid-cols-2">
          <FooterBrand />
          <FooterLinks />
          <FooterSupport />
          <FooterContact />
        </div>
        <FooterBottom />
      </div>
    </footer>
  );
}
