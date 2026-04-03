import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const MissionTracker = () => {
    const [progress, setProgress] = useState(0);
    const [unlockedSections, setUnlockedSections] = useState(new Set());

    useEffect(() => {
        const handleScroll = () => {
            const h = document.documentElement;
            const b = document.body;
            const st = 'scrollTop';
            const sh = 'scrollHeight';
            const p = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
            setProgress(p);

            // Track sections for unlocking
            const sections = ['about', 'arena', 'projects', 'terminal', 'contact'];
            sections.forEach(id => {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top < window.innerHeight * 0.8) {
                    setUnlockedSections(prev => new Set(prev).add(id));
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const missionPoints = [
        { id: 'about', label: 'THE BLUEPRINT' },
        { id: 'arena', label: 'THE GAUNTLET' },
        { id: 'projects', label: 'THE CONSTRUCT' },
        { id: 'terminal', label: 'THE BLACK BOX' },
        { id: 'contact', label: 'TRANSMISSION' }
    ];

    return (
        <div className="fixed right-10 top-1/2 -translate-y-1/2 z-[1000] hidden lg:flex flex-col items-center gap-10">
             <div className="flex flex-col gap-4 text-right">
                 <div className="text-[10px] font-black uppercase text-white/20 tracking-[0.6em] whitespace-nowrap">Dossier Completion</div>
                 <div className="text-3xl font-black text-white italic tracking-tighter">{Math.round(progress)}%</div>
             </div>

             <div className="h-64 w-[2px] bg-white/5 relative flex flex-col justify-between items-center py-2">
                 <motion.div 
                    className="absolute top-0 w-full bg-mint shadow-[0_0_15px_#57db96]" 
                    style={{ height: `${progress}%` }}
                    transition={{ type: 'spring', stiffness: 100 }}
                 />
                 {missionPoints.map((point) => (
                     <div key={point.id} className="relative group">
                         <div className={`w-2 h-2 rounded-full border-2 transition-all duration-500 ${
                             unlockedSections.has(point.id) ? 'bg-mint border-mint shadow-[0_0_10px_#57db96]' : 'bg-transparent border-white/20'
                         }`} />
                         <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 whitespace-nowrap">
                             <span className="text-[8px] font-black uppercase text-white tracking-widest">{point.label}</span>
                         </div>
                     </div>
                 ))}
             </div>

             <div className="text-[8px] font-black uppercase text-white/10 rotate-90 mt-10 tracking-[1em] select-none pointer-events-none">
                 ARCHITECT_ASCENT_v1.0.4
             </div>
        </div>
    );
};

export default MissionTracker;
