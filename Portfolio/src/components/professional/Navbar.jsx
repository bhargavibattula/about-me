import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import GooeyNav from "./GooeyNav";
import { useTheme } from "../../contexts/ThemeContext";
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { isDark, setIsDark } = useTheme();
  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement,
        b = document.body,
        st = "scrollTop",
        sh = "scrollHeight";
      const percent =
        ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
      setScrollProgress(percent);
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks = [
    { label: "Resume", href: "#about" },
    { label: "Arena", href: "#arena" },
    { label: "Archive", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Terminal", href: "#terminal" },
  ];
  return (
    <>
      {" "}
      <nav
        className={`fixed top-0 left-0 w-full z-[2000] transition-all duration-500 ${scrolled ? "py-4 bg-primary/60 backdrop-blur-3xl border-b border-border shadow-[0_20px_50px_rgba(0,0,0,0.3)]" : "py-8 bg-transparent"}`}
      >
        {" "}
        {/* Micro Scan Beam (Scroll Progress) */}{" "}
        <div
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-mint via-royal to-fuchsia transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />{" "}
        <div className="container mx-auto px-8 flex justify-between items-center relative z-10">
          {" "}
          <a href="#" className="flex items-center gap-4 group flex-shrink-0">
            {" "}
            <div className="w-10 h-10 bg-bg-secondary border border-border-strong rounded-xl flex items-center justify-center text-text-primary font-black text-xl group-hover:bg-[var(--accent-hover)] group-hover:text-[var(--accent-text)] hover:scale-110 transition-all duration-500 shadow-xl">
              B
            </div>{" "}
            <div className="flex flex-col">
              {" "}
              <span className="text-[11px] font-black uppercase tracking-[0.4em] hidden md:block group-hover:text-mint transition-colors">
                Bhargavi.Architecture
              </span>{" "}
              <span className="text-[7px] font-black uppercase tracking-[1em] text-text-muted hidden md:block">
                System Node 01
              </span>{" "}
            </div>{" "}
          </a>{" "}
          {/* Desktop Nav - Professional Grid */}{" "}
          <div className="hidden lg:flex items-center gap-3 lg:gap-6 xl:gap-10">
            {" "}
            <GooeyNav
              items={navLinks}
              particleCount={15}
              particleDistances={[90, 10]}
              particleR={100}
              initialActiveIndex={0}
              animationTime={600}
              timeVariance={300}
              colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            />{" "}
            <div className="h-6 w-[1px] bg-bg-tertiary mx-1 lg:mx-2 xl:mx-4 flex-shrink-0" />{" "}
            <button
              onClick={() => setIsDark(!isDark)}
              className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-[var(--bg-tertiary)] border border-border text-text-primary hover:bg-[var(--accent-hover)] hover:text-[var(--accent-text)] transition-all"
            >
              {" "}
              {isDark ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}{" "}
            </button>{" "}
            <a
              href="#contact"
              className="px-6 lg:px-8 xl:px-10 py-3.5 bg-[var(--accent)] text-[var(--accent-text)] font-black uppercase text-[9px] tracking-[0.4em] rounded-full hover:bg-[var(--accent-hover)] transition-all shadow-xl active:scale-95 flex-shrink-0"
            >
              {" "}
              Let's Connect ➔{" "}
            </a>{" "}
          </div>{" "}
          {/* Mobile Toggle - Architectural */}{" "}
          <div className="lg:hidden flex items-center gap-4 relative z-[2001]">
            {" "}
            <button
              onClick={() => setIsDark(!isDark)}
              className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-[var(--bg-tertiary)] border border-border text-text-primary hover:bg-[var(--accent-hover)] hover:text-[var(--accent-text)] transition-all"
            >
              {" "}
              {isDark ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}{" "}
            </button>{" "}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-12 h-12 flex flex-col items-center justify-center gap-2 bg-bg-secondary rounded-full border border-border "
            >
              {" "}
              <span
                className={`h-0.5 bg-text-primary transition-all duration-500 ${mobileOpen ? "rotate-45 translate-y-1.5 w-6" : "w-6"}`}
              />{" "}
              <span
                className={`h-0.5 bg-text-primary transition-all duration-500 ${mobileOpen ? "-rotate-45 -translate-y-1.5 w-6" : "w-4"}`}
              />{" "}
            </button>{" "}
          </div>{" "}
        </div>{" "}
        {/* Mobile Menu Overlay - Immersive Fullscreen */}{" "}
        <AnimatePresence>
          {" "}
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(30px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              className="fixed inset-0 h-screen bg-black/90 z-[1999] flex flex-col items-center justify-center text-center p-12 overflow-hidden"
            >
              {" "}
              {/* Decorative Background for Mobile Nav */}{" "}
              <div className="absolute top-0 right-0 w-full h-full bg-mint/5 pointer-events-none blur-[150px] opacity-20" />{" "}
              <div className="flex flex-col gap-12 relative z-10 w-full">
                {" "}
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-text-muted hover:text-text-primary hover:italic transition-all duration-500"
                  >
                    {" "}
                    {link.label}{" "}
                  </motion.a>
                ))}{" "}
                <motion.a
                  href="#contact"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  onClick={() => setMobileOpen(false)}
                  className="px-16 py-6 bg-[var(--accent)] text-[var(--accent-text)] font-black uppercase text-xs tracking-[0.6em] rounded-full mt-20 inline-block self-center shadow-2xl hover:bg-[var(--accent-hover)] transition-all"
                >
                  {" "}
                  Let's Connect ➔{" "}
                </motion.a>{" "}
              </div>{" "}
            </motion.div>
          )}{" "}
        </AnimatePresence>{" "}
      </nav>{" "}
    </>
  );
};
export default Navbar;
