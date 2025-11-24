import { useUIStore } from "@/stores/useUIStore";

export const useToast = () => {
  const addToast = useUIStore((state) => state.addToast);

  const toast = {
    success: (message) => {
      addToast({ type: "success", message });
    },
    error: (message) => {
      addToast({ type: "error", message });
    },
    warning: (message) => {
      addToast({ type: "warning", message });
    },
    info: (message) => {
      addToast({ type: "info", message });
    },
  };

  return toast;
};
