
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Route, 
  Ticket, 
  Users, 
  BarChart3, 
  Settings,
  LogOut
} from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';

const AdminSidebar = () => {
  const location = useLocation();
  const { logoutAdmin } = useAdmin();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Rute', path: '/admin/routes', icon: Route },
    { name: 'Booking', path: '/admin/bookings', icon: Ticket },
    { name: 'Pelanggan', path: '/admin/customers', icon: Users },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { name: 'Pengaturan', path: '/admin/settings', icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">ND</span>
          </div>
          <div>
            <span className="text-xl font-bold text-foreground">Neo Dervish</span>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeAdminTab"
                    className="absolute inset-0 bg-primary rounded-lg -z-10"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-border">
        <button
          onClick={logoutAdmin}
          className="w-full flex items-center space-x-3 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Keluar</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
