import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  Minus, 
  Plus, 
  Truck, 
  Shield, 
  RotateCcw,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { mockProducts } from '@/data/mockData';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const foundProduct = mockProducts.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedSize(foundProduct.sizes[0]);
      setSelectedColor(foundProduct.colors[0]);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Pilih ukuran",
        description: "Silakan pilih ukuran terlebih dahulu",
        variant: "destructive"
      });
      return;
    }
    
    addToCart(product, selectedSize, quantity);
  };

  const handleWishlist = () => {
    toast({
      title: "🚧 Fitur ini belum diimplementasikan—tapi jangan khawatir! Anda bisa memintanya di prompt berikutnya! 🚀"
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Produk tidak ditemukan</h2>
          <Link to="/products">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
              Kembali ke Produk
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm">
          <Link to="/" className="text-gray-400 hover:text-white">Beranda</Link>
          <span className="text-gray-600">/</span>
          <Link to="/products" className="text-gray-400 hover:text-white">Produk</Link>
          <span className="text-gray-600">/</span>
          <span className="text-white">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl glass-effect">
              <img  
                className="w-full h-96 lg:h-[500px] object-cover"
                alt={product.name}
               src="https://images.unsplash.com/photo-1635865165118-917ed9e20936" />
              {product.discount && (
                <span className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm px-3 py-1 rounded-full font-semibold">
                  -{product.discount}%
                </span>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-400">({product.reviews} ulasan)</span>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                {product.name}
              </h1>
              
              <p className="text-gray-400 mb-4">{product.category}</p>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold gradient-text">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Ukuran</h3>
              <div className="flex gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg transition-colors ${
                      selectedSize === size
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent'
                        : 'bg-white/10 text-gray-300 border-white/20 hover:bg-white/20'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Warna</h3>
              <div className="flex gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? 'border-white scale-110'
                        : 'border-white/30 hover:border-white/60'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Jumlah</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-white/20 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-gray-300 hover:text-white"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-gray-300 hover:text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-gray-400">Stok tersedia</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 text-lg font-semibold hover-glow"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Tambah ke Keranjang
              </Button>
              
              <Button
                onClick={handleWishlist}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 p-3"
              >
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-white text-sm font-medium">Gratis Ongkir</p>
                  <p className="text-gray-400 text-xs">Min. pembelian 500k</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-white text-sm font-medium">Garansi Kualitas</p>
                  <p className="text-gray-400 text-xs">30 hari tukar barang</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-white text-sm font-medium">Easy Return</p>
                  <p className="text-gray-400 text-xs">Pengembalian mudah</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="glass-effect rounded-2xl p-6">
          <div className="flex border-b border-white/10 mb-6">
            {[
              { id: 'description', label: 'Deskripsi' },
              { id: 'specifications', label: 'Spesifikasi' },
              { id: 'reviews', label: 'Ulasan' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-purple-400 border-b-2 border-purple-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-gray-300">
            {activeTab === 'description' && (
              <div>
                <p className="mb-4">{product.description}</p>
                <p>
                  Produk ini dibuat dengan standar kualitas tinggi menggunakan bahan-bahan premium. 
                  Desain yang modern dan fungsional membuatnya cocok untuk berbagai kesempatan. 
                  Perawatan mudah dan tahan lama menjadikan produk ini investasi yang tepat untuk koleksi fashion Anda.
                </p>
              </div>
            )}
            
            {activeTab === 'specifications' && (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Bahan:</span>
                  <span>100% Cotton Premium</span>
                </div>
                <div className="flex justify-between">
                  <span>Perawatan:</span>
                  <span>Machine Wash Cold</span>
                </div>
                <div className="flex justify-between">
                  <span>Asal:</span>
                  <span>Indonesia</span>
                </div>
                <div className="flex justify-between">
                  <span>Ukuran Tersedia:</span>
                  <span>{product.sizes.join(', ')}</span>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text">{product.rating}</div>
                    <div className="flex items-center justify-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-400">{product.reviews} ulasan</div>
                  </div>
                </div>
                
                <p className="text-gray-400">
                  Fitur ulasan pelanggan akan segera hadir. Saat ini Anda dapat melihat rating keseluruhan produk.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <Link to="/products">
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Produk
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;