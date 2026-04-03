import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { myProjects } from '../constants';

const StarField = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 200 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.7 + 0.3,
      duration: Math.random() * 3 + 2,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.3, star.opacity],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const StarSystem = ({ project, discovered, focused, distance }) => {
  return (
    <motion.div
      className="absolute flex items-center justify-center pointer-events-none"
      style={{
        left: `${project.coords.x}%`,
        top: `${project.coords.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Faint Guide Pulse for undiscovered stars nearby */}
      {!discovered && distance < 25 && (
        <motion.div 
          className="absolute rounded-full border border-aqua/10"
          animate={{ scale: [0.8, 1.5], opacity: [0.2, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ width: 120, height: 120 }}
        />
      )}

      {/* Star Core */}
      <motion.div
        className={`rounded-full shadow-lg transition-all duration-500 ${focused ? 'w-10 h-10' : 'w-4 h-4'}`}
        style={{
          background: discovered 
            ? 'radial-gradient(circle, #fff 0%, #33c2cc 70%, transparent 100%)' 
            : 'radial-gradient(circle, rgba(51,194,204,0.15) 0%, transparent 70%)',
          boxShadow: focused 
            ? '0 0 40px #33c2cc' 
            : (discovered ? '0 0 10px #33c2cc33' : (distance < 30 ? '0 0 15px rgba(51,194,204,0.1)' : 'none')),
        }}
        animate={focused ? {
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8],
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Discovery Label */}
      <AnimatePresence>
        {discovered && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-8 whitespace-nowrap text-[9px] text-aqua uppercase tracking-[0.3em] font-black"
          >
            {project.title}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Orbiting Planets (Based on Tags) */}
      {focused && project.tags.map((tag, idx) => (
        <div 
          key={tag.id}
          className="absolute border border-white/5 rounded-full animate-orbit" 
          style={{ 
            '--radius': 35 + (idx * 15), 
            '--angle': (360 / project.tags.length) * idx,
            width: (35 + (idx * 15)) * 2,
            height: (35 + (idx * 15)) * 2,
          }}
        >
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full shadow-md" 
                  style={{ backgroundColor: ['#ca2f8c', '#33c2cc', '#57db96', '#cc6033', '#7a57db'][idx % 5] }} />
        </div>
      ))}
    </motion.div>
  );
};

const ResearchPaper = ({ project, onClose, isStatic }) => {
  return (
    <motion.div
      initial={!isStatic ? { opacity: 0, scale: 0.9, y: 20 } : {}}
      animate={!isStatic ? { opacity: 1, scale: 1, y: 0 } : {}}
      exit={!isStatic ? { opacity: 0, scale: 0.9, y: 20 } : {}}
      className={`relative w-full max-w-2xl bg-[#f4f1ea] text-[#2c2c2c] p-8 md:p-12 shadow-2xl rounded-sm font-serif border-8 border-double border-[#8b7355] ${!isStatic ? 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[80vh] overflow-y-auto z-50' : 'mx-auto'}`}
      style={{
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/old-paper.png")',
      }}
    >
      {!isStatic && (
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl hover:scale-110 transition-transform cursor-pointer"
        >
          ✕
        </button>
      )}

      <div className="border-b-2 border-[#8b7355] pb-4 mb-6 text-center">
        <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-[#5d4037] mb-2">Astronomy Research Log #00{project.id}</h3>
        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight">{project.title}</h2>
        <p className="italic text-sm text-[#5d4037] mt-2">Date: {new Date().toLocaleDateString()} | Sector: {project.coords.x}°N {project.coords.y}°E</p>
      </div>

      <div className="space-y-6 leading-relaxed text-lg">
        <section>
          <h4 className="font-bold border-b border-[#8b7355] inline-block mb-2 italic">I. Executive Summary</h4>
          <p>{project.description}</p>
        </section>

        <section>
          <h4 className="font-bold border-b border-[#8b7355] inline-block mb-2 italic">II. Technical Components</h4>
          <ul className="list-disc list-inside space-y-2 text-base">
            {project.subDescription.map((desc, i) => (
              <li key={i}>{desc}</li>
            ))}
          </ul>
        </section>

        <section>
          <h4 className="font-bold border-b border-[#8b7355] inline-block mb-2 italic">III. Element Composition</h4>
          <div className="flex flex-wrap gap-4 mt-2">
            {project.tags.map((tag) => (
              <div key={tag.id} className="flex items-center gap-2 bg-[#e8e4d9] px-3 py-1 rounded border border-[#8b7355]/30">
                <img src={tag.path} alt={tag.name} className="w-4 h-4 grayscale opacity-80" />
                <span className="text-xs uppercase font-bold text-[#5d4037]">{tag.name}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-12 pt-6 border-t-4 border-double border-[#8b7355] flex justify-between items-end opacity-70">
        <div className="text-[10px] uppercase font-bold">
           Classified Material <br />
           Project Exploration Branch
        </div>
        <div className="text-3xl font-bold italic opacity-30">CONFIDENTIAL</div>
      </div>
    </motion.div>
  );
};

const TelescopeDiscovery = () => {
  const containerRef = useRef(null);
  const [discoveredProjects, setDiscoveredProjects] = useState([]);
  const [focusedProject, setFocusedProject] = useState(null);
  const [minDistance, setMinDistance] = useState(100);
  const [showAlert, setShowAlert] = useState(false);
  const [viewingPaper, setViewingPaper] = useState(null);
  const [viewingArchive, setViewingArchive] = useState(false);

  // Fixed coordinates for projects
  const projectsWithCoords = useMemo(() => {
    return myProjects.map((p, i) => ({
      ...p,
      coords: {
        x: 15 + (i * 15) % 70, 
        y: 20 + (Math.sin(i) * 30 + 30),
      }
    }));
  }, []);

  const lensX = useMotionValue(0);
  const lensY = useMotionValue(0);
  const springX = useSpring(lensX, { damping: 25, stiffness: 150 });
  const springY = useSpring(lensY, { damping: 25, stiffness: 150 });

  const handleDrag = (_, info) => {
    if (!containerRef.current) return;
    const { width, height, left, top } = containerRef.current.getBoundingClientRect();
    const xPct = ((info.point.x - left) / width) * 100;
    const yPct = ((info.point.y - top) / height) * 100;

    lensX.set(xPct);
    lensY.set(yPct);

    let closest = 100;
    let found = null;
    projectsWithCoords.forEach(project => {
      const dx = project.coords.x - xPct;
      const dy = project.coords.y - yPct;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < closest) closest = distance;
      if (distance < 6) found = project;
    });

    setMinDistance(closest);

    if (found && focusedProject?.id !== found.id) {
      setFocusedProject(found);
      if (!discoveredProjects.includes(found.id)) {
          setDiscoveredProjects(prev => [...prev, found.id]);
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000);
      }
    } else if (!found) {
      setFocusedProject(null);
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[100vh] bg-[#030412] overflow-hidden cursor-none select-none"
      style={{ backgroundImage: 'radial-gradient(circle at center, #06091f 0%, #030412 100%)' }}
    >
      {/* Discovery UI Overlay */}
      <div className="absolute top-8 left-8 z-[50] space-y-3 pointer-events-none hidden md:block">
        <div className="flex items-center gap-6">
             <div className="text-[10px] text-white/40 uppercase tracking-[0.5em] font-black">Celestial Archive Analysis</div>
             <div className="text-aqua font-bold tracking-tighter text-sm">
                Progress: {Math.round((discoveredProjects.length / myProjects.length) * 100)}%
             </div>
        </div>
        <div className="w-64 h-[3px] bg-white/5 rounded-full overflow-hidden border border-white/5">
             <motion.div 
               className="h-full bg-gradient-to-r from-aqua via-indigo to-royal shadow-[0_0_15px_rgba(51,194,204,0.5)]"
               animate={{ width: `${(discoveredProjects.length / myProjects.length) * 100}%` }}
               transition={{ type: 'spring', damping: 20 }}
             />
        </div>
      </div>
      
      {/* Sensor Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `linear-gradient(#33c2cc 1px, transparent 1px), linear-gradient(90deg, #33c2cc 1px, transparent 1px)`, backgroundSize: '100px 100px' }} />
      <StarField />
      
      {/* Projects */}
      {projectsWithCoords.map((project) => (
        <StarSystem key={project.id} project={project} discovered={discoveredProjects.includes(project.id)} focused={focusedProject?.id === project.id} distance={minDistance} />
      ))}

      {/* Telescope Lens UI */}
      <motion.div
        drag dragMomentum={false} onDrag={handleDrag}
        className="absolute z-40 w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-white/40 flex items-center justify-center group touch-none cursor-none"
        style={{ boxShadow: '0 0 0 1000vw rgba(0,0,0,0.92), inset 0 0 80px rgba(51,194,204,0.1)', translateX: '-50%', translateY: '-50%', left: 0, top: 0 }}
        initial={{ x: '50vw', y: '50vh' }}
      >
        <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-pulse pointer-events-none" />
        
        <motion.div 
          className="absolute inset-[5%] rounded-full border border-aqua/30 pointer-events-none"
          animate={{ scale: minDistance < 15 ? [0.9, 1.1, 0.9] : 1, opacity: minDistance < 15 ? [0.1, 0.6, 0.1] : 0.05 }}
          transition={{ duration: minDistance < 10 ? 0.3 : (minDistance < 20 ? 0.8 : 2), repeat: Infinity }}
        />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="w-[1px] h-12 bg-white/30 absolute" />
             <div className="h-[1px] w-12 bg-white/30 absolute" />
             <motion.div className="w-full h-full rounded-full border border-aqua/20 absolute" animate={{ opacity: minDistance < 10 ? [0.1, 0.4, 0.1] : 0 }} transition={{ duration: 0.5, repeat: Infinity }} />
        </div>
        
        <div className="absolute -top-12 flex flex-col items-center gap-1">
            <div className={`text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded backdrop-blur-md border ${minDistance < 10 ? 'bg-aqua text-black border-aqua' : 'bg-black/60 text-white/50 border-white/10'}`}>
                {minDistance < 8 ? 'SIGNAL LOCKED' : (minDistance < 20 ? 'SIGNAL DETECTED' : 'SCANNING')}
            </div>
        </div>
        
        <div className="absolute -bottom-12 flex flex-col items-center gap-2">
            {!focusedProject && minDistance < 25 && minDistance > 8 && (
              <motion.div animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }} transition={{ duration: 1.2, repeat: Infinity }} className="text-aqua text-[10px] font-black uppercase tracking-[0.4em] mb-1">▼ Sensor Ghost</motion.div>
            )}
            <div className="flex items-center gap-2 bg-black/60 px-3 py-1 rounded backdrop-blur-md border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-aqua animate-ping" style={{ opacity: minDistance < 20 ? 1 : 0 }} />
                <div className="text-[10px] text-white/70 uppercase tracking-[0.3em] font-bold">Proximity: {Math.max(0, Math.round(100 - minDistance))}%</div>
            </div>
        </div>

        {focusedProject && (
          <motion.button
            initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.stopPropagation(); setViewingPaper(focusedProject); }}
            className="absolute -right-40 bg-white text-black px-8 py-4 rounded-none text-[10px] font-black uppercase tracking-widest pointer-events-auto cursor-pointer shadow-[0_0_50px_rgba(51,194,204,0.4)] border-l-[10px] border-aqua group"
          >
            <span className="relative z-10">Access Source</span>
            <div className="absolute inset-0 bg-aqua scale-x-0 group-hover:scale-x-100 transition-transform origin-left -z-0 opacity-10" />
          </motion.button>
        )}
      </motion.div>

      {/* Discovery Alert */}
      <AnimatePresence>
        {showAlert && (
          <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 20, opacity: 1 }} exit={{ y: -100, opacity: 0 }} className="absolute top-0 left-1/2 -translate-x-1/2 z-50 bg-storm border border-aqua/50 px-6 py-3 rounded-sm flex items-center gap-4 text-aqua">
            <div className="w-2 h-2 bg-aqua rounded-full animate-ping" />
            <div className="uppercase tracking-[0.3em] font-black italic">New Discovery Logged</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Research Paper Modal */}
      <AnimatePresence>
        {viewingPaper && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setViewingPaper(null)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
             <ResearchPaper project={viewingPaper} onClose={() => setViewingPaper(null)} />
          </div>
        )}
      </AnimatePresence>

      {/* Full Archive Trigger */}
      <AnimatePresence>
        {discoveredProjects.length === myProjects.length && !viewingArchive && (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute bottom-24 left-1/2 -translate-x-1/2 z-[55] flex flex-col items-center gap-4">
            <button 
              onClick={() => setViewingArchive(true)}
              className="bg-white text-black px-10 py-5 rounded-none font-black uppercase tracking-[0.3em] text-sm hover:bg-aqua hover:text-black transition-colors cursor-pointer shadow-[0_0_50px_rgba(255,255,255,0.3)] border-b-8 border-aqua"
            >
              Access Complete Galactic Archive
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Archive Grid View Overlay */}
      <AnimatePresence>
        {viewingArchive && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#030412] overflow-y-auto p-8 md:p-20" style={{ backgroundImage: 'radial-gradient(circle at center, #06091f 0%, #030412 100%)' }}>
            <button onClick={() => setViewingArchive(false)} className="fixed top-10 right-10 z-[110] text-white/50 hover:text-white uppercase tracking-widest text-xs font-bold border border-white/20 px-4 py-2 cursor-pointer">Return</button>
            <StarField />
            <div className="max-w-7xl mx-auto space-y-20 relative">
              <header className="text-center mb-32">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-[0.4em] mb-4 text-white">Full Celestial Record</h2>
                <div className="w-32 h-1 bg-aqua mx-auto" />
              </header>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                {projectsWithCoords.map((project, idx) => (
                  <motion.div key={project.id} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: idx * 0.1 }}>
                     <ResearchPaper project={project} isStatic={true} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 text-[10px] uppercase tracking-[0.5em] text-center pointer-events-none">Scan nebula for encrypted project artifacts</div>
    </section>
  );
};

export default TelescopeDiscovery;
