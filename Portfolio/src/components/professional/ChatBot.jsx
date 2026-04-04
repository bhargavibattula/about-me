import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'ai', text: 'ARCHITECT_ASSISTANT v1.0 ONLINE. How can I assist with your inquiry?' }
    ]);
    const scrollRef = useRef(null);

    const qaBank = [
        { 
            q: 'Tech Stack?', 
            a: 'Core: MERN (React/Node) + FastAPI. Specialized in AI orchestration with LangGraph and autonomous multi-agent systems.' 
        },
        { 
            q: 'Nexus AI?', 
            a: 'An autonomous platform that generates, tests, and deploys software from a single prompt using coordinated AI agents.' 
        },
        { 
            q: 'Availability?', 
            a: 'Open for Full-Time opportunities (2026). Currently a Neural Engineering intern at Yuganta AI.' 
        },
        { 
            q: 'Contact?', 
            a: 'System established via BHARGAVITEJASWI97@GMAIL.COM or LinkedIn: battula-bhargavi-tejaswi.' 
        }
    ];

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages]);

    const handleQuery = (q, a) => {
        setMessages(prev => [...prev, { type: 'user', text: q }]);
        setTimeout(() => {
            setMessages(prev => [...prev, { type: 'ai', text: a }]);
        }, 600);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[10001]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="absolute bottom-20 right-0 w-[320px] md:w-[380px] h-[500px] bg-[#0A0B1E]/90 border border-white/10 rounded-3xl backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-mint animate-pulse shadow-[0_0_10px_#57db96]" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">Node Assistant // RX-9</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-white/20 hover:text-white transition-colors">✕</button>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                            {messages.map((m, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: m.type === 'ai' ? -10 : 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${m.type === 'ai' ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div className={`max-w-[85%] p-4 rounded-2xl text-[11px] leading-relaxed font-medium uppercase tracking-wider ${
                                        m.type === 'ai' 
                                        ? 'bg-white/5 border border-white/10 text-white/70' 
                                        : 'bg-mint text-black font-black'
                                    }`}>
                                        {m.text}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Quick Actions */}
                        <div className="p-6 bg-black/40 border-t border-white/5">
                            <div className="grid grid-cols-2 gap-2">
                                {qaBank.map((item, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleQuery(item.q, item.a)}
                                        className="p-3 text-[8px] font-black uppercase tracking-widest text-white/40 border border-white/5 rounded-xl hover:border-mint/40 hover:text-mint transition-all text-left truncate"
                                    >
                                        {item.q}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-2xl border ${
                    isOpen ? 'bg-mint text-black border-mint' : 'bg-white/5 text-mint border-white/10 backdrop-blur-xl'
                }`}
            >
                {isOpen ? (
                    <span className="text-xs font-black italic">EXIT</span>
                ) : (
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L1 23l6.71-1.97C9.02 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.47 0-2.84-.38-4.03-1.03l-4.22 1.24 1.25-4.16C4.38 14.84 4 13.47 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z" />
                    </svg>
                )}
                {/* Notification Badge */}
                {!isOpen && (
                    <div className="absolute top-0 right-0 w-3 h-3 bg-fuchsia border-2 border-[#030412] rounded-full" />
                )}
            </motion.button>
        </div>
    );
};

export default ChatBot;
