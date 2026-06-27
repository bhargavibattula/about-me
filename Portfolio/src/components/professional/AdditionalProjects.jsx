import React, { useState, memo } from "react";
import { useTheme } from "../../contexts/ThemeContext";

/* Individual card — memoized so only hovered card re-renders */
const ProjectCard = memo(({ project, isDark }) => (
  <a
    href={project.github}
    target="_blank"
    rel="noopener noreferrer"
    className="group shrink-0 w-[260px] md:w-[320px] select-none block no-underline"
    style={{ backfaceVisibility: "hidden" }}
  >
    <div className="relative w-full aspect-[4/3] mb-4">
      {/* Layer 2 */}
      <div
        className="absolute inset-0 rounded-2xl border"
        style={{
          transform: "translate3d(10px, 10px, 0)",
          backgroundColor: `${project.accent}15`,
          borderColor: `${project.accent}25`,
          backfaceVisibility: "hidden",
        }}
      />
      {/* Layer 1 */}
      <div
        className="absolute inset-0 rounded-2xl border"
        style={{
          transform: "translate3d(4px, 4px, 0)",
          backgroundColor: `${project.accent}10`,
          borderColor: `${project.accent}20`,
          backfaceVisibility: "hidden",
        }}
      />
      {/* Main image */}
      <div
        className={`relative w-full h-full rounded-2xl overflow-hidden border ${
          isDark ? "border-slate-800" : "border-slate-200"
        }`}
        style={{
          transition: "transform 0.4s cubic-bezier(0.25,1,0.5,1)",
          backfaceVisibility: "hidden",
          willChange: "transform",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "translate3d(-4px, -4px, 0)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "translate3d(0, 0, 0)"; }}
      >
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover object-top"
          style={{ backfaceVisibility: "hidden" }}
        />
        {/* GitHub overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backgroundColor: "rgba(0,0,0,0)",
            transition: "background-color 0.4s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.4)"; e.currentTarget.firstChild.style.opacity = "1"; e.currentTarget.firstChild.style.transform = "translate3d(0,0,0)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(0,0,0,0)"; e.currentTarget.firstChild.style.opacity = "0"; e.currentTarget.firstChild.style.transform = "translate3d(0,16px,0)"; }}
        >
          <div
            className="flex flex-col items-center gap-2"
            style={{
              opacity: 0,
              transform: "translate3d(0, 16px, 0)",
              transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(0.25,1,0.5,1)",
            }}
          >
            <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="text-white text-xs font-bold uppercase tracking-widest">View on GitHub</span>
          </div>
        </div>
      </div>
    </div>
    <div className="px-1">
      <p className="text-[9px] font-bold font-mono uppercase tracking-wider mb-0.5" style={{ color: project.accent }}>
        {project.category}
      </p>
      <h3 className={`text-sm md:text-base font-bold tracking-tight ${isDark ? "text-text-primary" : "text-slate-900"}`}>
        {project.title}
      </h3>
    </div>
  </a>
));

ProjectCard.displayName = "ProjectCard";

const AdditionalProjects = () => {
  const { isDark } = useTheme();
  const [isPaused, setIsPaused] = useState(false);

  const projects = [
    { id: "travelloop", title: "Travel Loop", category: "SaaS Platform", image: "/assets/projects/traveloop.png", accent: "#ff8f8f", github: "https://github.com/bhargavibattula/travel-loop" },
    { id: "women_network", title: "Women Entrepreneur Network", category: "Community Platform", image: "/assets/projects/women_network.png", accent: "#7e8eff", github: "https://github.com/bhargavibattula/women-entrepreneur-network" },
    { id: "chat_pdf", title: "Chat with PDF AI", category: "Generative AI", image: "/assets/projects/chat_pdf.png", accent: "#5b7fff", github: "https://github.com/bhargavibattula/chat-with-pdf" },
    { id: "codeguru", title: "CodeGuru – AI Assistant", category: "Chrome Extension", image: "/assets/projects/codeguru.png", accent: "#57db96", github: "https://github.com/bhargavibattula/codeguru-chrome-extension" },
    { id: "insightai", title: "InsightAI Summarizer", category: "AI Web Platform", image: "/assets/projects/insightai.png", accent: "#ff6eb4", github: "https://github.com/bhargavibattula/insight-ai" },
    { id: "theoremai", title: "TheoremAI 🧮", category: "AI Math Agent", image: "/assets/projects/theoremai.png", accent: "#ffb347", github: "https://github.com/bhargavibattula/theorem-ai" },
    { id: "datasageai", title: "DataSage-AI", category: "Enterprise Chatbot", image: "/assets/projects/datasageai.png", accent: "#77dd77", github: "https://github.com/bhargavibattula/datasage-ai" },
    { id: "yt_to_blog", title: "YouTube to Blog Agent", category: "Multi-Agent Creator", image: "/assets/projects/yt_to_blog.png", accent: "#b19cd9", github: "https://github.com/bhargavibattula/youtube-to-blog" },
    { id: "agentic_chatbot", title: "Agentic Chatbot", category: "Agentic Ecosystem", image: "/assets/projects/node_engine.png", accent: "#57db96", github: "https://github.com/bhargavibattula/agentic-chatbot" },
  ];

  const duplicated = [...projects, ...projects];

  return (
    <section className="py-20 md:py-28 overflow-hidden relative bg-bg-primary">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-royal/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10">
        <div className="mb-14 md:mb-16 flex flex-col items-center select-none px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-royal/20 bg-royal/5 text-royal dark:text-[#a0a5ff] text-[10px] font-black uppercase tracking-[0.4em] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-royal dark:bg-[#a0a5ff] animate-pulse" />
            Archive // Core Assets
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter italic text-text-primary leading-none max-w-4xl text-center">
            Additional{" "}
            <span className="bg-gradient-to-r from-mint via-[#33c2cc] to-royal bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="mt-5 text-sm md:text-base text-text-secondary max-w-2xl font-light leading-relaxed text-center">
            A visual catalog of custom SaaS interfaces, AI agents,
            and specialized LLM multi-agent pipelines.
          </p>
        </div>

        <div
          className="relative w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-r from-bg-primary to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-l from-bg-primary to-transparent" />

          <div
            className="flex gap-6 md:gap-8 w-max"
            style={{
              animation: `marquee-scroll ${projects.length * 4}s linear infinite`,
              animationPlayState: isPaused ? "paused" : "running",
              willChange: "transform",
              backfaceVisibility: "hidden",
            }}
          >
            {duplicated.map((project, idx) => (
              <ProjectCard key={`${project.id}-${idx}`} project={project} isDark={isDark} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>
    </section>
  );
};

export default AdditionalProjects;
