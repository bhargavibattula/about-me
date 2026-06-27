import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const resumeHighlights = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 6 3 12 0v-5" />
      </svg>
    ),
    title: "Academic Track",
    desc: "B.Tech in Computer Science with a 9.25 CGPA at SRKR Engineering College, Bhimavaram.",
    color: "royal",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    ),
    title: "Hackathon & Contests",
    desc: "4x Hackathon Winner — HealVerse, DeepNox (Best Idea), NEXUS AI (Outstanding Implementation), and Web Dev Special Category.",
    color: "mint",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "Core Competencies",
    desc: "Full-stack development (MERN / Next.js), AI integration (LangChain, LangGraph), Java & Spring Boot, REST APIs & cloud deployment.",
    color: "fuchsia",
  },
];

const Resume = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left content entrance
      if (leftRef.current) {
        const children = leftRef.current.querySelectorAll(".resume-anim");
        gsap.fromTo(
          children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Right resume preview entrance
      if (rightRef.current) {
        gsap.fromTo(
          rightRef.current,
          { opacity: 0, x: 50, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="scroll-mt-24 md:scroll-mt-32 py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-bg-secondary backdrop-blur-3xl border-y border-border relative overflow-hidden transition-colors duration-300"
    >
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-full h-full bg-mint/5 pointer-events-none blur-[150px] opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* ═══ LEFT: Resume Snapshot ═══ */}
          <div ref={leftRef} className="lg:col-span-7">
            {/* Section label */}
            <span className="resume-anim text-xs font-black uppercase tracking-[0.6em] text-mint mb-4 block">
              // Resume
            </span>

            {/* Title */}
            <h2 className="resume-anim text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none text-text-primary mb-10">
              Resume{" "}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-text-muted to-text-secondary">
                Center
              </span>
            </h2>

            {/* Subtitle */}
            <h3 className="resume-anim text-xl md:text-2xl font-bold text-text-primary mb-4">
              Professional Snapshot
            </h3>

            {/* Description */}
            <p className="resume-anim text-base md:text-lg text-text-secondary font-light leading-relaxed mb-10 max-w-xl">
              An overview of my academic achievements, hackathon victories, and
              technical expertise. Download the full PDF for a detailed look at
              my experience, projects, and coursework.
            </p>

            {/* Highlight Items */}
            <div className="space-y-6 mb-12">
              {resumeHighlights.map((item, i) => (
                <div
                  key={i}
                  className={`resume-anim flex items-start gap-5 p-5 md:p-6 rounded-2xl border border-border bg-bg-primary/50 hover:border-${item.color}/30 transition-all group`}
                >
                  {/* Icon */}
                  <div
                    className={`shrink-0 w-12 h-12 rounded-xl bg-${item.color}/10 border border-${item.color}/20 flex items-center justify-center text-${item.color}`}
                  >
                    {item.icon}
                  </div>

                  {/* Text */}
                  <div>
                    <h4 className="text-lg md:text-xl font-bold text-text-primary mb-1 group-hover:text-mint transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm md:text-base text-text-secondary font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="resume-anim flex flex-wrap items-center gap-4">
              <a
                href="mailto:bhargavitejaswi97@gmail.com?subject=Hiring%20/%20Freelance%20Inquiry"
                className="inline-flex items-center gap-3 px-10 py-5 bg-transparent border-2 border-mint text-mint hover:bg-mint hover:text-white font-bold uppercase text-sm tracking-[0.15em] rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(87,219,150,0.15)] cursor-pointer hover:scale-105 active:scale-95"
              >
                Hire / Freelance ✉
              </a>
              <a
                href="https://drive.google.com/file/d/1pxrIHfK7MBrLd27p3Yd6dYcQMydDJKHY/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 bg-[var(--accent)] text-[var(--accent-text)] font-bold uppercase text-sm tracking-[0.15em] rounded-full hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(87,219,150,0.15)] cursor-pointer hover:scale-105 active:scale-95"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                View Full Resume
              </a>
              <a
                href="https://drive.google.com/file/d/1pxrIHfK7MBrLd27p3Yd6dYcQMydDJKHY/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 border border-border text-text-primary font-bold uppercase text-sm tracking-[0.15em] rounded-full hover:bg-bg-tertiary hover:border-border-strong transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download PDF
              </a>
            </div>
          </div>

          {/* ═══ RIGHT: Resume Preview Mockup ═══ */}
          <div ref={rightRef} className="lg:col-span-5 flex justify-center">
            <a
              href="https://drive.google.com/file/d/1pxrIHfK7MBrLd27p3Yd6dYcQMydDJKHY/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-[380px] bg-bg-primary border border-border rounded-[24px] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.15)] relative overflow-hidden group block hover:border-mint/30 transition-all duration-300"
            >
              {/* Decorative corner glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-mint/10 blur-[80px] rounded-full pointer-events-none" />

              {/* Hover overlay matching the requested screenshot style */}
              <div className="absolute inset-0 bg-bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 backdrop-blur-sm z-20">
                <div className="w-14 h-14 rounded-full bg-mint text-bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(87,219,150,0.4)] transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </div>
                <span className="text-mint text-[10px] font-mono font-black uppercase tracking-[0.2em] mt-2">
                  OPEN INTERACTIVE PDF
                </span>
              </div>

              {/* Mock resume header */}
              <div className="mb-8">
                <div className="w-20 h-3 bg-text-primary/20 rounded-full mb-3" />
                <div className="w-40 h-4 bg-text-primary/30 rounded-full mb-2" />
                <div className="w-28 h-2 bg-text-muted/20 rounded-full" />
              </div>

              {/* Mock section lines */}
              <div className="space-y-6">
                {/* Experience block */}
                <div>
                  <div className="w-24 h-2.5 bg-mint/30 rounded-full mb-3" />
                  <div className="space-y-2">
                    <div className="w-full h-2 bg-text-primary/10 rounded-full" />
                    <div className="w-[90%] h-2 bg-text-primary/10 rounded-full" />
                    <div className="w-[75%] h-2 bg-text-primary/10 rounded-full" />
                  </div>
                </div>

                {/* Education block */}
                <div>
                  <div className="w-20 h-2.5 bg-royal/30 rounded-full mb-3" />
                  <div className="space-y-2">
                    <div className="w-full h-2 bg-text-primary/10 rounded-full" />
                    <div className="w-[85%] h-2 bg-text-primary/10 rounded-full" />
                  </div>
                </div>

                {/* Skills block */}
                <div>
                  <div className="w-16 h-2.5 bg-fuchsia/30 rounded-full mb-3" />
                  <div className="flex flex-wrap gap-2">
                    <div className="w-14 h-5 bg-text-primary/8 rounded-full border border-border" />
                    <div className="w-10 h-5 bg-text-primary/8 rounded-full border border-border" />
                    <div className="w-16 h-5 bg-text-primary/8 rounded-full border border-border" />
                    <div className="w-12 h-5 bg-text-primary/8 rounded-full border border-border" />
                    <div className="w-10 h-5 bg-text-primary/8 rounded-full border border-border" />
                  </div>
                </div>

                {/* Projects block */}
                <div>
                  <div className="w-20 h-2.5 bg-mint/30 rounded-full mb-3" />
                  <div className="space-y-2">
                    <div className="w-full h-2 bg-text-primary/10 rounded-full" />
                    <div className="w-[80%] h-2 bg-text-primary/10 rounded-full" />
                    <div className="w-[60%] h-2 bg-text-primary/10 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Footer label */}
              <div className="mt-8 pt-4 border-t border-border/50 flex justify-between items-center">
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">
                  Battula_Bhargavi_CV.pdf
                </span>
                <span className="text-[9px] font-bold text-mint uppercase tracking-widest">
                  2026
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
