// store/useUserStore.ts
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axiosClient from "@/lib/AxiosClientInstance";
import axios from "axios";

// User interface - represents authenticated user data
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// UserState interface - defines the shape of our store
interface UserState {
  // State
  user: User | null; // Current authenticated user or null if not logged in
  loading: boolean; // Loading state for async operations
  error: string | null; // Error message from failed operations

  // Actions
  fetchUser: () => Promise<void>; // Fetch current user from backend
  setUser: (user: User | null) => void; // Manually set user (e.g., after login)
  clearError: () => void; // Clear error messages
}

/**
 * Helper function to extract error messages from various error types
 * @param error - The error object (unknown type)
 * @param fallback - Default message if error can't be parsed
 * @returns User-friendly error message string
 */
const getErrorMessage = (
  error: unknown,
  fallback: string = "An error occurred",
): string => {
  // Handle Axios errors with response data
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || fallback;
  }

  // Handle standard Error objects
  if (error instanceof Error) {
    return error.message;
  }

  // Fallback for unknown error types
  return fallback;
};

/**
 * User Store - Manages authentication state and user data
 * Persists user data to sessionStorage for session-based persistence
 */
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      loading: false,
      error: null,

      /**
       * Fetch current user from backend
       * Called on app initialization or after login to get user details
       */
      fetchUser: async () => {
        set({ loading: true, error: null });
        try {
          // Call Next.js API route which proxies to backend
          const response = await axiosClient.get("/getCurrentUser");

          // Update store with user data
          set({
            user: response.data.user,
            loading: false,
          });
        } catch (error) {
          console.error("Error fetching user:", error);

          // Clear user and set error state
          set({
            user: null,
            loading: false,
            error: getErrorMessage(error, "Failed to fetch user data"),
          });
        }
      },

      /**
       * Manually set user data
       * Useful after successful login/registration to immediately update the store
       * @param user - User object or null to clear
       */
      setUser: (user) => {
        set({ user, error: null });
      },

      /**
       * Clear error messages from state
       * Call this when dismissing error notifications or retrying operations
       */
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "user-storage", // Key name in sessionStorage
      storage: createJSONStorage(() => sessionStorage), // Use sessionStorage for persistence
      partialize: (state) => ({ user: state.user }) as Pick<UserState, "user">, // Only persist user data, not loading/error states
    },
  ),
);
