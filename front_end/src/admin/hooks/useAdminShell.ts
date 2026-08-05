"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { schemaApi } from "../api/admin";
import type { SchemaListing } from "../api/admin";

export function useAdminShell() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [schemas, setSchemas] = useState<SchemaListing[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load sidebar schema listing
  useEffect(() => {
    if (isAuthenticated) {
      schemaApi
        .listing()
        .then((s) => setSchemas(s))
        .catch(() => {});
    }
  }, [isAuthenticated]);

  // Auth redirect — send unauthenticated users to login page
  useEffect(() => {
    if (!isLoading && !isAuthenticated && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
  }, [isLoading, isAuthenticated, pathname, router]);

  const match = pathname.match(/^\/admin\/([^/]+)/);
  const currentModel = match ? match[1] : null;
  const isFilesPage = pathname === "/admin/files";
  const isLoginPage = pathname === "/admin/login";

  return {
    isAuthenticated,
    isLoading,
    schemas,
    sidebarOpen,
    setSidebarOpen,
    currentModel,
    isFilesPage,
    isLoginPage,
    toggleSidebar: () => setSidebarOpen((prev) => !prev),
    closeSidebar: () => setSidebarOpen(false),
  };
}
