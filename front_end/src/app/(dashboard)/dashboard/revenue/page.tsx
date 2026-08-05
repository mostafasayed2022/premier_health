"use client";

import React from "react";
import { 
  DollarSign, 
  ArrowUpRight, 
  Calendar, 
  Download, 
  Filter, 
  CreditCard, 
  Wallet 
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const REVENUE_DATA = [
  { id: "TX-9021", date: "2024-04-14 09:30", customer: "Sarah Jenkins", amount: 120.00, method: "Visa", status: "Paid" },
  { id: "TX-9022", date: "2024-04-14 11:45", customer: "Robert Chen", amount: 85.00, method: "Mastercard", status: "Pending" },
  { id: "TX-9023", date: "2024-04-13 14:20", customer: "Elena Miller", amount: 45.00, method: "Apple Pay", status: "Paid" },
  { id: "TX-9024", date: "2024-04-13 16:10", customer: "Marcus Thorne", amount: 150.00, method: "Visa", status: "Failed" },
  { id: "TX-9025", date: "2024-04-12 10:05", customer: "David Wilson", amount: 90.00, method: "Visa", status: "Paid" },
];

export default function RevenuePage() {
  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in max-w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Revenue Tracking</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Manage financial operations and transactions.</p>
        </div>
        <Button className="rounded-xl gap-2 text-xs sm:text-sm self-start sm:self-auto">
          <Download size={16} /> Export Report
        </Button>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3">
        <Card className="bg-primary text-white border-none p-5 sm:p-8 relative overflow-hidden">
          <div className="relative z-10 space-y-3 sm:space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest opacity-70">Payouts Balance</p>
            <h3 className="text-3xl sm:text-4xl font-black">$12,450.80</h3>
            <div className="flex flex-wrap gap-2 pt-2">
              <Button variant="outline" size="sm" className="bg-white/10 border-none text-white hover:bg-white/20 text-xs">
                Withdraw
              </Button>
              <Button variant="outline" size="sm" className="bg-white/10 border-none text-white hover:bg-white/20 text-xs">
                History
              </Button>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 translate-y-1/4 translate-x-1/4 pointer-events-none">
            <DollarSign size={160} />
          </div>
        </Card>

        <Card className="p-5 sm:p-8 border-none shadow-xs flex flex-col justify-between bg-white dark:bg-slate-900">
          <div className="space-y-1">
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-400">Monthly Revenue</p>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">$45,280</h3>
          </div>
          <div className="flex items-center gap-1.5 text-green-600 text-xs sm:text-sm font-bold mt-4">
            <ArrowUpRight size={16} /> 12.5% vs last month
          </div>
        </Card>

        <Card className="p-5 sm:p-8 border-none shadow-xs flex flex-col justify-between bg-white dark:bg-slate-900">
          <div className="space-y-1">
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-400">Pending Transactions</p>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">$1,850</h3>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 text-xs sm:text-sm font-bold mt-4">
            <Calendar size={16} /> 14 payments waiting
          </div>
        </Card>
      </div>

      {/* Transaction Table */}
      <Card className="border-none shadow-xs overflow-hidden bg-white dark:bg-slate-900">
        <CardHeader className="flex flex-row items-center justify-between border-b px-4 sm:px-6 py-4">
          <CardTitle className="text-base sm:text-xl font-bold">Transaction History</CardTitle>
          <Button variant="outline" size="sm" className="rounded-lg gap-1.5 text-xs">
            <Filter size={14} /> Filter
          </Button>
        </CardHeader>

        {/* 1. Mobile Cards View (< sm) */}
        <div className="block sm:hidden divide-y divide-slate-100 dark:divide-slate-800">
          {REVENUE_DATA.map((tx, i) => (
            <div key={i} className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-slate-500">{tx.id}</span>
                <Badge
                  variant={tx.status === 'Paid' ? 'outline' : tx.status === 'Pending' ? 'secondary' : 'destructive'}
                  className="text-[10px]"
                >
                  {tx.status}
                </Badge>
              </div>
              <div className="font-bold text-slate-900 dark:text-white text-sm">{tx.customer}</div>
              <div className="text-xs text-slate-500 flex items-center justify-between pt-1">
                <span>{tx.date}</span>
                <span className="flex items-center gap-1">
                  {tx.method === 'Visa' ? <CreditCard size={12} /> : <Wallet size={12} />}
                  {tx.method}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold">
                <span className="text-slate-500">Amount</span>
                <span className="text-slate-900 dark:text-white">${tx.amount.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Desktop Table View (>= sm) */}
        <div className="hidden sm:block w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead className="bg-[#F7F2EA] dark:bg-slate-800 border-b border-[#C8A96B]/15 text-[11px]">
              <tr>
                <th className="px-4 sm:px-6 py-3.5 font-bold uppercase text-[#5A4E3E] dark:text-slate-400 whitespace-nowrap">Transaction ID</th>
                <th className="px-4 sm:px-6 py-3.5 font-bold uppercase text-[#5A4E3E] dark:text-slate-400 whitespace-nowrap">Date</th>
                <th className="px-4 sm:px-6 py-3.5 font-bold uppercase text-[#5A4E3E] dark:text-slate-400 whitespace-nowrap">Customer</th>
                <th className="px-4 sm:px-6 py-3.5 font-bold uppercase text-[#5A4E3E] dark:text-slate-400 whitespace-nowrap">Amount</th>
                <th className="px-4 sm:px-6 py-3.5 font-bold uppercase text-[#5A4E3E] dark:text-slate-400 whitespace-nowrap">Method</th>
                <th className="px-4 sm:px-6 py-3.5 font-bold uppercase text-[#5A4E3E] dark:text-slate-400 whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y text-xs sm:text-sm">
              {REVENUE_DATA.map((tx, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-4 sm:px-6 py-3.5 font-mono text-slate-500 text-xs whitespace-nowrap">{tx.id}</td>
                  <td className="px-4 sm:px-6 py-3.5 text-slate-500 text-xs whitespace-nowrap">{tx.date}</td>
                  <td className="px-4 sm:px-6 py-3.5 font-bold whitespace-nowrap">{tx.customer}</td>
                  <td className="px-4 sm:px-6 py-3.5 font-black whitespace-nowrap">${tx.amount.toFixed(2)}</td>
                  <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                      {tx.method === 'Visa' ? <CreditCard size={14} /> : <Wallet size={14} />}
                      {tx.method}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap">
                    <Badge 
                      variant={tx.status === 'Paid' ? 'outline' : tx.status === 'Pending' ? 'secondary' : 'destructive'}
                      className="text-[10px]"
                    >
                      {tx.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
