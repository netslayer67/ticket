
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Users, Route, Ticket } from 'lucide-react';

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const timeRanges = [
    { value: '7d', label: '7 Hari' },
    { value: '30d', label: '30 Hari' },
    { value: '90d', label: '90 Hari' },
    { value: '1y', label: '1 Tahun' }
  ];

  const analyticsData = {
    revenue: {
      current: 45750000,
      previous: 38920000,
      growth: 17.5
    },
    bookings: {
      current: 156,
      previous: 142,
      growth: 9.9
    },
    customers: {
      current: 1247,
      previous: 1089,
      growth: 14.5
    },
    avgTicketPrice: {
      current: 293269,
      previous: 274225,
      growth: 6.9
    }
  };

  const topRoutes = [
    { route: 'Jakarta → Bandung', bookings: 45, revenue: 3375000, growth: 12.5 },
    { route: 'Surabaya → Yogyakarta', bookings: 23, revenue: 2760000, growth: 8.3 },
    { route: 'Jakarta → Semarang', bookings: 38, revenue: 5700000, growth: -2.1 },
    { route: 'Bandung → Surabaya', bookings: 31, revenue: 4650000, growth: 15.7 }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatGrowth = (growth) => {
    const isPositive = growth > 0;
    return (
      <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        <span className="text-sm font-medium">{Math.abs(growth)}%</span>
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics & Laporan</h1>
          <p className="text-gray-400">Analisis performa bisnis dan tren booking</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {timeRanges.map(range => (
            <option key={range.value} value={range.value} className="bg-gray-800">
              {range.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: 'Total Revenue',
            current: formatPrice(analyticsData.revenue.current),
            previous: formatPrice(analyticsData.revenue.previous),
            growth: analyticsData.revenue.growth,
            icon: DollarSign,
            color: 'from-green-500 to-emerald-500'
          },
          {
            title: 'Total Booking',
            current: analyticsData.bookings.current.toLocaleString(),
            previous: analyticsData.bookings.previous.toLocaleString(),
            growth: analyticsData.bookings.growth,
            icon: Ticket,
            color: 'from-blue-500 to-cyan-500'
          },
          {
            title: 'Pelanggan Baru',
            current: analyticsData.customers.current.toLocaleString(),
            previous: analyticsData.customers.previous.toLocaleString(),
            growth: analyticsData.customers.growth,
            icon: Users,
            color: 'from-purple-500 to-pink-500'
          },
          {
            title: 'Rata-rata Harga Tiket',
            current: formatPrice(analyticsData.avgTicketPrice.current),
            previous: formatPrice(analyticsData.avgTicketPrice.previous),
            growth: analyticsData.avgTicketPrice.growth,
            icon: Route,
            color: 'from-orange-500 to-red-500'
          }
        ].map((metric, index) => {
          const Icon = metric.icon;
          
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                {formatGrowth(metric.growth)}
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{metric.current}</h3>
              <p className="text-gray-400 text-sm">{metric.title}</p>
              <p className="text-gray-500 text-xs mt-1">vs {metric.previous} periode lalu</p>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">Rute Terpopuler</h2>
        <div className="space-y-4">
          {topRoutes.map((route, index) => (
            <div key={route.route} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-white font-medium">{route.route}</h3>
                  <p className="text-gray-400 text-sm">{route.bookings} booking</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-semibold">{formatPrice(route.revenue)}</p>
                {formatGrowth(route.growth)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
