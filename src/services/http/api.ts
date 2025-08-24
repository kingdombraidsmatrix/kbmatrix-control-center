import axios from 'axios';
import { useAuthStore } from '@/stores/auth/auth.store.ts';

export function useApiInstance() {
  const { isAuthenticated, authToken } = useAuthStore();

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    adapter: 'fetch',
  });

  axiosInstance.interceptors.request.use((config) => {
    if (isAuthenticated && !!authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  });

  return axiosInstance;
}
