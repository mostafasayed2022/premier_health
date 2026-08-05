"use client";

import React, { useState } from "react";
import { CalendarCheck, Download, Plus, Search } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const ALL_BOOKINGS = [
  { id: "PC-1024", customer: "Sarah Jenkins", phone: "+971 50 112 3344", doctor: "Dr. Elena Vance", service: "Home Nursing", date: "2026-05-12", time: "10:00 AM", status: "Confirmed", amount: "$120" },
  { id: "PC-1025", customer: "Robert Chen", phone: "+971 50 889 1234", doctor: "Dr. Marcus Thorne", service: "Physical Therapy", date: "2026-05-12", time: "11:30 AM", status: "Pending", amount: "$85" },
  { id: "PC-1026", customer: "Elena Miller", phone: "+971 50 334 9988", doctor: "Dr. Elena Vance", service: "Lab Test", date: "2026-05-13", time: "02:00 PM", status: "Confirmed", amount: "$45" },
  { id: "PC-1027", customer: "Marcus Thorne", phone: "+971 50 445 1122", doctor: "Dr. Sarah Paul", service: "Doctor Visit", date: "2026-05-13", time: "04:15 PM", status: "Confirmed", amount: "$150" },
  { id: "PC-1028", customer: "David Wilson", phone: "+971 50 998 4433", doctor: "Dr. Marcus Thorne", service: "Elderly Care", date: "2026-05-14", time: "09:00 AM", status: "Cancelled", amount: "$90" },
];

export default function BookingsManagementPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = ALL_BOOKINGS.filter((b) => {
    const matchesFilter = filter === "all" || b.status.toLowerCase() === filter.toLowerCase();
    const matchesSearch =
      b.customer.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.service.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in max-w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Bookings & Appointments</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Manage patient scheduling and clinic visits.</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button size="sm" className="rounded-xl gap-1.5 text-xs">
            <Plus size={14} /> New Booking
          </Button>
          <Button variant="outline" size="sm" className="rounded-xl gap-1.5 text-xs">
            <Download size={14} /> Export
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patient, ID or service..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl overflow-x-auto">
          {["all", "Confirmed", "Pending", "Cancelled"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all whitespace-nowrap ${
                filter === tab
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {tab === "all" ? "All" : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Container */}
      <Card className="border-none shadow-xs overflow-hidden bg-white dark:bg-slate-900">
        <CardHeader className="border-b px-4 sm:px-6 py-4">
          <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-primary" />
            <span>Consultation Schedule ({filtered.length})</span>
          </CardTitle>
        </CardHeader>

        {/* 1. Mobile Cards View (Visible on screens < sm) */}
        <div className="block sm:hidden divide-y divide-slate-100 dark:divide-slate-800">
          {filtered.length === 0 ? (
            <p className="p-6 text-center text-xs text-slate-400 italic">No bookings found</p>
          ) : (
            filtered.map((b) => (
              <div key={b.id} className="p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-primary">{b.id}</span>
                  <Badge
                    variant={
                      b.status === "Confirmed"
                        ? "outline"
                        : b.status === "Pending"
                        ? "secondary"
                        : "destructive"
                    }
                    className="text-[10px]"
                  >
                    {b.status}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <div className="font-bold text-slate-900 dark:text-white text-sm">{b.customer}</div>
                  <div className="text-xs text-slate-500">Service: <span className="font-medium text-slate-700 dark:text-slate-300">{b.service}</span></div>
                  <div className="text-xs text-slate-500">Doctor: <span className="font-medium text-slate-700 dark:text-slate-300">{b.doctor}</span></div>
                  <div className="text-[11px] text-slate-400">{b.date} • {b.time}</div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-500">Fee Amount</span>
                  <span className="text-slate-900 dark:text-white">{b.amount}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 2. Desktop Table View (Visible on screens >= sm) */}
        <div className="hidden sm:block w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead className="bg-[#F7F2EA] dark:bg-slate-800 border-b border-[#C8A96B]/15 text-[11px]">
              <tr>
                <th className="px-4 sm:px-6 py-3.5 font-bold uppercase text-[#5A4E3E] dark:text-slate-400 whitespace-nowrap">Booking ID</th>
                <th className="px-4 sm:px-6 py-3.5 font-bold uppercase text-[#5A4E3E] dark:text-slate-400 whitespace-nowrap">Patient</th>
                <th className="px-4 sm:px-6 py-3.5 font-bold uppercase text-[#5A4E3E] dark:text-slate-400 whitespace-nowrap">Doctor</th>
                <th className="px-4 sm:px-6 py-3.5 font-bold uppercase text-[#5A4E3E] dark:text-slate-400 whitespace-nowrap">Service</th>
                <th className="px-4 sm:px-6 py-3.5 font-bold uppercase text-[#5A4E3E] dark:text-slate-400 whitespace-nowrap">Date & Time</th>
                <th className="px-4 sm:px-6 py-3.5 font-bold uppercase text-[#5A4E3E] dark:text-slate-400 whitespace-nowrap">Status</th>
                <th className="px-4 sm:px-6 py-3.5 font-bold uppercase text-[#5A4E3E] dark:text-slate-400 whitespace-nowrap">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y text-xs sm:text-sm">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-4 sm:px-6 py-3.5 font-bold text-primary whitespace-nowrap">{b.id}</td>
                  <td className="px-4 sm:px-6 py-3.5 font-semibold whitespace-nowrap">{b.customer}</td>
                  <td className="px-4 sm:px-6 py-3.5 text-slate-500 whitespace-nowrap">{b.doctor}</td>
                  <td className="px-4 sm:px-6 py-3.5 text-slate-500 whitespace-nowrap">{b.service}</td>
                  <td className="px-4 sm:px-6 py-3.5 text-slate-500 text-xs whitespace-nowrap">
                    {b.date} <span className="text-slate-400">({b.time})</span>
                  </td>
                  <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap">
                    <Badge
                      variant={
                        b.status === "Confirmed"
                          ? "outline"
                          : b.status === "Pending"
                          ? "secondary"
                          : "destructive"
                      }
                      className="text-[10px]"
                    >
                      {b.status}
                    </Badge>
                  </td>
                  <td className="px-4 sm:px-6 py-3.5 font-bold whitespace-nowrap">{b.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
