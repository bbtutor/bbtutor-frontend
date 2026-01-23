// lib/AxiosInstance.ts
import axios from "axios";
import { useUserStore } from "@/store/useUserStore";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURL,
  withCredentials: true,
});

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        // Clear user from Zustand store
        useUserStore.getState().setUser(null);

        // Only redirect if not already on login page to prevent infinite loops
        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;
