import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const Footer = () => {
    const [copied, setCopied] = useState(false);
    const email = "BHARGAVITEJASWI97@GMAIL.COM";

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const links = [
        { 
            label: "Project Hub", 
            name: "GitHub Hub", 
            href: "https://github.com/bhargavibattula", 
            detail: "Architect & AI Profile Archive",
            action: "BHARGAVIBATTULA ➔",
            color: "group-hover:text-mint",
            bg: "bg-mint/5"
        },
        { 
            label: "Professional Node", 
            name: "LinkedIn Node", 
            href: "https://www.linkedin.com/in/battula-bhargavi-tejaswi", 
            detail: "Direct Career Decryption Synapse",
            action: "BATTULA-BHARGAVI ➔",
            color: "group-hover:text-royal",
            bg: "bg-royal/5"
        },
        { 
            label: "Algorithm Core", 
            name: "LeetCode Core", 
            href: "https://leetcode.com/u/BhargaviTejaswi/", 
            detail: "Data Integrity & Neural Logic",
            action: "CODE_SOLVER ➔",
            color: "group-hover:text-fuchsia",
            bg: "bg-fuchsia/5"
        }
    ];

    return (
        <section id="contact" className="py-20 md:py-32 px-6 md:px-8 overflow-hidden bg-[#030412] relative border-t border-white/5">
            {/* Background Neural Atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mint/5 to-royal/5 opacity-20 blur-[180px] pointer-events-none" />
            
            <div className="container mx-auto max-w-6xl relative z-10">
                <motion.div 
                    initial={{ y: 20, opacity: 0 }} 
                    whileInView={{ y: 0, opacity: 1 }} 
                    viewport={{ once: true }} 
                    className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-10"
                >
                    <div>
                        <span className="text-xs font-black uppercase tracking-[0.8em] text-mint mb-6 block">Final Protocol // Direct Uplink</span>
                        <h2 className="text-6xl md:text-[10rem] font-black uppercase tracking-tighter leading-none italic opacity-80 transition-opacity hover:opacity-100">Let's <br /> <span className="text-white/10 italic">Collaborate</span></h2>
                    </div>
                </motion.div>

                {/* Professional Contact Nodes - Grid Responsiveness */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-24 md:mb-40">
                    {links.map((link, i) => (
                        <motion.a 
                            key={link.name}
                            href={link.href} 
                            target="_blank" 
                            initial={{ y: 30, opacity: 0 }} 
                            whileInView={{ y: 0, opacity: 1 }} 
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`group relative p-8 md:p-10 bg-white/5 border border-white/5 rounded-[32px] md:rounded-[40px] overflow-hidden hover:border-white/20 transition-all hover:-translate-y-2 flex flex-col justify-between`}
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 blur-[48px] -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform ${link.bg}`} />
                            <div className="relative z-10">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 group-hover:text-white transition-colors">{link.label}</span>
                                <h4 className={`text-2xl md:text-3xl font-black uppercase tracking-tighter text-white mt-8 transition-colors ${link.color}`}>{link.name}</h4>
                                <p className="text-[11px] text-white/40 mt-4 uppercase font-black tracking-widest leading-relaxed">
                                    {link.detail}
                                </p>
                            </div>
                            <div className="mt-12 text-[11px] font-black text-white/20 group-hover:text-white transition-colors uppercase tracking-[0.3em] font-mono">{link.action}</div>
                        </motion.a>
                    ))}

                    {/* Unified Email Transmission Node */}
                    <motion.div 
                        initial={{ y: 30, opacity: 0 }} 
                        whileInView={{ y: 0, opacity: 1 }} 
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        onClick={handleCopy}
                        className="group relative p-8 md:p-10 bg-white/5 border border-white/5 rounded-[32px] md:rounded-[40px] overflow-hidden hover:border-mint/50 transition-all hover:-translate-y-2 cursor-pointer flex flex-col justify-between"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-mint/10 blur-[48px] -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform" />
                        <div className="relative z-10">
                            <div className="flex justify-between items-start">
                                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 group-hover:text-white transition-colors">Direct Protocol</span>
                                 <AnimatePresence>
                                    {copied && <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} className="text-[8px] font-black text-mint uppercase tracking-widest bg-mint/10 px-3 py-1 rounded-full">Record_Copied</motion.span>}
                                 </AnimatePresence>
                            </div>
                            <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white mt-8 group-hover:text-mint transition-colors">Transmission</h4>
                            <p className="text-[11px] text-white/40 mt-4 uppercase font-black tracking-widest leading-relaxed truncate">{email}</p>
                        </div>
                        <div className="mt-12 text-[11px] font-black text-white/20 group-hover:text-white transition-colors uppercase tracking-[0.3em] font-mono">ESTABLISH_UPLINK ➔</div>
                    </motion.div>
                </div>

                {/* Secure Professional Signature */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-16 md:pt-24 border-t border-white/5 gap-10">
                     <div className="flex flex-col items-center md:items-start gap-3">
                         <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] text-white/20 italic">
                             Architected by B_B_Tejaswi // MMXXVI
                             <div className="flex gap-2">
                                <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="h-1.5 w-1.5 bg-mint rounded-full" />
                                <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="h-1.5 w-1.5 bg-royal rounded-full" />
                                <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="h-1.5 w-1.5 bg-fuchsia rounded-full" />
                             </div>
                         </div>
                         <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/10 italic">Core_Interface // Professional Portfolio System V3.0</div>
                     </div>
                     <div className="flex gap-12 order-first md:order-last">
                         <a href="https://github.com/bhargavibattula" target="_blank" className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-all">Hub</a>
                         <a href="https://www.linkedin.com/in/battula-bhargavi-tejaswi" target="_blank" className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-all">Node</a>
                         <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-[11px] font-black uppercase tracking-[0.3em] text-mint hover:text-white transition-all italic underline underline-offset-8 decoration-mint/20">Zenith ⮝</button>
                     </div>
                </div>
            </div>
        </section>
    );
};

export default Footer;
