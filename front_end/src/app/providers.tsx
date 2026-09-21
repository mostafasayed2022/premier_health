// src/app/providers.tsx
"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "./get-query-client";

export function Providers({ children, locale = "admin" }: { children: React.ReactNode; locale?: string }) {
  const queryClient = getQueryClient(locale);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
