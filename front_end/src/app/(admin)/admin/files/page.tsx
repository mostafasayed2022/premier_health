// app/(admin)/admin/files/page.tsx
// Admin Files page
import { FilesPage } from "@/admin/components/files/FilesPage";

export const metadata = {
  title: "Files | PremierCare Admin",
};

export default function AdminFilesPage() {
  return <FilesPage />;
}
