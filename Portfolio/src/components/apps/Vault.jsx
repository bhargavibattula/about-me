import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const projects = [
  { id: 'nexus', name: 'NEXUS AI', rarity: 'LEGENDARY', icon: '🤖', color: 'text-royal border-royal/40 bg-royal/10 shadow-royal/40', keyColor: '#5c33cc', description: 'Autonomous multi-agent platform that generates, tests, and deploys software from a single prompt.', tech: ['Next.js', 'FastAPI', 'LangGraph', 'Celery'], link: 'https://github.com/B-Tejaswi-Bhargavi' },
  { id: 'healverse', name: 'HealVerse', rarity: 'EPIC', icon: '🏥', color: 'text-fuchsia border-fuchsia/40 bg-fuchsia/10 shadow-fuchsia/40', keyColor: '#ca2f8c', description: 'AI-driven healthcare app with diet recommendations, medication tracking, and compliance dashboards.', tech: ['Java', 'Spring Boot', 'React Native', 'TypeScript'], link: 'https://github.com/B-Tejaswi-Bhargavi' },
  { id: 'deepnox', name: 'DeepNox', rarity: 'RARE', icon: '🛰️', color: 'text-aqua border-aqua/40 bg-aqua/10 shadow-aqua/40', keyColor: '#33c2cc', description: 'Deepfake detection tool and browser extension using TensorFlow and OpenCV for real-time scoring.', tech: ['Python', 'TensorFlow', 'OpenCV', 'Flash'], link: 'https://github.com/B-Tejaswi-Bhargavi' },
];


const Chest = ({ project, isUnlocked, onUnlock }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6 relative group">
      <motion.div 
        className={`w-48 h-48 rounded-3xl border-4 flex flex-col items-center justify-center relative transition-all duration-500 overflow-hidden ${
          isUnlocked ? project.color + ' border-solid' : 'bg-black/40 border-dashed border-white/10 text-white/10'
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={isUnlocked ? { scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] } : {}}
      >
        <div className={`text-6xl drop-shadow-2xl transition-all duration-700 ${isUnlocked ? 'scale-110' : 'grayscale opacity-20'}`}>
          {isUnlocked ? project.icon : '📦'}
        </div>
        
        {!isUnlocked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none">
             <div className="text-[10px] font-black uppercase tracking-[0.4em] translate-y-12 animate-pulse">Unlock with Key</div>
             <div className="w-10 h-10 border-2 border-white/10 rounded-full flex items-center justify-center text-xs">🔒</div>
          </div>
        )}

        {/* Particles (Simplified) */}
        {isUnlocked && (
          <div className="absolute inset-0 pointer-events-none">
             {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-1 h-1 rounded-full ${project.color.split(' ')[0].replace('text-', 'bg-')}`}
                  initial={{ top: '50%', left: '50%' }}
                  animate={{ 
                    top: `${Math.random() * 100}%`, 
                    left: `${Math.random() * 100}%`,
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0] 
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                />
             ))}
          </div>
        )}
      </motion.div>

      <div className="text-center font-black">
        <div className={`text-[10px] uppercase tracking-[0.6em] mb-1 transition-colors ${isUnlocked ? project.color.split(' ')[0] : 'text-white/20'}`}>
          {isUnlocked ? project.rarity : 'Classified'}
        </div>
        <div className={`text-lg uppercase tracking-tighter transition-colors ${isUnlocked ? 'text-white' : 'text-white/10'}`}>
          {isUnlocked ? project.name : 'Chest Locked'}
        </div>
      </div>
    </div>
  );
};

const Key = ({ project, isUsed }) => {
  return (
    <motion.div
      drag
      dragConstraints={{ top: -500, bottom: 500, left: -500, right: 500 }}
      dragElastic={0.1}
      whileDrag={{ scale: 1.2, zIndex: 100 }}
      className={`w-16 h-16 rounded-2xl flex items-center justify-center cursor-grab active:cursor-grabbing transition-opacity ${
        isUsed ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ backgroundColor: project.keyColor }}
    >
       <div className="text-2xl drop-shadow-lg">🗝️</div>
       <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 px-2 py-1 rounded text-[8px] uppercase font-black text-white pointer-events-none border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
          Drag to {project.id}
       </div>
    </motion.div>
  );
};

const Vault = () => {
    const [unlocked, setUnlocked] = useState([]);
    const [draggingId, setDraggingId] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);

    const handleKeyDrop = (id, info) => {
        // Collision Detection simplified
        const chests = document.querySelectorAll('.vault-chest');
        let found = false;
        chests.forEach(chest => {
            const rect = chest.getBoundingClientRect();
            if (
                info.point.x > rect.left && 
                info.point.x < rect.right && 
                info.point.y > rect.top && 
                info.point.y < rect.bottom &&
                chest.dataset.id === id
            ) {
                setUnlocked(prev => [...prev, id]);
                found = true;
            }
        });
    };

    return (
        <div className="h-full bg-primary/20 p-10 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            <div className="text-center mb-16 relative z-10">
                <h3 className="text-fuchsia text-[10px] font-black uppercase tracking-[0.8em] mb-2 animate-pulse">Draggable Decryption Active</h3>
                <h2 className="text-4xl text-white font-black uppercase tracking-widest italic">Project Repository</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-24 relative z-10 w-full max-w-5xl">
                {projects.map(p => (
                    <div key={p.id} className="vault-chest" data-id={p.id} onClick={() => unlocked.includes(p.id) && setSelectedProject(p)}>
                        <Chest project={p} isUnlocked={unlocked.includes(p.id)} />
                    </div>
                ))}
            </div>

            {/* Keys Row */}
            <div className="mt-32 flex gap-12 relative z-20 group">
                {projects.map(p => (
                    <motion.div 
                        key={p.id} 
                        initial={{ y: 50, opacity: 0 }} 
                        animate={{ y: 0, opacity: 1 }}
                        onDragEnd={(e, info) => handleKeyDrop(p.id, info)}
                    >
                        <Key project={p} isUsed={unlocked.includes(p.id)} />
                    </motion.div>
                ))}
            </div>

            {/* Instruction Overlay */}
            {!unlocked.length && (
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20 text-[9px] uppercase tracking-[0.5em] pointer-events-none">
                    Drop color-coded keys onto matching signal boxes to decrypt
                </div>
            )}

            {/* Detail Modal Overlay */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-[#030412]/95 backdrop-blur-3xl flex items-center justify-center p-10"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }}
                            className={`w-full max-w-2xl border-4 ${selectedProject.color.split(' ')[1]} p-12 rounded-3xl bg-primary relative shadow-2xl`}
                        >
                            <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 text-white/50 text-2xl hover:text-white transition-colors">×</button>
                            
                            <div className="flex items-center gap-6 mb-10">
                                <span className="text-7xl">{selectedProject.icon}</span>
                                <div className="flex flex-col">
                                    <span className={`text-[10px] font-black uppercase tracking-[0.6em] mb-1 ${selectedProject.color.split(' ')[0]}`}>{selectedProject.rarity} RECORD FOUND</span>
                                    <h3 className="text-5xl font-black text-white uppercase tracking-tighter">{selectedProject.name}</h3>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <p className="text-xl text-white/80 leading-relaxed font-serif italic border-l-4 border-white/10 pl-6">{selectedProject.description}</p>
                                
                                <div className="space-y-4">
                                     <h4 className="text-[10px] uppercase font-black tracking-widest text-white/40">Component Blueprint</h4>
                                     <div className="flex flex-wrap gap-2">
                                        {selectedProject.tech.map((t, i) => (
                                            <span key={i} className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase border ${selectedProject.color.split(' ')[1]} bg-white/5 text-white/60`}>
                                                {t}
                                            </span>
                                        ))}
                                     </div>
                                </div>

                                <motion.a 
                                    href={selectedProject.link} target="_blank"
                                    className={`inline-flex items-center gap-4 px-10 py-5 rounded-none font-black uppercase text-sm tracking-[0.3em] bg-white text-black hover:bg-mint transition-colors group cursor-pointer shadow-[0_15px_40px_rgba(3,4,18,0.5)]`}
                                    whileHover={{ y: -5 }}
                                >
                                    Access Repository <span className="group-hover:translate-x-2 transition-transform">➔</span>
                                </motion.a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Vault;
