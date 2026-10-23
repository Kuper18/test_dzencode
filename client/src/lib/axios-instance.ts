import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from 'axios';

import {
  getAccessToken,
  getRefreshToken,
  setAuthTokens,
  removeAuthTokens,
} from './auth-cookies';
import router from '../routes/router';
import CLIENT_ROUTES from '../constants/client-routes';
import QUERY_KEYS from '../constants/query-keys';
import queryClient from './react-query';
import type { AuthResponse } from '../types';

export const API_CONFIG: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
} as const;

const axiosInstance = axios.create(API_CONFIG);

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken();
    console.log('current token', accessToken?.slice(-10));

    if (accessToken) {
      config.headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use((response) => response, handleError);

async function handleError(error: AxiosError) {
  const originalRequest = error.config as InternalAxiosRequestConfig & {
    _retried?: boolean;
  };

  if (error.response?.status === 401 && !originalRequest._retried) {
    originalRequest._retried = true;

    if (isRefreshing && refreshPromise) {
      try {
        await refreshPromise;
        return axiosInstance(originalRequest);
      } catch {
        return Promise.reject(error);
      }
    }

    isRefreshing = true;

    refreshPromise = (async () => {
      try {
        const refreshToken = getRefreshToken();

        if (!refreshToken) {
          throw new Error('Refresh token is missing');
        }
        const response = await axios.post<Omit<AuthResponse, 'refresh'>>(
          '/users/token-refresh/',
          { refresh: refreshToken },
          API_CONFIG
        );
        const { access } = response.data;
        console.log('old access token', getAccessToken()?.slice(-10));
        console.log('new access token', access.slice(-10));

        setAuthTokens(access);
      } catch (refreshError) {
        removeAuthTokens();
        queryClient.setQueryData([QUERY_KEYS.userProfile], null);
        await router.navigate(CLIENT_ROUTES.login);

        throw refreshError;
      } finally {
        isRefreshing = false;
        refreshPromise = null;
      }
    })();

    try {
      await refreshPromise;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  }

  return Promise.reject(error);
}

export default axiosInstance;
