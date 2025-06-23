
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, Mail, Phone, Eye, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminCustomers = () => {
  const [customers] = useState([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+62 812-3456-7890',
      totalBookings: 5,
      totalSpent: 750000,
      lastBooking: '2024-01-20',
      status: 'active'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+62 812-3456-7891',
      totalBookings: 3,
      totalSpent: 360000,
      lastBooking: '2024-01-18',
      status: 'active'
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      phone: '+62 812-3456-7892',
      totalBookings: 8,
      totalSpent: 1200000,
      lastBooking: '2024-01-19',
      status: 'vip'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10';
      case 'vip': return 'text-purple-400 bg-purple-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Aktif';
      case 'vip': return 'VIP';
      default: return status;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manajemen Pelanggan</h1>
          <p className="text-gray-400">Kelola data dan informasi pelanggan</p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari pelanggan berdasarkan nama, email, atau telepon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700 border-b border-gray-600">
              <tr>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Pelanggan</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Kontak</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Total Booking</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Total Belanja</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Status</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Booking Terakhir</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer, index) => (
                <motion.tr
                  key={customer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-700 hover:bg-gray-700/50"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{customer.name}</h3>
                        <p className="text-gray-400 text-sm">ID: {customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300 text-sm">{customer.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300 text-sm">{customer.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-center">
                      <span className="text-white font-semibold text-lg">{customer.totalBookings}</span>
                      <p className="text-gray-400 text-xs">booking</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-white font-semibold">{formatPrice(customer.totalSpent)}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                      {getStatusText(customer.status)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-300 text-sm">
                      {new Date(customer.lastBooking).toLocaleDateString('id-ID')}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomers;
