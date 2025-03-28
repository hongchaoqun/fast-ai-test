import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  userId: number | null;
  accessToken: string | null;
  refreshToken: string | null;
  expiresTime: string | null;
  isAuthenticated: boolean;
  login: (data: {
    userId: number;
    accessToken: string;
    refreshToken: string;
    expiresTime: string;
  }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userId: null,
      accessToken: null,
      refreshToken: null,
      expiresTime: null,
      isAuthenticated: false,
      login: (data) => {
        set({
          userId: data.userId,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          expiresTime: data.expiresTime,
          isAuthenticated: true,
        });
      },
      logout: () => {
        set({
          userId: null,
          accessToken: null,
          refreshToken: null,
          expiresTime: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'auth-storage', // 本地存储的key
    }
  )
);