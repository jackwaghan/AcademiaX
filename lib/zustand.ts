import { Sidebar } from "@/Types/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSidebar = create<Sidebar>()(
  persist(
    (set) => ({
      isOpen: true,
      toggle: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    { name: "sidebar" }
  )
);
