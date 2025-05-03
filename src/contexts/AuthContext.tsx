
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate(); // This is causing the error
  
  // Check if user is already authenticated on mount
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  
  // Login function
  const login = async (email: string, password: string) => {
    // For demo purposes, accept any credentials
    localStorage.setItem('auth_token', 'demo_token');
    localStorage.setItem('user_email', email);
    setIsAuthenticated(true);
  };
  
  // Signup function
  const signup = async (userData: any) => {
    // For demo purposes, accept any registration
    localStorage.setItem('auth_token', 'demo_token');
    localStorage.setItem('user_email', userData.email);
    setIsAuthenticated(true);
  };
  
  // Logout function
  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_email');
    setIsAuthenticated(false);
    navigate('/login');
  };
  
  const value = {
    isAuthenticated,
    login,
    signup,
    logout,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
