import React, { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { TbShieldHalf, TbBrain, TbHeartPlus } from "react-icons/tb";

const Projects = () => {
  const { isDark } = useTheme();
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Responsive layout check
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const projects = [
    {
      id: "deepfake",
      name: "Deep Fake Detector",
      date: "Ongoing",
      tech: ["Flask", "TensorFlow", "React", "TypeScript"],
      brief: "A lightweight, secure browser extension that performs real-time frame analysis and audio checks to identify manipulated synthetic media and deep fakes on active web players.",
      icon: <TbShieldHalf className="w-6 h-6 text-mint" />,
      iconColor: "from-mint/20 to-royal/10 border-mint/30",
      image: "/assets/projects/deepfake_detector.png"
    },
    {
      id: "nexus",
      name: "Nexus AI",
      date: "Feb 2026",
      tech: ["Next.js", "FastAPI", "Celery", "LangGraph", "PostgreSQL"],
      brief: "An autonomous multi-agent platform that generates, tests, and deploys production-grade code with fault-tolerant orchestration across full CI/CD lifecycles.",
      icon: <TbBrain className="w-6 h-6 text-mint" />,
      iconColor: "from-mint/20 to-royal/10 border-mint/30",
      image: "/assets/projects/nexus_ai.png"
    },
    {
      id: "healverse",
      name: "HealVerse",
      date: "Aug 2025",
      tech: ["Java", "Spring Boot", "React Native", "PostgreSQL"],
      brief: "A patient-centric health ecosystem integrating AI diet recommendations, encrypted EHR logs, and conversational voice bots for HIPAA-compliant consultations.",
      icon: <TbHeartPlus className="w-6 h-6 text-mint" />,
      iconColor: "from-mint/20 to-royal/10 border-mint/30",
      image: "/assets/projects/healverse.png"
    }
  ];

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    setActive((prev) => (prev + 1) % projects.length);
  };

  // Autoplay handler
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [isHovered, active]);

  // Touch Swipe Handlers for Mobile Low Latency
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Centering transform calculations
  const cardWidth = isMobile ? 300 : 440;
  const gap = isMobile ? 16 : 24;
  const trackOffset = `calc(50% - ${cardWidth / 2}px - ${active * (cardWidth + gap)}px)`;

  return (
    <section
      id="projects"
      className="scroll-mt-24 md:scroll-mt-32 py-20 md:py-28 px-4 overflow-hidden relative bg-bg-primary transition-colors duration-300"
    >
      {/* Decorative ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-mint/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-6xl text-center relative z-10">
        {/* Category & Heading Section */}
        <div className="mb-14 md:mb-16 flex flex-col items-center select-none">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-mint/20 bg-mint/5 text-mint text-[10px] font-black uppercase tracking-[0.4em] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
            System Outputs // Hackathons
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter italic text-text-primary leading-none max-w-4xl">
            Hackathon <br />
            <span className="bg-gradient-to-r from-mint via-[#33c2cc] to-royal bg-clip-text text-transparent">
              Showcase
            </span>
          </h2>

          <p className="mt-5 text-sm md:text-base text-text-secondary max-w-2xl font-light leading-relaxed">
            A curated selection of high-impact technical applications, AI agents, 
            and web utility products engineered during rapid hackathon sprints.
          </p>
        </div>

        {/* Sliding Viewport Container */}
        <div 
          className="relative w-full overflow-hidden py-6 flex items-center justify-start touch-pan-y"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Hardware-Accelerated Sliding Flex Track */}
          <div 
            className="flex gap-4 md:gap-6 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform"
            style={{ transform: `translate3d(${trackOffset}, 0, 0)` }}
          >
            {projects.map((project, idx) => {
              const isActive = idx === active;

              return (
                <div
                  key={project.id}
                  onClick={() => !isActive && setActive(idx)}
                  style={{ width: `${cardWidth}px` }}
                  className={`h-[380px] md:h-[430px] rounded-3xl p-6 md:p-8 flex flex-col justify-between text-left transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] shrink-0 select-none relative ${
                    isActive 
                      ? isDark
                        ? "bg-[#080d26]/95 border-2 border-mint/40 shadow-[0_15px_40px_rgba(87,219,150,0.12)] scale-100 opacity-100 cursor-default"
                        : "bg-white border-2 border-mint shadow-lg scale-100 opacity-100 cursor-default"
                      : isDark
                        ? "bg-[#050818]/40 border border-slate-900/80 scale-90 opacity-25 cursor-pointer hover:opacity-40"
                        : "bg-slate-100 border border-slate-200/80 scale-90 opacity-25 cursor-pointer hover:opacity-40"
                  }`}
                >
                  {/* Subtle active glow ring */}
                  {isActive && (
                    <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-mint/20 via-transparent to-royal/20 pointer-events-none" />
                  )}

                  {/* Card Content */}
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      {/* Header */}
                      <div className="flex justify-between items-center mb-4">
                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border bg-gradient-to-br ${project.iconColor}`}>
                          {project.icon}
                        </div>
                        <span className="text-[9px] font-bold text-mint bg-mint/5 px-2.5 py-1 rounded border border-mint/10 uppercase tracking-widest font-mono">
                          {project.date}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className={`text-2xl md:text-3xl font-black uppercase tracking-tight mb-2 transition-colors duration-300 ${
                        isDark ? "text-text-primary" : "text-slate-900"
                      }`}>
                        {project.name}
                      </h3>

                      {/* Specs / Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.tech.map((techItem) => (
                          <span 
                            key={techItem}
                            className="text-[8px] font-semibold text-mint bg-mint/5 px-2 py-0.5 rounded border border-mint/10 font-mono uppercase"
                          >
                            {techItem}
                          </span>
                        ))}
                      </div>

                      {/* Brief */}
                      <p className={`text-[11px] md:text-xs font-light mb-4 leading-relaxed transition-colors duration-300 ${
                        isDark ? "text-text-secondary/90" : "text-slate-600"
                      }`}>
                        {project.brief}
                      </p>
                    </div>

                    {/* Mockup Widescreen Image */}
                    <div className={`w-full aspect-[16/9] rounded-2xl overflow-hidden border shadow-inner relative bg-black/40 ${
                      isDark ? "border-slate-800/80" : "border-slate-200"
                    }`}>
                      <img 
                        src={project.image} 
                        alt={project.name} 
                        className="w-full h-full object-cover opacity-90 transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Navigation Interface */}
        <div className="flex items-center justify-center gap-6 mt-4">
          <button
            onClick={handlePrev}
            className={`w-10 h-10 rounded-full border flex items-center justify-center text-lg transition-all duration-300 cursor-pointer ${
              isDark 
                ? "border-slate-800 text-slate-400 hover:border-mint hover:text-mint"
                : "border-slate-300 text-slate-600 hover:border-indigo-600 hover:text-indigo-600"
            }`}
          >
            ←
          </button>

          {/* Indicator Track */}
          <div className="flex items-center gap-2.5">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                  active === idx 
                    ? "w-8 bg-mint shadow-[0_0_12px_rgba(87,219,150,0.4)]" 
                    : "w-2.5 bg-slate-700/60 hover:bg-slate-500"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className={`w-10 h-10 rounded-full border flex items-center justify-center text-lg transition-all duration-300 cursor-pointer ${
              isDark 
                ? "border-slate-800 text-slate-400 hover:border-mint hover:text-mint"
                : "border-slate-300 text-slate-600 hover:border-indigo-600 hover:text-indigo-600"
            }`}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
