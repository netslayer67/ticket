
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const mockSocket = {
      connected: true,
      emit: (event, data) => {
        console.log('Socket emit:', event, data);
      },
      on: (event, callback) => {
        console.log('Socket listening for:', event);
      },
      off: (event, callback) => {
        console.log('Socket removing listener for:', event);
      },
      disconnect: () => {
        setIsConnected(false);
        console.log('Socket disconnected');
      }
    };

    setSocket(mockSocket);
    setIsConnected(true);

    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const mockNotifications = [
          { type: 'booking', message: 'Booking baru dari Jakarta ke Bandung', timestamp: new Date() },
          { type: 'payment', message: 'Pembayaran berhasil dikonfirmasi', timestamp: new Date() },
          { type: 'schedule', message: 'Jadwal bus telah diperbarui', timestamp: new Date() }
        ];
        
        const randomNotification = mockNotifications[Math.floor(Math.random() * mockNotifications.length)];
        addNotification(randomNotification);
      }
    }, 30000);

    return () => {
      clearInterval(interval);
      if (mockSocket) {
        mockSocket.disconnect();
      }
    };
  }, []);

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification
    };
    
    setNotifications(prev => [newNotification, ...prev.slice(0, 9)]);
    
    toast({
      title: "Notifikasi Baru",
      description: notification.message,
    });
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <SocketContext.Provider value={{
      socket,
      isConnected,
      notifications,
      addNotification,
      markNotificationAsRead,
      clearNotifications
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
