import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const NarrativeOverlay = () => {
    const [logStatus, setLogStatus] = useState('INITIALIZING...');
    const [isVisible, setIsVisible] = useState(false);
    const [narrative, setNarrative] = useState([]);

    useEffect(() => {
        const handleScroll = () => {
            const h = document.documentElement;
            const b = document.body;
            const st = 'scrollTop';
            const sh = 'scrollHeight';
            const p = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;

            let currentLog = 'SYSTEM ONLINE';
            let story = [];

            if (p > 5 && p < 20) {
                currentLog = 'SYNOPSING BLUEPRINT...';
                story = ['FOUNDATION DETECTED: SRKR-CSE', 'ARCHITECT ROLES: MERN-AI-DEVELOPER'];
            } else if (p > 25 && p < 45) {
                currentLog = 'DECRYPTING VICTORIES...';
                story = ['4 HACKATHON WINS DETECTED', 'REPAIRING BUG OVERHEAD...'];
            } else if (p > 50 && p < 70) {
                currentLog = 'CONSTRUCTING THE CORE...';
                story = ['PROJECTS DEPLOYED: NEXUS, HEALVERSE, DEEPNOX', 'TECH STACK: MULTI-AGENT ARCHITECTURE'];
            } else if (p > 75 && p < 90) {
                currentLog = 'INTERROGATING THE DOSSIER...';
                story = ['ACCESSING B-T-CORE... COMMAND READY'];
            } else if (p > 95) {
                currentLog = 'DOSSIER COMPLETE // 100%';
                story = ['TRANSMISSION CHANNELS SECURED... READY TO COOPERATE'];
            }

            setLogStatus(currentLog);
            setNarrative(story);
            setIsVisible(p > 2);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed left-10 bottom-10 z-[1000] pointer-events-none select-none max-w-sm">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, x: -20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: -20 }}
                        className="p-8 bg-[#0b0f2a]/80 backdrop-blur-3xl border border-white/5 rounded-3xl overflow-hidden relative"
                    >
                         <div className="absolute top-0 left-0 w-[2px] h-full bg-mint shadow-[0_0_15px_#57db96]" />
                         <div className="flex flex-col gap-4">
                             <div className="flex justify-between items-center">
                                 <span className="text-[10px] font-black uppercase text-mint tracking-[0.4em] animate-pulse">{logStatus}</span>
                                 <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest font-mono">Archive // v1.0.4</span>
                             </div>

                             <div className="space-y-2 mt-4 min-h-16">
                                 {narrative.map((item, i) => (
                                     <motion.div 
                                        key={item} 
                                        initial={{ opacity: 0, x: -10 }} 
                                        animate={{ opacity: 1, x: 0 }} 
                                        transition={{ delay: i * 0.1 }}
                                        className="text-xs font-bold text-white uppercase tracking-widest leading-relaxed opacity-60"
                                     >
                                         <span className="text-mint/40 mr-3 italic">➔</span> {item}
                                     </motion.div>
                                 ))}
                             </div>
                         </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default NarrativeOverlay;
