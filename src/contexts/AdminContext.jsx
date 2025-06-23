
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const savedAdmin = localStorage.getItem('neo-dervish-admin');
    if (savedAdmin) {
      setAdmin(JSON.parse(savedAdmin));
    }
    setLoading(false);
  }, []);

  const loginAdmin = async (email, password) => {
    try {
      if (email === 'admin@neodervish.com' && password === 'admin123') {
        const mockAdmin = {
          id: 'admin-1',
          name: 'Admin Neo Dervish',
          email: email,
          role: 'super_admin',
          permissions: ['all']
        };
        
        setAdmin(mockAdmin);
        localStorage.setItem('neo-dervish-admin', JSON.stringify(mockAdmin));
        
        toast({
          title: "Login Admin Berhasil!",
          description: `Selamat datang, ${mockAdmin.name}!`,
        });
        
        return { success: true };
      } else {
        throw new Error('Email atau password salah');
      }
    } catch (error) {
      toast({
        title: "Login Admin Gagal",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const logoutAdmin = () => {
    setAdmin(null);
    localStorage.removeItem('neo-dervish-admin');
    toast({
      title: "Logout Berhasil",
      description: "Sampai jumpa lagi!",
    });
  };

  return (
    <AdminContext.Provider value={{
      admin,
      loading,
      loginAdmin,
      logoutAdmin
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
