import React, { useMemo } from 'react';
import { motion } from 'motion/react';

const SkillCloud = () => {
    const skills = [
        'Java', 'JavaScript', 'TypeScript', 'Python', 'C',
        'React.js', 'Next.js', 'Tailwind', 'Node.js', 'Express',
        'Spring Boot', 'FastAPI', 'Flask', 'MongoDB', 'MySQL',
        'PostgreSQL', 'Git', 'Vercel', 'LangChain', 'LangGraph',
        'NumPy', 'Pandas', 'Streamlit', 'Figma', 'Socket.io',
        'REST', 'JWT', 'Hibernate', 'Render', 'Supabase'
    ];

    const nodes = useMemo(() => skills.map((s, i) => ({
        id: s,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 10 + 5,
        speed: Math.random() * 20 + 20,
        opacity: Math.random() * 0.1 + 0.05
    })), []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none opacity-40">
             {/* Neural Constellation Connections (SVG) */}
             <svg className="absolute inset-0 w-full h-full opacity-10">
                 {nodes.slice(0, 15).map((node, i) => {
                     const nextNode = nodes[(i + 1) % nodes.length];
                     return (
                         <motion.line 
                            key={i}
                            x1={`${node.x}%`} y1={`${node.y}%`}
                            x2={`${nextNode.x}%`} y2={`${nextNode.y}%`}
                            stroke="white"
                            strokeWidth="1"
                            animate={{ opacity: [0.1, 0.3, 0.1], strokeWidth: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 5 + i }}
                         />
                     );
                 })}
             </svg>

             {/* Floating Skill Nodes */}
             {nodes.map((node, i) => (
                 <motion.div
                    key={node.id}
                    initial={{ x: `${node.x}%`, y: `${node.y}%` }}
                    animate={{ 
                        y: [`${node.y}%`, `${node.y + 5}%`, `${node.y}%`],
                        opacity: [node.opacity, node.opacity * 2, node.opacity]
                    }}
                    transition={{ 
                        repeat: Infinity, 
                        duration: node.speed, 
                        ease: "easeInOut" 
                    }}
                    className="absolute flex flex-col items-center gap-2 group"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                 >
                     <div className="w-[1px] h-[1px] bg-white shadow-[0_0_10px_white] rounded-full" />
                     <span className="text-[7px] font-black uppercase text-white/20 tracking-[0.2em]">{node.id}</span>
                 </motion.div>
             ))}

             {/* Background Depth Layers */}
             <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-royal/10 blur-[200px] rounded-full animate-pulse" />
             <div className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] bg-mint/10 blur-[200px] rounded-full animate-pulse" />
        </div>
    );
};

export default SkillCloud;
