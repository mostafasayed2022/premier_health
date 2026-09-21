import { QueryClient, isServer } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes cache stale time
        gcTime: 15 * 60 * 1000,   // 15 minutes garbage collection retention
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 1,
      },
      mutations: {
        retry: 0,
      },
    },
  });
}

const browserQueryClients = new Map<string, QueryClient>();

export function getQueryClient(locale = "en") {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    if (!browserQueryClients.has(locale)) browserQueryClients.set(locale, makeQueryClient());
    return browserQueryClients.get(locale)!;
  }
}
