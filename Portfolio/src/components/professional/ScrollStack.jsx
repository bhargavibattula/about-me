import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import "./ScrollStack.css";

export const ScrollStackItem = ({ children, index, totalCards }) => {
  const containerRef = useRef(null);

  // Track the scroll progress of this card relative to the viewport
  // "start start" means the top of the card meets the top of the viewport (pinnings start)
  // "end start" means the bottom of the card leaves the top of the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smooth scaling: older cards shrink slightly as new ones stack on top
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1 - (totalCards - index) * 0.04]
  );

  // Smooth opacity: older cards fade slightly to focus on the top card
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.55]);

  // Smooth blur: older cards blur slightly for realistic depth-of-field
  const blurVal = useTransform(scrollYProgress, [0, 1], [0, 3]);
  const filter = useTransform(blurVal, (v) => (v > 0.1 ? `blur(${v}px)` : "none"));

  return (
    <div
      ref={containerRef}
      className="scroll-stack-card-container"
      style={{
        // Staggered top values so the headers of stacked cards remain visible (like a real deck)
        top: `calc(12vh + ${index * 32}px)`,
        // Margin bottom creates the scroll track space required to stack the cards
        marginBottom: index === totalCards - 1 ? "0" : "180px",
      }}
    >
      <motion.div
        style={{
          scale,
          opacity,
          filter,
          transformOrigin: "top center",
        }}
        className="scroll-stack-card-wrapper"
      >
        {children}
      </motion.div>
    </div>
  );
};

const ScrollStack = ({ children, className = "" }) => {
  const childrenArray = React.Children.toArray(children);
  return (
    <div className={`scroll-stack-container-fluid ${className}`.trim()}>
      {childrenArray.map((child, index) =>
        React.cloneElement(child, {
          index,
          totalCards: childrenArray.length,
        })
      )}
    </div>
  );
};

export default ScrollStack;
