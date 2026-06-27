import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { hackathonProjects } from "../../data/hackathonProjects";
import ProjectCard from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check viewport width to toggle mobile view (stack vs horizontal scroll)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Use stack on mobile and portrait tablet
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useLayoutEffect(() => {
    // We only want the GSAP horizontal scroll on desktop/landscape-tablet
    if (isMobile) {
      // If switching to mobile, make sure to clear any inline styles left by GSAP
      if (wrapperRef.current) {
        gsap.set(wrapperRef.current, { clearProps: "all" });
      }
      return;
    }

    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      // Calculate total horizontal scroll width needed.
      // We subtract the viewport width so the last card perfectly stops at the end.
      const scrollWidth = wrapper.scrollWidth - window.innerWidth;

      // Create the ScrollTrigger animation
      gsap.to(wrapper, {
        x: -scrollWidth,
        ease: "none", // Linear movement for scrolling
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1, // Smooth scrubbing (1 second delay to catch up)
          end: () => `+=${scrollWidth}`, // The scroll distance matches the physical width
          invalidateOnRefresh: true, // Recalculate on resize
        },
      });

      // Optional: Add a subtle entrance animation for the cards as they come into view
      // This makes the active card scale to 1 while others slightly shrink
      const cards = gsap.utils.toArray('.project-card');
      
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.95, opacity: 0.7 },
          {
            scale: 1,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: gsap.getById("horizontalScroll"), // Link to the horizontal scroll
              start: "left center", 
              end: "right center",
              scrub: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert(); // Cleanup all GSAP instances on unmount
  }, [isMobile]);

  return (
    <section 
      ref={containerRef}
      id="projects" 
      className={`bg-bg-primary overflow-hidden relative ${isMobile ? "py-20 px-4" : "h-screen flex items-center"}`}
    >
      {/* Decorative ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-mint/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Mobile Header (Only shows on mobile stack view) */}
      {isMobile && (
        <div className="mb-14 flex flex-col items-center select-none text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-mint/20 bg-mint/5 text-mint text-[10px] font-black uppercase tracking-[0.4em] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
            System Outputs
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-text-primary leading-none">
            Hackathon Showcase
          </h2>
        </div>
      )}

      {/* Main Content Wrapper */}
      <div 
        ref={wrapperRef}
        className={`flex ${isMobile ? "flex-col gap-10" : "flex-row gap-16 lg:gap-24 px-[10vw] items-center h-full w-max"}`}
      >
        {/* Desktop Title Card (Scrolls with the rest) */}
        {!isMobile && (
          <div className="w-[30vw] shrink-0 pr-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-mint/20 bg-mint/5 text-mint text-[10px] font-black uppercase tracking-[0.4em] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
              System Outputs
            </div>
            <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none text-text-primary mb-6">
              Hackathon <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-mint to-royal">
                Showcase
              </span>
            </h2>
            <p className="text-base text-text-secondary font-light leading-relaxed max-w-sm">
              A curated selection of high-impact technical applications, AI agents, 
              and web utility products engineered during rapid hackathon sprints. 
              Scroll to explore.
            </p>
          </div>
        )}

        {/* Project Cards */}
        {hackathonProjects.map((project, idx) => (
          <div key={project.id} className={isMobile ? "w-full" : "shrink-0 flex items-center justify-center h-full py-10"}>
             <ProjectCard project={project} index={idx} />
          </div>
        ))}
        
        {/* End padding for desktop */}
        {!isMobile && <div className="w-[5vw] shrink-0" />}
      </div>
    </section>
  );
};

export default Projects;
