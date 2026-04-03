import React from 'react';
import { motion } from 'motion/react';

const ProjectUplink = () => {
    const projects = [
        { 
            title: 'NEXUS AI CORE', 
            tech: 'NEXT.JS + LANGGRAPH', 
            desc: 'RECONSTRUCTING AUTONOMOUS MULTI-AGENT ARCHITECTURE WITH DYNAMIC DEPLOYMENT SCALING.',
            tag: 'AI_SYSTEM_01',
            icon: '🤖',
            color: 'border-mint/20 text-mint bg-mint/5 group-hover:border-mint/60 shadow-[0_20px_50px_rgba(87,219,150,0.05)]'
        },
        { 
            title: 'HEALVERSE HUB', 
            tech: 'JAVA + SPRING BOOT', 
            desc: 'AI HEALTHCARE ECOSYSTEM SYNCHRONIZING PATIENT METRICS WITH NEURAL DIAGNOSTIC LOGIC.',
            tag: 'HEALTH_NODE_02',
            icon: '🏥',
            color: 'border-royal/20 text-royal bg-royal/5 group-hover:border-royal/60 shadow-[0_20px_50px_rgba(92,51,204,0.05)]'
        },
        { 
            title: 'DEEPNOX ENGINE', 
            tech: 'PYTHON + TENSORFLOW', 
            desc: 'REAL-TIME NEURAL DEEPFAKE ANALYSIS AND BIOMETRIC INTEGRITY PROTOCOLS.',
            tag: 'SEC_PROTOCOL_03',
            icon: '🛰️',
            color: 'border-white/10 text-white bg-white/2 group-hover:border-white/40 shadow-[0_20px_50px_rgba(255,255,255,0.02)]'
        }
    ];

    return (
        <section id="projects" className="py-20 md:py-32 px-6 md:px-8 bg-[#030412] relative overflow-hidden">
            <div className="container mx-auto max-w-6xl">
                 <header className="mb-12 md:mb-24 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-10">
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.8em] text-mint mb-4 block animate-pulse">Scanning Technical Nexus // Projects</span>
                        <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-none italic">Technical <br /> <span className="text-white/10 italic">Workload</span></h2>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                    {projects.map((p, i) => (
                        <motion.div 
                            key={i}
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.15 }}
                            className={`group p-8 md:p-14 rounded-[32px] md:rounded-[56px] bg-white/5 border transition-all relative overflow-hidden flex flex-col justify-between min-h-[400px] md:min-h-[550px] cursor-pointer ${p.color}`}
                        >
                             {/* Background Architectural Grid (Micro) */}
                             <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-[0.07] transition-opacity" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                             
                             <div className="absolute top-0 right-0 p-8 md:p-12 opacity-5 text-6xl md:text-8xl group-hover:scale-110 group-hover:rotate-12 transition-transform pointer-events-none">{p.icon}</div>
                             
                             <div className="relative z-10">
                                 <div className="flex items-center gap-3 mb-6">
                                      <div className={`w-1.5 h-1.5 rounded-full bg-current shadow-[0_0_10px_currentColor]`} />
                                      <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] opacity-40 group-hover:opacity-100 transition-opacity">{p.tag}</span>
                                 </div>
                                 <h3 className="text-2xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-4 text-white italic">{p.title}</h3>
                                 <div className="inline-flex py-1.5 px-4 md:py-2 md:px-5 rounded-full border border-current/20 text-[8px] md:text-[9px] font-black tracking-widest bg-white/5 mb-8 md:mb-10 text-white/60 backdrop-blur-xl group-hover:bg-white/10 transition-colors uppercase">{p.tech}</div>
                             </div>

                             <div className="relative z-10">
                                 <p className="text-[11px] md:text-base text-white/40 font-black uppercase leading-relaxed tracking-widest italic mb-10 md:mb-12">
                                     "{p.desc}"
                                 </p>
                                 <div className="flex items-center justify-between mt-auto">
                                      <button className="flex items-center gap-4 text-[9px] md:text-[10px] font-black uppercase tracking-[0.6em] text-white hover:text-mint transition-colors group-hover:translate-x-3 transition-transform">
                                           Execute_View ➔
                                      </button>
                                      <span className="text-[7px] font-mono opacity-10 group-hover:opacity-40 transition-opacity hidden sm:inline">SYS_ID: {p.tag}_ARCH</span>
                                 </div>
                             </div>
                        </motion.div>
                    ))}
                </div>

                {/* Decorative Signature Registry */}
                <div className="mt-16 md:mt-24 flex flex-col md:flex-row justify-between items-center opacity-10 border-t border-white/5 pt-8 md:pt-12 gap-6">
                     <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[1em] text-white/40 italic">Technical Interface Registry — MMXXVI</span>
                     <div className="flex gap-4">
                          {[0, 1, 2, 3].map(i => <div key={i} className="w-8 md:w-12 h-[1px] bg-white/20" />)}
                     </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectUplink;
