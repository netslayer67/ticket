import React from 'react';
import { motion } from 'framer-motion';
import { Ticket, QrCode, ArrowDownToLine, Bus, User, Armchair } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const mockTickets = [
    {
        id: 'BK-JHB7S',
        route: { from: 'Jakarta', to: 'Bandung' },
        date: '2025-07-15',
        time: { departure: '08:00', arrival: '11:00' },
        operator: 'Neo Trans',
        bus: 'Executive Class',
        seats: ['A7', 'A8'],
        passenger: 'Ahmad Dahlan',
        status: 'confirmed'
    },
    {
        id: 'BK-KLS9A',
        route: { from: 'Yogyakarta', to: 'Surabaya' },
        date: '2025-06-25',
        time: { departure: '20:00', arrival: '04:00' },
        operator: 'Dervish Express',
        bus: 'Sleeper Bus',
        seats: ['S2'],
        passenger: 'Ahmad Dahlan',
        status: 'confirmed'
    },
    {
        id: 'BK-PZM3X',
        route: { from: 'Semarang', to: 'Jakarta' },
        date: '2025-05-10',
        time: { departure: '19:30', arrival: '03:00' },
        operator: 'Neo Trans',
        bus: 'Executive Class',
        seats: ['C4'],
        passenger: 'Ahmad Dahlan',
        status: 'used'
    },
];

const MyTicketsPage = () => {
    const { toast } = useToast();

    const handleActionClick = () => {
        toast({
            title: "🚧 Fitur Dalam Pengembangan",
            description: "Fitur ini akan segera tersedia.",
        });
    };

    const getStatusChip = (status) => {
        switch (status) {
            case 'confirmed':
                return <span className="px-4 py-1 text-sm font-semibold text-green-800 bg-green-200 rounded-full dark:bg-green-900/40 dark:text-green-300">Terkonfirmasi</span>;
            case 'used':
                return <span className="px-4 py-1 text-sm font-semibold text-gray-700 bg-gray-300 rounded-full dark:bg-gray-700 dark:text-gray-300">Digunakan</span>;
            case 'cancelled':
                return <span className="px-4 py-1 text-sm font-semibold text-red-800 bg-red-200 rounded-full dark:bg-red-900/40 dark:text-red-300">Dibatalkan</span>;
            default:
                return null;
        }
    };

    if (mockTickets.length === 0) {
        return (
            <div className="bg-gradient-to-br from-white via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-xl bg-white dark:bg-gray-900 p-16 rounded-3xl shadow-2xl"
                >
                    <Ticket className="w-24 h-24 mx-auto text-blue-600 mb-8" />
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">Anda Belum Memiliki Tiket</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">Semua tiket yang Anda pesan akan muncul di sini. Ayo rencanakan perjalanan pertama Anda!</p>
                    <Link to="/">
                        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-xl font-bold px-10 py-4 rounded-full shadow-xl">
                            Cari Perjalanan
                        </Button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-white via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen py-32 px-6 md:px-16 lg:px-32">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-20">
                <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Tiket Saya</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">Kelola semua tiket perjalanan Anda di sini</p>
            </motion.div>

            <div className="space-y-16">
                {mockTickets.map((ticket, index) => (
                    <motion.div
                        key={ticket.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, delay: index * 0.15 }}
                        className="flex flex-col md:flex-row bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden hover:scale-[1.01] transition-transform duration-300"
                    >
                        <div className="p-10 flex-grow">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-10">
                                <div>
                                    <div className="flex items-center gap-6 mb-4">
                                        <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">{ticket.route.from} → {ticket.route.to}</h2>
                                        {getStatusChip(ticket.status)}
                                    </div>
                                    <p className="text-sm text-gray-500">Booking ID: <span className="font-mono text-lg text-gray-900 dark:text-white">{ticket.id}</span></p>
                                </div>
                                <div className="mt-6 md:mt-0 text-left md:text-right">
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{new Date(ticket.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    <p className="text-gray-500 mt-1">{ticket.time.departure} - {ticket.time.arrival}</p>
                                </div>
                            </div>
                            <div className="border-t border-dashed border-gray-300 dark:border-gray-700 my-8"></div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                                <div className="flex items-center gap-4">
                                    <Bus className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    <div>
                                        <p className="text-gray-500 mb-1">Operator</p>
                                        <p className="font-semibold text-lg text-gray-900 dark:text-white">{ticket.operator}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    <div>
                                        <p className="text-gray-500 mb-1">Penumpang</p>
                                        <p className="font-semibold text-lg text-gray-900 dark:text-white">{ticket.passenger}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Armchair className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    <div>
                                        <p className="text-gray-500 mb-1">Nomor Kursi</p>
                                        <p className="font-semibold text-lg text-gray-900 dark:text-white">{ticket.seats.join(', ')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 md:w-56 flex flex-col items-center justify-center p-10 gap-8 border-t md:border-t-0 md:border-l border-blue-100 dark:border-blue-800">
                            <div className="p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
                                <QrCode className="w-24 h-24 text-blue-600 dark:text-blue-400" />
                            </div>
                            <Button onClick={handleActionClick} size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-lg font-bold py-4 px-10 rounded-full">
                                <ArrowDownToLine className="w-5 h-5 mr-3" /> Download
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default MyTicketsPage;
