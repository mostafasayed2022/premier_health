import React from "react";

export interface InfoItemProps {
  icon: React.ElementType;
  label: React.ReactNode;
  value?: React.ReactNode;
  iconColor?: string;
  badge?: React.ReactNode;
}

export function InfoItem({
  icon: Icon,
  label,
  value,
  iconColor = "#c8a96b",
  badge,
}: InfoItemProps) {
  return (
    <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#f7f2ea]/60 border border-[#e8e0d5]/60 hover:bg-[#f7f2ea] transition-colors">
      <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shrink-0 border border-[#e8e0d5]/80 shadow-2xs">
        <Icon className="w-4 h-4" style={{ color: iconColor }} />
      </div>
      <div className="min-w-0 flex-1">
        <span className="text-[11px] text-[#959ead] font-medium block leading-tight">
          {label}
        </span>
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          <span className="text-xs sm:text-sm font-bold text-[#1e293b] truncate">
            {value ?? "—"}
          </span>
          {badge}
        </div>
      </div>
    </div>
  );
}

export interface SectionHeaderProps {
  icon: React.ElementType;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
}

export function SectionHeader({
  icon: Icon,
  title,
  subtitle,
  iconBg = "#eef2f5",
  iconColor = "#385366",
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-[#e8e0d5]">
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-2xs"
          style={{ backgroundColor: iconBg }}
        >
          <Icon className="w-4.5 h-4.5" style={{ color: iconColor }} />
        </div>
        <div>
          <h3 className="text-sm sm:text-base font-bold text-[#1e293b] leading-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-[11px] text-[#959ead] mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}

