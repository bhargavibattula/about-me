import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

const ProjectCard = ({ project, index }) => {
  const { isDark } = useTheme();

  return (
    <div
      className={`project-card group relative h-[550px] md:h-[600px] w-full md:w-[85vw] lg:w-[75vw] max-w-6xl mx-auto rounded-[24px] overflow-hidden flex flex-col md:flex-row shadow-2xl transition-all duration-500 will-change-transform shrink-0 ${
        isDark ? "bg-[#0a0f25] border border-royal/30 shadow-black/50" : "bg-white border border-slate-200 shadow-slate-200/50"
      }`}
    >
      {/* Background Soft Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-0 bg-gradient-to-br from-mint/10 via-transparent to-royal/10 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Image Section */}
      <div className="w-full md:w-[45%] h-[220px] md:h-full relative overflow-hidden bg-black/5 shrink-0">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover object-top transform group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          loading="lazy"
        />
        {/* Date/Badge over image */}
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
          <span className="text-[10px] font-bold tracking-widest uppercase text-white font-mono">
            {project.date}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full md:w-[55%] p-6 md:p-10 lg:p-12 flex flex-col justify-center relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border bg-gradient-to-br ${project.iconColor}`}>
            {project.icon}
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-royal">
            0{index + 1} // Hackathon
          </span>
        </div>

        <h3 className={`text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-none mb-4 ${
          isDark ? "text-text-primary" : "text-slate-900"
        }`}>
          {project.name}
        </h3>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className={`text-[9px] md:text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border ${
                isDark ? "bg-bg-secondary/50 border-border text-text-secondary" : "bg-slate-100 border-slate-200 text-slate-600"
              }`}
            >
              {tech}
            </span>
          ))}
        </div>

        <p className={`text-xs md:text-sm lg:text-base font-light leading-relaxed mb-8 ${
          isDark ? "text-text-secondary" : "text-slate-600"
        }`}>
          {project.brief}
        </p>

        {/* Action Buttons - Slide up on hover */}
        <div className="mt-auto flex flex-wrap items-center gap-4 transform md:translate-y-4 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[var(--accent)] text-[var(--accent-text)] font-black uppercase text-[10px] md:text-xs tracking-[0.2em] rounded-full hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(87,219,150,0.2)] hover:scale-105 active:scale-95 flex items-center justify-center min-w-[140px]"
            aria-label={`Live demo of ${project.name}`}
          >
            Live Demo
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-6 py-3 border-2 font-black uppercase text-[10px] md:text-xs tracking-[0.2em] rounded-full transition-all duration-300 flex items-center justify-center min-w-[140px] hover:scale-105 active:scale-95 ${
              isDark ? "border-mint text-mint hover:bg-mint hover:text-[#0f172a]" : "border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white"
            }`}
            aria-label={`GitHub repository for ${project.name}`}
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
