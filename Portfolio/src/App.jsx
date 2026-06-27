import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/professional/Navbar";
import Hero from "./components/professional/Hero";
import HorizontalShowcase from "./components/professional/HorizontalShowcase";
import Resume from "./components/professional/Resume";
import TheArena from "./components/professional/TheArena";
import PaginatedSkills from "./components/professional/PaginatedSkills";
import Projects from "./components/professional/Projects";
import FreelanceWork from "./components/professional/FreelanceWork";
import FreelanceCTA from "./components/professional/FreelanceCTA";
import DeepTerminal from "./components/professional/DeepTerminal";
import Footer from "./components/professional/Footer";
import CinematicContact from "./components/professional/CinematicContact";
import SkillCloud from "./components/professional/SkillCloud";
import WelcomeScreen from "./components/professional/WelcomeScreen";
import ChatBot from "./components/professional/ChatBot";
import CodingProfileUnlock from "./components/professional/CodingProfileUnlock";
import GithubAnalytics from "./components/professional/GithubAnalytics";
import InternshipShowcase from "./components/professional/InternshipShowcase";
import FloatingContactWidget from "./components/professional/FloatingContactWidget";
import ClientReviews from "./components/professional/ClientReviews";
import AdditionalProjects from "./components/professional/AdditionalProjects";
import { ThemeProvider } from "./contexts/ThemeContext";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <div className="bg-bg-primary text-text-primary selection selection:text-[var(--accent-text)] min-h-screen transition-colors duration-300 overflow-x-hidden">
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
              <div>
                <TheArena />
              </div>
              <InternshipShowcase />
              <div>
                <PaginatedSkills />
              </div>
              <div>
                <Projects />
                <HorizontalShowcase />
                <FreelanceCTA />
              </div>
              <AdditionalProjects />
              <div>
                <DeepTerminal />
              </div>
              <CodingProfileUnlock />
              <GithubAnalytics />
              <div>
                <Resume />
              </div>
              <ClientReviews />
              <CinematicContact />
              <div>
                <Footer />
              </div>
            </main>

            <ChatBot />
            <FloatingContactWidget />

            {/* Custom Overlay for Tech Feel */}
            <div
              className="fixed inset-0 pointer-events-none z-[10000] opacity-[0.03] overflow-hidden select-none pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)",
                backgroundSize: "100px 100px",
              }}
            />
          </motion.div>
        )}
      </div>
    </ThemeProvider>
  );
};
export default App;
