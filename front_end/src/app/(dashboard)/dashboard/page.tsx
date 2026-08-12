"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  CalendarCheck,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useDashboardStore } from "@/store/useDashboardStore";
import { AnalyticsCards } from "@/components/dashboard/analytics";

const STATS = [
  {
    label: "Total Revenue",
    value: "$45,280",
    trend: "+12.5%",
    trendUp: true,
    icon: DollarSign,
    color: "bg-green-100 text-green-600",
  },
  {
    label: "Active Bookings",
    value: "84",
    trend: "+4.2%",
    trendUp: true,
    icon: CalendarCheck,
    color: "bg-blue-100 text-blue-600",
  },
  {
    label: "Conversion Rate",
    value: "3.2%",
    trend: "-0.8%",
    trendUp: false,
    icon: TrendingUp,
    color: "bg-purple-100 text-purple-600",
  },
  {
    label: "Total Patients",
    value: "2,420",
    trend: "+8.1%",
    trendUp: true,
    icon: Users,
    color: "bg-orange-100 text-orange-600",
  },
];

const RECENT_BOOKINGS = [
  {
    id: "PC-1024",
    customer: "Sarah Jenkins",
    service: "Home Nursing",
    date: "2024-04-12",
    status: "Confirm",
    amount: "$120",
    paid: true,
  },
  {
    id: "PC-1025",
    customer: "Robert Chen",
    service: "Physical Therapy",
    date: "2024-04-12",
    status: "Pending",
    amount: "$85",
    paid: false,
  },
  {
    id: "PC-1026",
    customer: "Elena Miller",
    service: "Lab Test",
    date: "2024-04-13",
    status: "Confirm",
    amount: "$45",
    paid: true,
  },
  {
    id: "PC-1027",
    customer: "Marcus Thorne",
    service: "Doctor Visit",
    date: "2024-04-13",
    status: "Confirm",
    amount: "$150",
    paid: true,
  },
  {
    id: "PC-1028",
    customer: "David Wilson",
    service: "Elderly Care",
    date: "2024-04-14",
    status: "Failed",
    amount: "$90",
    paid: false,
  },
];

export default function DashboardPage() {
  const { searchQuery } = useDashboardStore();

  const filteredBookings = RECENT_BOOKINGS.filter(
    (b) =>
      b.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.service.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in max-w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time analytics and clinic activities
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 self-start sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl gap-1.5 text-xs"
          >
            <Filter size={14} /> Filter
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl gap-1.5 text-xs"
          >
            <Download size={14} /> Export
          </Button>
        </div>
      </div>

      {/* ── Live Analytics Cards ── */}
      <AnalyticsCards />
      {/* Stats Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="border-none shadow-xs hover:shadow-md transition-all group overflow-hidden bg-white dark:bg-slate-900">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className={cn("p-2.5 sm:p-3 rounded-2xl", stat.color)}>
                    <stat.icon size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <div
                    className={cn(
                      "flex items-center text-[10px] font-black uppercase px-2 py-1 rounded-lg",
                      stat.trendUp
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-600",
                    )}
                  >
                    {stat.trendUp ? (
                      <ArrowUpRight size={12} />
                    ) : (
                      <ArrowDownRight size={12} />
                    )}
                    {stat.trend}
                  </div>
                </div>
                <p className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </p>
                <h4 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 dark:text-white">
                  {stat.value}
                </h4>
              </CardContent>
              <div className="h-1.5 w-full bg-slate-50 dark:bg-slate-800">
                <div
                  className={cn(
                    "h-full",
                    stat.trendUp ? "bg-green-500" : "bg-red-500",
                  )}
                  style={{ width: "65%" }}
                />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Bookings Section */}
        <Card className="lg:col-span-2 border-none shadow-xs overflow-hidden flex flex-col bg-white dark:bg-slate-900">
          <CardHeader className="flex flex-row items-center justify-between border-b px-4 sm:px-6 py-4">
            <CardTitle className="text-base sm:text-xl font-bold">
              Recent Bookings
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-xs">
              View All
            </Button>
          </CardHeader>

          {/* 1. Mobile Cards View (< sm) */}
          <div className="block sm:hidden divide-y divide-slate-100 dark:divide-slate-800">
            {filteredBookings.map((booking, i) => (
              <div key={i} className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-primary">
                    {booking.id}
                  </span>
                  <Badge
                    variant={
                      booking.status === "Confirm"
                        ? "outline"
                        : booking.status === "Pending"
                          ? "secondary"
                          : "destructive"
                    }
                    className="rounded-lg text-[10px]"
                  >
                    {booking.status}
                  </Badge>
                </div>
                <div className="font-bold text-slate-900 dark:text-white text-sm">
                  {booking.customer}
                </div>
                <div className="text-xs text-slate-500">
                  {booking.service} •{" "}
                  <span className="text-slate-400">{booking.date}</span>
                </div>
                <div className="pt-1 flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-500">Amount</span>
                  <span className="text-slate-900 dark:text-white">
                    {booking.amount}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 2. Desktop Table View (>= sm) */}
          <div className="hidden sm:block w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[550px]">
              <thead className="bg-[#F7F2EA] dark:bg-slate-800 border-b border-[#C8A96B]/15 text-[11px]">
                <tr>
                  <th className="px-4 sm:px-6 py-3 font-bold uppercase text-[#5A4E3E] dark:text-slate-400 whitespace-nowrap">
                    ID
                  </th>
                  <th className="px-4 sm:px-6 py-3 font-bold uppercase text-[#5A4E3E] dark:text-slate-400 whitespace-nowrap">
                    Customer
                  </th>
                  <th className="px-4 sm:px-6 py-3 font-bold uppercase text-[#5A4E3E] dark:text-slate-400 whitespace-nowrap">
                    Service
                  </th>
                  <th className="px-4 sm:px-6 py-3 font-bold uppercase text-[#5A4E3E] dark:text-slate-400 whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-4 sm:px-6 py-3 font-bold uppercase text-[#5A4E3E] dark:text-slate-400 whitespace-nowrap">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y text-xs sm:text-sm">
                {filteredBookings.map((booking, i) => (
                  <tr
                    key={i}
                    className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-4 sm:px-6 py-3 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                      {booking.id}
                    </td>
                    <td className="px-4 sm:px-6 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-full bg-slate-200 shrink-0" />
                        <span className="font-bold text-xs sm:text-sm truncate">
                          {booking.customer}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-3 text-slate-500 text-xs sm:text-sm whitespace-nowrap">
                      {booking.service}
                    </td>
                    <td className="px-4 sm:px-6 py-3 whitespace-nowrap">
                      <Badge
                        variant={
                          booking.status === "Confirm"
                            ? "outline"
                            : booking.status === "Pending"
                              ? "secondary"
                              : "destructive"
                        }
                        className="rounded-lg text-[10px] px-2 py-0.5"
                      >
                        {booking.status}
                      </Badge>
                    </td>
                    <td className="px-4 sm:px-6 py-3 font-black whitespace-nowrap">
                      {booking.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Activity Feed */}
        <Card className="border-none shadow-xs h-full flex flex-col bg-white dark:bg-slate-900">
          <CardHeader className="border-b px-4 sm:px-6 py-4">
            <CardTitle className="text-base sm:text-xl font-bold">
              System Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 flex flex-col gap-5">
            {[
              {
                time: "2m ago",
                text: "New booking from Sarah Jenkins",
                color: "bg-blue-500",
              },
              {
                time: "15m ago",
                text: "Payment confirmed for PC-1026",
                color: "bg-green-500",
              },
              {
                time: "1h ago",
                text: "Service 'Elderly Care' updated",
                color: "bg-purple-500",
              },
              {
                time: "3h ago",
                text: "New specialist joined the platform",
                color: "bg-orange-500",
              },
            ].map((activity, i) => (
              <div key={i} className="flex gap-3 relative">
                {i < 3 && (
                  <div className="absolute left-[5px] top-4 w-px h-8 bg-slate-100 dark:bg-slate-800" />
                )}
                <div
                  className={cn(
                    "h-2.5 w-2.5 rounded-full mt-1.5 shrink-0",
                    activity.color,
                  )}
                />
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {activity.text}
                  </span>
                  <span className="text-[10px] sm:text-xs text-slate-400">
                    {activity.time}
                  </span>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full mt-2 rounded-xl text-xs"
            >
              View System Logs
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
