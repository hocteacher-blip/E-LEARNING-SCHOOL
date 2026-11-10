import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types/lms';
import { StorageService } from '../services/storage';

interface AuthContextType {
  currentUser: User | null;
  users: User[];
  login: (email: string) => boolean;
  switchUser: (userId: string) => void;
  logout: () => void;
  isRole: (role: UserRole) => boolean;
  refreshUsers: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const refreshUsers = () => {
    const db = StorageService.loadDatabase();
    setUsers(db.users);
    
    // Check saved active user id
    const savedUserId = localStorage.getItem('ELEMS_ACTIVE_USER_ID');
    if (savedUserId) {
      const found = db.users.find(u => u.id === savedUserId);
      if (found) {
        setCurrentUser(found);
        return;
      }
    }

    // Default to the authentic Teacher (Thầy Nguyễn Văn Học - Hoc.teacher@gmail.com)
    const hocTeacher = db.users.find(u => u.email.toLowerCase() === 'hoc.teacher@gmail.com') ||
                       db.users.find(u => u.role === 'teacher') ||
                       db.users[0];
    if (hocTeacher) {
      setCurrentUser(hocTeacher);
      localStorage.setItem('ELEMS_ACTIVE_USER_ID', hocTeacher.id);
    }
  };

  useEffect(() => {
    refreshUsers();
  }, []);

  const login = (email: string): boolean => {
    const db = StorageService.loadDatabase();
    const found = db.users.find(
      u => u.email.toLowerCase() === email.toLowerCase() ||
           u.code.toLowerCase() === email.toLowerCase()
    );
    if (found) {
      setCurrentUser(found);
      localStorage.setItem('ELEMS_ACTIVE_USER_ID', found.id);
      return true;
    }
    return false;
  };

  const switchUser = (userId: string) => {
    const found = users.find(u => u.id === userId);
    if (found) {
      setCurrentUser(found);
      localStorage.setItem('ELEMS_ACTIVE_USER_ID', found.id);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('ELEMS_ACTIVE_USER_ID');
  };

  const isRole = (role: UserRole) => {
    return currentUser?.role === role;
  };

  return (
    <AuthContext.Provider value={{ currentUser, users, login, switchUser, logout, isRole, refreshUsers }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
