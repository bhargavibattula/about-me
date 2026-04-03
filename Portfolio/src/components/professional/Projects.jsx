import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

const Projects = () => {
    const projects = [
        { id: 'nexus', name: 'NEXUS AI', date: '2026', tech: ['Next.js', 'FastAPI', 'LangGraph'], brief: 'Autonomous software generator / multi-agent platform.', icon: '🤖' },
        { id: 'healverse', name: 'HealVerse', date: '2025', tech: ['Java', 'Spring Boot', 'React Native'], brief: 'AI healthcare app with medication tracking & diets.', icon: '🏥' },
        { id: 'deepnox', name: 'DeepNox', date: '2025', tech: ['Python', 'TensorFlow', 'OpenCV'], brief: 'Real-time deepfake detector & browser extension.', icon: '🛰️' }
    ];

    return (
        <section id="projects" className="py-32 px-8 overflow-hidden bg-[#030412]">
            <div className="container mx-auto max-w-6xl">
                <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="mb-20">
                    <span className="text-xs font-black uppercase tracking-[0.8em] text-mint mb-4 block">System Outputs // Projects</span>
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic">Technical <br /> <span className="text-primary-foreground/20 text-white/10 stroke-white/10">Showcase</span></h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {projects.map((p, i) => (
                        <motion.div 
                            key={p.id} 
                            initial={{ y: 50, opacity: 0 }} 
                            whileInView={{ y: 0, opacity: 1 }} 
                            viewport={{ once: true }} 
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="p-10 bg-white/5 border border-white/5 rounded-[40px] hover:border-mint/20 hover:bg-white/10 transition-all group cursor-pointer relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-mint/5 blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform" />
                            <div className="flex justify-between items-start mb-12">
                                <span className="text-4xl">{p.icon}</span>
                                <span className="text-[10px] font-bold text-mint uppercase font-mono tracking-[0.4em]">{p.date}</span>
                            </div>
                            <h3 className="text-3xl font-black uppercase tracking-widest text-white mb-4 group-hover:text-mint transition-colors">{p.name}</h3>
                            <p className="text-sm text-white/40 leading-relaxed font-light mb-10 group-hover:text-white/60 transition-colors uppercase tracking-widest">{p.brief}</p>
                            <div className="flex flex-wrap gap-3 mb-12">
                                {p.tech.map(t => (
                                    <span key={t} className="text-[8px] font-black uppercase px-4 py-2 border border-white/5 rounded-full bg-white/5 group-hover:border-white/10">{t}</span>
                                ))}
                            </div>
                            <span className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.4em] text-white/30 group-hover:text-white transition-all transform group-hover:translate-x-2">Decrypted View ➔</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
