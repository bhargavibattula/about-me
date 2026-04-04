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

            <div className="container mx-auto relative z-10 flex flex-col items-center justify-center text-center gap-16">

                {/* Left: Professional Content Block */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl w-full space-y-10 flex flex-col items-center"
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

                    <div className="max-w-2xl px-6">
                        <p className="text-sm md:text-lg text-white/50 font-medium uppercase tracking-[0.15em] leading-relaxed">
                            Full-stack developer experienced in building backend and frontend applications and integrating AI-driven solutions into modern software systems. Focused on developing innovative solutions using modern technologies to improve functionality and enhance user experience.
                        </p>
                    </div>

                    <div className="space-y-10 pt-8">
                        {/* Social Icons */}
                        <div className="flex items-center justify-center gap-4">
                            {[
                                { name: 'GitHub', url: 'https://github.com/bhargavibattula', icon: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' },
                                { name: 'LinkedIn', url: 'https://www.linkedin.com/in/battula-bhargavi-tejaswi', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
                                { name: 'LeetCode', url: 'https://leetcode.com/u/BhargaviTejaswi/', icon: 'M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.332-4.363c.467-.467 1.112-.662 1.824-.662.712 0 1.357.195 1.823.662l2.697 2.606c.514.515 1.335.515 1.849 0 .515-.515.515-1.335 0-1.849l-2.697-2.606c-1.086-1.086-2.56-1.576-4.216-1.576-1.656 0-3.13.49-4.215 1.576l-4.332 4.363c-1.086 1.086-1.575 2.56-1.575 4.215 0 1.656.489 3.13 1.575 4.216l4.332 4.363c1.085 1.086 2.56 1.575 4.215 1.575 1.655 0 3.129-.489 4.216-1.575l2.697-2.607c.515-.514.515-1.334 0-1.848-.514-.515-1.335-.515-1.849 0z M23.103 14.288l-3.328-3.352c-.515-.515-1.335-.515-1.849 0s-.515 1.335 0 1.849l3.328 3.352c.515.514 1.335.514 1.849 0s.515-1.335 0-1.849z' },
                                { name: 'Email', url: 'mailto:BHARGAVITEJASWI97@GMAIL.COM', icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' }
                            ].map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -3, backgroundColor: 'rgba(87,219,150,0.1)', borderColor: 'rgba(87,219,150,0.3)' }}
                                    className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-mint transition-all duration-300 shadow-xl"
                                >
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                        <path d={social.icon} />
                                    </svg>
                                </motion.a>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap items-center justify-center gap-6">
                            <motion.a
                                href="#"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-10 py-5 bg-mint text-black font-black uppercase text-[11px] tracking-[0.2em] rounded-2xl hover:bg-white transition-all shadow-[0_10px_40px_rgba(87,219,150,0.2)]"
                            >
                                Download CV
                            </motion.a>
                            <motion.button
                                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                                whileHover={{ scale: 1.05, borderColor: 'rgba(87,219,150,1)' }}
                                whileTap={{ scale: 0.98 }}
                                className="px-10 py-5 bg-transparent border-2 border-mint/40 text-mint font-black uppercase text-[11px] tracking-[0.2em] rounded-2xl hover:text-white transition-all"
                            >
                                View Projects
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Right: Technical Nexus Interface - Now positioned as decorative overlay or lower section if needed, but keeping centered focus */}
                <div className="absolute inset-0 pointer-events-none opacity-20 lg:opacity-40">
                    {nodes.map(node => (
                        <FloatingNode key={node.label} {...node} />
                    ))}
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
