import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const LiveStats = () => {
    const [stats, setStats] = useState({
        github: { repos: 0, followers: 0, loading: true, error: false },
        leetcode: { solved: 0, rank: 0, loading: true, error: false },
    });

    useEffect(() => {
        const fetchStats = async () => {
            // Fetch GitHub
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

            // Fetch LeetCode
            try {
                const lcRes = await fetch('https://leetcode-stats-api.herokuapp.com/BhargaviTejaswi');
                const lcData = await lcRes.json();
                if (lcData.status === "success") {
                    setStats(prev => ({
                        ...prev,
                        leetcode: { solved: lcData.totalSolved || 0, rank: lcData.ranking || 0, loading: false, error: false }
                    }));
                } else {
                    throw new Error("API Limit");
                }
            } catch (e) {
                setStats(prev => ({ ...prev, leetcode: { ...prev.leetcode, loading: false, error: true } }));
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        {
            platform: "GitHub Archive",
            id: "bhargavibattula",
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
        <section className="py-24 px-6 md:px-8 bg-[#030412] relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            
            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="mb-20 space-y-4 text-center md:text-left">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-mint/20 bg-mint/5 backdrop-blur-3xl mb-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-mint">System Metrics</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white italic">
                        Live Coding <span className="text-white/10">Activity</span>
                    </h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30 italic">Real-time developer performance & transmission diagnostics</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {statCards.map((card, idx) => (
                        <motion.div
                            key={card.platform}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className={`group relative p-10 bg-white/[0.02] backdrop-blur-3xl border-2 ${card.border} rounded-[40px] overflow-hidden transition-all hover:bg-white/[0.04] ${card.glow}`}
                        >
                            <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${card.accent} blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform`} />
                            
                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div className="flex items-center justify-between mb-12">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-white/10 transition-colors">
                                            {card.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-black uppercase text-white tracking-widest leading-none mb-2">{card.platform}</h4>
                                            <p className="text-[9px] font-bold text-white/30 uppercase tracking-[0.4em]">Node: {card.id}</p>
                                        </div>
                                    </div>
                                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[8px] font-black uppercase tracking-widest text-white/40 group-hover:text-mint group-hover:border-mint transition-all">
                                        ⚡ Live
                                    </div>
                                </div>

                                <div className="space-y-12">
                                    <div className="grid grid-cols-2 gap-8">
                                        {card.metrics.map((metric) => (
                                            <div key={metric.label} className="space-y-3">
                                                <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">{metric.label}</p>
                                                <div className="flex items-baseline gap-1">
                                                    <AnimatePresence mode="wait">
                                                        {card.loading ? (
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
                                            whileInView={{ width: '100%' }}
                                            transition={{ duration: 2, ease: "easeOut" }}
                                            className={`h-full bg-gradient-to-r ${card.accent.replace('/20', '')}`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LiveStats;
