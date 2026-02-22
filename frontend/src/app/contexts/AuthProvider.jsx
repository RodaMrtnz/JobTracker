'use client'

import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, useEffect } from 'react'
import authService from '../services/authService';

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext) 


export default function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const router = useRouter()

  const syncAuthFromStorage = () => {
    try {
      const userStorage = localStorage.getItem("user");
      const isAuthStorage = localStorage.getItem("isAuthenticated");
      const tokenStorage = localStorage.getItem("token");

      if (!tokenStorage || isAuthStorage !== 'true' || !userStorage) {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("token");
        return;
      }

      const parsedUser = JSON.parse(userStorage);
      setUser(parsedUser);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("token");
    }
  }

  useEffect(() => {
    syncAuthFromStorage();
    setLoading(false);
  }, []);

  useEffect(() => {
    const handleStorageSync = () => {
      syncAuthFromStorage();
    };

    window.addEventListener("storage", handleStorageSync);
    window.addEventListener("focus", handleStorageSync);
    document.addEventListener("visibilitychange", handleStorageSync);

    return () => {
      window.removeEventListener("storage", handleStorageSync);
      window.removeEventListener("focus", handleStorageSync);
      document.removeEventListener("visibilitychange", handleStorageSync);
    };
  }, []);

  const login = async(userData) => {
    setLoading(true);
    
    try {
      const result = await authService.login(userData.email, userData.password);
      
      if (result.success) {
        setUser(result.user)
        setIsAuthenticated(true)
        localStorage.setItem("user", JSON.stringify(result.user))
        localStorage.setItem("isAuthenticated", "true")
        localStorage.setItem("token", result.user.token)
        router.push("/")
      }
      return result;

    } catch (error) {
      return { success: false, error: "Connection error" }
    } finally {
      setLoading(false);
    }
  }

  const register = async(userData) => {
    setLoading(true);
    
    try {
      const result = await authService.register(userData);
      
      if (result.success) {
        router.push("/login")
      }
      
      return result;
    } catch (error) {
      return { success: false, error: "Could not create account" }
    } finally {
      setLoading(false);
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("token")
    router.push("/login")
  }

  const updateProfile = async (updateData) => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return { success: false, error: "Invalid session" };
      }

      const result = await authService.updateProfile(updateData, token);

      if (result.success) {
        setUser(result.user);
        localStorage.setItem("user", JSON.stringify(result.user));
      }

      return result;
    } catch (error) {
      return { success: false, error: "Could not update profile" };
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{user, loading, login, register, logout, updateProfile, isAuthenticated}}>
        {children}
    </AuthContext.Provider>
  )
}