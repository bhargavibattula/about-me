import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const NeuralMap = () => {
    const nodes = useMemo(() => {
        const center = { x: 50, y: 50, id: 'core', label: 'TEJASWI', type: 'core' };
        const categories = [
            { type: 'frontend', color: '#57db96', count: 4, label: 'UI/UX' },
            { type: 'backend', color: '#ca2f8c', count: 4, label: 'API' },
            { type: 'ai', color: '#5c33cc', count: 4, label: 'MODELS' },
            { type: 'db', color: '#cc6033', count: 4, label: 'DATA' },
        ];
        
        let subNodes = [];
        categories.forEach((cat, catIdx) => {
            for (let i = 0; i < cat.count; i++) {
                const angle = (catIdx * Math.PI / 2) + (i * Math.PI / 8);
                const radius = 25 + Math.random() * 15;
                subNodes.push({
                    id: `${cat.type}-${i}`,
                    x: 50 + Math.cos(angle) * radius,
                    y: 50 + Math.sin(angle) * radius,
                    type: cat.type,
                    label: ['React', 'Next.js', 'Python', 'FastAPI', 'AWS', 'TensorFlow', 'PostgreSQL', 'Git', 'Java', 'Docker'][ (catIdx * 2 + i) % 10 ],
                    color: cat.color
                });
            }
        });
        return [center, ...subNodes];
    }, []);

    const connections = useMemo(() => {
        let conn = [];
        nodes.slice(1).forEach((node, i) => {
            // All connect to core
            conn.push({ from: 'core', to: node.id });
            // Connect to neighbors
            if (i > 0 && nodes[i].type === nodes[i+1]?.type) {
                conn.push({ from: nodes[i].id, to: nodes[i+1].id });
            }
        });
        return conn;
    }, [nodes]);

    const [selectedId, setSelectedId] = useState(null);

    return (
        <div className="h-full bg-black/40 p-10 flex flex-col relative overflow-hidden font-mono cursor-crosshair">
            <div className="absolute inset-x-0 top-10 flex justify-center z-10">
                <div className="bg-primary/40 backdrop-blur-3xl border border-white/5 px-6 py-2 rounded-full flex gap-10">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-mint" />
                        <span className="text-[10px] uppercase font-black tracking-widest text-white/40">Nodes: 17</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-fuchsia" />
                        <span className="text-[10px] uppercase font-black tracking-widest text-white/40">Connections: 23</span>
                    </div>
                </div>
            </div>

            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                    <linearGradient id="connGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#5c33cc" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#57db96" stopOpacity="0.8" />
                    </linearGradient>
                </defs>
                {connections.map((conn, i) => {
                    const from = nodes.find(n => n.id === conn.from);
                    const to = nodes.find(n => n.id === conn.to);
                    const isHighlighted = selectedId === conn.from || selectedId === conn.to;
                    
                    return (
                        <g key={i}>
                            <motion.line
                                x1={`${from.x}%`} y1={`${from.y}%`}
                                x2={`${to.x}%`} y2={`${to.y}%`}
                                stroke={isHighlighted ? "rgba(87, 219, 150, 0.4)" : "rgba(255, 255, 255, 0.05)"}
                                strokeWidth={isHighlighted ? 2 : 1}
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                            />
                            {isHighlighted && (
                                <motion.circle r="1.5" fill="#57db96">
                                    <animateMotion dur="2s" repeatCount="indefinite" path={`M ${from.x},${from.y} L ${to.x},${to.y}`} keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
                                </motion.circle>
                            )}
                        </g>
                    );
                })}
            </svg>

            {nodes.map((node) => (
                <motion.button
                    key={node.id}
                    onClick={() => setSelectedId(node.id)}
                    className={`absolute w-4 h-4 rounded-full flex items-center justify-center transition-all z-20 group transform -translate-x-1/2 -translate-y-1/2`}
                    style={{ left: `${node.x}%`, top: `${node.y}%`, backgroundColor: node.type === 'core' ? '#fff' : node.color, boxShadow: `0 0 30px ${node.color}44` }}
                    whileHover={{ scale: 1.5 }}
                >
                    <div className="absolute -top-10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-2 py-1 rounded text-[8px] uppercase font-black text-white pointer-events-none border border-white/10 uppercase tracking-widest">
                        {node.label}
                    </div>
                </motion.button>
            ))}

            <div className="absolute bottom-10 right-10 flex flex-col items-end gap-2 bg-primary/40 p-6 rounded-3xl border border-white/5 backdrop-blur-3xl w-72">
                <AnimatePresence mode="wait">
                    {selectedId ? (
                        <motion.div key={selectedId} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}>
                            <h4 className="text-[10px] font-black uppercase text-mint tracking-[0.4em] mb-1">Signal Status: Locked</h4>
                            <h3 className="text-2xl text-white font-black uppercase tracking-tighter mb-4">{nodes.find(n => n.id === selectedId).label} Node</h3>
                            <div className="text-[10px] text-white/40 uppercase tracking-widest leading-relaxed mb-4">
                                This node core represents advanced processing of {nodes.find(n => n.id === selectedId).label} architecture and network protocols.
                            </div>
                            <div className="h-[2px] bg-white/5 w-full rounded-full overflow-hidden">
                                <motion.div className="h-full bg-mint" initial={{ width: 0 }} animate={{ width: '85%' }} transition={{ duration: 1.5, ease: "easeOut" }} />
                            </div>
                        </motion.div>
                    ) : (
                        <div className="text-[10px] text-white/20 uppercase tracking-[0.5em] text-center w-full">Select a node to inspect its network connections</div>
                    )}
                </AnimatePresence>
            </div>

            <div className="absolute bottom-10 left-10 pointer-events-none text-fuchsia/40 text-[9px] uppercase tracking-[0.8em] animate-pulse">NEURAL_MAP Live Syncing</div>
        </div>
    );
};

export default NeuralMap;
