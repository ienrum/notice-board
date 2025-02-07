import axios from "axios";

export interface BaseResponseDto<T> {
  code: number;
  message: string;
  data: T;
}

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_DOMAIN,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.defaults.withCredentials = true;
