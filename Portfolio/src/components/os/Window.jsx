import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

const Window = ({ id, label, children, onClose, active, onSelect }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 30 }}
      onClick={onSelect}
      className={`fixed inset-0 pt-10 pb-16 px-4 md:px-10 z-[5000] flex items-center justify-center pointer-events-none transition-all duration-300 ${
        active ? 'opacity-100 scale-100 z-[6000]' : 'opacity-50 scale-95 z-[4000]'
      }`}
    >
      <div className="w-full h-full max-w-7xl max-h-[90vh] bg-[#030412]/80 backdrop-blur-3xl rounded-3xl border-2 border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden pointer-events-auto flex flex-col group/window relative">
        {/* Window Handle / Top Bar */}
        <div className="h-14 bg-white/5 border-b border-white/10 flex items-center justify-between px-8 select-none shrink-0">
          <div className="flex items-center gap-4">
             <div className="flex gap-2">
                <button onClick={onClose} className="w-3.5 h-3.5 rounded-full bg-coral/80 hover:bg-coral transition-colors flex items-center justify-center text-[8px] font-black group/close text-black/40 hover:text-black">×</button>
                <div className="w-3.5 h-3.5 rounded-full bg-orange/80" />
                <div className="w-3.5 h-3.5 rounded-full bg-mint/80" />
             </div>
             <div className="h-4 w-[1px] bg-white/20 mx-2" />
             <span className="text-[10px] font-black uppercase font-mono tracking-widest text-white/50">{label}</span>
          </div>

          <div className="flex items-center gap-4 text-white/20 text-[9px] uppercase font-black font-mono">
             <span>Memory: 420MB</span>
             <span>PID: {Math.floor(Math.random() * 9000) + 1000}</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar bg-gradient-to-br from-primary/30 to-black/30">
          {children}
        </div>
        
        {/* Subtle Window Glow */}
        <div className={`absolute inset-0 pointer-events-none border border-white/5 transition-opacity duration-700 ${active ? 'opacity-100' : 'opacity-0'}`} 
             style={{ boxShadow: 'inset 0 0 100px rgba(87,219,150,0.02)' }} 
        />
      </div>
    </motion.div>
  );
};

export default Window;
