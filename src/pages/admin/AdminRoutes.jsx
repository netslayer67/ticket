
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const AdminRoutes = () => {
  const [routes, setRoutes] = useState([
    {
      id: 'RT001',
      from: 'Jakarta',
      to: 'Bandung',
      distance: '150 km',
      duration: '3 jam',
      price: 75000,
      operator: 'Neo Express',
      status: 'active'
    },
    {
      id: 'RT002',
      from: 'Surabaya',
      to: 'Yogyakarta',
      distance: '320 km',
      duration: '6 jam',
      price: 120000,
      operator: 'Neo Premium',
      status: 'active'
    },
    {
      id: 'RT003',
      from: 'Jakarta',
      to: 'Semarang',
      distance: '450 km',
      duration: '8 jam',
      price: 150000,
      operator: 'Neo Express',
      status: 'inactive'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const { toast } = useToast();

  const filteredRoutes = routes.filter(route =>
    route.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.operator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleDeleteRoute = (id) => {
    setRoutes(routes.filter(r => r.id !== id));
    toast({
      title: "Rute Dihapus",
      description: "Rute berhasil dihapus dari sistem",
    });
  };

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'text-green-400 bg-green-400/10' 
      : 'text-red-400 bg-red-400/10';
  };

  const getStatusText = (status) => {
    return status === 'active' ? 'Aktif' : 'Tidak Aktif';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manajemen Rute</h1>
          <p className="text-gray-400">Kelola rute perjalanan bus</p>
        </div>
        <Button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Rute
        </Button>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari rute..."
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
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">ID Rute</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Rute</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Jarak & Durasi</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Harga</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Operator</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Status</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoutes.map((route, index) => (
                <motion.tr
                  key={route.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-700 hover:bg-gray-700/50"
                >
                  <td className="py-4 px-6">
                    <span className="text-white font-medium">{route.id}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <span className="text-white">{route.from} → {route.to}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-300">
                      <div className="flex items-center space-x-1">
                        <span>{route.distance}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span className="text-sm">{route.duration}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-white font-semibold">{formatPrice(route.price)}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-300">{route.operator}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(route.status)}`}>
                      {getStatusText(route.status)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteRoute(route.id)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">Tambah Rute Baru</h3>
            <p className="text-gray-400 mb-4">
              🚧 Fitur ini belum diimplementasikan—tapi jangan khawatir! Anda bisa memintanya di prompt berikutnya! 🚀
            </p>
            <Button
              onClick={() => setShowAddModal(false)}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Tutup
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRoutes;
