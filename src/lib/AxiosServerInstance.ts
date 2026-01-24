// lib/axiosServerInstance.ts
import axios from "axios";

const axiosServer = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASEURL}`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ ADD THIS - Critical for sending cookies cross-origin
});

// Request interceptor - add auth tokens, API keys, etc.
axiosServer.interceptors.request.use(
  async (config) => {
    // Add API key or other server-side credentials
    if (process.env.BACKEND_API_KEY) {
      config.headers["X-API-Key"] = process.env.BACKEND_API_KEY;
    }

    // Note: Don't read cookies here - they should be passed from the API route
    // The API route will handle reading request cookies and adding Authorization header
    // This keeps axiosServer clean and reusable

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
axiosServer.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Server API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default axiosServer;
