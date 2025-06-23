
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [currentBooking, setCurrentBooking] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedBookings = localStorage.getItem('neo-dervish-bookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, []);

  const createBooking = (tripData, passengerData, seatNumbers) => {
    const booking = {
      id: `BK${Date.now()}`,
      tripId: tripData.id,
      trip: tripData,
      passenger: passengerData,
      seats: seatNumbers,
      totalPrice: tripData.price * seatNumbers.length,
      status: 'confirmed',
      bookingDate: new Date().toISOString(),
      paymentStatus: 'paid'
    };

    const updatedBookings = [...bookings, booking];
    setBookings(updatedBookings);
    localStorage.setItem('neo-dervish-bookings', JSON.stringify(updatedBookings));
    
    toast({
      title: "Booking berhasil!",
      description: `Tiket Anda telah dikonfirmasi dengan ID: ${booking.id}`,
    });

    return booking;
  };

  const getBookingById = (id) => {
    return bookings.find(booking => booking.id === id);
  };

  const getUserBookings = (userId) => {
    return bookings.filter(booking => booking.passenger.userId === userId);
  };

  return (
    <BookingContext.Provider value={{
      bookings,
      currentBooking,
      setCurrentBooking,
      createBooking,
      getBookingById,
      getUserBookings
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
