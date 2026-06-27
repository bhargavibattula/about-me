import React, { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";

const projects = [
  {
    id: "aiavatar",
    index: "01",
    name: "AI Avatar",
    tagline: "RAG & AGENTIC AI SMART LEARNING PLATFORM",
    subtitle: "RAG Agentic AI • Multilingual Voice • Admin Dashboards",
    image: "/assets/aiavatar.png",
    overview:
      "Developed a production-ready, RAG-based Agentic AI smart learning platform for schools. It integrates NCERT textbooks with multilingual voice tutors for conversational learning, alongside a secure smart classroom monitoring suite that alerts administrators when tab switching or layout resizing is detected.",
    role: "Full-Stack Engineer & AI Developer",
    features: [
      "RAG & Agentic AI voice tutor via ElevenLabs API",
      "Multilingual translation of NCERT study materials",
      "Smart lock classroom window resizing detection",
      "Principal, teacher, and student dashboards",
    ],
    tech: ["React.js", "Next.js", "Tailwind CSS", "ElevenLabs", "RAG AI"],
    accent: "mint",
    badge: "AGENTIC AI & RAG",
    status: "COMPLETED & DEPLOYED",
    link: "https://chatbot-web-sigma.vercel.app/",
  },
  {
    id: "yugantaai",
    index: "02",
    name: "YugantaAI",
    tagline: "AI LEARNING MANAGEMENT SYSTEM",
    subtitle: "MERN Stack • Cloudflare R2 • Media Streaming",
    image: "/assets/yugantaai.png",
    overview:
      "A high-performance AI-powered Learning Management System (LMS) designed for streaming complex AI, MERN, and Agentic AI courses. Leverages Cloudflare R2 media bucket integrations to guarantee low-latency, scalable video delivery.",
    role: "Full-Stack Developer & Media Architect",
    features: [
      "Low-latency streaming with Cloudflare R2",
      "Strict role authorization dashboard controls",
      "Modular controls for courses and cycles",
      "Lag-free responsive student user interfaces",
    ],
    tech: ["React.js", "Node.js", "Express", "MongoDB", "Cloudflare R2"],
    accent: "royal",
    badge: "MERN STACK",
    status: "COMPLETED & DEPLOYED",
    link: "https://www.yugantaai.com/",
  },
  {
    id: "bullboom",
    index: "03",
    name: "Bull Boom",
    tagline: "VIRTUAL TRADING SIMULATION PLATFORM",
    subtitle: "MERN Stack • Automated Triggers • Real-time Watchlists",
    image: "/assets/bullboom.png",
    overview:
      "Developed a full-stack trading simulation platform that enables users to practice stock trading risk-free. Features an automatic target order execution engine that trades stocks instantly when user-defined prices are hit.",
    role: "Fintech Engineer & Full-Stack Developer",
    features: [
      "Virtual paper-trading simulation ecosystem",
      "Automated target order Cron buy/sell triggers",
      "Comprehensive portfolio transaction history logs",
      "High-frequency real-time watchlists",
    ],
    tech: ["React.js", "Node.js", "Express", "MongoDB", "Socket.io"],
    accent: "fuchsia",
    badge: "FINTECH & WEB",
    status: "COMPLETED & DEPLOYED",
    link: "https://bull-boom.onrender.com/",
  },
];

const AUTOPLAY_MS = 6000;

const InternshipShowcase = () => {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);
  const textWrapRef = useRef(null);
  const progressBarRef = useRef(null);
  const autoplayTimer = useRef(null);
  const progressTween = useRef(null);
  const animating = useRef(false);
  const pointerStart = useRef({ x: 0, y: 0 });

  const current = projects[active];

  // GSAP slide transition helper
  const animateSlide = useCallback(
    (newIndex, direction) => {
      if (animating.current) return;
      if (newIndex === active) return;
      animating.current = true;

      // Kill autoplay during transition
      if (autoplayTimer.current) clearTimeout(autoplayTimer.current);
      if (progressTween.current) progressTween.current.kill();

      const tl = gsap.timeline({
        onComplete: () => {
          // Change state to new project
          setActive(newIndex);
          
          // Wait for React to render the new state, then fade/slide in
          requestAnimationFrame(() => {
            const enterTl = gsap.timeline({
              onComplete: () => {
                animating.current = false;
              }
            });

            if (imageWrapRef.current) {
              gsap.set(imageWrapRef.current, {
                opacity: 0,
                x: direction === 1 ? 50 : -50,
                scale: 0.98,
              });
              enterTl.to(
                imageWrapRef.current,
                {
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  duration: 0.5,
                  ease: "power2.out",
                },
                0
              );
            }

            if (textWrapRef.current) {
              const newChildren = textWrapRef.current.querySelectorAll(".anim-child");
              gsap.set(newChildren, {
                opacity: 0,
                y: direction === 1 ? 20 : -20,
              });
              enterTl.to(
                newChildren,
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.45,
                  stagger: 0.04,
                  ease: "power2.out",
                },
                0.05
              );
            }
          });
        },
      });

      // ── EXIT: fade out current content ──
      if (imageWrapRef.current) {
        tl.to(
          imageWrapRef.current,
          {
            opacity: 0,
            x: direction === 1 ? -50 : 50,
            scale: 0.98,
            duration: 0.25,
            ease: "power2.in",
          },
          0
        );
      }

      if (textWrapRef.current) {
        const children = textWrapRef.current.querySelectorAll(".anim-child");
        tl.to(
          children,
          {
            opacity: 0,
            y: direction === 1 ? -20 : 20,
            duration: 0.2,
            stagger: 0.02,
            ease: "power2.in",
          },
          0
        );
      }
    },
    [active]
  );

  // Initial animation on mount
  useEffect(() => {
    if (imageWrapRef.current) {
      gsap.fromTo(
        imageWrapRef.current,
        { opacity: 0, x: 60, scale: 0.96 },
        { opacity: 1, x: 0, scale: 1, duration: 0.7, ease: "power2.out" }
      );
    }
    if (textWrapRef.current) {
      const children = textWrapRef.current.querySelectorAll(".anim-child");
      gsap.fromTo(
        children,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out",
          delay: 0.15,
        }
      );
    }
  }, []);

  const goTo = useCallback(
    (idx) => {
      if (idx === active || animating.current) return;
      animateSlide(idx, idx > active ? 1 : -1);
    },
    [active, animateSlide]
  );

  const next = useCallback(() => {
    if (animating.current) return;
    animateSlide((active + 1) % projects.length, 1);
  }, [active, animateSlide]);

  const prev = useCallback(() => {
    if (animating.current) return;
    animateSlide((active - 1 + projects.length) % projects.length, -1);
  }, [active, animateSlide]);

  // ─── Autoplay ───
  useEffect(() => {
    const startAutoplay = () => {
      if (progressTween.current) progressTween.current.kill();
      if (progressBarRef.current) {
        gsap.set(progressBarRef.current, { scaleX: 0 });
        progressTween.current = gsap.to(progressBarRef.current, {
          scaleX: 1,
          duration: AUTOPLAY_MS / 1000,
          ease: "linear",
        });
      }

      autoplayTimer.current = setTimeout(() => {
        next();
      }, AUTOPLAY_MS);
    };

    startAutoplay();

    return () => {
      if (autoplayTimer.current) clearTimeout(autoplayTimer.current);
      if (progressTween.current) progressTween.current.kill();
    };
  }, [active, next]);

  // Swipe / Drag hooks
  const onPointerDown = (e) => {
    pointerStart.current = {
      x: e.clientX ?? e.touches?.[0]?.clientX ?? 0,
      y: e.clientY ?? e.touches?.[0]?.clientY ?? 0,
    };
  };

  const onPointerUp = (e) => {
    const endX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? 0;
    const endY = e.clientY ?? e.changedTouches?.[0]?.clientY ?? 0;
    const dx = pointerStart.current.x - endX;
    const dy = Math.abs(pointerStart.current.y - endY);
    if (Math.abs(dx) > 50 && dy < Math.abs(dx)) {
      dx > 0 ? next() : prev();
    }
  };

  // Get active accent colors
  const activeAccent = current.accent === "mint" ? "var(--mint)" : current.accent === "royal" ? "var(--royal)" : "var(--fuchsia)";
  const activeAccentShadow = current.accent === "mint" ? "rgba(87,219,150,0.3)" : current.accent === "royal" ? "rgba(100,116,239,0.3)" : "rgba(224,96,252,0.3)";

  return (
    <section
      ref={sectionRef}
      id="internships"
      className="scroll-mt-24 md:scroll-mt-32 relative py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-bg-primary overflow-hidden transition-colors duration-300"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onTouchStart={onPointerDown}
      onTouchEnd={onPointerUp}
    >
      {/* Scroll/Progress indicator */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-border/20 z-20">
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-mint via-royal to-fuchsia origin-left transform scale-x-0"
        />
      </div>

      {/* Background accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-royal/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-mint/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title Header */}
        <div className="mb-14 md:mb-20">
          <span className="text-xs font-black uppercase tracking-[0.6em] text-mint mb-4 block">
            // Core Experience
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none text-text-primary">
            Internship{" "}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-text-muted to-text-secondary">
              Showcase
            </span>
          </h2>
          <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-text-muted mt-4">
            Production-grade systems built during professional software engineering internships
          </p>
        </div>

        {/* ═══ Main Grid: Image + Text ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* ── LEFT: Image Card (Browser Mockup Frame) ── */}
          <div className="lg:col-span-6 relative">
            <div
              ref={imageWrapRef}
              className="relative rounded-2xl md:rounded-[24px] border border-border/80 bg-bg-secondary/40 backdrop-blur-md shadow-2xl overflow-hidden group cursor-grab active:cursor-grabbing select-none will-change-transform"
            >
              {/* Browser Header Bar */}
              <div className="h-12 border-b border-border/50 bg-bg-secondary/80 flex items-center justify-between px-4 select-none">
                {/* Window Control Buttons */}
                <div className="flex items-center gap-1.5 w-16">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] opacity-90" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] opacity-90" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#27c93f] opacity-90" />
                </div>

                {/* Simulated Address Bar */}
                <div className="flex-1 max-w-sm md:max-w-md mx-3">
                  <div className="h-7 rounded-lg bg-bg-primary/70 border border-border/30 flex items-center justify-center gap-2 px-3 text-[11px] text-text-muted font-mono tracking-tight overflow-hidden">
                    <span className="text-mint text-[10px]">🔒</span>
                    <span className="truncate">{current.link.replace(/^https?:\/\/(www\.)?/, "")}</span>
                  </div>
                </div>

                {/* Status & Counter */}
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="hidden sm:inline-block text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-mint/15 text-mint border border-mint/20">
                    {current.status}
                  </span>
                  <span className="font-mono text-xs font-bold text-text-secondary/70">
                    {current.index}/{String(projects.length).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Mockup Frame Content Area */}
              <div className="relative aspect-[16/10] overflow-hidden bg-bg-primary">
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.01]"
                  draggable={false}
                />
              </div>
            </div>
          </div>

          {/* ── RIGHT: Text Details ── */}
          <div ref={textWrapRef} className="lg:col-span-6 flex flex-col">
            
            {/* Meta tags index header */}
            <div className="anim-child flex items-center gap-4 mb-4">
              <span 
                className="text-4xl md:text-5xl font-black text-transparent font-mono leading-none select-none opacity-25"
                style={{ WebkitTextStroke: "1px var(--text-primary)" }}
              >
                {current.index}
              </span>
              <div className="flex flex-col justify-center">
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-text-muted">
                  {current.badge}
                </span>
                <div className="mt-1">
                  <span 
                    className="text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-full border bg-bg-secondary"
                    style={{ borderColor: activeAccent, color: activeAccent }}
                  >
                    + Production System
                  </span>
                </div>
              </div>
            </div>

            {/* Title */}
            <h3 className="anim-child text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-tight text-text-primary mb-3">
              {current.name}
            </h3>

            {/* Platform Overview */}
            <p className="anim-child text-xs md:text-sm text-text-secondary font-normal leading-relaxed mb-4">
              {current.overview}
            </p>

            {/* Role Header */}
            <div className="anim-child mb-3">
              <h4 className="text-[9px] font-mono font-bold tracking-[0.22em] text-text-muted uppercase">
                ROLE — {current.role}
              </h4>
            </div>

            {/* Feature Highlights Grid */}
            <div className="anim-child grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mb-5">
              {current.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
                  <span className="text-text-muted select-none">—</span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Tech Stack Tags */}
            <div className="anim-child flex flex-wrap gap-2 mb-6">
              {current.tech.map((t, i) => (
                <span 
                  key={i} 
                  className="text-[9px] font-mono uppercase px-3 py-1 rounded-full border border-border bg-bg-secondary text-text-muted hover:text-text-primary hover:border-border-strong transition-all duration-300 select-none"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Action Row */}
            <div className="anim-child flex flex-wrap items-center gap-6 mb-6">
              <a
                href={current.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-text-primary text-bg-primary font-black text-[10px] tracking-wider uppercase rounded-xl hover:opacity-90 transition-opacity duration-300 shadow-md"
              >
                <span>View Live</span>
                <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-mint"></span>
                </span>
                <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
                  {current.status}
                </span>
              </div>
            </div>

            {/* Swipe Controls and Navigation */}
            <div className="anim-child flex items-center justify-between border-t border-border/60 pt-5 mt-auto">
              {/* Pagination Dots */}
              <div className="flex gap-2">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`h-[6px] rounded-full transition-all duration-500 cursor-pointer ${
                      active === i
                        ? "w-8 bg-gradient-to-r from-mint to-royal shadow-[0_0_10px_rgba(87,219,150,0.4)]"
                        : "w-[6px] bg-border hover:bg-text-muted"
                    }`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* Slider Arrows */}
              <div className="flex gap-4">
                <button
                  onClick={prev}
                  className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-text-primary transition-colors bg-bg-secondary cursor-pointer"
                  aria-label="Previous Project"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                </button>
                <button
                  onClick={next}
                  className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-text-primary transition-colors bg-bg-secondary cursor-pointer"
                  aria-label="Next Project"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default InternshipShowcase;
