"use client";

import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────

export interface TabItem {
  id: string;
  label: ReactNode;
  icon: LucideIcon;
  badge?: number;
}



interface ProfileTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

// ─── Component ────────────────────────────────────────────────────────────

export function ProfileTabs({ tabs, activeTab, onChange }: ProfileTabsProps) {
  return (
    <div className="bg-white border border-[#e8e0d5] rounded-2xl p-1.5 shadow-sm">
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap cursor-pointer transition-all"
              style={
                isActive
                  ? {
                      backgroundColor: "#385366",
                      color: "#ffffff",
                    }
                  : {
                      color: "#959ead",
                      backgroundColor: "transparent",
                    }
              }
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#f7f2ea";
                  (e.currentTarget as HTMLButtonElement).style.color = "#385366";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color = "#959ead";
                }
              }}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
              {typeof tab.badge === "number" && tab.badge > 0 && (
                <span
                  className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                  style={
                    isActive
                      ? { backgroundColor: "rgba(255,255,255,0.2)", color: "#fff" }
                      : { backgroundColor: "#eef2f5", color: "#385366" }
                  }
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
