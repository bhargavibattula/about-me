import React, { useState, useEffect } from 'react';

const TopBar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 inset-x-0 h-10 bg-primary/40 backdrop-blur-md border-b border-white/5 z-[10000] flex items-center justify-between px-6 select-none font-mono tracking-widest text-[10px] uppercase">
      <div className="flex items-center gap-4 text-white/40">
        <div className="w-2 h-2 rounded-full bg-mint animate-pulse" />
        <span>Tejaswi_OS_v1.0.4</span>
      </div>
      <div className="text-white/60">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </div>
    </div>
  );
};

export default TopBar;
