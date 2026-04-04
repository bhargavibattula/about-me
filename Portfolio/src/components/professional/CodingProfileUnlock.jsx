import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const CodingProfileUnlock = () => {
    const [isUnlocked, setIsUnlocked] = useState(false);

    const profiles = [
        {
            platform: "GeeksforGeeks",
            id: "BATTULA BHARGAVI",
            stat: "TOP RANK // 150+ SOLVED",
            href: "https://www.geeksforgeeks.org/profile/battulatekofh",
            icon: "🇬",
            accent: "from-green-500/20 to-emerald-500/20",
            hoverAccent: "group-hover:border-green-500/50"
        },
        {
            platform: "LeetCode Hub",
            id: "BHARGAVITEJASWI",
            stat: "450+ PROBLEMS SOLVED",
            href: "https://leetcode.com/u/BhargaviTejaswi/",
            icon: "🇱",
            accent: "from-orange-500/20 to-yellow-500/20",
            hoverAccent: "group-hover:border-orange-500/50"
        }
    ];

    return (
        <section className="py-32 px-6 md:px-8 bg-[#030412] relative overflow-hidden flex items-center justify-center min-h-[600px]">
             {/* Background Decoration */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-royal/5 blur-[180px] pointer-events-none rounded-full" />
             <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-mint/5 blur-[150px] opacity-20 pointer-events-none" />

             <div className="container mx-auto max-w-4xl relative z-10 text-center">
                <AnimatePresence mode="wait">
                    {!isUnlocked ? (
                        <motion.div 
                            key="locked"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1, blur: '20px' }}
                            className="bg-white/[0.03] backdrop-blur-3xl border border-white/5 rounded-[48px] p-16 md:p-24 shadow-2xl relative group"
                        >
                            {/* Decorative Lines */}
                            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                            <motion.div 
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="w-24 h-24 bg-mint/10 border border-mint/20 rounded-3xl flex items-center justify-center text-4xl shadow-[0_0_50px_rgba(87,219,150,0.2)] mx-auto mb-10"
                            >
                                🔒
                            </motion.div>

                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6 italic">
                                Unlock My <br />
                                <span className="text-white/20 italic">Coding World</span>
                            </h2>
                            
                            <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.6em] text-white/30 mb-12 block">Secure Profile Protocols Active</p>

                            <motion.button 
                                whileHover={{ scale: 1.05, letterSpacing: '0.4em' }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setIsUnlocked(true)}
                                className="px-12 py-5 bg-white text-black font-black uppercase text-[11px] tracking-[0.3em] rounded-2xl hover:bg-mint hover:text-black transition-all shadow-[0_20px_40px_rgba(255,255,255,0.05)] active:scale-95"
                            >
                                Click to Unlock
                            </motion.button>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="unlocked"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-16"
                        >
                            <motion.div 
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-col items-center gap-4"
                            >
                                <div className="text-[10px] font-black uppercase tracking-[0.8em] text-mint mb-4 block underline underline-offset-8 decoration-mint/50 animate-pulse">Access Granted // Archives Unlocked</div>
                                <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none italic">Technical <br /> <span className="text-white/20 italic">Blueprints</span></h2>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {profiles.map((profile, i) => (
                                    <motion.div 
                                        key={profile.platform}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + (i * 0.1) }}
                                        whileHover={{ y: -8 }}
                                        className={`group relative p-12 bg-white/[0.03] backdrop-blur-3xl border border-white/5 rounded-[40px] overflow-hidden transition-all ${profile.hoverAccent}`}
                                    >
                                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${profile.accent} blur-[48px] -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform`} />
                                        
                                        <div className="relative z-10 text-left">
                                            <div className="flex items-center gap-4 mb-10">
                                                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-white/10 transition-colors">
                                                    {profile.icon}
                                                </div>
                                                <div>
                                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 block mb-1">Platform</span>
                                                    <h4 className="text-2xl font-black uppercase text-white tracking-tight italic">{profile.platform}</h4>
                                                </div>
                                            </div>

                                            <div className="space-y-10">
                                                <div className="space-y-3">
                                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Credential Status</p>
                                                    <div className="flex items-center gap-4">
                                                        <div className="text-xs font-black text-white/70 uppercase tracking-widest">{profile.id}</div>
                                                        <div className="h-px flex-1 bg-white/5" />
                                                        <div className="text-[10px] font-black text-mint uppercase tracking-widest bg-mint/5 px-3 py-1 rounded-full border border-mint/10">{profile.stat}</div>
                                                    </div>
                                                </div>

                                                <a 
                                                    href={profile.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.3em] text-white group-hover:text-mint transition-all"
                                                >
                                                    <span className="border-b-2 border-white/10 pb-2 group-hover:border-mint transition-all">View Full Profile ➔</span>
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
             </div>
        </section>
    );
};

export default CodingProfileUnlock;
