import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const DeepTerminal = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
        { type: 'system', content: 'SYSTEM B-T-PROTOCOL INITIALIZED // 2026' },
        { type: 'system', content: 'TYPE "HELP" TO VIEW AVAILABLE COMMANDS.' }
    ]);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const commands = {
        'help': 'VIEW ALL AVAILABLE SYSTEM COMMANDS',
        'whoami': 'REVEAL PRIMARY PERSONNEL ARCHIVE',
        'projects': 'DECRYPT TECHNICAL BLUEPRINTS',
        'resume': 'GENERATE FULL PROFESSIONAL DOSSIER',
        'exp': 'ACCESS EMPLOYMENT CHRONICLE',
        'skills': 'SCAN CORE COMPETENCIES MATRIX',
        'edu': 'REVEAL ACADEMIC RECORDS',
        'contact': 'ESTABLISH COMMUNICATION CHANNEL',
        'clear': 'PURGE COMMAND HISTORY'
    };

    const processCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.toLowerCase().trim();
            const newHistory = [...history, { type: 'input', content: cmd }];
            
            let response = [];
            
            switch (cmd) {
                case 'help':
                    response = Object.entries(commands).map(([name, desc]) => ({
                        type: 'output', content: `${name.padEnd(12)} - ${desc}`
                    }));
                    break;
                case 'ls':
                    response = [{ type: 'output', content: 'sys_core.bin  resume.pdf  projects.db  mission_logs.txt  neural_weights.tar' }];
                    break;
                case 'whoami':
                    response = [
                        { type: 'system', content: 'ACCESSING PERSONNEL CORE...' },
                        { type: 'output', content: 'NAME: BATTULA BHARGAVI' },
                        { type: 'output', content: 'ROLE: FULL-STACK DEVELOPER & AI ARCHITECT' },
                        { type: 'output', content: 'STATUS: ACTIVE MISSION // OPEN_FOR_HIRE' }
                    ];
                    break;
                case 'projects':
                    response = [
                        { type: 'system', content: 'DECRYPTING PROJECT ARCHIVES...' },
                        { type: 'output', content: '1. NEXUS AI     - MULTI-AGENT DEPLOYMENT ENGINE' },
                        { type: 'output', content: '2. HEALVERSE    - AI HEALTHCARE ECOSYSTEM' },
                        { type: 'output', content: '3. DEEPNOX      - NEURAL DEEPFAKE ANALYZER' }
                    ];
                    break;
                case 'resume':
                    response = [
                        { type: 'system', content: 'GENERATING PROFESSIONAL DOSSIER...' },
                        { type: 'output', content: '----------------------------------------' },
                        { type: 'output', content: 'NAME: BATTULA BHARGAVI' },
                        { type: 'output', content: 'EDU: B.TECH CSE (GPA: 9.22) | SRKR COLLEGE' },
                        { type: 'output', content: 'EXP: AI INTERN @ YUGANTA | MARCH 2026' },
                        { type: 'output', content: 'SKILLS: REACT, JAVA, PYTHON, SPRING, AI' },
                        { type: 'output', content: '----------------------------------------' }
                    ];
                    break;
                case 'exp':
                    response = [
                        { type: 'system', content: 'ACCESSING CHRONICLE...' },
                        { type: 'output', content: 'YUGANTA AI | MAR 2026 – PRESENT' },
                        { type: 'output', content: '- ARCHITECTING AI TEACHING AVATARS (MERN)' },
                        { type: 'output', content: '- DEVELOPING TEXTBOOK-SYNCED CHATBOTS' }
                    ];
                    break;
                case 'skills':
                    response = [
                        { type: 'system', content: 'SCANNING MATRIX...' },
                        { type: 'output', content: 'LANGUAGES: JAVA, PYTHON, C, JAVASCRIPT, SQL' },
                        { type: 'output', content: 'FRAMEWORKS: REACT, SPRING BOOT, FASTAPI, NODE' },
                    ];
                    break;
                case 'edu':
                    response = [
                        { type: 'output', content: 'SRKR ENGINEERING COLLEGE | 2023 – 2026' },
                        { type: 'output', content: 'B.TECH IN COMPUTER SCIENCE | CGPA: 9.22/10' }
                    ];
                    break;
                case 'contact':
                    response = [
                        { type: 'output', content: 'EMAIL: BHARGAVITEJASWI97@GMAIL.COM' },
                        { type: 'output', content: 'LINKEDIN: /in/battula-bhargavi-tejaswi' },
                        { type: 'output', content: 'GITHUB: github.com/bhargavibattula' }
                    ];
                    break;
                case 'clear':
                    setHistory([]);
                    setInput('');
                    return;
                default:
                    response = [{ type: 'error', content: `COMMAND "${cmd}" NOT RECOGNIZED. TYPE "HELP" for ACCESS.` }];
            }

            setHistory([...newHistory, ...response]);
            setInput('');
        }
    };

    return (
        <section id="terminal" className="py-32 px-6 md:px-8 bg-[#030412] relative overflow-hidden">
             {/* Background Decoration */}
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-royal/10 blur-[150px] opacity-10 pointer-events-none" />

             <div className="container mx-auto max-w-5xl relative z-10">
                <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
                    <div>
                        <span className="text-xs font-black uppercase tracking-[0.8em] text-mint mb-4 block">System Query // Command Center</span>
                        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">Dossier <br /> <span className="text-white/10 italic">Engine</span></h2>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="bg-[#0c0e25]/80 backdrop-blur-3xl border border-white/5 rounded-[32px] md:rounded-[40px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] flex flex-col h-[500px] md:h-[650px] group hover:border-white/10 transition-all font-mono relative"
                >
                    {/* Scanline Effect Overlay */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] z-50 opacity-40 animate-pulse" />

                    {/* Window Controls & Metadata */}
                    <div className="px-6 md:px-10 py-5 bg-white/5 border-b border-white/5 flex items-center justify-between relative z-[60]">
                         <div className="flex gap-2">
                             <div className="w-2.5 h-2.5 rounded-full bg-red-400/40" />
                             <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/40" />
                             <div className="w-2.5 h-2.5 rounded-full bg-mint/40 shadow-[0_0_10px_rgba(87,219,150,0.4)]" />
                         </div>
                         <div className="flex items-center gap-6 hidden sm:flex">
                              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/10 italic">Uptime: 00:04:12</span>
                              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-mint/40 italic flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 bg-mint rounded-full animate-ping" /> Signal_Secure
                              </span>
                         </div>
                    </div>

                    {/* Console Output Area */}
                    <div 
                        ref={scrollRef}
                        className="flex-1 p-8 md:p-12 overflow-y-auto space-y-4 custom-scrollbar relative z-[60]"
                    >
                         {history.map((line, i) => (
                             <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}
                                className={`flex gap-4 md:gap-6 ${
                                    line.type === 'input' ? 'text-white' : 
                                    line.type === 'system' ? 'text-mint/40' : 
                                    line.type === 'error' ? 'text-coral' : 'text-white/60'
                                }`}
                             >
                                 <span className={`text-[10px] md:text-sm font-black uppercase tracking-widest ${line.type === 'input' ? 'text-mint' : 'opacity-20'}`}>
                                      {line.type === 'input' ? '➜' : '::'}
                                 </span>
                                 <span className="text-[11px] md:text-[13px] leading-relaxed uppercase tracking-[0.2em] font-medium max-w-full break-words">{line.content}</span>
                             </motion.div>
                         ))}
                    </div>

                    {/* Interactive Input Node */}
                    <div className="p-6 md:p-10 bg-white/5 border-t border-white/5 flex items-center gap-4 relative z-[60]">
                        <span className="text-mint font-black animate-pulse uppercase tracking-[0.4em] text-[10px] hidden sm:block">Query_Node:</span>
                        <input 
                            type="text" 
                            className="flex-1 bg-transparent border-none outline-none text-white font-mono uppercase tracking-[0.3em] text-[11px] md:text-sm placeholder:text-white/5"
                            placeholder="INITIALIZE COMMAND_PROTOCOL..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={processCommand}
                        />
                    </div>
                </motion.div>
             </div>
        </section>
    );
};

export default DeepTerminal;
