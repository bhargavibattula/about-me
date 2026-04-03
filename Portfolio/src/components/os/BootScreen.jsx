import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const BootScreen = ({ onComplete }) => {
  const [logs, setLogs] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('booting'); // booting, login, error, success
  const [progress, setProgress] = useState(0);
  const inputRef = useRef(null);

  const bootMessages = [
    'TEJASWI_OS BIOS v1.0.4 - RELEASE 2026',
    'CPU: QUANTUM NEURAL CORE @ 5.4GHz',
    'MEMORY: 64GB LPDDR5X (100% OK)',
    'STORAGE: NVMe GEN5 2TB (MOUNTED)',
    'INITIALIZING KERNEL MODULES...',
    'LOADING GRAPHICS DRIVERS (AURORA_FX)...',
    'ESTABLISHING SECURE SATELLITE UPLINK...',
    'SCANNIG SECTOR DELTA-7...',
    'ENCRYPTED ARCHIVE DETECTED.',
    'WARNING: SYSTEM IS LOCKED.'
  ];

  useEffect(() => {
    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < bootMessages.length) {
        setLogs(prev => [...prev, bootMessages[currentLog]]);
        setProgress(((currentLog + 1) / bootMessages.length) * 100);
        currentLog++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
            setShowPassword(true);
            setStatus('login');
        }, 500);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const handlePassword = (e) => {
    e.preventDefault();
    const cleanPass = password.toLowerCase().trim();
    if (cleanPass === 'bhargavi' || cleanPass === 'tejaswi') {
      setStatus('success');
      setTimeout(() => onComplete(), 1500);
    } else {
      setStatus('error');
      setTimeout(() => setStatus('login'), 1000);
      setPassword('');
    }
  };

  useEffect(() => {
    if (showPassword && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showPassword, status]);

  return (
    <div className="fixed inset-0 z-[20000] bg-black font-mono text-xs md:text-sm p-6 md:p-20 flex flex-col items-start overflow-hidden select-none">
      {/* Boot Logs */}
      <div className="flex-1 w-full space-y-1 mb-10">
        {logs.map((log, i) => (
          log && (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }}
              className={`${log.includes('WARNING') ? 'text-coral font-black' : 'text-mint'}`}
            >
              <span className="opacity-40">[{new Date().toLocaleTimeString([], { hour12: false })}]</span> {log}
            </motion.div>
          )
        ))}
        
        {/* Loading Bar */}
        {logs.length > 0 && logs.length < bootMessages.length && (

            <div className="w-64 h-3 bg-white/5 border border-white/10 mt-6 relative overflow-hidden">
                <motion.div 
                    className="h-full bg-mint"
                    animate={{ width: `${progress}%` }}
                />
            </div>
        )}
      </div>

      {/* Password Gate */}
      <AnimatePresence>
        {showPassword && status !== 'success' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={status === 'error' ? { 
                x: [0, -15, 15, -15, 15, 0],
                opacity: 1,
                scale: 1
            } : { 
                opacity: 1, 
                scale: 1,
                x: 0
            }}
            transition={{ duration: 0.4 }}
            className={`w-full max-w-sm p-8 border-2 transition-colors duration-300 ${status === 'error' ? 'border-coral bg-coral/5 shadow-[0_0_30px_rgba(255,100,100,0.2)]' : 'border-white/10 bg-white/5'} backdrop-blur-3xl rounded-none`}
          >
            <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <span className={`uppercase font-black tracking-widest ${status === 'error' ? 'text-coral' : 'text-white'}`}>
                        {status === 'error' ? 'ACCESS DENIED' : 'AUTHENTICATION REQUIRED'}
                    </span>
                    <div className={`w-2 h-2 rounded-full animate-pulse ${status === 'error' ? 'bg-coral' : 'bg-mint'}`} />
                </div>
                
                <form onSubmit={handlePassword} className="space-y-4">
                    <div className="text-[10px] uppercase font-black text-white/30 tracking-widest">Identify User:</div>
                    <div className="flex gap-4 border-b border-white/20 pb-2">
                        <span className="text-white/40">PASSWORD: </span>
                        <input
                            ref={inputRef}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-transparent border-none outline-none text-white tracking-[0.5em] flex-1 font-black"
                        />
                    </div>
                    <div className="text-[9px] text-white/20 uppercase tracking-widest italic">
                        Tip: System owner identity required.
                    </div>
                </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Sequence */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black flex flex-col items-center justify-center p-12 text-center"
          >
             <motion.div 
               className="text-mint font-black text-3xl md:text-5xl uppercase tracking-[0.5em] mb-4"
               animate={{ opacity: [1, 0, 1] }}
               transition={{ duration: 0.1, repeat: 10 }}
             >
                ACCESS GRANTED
             </motion.div>
             <div className="text-mint/40 uppercase tracking-[0.8em] text-[10px] animate-pulse">Initializing Desktop Environment...</div>
             <div className="w-1/2 max-w-md h-[1px] bg-mint/20 mt-10 relative overflow-hidden">
                <motion.div 
                    className="absolute inset-0 bg-mint"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-6 left-6 text-white/20 text-[10px] uppercase font-black tracking-widest flex items-center gap-4">
         <span>NETWORK_UP</span>
         <div className="w-1 h-1 bg-mint rounded-full" />
         <span>SECURE_SESSION</span>
      </div>
    </div>
  );
};

export default BootScreen;
