import {
  type AxiosRequestConfig
} from 'axios';


export const API_CONFIG: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
} as const;
