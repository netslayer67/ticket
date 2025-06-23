import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SummaryCard = ({ tripDetails, selectedSeats, totalPrice, handleBooking }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card p-6 rounded-2xl shadow-lg border border-border"
        >
            <h2 className="text-xl font-semibold text-foreground mb-4 border-b border-border pb-4">Ringkasan Booking</h2>
            <div className="space-y-3 text-muted-foreground text-sm">
                <div className="flex justify-between">
                    <span>Operator</span>
                    <span className="font-medium text-foreground">{tripDetails.operator}</span>
                </div>
                <div className="flex justify-between">
                    <span>Rute</span>
                    <span className="font-medium text-foreground">{tripDetails.from} → {tripDetails.to}</span>
                </div>
                <div className="flex justify-between">
                    <span>Tanggal</span>
                    <span className="font-medium text-foreground">{tripDetails.date}</span>
                </div>
                <div className="flex justify-between">
                    <span>Waktu</span>
                    <span className="font-medium text-foreground">{tripDetails.departureTime}</span>
                </div>
            </div>
            <div className="my-4 border-t border-border pt-4">
                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Kursi Dipilih</span>
                    <span className="font-semibold text-primary text-base">{selectedSeats.join(', ') || '-'}</span>
                </div>
            </div>
            <div className="my-4 border-t border-border pt-4">
                <div className="flex justify-between items-center text-base">
                    <span className="font-semibold text-foreground">Total Harga</span>
                    <span className="font-bold text-primary">
                        {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            minimumFractionDigits: 0,
                        }).format(totalPrice)}
                    </span>
                </div>
            </div>
            <Button
                onClick={handleBooking}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base rounded-full"
            >
                <CreditCard className="w-5 h-5 mr-2" />
                Lanjut ke Pembayaran
            </Button>
        </motion.div>
    );
};

export default SummaryCard;
