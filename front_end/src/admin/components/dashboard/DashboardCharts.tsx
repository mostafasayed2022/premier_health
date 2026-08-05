"use client";
// admin/components/dashboard/DashboardCharts.tsx
import React from "react";
import {
  ResponsiveContainer as ResponsiveContainerOriginal,
  AreaChart as AreaChartOriginal,
  Area as AreaOriginal,
  XAxis as XAxisOriginal,
  YAxis as YAxisOriginal,
  CartesianGrid as CartesianGridOriginal,
  Tooltip as TooltipOriginal,
  BarChart as BarChartOriginal,
  Bar as BarOriginal,
  PieChart as PieChartOriginal,
  Pie as PieOriginal,
  Cell as CellOriginal,
} from "recharts";
import {
  chartCardStyle,
  chartTitleStyle,
  tooltipStyle,
  noDataStyle,
} from "./styles";

const ResponsiveContainer = ResponsiveContainerOriginal as any;
const AreaChart = AreaChartOriginal as any;
const Area = AreaOriginal as any;
const XAxis = XAxisOriginal as any;
const YAxis = YAxisOriginal as any;
const CartesianGrid = CartesianGridOriginal as any;
const Tooltip = TooltipOriginal as any;
const BarChart = BarChartOriginal as any;
const Bar = BarOriginal as any;
const PieChart = PieChartOriginal as any;
const Pie = PieOriginal as any;
const Cell = CellOriginal as any;

interface StatsData {
  daily_bookings: { date: string; count: number }[];
  branch_bookings: { branch: string; count: number }[];
  doctor_bookings: { doctor: string; count: number }[];
  payment_stats: { status: string; count: number }[];
}

interface DashboardChartsProps {
  stats: StatsData;
}

const COLORS = ["#1E293B", "#C8A96B", "#FF8042", "#EF4444"];

export const DashboardCharts = React.memo(function DashboardCharts({ stats }: DashboardChartsProps) {
  // Format payment stats for pie chart
  const paymentPieData = React.useMemo(() => {
    return stats.payment_stats.map((item) => ({
      name: item.status.toUpperCase(),
      value: item.count,
    }));
  }, [stats.payment_stats]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginTop: "24px" }}>
      {/* Upper Grid - Booking volume and branches */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
        
        {/* Daily Booking Volume Area Chart */}
        <div style={chartCardStyle}>
          <h3 style={chartTitleStyle}>Daily Bookings (Last 30 Days)</h3>
          <div style={{ height: 260 }}>
            {stats.daily_bookings.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.daily_bookings} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C8A96B" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#C8A96B" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#94A3B8" }} stroke="#CBD5E1" />
                  <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} stroke="#CBD5E1" />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="count" stroke="#C8A96B" strokeWidth={2} fillOpacity={1} fill="url(#colorCount)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div style={noDataStyle}>No booking data available</div>
            )}
          </div>
        </div>

        {/* Bookings per Branch Bar Chart */}
        <div style={chartCardStyle}>
          <h3 style={chartTitleStyle}>Bookings per Branch</h3>
          <div style={{ height: 260 }}>
            {stats.branch_bookings.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.branch_bookings} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="branch" tick={{ fontSize: 10, fill: "#94A3B8" }} stroke="#CBD5E1" />
                  <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} stroke="#CBD5E1" />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="count" fill="#475569" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div style={noDataStyle}>No branch data available</div>
            )}
          </div>
        </div>

      </div>

      {/* Lower Grid - Payments and Doctors */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
        
        {/* Payment Status Pie Chart */}
        <div style={chartCardStyle}>
          <h3 style={chartTitleStyle}>Payment Status Ratio</h3>
          <div style={{ height: 260, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {paymentPieData.length > 0 ? (
              <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "row", alignItems: "center" }}>
                <div style={{ width: "60%", height: "100%" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={paymentPieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {paymentPieData.map((_: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={tooltipStyle} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ width: "40%", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {paymentPieData.map((item: any, index: number) => (
                    <div key={item.name} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: 11, fontWeight: "bold" }}>
                      <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: COLORS[index % COLORS.length] }}></span>
                      <span style={{ color: "#64748B", textTransform: "capitalize" }}>{item.name.toLowerCase()}:</span>
                      <span style={{ color: "#1E293B" }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={noDataStyle}>No payment data available</div>
            )}
          </div>
        </div>

        {/* Bookings per Doctor Bar Chart */}
        <div style={chartCardStyle}>
          <h3 style={chartTitleStyle}>Bookings per Doctor</h3>
          <div style={{ height: 260 }}>
            {stats.doctor_bookings.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.doctor_bookings} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="doctor" tick={{ fontSize: 9, fill: "#94A3B8" }} stroke="#CBD5E1" />
                  <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} stroke="#CBD5E1" />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="count" fill="#1E293B" radius={[4, 4, 0, 0]} barSize={25} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div style={noDataStyle}>No doctor data available</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
});

