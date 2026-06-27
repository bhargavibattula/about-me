import React, { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";

const projects = [
  {
    index: "01",
    title: "AH Career Platform",
    category: "MERN STACK • STARTUP",
    badge: "FLAGSHIP",
    desc: "End-to-end career guidance and learning management platform built for a startup — handling full-stack development, DNS configuration, SSL provisioning, and production deployment.",
    role: "FULL-STACK DEVELOPER & ARCHITECT",
    highlights: [
      "Built complete MERN stack platform from scratch",
      "Dynamic career path visualizer with interactive UI",
      "Certificate generator, course management & admin dashboard",
    ],
    tags: ["MongoDB", "Express", "React", "Node.js", "DNS & SSL"],
    image: "/assets/freelance1.png",
    link: "https://ahcareer.in",
    status: "LIVE PRODUCTION",
  },
  {
    index: "02",
    title: "Build With AI",
    category: "NEXT.JS • STARTUP",
    badge: "AI INTEGRATION",
    desc: "A cutting-edge AI-powered learning platform built for a startup — featuring intelligent chatbot integration, real-time token streaming, and a modern full-stack architecture.",
    role: "FULL-STACK DEVELOPER & AI ENGINEER",
    highlights: [
      "Full-stack Next.js app with MongoDB backend",
      "Groq & Llama AI chatbot with real-time streaming",
      "Deployed and managed on Vercel with CI/CD",
    ],
    tags: ["Next.js", "MongoDB", "Vercel", "Groq API", "Tailwind CSS"],
    image: "/assets/freelance2.png",
    link: "https://atishjain.in",
    status: "LIVE PRODUCTION",
  },
  {
    index: "03",
    title: "Training Management System",
    category: "GOVT PROJECT • MERN STACK",
    badge: "GOVERNMENT",
    desc: "Production-grade training management system developed for the Government of Secondary Education — managing training programs across states, districts, mandals, and venues.",
    role: "FULL-STACK DEVELOPER & ARCHITECT",
    highlights: [
      "Role-based access control across 4 admin tiers",
      "Attendance, venue, food & photo management modules",
      "Audit logs, report generation & Cloudinary integration",
    ],
    tags: ["MongoDB", "Express", "React", "Node.js", "Cloudinary"],
    image: "/assets/freelance3.png",
    link: "https://up-skill-seven.vercel.app/",
    status: "ONGOING",
  },
];

const AUTOPLAY_MS = 6000;

const HorizontalShowcase = () => {
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

  const directionRef = useRef(1);

  // ─── Animate to a new slide ───
  const animateSlide = useCallback((newIndex) => {
    if (animating.current) return;
    if (newIndex === active) return;
    animating.current = true;
    directionRef.current = newIndex > active ? 1 : -1;

    // Kill autoplay during transition
    if (autoplayTimer.current) clearTimeout(autoplayTimer.current);
    if (progressTween.current) progressTween.current.kill();

    const tl = gsap.timeline({
      onComplete: () => {
        // Change state to new project. The entrance is handled by useLayoutEffect.
        setActive(newIndex);
      },
    });

    // ── EXIT: fade out current content ──
    const dir = directionRef.current;
    if (imageWrapRef.current) {
      tl.to(
        imageWrapRef.current,
        { opacity: 0, x: dir === 1 ? -40 : 40, scale: 0.98, duration: 0.3, ease: "power2.inOut" },
        0
      );
    }

    if (textWrapRef.current) {
      const children = textWrapRef.current.querySelectorAll(".anim-child");
      tl.to(
        children,
        { opacity: 0, y: dir === 1 ? -15 : 15, duration: 0.25, stagger: 0.02, ease: "power2.inOut" },
        0
      );
    }
  }, [active]);

  // ─── Synchronous Entrance Animation ───
  // Runs before the browser paints the new 'active' state, preventing flashes
  React.useLayoutEffect(() => {
    // Skip initial mount (handled by useEffect below) or if not animating
    if (!animating.current) return;

    const dir = directionRef.current;

    // Set initial hidden states BEFORE paint
    if (imageWrapRef.current) {
      gsap.set(imageWrapRef.current, { opacity: 0, x: dir === 1 ? 40 : -40, scale: 0.98 });
    }
    let children = [];
    if (textWrapRef.current) {
      children = textWrapRef.current.querySelectorAll(".anim-child");
      gsap.set(children, { opacity: 0, y: dir === 1 ? 15 : -15 });
    }

    // Animate in
    const enterTl = gsap.timeline({
      onComplete: () => { animating.current = false; }
    });

    if (imageWrapRef.current) {
      enterTl.to(
        imageWrapRef.current,
        { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: "power3.out" },
        0.1
      );
    }

    if (children.length) {
      enterTl.to(
        children,
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: "power3.out" },
        0.15
      );
    }
  }, [active]);

  // ─── Autoplay ───
  useEffect(() => {
    if (progressBarRef.current) {
      gsap.set(progressBarRef.current, { scaleX: 0 });
      progressTween.current = gsap.to(progressBarRef.current, {
        scaleX: 1,
        duration: AUTOPLAY_MS / 1000,
        ease: "none",
      });
    }

    autoplayTimer.current = setTimeout(() => {
      const nextIdx = (active + 1) % projects.length;
      animateSlide(nextIdx, 1);
    }, AUTOPLAY_MS);

    return () => {
      if (autoplayTimer.current) clearTimeout(autoplayTimer.current);
      if (progressTween.current) progressTween.current.kill();
    };
  }, [active, animateSlide]);

  // ─── Initial entrance animation on mount ───
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

  // ─── Navigation helpers ───
  const goTo = useCallback(
    (idx) => {
      if (idx === active || animating.current) return;
      animateSlide(idx);
    },
    [active, animateSlide]
  );

  const next = useCallback(() => {
    if (animating.current) return;
    animateSlide((active + 1) % projects.length);
  }, [active, animateSlide]);

  const prev = useCallback(() => {
    if (animating.current) return;
    animateSlide((active - 1 + projects.length) % projects.length);
  }, [active, animateSlide]);

  // ─── Swipe / drag ───
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

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-bg-primary overflow-hidden transition-colors duration-300"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onTouchStart={onPointerDown}
      onTouchEnd={onPointerUp}
    >
      {/* Autoplay progress rail */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-border/30 z-20">
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-mint via-royal to-mint origin-left will-change-transform"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/3 -left-40 w-[550px] h-[550px] bg-mint/5 blur-[200px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-[550px] h-[550px] bg-royal/5 blur-[200px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="mb-14 md:mb-20">
          <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.6em] text-mint mb-4 block">
            Selected Work // Freelance
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none text-text-primary">
            Client{" "}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-text-muted to-text-secondary">
              Showcase
            </span>
          </h2>
        </div>

        {/* ═══ Main grid: Image + Text ═══ */}
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
                  alt={current.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.01]"
                  draggable={false}
                />
              </div>
            </div>
          </div>

          {/* ── RIGHT: Text Details ── */}
          <div ref={textWrapRef} className="lg:col-span-6 flex flex-col relative">
            {/* Badge + Category */}
            <div className="anim-child flex flex-wrap items-center gap-3 mb-4 relative z-10">
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full border border-royal/30 bg-royal/5 text-royal">
                {current.badge}
              </span>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] text-text-muted">
                {current.category}
              </span>
            </div>

            {/* Project Title */}
            <h3 className="anim-child text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-[1.1] text-text-primary mb-2 relative z-10">
              {current.title}
            </h3>

            {/* Role */}
            <h4 className="anim-child text-xs md:text-sm font-bold uppercase tracking-[0.15em] text-mint mb-4">
              {current.role}
            </h4>

            {/* Description */}
            <p className="anim-child text-sm md:text-base text-text-secondary font-light leading-relaxed mb-5">
              {current.desc}
            </p>

            {/* Highlights */}
            <div className="anim-child space-y-2.5 mb-6">
              {current.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-mint shrink-0 shadow-[0_0_12px_rgba(87,219,150,0.6)]" />
                  <span className="text-xs md:text-sm text-text-primary font-normal leading-relaxed">
                    {h}
                  </span>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="anim-child flex flex-wrap gap-2 mb-6">
              {current.tags.map((t) => (
                <span
                  key={t}
                  className="text-[10px] md:text-xs font-bold uppercase tracking-[0.1em] px-3.5 py-1.5 border border-border rounded-full text-text-secondary bg-bg-secondary/50 hover:border-mint/30 hover:text-mint transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* CTA + Controls */}
            <div className="anim-child flex flex-col md:flex-row items-center justify-between gap-6 pt-5 border-t border-border/50">
              <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                <a
                  href="mailto:bhargavitejaswi97@gmail.com?subject=Hiring%20/%20Freelance%20Inquiry"
                  className="px-6 py-3 md:py-3.5 bg-transparent border-2 border-mint text-mint hover:bg-mint hover:text-white font-black uppercase text-[10px] tracking-[0.2em] rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(87,219,150,0.15)] flex items-center gap-2 hover:scale-105 active:scale-95"
                >
                  Hire / Freelance ✉
                </a>
                <a
                  href={current.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 md:py-3.5 bg-[var(--accent)] text-[var(--accent-text)] font-black uppercase text-[10px] tracking-[0.2em] rounded-full hover:opacity-90 transition-opacity shadow-[0_0_25px_rgba(87,219,150,0.12)] flex items-center gap-2 hover:scale-105 active:scale-95"
                >
                  View Deployment ➔
                </a>
              </div>

              <div className="flex items-center gap-4">
                {/* Dots */}
                <div className="flex gap-2">
                  {projects.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`h-[6px] rounded-full transition-all duration-500 cursor-pointer ${active === i
                        ? "w-8 bg-gradient-to-r from-mint to-royal shadow-[0_0_10px_rgba(87,219,150,0.4)]"
                        : "w-[6px] bg-border hover:bg-text-muted"
                        }`}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Arrows */}
                <button
                  onClick={prev}
                  className="w-12 h-12 border border-border rounded-full flex items-center justify-center text-text-muted hover:text-text-primary hover:border-border-strong transition-all cursor-pointer active:scale-90 text-base"
                  aria-label="Previous"
                >
                  ←
                </button>
                <button
                  onClick={next}
                  className="w-12 h-12 border border-border rounded-full flex items-center justify-center text-text-muted hover:text-text-primary hover:border-border-strong transition-all cursor-pointer active:scale-90 text-base"
                  aria-label="Next"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalShowcase;
