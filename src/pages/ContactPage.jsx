import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Pesan terkirim!",
        description: "Terima kasih atas pesan Anda. Tim kami akan segera merespons dalam 24 jam.",
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Terjadi kesalahan",
        description: "Silakan coba lagi dalam beberapa saat.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Hubungi Kami
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Tim customer service Neo Dervish siap membantu Anda 24/7.
              Jangan ragu untuk menghubungi kami kapan saja.
            </p>
          </motion.div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Informasi Kontak</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow card-hover">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Customer Service</h3>
                    <p className="text-gray-600 dark:text-gray-400">+62 21-1500-123</p>
                    <p className="text-gray-600 dark:text-gray-400">+62 812-3456-7890</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">24 jam setiap hari</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow card-hover">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
                    <p className="text-gray-600 dark:text-gray-400">support@neodervish.com</p>
                    <p className="text-gray-600 dark:text-gray-400">info@neodervish.com</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">Respon dalam 2 jam</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow card-hover">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Kantor Pusat</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Jl. Jend. Sudirman Kav. 52-53<br />
                      Jakarta Selatan 12190<br />
                      Indonesia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow card-hover">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Jam Operasional</h3>
                    <p className="text-gray-600 dark:text-gray-400">Customer Service: 24/7</p>
                    <p className="text-gray-600 dark:text-gray-400">Kantor: Senin - Jumat, 09:00 - 18:00</p>
                    <p className="text-gray-600 dark:text-gray-400">Sabtu: 09:00 - 15:00</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Contact Options */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Kontak Cepat</h3>
              <div className="space-y-3">
                <Button className="w-full justify-start bg-green-600 hover:bg-green-700 text-white">
                  <MessageCircle className="w-5 h-5 mr-3" />
                  WhatsApp: +62 812-3456-7890
                </Button>
                <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
                  <Headphones className="w-5 h-5 mr-3" />
                  Live Chat (24/7)
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Kirim Pesan</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subjek
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Pilih subjek</option>
                  <option value="booking">Bantuan Booking</option>
                  <option value="payment">Masalah Pembayaran</option>
                  <option value="refund">Refund & Pembatalan</option>
                  <option value="technical">Masalah Teknis</option>
                  <option value="partnership">Kemitraan</option>
                  <option value="other">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Pesan
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tulis pesan Anda di sini..."
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
              >
                {loading ? (
                  'Mengirim...'
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Kirim Pesan
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Pertanyaan Umum
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Temukan jawaban untuk pertanyaan yang sering diajukan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "Bagaimana cara membatalkan tiket?",
                answer: "Anda dapat membatalkan tiket melalui halaman 'Tiket Saya' atau menghubungi customer service kami. Kebijakan pembatalan berbeda untuk setiap operator."
              },
              {
                question: "Berapa lama proses refund?",
                answer: "Proses refund biasanya memakan waktu 3-7 hari kerja tergantung metode pembayaran yang digunakan."
              },
              {
                question: "Apakah bisa reschedule tiket?",
                answer: "Ya, Anda dapat mengubah jadwal perjalanan dengan menghubungi customer service. Biaya reschedule tergantung kebijakan operator."
              },
              {
                question: "Bagaimana jika bus terlambat?",
                answer: "Jika bus mengalami keterlambatan, Anda akan mendapat notifikasi melalui SMS/email. Tim kami akan membantu mencari solusi terbaik."
              },
              {
                question: "Apakah ada diskon untuk pembelian grup?",
                answer: "Ya, kami menyediakan diskon khusus untuk pembelian tiket grup (minimal 10 orang). Hubungi tim sales kami untuk informasi lebih lanjut."
              },
              {
                question: "Bagaimana cara menggunakan voucher?",
                answer: "Masukkan kode voucher pada halaman pembayaran sebelum menyelesaikan transaksi. Pastikan voucher masih berlaku dan sesuai syarat & ketentuan."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow card-hover"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;