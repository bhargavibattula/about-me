import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const planets = [
  { id: 'frontend', name: 'Frontend', color: '#57db96', radius: 140, speed: 12, skills: ['React', 'TypeScript', 'Tailwind', 'HTML', 'Next.js'], icon: '🔵' },
  { id: 'backend', name: 'Backend', color: '#ca2f8c', radius: 220, speed: 20, skills: ['Python', 'Java', 'FastAPI', 'Spring Boot', 'REST APIs'], icon: '🔴' },
  { id: 'aiml', name: 'AI/ML', color: '#5c33cc', radius: 300, speed: 32, skills: ['LangChain', 'LangGraph', 'TensorFlow', 'OpenCV', 'React Native'], icon: '🟣' },
  { id: 'data', name: 'Databases', color: '#cc6033', radius: 380, speed: 45, skills: ['PostgreSQL', 'MongoDB', 'JDBC', 'Hibernate', 'Git'], icon: '🟡' },
];

const SkillSolar = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  return (
    <div className="h-full bg-black/40 p-10 flex items-center justify-center relative overflow-hidden font-mono cursor-crosshair">
      <div className="absolute inset-0 bg-transparent" onClick={() => setSelectedPlanet(null)} />
      
      {/* Space Overlay - Nebula Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-royal/10 rounded-full blur-[150px] opacity-20 pointer-events-none" />
      
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Sun - Tejaswi Core */}
        <motion.div 
          className="w-32 h-32 rounded-full bg-gradient-to-tr from-white to-royal flex items-center justify-center text-3xl font-black text-black z-50 shadow-[0_0_100px_rgba(255,255,255,0.4)] border-8 border-royal/20"
          animate={{ scale: [1, 1.05, 1], boxShadow: ['0 0 50px rgba(92,51,204,0.3)', '0 0 120px rgba(51,194,204,0.5)', '0 0 50px rgba(92,51,204,0.3)'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          BT
          <div className="absolute -bottom-10 whitespace-nowrap text-[10px] font-black uppercase text-white/40 tracking-[0.6em]">System Sun Core</div>
        </motion.div>

        {/* Orbits */}
        {planets.map((planet) => (
          <div 
            key={planet.id} 
            className="absolute border border-white/5 rounded-full pointer-events-none"
            style={{ width: planet.radius * 2, height: planet.radius * 2 }}
          />
        ))}

        {/* Planets */}
        {planets.map((planet) => (
          <motion.div
            key={planet.id}
            className="absolute z-40 group cursor-pointer"
            animate={selectedPlanet === planet.id ? { 
                scale: 1, x: 0, y: 0, rotate: 0 
            } : { 
                rotate: 360 
            }}
            transition={selectedPlanet === planet.id ? { duration: 0.5 } : { duration: planet.speed, repeat: Infinity, ease: "linear" }}
            style={{ 
                width: planet.radius * 2, 
                height: planet.radius * 2,
                pointerEvents: selectedPlanet ? (selectedPlanet === planet.id ? 'auto' : 'none') : 'auto'
            }}
          >
            <motion.div 
              onClick={(e) => { e.stopPropagation(); setSelectedPlanet(planet.id); }}
              className={`absolute top-0 left-1/2 -translate-x-1/2 rounded-full shadow-2xl transition-all duration-500 hover:scale-125`}
              style={{ 
                  width: selectedPlanet === planet.id ? 80 : 30, 
                  height: selectedPlanet === planet.id ? 80 : 30, 
                  backgroundColor: planet.color,
                  boxShadow: `0 0 40px ${planet.color}44`,
                  top: selectedPlanet === planet.id ? 'calc(50% - 40px)' : '-15px'
              }}
              whileHover={{ rotate: 15 }}
            >
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] uppercase font-black text-white/30 whitespace-nowrap opacity-10 group-hover:opacity-100 transition-opacity">
                    {planet.name} Category
                </div>
            </motion.div>

            {/* Skill Moons (When Planet is Selected) */}
            <AnimatePresence>
                {selectedPlanet === planet.id && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        {planet.skills.map((skill, index) => (
                            <motion.div
                                key={skill}
                                initial={{ opacity: 0, rotate: 0 }}
                                animate={{ 
                                    opacity: 1, 
                                    rotate: (360 / planet.skills.length) * index 
                                }}
                                className="absolute"
                                style={{ width: 350, height: 350 }}
                            >
                                <motion.div 
                                    className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-[10px] uppercase font-black text-white/60 hover:bg-white hover:text-black transition-colors"
                                    style={{ rotate: -((360 / planet.skills.length) * index) }}
                                >
                                    {skill}
                                    <div className="absolute -bottom-3 left-0 w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                                        <motion.div 
                                            className="h-full bg-mint shadow-[0_0_10px_#57db96]"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
                                            transition={{ delay: 0.5 + (index * 0.1) }}
                                        />
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>
          </motion.div>
        ))}

        {/* Side Panel Legend */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 bg-primary/20 p-6 rounded-3xl border border-white/5 backdrop-blur-xl">
            <h4 className="text-[10px] font-black uppercase text-white/20 tracking-widest mb-2">Category Navigation</h4>
            {planets.map(planet => (
                <button 
                  key={planet.id} 
                  onClick={() => setSelectedPlanet(planet.id)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-xl border text-[10px] uppercase font-black tracking-widest transition-all ${
                      selectedPlanet === planet.id ? 'bg-white text-black border-white' : 'bg-white/5 text-white/40 border-white/5 hover:border-white/20'
                  }`}
                >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: planet.color }} />
                    {planet.name}
                </button>
            ))}
        </div>

        {/* Selected Skill Detail Panel (Appears on selecting planet) */}
        <AnimatePresence>
            {selectedPlanet && (
                <motion.div
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 300, opacity: 0 }}
                    className="absolute right-6 top-6 h-fit bg-primary/80 backdrop-blur-3xl border-2 border-white/10 p-8 rounded-3xl shadow-42xl z-50 w-72"
                >
                    <h5 className="text-royal text-[10px] font-black uppercase tracking-[0.4em] mb-1">Decrypted Core Skills</h5>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-6">{selectedPlanet} Cluster</h3>
                    
                    <div className="space-y-4">
                        {planets.find(p => p.id === selectedPlanet).skills.map((skill, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase text-white/60">
                                    <span>{skill}</span>
                                    <span>{Math.floor(Math.random() * 20) + 80}% Proficiency</span>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                     <motion.div 
                                        className="h-full bg-mint" 
                                        initial={{ width: 0 }} 
                                        animate={{ width: `${Math.floor(Math.random() * 20) + 80}%` }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                     />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-10 left-10 text-[9px] uppercase font-black text-white/20 leading-relaxed max-w-[200px]">
         Click on planets or category buttons to examine skill satellites
      </div>
    </div>
  );
};

export default SkillSolar;
