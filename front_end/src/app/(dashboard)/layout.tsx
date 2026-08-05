"use client";

import React from "react";
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

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: CalendarCheck, label: "Bookings", href: "/dashboard/bookings" },
  { icon: Wallet, label: "Revenue", href: "/dashboard/revenue" },
  { icon: Users, label: "Specialists", href: "/dashboard/specialists" },
  { iocn: MessageSquare, label: "Messages", href: "/dashboard/messages" },
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
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-white border-r transition-transform duration-300 dark:bg-slate-900 border-slate-200 dark:border-slate-800 lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-20 items-center justify-between px-6 border-b">
          <span className="text-xl font-black text-primary">
            Premier Dashboard
          </span>
          <button onClick={() => setIsOpen(false)} className="lg:hidden">
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-2 p-4">
          {SIDEBAR_ITEMS.map((item) => (
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
              {/* <item.icon size={20} /> */}
              {item.label}
            </Link>
          ))}

          <div className="mt-auto pt-8 border-t border-slate-100 dark:border-slate-800">
            <button className="flex w-full items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all">
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-white border-b flex items-center justify-between px-8 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <button onClick={() => setIsOpen(true)} className="lg:hidden order-1">
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

        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
