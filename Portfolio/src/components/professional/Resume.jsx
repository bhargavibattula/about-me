import React from 'react';
import { motion } from 'motion/react';

const Resume = () => {
    return (
        <section id="about" className="py-32 px-8 overflow-hidden bg-primary/20 backdrop-blur-3xl border-y border-white/5 relative">
            <div className="absolute top-0 right-0 w-full h-full bg-mint/5 pointer-events-none blur-[150px] opacity-20" />

            <div className="container mx-auto max-w-6xl relative z-10">
                <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="mb-32 flex flex-col md:flex-row justify-between items-end gap-12">
                    <div>
                        <span className="text-xs font-black uppercase tracking-[0.8em] text-mint mb-4 block">Archives // Career Dossier</span>
                        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none italic">Professional <br /> <span className="text-white/20">Resume</span></h2>
                    </div>
                    <a href="#" className="mb-4 text-sm font-black uppercase tracking-[0.4em] text-white/50 hover:text-white border-b-2 border-mint/20 hover:border-mint transition-all pb-2 text-right">Download CV ➔</a>
                </motion.div>

                <div className="grid grid-cols-1 gap-40">
                    {/* Immersive Employment Record */}
                    <div className="space-y-24 max-w-4xl">
                        <h4 className="text-[12px] font-black italic uppercase tracking-[0.8em] text-fuchsia mb-16 border-l-8 border-fuchsia pl-10">Primary Professional Nexus</h4>
                        <div className="space-y-20 pl-16 border-l-2 border-white/5 relative">
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="relative group"
                            >
                                <div className="absolute -left-[73px] top-2 w-6 h-6 rounded-full bg-fuchsia shadow-[0_0_30px_rgba(202,47,140,0.8)] group-hover:scale-150 transition-transform" />
                                <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
                                    <h5 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter group-hover:text-fuchsia transition-colors">Yuganta AI</h5>
                                    <span className="text-[12px] font-black text-white/40 uppercase tracking-[0.4em] font-mono py-2 px-6 bg-white/5 rounded-full border border-white/5 whitespace-nowrap">2026 – Present</span>
                                </div>
                                <div className="text-[10px] font-black uppercase tracking-[0.6em] text-white/50 mb-10 italic">Core Mission: AI Interface Architect // Software Developer Intern</div>
                                <p className="text-lg text-white/40 leading-relaxed font-light group-hover:text-white/60 transition-colors uppercase tracking-[0.15em] max-w-3xl">Developing an AI-based teaching avatar for educational platforms to support interactive learning. Building textbook-based teaching chatbots using the MERN stack to assist students with queries.</p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Immersive Academic Archive */}
                    <div className="space-y-24 max-w-4xl ml-auto md:text-right">
                        <h4 className="text-[12px] font-black italic uppercase tracking-[0.8em] text-royal mb-16 md:border-r-8 border-royal md:pr-10">Foundational Architecture</h4>
                        <div className="space-y-20 md:pr-16 md:border-r-2 border-white/5 relative">
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="relative group flex flex-col md:items-end"
                            >
                                <div className="absolute -right-[73px] top-2 w-6 h-6 rounded-full bg-royal shadow-[0_0_30px_rgba(92,51,204,0.8)] group-hover:scale-150 transition-transform hidden md:block" />
                                <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6 w-full md:justify-end">
                                    <span className="text-[12px] font-black text-white/40 uppercase tracking-[0.4em] font-mono py-2 px-6 bg-white/5 rounded-full border border-white/5 order-2 md:order-1 whitespace-nowrap">2023 – 2027</span>
                                    <h5 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter group-hover:text-royal transition-colors order-1 md:order-2">SRKR Engineering</h5>
                                </div>
                                <div className="text-[10px] font-black uppercase tracking-[0.6em] text-white/50 mb-10 italic">Archive Record: B.Tech in Computer Science and Engineering — 9.22 CGPA Excellence</div>
                                <p className="text-lg text-white/40 leading-relaxed font-light group-hover:text-white/60 transition-colors uppercase tracking-[0.15em] max-w-3xl md:ml-auto">Focusing on high-performance academic results and specialized technical research. Integrating modern engineering principles with real-world software architecture and AI implementation.</p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Resume;
