import React from "react";
import { motion } from "motion/react";

const FloatingContactWidget = () => {
  return (
    <div className="fixed bottom-6 left-6 z-[10001] pointer-events-auto">
      <motion.a
        whileHover={{ scale: 1.1, rotate: -5 }}
        whileTap={{ scale: 0.9 }}
        href="mailto:bhargavitejaswi97@gmail.com?subject=Hiring%20/%20Freelance%20Inquiry"
        className="relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-2xl border bg-bg-secondary text-mint border-border-strong backdrop-blur-xl hover:shadow-[0_0_15px_rgba(87,219,150,0.3)] group cursor-pointer"
        aria-label="Email Me"
      >
        {/* Mail Icon (Filled, same color styling as ChatBot) */}
        <svg
          className="w-6 h-6 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>

        {/* Always active status dot */}
        <div className="absolute top-0 right-0 w-3 h-3 bg-mint border-2 border-bg-secondary rounded-full animate-pulse" />
      </motion.a>
    </div>
  );
};

export default FloatingContactWidget;
