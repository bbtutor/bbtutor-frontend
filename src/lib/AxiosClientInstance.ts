// lib/axiosClientInstance.ts
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login, etc.
      console.error("Unauthorized - redirecting to login");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
