import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();

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
            <ShoppingBag className="w-24 h-24 text-gray-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">Keranjang Kosong</h2>
            <p className="text-gray-400 mb-8">
              Belum ada produk di keranjang Anda. Yuk mulai berbelanja!
            </p>
            <Link to="/products">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 text-lg font-semibold rounded-full hover-glow">
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">Keranjang Belanja</h1>
            <p className="text-gray-400">{cart.items.length} item dalam keranjang</p>
          </div>
          
          <Button
            onClick={clearCart}
            variant="outline"
            className="border-red-500/50 text-red-400 hover:bg-red-500/10"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Kosongkan Keranjang
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item, index) => (
              <motion.div
                key={`${item.id}-${item.size}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect rounded-2xl p-6 hover-glow"
              >
                <div className="flex gap-4">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img  
                      className="w-full h-full object-cover rounded-lg"
                      alt={item.name}
                     src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                        <p className="text-gray-400 text-sm">Ukuran: {item.size}</p>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-white/20 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          className="p-2 text-gray-300 hover:text-white"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="p-2 text-gray-300 hover:text-white"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold gradient-text">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                        <div className="text-sm text-gray-400">
                          {formatPrice(item.price)} x {item.quantity}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-effect rounded-2xl p-6 sticky top-24">
              <h3 className="text-xl font-semibold text-white mb-6">Ringkasan Pesanan</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                
                <div className="flex justify-between text-gray-300">
                  <span>Ongkos Kirim</span>
                  <span className="text-green-400">Gratis</span>
                </div>
                
                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-white">Total</span>
                    <span className="gradient-text">{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Link to="/checkout" className="block">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 text-lg font-semibold hover-glow">
                    Lanjut ke Checkout
                  </Button>
                </Link>
                
                <Link to="/products">
                  <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10">
                    Lanjut Berbelanja
                  </Button>
                </Link>
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                <p className="text-sm text-gray-300 text-center">
                  🎉 Selamat! Anda mendapat gratis ongkir untuk pesanan ini
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <Link to="/products">
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali Berbelanja
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;