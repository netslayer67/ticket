export const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatDateTime = (date) => {
  return new Date(date).toLocaleString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatNumber = (number) => {
  return new Intl.NumberFormat('id-ID').format(number);
};

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const generateOrderId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `ORD-${timestamp}-${random}`;
};

export const getStatusColor = (status) => {
  const colors = {
    pending: 'text-orange-400 bg-orange-400/10',
    processing: 'text-blue-400 bg-blue-400/10',
    shipped: 'text-purple-400 bg-purple-400/10',
    completed: 'text-green-400 bg-green-400/10',
    cancelled: 'text-red-400 bg-red-400/10',
    active: 'text-green-400 bg-green-400/10',
    inactive: 'text-gray-400 bg-gray-400/10',
    new: 'text-blue-400 bg-blue-400/10',
    vip: 'text-purple-400 bg-purple-400/10'
  };
  
  return colors[status] || 'text-gray-400 bg-gray-400/10';
};

export const getStatusText = (status) => {
  const texts = {
    pending: 'Menunggu',
    processing: 'Diproses',
    shipped: 'Dikirim',
    completed: 'Selesai',
    cancelled: 'Dibatalkan',
    active: 'Aktif',
    inactive: 'Tidak Aktif',
    new: 'Baru',
    vip: 'VIP'
  };
  
  return texts[status] || status;
};