// app/(admin)/admin/layout.tsx
// Admin shell layout: AuthProvider + Sidebar + main content area.
// This is a Server Component wrapper; the inner shell is a Client Component.
import type { ReactNode } from "react";
import { AdminShell } from "@/admin/components/shell/AdminShell";

export const metadata = {
  title: "PremierCare Admin",
  description: "PremierCare Luxury Concierge Management Console",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
