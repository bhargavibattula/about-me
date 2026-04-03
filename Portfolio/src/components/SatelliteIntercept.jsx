import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { myProjects } from '../constants';

const StaticNoise = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden mix-blend-screen">
      <div className="absolute inset-[-100%] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] animate-pulse" />
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
    </div>
  );
};

const FrequencyBars = () => {
  return (
    <div className="flex items-end gap-0.5 h-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-mint"
          animate={{ height: [4, 16, 8, 12, 4] }}
          transition={{
            duration: 0.5 + Math.random(),
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const DecryptingText = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setIndex(prev => prev + 1);
        setDisplayedText(text.slice(0, index + 1));
      }, 30);
      return () => clearTimeout(timeout);
    } else {
        onComplete?.();
    }
  }, [index, text]);

  return <p className="font-mono text-mint/80">{displayedText}<span className="animate-pulse">_</span></p>;
};

const SatelliteIntercept = () => {
  const [intercepting, setIntercepting] = useState(null);
  const [decoded, setDecoded] = useState(null);
  const [scanning, setScanning] = useState(true);

  // Position blips in a circle-like radar fashion
  const projectsWithRadarCoords = useMemo(() => {
    return myProjects.map((p, i) => {
      const angle = (i / myProjects.length) * Math.PI * 2;
      const radius = 25 + Math.random() * 50; // Distance from center
      return {
        ...p,
        radar: {
          x: 50 + Math.cos(angle) * (radius * 0.4),
          y: 50 + Math.sin(angle) * (radius * 0.4),
          radius
        }
      };
    });
  }, []);

  const handleIntercept = (project) => {
    setScanning(false);
    setIntercepting(project);
    setTimeout(() => {
      setDecoded(project);
      setIntercepting(null);
    }, 2500);
  };

  return (
    <div className="relative w-full h-[80vh] md:h-[90vh] bg-primary overflow-hidden border border-white/5 shadow-2xl rounded-xl">
      {/* Background Radar Dish Grid */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[80vw] h-[80vw] border border-mint/20 rounded-full flex items-center justify-center">
            <div className="w-[60%] h-[60%] border border-mint/10 rounded-full" />
            <div className="w-[30%] h-[30%] border border-mint/5 rounded-full" />
            <div className="absolute w-full h-[1px] bg-mint/5" />
            <div className="absolute h-full w-[1px] bg-mint/5" />
        </div>
      </div>

      {/* Radar Sweep */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[40vw] h-[40vw] origin-top-left -translate-x-0 -translate-y-0"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0%, rgba(87, 219, 150, 0.1) 20%, transparent 40%)',
          borderRadius: '100% 0 0 0',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Active Scan UI */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-1">
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-mint animate-ping" />
            <span className="text-mint font-mono text-xs uppercase tracking-[0.2em]">Live Signal Stream</span>
        </div>
        <div className="text-white/30 font-mono text-[10px]">FREQ: 1420.4 MHz | BW: 2.5 MHz</div>
        <div className="mt-2 text-white/50 font-mono text-[9px] uppercase italic">Awaiting source identification...</div>
      </div>

      {/* Radar Blips */}
      <div className="absolute inset-0 pointer-events-auto">
        {projectsWithRadarCoords.map((project, i) => (
          <motion.button
            key={project.id}
            onClick={() => handleIntercept(project)}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute group z-20 cursor-crosshair transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${project.radar.x}%`, top: `${project.radar.y}%` }}
          >
            <div className="relative">
              <div className="w-3 h-3 bg-mint rounded-full shadow-[0_0_15px_#57db96]" />
              <div className="absolute -inset-2 border border-mint/30 rounded-full animate-ping" />
              
              <div className="absolute left-6 top-0 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black/80 border border-mint/50 px-2 py-1 text-[10px] font-mono text-mint uppercase">
                   Signal-{project.id}: UNKNOWN
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Interception Overlay */}
      <AnimatePresence>
        {intercepting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 bg-black flex flex-col items-center justify-center"
          >
            <StaticNoise />
            <div className="relative z-50 text-center space-y-4">
               <motion.div
                 animate={{ opacity: [1, 0, 1] }}
                 transition={{ duration: 0.2, repeat: Infinity }}
                 className="text-white font-mono text-xl tracking-[0.5em] font-black italic"
               >
                 INTERCEPTING SIGNAL...
               </motion.div>
               <div className="flex justify-center">
                 <FrequencyBars />
               </div>
               <div className="text-mint/60 font-mono text-[10px] uppercase">Bypassing Encryption Layer 7</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decoded Broadcast Modal */}
      <AnimatePresence>
        {decoded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
          >
            <div 
                className="w-full max-w-4xl max-h-full overflow-y-auto bg-primary border-4 border-mint/40 p-8 md:p-12 relative shadow-[0_0_100px_rgba(87,219,150,0.15)]"
                style={{
                  backgroundImage: 'radial-gradient(circle at top, rgba(87,219,150,0.05) 0%, transparent 100%)'
                }}
            >
              <button 
                onClick={() => { setDecoded(null); setScanning(true); }}
                className="absolute top-4 right-4 text-mint hover:scale-110 transition-transform cursor-pointer font-mono"
              >
                [ TERMINATE BROADCAST ]
              </button>

              <div className="flex flex-col md:flex-row gap-8">
                {/* Visual Feed */}
                <div className="w-full md:w-1/3 aspect-video md:aspect-square bg-black border border-mint/20 relative overflow-hidden group">
                   <div className="absolute inset-0 bg-gradient-to-t from-mint/20 to-transparent z-10" />
                   <img src={decoded.image} className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700" alt="Transmission Frame" />
                   <div className="absolute top-2 left-2 text-[8px] font-mono text-mint">FEED_LIVE_SECURE</div>
                   <div className="absolute bottom-2 right-2 flex gap-1">
                      <div className="w-1 h-1 bg-mint rounded-full animate-pulse" />
                      <div className="w-1 h-1 bg-mint rounded-full animate-pulse delay-75" />
                      <div className="w-1 h-1 bg-mint rounded-full animate-pulse delay-150" />
                   </div>
                </div>

                {/* Decoded Data */}
                <div className="flex-1 space-y-6">
                   <div className="border-b border-mint/30 pb-4">
                      <h4 className="text-[10px] uppercase font-mono text-white/50 tracking-widest mb-1">Source Identified // Sector 7G</h4>
                      <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">{decoded.title}</h2>
                   </div>

                   <div className="space-y-4">
                      <div className="bg-mint/5 p-4 border-l-2 border-mint">
                        <DecryptingText text={decoded.description} />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <h5 className="text-[10px] uppercase font-mono text-mint font-bold tracking-widest">Technical Specs</h5>
                            <div className="space-y-1">
                               {decoded.subDescription.map((item, i) => (
                                 <DecryptingText key={i} text={`> ${item}`} />
                               ))}
                            </div>
                         </div>

                         <div className="space-y-2">
                            <h5 className="text-[10px] uppercase font-mono text-mint font-bold tracking-widest">Elemental Comp</h5>
                            <div className="flex flex-wrap gap-2">
                               {decoded.tags.map(tag => (
                                 <span key={tag.id} className="text-[10px] font-mono border border-mint/20 px-2 py-1 bg-mint/5 text-mint/80 uppercase">
                                    {tag.name}
                                 </span>
                               ))}
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              </div>

              <div className="mt-12 pt-6 border-t border-mint/20 flex justify-between items-center opacity-40">
                <div className="text-[8px] font-mono text-white uppercase">Decryption: 100% | Source: Verified | Transmission: Secure</div>
                <FrequencyBars />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-6 right-6 font-mono text-[10px] text-white/20 uppercase tracking-widest">
        Satellite-ID: XJ-9 // Delta-Vector Scanning
      </div>
    </div>
  );
};

export default SatelliteIntercept;
