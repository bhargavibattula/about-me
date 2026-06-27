import React, { useRef, useEffect, useState } from "react";

const ProjectCard = ({ project, index, total, isMobile, onImageLoad }) => {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isMobile) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <div
      ref={cardRef}
      className={`project-card group relative overflow-hidden flex-shrink-0 ${
        isMobile
          ? `w-full h-[65vh] flex flex-col justify-end p-8 border-b border-border transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`
          : "w-screen h-screen flex flex-col justify-end p-12 md:p-24"
      }`}
    >
      {/* Background Image and Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          onLoad={onImageLoad}
          className="w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-104"
        />
        {/* Dark overlay: bg-black/60 that lightens slightly on hover */}
        <div className="absolute inset-0 bg-black/60 transition-colors duration-[600ms] ease-out group-hover:bg-black/50 z-10" />
        {/* Bottom gradient overlay for ultimate text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-15 pointer-events-none" />
      </div>

      {/* Bottom-left text block */}
      <div className="relative z-20 max-w-2xl flex flex-col items-start text-left">
        {/* Index label */}
        <span className="font-mono text-xs text-white/60 mb-2">
          {project.index} / {total < 10 ? `0${total}` : total}
        </span>

        {/* Project Name */}
        <h2 
          className="font-black text-white uppercase tracking-tight leading-none mb-3"
          style={{ fontSize: "clamp(36px, 6vw, 56px)" }}
        >
          {project.title}
        </h2>

        {/* One-line Description */}
        <p className="text-sm md:text-base text-white/80 font-light mb-6">
          {project.desc}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-black uppercase tracking-[0.1em] bg-white/10 text-white border border-white/10 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-white text-white hover:bg-white hover:text-black font-black px-6 py-3 rounded-full text-[10px] uppercase tracking-widest transition-all duration-300"
        >
          View project <span className="text-sm font-normal">→</span>
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
