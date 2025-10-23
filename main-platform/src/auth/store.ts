import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      login: (token, user) => {
        set({ user, token });
        localStorage.setItem('auth_token', token);
        // Broadcast to all module iframes
        window.postMessage({ type: 'AUTH_UPDATE', user, token }, '*');
      },

      setAuth: (user, token) => {
        set({ user, token });
        localStorage.setItem('auth_token', token);
        // Broadcast to all module iframes
        window.postMessage({ type: 'AUTH_UPDATE', user, token }, '*');
      },
      
      logout: () => {
        set({ user: null, token: null });
        localStorage.removeItem('auth_token');
        // Broadcast logout to all module iframes
        window.postMessage({ type: 'AUTH_LOGOUT' }, '*');
      },
      
      isAuthenticated: () => !!get().token,
    }),
    {
      name: 'auth-storage',
    }
  )
);
