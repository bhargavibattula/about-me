import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const Arena = () => {
    const [activeTab, setActiveTab] = useState('profiles');
    const [score, setScore] = useState(0);
    const [gameActive, setGameActive] = useState(false);
    const [bugs, setBugs] = useState([]);
    const [missed, setMissed] = useState(0);

    const tabs = [
        { id: 'profiles', label: 'Profiles', icon: '🌐' },
        { id: 'trophies', label: 'Trophies', icon: '🏆' },
        { id: 'bughunt', label: 'Bug Hunt', icon: '🐛' },
        { id: 'resume', label: 'Resume', icon: '📄' }
    ];

    const profiles = [
        { name: 'GitHub', handle: 'B-Tejaswi-Bhargavi', count: '14+ Repos', stat: 'Software Dev', color: 'from-gray-800 to-black', link: 'https://github.com/B-Tejaswi-Bhargavi' },
        { name: 'LeetCode', handle: 'BhargaviTejaswi', count: 'Algorithms', stat: 'Problem Solver', color: 'from-orange-600 to-orange-400', link: 'https://leetcode.com/u/BhargaviTejaswi/' },
        { name: 'LinkedIn', handle: 'Bhargavi Tejaswi', count: 'Professional', stat: 'Network Active', color: 'from-blue-700 to-blue-500', link: 'https://linkedin.com' }
    ];

    const trophies = [
        { title: 'Hackathon Winner — HealVerse', desc: 'Patient-centric healthcare app with AI diet recommendations.', year: '2025', rarity: 'EPIC', color: 'border-fuchsia/40 text-fuchsia bg-fuchsia/10' },
        { title: 'Best Idea Award — PRAJWALAN Hackathon (DeepNox)', desc: 'PRAJWALAN Hackathon winner for deepfake detection tool.', year: '2025', rarity: 'RARE', color: 'border-mint/40 text-mint bg-mint/10' },
        { title: 'Outstanding Implementation Award — NEXUS AI', desc: 'Autonomous multi-agent platform for software deployment.', year: '2026', rarity: 'LEGENDARY', color: 'border-orange/40 text-orange bg-orange/10' },
        { title: 'Special Category Winner — Web Dev Hackathon', desc: 'Recognition for high-performance interface architectures.', year: '2024', rarity: 'RARE', color: 'border-royal/40 text-royal bg-royal/10' },
    ];

    // Bug Hunt logic
    useEffect(() => {
        if (gameActive) {
            const interval = setInterval(() => {
                setBugs(prev => [...prev, { id: Date.now(), x: Math.random() * 80 + 10, y: -20, speed: Math.random() * 2 + 3 }]);
            }, 800);
            return () => clearInterval(interval);
        }
    }, [gameActive]);

    useEffect(() => {
        if (gameActive) {
            const interval = setInterval(() => {
                setBugs(prev => {
                    const next = prev.map(bug => ({ ...bug, y: bug.y + bug.speed })).filter(bug => {
                        if (bug.y > 100) {
                            setMissed(m => m + 1);
                            return false;
                        }
                        return true;
                    });
                    return next;
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [gameActive]);

    useEffect(() => {
        if (missed >= 5) {
            setGameActive(false);
            setBugs([]);
        }
    }, [missed]);

    const handleBugClick = (id) => {
        setScore(s => s + 100);
        setBugs(prev => prev.filter(bug => bug.id !== id));
    };

    return (
        <div className="h-full bg-black/20 flex flex-col font-mono cursor-default">
            {/* Sidebar Tabs */}
            <div className="flex h-full">
                <div className="w-20 md:w-48 bg-primary/40 border-r border-white/5 p-4 space-y-4 shrink-0">
                    <div className="hidden md:block mb-10 pl-4">
                        <div className="text-[10px] font-black uppercase text-white/20 tracking-[0.5em] mb-1">Tejaswi</div>
                        <div className="text-sm font-black uppercase text-white tracking-widest italic">The Arena</div>
                    </div>
                    {tabs.map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => { setActiveTab(tab.id); setGameActive(false); }}
                            className={`w-full flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl transition-all duration-300 border ${
                                activeTab === tab.id ? 'bg-mint/10 border-mint text-mint shadow-[0_0_20px_rgba(87,219,150,0.15)]' : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:border-white/20'
                            }`}
                        >
                            <span className="text-xl md:text-sm">{tab.icon}</span>
                            <span className="hidden md:block text-[10px] uppercase font-black tracking-widest">{tab.label}</span>
                        </button>
                    ))}
                    <div className="pt-20 hidden md:block pl-4 text-white/10 text-[9px] uppercase font-black select-none pointer-events-none">
                        VLT_ID: 1944.22
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-10 overflow-y-auto bg-gradient-to-br from-primary/10 to-black/30 relative">
                    <AnimatePresence mode="wait">
                        {activeTab === 'profiles' && (
                            <motion.div key="profiles" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {profiles.map(p => (
                                    <div key={p.name} className="bg-primary/40 border-2 border-white/10 p-8 rounded-3xl relative overflow-hidden group hover:border-white/20 transition-all hover:-translate-y-2">
                                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${p.color} opacity-10 blur-3xl`} />
                                        <div className="flex justify-between items-start mb-6 italic font-black text-2xl uppercase tracking-tighter text-white/40 group-hover:text-white transition-colors">{p.name}</div>
                                        <div className="flex flex-col gap-1 mb-8">
                                            <span className="text-fuchsia text-[10px] font-black uppercase tracking-widest font-mono italic">{p.handle}</span>
                                            <div className="text-4xl font-black text-white">{p.count}</div>
                                            <div className="text-[10px] text-mint font-black uppercase tracking-[0.4em]">{p.stat}</div>
                                        </div>
                                        <motion.a href={p.link} target="_blank" className="inline-flex items-center gap-4 text-[10px] font-black uppercase text-white/50 group-hover:text-white transition-colors">Access Profile <span className="group-hover:translate-x-2 transition-transform">➔</span></motion.a>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {activeTab === 'trophies' && (
                            <motion.div key="trophies" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                                {trophies.map((t, i) => (
                                    <div key={i} className={`p-8 rounded-3xl border-2 backdrop-blur-md transition-all group ${t.color}`}>
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-2xl opacity-40 group-hover:opacity-100 transition-opacity">🏆</span>
                                            <span className="text-[9px] font-black uppercase tracking-widest py-1 px-3 border border-current/30 rounded-full">{t.rarity}</span>
                                        </div>
                                        <h3 className="text-xl font-black uppercase text-white tracking-widest mb-2 leading-relaxed">{t.title}</h3>
                                        <p className="text-[11px] text-white/40 uppercase font-black leading-relaxed line-clamp-2">{t.desc}</p>
                                        <div className="mt-6 pt-6 border-t border-current/10 flex justify-between items-center text-[10px] font-black italic uppercase tracking-[0.3em]">
                                             <span>Date: {t.year}</span>
                                             <span>Dossier Record: {Math.floor(Math.random() * 900) + 100}</span>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {activeTab === 'bughunt' && (
                            <motion.div key="bughunt" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full relative overflow-hidden flex flex-col items-center justify-center p-12 bg-black/40 border-4 border-white/5 rounded-3xl">
                                {!gameActive ? (
                                    <div className="text-center space-y-6">
                                        <h3 className="text-coral text-[10px] font-black uppercase tracking-[1em] mb-2">Internal System Errors Found</h3>
                                        <h2 className="text-6xl text-white font-black uppercase tracking-tighter italic">Bug Hunt Mini-Game</h2>
                                        <p className="text-[10px] text-white/30 uppercase font-black tracking-widest">Click the bugs before they escape the buffer.</p>
                                        {missed >= 5 && <div className="text-coral uppercase font-black animate-pulse">Game Over // Missed: {missed} // Final Score: {score}</div>}
                                        <button 
                                            onClick={() => { setGameActive(true); setScore(0); setMissed(0); setBugs([]); }}
                                            className="px-10 py-5 bg-white text-black font-black uppercase text-sm tracking-[0.4em] hover:bg-mint hover:text-black transition-colors"
                                        >
                                            {missed >= 5 ? 'Re-Initialize Buffer' : 'Activate Scan'}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="absolute inset-0 z-40 bg-transparent">
                                        <div className="absolute top-10 left-10 text-[10px] font-black uppercase text-mint tracking-[1em]">Score: {score}</div>
                                        <div className="absolute top-10 right-10 text-[10px] font-black uppercase text-coral tracking-[1em]">Missed: {missed}/5</div>
                                        {bugs.map(bug => (
                                            <motion.button 
                                                key={bug.id} 
                                                onClick={() => handleBugClick(bug.id)}
                                                className="absolute text-4xl p-2 cursor-crosshair transform -translate-x-1/2 -translate-y-1/2 group"
                                                style={{ left: `${bug.x}%`, top: `${bug.y}%` }}
                                            >
                                                <div className="group-hover:scale-150 transition-transform">🐛</div>
                                            </motion.button>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {activeTab === 'resume' && (
                            <motion.div 
                                key="resume" 
                                initial={{ opacity: 0, y: 30 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                exit={{ opacity: 0, y: -30 }} 
                                className="max-w-5xl mx-auto pb-20"
                            >
                                <div className="bg-[#0b0f2a]/60 backdrop-blur-3xl border border-white/10 rounded-[40px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.6)] relative group">
                                     {/* Holographic Header */}
                                     <div className="bg-gradient-to-r from-royal/20 via-primary/40 to-mint/20 p-12 md:p-16 border-b border-white/5 relative overflow-hidden">
                                         <div className="absolute top-0 right-0 w-96 h-96 bg-mint/10 blur-[120px] -translate-y-1/2 translate-x-1/2" />
                                         <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-8">
                                             <div className="space-y-2">
                                                 <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-mint text-xs font-black uppercase tracking-[0.6em] mb-2">Lead Software Architect</motion.div>
                                                 <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">Battula Bhargavi <br />Tejaswi</h2>
                                             </div>
                                             <div className="text-right flex flex-col items-end gap-3">
                                                 <div className="text-xs font-bold text-white/40 uppercase tracking-widest font-mono">B-T-ARCHIVE // SRKR-2026</div>
                                                 <div className="flex gap-4">
                                                     <div className="px-5 py-2 bg-white/5 rounded-full border border-white/10 text-[9px] font-black uppercase text-white/50">9.22 CGPA</div>
                                                     <div className="px-5 py-2 bg-mint/10 rounded-full border border-mint/20 text-[9px] font-black uppercase text-mint italic">Active Intern</div>
                                                 </div>
                                             </div>
                                         </div>
                                     </div>

                                     {/* Main Content Grid */}
                                     <div className="p-12 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
                                         {/* Left Column: Experience & Projects */}
                                         <div className="lg:col-span-7 space-y-16">
                                             <section>
                                                 <h4 className="text-xs font-black text-white/20 uppercase tracking-[0.5em] mb-8 border-l-4 border-mint pl-6 font-mono">Work Decryption</h4>
                                                 <div className="space-y-10 relative pl-8 border-l border-white/5">
                                                     <div className="relative">
                                                         <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-mint shadow-[0_0_15px_#57db96]" />
                                                         <h5 className="text-xl font-black text-white uppercase mb-1">Yuganata AI — Software Intern</h5>
                                                         <div className="text-[10px] uppercase font-bold text-mint/60 mb-4 tracking-widest font-mono">Mar 2026 – Present</div>
                                                         <p className="text-sm text-white/60 leading-relaxed font-light">Leading the development of AI-based teaching avatars for educational platforms. Implementing textbook-based teaching chatbots using the MERN stack to support interactive learning.</p>
                                                     </div>
                                                 </div>
                                             </section>

                                             <section>
                                                 <h4 className="text-xs font-black text-white/20 uppercase tracking-[0.5em] mb-8 border-l-4 border-fuchsia pl-6 font-mono">System Blueprint (Projects)</h4>
                                                 <div className="grid grid-cols-1 gap-6">
                                                     {[
                                                        { name: 'NEXUS AI', tech: 'Next.js • LangGraph • FastAPI', desc: 'Autonomous multi-agent platform generating and deploying software from prompts.' },
                                                        { name: 'HEALVERSE', tech: 'Java • Spring Boot • React Native', desc: 'AI-driven patient healthcare app with diet optimization and medication tracking.' },
                                                        { name: 'DEEPNOX', tech: 'Python • TensorFlow • OpenCV', desc: 'Real-time deepfake detection browse extension with trust-scoring alerts.' }
                                                     ].map((p, i) => (
                                                        <div key={i} className="p-8 bg-white/5 border border-white/5 rounded-3xl group/p hover:border-white/20 transition-all hover:bg-white/10">
                                                            <div className="flex justify-between items-start mb-3">
                                                                <h6 className="text-lg font-black text-white uppercase tracking-wider">{p.name}</h6>
                                                                <span className="text-[9px] font-black text-white/30 uppercase font-mono tracking-widest">{p.tech}</span>
                                                            </div>
                                                            <p className="text-xs text-white/50 leading-relaxed font-light group-hover:text-white/70 transition-colors">{p.desc}</p>
                                                        </div>
                                                     ))}
                                                 </div>
                                             </section>
                                         </div>

                                         {/* Right Column: Skills & Contact */}
                                         <div className="lg:col-span-5 space-y-16">
                                             <section>
                                                 <h4 className="text-xs font-black text-white/20 uppercase tracking-[0.5em] mb-8 font-mono">Skill Matrix</h4>
                                                 <div className="space-y-6">
                                                     {[
                                                        { label: 'Programming', skills: 'Java, Python, C, JavaScript, HTML5/CSS3' },
                                                        { label: 'Back-End Core', skills: 'Spring Boot, FastAPI, REST APIs, Hibernate' },
                                                        { label: 'AI & Data', skills: 'LangChain, LangGraph, PostgreSQL, MongoDB' },
                                                        { label: 'Architecture', skills: 'React.js, TailwindCSS, NativeWind' }
                                                     ].map((s, i) => (
                                                        <div key={i} className="space-y-2">
                                                            <div className="text-[10px] font-black uppercase text-white/40 tracking-widest">{s.label}</div>
                                                            <div className="text-sm font-bold text-white/80">{s.skills}</div>
                                                            <div className="h-[2px] bg-white/5 w-full overflow-hidden mt-3 rounded-full">
                                                                <motion.div initial={{ width: 0 }} animate={{ width: `${80 + (i * 5)}%` }} className="h-full bg-gradient-to-r from-royal to-mint" />
                                                            </div>
                                                        </div>
                                                     ))}
                                                 </div>
                                             </section>

                                             <section className="p-8 bg-mint/5 rounded-[30px] border border-mint/10">
                                                 <h4 className="text-xs font-black text-mint uppercase tracking-[0.4em] mb-6">Contact Sync</h4>
                                                 <div className="space-y-4 font-mono text-xs">
                                                     <div className="flex justify-between group cursor-pointer border-b border-white/5 pb-3">
                                                         <span className="text-white/40">EMAIL</span>
                                                         <span className="text-white group-hover:text-mint transition-colors">bhargavibattula1234@gmail.com</span>
                                                     </div>
                                                     <div className="flex justify-between group cursor-pointer border-b border-white/5 pb-3">
                                                         <span className="text-white/40">PHONE</span>
                                                         <span className="text-white group-hover:text-mint transition-colors">+91-9346643045</span>
                                                     </div>
                                                     <div className="flex justify-between group cursor-pointer">
                                                         <span className="text-white/40">LOCATION</span>
                                                         <span className="text-white">BHIMAVARAM, AP</span>
                                                     </div>
                                                 </div>
                                                 <button className="w-full mt-10 py-5 bg-white text-black font-black uppercase text-[10px] tracking-[0.5em] hover:bg-mint transition-colors">Download Digital Dossier</button>
                                             </section>
                                         </div>
                                     </div>
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Arena;
