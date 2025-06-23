import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Edit, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const ProfilePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // Simulasi save profile
    setIsEditing(false);
    toast({
      title: "Profil diperbarui!",
      description: "Informasi profil Anda berhasil disimpan.",
    });
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      address: '',
      city: '',
      postalCode: ''
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-white mb-4">Silakan Login</h2>
            <p className="text-gray-400">Anda perlu login untuk mengakses halaman profil</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Profil Saya</h1>
          <p className="text-gray-400">Kelola informasi profil dan preferensi akun Anda</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="glass-effect rounded-2xl p-6 text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  alt="Profile picture"
                  src="https://images.unsplash.com/photo-1645402300832-ac3e97bc57b5" />
              </div>

              <h3 className="text-xl font-semibold text-white mb-1">{user.name}</h3>
              <p className="text-gray-400 mb-4">{user.email}</p>

              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center justify-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Member sejak 2024</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>Email terverifikasi</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="glass-effect rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Informasi Pribadi</h3>

                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    size="sm"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSave}
                      size="sm"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Simpan
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      size="sm"
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Batal
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nama Lengkap
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name} onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">
                        {formData.name}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">
                        {formData.email}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nomor Telepon
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Masukkan nomor telepon"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">
                        {formData.phone || 'Belum diisi'}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Kota
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Masukkan kota"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">
                        {formData.city || 'Belum diisi'}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Alamat
                  </label>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Masukkan alamat lengkap"
                      rows={3}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white min-h-[80px]">
                      {formData.address || 'Belum diisi'}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order History */}
            <div className="glass-effect rounded-2xl p-6 mt-6">
              <h3 className="text-xl font-semibold text-white mb-6">Riwayat Pesanan</h3>

              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">Belum ada riwayat pesanan</p>
                <p className="text-sm text-gray-500">
                  Pesanan Anda akan muncul di sini setelah melakukan pembelian
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;