import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import DataVault from './DataVault';

const TheArena = () => {
    const [activeTab, setActiveTab] = useState('victories');

    const tabs = [
        { id: 'victories', label: 'Victories', icon: '🏆' },
        { id: 'vault', label: 'Vault', icon: '🗄️' },
        { id: 'resume', label: 'Dossier', icon: '📄' }
    ];

    const trophies = [
        { title: 'RECORD #01 — Hackathon Winner — HealVerse', desc: 'DECRYPTED: Patient-centric archive with AI diet recommendations.', year: '2025', rarity: 'EPIC', color: 'border-fuchsia/40 text-fuchsia bg-fuchsia/10 shadow-[0_0_20px_rgba(202,47,140,0.1)]' },
        { title: 'RECORD #02 — Best Idea Award — PRAJWALAN Hackathon (DeepNox)', desc: 'DECRYPTED: PRAJWALAN Hackathon winner for deepfake detection tool.', year: '2025', rarity: 'RARE', color: 'border-mint/40 text-mint bg-mint/10 shadow-[0_0_20px_rgba(87,219,150,0.1)]' },
        { title: 'RECORD #03 — Outstanding Implementation Award — NEXUS AI', desc: 'DECRYPTED: Autonomous deployment platform — System Integrity 100%.', year: '2026', rarity: 'LEGENDARY', color: 'border-royal/40 text-royal bg-royal/10 shadow-[0_0_20px_rgba(92,51,204,0.1)]' },
        { title: 'RECORD #04 — Special Category Winner — Web Dev Hackathon', desc: 'DECRYPTED: Recognition for high-performance architectural UX.', year: '2024', rarity: 'RARE', color: 'border-aqua/40 text-aqua bg-aqua/10 shadow-[0_0_20px_rgba(51,194,204,0.1)]' },
    ];

    return (
        <section id="arena" className="py-20 md:py-32 px-6 md:px-8 overflow-hidden bg-[#030412]">
            <div className="container mx-auto max-w-6xl">
                 <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="mb-12 md:mb-20 text-center">
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.8em] text-royal mb-4 block">Competitive Edge // The Arena</span>
                    <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none italic">Victory <br /> <span className="text-white/10 italic">Archive</span></h2>
                </motion.div>

                {/* Navigation Tabs - Highly Responsive Scrollable Row */}
                <div className="flex justify-center mb-10 md:mb-16">
                     <div className="flex overflow-x-auto md:overflow-visible gap-2 md:gap-4 p-2 bg-white/5 border border-white/10 rounded-2xl md:rounded-[32px] backdrop-blur-xl no-scrollbar max-w-full">
                         {tabs.map(tab => (
                             <button 
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 md:px-10 py-4 md:py-5 rounded-xl md:rounded-[28px] text-[8px] md:text-[10px] uppercase font-black tracking-[0.2em] md:tracking-[0.3em] transition-all flex items-center gap-3 md:gap-4 whitespace-nowrap border ${
                                    activeTab === tab.id ? 'bg-royal border-royal text-white shadow-[0_10px_20px_rgba(92,51,204,0.2)]' : 'bg-transparent border-transparent text-white/30 hover:bg-white/5 hover:text-white'
                                }`}
                             >
                                 <span className="text-sm md:text-lg">{tab.icon}</span>
                                 <span>{tab.label}</span>
                             </button>
                         ))}
                     </div>
                </div>

                {/* Content Card - Optimized Multi-Scale Padding */}
                <div className="w-full bg-white/5 border border-white/5 rounded-[32px] md:rounded-[40px] p-6 md:p-16 min-h-[400px] md:min-h-[700px] overflow-hidden relative group hover:border-white/10 transition-all">
                    <AnimatePresence mode="wait">
                        {activeTab === 'victories' && (
                            <motion.div key="victories" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 pb-10 md:pb-20">
                                {trophies.map((t, i) => (
                                    <div key={i} className={`p-8 md:p-10 rounded-[28px] md:rounded-[32px] border transition-all group ${t.color}`}>
                                        <div className="flex justify-between items-start mb-6 md:mb-8">
                                            <span className="text-2xl md:text-3xl opacity-40 group-hover:opacity-100 transition-opacity">🏆</span>
                                            <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest py-1.5 px-4 border border-current/30 rounded-full">{t.rarity}</span>
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest mb-3 md:mb-4 leading-relaxed">{t.title}</h3>
                                        <p className="text-[10px] md:text-xs text-white/40 uppercase font-black leading-relaxed line-clamp-2 italic">
                                            "{t.desc}"
                                        </p>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {activeTab === 'vault' && (
                            <motion.div key="vault" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full h-full">
                                <DataVault />
                            </motion.div>
                        )}

                        {activeTab === 'resume' && (
                            <motion.div key="resume" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col items-center justify-center text-center py-16 md:py-24 h-full min-h-[400px] md:min-h-[600px]">
                                    <div className="w-32 md:w-40 h-32 md:h-40 bg-royal/10 border-2 border-royal text-5xl md:text-6xl flex items-center justify-center rounded-[32px] md:rounded-[40px] mb-8 md:mb-10 shadow-[0_0_60px_rgba(92,51,204,0.3)] animate-pulse">📄</div>
                                    <h3 className="text-2xl md:text-4xl font-black uppercase text-white mb-6 italic tracking-tight">Battula_Bhargavi_Dossier.PDF</h3>
                                    <p className="text-[10px] md:text-[11px] text-white/40 uppercase font-black tracking-[0.4em] md:tracking-[0.8em] mb-10 md:mb-14 italic px-2">Authorized Access Only // MMXXVI</p>
                                    <button className="px-12 md:px-20 py-6 md:py-8 bg-white text-black font-black uppercase text-[10px] md:text-xs tracking-[0.4em] md:tracking-[0.83em] rounded-2xl hover:bg-royal hover:text-white transition-all shadow-[0_30px_60px_rgba(255,255,255,0.05)] active:scale-95">Execute Download ➔</button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default TheArena;
