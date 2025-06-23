import { motion } from 'framer-motion';
import { User, Mail, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';

const PassengerForm = ({ passengerDetails, handleInputChange }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card p-8 rounded-2xl shadow-lg border border-border"
        >
            <h2 className="text-2xl font-semibold text-foreground mb-6">Detail Penumpang</h2>
            <div className="space-y-6">
                <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        type="text"
                        name="name"
                        placeholder="Nama Lengkap"
                        value={passengerDetails.name}
                        onChange={handleInputChange}
                        className="w-full pl-12 py-3 rounded-lg"
                    />
                </div>
                <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        type="email"
                        name="email"
                        placeholder="Alamat Email"
                        value={passengerDetails.email}
                        onChange={handleInputChange}
                        className="w-full pl-12 py-3 rounded-lg"
                    />
                </div>
                <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        type="tel"
                        name="phone"
                        placeholder="Nomor Telepon"
                        value={passengerDetails.phone}
                        onChange={handleInputChange}
                        className="w-full pl-12 py-3 rounded-lg"
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default PassengerForm;