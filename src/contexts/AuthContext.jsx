import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const savedUser = localStorage.getItem('neo-dervish-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulasi login - dalam implementasi nyata akan menggunakan API
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: email,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      };
      
      setUser(mockUser);
      localStorage.setItem('neo-dervish-user', JSON.stringify(mockUser));
      
      toast({
        title: "Login berhasil!",
        description: `Selamat datang kembali, ${mockUser.name}!`,
      });
      
      return { success: true };
    } catch (error) {
      toast({
        title: "Login gagal",
        description: "Email atau password salah",
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const register = async (name, email, password) => {
    try {
      // Simulasi register - dalam implementasi nyata akan menggunakan API
      const mockUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      };
      
      setUser(mockUser);
      localStorage.setItem('neo-dervish-user', JSON.stringify(mockUser));
      
      toast({
        title: "Registrasi berhasil!",
        description: `Selamat datang, ${mockUser.name}!`,
      });
      
      return { success: true };
    } catch (error) {
      toast({
        title: "Registrasi gagal",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('neo-dervish-user');
    toast({
      title: "Logout berhasil",
      description: "Sampai jumpa lagi!",
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout
    }}>
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