import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Clock, Users, Star, Bus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TripSearchForm from '@/components/home/TripSearchForm';

const HomePage = () => {
  const popularRoutes = [
    { from: 'Jakarta', to: 'Bandung', price: 75000, duration: '3 jam' },
    { from: 'Surabaya', to: 'Yogyakarta', price: 120000, duration: '6 jam' },
    { from: 'Jakarta', to: 'Semarang', price: 150000, duration: '8 jam' },
    { from: 'Bandung', to: 'Surabaya', price: 180000, duration: '10 jam' },
  ];

  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-blue-500" />,
      title: 'Aman & Terpercaya',
      description: 'Semua operator bus telah terverifikasi dan memenuhi standar keamanan tertinggi.'
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-500" />,
      title: 'Booking Mudah',
      description: 'Pesan tiket dalam hitungan menit dengan proses yang sederhana dan cepat.'
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: 'Customer Service 24/7',
      description: 'Tim support kami siap membantu Anda kapan saja, di mana saja.'
    },
    {
      icon: <Star className="w-8 h-8 text-blue-500" />,
      title: 'Harga Terbaik',
      description: 'Dapatkan harga tiket terbaik dengan berbagai promo menarik setiap hari.'
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1690129625636-4a9992f9fbd4" alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent backdrop-blur-md" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-24 py-32 text-white text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-6xl font-extrabold mb-10 tracking-tight drop-shadow-xl">Pesan Tiket Bus Jadi Lebih Mudah</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-2xl text-blue-100 mb-14 max-w-3xl mx-auto leading-relaxed">Cari, bandingkan, dan pesan tiket dari ratusan operator bus di seluruh Indonesia dengan Neo Dervish.</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="max-w-5xl mx-auto">
            <TripSearchForm />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Kenapa Pesan di Neo Dervish?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Kami memberikan pengalaman terbaik untuk setiap perjalanan Anda.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:shadow-lg transition-shadow card-hover"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Rute Populer
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-gray-600 dark:text-gray-400"
            >
              Temukan rute perjalanan favorit dengan harga terbaik
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularRoutes.map((route, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow card-hover"
              >
                <div className="flex items-center justify-between mb-4">
                  <Bus className="w-8 h-8 text-blue-500" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">{route.duration}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {route.from} → {route.to}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    {formatPrice(route.price)}
                  </span>
                  <Link to="/trips">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      Pesan
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/trips">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                Lihat Semua Rute
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Siap Memulai Perjalanan?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan jutaan penumpang yang telah mempercayai Neo Dervish
              untuk perjalanan mereka. Dapatkan pengalaman booking yang mudah dan aman.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/trips">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-bold text-lg px-8">
                  Pesan Tiket Sekarang
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 font-bold text-lg px-8">
                  Pelajari Lebih Lanjut
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;