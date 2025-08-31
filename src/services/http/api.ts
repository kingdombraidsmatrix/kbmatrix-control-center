import axios from 'axios';
import type {AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { LoginResponse } from '@/types/auth.types.ts';
import { useAuthStore } from '@/stores/auth/auth.store.ts';

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

// Utility: subscribe to refresh token completion
function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

// Utility: notify all subscribers once refresh is done
function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

export function useApiInstance() {
  const { isAuthenticated, authToken, refreshToken, setToken, clearToken } = useAuthStore();

  const baseURL = import.meta.env.VITE_APP_API_URL;
  const axiosInstance = axios.create({
    baseURL,
    adapter: 'fetch',
  });

  axiosInstance.interceptors.request.use((config) => {
    if (isAuthenticated && !!authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      if (error.response?.status === 412 && !originalRequest._retry) {
        if (isRefreshing) {
          // Queue the request until token refresh completes
          return new Promise((resolve) => {
            subscribeTokenRefresh((token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axiosInstance(originalRequest));
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          if (!refreshToken) throw new Error('Refresh token is missing');

          const { data } = await axios.post<string, AxiosResponse<LoginResponse>>(
            `${baseURL}/api/v1/auth/refresh`,
            refreshToken,
          );

          setToken({
            authToken: data.token,
            refreshToken: data.refreshToken,
          });

          isRefreshing = false;
          onRefreshed(data.token);

          originalRequest.headers.Authorization = `Bearer ${data.token}`;
          return axiosInstance(originalRequest);
        } catch (err) {
          isRefreshing = false;
          refreshSubscribers = []; // clear queue
          clearToken();
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    },
  );

  return axiosInstance;
}
