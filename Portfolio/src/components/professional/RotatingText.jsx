import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const RotatingText = ({
  texts = [],
  className = "",
  color = "var(--accent)",
  interval = 3000,
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (texts.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, interval);
    return () => clearInterval(timer);
  }, [texts, interval]);

  const currentText = texts[index] || "";

  return (
    <span className={`inline-flex items-center justify-center relative perspective-300 ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="inline-flex overflow-hidden py-1"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {currentText.split("").map((char, charIdx) => (
            <motion.span
              key={`${index}-${charIdx}`}
              className="inline-block whitespace-pre transform-gpu"
              style={{ color }}
              variants={{
                hidden: { y: "130%", rotateX: 75, opacity: 0 },
                visible: {
                  y: "0%",
                  rotateX: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 160,
                    damping: 14,
                    delay: charIdx * 0.035,
                  },
                },
                exit: {
                  y: "-130%",
                  rotateX: -75,
                  opacity: 0,
                  transition: {
                    duration: 0.18,
                    delay: charIdx * 0.015,
                  },
                },
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default RotatingText;
