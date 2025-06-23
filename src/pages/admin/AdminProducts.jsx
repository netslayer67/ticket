import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  Package,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { mockProducts } from '@/data/mockData';

const AdminProducts = () => {
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const { toast } = useToast();

  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
    toast({
      title: "Produk Dihapus",
      description: "Produk berhasil dihapus dari sistem",
    });
  };

  const getStockStatus = (inStock) => {
    return inStock ? 'Tersedia' : 'Habis';
  };

  const getStockColor = (inStock) => {
    return inStock ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10';
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manajemen Produk</h1>
          <p className="text-gray-400">Kelola produk dan inventori toko</p>
        </div>
        <Button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Produk
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total Produk', value: products.length, icon: Package, color: 'from-blue-500 to-cyan-500' },
          { title: 'Stok Tersedia', value: products.filter(p => p.inStock).length, icon: Package, color: 'from-green-500 to-emerald-500' },
          { title: 'Stok Habis', value: products.filter(p => !p.inStock).length, icon: AlertCircle, color: 'from-red-500 to-pink-500' },
          { title: 'Kategori', value: categories.length, icon: Filter, color: 'from-purple-500 to-pink-500' }
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
                placeholder="Cari produk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Semua Kategori</option>
            {categories.map(category => (
              <option key={category} value={category} className="bg-gray-800">
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="glass-effect rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Produk</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Kategori</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Harga</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Stok</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Rating</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/5"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{product.name}</h3>
                        <p className="text-gray-400 text-sm">ID: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-300">{product.category}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <span className="text-white font-semibold">{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <p className="text-gray-500 text-sm line-through">
                          {formatPrice(product.originalPrice)}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStockColor(product.inStock)}`}>
                      {getStockStatus(product.inStock)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-white">{product.rating}</span>
                      <span className="text-gray-400 text-sm">({product.reviews})</span>
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
                        onClick={() => handleDeleteProduct(product.id)}
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

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Tidak ada produk ditemukan</h3>
          <p className="text-gray-400">Coba ubah filter pencarian atau tambah produk baru</p>
        </div>
      )}

      {/* Add Product Modal Placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="glass-effect rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">Tambah Produk Baru</h3>
            <p className="text-gray-400 mb-4">
              🚧 Fitur ini belum diimplementasikan—tapi jangan khawatir! Anda bisa memintanya di prompt berikutnya! 🚀
            </p>
            <Button
              onClick={() => setShowAddModal(false)}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
            >
              Tutup
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;