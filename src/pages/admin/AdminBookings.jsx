
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Eye, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([
    {
      id: 'BK001',
      passenger: 'John Doe',
      email: 'john@example.com',
      phone: '+62 812-3456-7890',
      route: 'Jakarta → Bandung',
      date: '2024-01-20',
      time: '08:00',
      seats: ['A1', 'A2'],
      total: 150000,
      status: 'confirmed',
      bookingDate: '2024-01-15'
    },
    {
      id: 'BK002',
      passenger: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+62 812-3456-7891',
      route: 'Surabaya → Yogyakarta',
      date: '2024-01-21',
      time: '10:00',
      seats: ['B3'],
      total: 120000,
      status: 'pending',
      bookingDate: '2024-01-16'
    },
    {
      id: 'BK003',
      passenger: 'Bob Johnson',
      email: 'bob@example.com',
      phone: '+62 812-3456-7892',
      route: 'Jakarta → Semarang',
      date: '2024-01-22',
      time: '14:00',
      seats: ['C1'],
      total: 150000,
      status: 'cancelled',
      bookingDate: '2024-01-17'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const { toast } = useToast();

  const statusOptions = [
    { value: '', label: 'Semua Status' },
    { value: 'confirmed', label: 'Dikonfirmasi' },
    { value: 'pending', label: 'Menunggu' },
    { value: 'cancelled', label: 'Dibatalkan' }
  ];

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.passenger.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-green-400 bg-green-400/10';
      case 'pending': return 'text-yellow-400 bg-yellow-400/10';
      case 'cancelled': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'Dikonfirmasi';
      case 'pending': return 'Menunggu';
      case 'cancelled': return 'Dibatalkan';
      default: return status;
    }
  };

  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings(bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
    toast({
      title: "Status Diperbarui",
      description: `Status booking ${bookingId} berhasil diperbarui`,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manajemen Booking</h1>
          <p className="text-gray-400">Kelola dan pantau semua booking tiket</p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari booking berdasarkan ID, nama, atau email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value} className="bg-gray-800">
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700 border-b border-gray-600">
              <tr>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">ID Booking</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Penumpang</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Rute</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Tanggal & Waktu</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Kursi</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Total</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Status</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking, index) => (
                <motion.tr
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-700 hover:bg-gray-700/50"
                >
                  <td className="py-4 px-6">
                    <span className="text-white font-medium">{booking.id}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <h3 className="text-white font-medium">{booking.passenger}</h3>
                      <p className="text-gray-400 text-sm">{booking.email}</p>
                      <p className="text-gray-400 text-sm">{booking.phone}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-300">{booking.route}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-300">
                      <div>{new Date(booking.date).toLocaleDateString('id-ID')}</div>
                      <div className="text-sm">{booking.time}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-300">{booking.seats.join(', ')}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-white font-semibold">{formatPrice(booking.total)}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                        <span>{getStatusText(booking.status)}</span>
                      </span>
                    </div>
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
                      {booking.status === 'pending' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                          className="text-green-400 hover:text-green-300"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredBookings.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-white mb-2">Tidak ada booking ditemukan</h3>
          <p className="text-gray-400">Coba ubah filter pencarian</p>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
