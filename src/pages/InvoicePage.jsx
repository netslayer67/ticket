import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const InvoicePage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex items-center justify-center bg-background/80 px-4 py-20"
        >
            <div className="bg-card p-10 rounded-2xl shadow-xl max-w-xl w-full border border-border text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-2">Pembayaran Berhasil</h1>
                <p className="text-muted-foreground mb-6">Terima kasih telah melakukan pemesanan. Tiket Anda telah dikonfirmasi.</p>

                <div className="bg-background p-6 rounded-xl text-left space-y-3 text-sm border border-dashed border-border mb-6">
                    <div className="flex justify-between">
                        <span>Operator</span>
                        <span className="font-medium text-foreground">Neo Express</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Rute</span>
                        <span className="font-medium text-foreground">Jakarta → Bandung</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Tanggal</span>
                        <span className="font-medium text-foreground">25 Desember 2024</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Kursi</span>
                        <span className="font-medium text-foreground">2A, 2C</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Total Bayar</span>
                        <span className="font-bold text-primary">Rp150.000</span>
                    </div>
                </div>

                <Button className="w-full rounded-full">
                    <Download className="w-4 h-4 mr-2" />
                    Unduh Tiket (PDF)
                </Button>
            </div>
        </motion.div>
    );
};

export default InvoicePage;
