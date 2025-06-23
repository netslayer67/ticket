
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/contexts/AdminContext';
import { useSocket } from '@/contexts/SocketContext';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const AdminNavbar = () => {
  const { admin } = useAdmin();
  const { notifications, markNotificationAsRead, clearNotifications } = useSocket();
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Cari..."
              className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative text-muted-foreground hover:text-foreground"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-50"
                >
                  <div className="p-4 border-b border-border flex justify-between items-center">
                    <h3 className="text-foreground font-semibold">Notifikasi</h3>
                    {notifications.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearNotifications}
                        className="text-muted-foreground hover:text-foreground text-xs"
                      >
                        Hapus Semua
                      </Button>
                    )}
                  </div>
                  
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-muted-foreground">
                        Tidak ada notifikasi
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-border hover:bg-accent cursor-pointer ${
                            !notification.read ? 'bg-accent/50' : ''
                          }`}
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          <p className="text-foreground text-sm">{notification.message}</p>
                          <p className="text-muted-foreground text-xs mt-1">
                            {new Date(notification.timestamp).toLocaleTimeString('id-ID')}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-foreground text-sm font-medium">{admin?.name}</p>
              <p className="text-muted-foreground text-xs">{admin?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
