// app/(admin)/admin/page.tsx
// Admin Dashboard page
import { DashboardClientWrapper } from "@/admin/components/dashboard/DashboardClientWrapper";

export const metadata = {
  title: "Dashboard | PremierCare Admin",
};

export default function AdminDashboardPage() {
  return <DashboardClientWrapper />;
}
