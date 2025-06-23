import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import BookingSeat from '../components/BookingSeat';
import PassengerForm from '../components/PassengerForm';
import SummaryCard from '../components/SummaryCard';

const BookingPage = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerDetails, setPassengerDetails] = useState({ name: '', email: '', phone: '' });

  const tripDetails = {
    id: tripId,
    operator: 'Neo Express',
    from: 'Jakarta',
    to: 'Bandung',
    date: '25 Desember 2024',
    departureTime: '07:00',
    price: 75000,
  };

  const handleSelectSeat = (seatNumber) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPassengerDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      toast({ title: 'Pilih Kursi', description: 'Silakan pilih setidaknya satu kursi.', variant: 'destructive' });
      return;
    }
    if (!passengerDetails.name || !passengerDetails.email || !passengerDetails.phone) {
      toast({ title: 'Data Tidak Lengkap', description: 'Harap isi semua detail penumpang.', variant: 'destructive' });
      return;
    }
    toast({ title: 'Booking Berhasil!', description: 'Tiket Anda sedang diproses. Terima kasih!' });
    navigate('/invoice');
  };

  return (
    <div className="bg-background/80 min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Hasil Pencarian
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2 space-y-10">
            <BookingSeat
              selectedSeats={selectedSeats}
              handleSelectSeat={handleSelectSeat}
            />
            <PassengerForm
              passengerDetails={passengerDetails}
              handleInputChange={handleInputChange}
            />
          </div>

          <aside className="lg:col-span-1 sticky top-24">
            <SummaryCard
              tripDetails={tripDetails}
              selectedSeats={selectedSeats}
              totalPrice={selectedSeats.length * tripDetails.price}
              handleBooking={handleBooking}
            />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
