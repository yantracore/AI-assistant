import { create } from 'zustand';

interface UIState {
  sidebarCollapsed: boolean;
  mobileDrawerOpen: boolean;
  isMobile: boolean;
  
  // Actions
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  setMobileDrawerOpen: (open: boolean) => void;
  toggleMobileDrawer: () => void;
  setIsMobile: (mobile: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  mobileDrawerOpen: false,
  isMobile: false,

  setSidebarCollapsed: (collapsed) =>
    set({ sidebarCollapsed: collapsed }),

  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  setMobileDrawerOpen: (open) =>
    set({ mobileDrawerOpen: open }),

  toggleMobileDrawer: () =>
    set((state) => ({ mobileDrawerOpen: !state.mobileDrawerOpen })),

  setIsMobile: (mobile) =>
    set({ isMobile: mobile }),
}));