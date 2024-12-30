import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_DOMAIN,
  headers: {
    "Content-Type": "application/json",
  },
});
