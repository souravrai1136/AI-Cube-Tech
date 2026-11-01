import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile } from '../types';
import { authService, LoginCredentials, SignUpData } from '../services/authService';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  logout: () => Promise<void>;
  switchDemoRole: (role: 'student' | 'admin') => void;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { addToast } = useToast();

  useEffect(() => {
    // Initialize user session from stored demo user
    const current = authService.getCurrentUser();
    setUser(current);
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const loggedUser = await authService.login(credentials);
      setUser(loggedUser);
      addToast(
        'success',
        `Welcome back, ${loggedUser.name}!`,
        loggedUser.role === 'admin' ? 'Signed in as Platform Administrator.' : 'Ready to continue learning.'
      );
    } catch {
      addToast('error', 'Login Failed', 'Please verify your credentials and try again.');
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (data: SignUpData) => {
    setIsLoading(true);
    try {
      const newUser = await authService.signUp(data);
      setUser(newUser);
      addToast('success', `Welcome to AI Cube Tech, ${newUser.name}!`, 'Your student account is created.');
    } catch {
      addToast('error', 'Registration Failed', 'Could not create account.');
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    addToast('info', 'Logged Out', 'You have been signed out of your demo account.');
  };

  const switchDemoRole = (role: 'student' | 'admin') => {
    const switchedUser = authService.switchDemoRole(role);
    setUser(switchedUser);
    addToast(
      'info',
      `Switched to ${role === 'admin' ? 'Admin' : 'Student'} Demo Mode`,
      `Currently exploring the platform as ${switchedUser.name}`
    );
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    const updated = await authService.updateProfile(updates);
    setUser(updated);
    addToast('success', 'Profile Updated', 'Your profile details have been saved.');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isLoading,
    login,
    signUp,
    logout,
    switchDemoRole,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
