import React, { useEffect, useMemo } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useTheme } from "../../contexts/ThemeContext";
import Hyperspeed from "./Hyperspeed";

const Hero = () => {
  const { isDark } = useTheme();

  /* Parallax mouse tracking */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const hyperspeedOptions = useMemo(
    () => ({
      onSpeedUp: () => {},
      onSlowDown: () => {},
      distortion: "turbulentDistortion",
      length: 400,
      roadWidth: 10,
      islandWidth: 2,
      lanesPerRoad: 3,
      fov: 90,
      fovSpeedUp: 150,
      speedUp: 2,
      carLightsFade: 0.4,
      totalSideLightSticks: 20,
      lightPairsPerRoadWay: 40,
      shoulderLinesWidthPercentage: 0.05,
      brokenLinesWidthPercentage: 0.1,
      brokenLinesLengthPercentage: 0.5,
      lightStickWidth: [0.12, 0.5],
      lightStickHeight: [1.3, 1.7],
      movingAwaySpeed: [60, 80],
      movingCloserSpeed: [-120, -160],
      carLightsLength: [400 * 0.03, 400 * 0.2],
      carLightsRadius: [0.05, 0.14],
      carWidthPercentage: [0.3, 0.5],
      carShiftX: [-0.8, 0.8],
      carFloorSeparation: [0, 5],
      colors: {
        roadColor: isDark ? 0x030412 : 0xf8fafc,
        islandColor: isDark ? 0x030412 : 0xf8fafc,
        background: isDark ? 0x030412 : 0xf8fafc,
        shoulderLines: isDark ? 0x1a2b3c : 0xe2e8f0,
        brokenLines: isDark ? 0x1a2b3c : 0xe2e8f0,
        leftCars: isDark
          ? [0x57db96, 0x4169e1, 0x8df5c2]
          : [0x0f766e, 0x1d4ed8, 0x14b8a6],
        rightCars: isDark
          ? [0x4169e1, 0x57db96, 0x8da1f5]
          : [0x1d4ed8, 0x0f766e, 0x3b82f6],
        sticks: isDark ? 0x57db96 : 0x0f766e,
      },
    }),
    [isDark],
  );

  return (
    <section className="min-h-screen relative flex items-center justify-center pt-32 md:pt-40 pb-12 md:pb-24 px-8 md:px-24 overflow-hidden bg-bg-primary font-sans transition-colors duration-300">
      {/* Background Hyperspeed Field - GPU Optimized with Parallax */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <div
          className={`absolute inset-0 pointer-events-none transition-all duration-500 ${
            isDark
              ? "opacity-40 mix-blend-screen"
              : "opacity-75 mix-blend-normal"
          }`}
        >
          <Hyperspeed effectOptions={hyperspeedOptions} />
        </div>

        {/* Premium Gradient Overlays */}
        <div className="absolute top-0 left-0 w-full h-[30%] bg-gradient-to-b from-bg-primary to-transparent z-0" />
        <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-bg-primary to-transparent z-0" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-royal/10 blur-[150px] rounded-full opacity-40 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-mint/10 blur-[150px] rounded-full opacity-40 pointer-events-none" />
      </motion.div>

      <div className="container mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full">
        {/* Left Column: Content */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-1 lg:col-span-7 flex flex-col items-start w-full"
        >
          {/* Status Badge */}
          <div className="mb-10 px-4 py-2 rounded-full border border-border bg-bg-secondary backdrop-blur-md flex items-center gap-3 shadow-xl hover:bg-bg-tertiary transition-colors w-fit">
            <div className="w-2 h-2 rounded-full bg-mint animate-pulse shadow-[0_0_12px_#57db96]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary">
              Available // 2026
            </span>
          </div>

          {/* Premium Typography */}
          <div className="space-y-2 mb-8">
            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] text-text-primary drop-shadow-lg">
              BHARGAVI
            </h1>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-mint to-royal italic drop-shadow-lg pr-4">
              BATTULA.
            </h1>
          </div>

          {/* Elegant Subtitle */}
          <div className="pl-4 border-l-2 border-mint/50 mb-8">
            <h3 className="text-base md:text-xl font-semibold tracking-[0.2em] uppercase text-text-secondary">
              Full-Stack Developer{" "}
              <span className="text-royal mx-2 font-black">✦</span> AI Engineer
            </h3>
          </div>

          {/* Refined Bio */}
          <div className="max-w-xl mb-12">
            <p className="text-sm md:text-lg text-text-secondary font-light leading-relaxed tracking-wide">
              Full-stack software engineer with experience building
              production-grade systems across{" "}
              <span className="text-text-primary font-medium">
                government platforms
              </span>
              ,{" "}
              <span className="text-mint/90 font-medium">
                AI-integrated applications
              </span>
              , and autonomous multi-agent pipelines. Proficient in Java, MERN
              stack, and Agentic AI, with a track record of delivering impactful
              solutions by integrating AI into real-world products. Skilled in
              REST APIs, and backend architecture.{" "}
              <span className="text-royal font-medium">
                4x Hackathon Winner.
              </span>
            </p>
          </div>

          {/* Ultra-premium CTAs */}
          <div className="flex flex-wrap items-center gap-5">
            <motion.a
              href="mailto:bhargavitejaswi97@gmail.com?subject=Hiring%20/%20Freelance%20Inquiry"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 bg-mint text-white font-bold uppercase text-[12px] tracking-[0.2em] rounded-full hover:bg-mint/80 transition-all duration-300 shadow-[0_0_30px_rgba(87,219,150,0.2)] hover:shadow-[0_0_40px_rgba(87,219,150,0.35)]"
            >
              Hire / Freelance ✉
            </motion.a>
            <motion.a
              href="https://drive.google.com/file/d/1pxrIHfK7MBrLd27p3Yd6dYcQMydDJKHY/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 bg-[var(--accent)] text-[var(--accent-text)] font-bold uppercase text-[12px] tracking-[0.2em] rounded-full hover:bg-[var(--accent-hover)] transition-all duration-300 shadow-[0_0_30px_rgba(87,219,150,0.15)] hover:shadow-[0_0_40px_rgba(87,219,150,0.3)]"
            >
              View Resume
            </motion.a>
            <motion.button
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(15, 23, 42, 0.05)",
              }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 bg-transparent border border-border-strong text-text-primary font-bold uppercase text-[12px] tracking-[0.2em] rounded-full hover:border-border-strong transition-all duration-300 backdrop-blur-md cursor-pointer"
            >
              Explore Arena
            </motion.button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
export default Hero;
