import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const WelcomeScreen = () => {
    const [status, setStatus] = useState('INITIALIZING...');
    const [progress, setProgress] = useState(0);

    const logs = [
        'INITIALIZING NEURAL CORE...',
        'SYNCING ARCHITECTURAL BLUEPRINTS...',
        'DECRYPTING DOSSIER FRAGMENTS...',
        'STABILIZING SYNC_CORE...',
        'ESTABLISHING UPLINK...',
        'ACCESS GRANTED.'
    ];

    useEffect(() => {
        let logIndex = 0;
        const logLength = logs.length;
        const logInterval = setInterval(() => {
            if (logIndex < logLength) {
                setStatus(logs[logIndex]);
                logIndex++;
            }
        }, 500);

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) return 100;
                return prev + 1;
            });
        }, 30);

        return () => {
            clearInterval(logInterval);
            clearInterval(progressInterval);
        };
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100000] bg-[#030412] flex flex-col items-center justify-center overflow-hidden"
        >
             {/* Background Depth */}
             <div className="absolute inset-0 z-0 select-none pointer-events-none">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-royal/10 blur-[80px] md:blur-[150px] rounded-full animate-pulse" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[500px] h-[200px] md:h-[500px] bg-mint/5 blur-[50px] md:blur-[100px] rounded-full" />
             </div>

             {/* The Singularity Core (Pulse) - Centered and Responsive */}
             <motion.div 
                animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 90, 180, 270, 360],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 md:w-48 md:h-48 border border-white/5 md:border-white/10 rounded-full flex items-center justify-center relative z-10 p-8 md:p-12 shadow-[0_0_80px_rgba(87,219,150,0.1)]"
             >
                 <div className="w-full h-full border-t-4 border-mint/40 rounded-full animate-spin" />
                 <div className="absolute inset-0 rounded-full border-b-4 border-royal/20 animate-pulse" />
             </motion.div>

             {/* Massive Typography - Responsive Scale */}
             <div className="text-center mt-24 md:mt-32 relative z-20 px-6">
                 <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[64px] md:text-[180px] font-black uppercase italic tracking-tighter leading-none mb-10 md:mb-12 whitespace-nowrap"
                 >
                     <span className="text-white">WEL</span>
                     <span className="text-white/10 italic">COME</span>
                 </motion.h1>
                 <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-[7px] md:text-[12px] font-black uppercase tracking-[0.4em] md:tracking-[1em] text-white/30 italic max-w-xs md:max-w-none mx-auto leading-relaxed border-t border-white/5 pt-6 inline-block"
                 >
                     SYSTEM_ACTIVE // INITIALIZING_DOSSIER_ARCHIVE
                 </motion.p>
             </div>

             {/* System Status & Progress - Bottom Responsive Dock */}
             <div className="absolute bottom-16 md:bottom-24 left-1/2 -translate-x-1/2 w-full max-w-[280px] md:max-w-xl px-4 z-20 flex flex-col items-center">
                 <div className="flex justify-between w-full mb-4 md:mb-6 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white/40">
                     <span className="animate-pulse">{status}</span>
                     <span className="text-mint/60">{progress}%</span>
                 </div>
                 <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-mint shadow-[0_0_15px_#57db96]" 
                     />
                 </div>
             </div>

             {/* Architectural Grid Overlay */}
             <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px md:100px 100px' }} />
        </motion.div>
    );
};

export default WelcomeScreen;
