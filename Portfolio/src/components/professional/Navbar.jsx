import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const h = document.documentElement, 
                  b = document.body,
                  st = 'scrollTop',
                  sh = 'scrollHeight';
            const percent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
            setScrollProgress(percent);
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Dossier', href: '#about' },
        { label: 'Arena', href: '#arena' },
        { label: 'Archive', href: '#skills' },
        { label: 'Projects', href: '#projects' },
        { label: 'Terminal', href: '#terminal' },
    ];

    return (
        <>
            <nav 
                className={`fixed top-0 left-0 w-full z-[2000] transition-all duration-500 ${
                    scrolled 
                    ? 'py-4 bg-primary/60 backdrop-blur-3xl border-b border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.3)]' 
                    : 'py-8 bg-transparent'
                }`}
            >
                {/* Micro Scan Beam (Scroll Progress) */}
                <div className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-mint via-royal to-fuchsia transition-all duration-100" style={{ width: `${scrollProgress}%` }} />

                <div className="container mx-auto px-8 flex justify-between items-center relative z-10">
                    <a href="#" className="flex items-center gap-4 group">
                        <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white font-black text-xl group-hover:bg-mint group-hover:text-black hover:scale-110 transition-all duration-500 shadow-xl">B</div>
                        <div className="flex flex-col">
                            <span className="text-[11px] font-black uppercase tracking-[0.4em] hidden md:block group-hover:text-mint transition-colors">Bhargavi.Architecture</span>
                            <span className="text-[7px] font-black uppercase tracking-[1em] text-white/20 hidden md:block">System Node 01</span>
                        </div>
                    </a>

                    {/* Desktop Nav - Professional Grid */}
                    <div className="hidden md:flex items-center gap-10">
                        {navLinks.map(link => (
                            <a 
                                key={link.label} 
                                href={link.href} 
                                className="text-[9px] font-black uppercase tracking-[0.6em] text-white/40 hover:text-white transition-all relative group"
                            >
                                {link.label}
                                <span className="absolute -bottom-2 left-0 w-0 h-[1.5px] bg-mint group-hover:w-full transition-all duration-500" />
                            </a>
                        ))}
                        
                        <div className="h-6 w-[1px] bg-white/10 mx-4" />
                        
                        <a href="#contact" className="px-10 py-3.5 bg-white text-black font-black uppercase text-[9px] tracking-[0.4em] rounded-full hover:bg-mint hover:text-black transition-all shadow-xl active:scale-95">
                            Let's Connect ➔
                        </a>
                    </div>

                    {/* Mobile Toggle - Architectural */}
                    <button 
                        onClick={() => setMobileOpen(!mobileOpen)} 
                        className="md:hidden w-12 h-12 flex flex-col items-center justify-center gap-2 bg-white/5 rounded-full border border-white/10 relative z-[2001]"
                    >
                        <span className={`h-0.5 bg-white transition-all duration-500 ${mobileOpen ? 'rotate-45 translate-y-1.5 w-6' : 'w-6'}`} />
                        <span className={`h-0.5 bg-white transition-all duration-500 ${mobileOpen ? '-rotate-45 -translate-y-1.5 w-6' : 'w-4'}`} />
                    </button>
                </div>

                {/* Mobile Menu Overlay - Immersive Fullscreen */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div 
                            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                            animate={{ opacity: 1, backdropFilter: 'blur(30px)' }}
                            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                            className="fixed inset-0 h-screen bg-black/90 z-[1999] flex flex-col items-center justify-center text-center p-12 overflow-hidden"
                        >
                            {/* Decorative Background for Mobile Nav */}
                            <div className="absolute top-0 right-0 w-full h-full bg-mint/5 pointer-events-none blur-[150px] opacity-20" />
                            
                            <div className="flex flex-col gap-12 relative z-10 w-full">
                                {navLinks.map((link, i) => (
                                    <motion.a 
                                        key={link.label} 
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                        href={link.href} 
                                        onClick={() => setMobileOpen(false)} 
                                        className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white/20 hover:text-white hover:italic transition-all duration-500"
                                    >
                                        {link.label}
                                    </motion.a>
                                ))}
                                
                                <motion.a 
                                    href="#contact" 
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                                    transition={{ delay: 0.6 }}
                                    onClick={() => setMobileOpen(false)} 
                                    className="px-16 py-6 bg-white text-black font-black uppercase text-xs tracking-[0.6em] rounded-full mt-20 inline-block self-center shadow-2xl"
                                >
                                    Let's Connect ➔
                                </motion.a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
};

export default Navbar;
