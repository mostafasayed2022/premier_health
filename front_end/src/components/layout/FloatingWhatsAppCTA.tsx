"use client";

// ─── FloatingWhatsAppCTA.tsx ──────────────────────────────────────────────────
// Universal Luxury Floating WhatsApp Button rendered across all pages.
// Fully connected to GTM / DataLayer analytics with Zero-PII event tracking.
// Positioned above mobile sticky bar on mobile and elegantly floating on desktop.

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { CONTACT } from "@/lib/config/contact";
import { trackClickWhatsApp } from "@/lib/analytics/events";

function WhatsappSvg({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function FloatingWhatsAppCTA() {
  const pathname = usePathname() || "";
  const isAr =
    pathname.startsWith("/ar") ||
    pathname.includes("/ar") ||
    (typeof document !== "undefined" && document.documentElement.dir === "rtl");

  const [isHovered, setIsHovered] = useState(false);

  // Pre-filled personalized greeting based on language
  const defaultText = isAr
    ? "مرحباً عيادات بريمير هيلث، أود الاستفسار عن المواعيد والخدمات الطبية المتاحة."
    : "Hello Premier Health Clinics, I would like to inquire about available services and bookings.";

  const whatsappHref = `${CONTACT.whatsapp_url_eg}?text=${encodeURIComponent(
    defaultText
  )}`;

  const handleClick = () => {
    trackClickWhatsApp({
      location: pathname,
      page_path: pathname,
      cta_position: "floating_widget",
      phone_type: "EG",
    });
  };

  return (
    <aside
      aria-label={isAr ? "زر التواصل المباشر عبر واتساب" : "WhatsApp Quick Chat"}
      className="fixed z-40 flex items-center gap-3 bottom-20 md:bottom-7 right-4 md:right-7 rtl:right-auto rtl:left-4 rtl:md:left-7 group pointer-events-auto"
    >
      {/* Luxury Tooltip Label (Visible on hover and on desktop) */}
      <div
        className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-accent/20 shadow-xl shadow-primary/10 text-primary transition-all duration-300 transform select-none ${
          isHovered
            ? "opacity-100 translate-x-0 scale-100"
            : "opacity-90 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 scale-95 group-hover:scale-100"
        }`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <div className="flex flex-col text-start">
          <span className="text-[11px] font-bold font-sans text-primary leading-tight">
            {isAr ? "تواصل مباشرة مع العيادة" : "Chat with Concierge"}
          </span>
          <span className="text-[9px] text-slate-500 font-medium">
            {isAr ? "رد فوري عبر واتساب" : "Instant WhatsApp response"}
          </span>
        </div>
      </div>

      {/* Main Floating Button */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#25D366] text-white shadow-2xl shadow-[#25D366]/40 hover:shadow-[#25D366]/60 border-2 border-white/80 hover:scale-110 active:scale-95 transition-all duration-300 ease-out touch-manipulation focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
      >
        {/* Glowing Pulsing Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-pulse pointer-events-none" />

        {/* Live Notification Indicator */}
        <span className="absolute top-0 right-0 rtl:right-auto rtl:left-0 flex h-4 w-4 -mt-0.5 -mr-0.5 rtl:-ml-0.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex items-center justify-center rounded-full h-4 w-4 bg-emerald-400 text-primary text-[8px] font-black shadow-sm">
            1
          </span>
        </span>

        {/* Official WhatsApp Icon */}
        <WhatsappSvg className="w-7 h-7 md:w-8 md:h-8 drop-shadow-sm transition-transform duration-300 group-hover:rotate-12" />
      </a>
    </aside>
  );
}
