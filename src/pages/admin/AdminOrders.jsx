import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Eye, 
  Package, 
  Truck, 
  CheckCircle,
  Clock,
  AlertCircle,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const AdminOrders = () => {
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      customer: 'John Doe',
      email: 'john@example.com',
      items: 3,
      total: 1247000,
      status: 'completed',
      date: '2024-01-15',
      address: 'Jl. Sudirman No. 123, Jakarta'
    },
    {
      id: 'ORD-002',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      items: 1,
      total: 549000,
      status: 'processing',
      date: '2024-01-14',
      address: 'Jl. Thamrin No. 456, Jakarta'
    },
    {
      id: 'ORD-003',
      customer: 'Bob Johnson',
      email: 'bob@example.com',
      items: 2,
      total: 899000,
      status: 'pending',
      date: '2024-01-14',
      address: 'Jl. Gatot Subroto No. 789, Jakarta'
    },
    {
      id: 'ORD-004',
      customer: 'Alice Brown',
      email: 'alice@example.com',
      items: 4,
      total: 1679000,
      status: 'shipped',
      date: '2024-01-13',
      address: 'Jl. Kuningan No. 321, Jakarta'
    },
    {
      id: 'ORD-005',
      customer: 'Charlie Wilson',
      email: 'charlie@example.com',
      items: 1,
      total: 299000,
      status: 'cancelled',
      date: '2024-01-13',
      address: 'Jl. Senayan No. 654, Jakarta'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const { toast } = useToast();

  const statusOptions = [
    { value: '', label: 'Semua Status' },
    { value: 'pending', label: 'Menunggu' },
    { value: 'processing', label: 'Diproses' },
    { value: 'shipped', label: 'Dikirim' },
    { value: 'completed', label: 'Selesai' },
    { value: 'cancelled', label: 'Dibatalkan' }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
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
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'processing': return <Package className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-orange-400 bg-orange-400/10';
      case 'processing': return 'text-blue-400 bg-blue-400/10';
      case 'shipped': return 'text-purple-400 bg-purple-400/10';
      case 'completed': return 'text-green-400 bg-green-400/10';
      case 'cancelled': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Menunggu';
      case 'processing': return 'Diproses';
      case 'shipped': return 'Dikirim';
      case 'completed': return 'Selesai';
      case 'cancelled': return 'Dibatalkan';
      default: return status;
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast({
      title: "Status Diperbarui",
      description: `Status pesanan ${orderId} berhasil diperbarui`,
    });
  };

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    completed: orders.filter(o => o.status === 'completed').length,
    revenue: orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.total, 0)
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manajemen Pesanan</h1>
          <p className="text-gray-400">Kelola dan pantau semua pesanan pelanggan</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        {[
          { title: 'Total Pesanan', value: orderStats.total, icon: Package, color: 'from-blue-500 to-cyan-500' },
          { title: 'Menunggu', value: orderStats.pending, icon: Clock, color: 'from-orange-500 to-red-500' },
          { title: 'Diproses', value: orderStats.processing, icon: Package, color: 'from-blue-500 to-purple-500' },
          { title: 'Selesai', value: orderStats.completed, icon: CheckCircle, color: 'from-green-500 to-emerald-500' },
          { title: 'Revenue', value: formatPrice(orderStats.revenue), icon: CheckCircle, color: 'from-purple-500 to-pink-500' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-effect rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-400 text-sm">{stat.title}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="glass-effect rounded-2xl p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari pesanan, pelanggan, atau email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value} className="bg-gray-800">
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="glass-effect rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">ID Pesanan</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Pelanggan</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Items</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Total</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Status</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Tanggal</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/5"
                >
                  <td className="py-4 px-6">
                    <span className="text-white font-medium">{order.id}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <h3 className="text-white font-medium">{order.customer}</h3>
                      <p className="text-gray-400 text-sm">{order.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-300">{order.items} item</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-white font-semibold">{formatPrice(order.total)}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span>{getStatusText(order.status)}</span>
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-300">{new Date(order.date).toLocaleDateString('id-ID')}</span>
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
                      {order.status === 'pending' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, 'processing')}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <Package className="w-4 h-4" />
                        </Button>
                      )}
                      {order.status === 'processing' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, 'shipped')}
                          className="text-purple-400 hover:text-purple-300"
                        >
                          <Truck className="w-4 h-4" />
                        </Button>
                      )}
                      {order.status === 'shipped' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, 'completed')}
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

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Tidak ada pesanan ditemukan</h3>
          <p className="text-gray-400">Coba ubah filter pencarian</p>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;