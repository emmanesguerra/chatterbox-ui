import axios from "axios";

const ApiService = axios.create({
  baseURL: import.meta.env.VITE_API_DOMAIN || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

ApiService.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default ApiService;