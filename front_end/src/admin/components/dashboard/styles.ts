import React from "react";

// ─── BookingsTable Styles ───────────────────────────────────────────────────

export const badgeBase: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "2px 8px",
  borderRadius: "9999px",
  fontSize: "10px",
  fontWeight: "bold",
  textTransform: "capitalize",
};
export const badgeGreen: React.CSSProperties = { ...badgeBase, backgroundColor: "#DCFCE7", color: "#15803D" };
export const badgeYellow: React.CSSProperties = { ...badgeBase, backgroundColor: "#FEF9C3", color: "#A16207" };
export const badgeRed: React.CSSProperties = { ...badgeBase, backgroundColor: "#FEE2E2", color: "#B91C1C" };
export const badgeGray: React.CSSProperties = { ...badgeBase, backgroundColor: "#F1F5F9", color: "#475569" };
export const actionBtnStyle: React.CSSProperties = {
  border: "none", background: "transparent", cursor: "pointer",
  padding: "4px 8px", fontSize: "11px", fontWeight: "bold",
  color: "#C8A96B", borderRadius: "4px", transition: "opacity 0.15s",
};

export const containerStyle: React.CSSProperties = {
  backgroundColor: "#FFFFFF", border: "1px solid rgba(200, 169, 107, 0.2)",
  borderRadius: 18, boxShadow: "0 6px 24px rgba(153, 134, 117, 0.06)",
  overflow: "hidden", marginTop: "24px",
};
export const searchBarStyle: React.CSSProperties = {
  padding: "16px 24px", borderBottom: "1px solid rgba(200, 169, 107, 0.12)",
  display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#FCFDFE",
};
export const searchWrapStyle: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: "8px",
  backgroundColor: "#F8FAFC", border: "1px solid rgba(200, 169, 107, 0.2)",
  borderRadius: "10px", padding: "6px 12px", width: "100%", maxWidth: "320px",
};
export const searchInputStyle: React.CSSProperties = {
  border: "none", background: "transparent", fontSize: "12px",
  outline: "none", width: "100%", color: "#1E293B",
};
export const tableStyle: React.CSSProperties = { width: "100%", minWidth: "750px", borderCollapse: "collapse", textAlign: "left" };
export const thStyle: React.CSSProperties = {
  padding: "14px 16px", backgroundColor: "#F7F2EA", borderBottom: "1px solid rgba(200, 169, 107, 0.18)",
  fontSize: "11px", fontWeight: 700, textTransform: "uppercase",
  color: "#5A4E3E", letterSpacing: "0.08em", userSelect: "none", whiteSpace: "nowrap",
};
export const tdStyle: React.CSSProperties = { padding: "14px 16px", borderBottom: "1px solid rgba(200, 169, 107, 0.08)", fontSize: "12px", color: "#334155", whiteSpace: "nowrap" };
export const paginationStyle: React.CSSProperties = {
  padding: "14px 24px", display: "flex", justifyContent: "space-between",
  alignItems: "center", borderTop: "1px solid #F1F5F9", backgroundColor: "#FCFDFE",
};
export const btnPageStyle: React.CSSProperties = {
  backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "8px",
  padding: "6px 12px", fontSize: "11px", fontWeight: "bold", color: "#475569",
  cursor: "pointer", transition: "all 0.15s",
};
export const emptyCellStyle: React.CSSProperties = { padding: "40px", textAlign: "center", color: "#94A3B8", fontStyle: "italic" };

// ─── DashboardCharts Styles ─────────────────────────────────────────────────

export const chartCardStyle: React.CSSProperties = {
  backgroundColor: "#FFFFFF",
  border: "1px solid rgba(200, 169, 107, 0.15)",
  borderRadius: 18,
  padding: 24,
  boxShadow: "0 10px 25px rgba(153, 134, 117, 0.05)",
};

export const chartTitleStyle: React.CSSProperties = {
  fontSize: 12,
  fontFamily: "var(--admin-sans, sans-serif)",
  fontWeight: "bold",
  color: "#1E293B",
  marginBottom: 16,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

export const tooltipStyle: React.CSSProperties = {
  backgroundColor: "#FFFFFF",
  border: "1px solid rgba(200, 169, 107, 0.25)",
  borderRadius: 8,
  fontSize: 11,
  fontWeight: "bold",
  boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
};

export const noDataStyle: React.CSSProperties = {
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#94A3B8",
  fontSize: 12,
  fontStyle: "italic",
};
