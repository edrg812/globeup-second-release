
import axios from "axios";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

// Create axios instance with default config
const api = axios.create({
  baseURL: apiUrl, //base dir dewa aca. onno kothao ei instance use korla base dir dita hoba na
});

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

