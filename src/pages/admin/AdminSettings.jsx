
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Bell, Shield, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAdmin } from '@/contexts/AdminContext';

const AdminSettings = () => {
  const { admin } = useAdmin();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');

  const [profileData, setProfileData] = useState({
    name: admin?.name || '',
    email: admin?.email || '',
    phone: ''
  });

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'notifications', label: 'Notifikasi', icon: Bell },
    { id: 'security', label: 'Keamanan', icon: Shield },
    { id: 'system', label: 'Sistem', icon: Settings }
  ];

  const handleProfileSave = () => {
    toast({
      title: "Profil Diperbarui",
      description: "Informasi profil berhasil disimpan",
    });
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-6 mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-red-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-2xl">
            {admin?.name?.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{admin?.name}</h3>
          <p className="text-gray-400">{admin?.role}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Nama Lengkap</label>
          <input
            type="text"
            value={profileData.name}
            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Nomor Telepon</label>
          <input
            type="tel"
            value={profileData.phone}
            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="+62 812-3456-7890"
          />
        </div>
      </div>

      <Button onClick={handleProfileSave} className="bg-blue-600 hover:bg-blue-700">
        <Save className="w-4 h-4 mr-2" />
        Simpan Perubahan
      </Button>
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Pengaturan</h1>
        <p className="text-gray-400">Kelola pengaturan akun dan konfigurasi sistem</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-lg p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-600 to-red-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-gray-800 rounded-lg p-6">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'profile' && renderProfileTab()}
              {activeTab !== 'profile' && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold text-white mb-2">Fitur Dalam Pengembangan</h3>
                  <p className="text-gray-400">
                    🚧 Fitur ini belum diimplementasikan—tapi jangan khawatir! Anda bisa memintanya di prompt berikutnya! 🚀
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
