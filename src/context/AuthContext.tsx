import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import storage from '../utils/storage';
import apiClient from '../services/apiClient';

interface User {
  id: string;
  email: string;
  displayName?: string;
  onboardingCompleted?: boolean;
  onboardingStep?: number;
  university?: string;
  studentId?: string;
  phoneNumber?: string;
  program?: string;
  academicLevel?: string | number;
  isVerified?: boolean;
}

interface RegisterParams {
  email: string;
  password?: string;
  name: string;
  phoneNumber: string;
  institution: string;
  studentId?: string;
  course: string;
  academicLevel?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (params: RegisterParams) => Promise<void>;
  logout: () => Promise<void>;
  updateOnboarding: (data: any) => Promise<void>;
  updateUser: (user: User) => void;
  authenticate: (token: string, user: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await storage.getItemAsync('userToken');
      const storedUser = await storage.getItemAsync('userData');

      if (storedToken && storedUser) {
        setToken(storedToken);
        const userData = JSON.parse(storedUser);
        setUser(userData);
        
        // Background verify token
        verifyStoredToken(storedToken);
      }
    } catch (e) {
      console.error('Failed to load auth state:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyStoredToken = async (currentToken: string) => {
    try {
      const response = await apiClient.get('/auth/verify-token');
      if (response.data.user) {
        setUser(response.data.user);
        await storage.setItemAsync('userData', JSON.stringify(response.data.user));
      }
    } catch (error) {
      console.log('Stored token is invalid, logging out.');
      logout();
    }
  };

  const authenticate = async (newToken: string, newUser: User) => {
    try {
      await storage.setItemAsync('userToken', newToken);
      await storage.setItemAsync('userData', JSON.stringify(newUser));
      setToken(newToken);
      setUser(newUser);
    } catch (e) {
      console.error('Failed to save auth state:', e);
      throw e;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const { token: newToken, user: newUser } = response.data;
      await authenticate(newToken, newUser);
    } catch (error: any) {
      console.error('[AuthContext] Sign in error:', error);
      let message = 'Login failed';
      if (error.response) {
        // The server responded with a status code that falls out of the range of 2xx
        message = error.response.data?.error || message;
      } else if (error.request) {
        // The request was made but no response was received (e.g., network error/timeout)
        message = 'Could not reach the server. Please check your internet connection or the server status.';
      }
      throw new Error(message);
    }
  };

  const signUp = async (params: RegisterParams) => {
    try {
      const response = await apiClient.post('/auth/register', params);
      const { token: newToken, user: newUser } = response.data;
      await authenticate(newToken, newUser);
    } catch (error: any) {
      console.error('[AuthContext] Registration error:', error);
      let message = 'Registration failed';
      if (error.response) {
        // The server responded with a status code that falls out of the range of 2xx
        message = error.response.data?.error || message;
      } else if (error.request) {
        // The request was made but no response was received (e.g., network error/timeout)
        message = 'Could not reach the server. Please check your internet connection or the server status.';
      }
      throw new Error(message);
    }
  };

  const logout = async () => {
    try {
      await storage.deleteItemAsync('userToken');
      await storage.deleteItemAsync('userData');
      setToken(null);
      setUser(null);
    } catch (e) {
      console.error('Failed to clear auth state:', e);
    }
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    storage.setItemAsync('userData', JSON.stringify(updatedUser));
  };

  const updateOnboarding = async (data: any) => {
    try {
      const response = await apiClient.post('/onboarding/update', data);
      if (response.data.user) {
        setUser(response.data.user);
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to update onboarding progress');
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, signIn, signUp, logout, updateOnboarding, updateUser, authenticate }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
