import React from "react";
import { motion } from "motion/react";
const FloatingNavbar = ({ onNavigate }) => {
  const navItems = [
    { label: "About", app: "ARENA.exe", tab: "resume" },
    { label: "Projects", app: "VAULT.exe" },
    { label: "Experience", app: "ARENA.exe", tab: "resume" },
    { label: "Skills", app: "SKILL_SOLAR.exe" },
    { label: "Arena", app: "ARENA.exe" },
    { label: "Contact", app: "ARENA.exe", tab: "profiles" },
  ];
  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[10000] pointer-events-none">
      {" "}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-2 p-2 bg-bg-primary/60 backdrop-blur-3xl border border-border-strong rounded-full pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        {" "}
        <div className="flex items-center gap-1 px-4 mr-2 border-r border-border-strong">
          {" "}
          <div className="w-2 h-2 rounded-full bg-mint animate-pulse" />{" "}
          <span className="text-[10px] font-black uppercase text-text-muted tracking-widest">
            System Nav
          </span>{" "}
        </div>{" "}
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => onNavigate(item.app, item.label)}
            className="px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-text-primary hover:bg-bg-secondary transition-all duration-300"
          >
            {" "}
            {item.label}{" "}
          </button>
        ))}{" "}
        <div className="ml-4 px-6 py-2.5 bg-mint text-[var(--accent-text)] rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(87,219,150,0.3)] cursor-help">
          {" "}
          v1.0.4{" "}
        </div>{" "}
      </motion.nav>{" "}
    </div>
  );
};
export default FloatingNavbar;
