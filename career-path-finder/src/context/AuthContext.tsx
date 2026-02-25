
import { createContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { User, AuthTokens } from '../types';
import apiService from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: any) => Promise<void>;
  register: (userInfo: any) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = useCallback(() => {
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      if (token) {
        // In a real app, you'd verify the token with the backend.
        // For this mock, we'll just assume it's valid and create a mock user.
        setUser({ id: 1, username: 'mockuser', email: 'user@example.com' });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to check auth status", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = async (credentials: any) => {
    const tokens: AuthTokens = await apiService.login(credentials);
    localStorage.setItem('accessToken', tokens.access);
    localStorage.setItem('refreshToken', tokens.refresh);
    checkAuthStatus();
  };
  
  const register = async (userInfo: any) => {
    await apiService.register(userInfo);
    // Optionally log the user in automatically after registration
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };
  
  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-slate-900">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
