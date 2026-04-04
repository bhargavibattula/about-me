import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const CodingProfileUnlock = () => {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [stats, setStats] = useState({
        github: { repos: 0, followers: 0, loading: true, error: false },
        leetcode: { solved: 0, rank: 0, loading: true, error: false },
    });

    useEffect(() => {
        if (isUnlocked) {
            const fetchStats = async () => {
                try {
                    const ghRes = await fetch('https://api.github.com/users/bhargavibattula');
                    const ghData = await ghRes.json();
                    setStats(prev => ({
                        ...prev,
                        github: { repos: ghData.public_repos || 0, followers: ghData.followers || 0, loading: false, error: false }
                    }));
                } catch (e) {
                    setStats(prev => ({ ...prev, github: { ...prev.github, loading: false, error: true } }));
                }

                try {
                    const lcRes = await fetch('https://leetcode-stats-api.herokuapp.com/BhargaviTejaswi');
                    const lcData = await lcRes.json();
                    if (lcData.status === "success") {
                        setStats(prev => ({
                            ...prev,
                            leetcode: { solved: lcData.totalSolved || 0, rank: lcData.ranking || 0, loading: false, error: false }
                        }));
                    } else {
                        throw new Error();
                    }
                } catch (e) {
                    setStats(prev => ({ ...prev, leetcode: { ...prev.leetcode, loading: false, error: true } }));
                }
            };
            fetchStats();
        }
    }, [isUnlocked]);

    const statCards = [
        {
            platform: "GitHub Archive",
            id: "bhargavibattula",
            href: "https://github.com/bhargavibattula",
            metrics: [
                { label: "Public Repos", value: stats.github.repos, suffix: "" },
                { label: "Followers", value: stats.github.followers, suffix: "" }
            ],
            loading: stats.github.loading,
            error: stats.github.error,
            accent: "from-blue-600/20 to-indigo-600/20",
            border: "border-blue-500/20",
            glow: "shadow-[0_0_50px_rgba(37,99,235,0.1)]",
            icon: "🐙"
        },
        {
            platform: "LeetCode Node",
            id: "BhargaviTejaswi",
            href: "https://leetcode.com/u/BhargaviTejaswi/",
            metrics: [
                { label: "Problems Solved", value: stats.leetcode.solved, suffix: "+" },
                { label: "Global Ranking", value: stats.leetcode.rank, suffix: "" }
            ],
            loading: stats.leetcode.loading,
            error: stats.leetcode.error,
            accent: "from-orange-600/20 to-yellow-600/20",
            border: "border-orange-500/20",
            glow: "shadow-[0_0_50px_rgba(249,115,22,0.1)]",
            icon: "🇱"
        },
        {
            platform: "GFG Protocol",
            id: "battulatekofh",
            href: "https://www.geeksforgeeks.org/profile/battulatekofh",
            metrics: [
                { label: "Problems Solved", value: 176, suffix: "+" },
                { label: "Institute Rank", value: 76, suffix: "" }
            ],
            loading: false,
            error: false,
            accent: "from-green-600/20 to-emerald-600/20",
            border: "border-green-500/20",
            glow: "shadow-[0_0_50px_rgba(34,197,94,0.1)]",
            icon: "🇬"
        }
    ];

    return (
        <section className="py-24 px-6 md:px-8 bg-[#030412] relative overflow-hidden flex items-center justify-center min-h-[600px]">
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-royal/5 blur-[180px] pointer-events-none rounded-full" />

            <div className="container mx-auto max-w-7xl relative z-10 text-center">
                <AnimatePresence mode="wait">
                    {!isUnlocked ? (
                        <motion.div 
                            key="locked"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1, blur: '20px' }}
                            className="bg-white/[0.03] backdrop-blur-3xl border border-white/5 rounded-[48px] p-16 md:p-24 shadow-2xl relative group max-w-4xl mx-auto"
                        >
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
                            
                            <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.6em] text-white/30 mb-12 block uppercase">Secure Profile Protocols Active</p>

                            <motion.button 
                                whileHover={{ scale: 1.05, letterSpacing: '0.4em' }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setIsUnlocked(true)}
                                className="px-12 py-5 bg-white text-black font-black uppercase text-[11px] tracking-[0.3em] rounded-2xl hover:bg-mint hover:text-black transition-all shadow-xl active:scale-95"
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
                                className="flex flex-col items-center gap-4 mb-20"
                            >
                                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-mint/20 bg-mint/5 backdrop-blur-3xl mb-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-mint">System Metrics Unleashed</span>
                                </div>
                                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white italic leading-none">
                                    Live Coding <span className="text-white/20 italic">Activity</span>
                                </h2>
                                <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30 italic uppercase">Authorization Successful // Manifest Decrypted</p>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {statCards.map((card, idx) => (
                                    <motion.a
                                        key={card.platform}
                                        href={card.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + (idx * 0.1) }}
                                        whileHover={{ y: -10, scale: 1.02 }}
                                        className={`group relative p-10 bg-white/[0.02] backdrop-blur-3xl border-2 ${card.border} rounded-[40px] overflow-hidden transition-all hover:bg-white/[0.04] ${card.glow} flex flex-col justify-between text-left h-[350px] shadow-2xl`}
                                    >
                                        <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${card.accent} blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform`} />
                                        
                                        <div className="relative z-10 flex flex-col h-full justify-between">
                                            <div className="flex items-center justify-between mb-8">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-white/10 transition-colors">
                                                        {card.icon}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xl font-black uppercase text-white tracking-widest leading-none mb-2">{card.platform}</h4>
                                                        <p className="text-[9px] font-bold text-white/30 uppercase tracking-[0.4em]">Node: {card.id}</p>
                                                    </div>
                                                </div>
                                                <div className="px-3 py-1 rounded-full bg-mint/5 border border-mint/20 text-[8px] font-black uppercase tracking-widest text-mint group-hover:shadow-[0_0_10px_#57db96] transition-all">
                                                    ⚡ Live
                                                </div>
                                            </div>

                                            <div className="space-y-10">
                                                <div className="grid grid-cols-2 gap-8">
                                                    {card.metrics.map((metric) => (
                                                        <div key={metric.label} className="space-y-3">
                                                            <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] italic">{metric.label}</p>
                                                            <div className="flex items-baseline gap-1">
                                                                <AnimatePresence mode="wait">
                                                                    {metric.loading ? (
                                                                        <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-black text-white/20 animate-pulse tracking-widest">---</motion.span>
                                                                    ) : card.error ? (
                                                                        <motion.span key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-black text-coral italic tracking-widest">FAIL</motion.span>
                                                                    ) : (
                                                                        <motion.span 
                                                                            key="value" 
                                                                            initial={{ opacity: 0, y: 10 }} 
                                                                            animate={{ opacity: 1, y: 0 }}
                                                                            className="text-3xl font-black text-white italic tracking-tighter"
                                                                        >
                                                                            {metric.value.toLocaleString()}{metric.suffix}
                                                                        </motion.span>
                                                                    )}
                                                                </AnimatePresence>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                
                                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div 
                                                        initial={{ width: 0 }}
                                                        animate={{ width: '100%' }}
                                                        transition={{ duration: 2, ease: "easeOut" }}
                                                        className={`h-full bg-gradient-to-r ${card.accent.replace('/20', '')}`}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.a>
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
