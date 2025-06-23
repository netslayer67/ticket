import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedSize);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
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

  if (viewMode === 'list') {
    return (
      <Link to={`/product/${product.id}`}>
        <div className="glass-effect rounded-2xl p-6 hover-glow card-hover">
          <div className="flex gap-6">
            <div className="relative w-32 h-32 flex-shrink-0">
              <img  
                className="w-full h-full object-cover rounded-lg"
                alt={product.name}
               src="https://images.unsplash.com/photo-1635865165118-917ed9e20936" />
              {product.discount && (
                <span className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full">
                  -{product.discount}%
                </span>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">{product.name}</h3>
                  <p className="text-gray-400 text-sm">{product.category}</p>
                </div>
                <button
                  onClick={handleWishlist}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center">
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
                <span className="text-gray-400 text-sm">({product.reviews})</span>
              </div>
              
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold gradient-text">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm"
                  >
                    {product.sizes.map(size => (
                      <option key={size} value={size} className="bg-gray-800">
                        {size}
                      </option>
                    ))}
                  </select>
                  
                  <Button
                    onClick={handleAddToCart}
                    size="sm"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/product/${product.id}`}>
      <motion.div
        className="glass-effect rounded-2xl overflow-hidden hover-glow card-hover group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -8 }}
      >
        <div className="relative overflow-hidden">
          <img  
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            alt={product.name}
           src="https://images.unsplash.com/photo-1671376354106-d8d21e55dddd" />
          
          {product.discount && (
            <span className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm px-3 py-1 rounded-full font-semibold">
              -{product.discount}%
            </span>
          )}
          
          <button
            onClick={handleWishlist}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <Heart className="w-5 h-5" />
          </button>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center"
          >
            <div className="flex gap-2">
              <Button
                size="sm"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
              >
                <Eye className="w-4 h-4 mr-2" />
                Lihat
              </Button>
              <Button
                onClick={handleAddToCart}
                size="sm"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Beli
              </Button>
            </div>
          </motion.div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
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
            <span className="text-gray-400 text-sm">({product.reviews})</span>
          </div>
          
          <h3 className="text-lg font-semibold text-white mb-1">{product.name}</h3>
          <p className="text-gray-400 text-sm mb-3">{product.category}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold gradient-text">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-gray-500 line-through text-sm">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            
            <div className="flex gap-1">
              {product.colors.slice(0, 3).map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border border-white/30"
                  style={{ backgroundColor: color }}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-gray-400 text-xs">+{product.colors.length - 3}</span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;