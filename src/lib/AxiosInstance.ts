import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASEURL}`,
  withCredentials: true,
});

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      if (typeof window !== "undefined") {
        // Clear user data from localStorage
        localStorage.removeItem("user");

        // Redirect to login
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
