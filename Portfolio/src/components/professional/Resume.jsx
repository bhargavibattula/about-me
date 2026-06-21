import React from 'react';
import { motion } from 'motion/react';
import SpotlightCard from './SpotlightCard';

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
                    <a href="https://drive.google.com/file/d/1pxrIHfK7MBrLd27p3Yd6dYcQMydDJKHY/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="mb-4 text-sm font-black uppercase tracking-[0.4em] text-white/50 hover:text-white border-b-2 border-mint/20 hover:border-mint transition-all pb-2 text-right">View CV ➔</a>
                </motion.div>

                <div className="grid grid-cols-1 gap-40">
                    {/* Immersive Employment Record */}
                    <div className="space-y-12 max-w-4xl">
                        <h4 className="text-[12px] font-black italic uppercase tracking-[0.8em] text-fuchsia mb-12 border-l-8 border-fuchsia pl-10">Primary Professional Nexus</h4>
                        
                        <div className="space-y-10 pl-6 md:pl-16 border-l-2 border-white/5 relative">
                            {/* Yuganta AI */}
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="relative group"
                            >
                                <div className="absolute -left-[34px] md:-left-[73px] top-10 w-4 h-4 rounded-full bg-fuchsia shadow-[0_0_20px_rgba(202,47,140,0.8)] group-hover:scale-150 transition-transform z-10" />
                                <SpotlightCard spotlightColor="rgba(202, 47, 140, 0.15)" className="p-8 md:p-12">
                                    <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6 relative z-10">
                                        <div>
                                            <h5 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter">Yuganta AI</h5>
                                            <div className="text-xs md:text-[10px] font-black uppercase tracking-[0.4em] text-white/50 mt-4 italic">Software Developer Intern <span className="mx-2 text-fuchsia">✦</span> Remote</div>
                                        </div>
                                        <span className="text-[10px] font-black text-fuchsia uppercase tracking-[0.4em] font-mono py-2 px-6 bg-fuchsia/10 rounded-full border border-fuchsia/20 whitespace-nowrap">Mar 2026 – Present</span>
                                    </div>
                                    <div className="text-sm md:text-base text-white/60 leading-relaxed font-light mt-8 space-y-4 relative z-10">
                                        <p><span className="text-white font-bold tracking-wide">• AI Textbook Chatbot:</span> Built a MERN stack chatbot with an AI teaching avatar for personalized Q&A across subjects; integrated tab-switch and focus-loss proctoring that routes real-time violation alerts to the admin dashboard.</p>
                                        <p><span className="text-white font-bold tracking-wide">• LMS Platform:</span> Developed a scalable video learning platform with an admin dashboard for content management; configured Cloudflare R2 for high-throughput video storage and delivery.</p>
                                    </div>
                                </SpotlightCard>
                            </motion.div>

                            {/* Freelance Web Developer */}
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="relative group"
                            >
                                <div className="absolute -left-[34px] md:-left-[73px] top-10 w-4 h-4 rounded-full bg-mint shadow-[0_0_20px_rgba(87,219,150,0.8)] group-hover:scale-150 transition-transform z-10" />
                                <SpotlightCard spotlightColor="rgba(87, 219, 150, 0.15)" className="p-8 md:p-12">
                                    <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6 relative z-10">
                                        <div>
                                            <h5 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter">Freelance</h5>
                                            <div className="text-xs md:text-[10px] font-black uppercase tracking-[0.4em] text-white/50 mt-4 italic">Web Developer <span className="mx-2 text-mint">✦</span> Self-Employed</div>
                                        </div>
                                    </div>
                                    <div className="text-sm md:text-base text-white/60 leading-relaxed font-light mt-8 space-y-4 relative z-10">
                                        <p><span className="text-white font-bold tracking-wide">• Full-Cycle Deployment:</span> Deployed 3 production websites end-to-end — handling development, DNS configuration, and SSL provisioning.</p>
                                        <p><span className="text-white font-bold tracking-wide">• Active Projects:</span> 2 additional client projects currently assigned and in active development.</p>
                                    </div>
                                </SpotlightCard>
                            </motion.div>
                        </div>
                    </div>

                    {/* Immersive Academic Archive */}
                    <div className="space-y-12 max-w-4xl ml-auto md:text-right">
                        <h4 className="text-[12px] font-black italic uppercase tracking-[0.8em] text-royal mb-12 md:border-r-8 border-royal md:pr-10">Foundational Architecture</h4>
                        <div className="space-y-10 md:pr-16 md:border-r-2 border-white/5 relative">
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="relative group flex flex-col md:items-end"
                            >
                                <div className="absolute -right-[73px] top-10 w-4 h-4 rounded-full bg-royal shadow-[0_0_20px_rgba(92,51,204,0.8)] group-hover:scale-150 transition-transform hidden md:block z-10" />
                                <SpotlightCard spotlightColor="rgba(92, 51, 204, 0.15)" className="p-8 md:p-12 text-left md:text-right">
                                    <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6 w-full md:justify-end relative z-10">
                                        <span className="text-[10px] font-black text-royal uppercase tracking-[0.4em] font-mono py-2 px-6 bg-royal/10 rounded-full border border-royal/20 order-2 md:order-1 whitespace-nowrap">2023 – 2027</span>
                                        <div className="order-1 md:order-2">
                                            <h5 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter group-hover:text-royal transition-colors">SRKR Engineering</h5>
                                            <div className="text-xs md:text-[10px] font-black uppercase tracking-[0.4em] text-white/50 mt-4 italic">B.Tech in Computer Science <span className="mx-2 text-royal">✦</span> Bhimavaram, AP</div>
                                        </div>
                                    </div>
                                    <div className="text-sm md:text-base text-white/60 leading-relaxed font-light mt-8 space-y-4 relative z-10 md:ml-auto max-w-3xl">
                                        <p><span className="text-white font-bold tracking-wide">• Academic Excellence:</span> Achieved a CGPA of 9.25.</p>
                                    </div>
                                </SpotlightCard>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Resume;
