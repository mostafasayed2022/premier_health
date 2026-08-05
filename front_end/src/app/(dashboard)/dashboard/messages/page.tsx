"use client";

import React from "react";
import { MessageSquare, Search, Send, User } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const MESSAGES = [
  { id: "1", sender: "Sarah Jenkins", text: "Hello, I wanted to inquire about my appointment tomorrow.", time: "10:30 AM", unread: true },
  { id: "2", sender: "Robert Chen", text: "Thank you for sending over the lab report details.", time: "Yesterday", unread: false },
  { id: "3", sender: "Elena Miller", text: "Can I reschedule my IV therapy session to Friday?", time: "May 10", unread: false },
];

export default function MessagesDashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Patient Messages</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Communicate directly with patients and clinical support.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Messages List */}
        <Card className="border-none shadow-xs bg-white dark:bg-slate-900 p-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            {MESSAGES.map((m) => (
              <div
                key={m.id}
                className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                  m.unread
                    ? "bg-primary/5 border-primary/20 font-semibold"
                    : "bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900 dark:text-white">{m.sender}</span>
                  <span className="text-[10px] text-slate-400">{m.time}</span>
                </div>
                <p className="text-slate-500 line-clamp-1">{m.text}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Chat Pane */}
        <Card className="md:col-span-2 border-none shadow-xs bg-white dark:bg-slate-900 p-5 flex flex-col justify-between min-h-[400px]">
          <div className="border-b pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs">
                SJ
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Sarah Jenkins</h4>
                <span className="text-[10px] text-emerald-500 font-semibold">Active Now</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 py-4 text-xs">
            <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl max-w-sm">
              Hello, I wanted to inquire about my appointment tomorrow at Dubai Marina.
            </div>
            <div className="bg-primary text-white p-3 rounded-2xl max-w-sm ml-auto">
              Hi Sarah! Your appointment with Dr. Elena Vance is confirmed for 10:00 AM.
            </div>
          </div>

          <div className="flex items-center gap-2 pt-3 border-t">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-primary/20"
            />
            <Button size="sm" className="rounded-xl px-4 gap-1 text-xs">
              <Send size={14} /> Send
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
