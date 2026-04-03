import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const DataVault = () => {
    const [activeTable, setActiveTable] = useState(null);
    const [filter, setFilter] = useState('ALL');
    const [isExecuting, setIsExecuting] = useState(false);
    const [queryText, setQueryText] = useState('SELECT * FROM projects;');

    const projects = [
        { name: 'NEXUS AI', tech: 'Next.js, LangGraph', type: 'AI', description: 'Autonomous multi-agent deployment core.' },
        { name: 'HealVerse', tech: 'Java, Spring Boot', type: 'MERN', description: 'AI healthcare ecosystem with analytics.' },
        { name: 'DeepNox', tech: 'Python, TensorFlow', type: 'AI', description: 'Real-time deepfake detection engine.' },
        { name: 'Portfolio V3', tech: 'React, Framer Motion', type: 'Web', description: 'High-end gamified architectural portfolio.' },
    ];

    const skills = [
        { name: 'React', level: 'Expert', category: 'Frontend' },
        { name: 'Node.js', level: 'Advanced', category: 'Backend' },
        { name: 'Python', level: 'Expert', category: 'AI/ML' },
        { name: 'SQL', level: 'Advanced', category: 'Database' },
    ];

    const achievements = [
        { title: 'PRAJWALAN Hackathon Winner', year: '2025', description: '1st Place for DeepNox AI tool.' },
        { title: 'Yuganta AI Intern', year: '2025', description: 'Leading neural integration projects.' },
        { title: '9.22 CGPA Merit', year: '2024', description: 'Academic excellence recognition.' },
    ];

    const handleFilter = (type) => {
        setIsExecuting(true);
        setFilter(type);
        setQueryText(`SELECT * FROM projects WHERE type='${type}';`);
        setTimeout(() => setIsExecuting(false), 800);
    };

    const resetQuery = () => {
        setIsExecuting(true);
        setFilter('ALL');
        setQueryText('SELECT * FROM projects;');
        setTimeout(() => setIsExecuting(false), 800);
    };

    const filteredProjects = projects.filter(p => {
        if (filter === 'ALL') return true;
        return p.type === filter;
    });

    const tableData = {
        projects: { data: filteredProjects, columns: ['name', 'tech', 'type', 'description'] },
        skills: { data: skills, columns: ['name', 'level', 'category'] },
        achievements: { data: achievements, columns: ['title', 'year', 'description'] }
    };

    return (
        <div className="w-full h-full text-white font-mono relative">
            <header className="mb-12 text-center">
                <h3 className="text-royal text-[10px] font-black uppercase tracking-[10px] mb-4">Secure Database Node</h3>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">Data <span className="text-white/10">Vault</span></h2>
            </header>

            {/* SQL Query Bar */}
            <div className="bg-black/60 border border-white/10 p-6 rounded-2xl mb-12 relative overflow-hidden group">
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                    </div>
                    <span className="text-[10px] text-white/20 uppercase font-black uppercase tracking-widest">Query_Input // SQL_SHELL</span>
                </div>

                <div className="flex items-center gap-4 text-royal font-bold text-sm md:text-xl">
                    <span className="text-mint opacity-50">❯</span>
                    <span className="tracking-tight">{activeTable !== 'projects' ? `SELECT * FROM ${activeTable || 'root'};` : queryText}</span>
                    <motion.div
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="w-2.5 h-6 bg-mint shadow-[0_0_10px_#57db96]"
                    />
                </div>

                {/* Filter Buttons */}
                <div className="flex gap-4 mt-8">
                    <button onClick={resetQuery} className={`px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest transition-all ${filter === 'ALL' ? 'border-mint text-mint bg-mint/5' : 'border-white/10 text-white/30 hover:text-white'}`}>All_Records</button>
                    <button onClick={() => { setActiveTable('projects'); handleFilter('AI'); }} className={`px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest transition-all ${filter === 'AI' ? 'border-royal text-royal bg-royal/5' : 'border-white/10 text-white/30 hover:text-white'}`}>AI_Projects</button>
                    <button onClick={() => { setActiveTable('projects'); handleFilter('MERN'); }} className={`px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest transition-all ${filter === 'MERN' ? 'border-fuchsia text-fuchsia bg-fuchsia/5' : 'border-white/10 text-white/30 hover:text-white'}`}>MERN_Stack</button>
                </div>
            </div>

            {/* Table Cards Grid */}
            <AnimatePresence mode="wait">
                {!activeTable ? (
                    <motion.div
                        key="tables"
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {['projects', 'skills', 'achievements'].map((table) => (
                            <motion.div
                                key={table}
                                whileHover={{ scale: 1.05, borderColor: '#57db96' }}
                                animate={{ y: [0, -10, 0] }}
                                transition={{ y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: table === 'skills' ? 1 : table === 'achievements' ? 2 : 0 } }}
                                role="button"
                                onClick={() => setActiveTable(table)}
                                className="group p-8 rounded-[40px] bg-white/5 border border-white/5 flex flex-col items-center justify-center gap-6 relative overflow-hidden transition-colors"
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-mint/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                                    {table === 'projects' ? '📁' : table === 'skills' ? '⚡' : '🏆'}
                                </div>
                                <span className="text-xs font-black uppercase tracking-[0.4em] text-white/40 group-hover:text-white transition-colors">{table}</span>
                                <div className="text-[9px] font-black px-4 py-1 border border-white/10 rounded-full text-royal uppercase tracking-widest group-hover:bg-royal group-hover:text-white transition-all">Table_View</div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        key="data-view"
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                        className="bg-black/60 border border-white/10 rounded-[40px] p-8 md:p-12 relative overflow-hidden"
                    >
                        {/* Prominent Return Button */}
                        <button
                            onClick={() => setActiveTable(null)}
                            className="absolute top-8 right-8 z-50 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white text-[10px] font-black text-white hover:text-black transition-all uppercase tracking-widest shadow-xl flex items-center gap-2"
                        >
                            <span>⮐</span> Return to Root
                        </button>

                        <div className="mt-4 mb-10 border-b border-white/5 pb-8 flex flex-col md:flex-row justify-between items-end gap-6">
                            <div>
                                <span className="text-[10px] text-mint uppercase font-black tracking-[0.3em] block mb-2 animate-pulse">Running Session_01 // ARCHIVE_SCAN</span>
                                <h4 className="text-4xl font-black uppercase tracking-tighter italic">Table: {activeTable}</h4>
                            </div>
                            <div className="text-[9px] text-white/20 font-black uppercase tracking-widest">Status: 200 OK | Records: {tableData[activeTable].data.length}</div>
                        </div>

                        {isExecuting ? (
                            <div className="h-64 flex flex-col items-center justify-center gap-6">
                                <div className="w-12 h-12 border-2 border-mint border-t-transparent rounded-full animate-spin" />
                                <span className="text-[10px] font-black uppercase tracking-[0.6em] text-mint animate-pulse">Executing Query...</span>
                            </div>
                        ) : tableData[activeTable].data.length === 0 ? (
                            <div className="h-64 flex flex-col items-center justify-center text-white/20 italic">
                                <div className="text-4xl mb-4">📭</div>
                                <span className="uppercase font-black text-[10px] tracking-widest">No records found matching criteria</span>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-[11px] font-black uppercase tracking-widest">
                                    <thead>
                                        <tr className="text-white/20 border-b border-white/5">
                                            {tableData[activeTable].columns.map(col => (
                                                <th key={col} className="pb-6 px-4">{col}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData[activeTable].data.map((row, idx) => (
                                            <motion.tr
                                                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
                                                key={idx} className="border-b border-white/5 hover:bg-white/2 transition-colors cursor-default"
                                            >
                                                {tableData[activeTable].columns.map(col => (
                                                    <td key={col} className="py-6 px-4 text-white/80 transition-colors uppercase tracking-widest">{row[col]}</td>
                                                ))}
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        <div className="mt-12 pt-8 border-t border-white/5 flex justify-between opacity-20">
                            <span className="text-[8px] uppercase tracking-widest">DB_NODE_V3.0.4</span>
                            <span className="text-[8px] uppercase tracking-widest">SYS_SECURED</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );

};

export default DataVault;
