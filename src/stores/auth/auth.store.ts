import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

interface AuthState {
  isAuthenticated: boolean;
  user?: User;
  authToken?: string;
  refreshToken?: string;
}

interface AuthActions {
  setUser: (user: User) => void;
  setToken: (token: { authToken: string; refreshToken?: string }) => void;
  clearToken: () => void;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      ...initialState,
      setUser: (user) => set({ user }),
      setToken: (token) =>
        set({
          isAuthenticated: true,
          authToken: token.authToken,
          refreshToken: token.refreshToken,
        }),
      clearToken: () =>
        set({
          authToken: undefined,
          refreshToken: undefined,
          user: undefined,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'auth',
    },
  ),
);
