import { create } from "zustand";

type SidebarState = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

export type UseAuthType = {
  email: {
    digest: string;
    identifier: string;
  };
  setEmail: (email: { digest: string; identifier: string }) => void;
  error: string;
  setError: (error: string) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
};

export const useAuth = create<UseAuthType>((set) => ({
  email: {
    digest: "",
    identifier: "",
  },
  setEmail: (email: { digest: string; identifier: string }) =>
    set((state) => ({ ...state, email })),
  error: "",
  setError: (error: string) => set((state) => ({ ...state, error })),
  loading: false,
  setLoading: (loading: boolean) => set((state) => ({ ...state, loading })),
}));

import { useSyncExternalStore } from "react";

export function useScreen() {
  const isMobile = useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      callback();
      window.addEventListener("resize", callback);
      return () => window.removeEventListener("resize", callback);
    },
    () => {
      if (typeof window === "undefined") return true;
      return window.innerWidth <= 1560;
    },
    () => true,
  );
  return { isMobile };
}

export const useSidebar = create<SidebarState>((set) => ({
  isOpen: false,
  setOpen: (open: boolean) => set({ isOpen: open }),
}));
