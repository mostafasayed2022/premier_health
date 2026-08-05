import React from "react";

export interface InfoRowProps {
  label: string;
  value?: string;
}
export function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="space-y-0.5">
      <span className="text-xs text-[#959ead] font-medium">{label}</span>
      <p className="text-sm font-semibold" style={{ color: "#1e293b" }}>
        {value ?? "—"}
      </p>
    </div>
  );
}

export interface SectionHeaderProps {
  icon: React.ElementType;
  title: string;
}
export function SectionHeader({ icon: Icon, title }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-[#e8e0d5]">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#eef2f5" }}>
        <Icon className="w-4 h-4" style={{ color: "#385366" }} />
      </div>
      <h3 className="text-sm font-bold" style={{ color: "#1e293b" }}>{title}</h3>
    </div>
  );
}
