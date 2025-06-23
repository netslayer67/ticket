
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Users,
  Route,
  Ticket,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { useSocket } from '@/contexts/SocketContext';

const AdminDashboard = () => {
  const { isConnected } = useSocket();
  const [stats] = useState({
    totalRevenue: 45750000,
    totalBookings: 156,
    totalRoutes: 12,
    totalCustomers: 1247,
    revenueGrowth: 12.5,
    bookingsGrowth: 8.3,
    routesGrowth: -2.1,
    customersGrowth: 15.7
  });

  const [recentBookings] = useState([
    { id: 'BK001', passenger: 'John Doe', route: 'Jakarta → Bandung', amount: 75000, status: 'confirmed' },
    { id: 'BK002', passenger: 'Jane Smith', route: 'Surabaya → Yogyakarta', amount: 120000, status: 'pending' },
    { id: 'BK003', passenger: 'Bob Johnson', route: 'Jakarta → Semarang', amount: 150000, status: 'confirmed' },
  ]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-green-400 bg-green-400/10';
      case 'pending': return 'text-yellow-400 bg-yellow-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <p className="text-gray-400">Selamat datang di panel admin Neo Dervish</p>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
            <span className="text-sm text-gray-400">
              {isConnected ? 'Terhubung' : 'Terputus'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: 'Total Revenue',
            value: formatPrice(stats.totalRevenue),
            growth: stats.revenueGrowth,
            icon: DollarSign,
            color: 'from-green-500 to-emerald-500'
          },
          {
            title: 'Total Booking',
            value: stats.totalBookings.toLocaleString(),
            growth: stats.bookingsGrowth,
            icon: Ticket,
            color: 'from-blue-500 to-cyan-500'
          },
          {
            title: 'Total Rute',
            value: stats.totalRoutes.toLocaleString(),
            growth: stats.routesGrowth,
            icon: Route,
            color: 'from-purple-500 to-pink-500'
          },
          {
            title: 'Total Pelanggan',
            value: stats.totalCustomers.toLocaleString(),
            growth: stats.customersGrowth,
            icon: Users,
            color: 'from-orange-500 to-red-500'
          }
        ].map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.growth > 0;

          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  <span className="text-sm font-medium">{Math.abs(stat.growth)}%</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-400 text-sm">{stat.title}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">Booking Terbaru</h2>
        <div className="space-y-4">
          {recentBookings.map((booking) => (
            <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-1">
                  <span className="text-white font-medium">{booking.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status === 'confirmed' ? 'Dikonfirmasi' : 'Menunggu'}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">{booking.passenger}</p>
                <p className="text-gray-400 text-sm">{booking.route}</p>
              </div>
              <div className="text-right">
                <p className="text-white font-semibold">{formatPrice(booking.amount)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
