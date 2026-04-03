import React from 'react';
import { motion } from 'motion/react';

const Taskbar = ({ openApps, activeApp, onSelectApp }) => {
  return (
    <div className="fixed bottom-0 inset-x-0 h-16 bg-primary/40 backdrop-blur-xl border-t border-white/10 z-[10000] flex items-center justify-between px-6 select-none shadow-[0_-10px_30px_rgba(3,4,18,0.5)]">
      {/* App Tabs */}
      <div className="flex gap-2 min-w-0 flex-1">
        {openApps.map((app) => (
          <button
            key={app.id}
            onClick={() => onSelectApp(app.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 group max-w-[150px] truncate ${
              activeApp === app.id
                ? 'bg-mint/10 border-mint/40 text-mint shadow-[0_0_15px_rgba(87,219,150,0.15)] scale-105 z-10'
                : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${activeApp === app.id ? 'bg-mint' : 'bg-white/20'}`} />
            <span className="text-[10px] uppercase font-black tracking-widest">{app.label}</span>
          </button>
        ))}
      </div>

      {/* Stats and Level Section */}
      <div className="flex items-center gap-6 ml-4 bg-black/40 px-6 py-2.5 rounded-full border border-white/5 backdrop-blur-md">
        {/* XP Bar */}
        <div className="flex flex-col gap-1 w-32 md:w-48">
          <div className="flex justify-between items-center text-[8px] font-black uppercase text-white/40 tracking-widest">
            <span>Level 24 Developer</span>
            <span>72% XP</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
            <motion.div 
              className="h-full bg-gradient-to-r from-royal via-lavender to-mint shadow-[0_0_10px_rgba(87,219,150,0.4)]"
              initial={{ width: 0 }}
              animate={{ width: '72%' }}
            />
          </div>
        </div>

        <div className="h-8 w-[1px] bg-white/10" />

        {/* Coin Counter */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange to-sand p-1 shadow-[0_0_15px_rgba(214,153,92,0.4)]">
             <div className="w-full h-full rounded-full border border-white/20 flex items-center justify-center text-[10px] font-black text-white italic ring-2 ring-orange/20 animate-pulse">
                $
             </div>
          </div>
          <div className="flex flex-col">
            <span className="text-orange font-black text-xs tabular-nums drop-shadow-[0_0_10px_rgba(214,153,92,0.5)]">1,337,420</span>
            <span className="text-[8px] uppercase font-black text-white/20 tracking-tighter">Credits</span>
          </div>
        </div>

        {/* Level Badge */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-royal to-fuchsia p-[1.5px] rotate-45 group hover:rotate-[225deg] transition-all duration-700 shadow-[0_0_20px_rgba(92,51,204,0.35)]">
            <div className="w-full h-full rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-black text-sm -rotate-45 group-hover:-rotate-[225deg] transition-all duration-700 select-none">
                    L24
                </span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
