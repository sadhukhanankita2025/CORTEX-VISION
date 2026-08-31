import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from './types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: string | Partial<User>, role?: string | User['role']) => void;
  logout: () => void;
  signup: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('cortex_user') || localStorage.getItem('neurovision_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null; // Require login/signup by default
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('cortex_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('cortex_user');
      localStorage.removeItem('neurovision_user');
    }
  }, [user]);

  const login = (userData: string | Partial<User>, roleArg: string | User['role'] = 'Doctor') => {
    const validRoles: User['role'][] = ['Doctor', 'Researcher', 'Student', 'Admin'];
    const assignedRole: User['role'] = validRoles.includes(roleArg as User['role']) 
      ? (roleArg as User['role']) 
      : 'Doctor';

    if (typeof userData === 'string') {
      const newUser: User = {
        id: 'usr-' + Math.floor(1000 + Math.random() * 9000),
        name: userData.split('@')[0].replace('.', ' ').toUpperCase(),
        email: userData,
        role: assignedRole,
        hospitalName: 'General Hospital AI Center'
      };
      setUser(newUser);
    } else {
      const userRole = (userData.role && validRoles.includes(userData.role)) 
        ? userData.role 
        : assignedRole;

      const newUser: User = {
        id: 'usr-' + Math.floor(1000 + Math.random() * 9000),
        name: userData.name || (userData.email ? userData.email.split('@')[0].toUpperCase() : 'Medical Practitioner'),
        email: userData.email || 'practitioner@hospital.org',
        role: userRole,
        hospitalName: userData.hospitalName || (userData as any).hospital || 'Clinical Neural Network'
      };
      setUser(newUser);
    }
  };

  const signup = (userData: Partial<User>) => {
    login(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};