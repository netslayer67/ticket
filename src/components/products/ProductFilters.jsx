import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProductFilters = ({ filters, onFilterChange, products }) => {
  const categories = [...new Set(products.map(p => p.category))];
  const sizes = [...new Set(products.flatMap(p => p.sizes))];
  const colors = [...new Set(products.flatMap(p => p.colors))];

  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const handlePriceRangeChange = (value, index) => {
    const newRange = [...filters.priceRange];
    newRange[index] = parseInt(value);
    onFilterChange({
      ...filters,
      priceRange: newRange
    });
  };

  const clearFilters = () => {
    onFilterChange({
      category: '',
      priceRange: [0, 2000000],
      size: '',
      color: ''
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="glass-effect rounded-2xl p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Filter</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-gray-400 hover:text-white"
        >
          <X className="w-4 h-4 mr-1" />
          Reset
        </Button>
      </div>

      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <h4 className="text-sm font-medium text-white mb-3">Kategori</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value=""
                checked={filters.category === ''}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="mr-2 text-purple-500"
              />
              <span className="text-gray-300 text-sm">Semua</span>
            </label>
            {categories.map(category => (
              <label key={category} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={filters.category === category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="mr-2 text-purple-500"
                />
                <span className="text-gray-300 text-sm">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <h4 className="text-sm font-medium text-white mb-3">Rentang Harga</h4>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceRangeChange(e.target.value, 0)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceRangeChange(e.target.value, 1)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm"
              />
            </div>
            <div className="text-xs text-gray-400">
              {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
            </div>
          </div>
        </div>

        {/* Size Filter */}
        <div>
          <h4 className="text-sm font-medium text-white mb-3">Ukuran</h4>
          <div className="grid grid-cols-3 gap-2">
            {sizes.map(size => (
              <button
                key={size}
                onClick={() => handleFilterChange('size', filters.size === size ? '' : size)}
                className={`px-3 py-2 text-sm rounded border transition-colors ${
                  filters.size === size
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent'
                    : 'bg-white/10 text-gray-300 border-white/20 hover:bg-white/20'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Filter */}
        <div>
          <h4 className="text-sm font-medium text-white mb-3">Warna</h4>
          <div className="grid grid-cols-4 gap-2">
            {colors.map(color => (
              <button
                key={color}
                onClick={() => handleFilterChange('color', filters.color === color ? '' : color)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  filters.color === color
                    ? 'border-white scale-110'
                    : 'border-white/30 hover:border-white/60'
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;