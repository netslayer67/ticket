
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminSidebar from '@/components/admin/layout/AdminSidebar';
import AdminNavbar from '@/components/admin/layout/AdminNavbar';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminRoutes from '@/pages/admin/AdminRoutes';
import AdminBookings from '@/pages/admin/AdminBookings';
import AdminCustomers from '@/pages/admin/AdminCustomers';
import AdminAnalytics from '@/pages/admin/AdminAnalytics';
import AdminSettings from '@/pages/admin/AdminSettings';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-background text-foreground">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-secondary/40 p-6">
          <Routes>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="routes" element={<AdminRoutes />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="settings" element={<AdminSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
