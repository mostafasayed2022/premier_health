"use client";

import React, { useState } from "react";
import { Settings, Shield, Bell, Globe, Save } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

export default function SettingsDashboardPage() {
  const [clinicName, setClinicName] = useState("PremierCare Medical & Aesthetics");
  const [email, setEmail] = useState("info@premierhealth.com");
  const [phone, setPhone] = useState("+971 4 800 9988");
  const [notifications, setNotifications] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Dashboard settings saved!");
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Clinic Settings</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Configure system parameters, notifications, and branch contact info.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="border-none shadow-xs bg-white dark:bg-slate-900 p-5 sm:p-6 space-y-4">
          <CardHeader className="p-0 border-b pb-3">
            <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              <span>General Information</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0 space-y-4 text-xs sm:text-sm pt-2">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Clinic Name</label>
              <input
                type="text"
                value={clinicName}
                onChange={(e) => setClinicName(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Support Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Phone Hotline</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-primary" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block text-xs sm:text-sm">Realtime Notifications</span>
                  <span className="text-[11px] text-slate-500">Receive alerts when new bookings are submitted</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="w-4 h-4 accent-primary rounded cursor-pointer"
              />
            </div>

            <Button type="submit" className="rounded-xl gap-2 text-xs sm:text-sm">
              <Save size={16} /> Save Changes
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
