import React, { useState, useRef, useCallback, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const slidesData = [
  {
    badge: "✨ Trusted career training since 2013",
    title: "Build job-ready skills for a",
    highlight: "faster tech career.",
    description:
      "Learn with practical projects, expert mentors, interview preparation, and placement-focused programs designed for real career outcomes.",
    certifications: [
      "ISO 9001:2015 Certified",
      "Tally Certified Partner",
      "MSME Registered",
    ],
    dashboard: {
      title: "Placement prep",
      status: "Live",
      items: [
        { icon: "✓", label: "Resume Review", progress: 85 },
        { icon: "✓", label: "Mock Interview", progress: 60 },
        { icon: "✓", label: "Project Review", progress: 95 },
      ],
      sidebar: {
        icon: "🛡️",
        title: "Placement support",
        value: "100%",
        desc: "Career guidance, HR prep, interview readiness, and company connect support.",
        tag: "Skill-to-job focused",
      },
      tags: [
        { label: "Full Stack", sub: "Industry curriculum" },
        { label: "Python", sub: "Industry curriculum" },
      ],
    },
  },
  {
    badge: "🚀 Designed for Career Success",
    title: "Launch your career with",
    highlight: "100% placement support.",
    description:
      "Our dedicated placement team works round-the-clock to connect you with top companies, schedule interviews, and negotiate offers.",
    certifications: [
      "500+ Partner Companies",
      "Dedicated HR Prep",
      "Mock Drills",
    ],
    dashboard: {
      title: "Active Drives",
      status: "Updates Daily",
      items: [
        { icon: "✓", label: "Tech Rounds Cleared", progress: 90 },
        { icon: "✓", label: "HR Evaluation", progress: 75 },
        { icon: "✓", label: "Offer Negotiation", progress: 40 },
      ],
      sidebar: {
        icon: "📈",
        title: "Average Package Boost",
        value: "+65%",
        desc: "Average salary hike achieved by candidates after completing training tracks.",
        tag: "High Return on Learning",
      },
      tags: [
        { label: "React & Node", sub: "Industry curriculum" },
        { label: "Java Backend", sub: "Industry curriculum" },
      ],
    },
  },
  {
    badge: "🎯 Practical Learning",
    title: "Master industry tools with",
    highlight: "hands-on projects.",
    description:
      "Learn-by-doing with production-level applications. Build portfolio pieces that stand out to tech recruiters and hiring teams.",
    certifications: [
      "GitHub Code Reviews",
      "Real-World APIs",
      "CI/CD Workflows",
    ],
    dashboard: {
      title: "Project Progress",
      status: "Building",
      items: [
        { icon: "✓", label: "API Design & Spec", progress: 100 },
        { icon: "✓", label: "Frontend Architecture", progress: 80 },
        { icon: "✓", label: "Production Deploy", progress: 50 },
      ],
      sidebar: {
        icon: "⚡",
        title: "Hands-on Hours",
        value: "200+",
        desc: "Practical coding sessions building applications deployed in live production environment.",
        tag: "Portfolio-ready Code",
      },
      tags: [
        { label: "Docker", sub: "DevOps curriculum" },
        { label: "AWS Deploy", sub: "Cloud curriculum" },
      ],
    },
  },
];

const AUTOPLAY_INTERVAL = 5000;

export default function CareerSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const dashRef = useRef(null);
  const progressRef = useRef(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isDragging = useRef(false);
  const autoplayRef = useRef(null);
  const progressTween = useRef(null);

  const currentSlide = slidesData[activeIndex];

  // ─── Autoplay with animated progress bar ───
  const startAutoplay = useCallback(() => {
    // Kill existing
    if (autoplayRef.current) clearTimeout(autoplayRef.current);
    if (progressTween.current) progressTween.current.kill();

    // Animate the autoplay progress bar
    if (progressRef.current) {
      gsap.set(progressRef.current, { scaleX: 0 });
      progressTween.current = gsap.to(progressRef.current, {
        scaleX: 1,
        duration: AUTOPLAY_INTERVAL / 1000,
        ease: "none",
      });
    }

    autoplayRef.current = setTimeout(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % slidesData.length);
    }, AUTOPLAY_INTERVAL);
  }, []);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) clearTimeout(autoplayRef.current);
    if (progressTween.current) progressTween.current.kill();
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [activeIndex, startAutoplay, stopAutoplay]);

  // ─── GSAP slide transitions ───
  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // ── Left text stagger animation ──
        const textEls = textRef.current?.children;
        if (textEls) {
          gsap.fromTo(
            textEls,
            {
              opacity: 0,
              y: direction === 1 ? 40 : -40,
              filter: "blur(8px)",
            },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.7,
              stagger: 0.08,
              ease: "power3.out",
              clearProps: "filter",
            }
          );
        }

        // ── Right dashboard 3D slide ──
        if (dashRef.current) {
          gsap.fromTo(
            dashRef.current,
            {
              opacity: 0,
              x: direction === 1 ? 120 : -120,
              rotateY: direction === 1 ? 12 : -12,
              scale: 0.92,
            },
            {
              opacity: 1,
              x: 0,
              rotateY: 0,
              scale: 1,
              duration: 0.9,
              ease: "power3.out",
            }
          );

          // Stagger inner dashboard children
          const dashChildren = dashRef.current.querySelectorAll(".dash-anim");
          if (dashChildren.length) {
            gsap.fromTo(
              dashChildren,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.06,
                delay: 0.25,
                ease: "power2.out",
              }
            );
          }

          // Animate progress bars filling
          const bars = dashRef.current.querySelectorAll(".progress-fill");
          bars.forEach((bar) => {
            const targetWidth = bar.dataset.progress;
            gsap.fromTo(
              bar,
              { width: "0%" },
              {
                width: `${targetWidth}%`,
                duration: 1,
                delay: 0.5,
                ease: "power2.out",
              }
            );
          });
        }
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef, dependencies: [activeIndex, direction] }
  );

  // ─── Navigation ───
  const goToSlide = useCallback(
    (index) => {
      stopAutoplay();
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
    },
    [activeIndex, stopAutoplay]
  );

  const nextSlide = useCallback(() => {
    stopAutoplay();
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % slidesData.length);
  }, [stopAutoplay]);

  const prevSlide = useCallback(() => {
    stopAutoplay();
    setDirection(-1);
    setActiveIndex(
      (prev) => (prev - 1 + slidesData.length) % slidesData.length
    );
  }, [stopAutoplay]);

  // ─── Touch / drag handlers ───
  const handlePointerDown = (e) => {
    touchStartX.current = e.clientX || e.touches?.[0]?.clientX || 0;
    touchStartY.current = e.clientY || e.touches?.[0]?.clientY || 0;
    isDragging.current = true;
    stopAutoplay();
  };

  const handlePointerUp = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const endX = e.clientX || e.changedTouches?.[0]?.clientX || 0;
    const endY = e.clientY || e.changedTouches?.[0]?.clientY || 0;
    const diffX = touchStartX.current - endX;
    const diffY = Math.abs(touchStartY.current - endY);

    // Only trigger if horizontal swipe is dominant
    if (Math.abs(diffX) > 50 && diffY < Math.abs(diffX)) {
      if (diffX > 0) nextSlide();
      else prevSlide();
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-bg-primary overflow-hidden transition-colors duration-300"
      style={{ perspective: "1200px" }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchEnd={handlePointerUp}
    >
      {/* Autoplay progress bar */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-border z-20">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-mint via-royal to-mint origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* Ambient glow blobs */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-mint/5 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-royal/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* ═══ LEFT: Text Content ═══ */}
        <div
          ref={textRef}
          className="lg:col-span-6 flex flex-col justify-center select-none"
        >
          {/* Badge */}
          <div className="mb-8 flex items-center gap-2.5 px-5 py-2.5 border border-border bg-bg-secondary/50 backdrop-blur-md rounded-full w-fit">
            <span className="text-[11px] font-bold tracking-wider uppercase text-mint">
              {currentSlide.badge}
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-[3.5rem] lg:text-[4rem] font-black tracking-tight leading-[1.05] mb-6 text-text-primary">
            {currentSlide.title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal via-mint to-royal">
              {currentSlide.highlight}
            </span>
          </h2>

          {/* Description */}
          <p className="text-text-secondary text-base md:text-lg font-light leading-relaxed mb-10 max-w-xl">
            {currentSlide.description}
          </p>

          {/* Certifications */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-bold text-text-muted uppercase tracking-[0.15em] mb-10 border-t border-border pt-6">
            {currentSlide.certifications.map((cert, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="text-mint text-xs">✦</span> {cert}
              </span>
            ))}
          </div>

          {/* Slide controls */}
          <div className="flex items-center gap-6">
            {/* Dot indicators */}
            <div className="flex gap-2">
              {slidesData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-[6px] rounded-full transition-all duration-500 cursor-pointer ${
                    activeIndex === index
                      ? "w-10 bg-gradient-to-r from-mint to-royal shadow-[0_0_12px_rgba(87,219,150,0.4)]"
                      : "w-[6px] bg-border hover:bg-text-muted"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex gap-3">
              <button
                onClick={prevSlide}
                className="w-10 h-10 border border-border rounded-full flex items-center justify-center hover:bg-bg-secondary hover:border-border-strong transition-all text-text-muted hover:text-text-primary cursor-pointer active:scale-90"
                aria-label="Previous slide"
              >
                ←
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 border border-border rounded-full flex items-center justify-center hover:bg-bg-secondary hover:border-border-strong transition-all text-text-muted hover:text-text-primary cursor-pointer active:scale-90"
                aria-label="Next slide"
              >
                →
              </button>
            </div>

            {/* Slide counter */}
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-text-muted ml-auto hidden sm:block">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(slidesData.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* ═══ RIGHT: Dashboard Visual ═══ */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div
            ref={dashRef}
            className="w-full max-w-[560px] rounded-[28px] overflow-hidden"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Card outer shell */}
            <div className="bg-bg-secondary/60 backdrop-blur-2xl border border-border rounded-[28px] p-6 md:p-8 shadow-[0_30px_80px_rgba(0,0,0,0.15)] relative">
              {/* Subtle glow ring */}
              <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-br from-mint/10 via-transparent to-royal/10 pointer-events-none" />

              {/* ── Header ── */}
              <div className="dash-anim flex justify-between items-start pb-5 border-b border-border/50 mb-6 relative z-10">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-mint block mb-1">
                    CAREER DASHBOARD
                  </span>
                  <h4 className="text-lg font-bold text-text-primary">
                    Your next role starts here
                  </h4>
                </div>
                <div className="w-10 h-10 rounded-xl bg-royal/10 border border-royal/20 flex items-center justify-center text-lg">
                  {currentSlide.dashboard.sidebar.icon}
                </div>
              </div>

              {/* ── Inner Grid ── */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 relative z-10">
                {/* Progress Column */}
                <div className="sm:col-span-7 space-y-5">
                  <div className="dash-anim flex justify-between items-center">
                    <span className="text-xs text-text-secondary font-bold tracking-wide">
                      {currentSlide.dashboard.title}
                    </span>
                    <span className="text-[9px] px-2.5 py-1 bg-mint/10 text-mint rounded-md font-black uppercase tracking-wider">
                      {currentSlide.dashboard.status}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {currentSlide.dashboard.items.map((item, idx) => (
                      <div key={idx} className="dash-anim space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-mint/10 text-mint text-[10px] flex items-center justify-center font-bold">
                            {item.icon}
                          </span>
                          <span className="text-xs font-semibold text-text-primary flex-1">
                            {item.label}
                          </span>
                        </div>
                        <div className="w-full h-[5px] bg-border/50 rounded-full overflow-hidden">
                          <div
                            className="progress-fill h-full bg-gradient-to-r from-mint to-royal rounded-full"
                            data-progress={item.progress}
                            style={{ width: "0%" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sidebar info card */}
                <div className="sm:col-span-5 dash-anim">
                  <div className="bg-royal/5 border border-royal/10 rounded-2xl p-5 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg">
                          {currentSlide.dashboard.sidebar.icon}
                        </span>
                        <span className="text-[9px] text-royal font-black uppercase tracking-wider">
                          {currentSlide.dashboard.sidebar.title}
                        </span>
                      </div>
                      <div className="text-4xl font-black text-text-primary mb-3 tracking-tight">
                        {currentSlide.dashboard.sidebar.value}
                      </div>
                      <p className="text-[11px] text-text-muted font-light leading-relaxed">
                        {currentSlide.dashboard.sidebar.desc}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-royal/10">
                      <span className="text-[9px] font-bold text-royal uppercase tracking-widest flex items-center gap-1.5">
                        ↗ {currentSlide.dashboard.sidebar.tag}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Bottom tags ── */}
              <div className="dash-anim flex flex-wrap gap-4 mt-6 pt-5 border-t border-border/30 relative z-10">
                {currentSlide.dashboard.tags.map((tag, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-1 bg-gradient-to-r from-mint to-royal rounded-full" />
                    <div>
                      <span className="text-sm font-bold text-text-primary block leading-tight">
                        {tag.label}
                      </span>
                      <span className="text-[9px] text-text-muted uppercase tracking-wider">
                        {tag.sub}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
