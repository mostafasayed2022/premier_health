"use client";

import { useState } from "react";
import { Lock, Bell, Smartphone, Check, Save, Mail, Globe } from "lucide-react";
import { toast } from "sonner";

// ─── Sub-components ───────────────────────────────────────────────────────

interface SectionCardProps {
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

function SectionCard({ icon: Icon, iconBg, iconColor, title, subtitle, children }: SectionCardProps) {
  return (
    <div className="bg-white border border-[#e8e0d5] rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: iconBg }}
        >
          <Icon className="w-5 h-5" style={{ color: iconColor }} />
        </div>
        <div>
          <h3 className="text-base font-bold" style={{ color: "#1e293b" }}>{title}</h3>
          <p className="text-xs" style={{ color: "#959ead" }}>{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

interface ToggleRowProps {
  icon: React.ElementType;
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

function ToggleRow({ icon: Icon, label, description, checked, onChange }: ToggleRowProps) {
  return (
    <div
      className="flex items-center justify-between p-4 rounded-xl border"
      style={{ backgroundColor: "#fafafa", borderColor: "#e8e0d5" }}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4 shrink-0" style={{ color: "#c8a96b" }} />
        <div>
          <p className="text-sm font-semibold" style={{ color: "#1e293b" }}>{label}</p>
          <p className="text-xs" style={{ color: "#959ead" }}>{description}</p>
        </div>
      </div>
      {/* Toggle switch */}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="relative w-11 h-6 rounded-full transition-colors cursor-pointer shrink-0"
        style={{ backgroundColor: checked ? "#385366" : "#d1d5db" }}
      >
        <span
          className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform"
          style={{ transform: checked ? "translateX(20px)" : "translateX(0)" }}
        />
      </button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────

export function ProfileSettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsReminders, setSmsReminders] = useState(true);
  const [language, setLanguage] = useState("English");

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) { toast.error("Please enter your current password."); return; }
    if (newPassword.length < 8) { toast.error("New password must be at least 8 characters."); return; }
    if (newPassword !== confirmPassword) { toast.error("Passwords do not match."); return; }
    toast.success("Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl bg-[#fafafa] border border-[#e8e0d5] text-sm focus:outline-none focus:ring-2 focus:ring-[#385366]/30 transition-all";

  return (
    <div className="space-y-5">

      {/* ── Password & Security ── */}
      <SectionCard
        icon={Lock}
        iconBg="#eef2f5"
        iconColor="#385366"
        title="Password & Security"
        subtitle="Manage your account password"
      >
        <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-xl">
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: "#4a5568" }}>
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className={inputClass}
              style={{ color: "#1e293b" }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "#4a5568" }}>
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min 8 characters"
                className={inputClass}
                style={{ color: "#1e293b" }}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "#4a5568" }}>
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                className={inputClass}
                style={{ color: "#1e293b" }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#385366" }}
          >
            <Save className="w-4 h-4" />
            Update Password
          </button>
        </form>
      </SectionCard>

      {/* ── Notifications ── */}
      <SectionCard
        icon={Bell}
        iconBg="#fff8ee"
        iconColor="#a38448"
        title="Notifications & Preferences"
        subtitle="Customize how PremierCare communicates with you"
      >
        <div className="space-y-3 max-w-xl">
          <ToggleRow
            icon={Mail}
            label="Email Appointment Confirmations"
            description="Receive instant email receipts & calendar invites"
            checked={emailNotifications}
            onChange={setEmailNotifications}
          />
          <ToggleRow
            icon={Smartphone}
            label="SMS Appointment Reminders"
            description="Receive SMS 2 hours before your scheduled slot"
            checked={smsReminders}
            onChange={setSmsReminders}
          />

          {/* Language */}
          <div className="pt-1">
            <label className="block text-xs font-semibold mb-1.5" style={{ color: "#4a5568" }}>
              <span className="inline-flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" style={{ color: "#c8a96b" }} />
                Preferred Display Language
              </span>
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={inputClass}
              style={{ color: "#1e293b" }}
            >
              <option value="English">English</option>
              <option value="Arabic">العربية (Arabic)</option>
            </select>
          </div>

          <button
            onClick={() => toast.success("Preferences saved!")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#998675" }}
          >
            <Check className="w-4 h-4" />
            Save Preferences
          </button>
        </div>
      </SectionCard>

    </div>
  );
}
