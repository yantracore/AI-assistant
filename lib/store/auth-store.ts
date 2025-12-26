// lib/store/auth-store.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, LoginRequest, SignupRequest } from '@/types/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

interface AuthState {
  user: User | null;
  updateUser: (partial: Partial<User>) => void;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (data: LoginRequest) => Promise<{ success: boolean; user?: User; message?: string }>;
  signup: (data: SignupRequest) => Promise<{ success: boolean; user?: User; message?: string }>;
  logout: () => void;
  setLoading: (loading: boolean) => void;

  isAdmin: () => boolean;
  isClient: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials) => {
        try {
          set({ isLoading: true });

          const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          });

          const data = await res.json();

          if (!res.ok) {
            return { success: false, message: data.message || 'Login failed' };
          }

          set({
            user: data.data.user,
            token: data.token || null,
            isAuthenticated: true,
            isLoading: false,
          });

          return { success: true, user: data.data.user };
        } catch {
          set({ isLoading: false });
          return { success: false, message: 'Network error' };
        }
      },

      signup: async (payload) => {
        try {
          set({ isLoading: true });

          const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });

          const data = await res.json();

          if (!res.ok) {
            return { success: false, message: data.message || 'Signup failed' };
          }

          set({ isLoading: false });
          return { success: true, user: data.data.user };
        } catch {
          set({ isLoading: false });
          return { success: false, message: 'Network error' };
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },

      setLoading: (isLoading) => set({ isLoading }),

      updateUser: (partial: Partial<User>) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...partial } : state.user,
        })),
      
      isAdmin: () => get().user?.role === 'admin',
      isClient: () => get().user?.role === 'client',
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);


