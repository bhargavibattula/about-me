import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const FloatingNode = ({ label, value, x, y, delay }) => (
    <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
            opacity: 1, scale: 1,
            y: [0, -8, 0]
        }}
        transition={{ 
            opacity: { duration: 1, delay },
            scale: { duration: 1, delay },
            y: { repeat: Infinity, duration: 6, ease: "easeInOut", delay }
        }}
        className="absolute z-20 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-3xl hover:border-mint/40 transition-colors group cursor-default"
        style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
    >
         <span className="text-[7px] font-black uppercase tracking-[0.4em] text-white/20 group-hover:text-mint/40 transition-colors mb-0.5 block">{label}</span>
         <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70 group-hover:text-white transition-colors">{value}</span>
    </motion.div>
);

const Hero = () => {
    // Parallax mouse tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    
    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 20;
            const y = (clientY / window.innerHeight - 0.5) * 20;
            mouseX.set(x);
            mouseY.set(y);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const nodes = [
        { label: 'Currently', value: 'Yuganta AI Intern', x: 25, y: 20, delay: 1.2 },
        { label: 'Stack', value: 'MERN + FastAPI', x: 75, y: 30, delay: 1.4 },
        { label: 'Location', value: 'Andhra Pradesh', x: 30, y: 70, delay: 1.6 },
        { label: 'Available', value: 'Full-time 2026', x: 85, y: 75, delay: 1.8 }
    ];

    return (
        <section className="min-h-screen relative flex items-center justify-center p-8 md:p-24 overflow-hidden bg-[#030412] font-sans">
            
             {/* Background Dynamic Neural Field */}
             <motion.div style={{ x: springX, y: springY }} className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-royal/5 blur-[120px] rounded-full opacity-30" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-mint/5 blur-[120px] rounded-full opacity-30" />
                
                {/* SVG Graph Connections */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
                    <line x1="25%" y1="20%" x2="75%" y2="30%" stroke="white" strokeWidth="1" />
                    <line x1="75%" y1="30%" x2="85%" y2="75%" stroke="white" strokeWidth="1" />
                    <line x1="85%" y1="75%" x2="30%" y2="70%" stroke="white" strokeWidth="1" />
                    <line x1="30%" y1="70%" x2="25%" y2="20%" stroke="white" strokeWidth="1" />
                </svg>
             </motion.div>

             <div className="container mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-16 md:gap-32">
                
                {/* Left: Professional Content Block */}
                <motion.div 
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex-1 space-y-8"
                >
                    <div className="flex items-center gap-3">
                         <div className="w-1.5 h-1.5 rounded-full bg-mint shadow-[0_0_8px_#57db96]" />
                         <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/40">Open for Opportunities // 2026</span>
                    </div>

                    <div className="space-y-3">
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-none text-white whitespace-nowrap">
                            BATTULA<br />
                            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-mint via-white to-royal">BHARGAVI.</span>
                        </h1>
                        <h3 className="text-base md:text-xl font-bold uppercase tracking-[0.1em] text-white/40 italic">Full-Stack Architect & AI Builder</h3>
                    </div>

                    <div className="max-w-md border-l border-white/5 pl-8 py-2">
                        <p className="text-sm md:text-base text-white/50 font-medium uppercase tracking-[0.15em] leading-relaxed">
                            I enjoy solving real-world problems by combining technology and AI into meaningful solutions. My focus is on building applications that people can actually use, understand, and benefit from.
                        </p>
                    </div>

                    <div className="pt-4">
                        <motion.button 
                            whileHover={{ x: 8 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                            className="group px-10 py-4 bg-white text-black font-black uppercase text-[10px] tracking-[0.5em] rounded-full hover:bg-mint transition-all shadow-xl flex items-center gap-4"
                        >
                            View Archive <span className="group-hover:translate-x-1 transition-transform">➔</span>
                        </motion.button>
                    </div>
                </motion.div>

                {/* Right: Technical Nexus Interface */}
                <div className="hidden lg:block flex-1 relative h-[500px] w-full">
                     {nodes.map(node => (
                         <FloatingNode key={node.label} {...node} />
                     ))}
                     
                     {/* Decorative Center Points */}
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/[0.03] rounded-full animate-pulse" />
                </div>
             </div>

             {/* Background Decoration */}
             <div className="absolute bottom-10 right-10 opacity-[0.03] pointer-events-none hidden md:block">
                  <span className="text-[80px] font-black uppercase tracking-tighter leading-none select-none">ARCHITECTURE</span>
             </div>
        </section>
    );
};

export default Hero;
