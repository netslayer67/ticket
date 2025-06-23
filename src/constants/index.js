export const APP_CONFIG = {
  name: 'Neo Dervish',
  description: 'Fashion Premium Store',
  version: '1.0.0',
  author: 'Neo Dervish Team'
};

export const API_ENDPOINTS = {
  products: '/api/products',
  orders: '/api/orders',
  customers: '/api/customers',
  auth: '/api/auth',
  admin: '/api/admin'
};

export const SOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  NEW_ORDER: 'new_order',
  ORDER_UPDATE: 'order_update',
  STOCK_ALERT: 'stock_alert',
  CUSTOMER_REGISTERED: 'customer_registered',
  ADMIN_NOTIFICATION: 'admin_notification'
};

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

export const CUSTOMER_STATUS = {
  NEW: 'new',
  ACTIVE: 'active',
  VIP: 'vip',
  INACTIVE: 'inactive'
};

export const PRODUCT_CATEGORIES = [
  'Kaos',
  'Kemeja',
  'Celana',
  'Dress',
  'Jaket',
  'Hoodie',
  'Rok',
  'Aksesoris'
];

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const COLORS = [
  '#000000', // Black
  '#FFFFFF', // White
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#45B7D1', // Blue
  '#96CEB4', // Green
  '#FFEAA7', // Yellow
  '#DDA0DD', // Plum
  '#98D8C8', // Mint
  '#F7DC6F'  // Light Yellow
];

export const NOTIFICATION_TYPES = {
  ORDER: 'order',
  PRODUCT: 'product',
  CUSTOMER: 'customer',
  SYSTEM: 'system'
};

export const ADMIN_PERMISSIONS = {
  VIEW_DASHBOARD: 'view_dashboard',
  MANAGE_PRODUCTS: 'manage_products',
  MANAGE_ORDERS: 'manage_orders',
  MANAGE_CUSTOMERS: 'manage_customers',
  VIEW_ANALYTICS: 'view_analytics',
  MANAGE_SETTINGS: 'manage_settings'
};