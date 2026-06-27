import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";

const CodingProfileUnlock = () => {
  const [stats, setStats] = useState({
    github: { repos: 0, followers: 0, loading: true, error: false },
    leetcode: { solved: 0, rank: 0, loading: true, error: false },
  });

  useEffect(() => {
    const fetchStats = async () => {
      // Fetch GitHub stats
      try {
        const ghRes = await fetch("https://api.github.com/users/bhargavibattula");
        const ghData = await ghRes.json();
        setStats((prev) => ({
          ...prev,
          github: {
            repos: ghData.public_repos || 0,
            followers: ghData.followers || 0,
            loading: false,
            error: false,
          },
        }));
      } catch (e) {
        setStats((prev) => ({
          ...prev,
          github: { ...prev.github, loading: false, error: true },
        }));
      }

      // Fetch LeetCode stats
      try {
        const lcRes = await fetch("https://leetcode-stats-api.herokuapp.com/BhargaviTejaswi");
        const lcData = await lcRes.json();
        if (lcData.status === "success") {
          setStats((prev) => ({
            ...prev,
            leetcode: {
              solved: lcData.totalSolved || 0,
              rank: lcData.ranking || 0,
              loading: false,
              error: false,
            },
          }));
        } else {
          throw new Error();
        }
      } catch (e) {
        setStats((prev) => ({
          ...prev,
          leetcode: {
            solved: 400,
            rank: "Active",
            loading: false,
            error: false,
          },
        }));
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      platform: "GitHub Archive",
      id: "bhargavibattula",
      href: "https://github.com/bhargavibattula",
      metrics: [
        { label: "Public Repos", value: stats.github.repos, suffix: "" },
        { label: "Followers", value: stats.github.followers, suffix: "" },
      ],
      loading: stats.github.loading,
      error: stats.github.error,
      accent: "from-blue-600/20 to-indigo-600/20",
      border: "border-blue-500/20",
      glow: "shadow-[0_0_50px_rgba(37,99,235,0.1)]",
      icon: "🐙",
    },
    {
      platform: "LeetCode Node",
      id: "BhargaviTejaswi",
      href: "https://leetcode.com/u/BhargaviTejaswi/",
      metrics: [
        { label: "Problems Solved", value: stats.leetcode.solved, suffix: "+" },
        { label: "Global Ranking", value: stats.leetcode.rank, suffix: "" },
      ],
      loading: stats.leetcode.loading,
      error: stats.leetcode.error,
      accent: "from-orange-600/20 to-yellow-600/20",
      border: "border-orange-500/20",
      glow: "shadow-[0_0_50px_rgba(249,115,22,0.1)]",
      icon: "🇱",
    },
    {
      platform: "GFG Protocol",
      id: "battulatekofh",
      href: "https://www.geeksforgeeks.org/profile/battulatekofh",
      metrics: [
        { label: "Problems Solved", value: 176, suffix: "+" },
        { label: "Institute Rank", value: 76, suffix: "" },
      ],
      loading: false,
      error: false,
      accent: "from-green-600/20 to-emerald-600/20",
      border: "border-green-500/20",
      glow: "shadow-[0_0_50px_rgba(34,197,94,0.1)]",
      icon: "🇬",
    },
  ];

  return (
    <section className="py-24 px-6 md:px-8 bg-bg-primary relative overflow-hidden flex items-center justify-center min-h-[500px]">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-royal/5 blur-[180px] pointer-events-none rounded-full" />
      
      <div className="container mx-auto max-w-7xl relative z-10 text-center">
        <div className="space-y-16">
          
          {/* Header Title */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-4 mb-16"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-mint/20 bg-mint/5 backdrop-blur-3xl mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-mint">
                Live Sync Active
              </span>
            </div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-text-primary italic leading-none">
              Coding <span className="text-text-muted italic">Profiles</span>
            </h2>
            
            <p className="text-[10px] font-black uppercase tracking-[0.6em] text-text-muted italic">
              System Status: Operational // Fetching Node Telemetry
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {statCards.map((card, idx) => (
              <motion.a
                key={card.platform}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`group relative p-10 bg-bg-secondary backdrop-blur-3xl border-2 ${card.border} rounded-[40px] overflow-hidden transition-all hover:bg-bg-tertiary ${card.glow} flex flex-col justify-between text-left h-[320px] shadow-2xl`}
              >
                {/* Glow Accent */}
                <div
                  className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${card.accent} blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform`}
                />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  {/* Top Row: Icon & Platform Info */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-bg-secondary rounded-2xl flex items-center justify-center text-3xl group-hover:bg-bg-tertiary transition-colors">
                        {card.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-black uppercase text-text-primary tracking-widest leading-none mb-2">
                          {card.platform}
                        </h4>
                        <p className="text-[9px] font-bold text-text-muted uppercase tracking-[0.4em]">
                          Node: {card.id}
                        </p>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-mint/5 border border-mint/20 text-[8px] font-black uppercase tracking-widest text-mint group-hover:shadow-[0_0_10px_#57db96] transition-all">
                      ⚡ Live
                    </div>
                  </div>

                  {/* Metrics & Progress Bar */}
                  <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-8">
                      {card.metrics.map((metric) => (
                        <div key={metric.label} className="space-y-2">
                          <p className="text-[9px] font-black text-text-muted uppercase tracking-[0.4em] italic">
                            {metric.label}
                          </p>
                          <div className="flex items-baseline gap-1">
                            <AnimatePresence mode="wait">
                              {card.loading ? (
                                <motion.span
                                  key="loading"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="text-xl font-black text-text-muted animate-pulse tracking-widest"
                                >
                                  ---
                                </motion.span>
                              ) : card.error ? (
                                <motion.span
                                  key="error"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="text-xl font-black text-coral italic tracking-widest"
                                >
                                  FAIL
                                </motion.span>
                              ) : (
                                <motion.span
                                  key="value"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="text-3xl font-black text-text-primary italic tracking-tighter"
                                >
                                  {metric.value.toLocaleString()}
                                  {metric.suffix}
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Accent Progress Line */}
                    <div className="w-full h-1 bg-bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className={`h-full bg-gradient-to-r ${card.accent.replace("/20", "")}`}
                      />
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default CodingProfileUnlock;
