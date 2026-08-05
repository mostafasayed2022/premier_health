import { create } from "zustand";

interface DashboardState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
