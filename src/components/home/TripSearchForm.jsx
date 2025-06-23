import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Calendar, Users, ArrowRightLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const TripSearchForm = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({ from: '', to: '', date: '', passengers: 1 });
  const [swapAnimation, setSwapAnimation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [theme, setTheme] = useState('light');

  const popularCities = ['Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta', 'Semarang', 'Malang', 'Solo', 'Denpasar', 'Medan', 'Palembang'];

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }, []);

  const handleInputChange = (field, value) => setSearchData(prev => ({ ...prev, [field]: value }));

  const handleSwapCities = () => {
    setSwapAnimation(true);
    setTimeout(() => {
      setSearchData(prev => ({ ...prev, from: prev.to, to: prev.from }));
      setSwapAnimation(false);
    }, 300);
  };

  const handleSearch = () => {
    setError('');
    if (!searchData.from || !searchData.to || !searchData.date) {
      setError('Mohon lengkapi semua field pencarian');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/trips', { state: searchData });
    }, 1500);
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const floatingLabelClass = (value) => value ? 'transform -translate-y-6 scale-90 text-blue-600' : 'translate-y-2 text-gray-400';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="bg-gradient-to-bl from-white via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-14 max-w-7xl mx-auto">
      <h2 className="text-3xl font-extrabold text-center mb-10 text-gray-900 dark:text-white tracking-tight">Pesan Tiket Perjalanan Anda</h2>

      {error && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </motion.div>
      )}

      <div className="flex flex-col md:flex-row gap-8 justify-between items-end">
        <div className="flex-1 relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input type="text" list="from-cities" value={searchData.from} onChange={(e) => handleInputChange('from', e.target.value)} className="pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 text-lg peer" />
          <label className={`absolute left-12 top-4 text-lg transition-all duration-300 origin-left pointer-events-none ${floatingLabelClass(searchData.from)}`}>Kota Asal</label>
          <datalist id="from-cities">{popularCities.map(city => (<option key={city} value={city} />))}</datalist>
        </div>

        <div>
          <motion.div animate={{ rotate: swapAnimation ? 180 : 0 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Button type="button" size="icon" onClick={handleSwapCities} className="rounded-full bg-blue-600 hover:bg-blue-700 text-white p-4 shadow-lg transition duration-300">
              <ArrowRightLeft className="w-6 h-6" />
            </Button>
          </motion.div>
        </div>

        <div className="flex-1 relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input type="text" list="to-cities" value={searchData.to} onChange={(e) => handleInputChange('to', e.target.value)} className="pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 text-lg peer" />
          <label className={`absolute left-12 top-4 text-lg transition-all duration-300 origin-left pointer-events-none ${floatingLabelClass(searchData.to)}`}>Kota Tujuan</label>
          <datalist id="to-cities">{popularCities.map(city => (<option key={city} value={city} />))}</datalist>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input type="date" value={searchData.date} onChange={(e) => handleInputChange('date', e.target.value)} min={getTomorrowDate()} className="pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 text-lg peer" />
          {/* <label className={`absolute left-12 top-4 text-lg transition-all duration-300 origin-left pointer-events-none ${floatingLabelClass(searchData.date)}`}>Tanggal Berangkat</label> */}
        </div>
        <div className="relative">
          <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select value={searchData.passengers} onChange={(e) => handleInputChange('passengers', parseInt(e.target.value))} className="pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 text-lg peer">
            {[1, 2, 3, 4, 5, 6].map(num => (<option key={num} value={num}>{num} Penumpang</option>))}
          </select>
          {/* <label className="absolute left-12 top-4 text-lg transition-all duration-300 origin-left pointer-events-none text-blue-600">Penumpang</label> */}
        </div>
        <div className="flex items-end mb-4">
          <Button onClick={handleSearch} disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-xl font-bold py-4 rounded-xl shadow-xl transition duration-300 flex justify-center items-center">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (<><Search className="w-5 h-5 mr-2" /> Cari Tiket</>)}
          </Button>
        </div>
      </div>

      <div className="mt-14 border-t pt-8">
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-6 text-center">Rute Populer</p>
        <div className="flex flex-wrap gap-5 justify-center">
          {['Jakarta - Bandung', 'Surabaya - Yogyakarta', 'Jakarta - Semarang', 'Bandung - Surabaya'].map((route, index) => (
            <button key={index} onClick={() => { const [from, to] = route.split(' - '); setSearchData(prev => ({ ...prev, from, to })); }} className="px-6 py-3 text-base font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/60 transition duration-300 shadow-md">
              {route}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TripSearchForm;
