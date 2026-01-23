// store/useUserStore.ts
import { create } from "zustand";
import api from "@/lib/AxiosInstance";
import axios from "axios";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UserState {
  // State
  user: User | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchUser: () => Promise<void>;
  setUser: (user: User | null) => void;
  //   logout: () => Promise<void>;
  clearError: () => void;
}

// ✅ Helper function to extract error messages
const getErrorMessage = (
  error: unknown,
  fallback: string = "An error occurred",
): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || fallback;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};

export const useUserStore = create<UserState>((set) => ({
  // Initial state
  user: null,
  loading: false,
  error: null,

  // Fetch user from backend
  fetchUser: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get("/auth/current-user");
      set({
        user: response.data.user,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      set({
        user: null,
        loading: false,
        error: getErrorMessage(error, "Failed to fetch user data"),
      });
    }
  },

  // Manually set user (useful after login)
  setUser: (user) => {
    set({ user, error: null });
  },

  // Logout user
  //   logout: async () => {
  //     set({ loading: true });
  //     try {
  //       await api.post("/auth/current-user");
  //     } catch (error) {
  //       console.error("Logout error:", error);
  //     } finally {
  //       set({ user: null, loading: false, error: null });
  //     }
  //   },

  // Clear any errors
  clearError: () => {
    set({ error: null });
  },
}));
