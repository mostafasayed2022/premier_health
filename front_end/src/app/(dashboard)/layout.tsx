"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  Wallet,
  Users,
  Settings,
  MessageSquare,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useDashboardStore } from "@/store/useDashboardStore";
import { Providers } from "@/app/providers";

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: CalendarCheck, label: "Bookings", href: "/dashboard/bookings" },
  { icon: Wallet, label: "Revenue", href: "/dashboard/revenue" },
  { icon: Users, label: "Specialists", href: "/dashboard/specialists" },
  { icon: MessageSquare, label: "Messages", href: "/dashboard/messages" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const { searchQuery, setSearchQuery } = useDashboardStore();

  return (
    <Providers>
      <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 transform bg-white border-r transition-transform duration-300 dark:bg-slate-900 border-slate-200 dark:border-slate-800 lg:static lg:translate-x-0",
            isOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex h-20 items-center justify-between px-5 border-b border-slate-200 dark:border-slate-800">
            <Link
              href="/"
              aria-label="Premier Health Homepage"
              className="flex items-center gap-3 group focus:outline-none shrink-0"
            >
              <div className="relative w-10 h-10 shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo/logo.webp"
                  alt="Premier Health"
                  width={40}
                  height={40}
                  priority
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-primary dark:text-white font-black text-base tracking-tight leading-none mb-1">
                  PREMIER <span className="text-accent font-medium">HEALTH</span>
                </span>
                <span className="text-[8.5px] text-slate-400 font-bold tracking-[0.2em] uppercase leading-none">
                  Medical Care
                </span>
              </div>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-1 text-slate-500 hover:text-slate-700 dark:text-slate-400"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col gap-2 p-4">
            {SIDEBAR_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                    pathname === item.href
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800",
                  )}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}

            <div className="mt-auto pt-8 border-t border-slate-100 dark:border-slate-800">
              <button className="flex w-full items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all">
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="h-20 bg-white border-b flex items-center justify-between px-8 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden order-1"
            >
              <Menu size={20} />
            </button>

            <div className="relative max-w-sm w-full hidden md:block">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 dark:bg-slate-800"
                placeholder="Search data, bookings, or specialists..."
              />
            </div>

            <div className="flex items-center gap-4 ml-auto lg:order-2">
              <button className="p-2 text-slate-400 hover:text-primary transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
              </button>
              <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden">
                {/* Avatar Placeholder */}
                <div className="h-full w-full bg-gradient-to-br from-primary to-secondary" />
              </div>
            </div>
          </header>

          <main className="p-8 flex-1">{children}</main>

          {/* Dashboard Footer */}
          <footer className="px-8 py-4 border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <p suppressHydrationWarning className="font-medium text-slate-600 dark:text-slate-400">
              © 2026 CodeVerse. All rights reserved.
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center sm:text-right">
              Designed &amp; Developed by:{" "}
              <span className="font-semibold text-primary dark:text-accent">Mostafa Sayed</span> ·{" "}
              <span className="font-semibold text-primary dark:text-accent">Mohamed Hossam</span> ·{" "}
              <span className="font-semibold text-primary dark:text-accent">Mohamed Salah</span>
            </p>
          </footer>
        </div>
      </div>
    </Providers>
  );
}
