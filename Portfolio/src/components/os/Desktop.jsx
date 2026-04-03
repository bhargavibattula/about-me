import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const Desktop = ({ onOpenApp }) => {
  const [contextMenu, setContextMenu] = useState(null);

  const icons = [
    { id: 'VAULT.exe', label: 'VAULT.exe', icon: '🔓', color: 'bg-purple-600/30 border-purple-500/40 text-purple-400' },
    { id: 'SKILL_SOLAR.exe', label: 'SKILL_SOLAR.exe', icon: '🪐', color: 'bg-blue-600/30 border-blue-500/40 text-blue-400' },
    { id: 'TERMINAL.exe', label: 'TERMINAL.exe', icon: '💻', color: 'bg-green-600/30 border-green-500/40 text-green-400' },
    { id: 'NEURAL_MAP.exe', label: 'NEURAL_MAP.exe', icon: '🧠', color: 'bg-pink-600/30 border-pink-500/40 text-pink-400' },
    { id: 'ARENA.exe', label: 'ARENA.exe', icon: '⚔️', color: 'bg-orange-600/30 border-orange-500/40 text-orange-400' },
  ];

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const closeMenu = () => setContextMenu(null);
    window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, []);

  return (
    <div 
      className="fixed inset-0 pt-10 pb-16 px-8 z-0 cursor-default select-none overflow-hidden" 
      onContextMenu={handleContextMenu}
    >
      {/* Center Name and Stats */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6 pointer-events-none">
        <motion.h1 
          className="text-7xl md:text-9xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-tr from-mint via-fuchsia to-royal drop-shadow-[0_0_50px_rgba(202,47,140,0.4)] animate-pulse"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          Tejaswi
        </motion.h1>
        
        {/* Stats Strip */}
        <div className="flex items-center gap-10 px-10 py-4 bg-primary/20 backdrop-blur-xl border border-white/5 rounded-full shadow-[0_0_30px_rgba(3,4,18,0.3)]">
          {[
            { label: 'CGPA', value: '9.22/10' },
            { label: 'Hackathon Wins', value: '08+' },
            { label: 'Yuganta AI', value: 'Software Intern' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-[10px] text-white/30 uppercase font-black font-mono tracking-widest">{stat.label}</span>
              <span className="text-sm text-white font-black drop-shadow-[0_0_5px_white]">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>


      {/* Grid Icons */}
      <div className="grid grid-cols-2 md:grid-cols-1 md:grid-rows-5 gap-6 w-fit py-8">
        {icons.map((app) => (
          <motion.button
            key={app.id}
            onClick={() => onOpenApp(app.id, app.label)}
            className="flex flex-col items-center gap-2 group w-24 relative"
            whileHover={{ y: -5, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center text-2xl shadow-xl transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] ${app.color}`}>
              {app.icon}
              {/* Active Indicator Dot (Static for now) */}
              <div className="absolute -bottom-1 w-1 h-1 bg-white/40 rounded-full group-hover:bg-white group-hover:shadow-[0_0_5px_white]" />
            </div>
            <span className="text-[9px] uppercase font-black text-white/50 tracking-tighter group-hover:text-white transition-colors drop-shadow-lg">
              {app.label}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Right-Click Menu */}
      <AnimatePresence>
        {contextMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bg-[#06091f]/95 border border-white/10 p-1 rounded-xl shadow-2xl backdrop-blur-3xl z-[10001] w-56 font-mono overflow-hidden"
            style={{ top: contextMenu.y, left: contextMenu.x }}
          >
            {[
              { label: 'Hire Tejaswi', icon: '📩', action: 'hire' },
              { label: 'View Resume', icon: '📄', action: 'resume' },
              { label: 'Open Arena', icon: '⚔️', action: 'arena' },
              { label: 'Neural Map', icon: '🧠', action: 'neural' },
              { label: 'Is she available?', icon: '🟢', action: 'status' },
            ].map((item, i) => (
              <button 
                key={i} 
                className="w-full text-left px-4 py-2.5 text-[10px] uppercase font-black text-white/60 hover:text-white hover:bg-mint/10 flex items-center justify-between rounded-lg transition-all group"
              >
                <span>{item.label}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">{item.icon}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom hint text */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/20 text-[8px] uppercase tracking-[0.6em] pointer-events-none">
        System Initialized // Authorized access only
      </div>
    </div>
  );
};

export default Desktop;
