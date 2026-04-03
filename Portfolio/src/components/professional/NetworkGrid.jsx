import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const NetworkNode = ({ x, y, label, icon, isActive, isCenter, onClick }) => (
    <motion.div 
        onClick={onClick}
        whileHover={{ scale: 1.1 }}
        animate={{ 
            boxShadow: isActive ? '0 0 30px rgba(87,214,255,0.6)' : '0 0 10px rgba(255,255,255,0.1)',
            borderColor: isActive ? '#57db96' : 'rgba(255,255,255,0.1)'
        }}
        className={`absolute z-20 w-16 h-16 md:w-20 md:h-20 rounded-full border-2 backdrop-blur-xl flex flex-col items-center justify-center cursor-pointer transition-colors ${
            isCenter ? 'bg-mint/20 border-mint shadow-[0_0_30px_rgba(87,219,150,0.3)]' : 'bg-white/5'
        }`}
        style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
    >
        <span className="text-2xl mb-1">{icon}</span>
        <span className={`text-[8px] font-black uppercase tracking-widest ${isActive ? 'text-white' : 'text-white/40'}`}>{label}</span>
    </motion.div>
);

const Packet = ({ pathId, speedMultiplier }) => (
    <motion.circle 
        r="3" 
        fill="#57db96" 
        className="shadow-[0_0_10px_#57db96]"
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: "100%" }}
        transition={{ 
            duration: 2.5 / speedMultiplier, 
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 2 
        }}
        style={{ offsetPath: `path(url(#${pathId}))` }}
    />
);

const NetworkGrid = () => {
    const [activeNode, setActiveNode] = useState('center');
    const [networkSpeed, setNetworkSpeed] = useState(1);
    const [showResponse, setShowResponse] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const nodes = [
        { id: 'github', label: 'GitHub', icon: '🐙', x: 20, y: 30, req: 'GET /repos', resp: '{ "items": ["PortfolioV3", "NexusAI", "DeepNox"] }', desc: 'Fetching architectural repositories from remote origin.' },
        { id: 'linkedin', label: 'LinkedIn', icon: '🔗', x: 80, y: 30, req: 'GET /profile', resp: '{ "status": "Open to Hire", "role": "Architect" }', desc: 'Retrieving professional credentials and social network nodes.' },
        { id: 'projects', label: 'Projects', icon: '💻', x: 20, y: 70, req: 'GET /projects', resp: '{ "data": ["Hatched_Dragons", "Neural_Forge"] }', desc: 'Analyzing local project registry and performance benchmarks.' },
        { id: 'apis', label: 'APIs', icon: '⚡', x: 80, y: 70, req: 'POST /analyze', resp: '{ "ai_result": "Optimization COMPLETE" }', desc: 'Transmission of technical data for deep neural processing.' }
    ];

    const currentData = nodes.find(n => n.id === activeNode) || { label: 'BHARU', req: 'PING system', resp: 'PONG', desc: 'Core Central Processor established and online.' };

    const sendRequest = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setShowResponse(true);
        }, 1200);
    };

    return (
        <div className="w-full h-full min-h-[600px] text-white flex flex-col md:flex-row gap-12 relative overflow-hidden font-sans">
            
            {/* Visual Graph Interface */}
            <div className="flex-1 relative border border-white/5 rounded-[40px] bg-black/40 overflow-hidden min-h-[400px]">
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                    <defs>
                        {nodes.map(n => (
                            <path 
                                key={`path-${n.id}`} 
                                id={`path-${n.id}`} 
                                d={`M 50 50 L ${n.x} ${n.y}`} 
                                pathLength="100"
                            />
                        ))}
                    </defs>
                    {nodes.map(n => (
                        <motion.line 
                            key={`line-${n.id}`}
                            x1="50%" y1="50%" x2={`${n.x}%`} y2={`${n.y}%`}
                            stroke={activeNode === n.id ? "#57db96" : "white"}
                            strokeWidth="1"
                            strokeOpacity={activeNode === n.id ? "0.8" : "0.2"}
                            animate={{ strokeWidth: activeNode === n.id ? 2 : 1 }}
                        />
                    ))}
                </svg>

                {/* Nodes */}
                <NetworkNode x={50} y={50} label="Bharu" icon="👧" isCenter={true} isActive={activeNode === 'center'} onClick={() => setActiveNode('center')} />
                {nodes.map(n => (
                    <NetworkNode 
                        key={n.id} 
                        x={n.x} y={n.y} 
                        label={n.label} icon={n.icon} 
                        isActive={activeNode === n.id}
                        onClick={() => { setActiveNode(n.id); setShowResponse(false); }}
                    />
                ))}

                {/* Constant Packets */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                     {nodes.map(n => (
                         <div key={`packets-${n.id}`}>
                            <Packet pathId={`path-${n.id}`} speedMultiplier={networkSpeed} />
                         </div>
                     ))}
                </div>

                {/* Controller Mode */}
                <div className="absolute top-8 left-8 flex gap-3">
                     <button onClick={() => setNetworkSpeed(1)} className={`px-4 py-1.5 rounded-full border text-[8px] font-black uppercase tracking-widest ${networkSpeed === 1 ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 text-white/40 hover:text-white'}`}>Slow_Net 🐢</button>
                     <button onClick={() => setNetworkSpeed(3)} className={`px-4 py-1.5 rounded-full border text-[8px] font-black uppercase tracking-widest ${networkSpeed === 3 ? 'bg-mint text-black border-mint' : 'bg-white/5 border-white/10 text-white/40 hover:text-white'}`}>Fast_Net ⚡</button>
                </div>
            </div>

            {/* Protocol Panel */}
            <div className="w-full md:w-80 space-y-6">
                <div className="p-8 rounded-[40px] border border-white/5 bg-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">📡</div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-mint block mb-4">Network_Protocol // 0xAF</span>
                    <h4 className="text-2xl font-black uppercase tracking-tight italic mb-6">Active <br /> <span className="text-white/40">Nexus:</span> {currentData.label}</h4>
                    
                    <div className="space-y-4 mb-8">
                         <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                              <span className="text-[8px] font-black text-white/20 uppercase tracking-widest block mb-1">Request_Header</span>
                              <code className="text-xs text-mint font-mono">{currentData.req}</code>
                         </div>
                         <AnimatePresence mode="wait">
                            {showResponse ? (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-2xl bg-black/40 border border-mint/20">
                                    <span className="text-[8px] font-black text-mint uppercase tracking-widest block mb-1">Response_Load</span>
                                    <pre className="text-[10px] text-white/80 font-mono whitespace-pre-wrap">{currentData.resp}</pre>
                                </motion.div>
                            ) : isLoading ? (
                                <div className="p-4 flex flex-col items-center gap-3 italic text-white/20">
                                     <div className="w-6 h-6 border-2 border-mint border-t-transparent rounded-full animate-spin" />
                                     <span className="text-[8px] font-black uppercase tracking-widest">TRANSMITTING...</span>
                                </div>
                            ) : (
                                <div className="p-8 border border-dashed border-white/10 rounded-2xl text-center">
                                     <span className="text-[9px] font-black text-white/20 uppercase tracking-widest italic">Awaiting Response</span>
                                </div>
                            )}
                         </AnimatePresence>
                    </div>

                    <p className="text-[10px] text-white/40 font-black uppercase tracking-widest leading-relaxed mb-10 italic">
                         "{currentData.desc}"
                    </p>

                    <button 
                        onClick={sendRequest}
                        disabled={isLoading || showResponse}
                        className="w-full py-5 rounded-2xl bg-white text-black font-black uppercase text-[10px] tracking-[0.4em] hover:scale-105 transition-all shadow-2xl disabled:opacity-20 disabled:scale-100"
                    >
                        Execute Request ➔
                    </button>
                    {showResponse && (
                        <button onClick={() => setShowResponse(false)} className="w-full mt-4 text-[9px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors">Clear_Cache</button>
                    )}
                </div>
            </div>

            {/* Background Data Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
    );
};

export default NetworkGrid;
