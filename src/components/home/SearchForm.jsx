import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar as CalendarIcon, Users, ArrowRightLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useToast } from '@/components/ui/use-toast';

const SearchForm = () => {
    const { toast } = useToast();
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState(new Date());

    const handleSwap = () => {
        const temp = origin;
        setOrigin(destination);
        setDestination(temp);
    };

    const handleSearch = () => {
        if (!origin || !destination) {
             toast({
                title: "Input Tidak Lengkap",
                description: "Mohon isi kota asal dan tujuan.",
                variant: "destructive",
            });
            return;
        }
        toast({
            title: "🚧 Fitur Dalam Pengembangan",
            description: `Pencarian tiket dari ${origin} ke ${destination} belum diimplementasikan.`,
        });
    };

    return (
        <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="p-6 md:p-8 bg-background/90 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-4xl mx-auto border border-border/20"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-4 items-end">
                {/* Origin */}
                <div className="relative lg:col-span-3">
                    <label className="text-sm font-medium text-muted-foreground ml-1 mb-1 block">Dari</label>
                    <MapPin className="absolute left-3 top-10 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        type="text" 
                        placeholder="Kota asal" 
                        className="pl-10 h-12 text-base"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                    />
                </div>

                {/* Swap Button */}
                <div className="flex items-center justify-center lg:col-span-1">
                     <Button variant="outline" size="icon" onClick={handleSwap} className="mt-6 rounded-full">
                        <ArrowRightLeft className="h-5 w-5 text-muted-foreground" />
                    </Button>
                </div>

                {/* Destination */}
                <div className="relative lg:col-span-3">
                    <label className="text-sm font-medium text-muted-foreground ml-1 mb-1 block">Ke</label>
                    <MapPin className="absolute left-3 top-10 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        type="text" 
                        placeholder="Kota tujuan" 
                        className="pl-10 h-12 text-base"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                    />
                </div>

                {/* Date */}
                <div className="relative lg:col-span-3">
                    <label className="text-sm font-medium text-muted-foreground ml-1 mb-1 block">Tanggal</label>
                     <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className="w-full justify-start text-left font-normal h-12 text-base"
                            >
                                <CalendarIcon className="mr-2 h-5 w-5" />
                                {date ? format(date, "PPP", { locale: id }) : <span>Pilih tanggal</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Search Button */}
                <div className="lg:col-span-full">
                    <Button onClick={handleSearch} className="w-full h-14 text-lg font-bold btn-primary">
                        <Search className="mr-2 h-6 w-6" /> Cari Tiket
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

export default SearchForm;