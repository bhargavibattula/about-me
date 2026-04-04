import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/professional/Navbar';
import Hero from './components/professional/Hero';
import Resume from './components/professional/Resume';
import TheArena from './components/professional/TheArena';
import PaginatedSkills from './components/professional/PaginatedSkills';
import ProjectUplink from './components/professional/ProjectUplink';
import DeepTerminal from './components/professional/DeepTerminal';
import Footer from './components/professional/Footer';
import SkillCloud from './components/professional/SkillCloud';
import WelcomeScreen from './components/professional/WelcomeScreen';
import ChatBot from './components/professional/ChatBot';
import CodingProfileUnlock from './components/professional/CodingProfileUnlock';

const App = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bg-[#030412] text-white selection:bg-mint selection:text-black min-h-screen">
            <AnimatePresence mode="wait">
                {loading && <WelcomeScreen key="welcome" />}
            </AnimatePresence>

            {!loading && (
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ duration: 1 }}
                >
                    <SkillCloud />

                    <Navbar />
                    
                    <main className="relative z-10 font-sans">
                        <Hero />
                        <div id="about"><Resume /></div>
                        <div id="arena"><TheArena /></div>
                        <div id="skills"><PaginatedSkills /></div>
                        <div id="projects">
                            <ProjectUplink />
                        </div>

                        <div id="terminal"><DeepTerminal /></div>
                        <CodingProfileUnlock />
                        <div id="contact"><Footer /></div>
                    </main>

                    <ChatBot />

                    {/* Custom Overlay for Tech Feel */}
                    <div className="fixed inset-0 pointer-events-none z-[10000] opacity-[0.03] overflow-hidden select-none pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
                </motion.div>
            )}
        </div>
    );
};

export default App;
