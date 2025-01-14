import { apiClient } from "@/lib/api/Client";
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean | null;
  setIsAuthenticated: (status: boolean) => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: null,
  setIsAuthenticated: (status) => set({ isAuthenticated: status }),
  checkAuth: async () => {
    try {
      const response = await apiClient.auth.authenticated();
      set({ isAuthenticated: response });
    } catch (error) {
      console.log(error);
      set({ isAuthenticated: false });
    }
  },
}));
