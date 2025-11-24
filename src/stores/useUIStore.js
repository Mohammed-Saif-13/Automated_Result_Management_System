import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUIStore = create(
  persist(
    (set) => ({
      sidebarOpen: false,
      theme: "light",
      loading: false,
      toasts: [],

      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      setSidebarOpen: (isOpen) => set({ sidebarOpen: isOpen }),

      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === "light" ? "dark" : "light";
          if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
          return { theme: newTheme };
        }),

      setTheme: (theme) => {
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        set({ theme });
      },

      setLoading: (loading) => set({ loading }),

      addToast: (toast) =>
        set((state) => ({
          toasts: [...state.toasts, { id: Date.now(), ...toast }],
        })),

      removeToast: (id) =>
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id),
        })),
    }),
    {
      name: "ui-storage",
      partialPersist: (state) => ({
        theme: state.theme,
      }),
    }
  )
);
