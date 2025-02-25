import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarState {
  isOpen: boolean;
  isDesktop: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
  setIsDesktop: (isDesktop: boolean) => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isOpen: false,
      isDesktop: false,
      setIsOpen: (isOpen) => set({ isOpen }),
      toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
      setIsDesktop: (isDesktop) =>
        set((state) => ({
          isDesktop,
          // On desktop, always show sidebar; on mobile, keep current state
          isOpen: isDesktop ? true : state.isOpen,
        })),
    }),
    {
      name: "sidebar-storage",
      partialize: (state) => ({ isOpen: state.isOpen }),
    },
  ),
);
