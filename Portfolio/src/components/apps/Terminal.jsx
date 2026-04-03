import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const Terminal = () => {
  const [history, setHistory] = useState([
    { type: 'system', content: 'Tejaswi OS Terminal [Version 1.0.4]' },
    { type: 'system', content: 'Type "help" for a list of available commands.' },
  ]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyPointer, setHistoryPointer] = useState(-1);
  const [isHiring, setIsHiring] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const commands = {
    help: 'List all available commands',
    whoami: 'Display user information',
    ls: 'List projects and files',
    cat: 'Read a file (Usage: cat [filename])',
    history: 'Show command history',
    clear: 'Clear the terminal screen',
    coffee: 'Execute caffeine.sh',
    matrix: 'Enter the grid',
    ninja: 'Stealth mode',
    easter: '???',
    'hire tejaswi': 'Start the onboarding process',
    'sudo hire tejaswi': 'Bypass authority'
  };

  const processCommand = (cmd) => {
    const cleanCmd = cmd.toLowerCase().trim();
    setCommandHistory(prev => [cmd, ...prev]);
    setHistoryPointer(-1);

    let response = [];
    
    if (cleanCmd === 'help') {
      response = Object.entries(commands).map(([name, desc]) => ({
        type: 'output',
        content: `${name.padEnd(20)} - ${desc}`
      }));
    } else if (cleanCmd === 'whoami') {
      response = [
        { type: 'output', content: 'NAME: Battula Bhargavi Tejaswi' },
        { type: 'output', content: 'ROLE: Software Developer & AI Intern' },
        { type: 'output', content: 'STUDENT: SRKR Engineering College (9.22 CGPA)' },
        { type: 'output', content: 'CONTACT: bhargavibattula1234@gmail.com' }
      ];
    } else if (cleanCmd === 'ls') {
      response = [{ type: 'output', content: 'nexus_ai.bin  healverse.apk  deepfake_detector.py  resume_dossier.pdf' }];
    } else if (cleanCmd.startsWith('cat ')) {
      const file = cleanCmd.split(' ')[1];
      const files = {
        'nexus_ai.bin': 'NEXUS AI (Feb 2026): Autonomous platform using LangGraph to deploy software from a prompt.',
        'healverse.apk': 'HealVerse (Aug 2025): Healthcare app with AI suggestions and Spring Boot backend.',
        'deepfake_detector.py': 'DeepNox (Jan 2025): TensorFlow-powered deepfake detector with real-time trust scoring.',
        'resume_dossier.pdf': 'ACCESS GRANTED: Battula Bhargavi Tejaswi. CGPA: 9.22/10. Yuganta AI Intern.'
      };
      response = [{ type: 'output', content: files[file] || `cat: ${file}: No such file or directory` }];
    }
 else if (cleanCmd === 'clear') {
      setHistory([]);
      return;
    } else if (cleanCmd === 'coffee') {
      response = [{ type: 'output', content: '☕ System caffeine levels increased by 400%.' }];
    } else if (cleanCmd === 'matrix') {
      response = [{ type: 'system', content: 'FOLLOW THE WHITE RABBIT.' }];
    } else if (cleanCmd === 'hire tejaswi') {
      response = [{ type: 'error', content: 'Permission denied. Try sudo 😏' }];
    } else if (cleanCmd === 'sudo hire tejaswi') {
      startHiringSequence();
      return;
    } else {
      response = [{ type: 'error', content: `Command not found: ${cleanCmd}. Type "help" for options.` }];
    }

    setHistory(prev => [...prev, { type: 'input', content: cmd }, ...response]);
  };

  const startHiringSequence = () => {
    setIsHiring(true);
    setHistory(prev => [...prev, { type: 'system', content: 'CRITICAL ACCESS REQUESTED...' }]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (input.trim()) {
        processCommand(input);
        setInput('');
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyPointer < commandHistory.length - 1) {
        const next = historyPointer + 1;
        setHistoryPointer(next);
        setInput(commandHistory[next]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer > -1) {
        const next = historyPointer - 1;
        setHistoryPointer(next);
        setInput(next === -1 ? '' : commandHistory[next]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = Object.keys(commands).find(c => c.startsWith(input));
      if (match) setInput(match);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    inputRef.current?.focus();
  }, [history]);

  return (
    <div className="h-full bg-black/40 p-6 font-mono text-sm relative flex flex-col" onClick={() => inputRef.current?.focus()}>
      <div className="flex-1 overflow-y-auto mb-4 custom-scrollbar pr-2">
        {history.map((line, i) => (
          <div key={i} className="mb-1 leading-relaxed">
            {line.type === 'input' && (
              <span className="flex gap-2">
                <span className="text-royal">➜</span>
                <span className="text-mint">~</span>
                <span className="text-white">{line.content}</span>
              </span>
            )}
            {line.type === 'system' && <span className="text-fuchsia font-black">{line.content}</span>}
            {line.type === 'output' && <span className="text-white/60">{line.content}</span>}
            {line.type === 'error' && <span className="text-coral italic">{line.content}</span>}
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Input Line */}
      <div className="flex gap-2 shrink-0 border-t border-white/5 pt-4">
        <span className="text-royal">➜</span>
        <span className="text-mint">~</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="bg-transparent border-none outline-none text-white flex-1 p-0 m-0"
          spellCheck="false"
        />
      </div>

      {/* Hiring Sequence Overlay */}
      <AnimatePresence>
        {isHiring && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/95 z-[100] flex items-center justify-center p-12 overflow-hidden"
          >
             <div className="max-w-md w-full space-y-6">
                <motion.div 
                  className="h-1 bg-white/10 rounded-full overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                >
                   <motion.div 
                     className="h-full bg-mint"
                     animate={{ width: ['0%', '30%', '45%', '70%', '100%'] }}
                     transition={{ duration: 4, ease: "easeInOut" }}
                     onAnimationComplete={() => {
                        setHistory(prev => [...prev, { type: 'system', content: 'EXCEPTIONAL DEVELOPER CONFIRMED' }, { type: 'output', content: 'ACCESS GRANTED' }]);
                        setTimeout(() => setIsHiring(false), 1000);
                     }}
                   />
                </motion.div>
                <div className="text-center font-black uppercase tracking-[0.3em] text-mint animate-pulse text-xs">
                   Verifying Credentials...
                </div>
                <div className="text-[10px] text-white/20 uppercase tracking-widest text-center">
                   Identity Check // Level 24 Authorization
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint Bar */}
      <div className="h-6 border-t border-white/10 mt-2 flex items-center gap-4 text-[9px] uppercase font-black text-white/20 whitespace-nowrap overflow-hidden">
        {['help', 'whoami', 'ls', 'cat', 'hire tejaswi', 'matrix', 'clear'].map(hint => (
           <span key={hint} className="hover:text-white/60 cursor-help transition-colors">{hint}</span>
        ))}
      </div>
    </div>
  );
};

export default Terminal;
