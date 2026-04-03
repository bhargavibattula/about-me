import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const SkillGame = () => {
    const [gameState, setGameState] = useState('IDLE'); // IDLE, PLAYING, COMPLETE
    const [score, setScore] = useState(0);
    const [fallingNodes, setFallingNodes] = useState([]);
    const [syncedCount, setSyncedCount] = useState({ frontend: 0, backend: 0, ai: 0 });
    const gameRef = useRef(null);

    const skills = [
        { id: 'react', label: 'React.js', cat: 'frontend' },
        { id: 'next', label: 'Next.js', cat: 'frontend' },
        { id: 'java', label: 'Java', cat: 'backend' },
        { id: 'python', label: 'Python', cat: 'ai' },
        { id: 'fastapi', label: 'FastAPI', cat: 'backend' },
        { id: 'langchain', label: 'LangChain', cat: 'ai' },
        { id: 'node', label: 'Node.js', cat: 'backend' },
        { id: 'tailwind', label: 'Tailwind', cat: 'frontend' },
        { id: 'postgresql', label: 'PostgreSQL', cat: 'backend' },
        { id: 'langgraph', label: 'LangGraph', cat: 'ai' },
        { id: 'spring', label: 'Spring Boot', cat: 'backend' },
        { id: 'vite', label: 'Vite', cat: 'frontend' }
    ];

    const sockets = [
        { id: 'frontend', label: 'UI_FRONTEND', color: 'border-aqua text-aqua bg-aqua/5 shadow-[0_0_20px_rgba(51,194,204,0.1)]' },
        { id: 'backend', label: 'SYSTEM_CORE', color: 'border-royal text-royal bg-royal/5 shadow-[0_0_20px_rgba(92,51,204,0.1)]' },
        { id: 'ai', label: 'INTELLIGENCE', color: 'border-mint text-mint bg-mint/5 shadow-[0_0_20px_rgba(87,219,150,0.1)]' }
    ];

    useEffect(() => {
        if (gameState === 'PLAYING') {
            const spawnInterval = setInterval(() => {
                const randomSkill = skills[Math.floor(Math.random() * skills.length)];
                setFallingNodes(prev => [...prev, {
                    ...randomSkill,
                    gameId: Date.now(),
                    x: Math.random() * 80 + 10,
                    y: -10,
                    speed: Math.random() * 1.5 + 2
                }]);
            }, 1000);
            return () => clearInterval(spawnInterval);
        }
    }, [gameState]);

    useEffect(() => {
        if (gameState === 'PLAYING') {
            const movementInterval = setInterval(() => {
                setFallingNodes(prev => {
                    const next = prev.map(node => ({ ...node, y: node.y + node.speed }));
                    const missed = next.filter(node => node.y > 100);
                    if (missed.length > 0) {
                        // Optional penalty
                    }
                    return next.filter(node => node.y <= 100);
                });
            }, 30);
            return () => clearInterval(movementInterval);
        }
    }, [gameState]);

    const handleNodeClick = (node) => {
        setScore(s => s + 100);
        setSyncedCount(prev => ({ ...prev, [node.cat]: prev[node.cat] + 1 }));
        setFallingNodes(prev => prev.filter(n => n.gameId !== node.gameId));

        if (score >= 2000) setGameState('COMPLETE');
    };

    return (
        <section id="sync" className="py-32 px-8 bg-primary/20 backdrop-blur-3xl border-y border-white/5 relative overflow-hidden h-[800px]">
             <div className="container mx-auto max-w-6xl h-full flex flex-col relative z-10">
                
                <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-12">
                    <div>
                        <span className="text-xs font-black uppercase tracking-[0.8em] text-mint mb-4 block">System Optimization // SYNC_CORE</span>
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic">Skill <br /> <span className="text-white/10 italic">Synthesizer</span></h2>
                    </div>
                    <div className="flex flex-col items-end gap-4">
                        <div className="text-[10px] font-black uppercase text-white/20 tracking-[0.6em]">Core Optimization Progress</div>
                        <div className="text-4xl font-black text-white italic tracking-tighter">{Math.min(100, Math.round((score / 2000) * 100))}%</div>
                    </div>
                </div>

                <div className="flex-1 rounded-[60px] bg-[#0c0e25]/60 border border-white/5 overflow-hidden relative shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
                    <AnimatePresence>
                        {gameState === 'IDLE' && (
                            <motion.div 
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0c0e25]/80 backdrop-blur-3xl p-12 text-center"
                            >
                                <div className="w-24 h-24 rounded-full border-4 border-mint flex items-center justify-center text-4xl mb-8 animate-pulse shadow-[0_0_50px_rgba(87,219,150,0.3)]">⚡</div>
                                <h3 className="text-4xl font-black uppercase italic text-white mb-6 tracking-tighter underline decoration-mint decoration-4 underline-offset-8">INITIATE_SYNC_PROTOCOL</h3>
                                <p className="text-[11px] text-white/30 uppercase font-black tracking-[0.4em] max-w-md mb-12 leading-relaxed">Synthesize falling technical nodes into the correct architectural modules to stabilize the neural core.</p>
                                <button 
                                    onClick={() => setGameState('PLAYING')}
                                    className="px-16 py-6 bg-white text-black font-black uppercase text-xs tracking-[0.8em] hover:bg-mint hover:scale-110 transition-all shadow-2xl"
                                >
                                    Authorize Entry ➔
                                </button>
                            </motion.div>
                        )}

                        {gameState === 'COMPLETE' && (
                            <motion.div 
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0c0e25]/90 backdrop-blur-3xl p-12 text-center"
                            >
                                <div className="text-mint text-7xl mb-8">✓</div>
                                <h3 className="text-4xl font-black uppercase italic text-white mb-4 tracking-tighter">CORE_SYNTHESIZED</h3>
                                <p className="text-[10px] text-white/30 uppercase font-black tracking-[0.8em] mb-12 italic">Architectural Integrity: 100% // Optimized</p>
                                <button 
                                    onClick={() => { setGameState('IDLE'); setScore(0); setSyncedCount({ frontend: 0, backend: 0, ai: 0 }); }}
                                    className="px-12 py-4 border border-white/10 text-white font-black uppercase text-[10px] tracking-widest hover:bg-white/5 transition-colors"
                                >
                                    Recalibrate Core
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Active Game Layer */}
                    <div className="absolute inset-0 p-12 flex flex-col">
                        <div className="flex-1 relative overflow-hidden">
                             {fallingNodes.map(node => (
                                 <motion.button
                                    key={node.gameId}
                                    onClick={() => handleNodeClick(node)}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="absolute p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 hover:border-white/30 transition-all group flex flex-col items-center gap-2 cursor-pointer shadow-2xl"
                                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                                 >
                                     <span className="text-[9px] font-black uppercase text-white/40 group-hover:text-white tracking-widest">{node.label}</span>
                                     <div className={`h-1 w-full bg-gradient-to-r ${node.cat === 'frontend' ? 'from-aqua' : node.cat === 'backend' ? 'from-royal' : 'from-mint'} to-transparent`} />
                                 </motion.button>
                             ))}
                        </div>

                        {/* Module Sockets */}
                        <div className="grid grid-cols-3 gap-8 mt-12 pb-4">
                            {sockets.map(s => (
                                <div key={s.id} className={`p-8 rounded-[30px] border-2 transition-all flex flex-col items-center gap-4 text-center ${s.color}`}>
                                    <span className="text-[10px] font-black uppercase tracking-[0.8em] opacity-40">{s.label}</span>
                                    <div className="flex items-end gap-2">
                                        <span className="text-3xl font-black italic">{syncedCount[s.id]}</span>
                                        <span className="text-[9px] font-black text-white/20 mb-1">NODES</span>
                                    </div>
                                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-2">
                                         <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min(100, syncedCount[s.id] * 10)}%` }}
                                            className="h-full bg-current"
                                         />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SkillGame;
