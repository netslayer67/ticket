import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Truck, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    paymentMethod: 'credit-card'
  });
  
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulasi proses checkout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart and show success
      clearCart();
      
      toast({
        title: "Pesanan berhasil!",
        description: "Terima kasih atas pesanan Anda. Kami akan segera memprosesnya.",
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: "Terjadi kesalahan",
        description: "Silakan coba lagi dalam beberapa saat.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-white mb-4">Keranjang Kosong</h2>
            <p className="text-gray-400 mb-8">
              Tidak ada item untuk di-checkout
            </p>
            <Link to="/products">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                Mulai Berbelanja
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/cart" className="inline-flex items-center text-gray-400 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Keranjang
          </Link>
          <h1 className="text-3xl font-bold gradient-text">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Informasi Kontak
              </h3>
              
              <div className="space-y-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Truck className="w-5 h-5 mr-2" />
                Alamat Pengiriman
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Nama Depan"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Nama Belakang"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <input
                  type="text"
                  name="address"
                  placeholder="Alamat Lengkap"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="Kota"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Kode Pos"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <input
                  type="tel"
                  name="phone"
                  placeholder="Nomor Telepon"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Metode Pembayaran
              </h3>
              
              <div className="space-y-3">
                {[
                  { id: 'credit-card', label: 'Kartu Kredit/Debit', icon: '💳' },
                  { id: 'bank-transfer', label: 'Transfer Bank', icon: '🏦' },
                  { id: 'e-wallet', label: 'E-Wallet', icon: '📱' },
                  { id: 'cod', label: 'Bayar di Tempat (COD)', icon: '💵' }
                ].map(method => (
                  <label key={method.id} className="flex items-center p-3 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={formData.paymentMethod === method.id}
                      onChange={handleInputChange}
                      className="mr-3 text-purple-500"
                    />
                    <span className="mr-3">{method.icon}</span>
                    <span className="text-white">{method.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-effect rounded-2xl p-6 sticky top-24">
              <h3 className="text-xl font-semibold text-white mb-6">Ringkasan Pesanan</h3>
              
              {/* Order Items */}
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto scrollbar-hide">
                {cart.items.map(item => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-3">
                    <div className="w-16 h-16 flex-shrink-0">
                      <img  
                        className="w-full h-full object-cover rounded-lg"
                        alt={item.name}
                       src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white text-sm font-medium">{item.name}</h4>
                      <p className="text-gray-400 text-xs">Ukuran: {item.size}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-gray-400 text-xs">Qty: {item.quantity}</span>
                        <span className="text-white text-sm font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 border-t border-white/10 pt-4">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                
                <div className="flex justify-between text-gray-300">
                  <span>Ongkos Kirim</span>
                  <span className="text-green-400">Gratis</span>
                </div>
                
                <div className="flex justify-between text-gray-300">
                  <span>Pajak</span>
                  <span>{formatPrice(getTotalPrice() * 0.1)}</span>
                </div>
                
                <div className="border-t border-white/10 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-white">Total</span>
                    <span className="gradient-text">{formatPrice(getTotalPrice() * 1.1)}</span>
                  </div>
                </div>
              </div>
              
              {/* Place Order Button */}
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 text-lg font-semibold hover-glow"
              >
                {loading ? 'Memproses...' : 'Buat Pesanan'}
              </Button>
              
              <p className="text-xs text-gray-400 text-center mt-4">
                Dengan melanjutkan, Anda menyetujui syarat dan ketentuan kami
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;