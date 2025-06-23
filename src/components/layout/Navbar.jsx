import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bus, Menu, LogIn, UserPlus, Sun, Moon, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
    const [userRole, setUserRole] = useState('guest'); // roles: guest, user, admin
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleTheme = () => {
        setDarkMode(prev => {
            const next = !prev;
            localStorage.setItem('theme', next ? 'dark' : 'light');
            document.documentElement.classList.toggle('dark', next);
            return next;
        });
    };

    const navLinks = [
        { name: 'Cari Tiket', path: '/' },
        { name: 'Cek Pesanan', path: '/my-tickets' },
        { name: 'Tentang Kami', path: '/about' },
        { name: 'Kontak', path: '/contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-shadow ${isScrolled ? 'shadow-md' : 'shadow-none'} bg-white/70 dark:bg-background/80 border-b border-border`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
                <div className="flex items-center justify-between h-20">
                    <Link to="/" className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-xl flex items-center justify-center shadow-md">
                            <Bus className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-3xl font-bold text-foreground">
                            Neo<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">Dervish</span>
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-10">
                        {navLinks.map(link => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="relative group text-base font-medium text-muted-foreground hover:text-primary transition"
                            >
                                {link.name}
                                <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-300"></span>
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center space-x-4">
                        <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground hover:text-foreground">
                            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </Button>

                        {userRole === 'guest' ? (
                            <>
                                <Button variant="ghost" className="flex items-center gap-2 text-base text-muted-foreground hover:text-primary">
                                    <LogIn className="w-5 h-5" /> <span>Masuk</span>
                                </Button>
                                <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-6 py-3 rounded-full text-base shadow-md">
                                    <UserPlus className="w-5 h-5" /> <span>Daftar</span>
                                </Button>
                            </>
                        ) : (
                            <div className="relative">
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
                                >
                                    {userRole === 'admin' ? 'Admin' : 'Pengguna'} <ChevronDown className="w-4 h-4" />
                                </button>
                                <AnimatePresence>
                                    {showDropdown && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute right-0 mt-2 bg-white dark:bg-muted border border-border rounded-xl shadow-lg py-2 w-48 z-50"
                                        >
                                            <Link to="/dashboard" className="block px-4 py-2 text-sm hover:bg-accent">Dashboard</Link>
                                            <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-accent">Profil</Link>
                                            <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50">Keluar</button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>

                    <div className="md:hidden">
                        <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <Menu className="h-6 w-6 text-muted-foreground" />
                        </Button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-white/90 dark:bg-background border-t border-border pb-8 shadow-lg"
                    >
                        <nav className="flex flex-col space-y-4 px-6 py-6">
                            {navLinks.map(link => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="text-base font-medium text-muted-foreground hover:text-primary px-5 py-4 rounded-xl transition"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="flex flex-col space-y-4 pt-6 border-t border-border">
                                <Button variant="ghost" className="flex items-center gap-2 text-base text-muted-foreground">
                                    <LogIn className="w-5 h-5" /> <span>Masuk</span>
                                </Button>
                                <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-full text-base">
                                    <UserPlus className="w-5 h-5" /> <span>Daftar</span>
                                </Button>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Navbar;
