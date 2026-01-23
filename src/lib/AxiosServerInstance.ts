// lib/axiosServerInstance.ts
import axios from "axios";
import { cookies } from "next/headers";

const axiosServer = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASEURL}`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - add auth tokens, API keys, etc.
axiosServer.interceptors.request.use(
  async (config) => {
    // Add API key or other server-side credentials
    if (process.env.BACKEND_API_KEY) {
      config.headers["X-API-Key"] = process.env.BACKEND_API_KEY;
    }

    // Get user auth token from cookies (for user-specific requests)
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

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
