import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Calendar, Users, ArrowRightLeft, Loader2, Award, Shield, Clock, Heart, Bus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 px-4 sm:px-8 lg:px-24">
      <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl font-extrabold text-center mb-16 text-gray-900 dark:text-white">
        Tentang <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">Neo Dervish</span>
      </motion.h1>

      <motion.section className="mb-32" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Cerita Kami</h2>
            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300">
              <p>Neo Dervish lahir dari visi untuk merevolusi perjalanan antar kota di Indonesia, memberikan pengalaman nyaman dan berkesan bagi setiap penumpang.</p>
              <p>Kami menghubungkan penumpang dengan operator terpercaya di seluruh Indonesia, didukung teknologi modern dan layanan pelanggan profesional.</p>
              <p>Setiap transaksi mendukung pengembangan industri transportasi darat yang lebih efisien dan modern untuk Indonesia.</p>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1690129625636-4a9992f9fbd4" alt="Modern terminal" className="object-cover w-full h-[450px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </div>
      </motion.section>

      <motion.section className="mb-32" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">Nilai Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { icon: <Shield className="w-10 h-10" />, title: 'Keamanan', desc: 'Operator bus terverifikasi & memenuhi standar keamanan tertinggi.' },
            { icon: <Clock className="w-10 h-10" />, title: 'Tepat Waktu', desc: 'Keberangkatan dan kedatangan sesuai jadwal.' },
            { icon: <Users className="w-10 h-10" />, title: 'Layanan Prima', desc: 'Customer service responsif siap 24/7.' },
            { icon: <Heart className="w-10 h-10" />, title: 'Kepuasan Pelanggan', desc: 'Kenyamanan & kepuasan sebagai prioritas utama.' }
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1, duration: 0.6 }} viewport={{ once: true }} className="text-center bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition duration-300">
              <div className="mx-auto mb-6 w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 text-white">
                {item.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mb-32" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
        <div className="bg-gradient-to-r from-blue-600 to-cyan-400 rounded-3xl p-16 text-white shadow-xl">
          <h2 className="text-4xl font-bold text-center mb-12">Pencapaian Kami</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { stat: '1M+', label: 'Penumpang' },
              { stat: '500+', label: 'Operator' },
              { stat: '100+', label: 'Kota' },
              { stat: '4.8', label: 'Rating' }
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1, duration: 0.6 }} viewport={{ once: true }} className="text-center">
                <div className="text-5xl font-extrabold mb-2">{s.stat}</div>
                <div className="text-lg text-blue-100">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section className="mb-32" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">Tim Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { name: 'Ahmad Rizki', role: 'CEO & Founder', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
            { name: 'Sari Dewi', role: 'Head of Operations', img: 'https://randomuser.me/api/portraits/women/45.jpg' },
            { name: 'Budi Santoso', role: 'CTO', img: 'https://randomuser.me/api/portraits/men/76.jpg' }
          ].map((member, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1, duration: 0.6 }} viewport={{ once: true }} className="bg-white dark:bg-gray-800 p-8 rounded-3xl text-center shadow-lg hover:shadow-2xl">
              <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-blue-400">
                <img src={member.img} alt={member.name} className="object-cover w-full h-full" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">{member.name}</h3>
              <p className="text-blue-600 dark:text-blue-400 mb-3 font-medium">{member.role}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Berpengalaman 10+ tahun di industri transportasi & teknologi.</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section className="py-24 px-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
        <Bus className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-8" />
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">Misi Kami</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
          "Menghubungkan seluruh Indonesia melalui platform transportasi digital yang aman, nyaman, dan terpercaya. Kami berkomitmen menghadirkan perjalanan terbaik sekaligus mendukung pertumbuhan ekonomi lokal."
        </p>
      </motion.section>
    </motion.div>
  );
};

export default AboutPage;
