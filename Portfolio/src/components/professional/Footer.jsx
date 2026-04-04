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

    const collaborationCards = [
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
            label: "Aesthetic Hub",
            name: "Instagram Node",
            href: "https://www.instagram.com/__magicalgirl___",
            detail: "Visual Fragments & Daily Synapse",
            action: "@__MAGICALGIRL___ ➔",
            color: "group-hover:text-fuchsia",
            bg: "bg-fuchsia/5"
        },
        {
            label: "Direct Protocol",
            name: "Transmission",
            href: "#",
            detail: email,
            action: "ESTABLISH_UPLINK ➔",
            color: "group-hover:text-mint",
            bg: "bg-mint/5",
            isEmail: true
        }
    ];

    const navLinks = [
        { name: 'Home', href: '#' },
        { name: 'About', href: '#about' },
        { name: 'Arena', href: '#arena' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Terminal', href: '#terminal' }
    ];

    const socials = [
        { name: 'GitHub', href: 'https://github.com/bhargavibattula', icon: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' },
        { name: 'LinkedIn', href: 'https://www.linkedin.com/in/battula-bhargavi-tejaswi', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
        { name: 'LeetCode', href: 'https://leetcode.com/u/BhargaviTejaswi/', icon: 'M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.332-4.363c.467-.467 1.112-.662 1.824-.662.712 0 1.357.195 1.823.662l2.697 2.606c.514.515 1.335.515 1.849 0 .515-.515.515-1.335 0-1.849l-2.697-2.606c-1.086-1.086-2.56-1.576-4.216-1.576-1.656 0-3.13.49-4.215 1.576l-4.332 4.363c-1.086 1.086-1.575 2.56-1.575 4.215 0 1.656.489 3.13 1.575 4.216l4.332 4.363c1.085 1.086 2.56 1.575 4.215 1.575 1.655 0 3.129-.489 4.216-1.575l2.697-2.607c.515-.514.515-1.334 0-1.848-.514-.515-1.335-.515-1.849 0z M23.103 14.288l-3.328-3.352c-.515-.515-1.335-.515-1.849 0s-.515 1.335 0 1.849l3.328 3.352c.515.514 1.335.514 1.849 0s.515-1.335 0-1.849z' }
    ];

    return (
        <footer id="contact" className="bg-[#030412] pt-32 pb-16 px-6 md:px-8 overflow-hidden relative border-t border-white/5">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mint/[0.02] to-royal/[0.02] pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-royal/5 blur-[180px] pointer-events-none" />

            <div className="container mx-auto max-w-7xl relative z-10">

                {/* --- SECTOR A: COLLABORATION CARDS --- */}
                <div className="mb-40">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="mb-16 md:mb-24"
                    >
                        <span className="text-xs font-black uppercase tracking-[0.8em] text-mint mb-6 block">Final Protocol // Direct Uplink</span>
                        <h2 className="text-6xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] italic opacity-80 group transition-all">
                            Let's <br />
                            <span className="text-white/10 italic group-hover:text-white/20 transition-all">Collaborate</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {collaborationCards.map((link, i) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                onClick={link.isEmail ? handleCopy : undefined}
                                className={`group relative p-8 md:p-10 bg-white/[0.03] border border-white/5 rounded-[32px] md:rounded-[40px] overflow-hidden hover:border-white/20 transition-all hover:-translate-y-2 flex flex-col justify-between h-[320px] md:h-[350px]`}
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 blur-[48px] -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform ${link.bg}`} />
                                <div className="relative z-10">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 group-hover:text-white transition-colors">{link.label}</span>
                                        {link.isEmail && copied && (
                                            <AnimatePresence>
                                                <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} className="text-[8px] font-black text-mint uppercase tracking-widest bg-mint/10 px-3 py-1 rounded-full">Copied</motion.span>
                                            </AnimatePresence>
                                        )}
                                    </div>
                                    <h4 className={`text-2xl md:text-3xl font-black uppercase tracking-tighter text-white mt-8 transition-colors ${link.color}`}>{link.name}</h4>
                                    <p className="text-[11px] text-white/40 mt-4 uppercase font-black tracking-widest leading-relaxed">
                                        {link.detail}
                                    </p>
                                </div>
                                <div className="mt-12 text-[11px] font-black text-white/20 group-hover:text-white transition-colors uppercase tracking-[0.3em] font-mono">{link.action}</div>
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* --- SECTOR B: PROFESSIONAL SYSTEM FOOTER --- */}
                <div className="pt-24 border-t border-white/5">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12 mb-24">

                        {/* Identity Pillar */}
                        <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="space-y-10">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-black uppercase tracking-tighter text-white leading-none">
                                    BATTULA<br />
                                    <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-mint via-white to-royal">BHARGAVI.</span>
                                </h2>
                                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 italic">Full-Stack Architect</p>
                            </div>
                            <div className="flex gap-5">
                                {socials.map((social) => (
                                    <motion.a
                                        key={social.name} href={social.href} target="_blank"
                                        whileHover={{ y: -5, scale: 1.1 }}
                                        className="w-12 h-12 rounded-[18px] bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/20 hover:text-mint hover:border-mint/30 transition-all shadow-xl"
                                    >
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d={social.icon} /></svg>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Navigation Pillar */}
                        <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="space-y-10 lg:pl-12">
                            <h4 className="text-[11px] font-black uppercase tracking-[0.6em] text-white/50 italic flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full border border-white/20" /> Navigation
                            </h4>
                            <ul className="space-y-5">
                                {navLinks.map((link) => (
                                    <li key={link.name}>
                                        <a href={link.href} className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/25 hover:text-white transition-all flex items-center gap-3 group">
                                            <span className="w-1.5 h-1.5 border border-white/10 rounded-full group-hover:bg-mint transition-all" />
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Contact Pillar */}
                        <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-10">
                            <h4 className="text-[11px] font-black uppercase tracking-[0.6em] text-white/50 italic flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full border border-white/20" /> Synapse
                            </h4>
                            <div className="space-y-8">
                                <div className="group cursor-pointer" onClick={() => navigator.clipboard.writeText(email)}>
                                    <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/15 mb-2 italic">Direct Transmission</p>
                                    <p className="text-[11px] font-black text-white/50 group-hover:text-mint transition-colors tracking-widest">{email}</p>
                                </div>
                                <a href="https://www.linkedin.com/in/battula-bhargavi-tejaswi" target="_blank" className="block group">
                                    <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/15 mb-2 italic">LinkedIn Node</p>
                                    <p className="text-[11px] font-black text-white/50 group-hover:text-white transition-colors tracking-widest">/in/battula-bhargavi-tejaswi</p>
                                </a>
                            </div>
                        </motion.div>

                        {/* Status Pillar */}
                        <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="space-y-10">
                            <div className="space-y-4">
                                <h4 className="text-[11px] font-black uppercase tracking-[0.6em] text-mint italic">Status</h4>
                                <div className="w-full h-px bg-mint/10" />
                            </div>
                            <div className="space-y-8">
                                <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full border border-mint/20 bg-mint/[0.02] shadow-2xl">
                                    <div className="w-2.5 h-2.5 rounded-full bg-mint shadow-[0_0_15px_#57db96] animate-pulse" />
                                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-mint font-mono">Available for hire</span>
                                </div>
                                <a
                                    href="https://drive.google.com/file/d/1y-B7hoUDK0j8CgEcVLhcQla7tMHAmIAx/view"
                                    target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.5em] text-white/40 hover:text-mint transition-all group"
                                >
                                    <span className="border-b border-white/5 pb-2 group-hover:border-mint transition-all">View Resume ↓</span>
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Final Bottom Peripheral */}
                    <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 text-[9px] font-black uppercase tracking-[0.5em] text-white/10 uppercase">
                        <div className="flex items-center gap-4">
                            © 2026 B_B_TEJASWI <span className="w-1 h-1 bg-white/10 rounded-full" /> ARCHITECTED_PERFECTION
                        </div>
                        <div className="flex gap-10 items-center">
                            <span className="italic opacity-50">REACT // TAILWIND // FASTAPI // LANGGRAPH</span>
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="w-12 h-12 rounded-2xl border border-white/5 flex items-center justify-center hover:text-mint hover:border-mint/50 transition-all shadow-2xl bg-white/[0.01]"
                            >
                                ↑
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
