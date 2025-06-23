import { motion } from 'framer-motion';

const Seat = ({ number, status, onSelect, isSelected }) => {
    const getStatusClass = () => {
        if (status === 'occupied') return 'bg-muted text-muted-foreground cursor-not-allowed';
        if (isSelected) return 'bg-primary text-primary-foreground border-primary/80';
        return 'bg-primary/10 hover:bg-primary/20 text-primary';
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={status === 'occupied'}
            onClick={() => onSelect(number)}
            className={`w-10 h-10 rounded-lg text-sm font-medium flex items-center justify-center transition-all duration-200 border ${getStatusClass()}`}
        >
            {number}
        </motion.button>
    );
};

const BookingSeat = ({ selectedSeats, handleSelectSeat }) => {
    const seatsLayout = [
        ['1A', '1B', null, '1C', '1D'],
        ['2A', '2B', null, '2C', '2D'],
        ['3A', '3B', null, '3C', '3D'],
        ['4A', '4B', null, '4C', '4D'],
        ['5A', '5B', null, '5C', '5D'],
    ];
    const occupiedSeats = ['2B', '3D'];

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05 } },
            }}
            className="bg-card p-8 rounded-2xl shadow-lg border border-border"
        >
            <h2 className="text-2xl font-semibold text-foreground mb-6">Pilih Kursi Anda</h2>
            <div className="bg-background p-6 rounded-xl">
                <div className="max-w-xs mx-auto space-y-3">
                    {seatsLayout.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex justify-between">
                            {row.map((seat, index) =>
                                seat ? (
                                    <motion.div
                                        key={seat}
                                        variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                                    >
                                        <Seat
                                            number={seat}
                                            status={occupiedSeats.includes(seat) ? 'occupied' : 'available'}
                                            isSelected={selectedSeats.includes(seat)}
                                            onSelect={handleSelectSeat}
                                        />
                                    </motion.div>
                                ) : (
                                    <div key={index} className="w-10 h-10" />
                                )
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center space-x-6 mt-6 text-sm text-muted-foreground">
                <div className="flex items-center"><span className="w-4 h-4 rounded bg-primary/10 mr-2"></span>Tersedia</div>
                <div className="flex items-center"><span className="w-4 h-4 rounded bg-primary mr-2"></span>Pilihan Anda</div>
                <div className="flex items-center"><span className="w-4 h-4 rounded bg-muted mr-2"></span>Terisi</div>
            </div>
        </motion.div>
    );
};

export default BookingSeat;