import React from 'react';
import { Link } from 'react-router-dom';
import { Bus, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 pt-24 pb-16 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
        {/* Brand Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <Link to="/" className="flex items-center space-x-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg">
              <Bus className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-extrabold text-white">
              Neo<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">Dervish</span>
            </span>
          </Link>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">Platform pemesanan tiket bus online terpercaya di Indonesia. Nikmati perjalanan aman, nyaman, dan hemat bersama kami.</p>
          <div className="flex space-x-5">
            {[{ icon: Facebook }, { icon: Twitter }, { icon: Instagram }].map((item, i) => (
              <a key={i} href="#" className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300">
                <item.icon className="w-6 h-6 text-white" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} viewport={{ once: true }}>
          <h3 className="text-2xl font-bold text-white mb-8">Tautan Cepat</h3>
          <ul className="space-y-5 text-lg">
            <li><Link to="/about" className="hover:text-blue-400 transition">Tentang Kami</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400 transition">Hubungi Kami</Link></li>
            <li><Link to="/my-tickets" className="hover:text-blue-400 transition">Cek Pesanan</Link></li>
            <li><a href="#" className="hover:text-blue-400 transition">FAQ</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Syarat & Ketentuan</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Kebijakan Privasi</a></li>
          </ul>
        </motion.div>

        {/* Services */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}>
          <h3 className="text-2xl font-bold text-white mb-8">Layanan</h3>
          <ul className="space-y-5 text-lg">
            <li><a href="#" className="hover:text-blue-400 transition">Tiket Bus</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Travel Antar Kota</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Sewa Bus</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Paket Wisata</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Asuransi Perjalanan</a></li>
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} viewport={{ once: true }}>
          <h3 className="text-2xl font-bold text-white mb-8">Hubungi Kami</h3>
          <div className="space-y-6 text-lg">
            <div className="flex items-start gap-5">
              <MapPin className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
              <span>Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan 12190</span>
            </div>
            <div className="flex items-center gap-5">
              <Phone className="w-6 h-6 text-blue-400 flex-shrink-0" />
              <span>+62 21-1500-123</span>
            </div>
            <div className="flex items-center gap-5">
              <Mail className="w-6 h-6 text-blue-400 flex-shrink-0" />
              <span>support@neodervish.com</span>
            </div>
            <div className="bg-white/10 p-6 rounded-2xl">
              <p className="text-blue-400 font-semibold">Customer Service 24/7</p>
              <p className="text-sm text-gray-400">Siap membantu Anda kapan saja</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-24 pt-10 border-t border-white/10 text-center text-gray-400 text-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <p>&copy; {new Date().getFullYear()} Neo Dervish. Semua hak dilindungi.</p>
        <div className="flex gap-10">
          <a href="#" className="hover:text-blue-400 transition">Kebijakan Privasi</a>
          <a href="#" className="hover:text-blue-400 transition">Syarat Layanan</a>
          <a href="#" className="hover:text-blue-400 transition">Bantuan</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
