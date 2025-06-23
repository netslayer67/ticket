import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, SlidersHorizontal, Bus, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TripCard = ({ trip, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-card rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all border border-border"
  >
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <Bus className="w-5 h-5 text-primary" />
            <p className="text-lg font-semibold text-foreground">{trip.operator}</p>
          </div>
          <span className="text-sm text-muted-foreground">{trip.busClass}</span>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-primary">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(trip.price)}</p>
          <p className="text-xs text-muted-foreground">/kursi</p>
        </div>
      </div>

      <div className="grid grid-cols-3 text-center text-sm">
        <div>
          <p className="text-xl font-medium text-foreground">{trip.departureTime}</p>
          <p className="text-muted-foreground">{trip.from}</p>
        </div>
        <div className="text-muted-foreground">
          <div className="flex items-center justify-center">
            <div className="flex-grow border-t border-dashed border-border"></div>
            <ArrowRight className="w-4 h-4 mx-3" />
            <div className="flex-grow border-t border-dashed border-border"></div>
          </div>
          <p className="text-xs mt-1">{trip.duration}</p>
        </div>
        <div>
          <p className="text-xl font-medium text-foreground">{trip.arrivalTime}</p>
          <p className="text-muted-foreground">{trip.to}</p>
        </div>
      </div>

      <div className="flex justify-between items-center text-xs text-muted-foreground">
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-foreground font-medium">{trip.rating}</span>
          <span className="">({trip.reviews} ulasan)</span>
        </div>
        <p className="text-foreground font-medium">{trip.seatsAvailable} kursi tersedia</p>
      </div>
    </div>
    <Link to={`/booking/${trip.id}`} className="block">
      <Button className="w-full rounded-none rounded-b-2xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium py-3">
        Pilih Kursi
      </Button>
    </Link>
  </motion.div>
);

const TripsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const from = queryParams.get('from') || 'Jakarta';
  const to = queryParams.get('to') || 'Bandung';
  const date = queryParams.get('date') || new Date().toLocaleDateString('id-ID');

  const [trips] = useState([
    { id: 1, operator: 'Neo Express', busClass: 'Eksekutif', departureTime: '07:00', arrivalTime: '10:00', duration: '3j', price: 75000, seatsAvailable: 12, from, to, rating: 4.5, reviews: 120 },
    { id: 2, operator: 'Dervish Trans', busClass: 'VIP', departureTime: '08:30', arrivalTime: '11:30', duration: '3j', price: 95000, seatsAvailable: 5, from, to, rating: 4.8, reviews: 250 },
    { id: 3, operator: 'Horizon Bus', busClass: 'Ekonomi AC', departureTime: '09:00', arrivalTime: '12:30', duration: '3j 30m', price: 60000, seatsAvailable: 25, from, to, rating: 4.2, reviews: 88 },
    { id: 4, operator: 'Neo Express', busClass: 'Eksekutif', departureTime: '13:00', arrivalTime: '16:00', duration: '3j', price: 75000, seatsAvailable: 18, from, to, rating: 4.5, reviews: 120 },
  ]);

  return (
    <div className="bg-secondary/40 min-h-screen">
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-10 px-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold tracking-tight">Hasil Pencarian</h1>
          <p className="text-lg text-blue-200 mt-1">{from} → {to} | {date}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <aside className="lg:col-span-1 bg-card p-6 rounded-2xl shadow-lg border border-border">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-foreground">Filter</h2>
            <Button variant="ghost" size="sm">
              <SlidersHorizontal className="w-4 h-4 mr-2" /> Reset
            </Button>
          </div>
          <div className="space-y-6 text-sm">
            <div>
              <h3 className="font-medium text-foreground mb-3">Waktu Keberangkatan</h3>
              <div className="space-y-2 text-muted-foreground">
                <label className="flex items-center"><input type="checkbox" className="mr-2 rounded text-primary focus:ring-primary" /> Pagi (05:00 - 12:00)</label>
                <label className="flex items-center"><input type="checkbox" className="mr-2 rounded text-primary focus:ring-primary" /> Siang (12:00 - 17:00)</label>
                <label className="flex items-center"><input type="checkbox" className="mr-2 rounded text-primary focus:ring-primary" /> Malam (17:00 - 21:00)</label>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-3">Kelas Bus</h3>
              <div className="space-y-2 text-muted-foreground">
                <label className="flex items-center"><input type="checkbox" className="mr-2 rounded text-primary focus:ring-primary" /> Eksekutif</label>
                <label className="flex items-center"><input type="checkbox" className="mr-2 rounded text-primary focus:ring-primary" /> VIP</label>
                <label className="flex items-center"><input type="checkbox" className="mr-2 rounded text-primary focus:ring-primary" /> Ekonomi</label>
              </div>
            </div>
          </div>
        </aside>

        {/* Trip List */}
        <main className="lg:col-span-3 space-y-6">
          {trips.map((trip, index) => (
            <TripCard key={trip.id} trip={trip} index={index} />
          ))}
        </main>
      </div>
    </div>
  );
};

export default TripsPage;
