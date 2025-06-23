import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { BookingProvider } from '@/contexts/BookingContext';
import { SocketProvider } from '@/contexts/SocketContext';
import { AdminProvider } from '@/contexts/AdminContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import HomePage from '@/pages/HomePage';
import TripsPage from '@/pages/TripsPage';
import BookingPage from '@/pages/BookingPage';
import MyTicketsPage from '@/pages/MyTicketsPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import Invoice from '../src/pages/InvoicePage';
import AdminLogin from '@/pages/admin/AdminLogin';
import ProtectedAdminRoute from '@/components/admin/ProtectedAdminRoute';

function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <SocketProvider>
          <BookingProvider>
            <Router>
              <div className="flex flex-col min-h-screen bg-background text-foreground">
                <Routes>
                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin/*" element={
                    // <ProtectedAdminRoute>
                    <AdminLayout />
                    // </ProtectedAdminRoute>
                  } />

                  {/* Customer Routes */}
                  <Route path="/*" element={
                    <>
                      <Navbar />
                      <main className="flex-grow pt-20">
                        <Routes>
                          <Route path="/" element={<HomePage />} />
                          <Route path="/invoice" element={<Invoice />} />
                          <Route path="/trips" element={<TripsPage />} />
                          <Route path="/booking/:tripId" element={<BookingPage />} />
                          <Route path="/my-tickets" element={<MyTicketsPage />} />
                          <Route path="/about" element={<AboutPage />} />
                          <Route path="/contact" element={<ContactPage />} />
                        </Routes>
                      </main>
                      <Footer />
                    </>
                  } />
                </Routes>
                <Toaster />
              </div>
            </Router>
          </BookingProvider>
        </SocketProvider>
      </AdminProvider>
    </AuthProvider>
  );
}

export default App;