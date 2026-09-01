import axios from "axios";

const baseURL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000").replace(/\/$/, "");

const apiClient = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API request failed:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default apiClient;
