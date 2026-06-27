import React from "react";
import { motion } from "motion/react";
import StarBorder from "./StarBorder";
import RotatingText from "./RotatingText";

const FreelanceCTA = () => {
  return (
    <section className="py-32 px-6 md:px-8 bg-bg-primary relative overflow-hidden flex justify-center items-center transition-colors duration-300">
      {/* Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-mint/5 blur-[150px] pointer-events-none rounded-full" />
      <div className="container mx-auto max-w-4xl relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <StarBorder
            as="div"
            color="#57db96"
            speed="4s"
            borderRadius="48px"
            className="p-1 w-full max-w-3xl"
          >
            <div className="px-8 py-16 md:py-24 md:px-16 flex flex-col items-center justify-center text-center bg-bg-secondary/80 backdrop-blur-2xl rounded-[46px] border border-border-strong relative overflow-hidden">
              {/* Inner Grid Pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] opacity-50" />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.8em] text-text-muted mb-6 block relative z-10">
                Status: Available
              </span>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-text-primary mb-4 relative z-10 leading-none">
                Curious about
              </h2>
              <div className="mb-8 relative z-10 min-h-[60px] flex items-center justify-center">
                <span className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-mint italic border border-mint/20 bg-mint/5 px-6 py-2.5 rounded-2xl shadow-sm inline-block">
                  <RotatingText
                    texts={[
                      "BUILDING NEW MVPs?",
                      "SCALING YOUR IDEAS?",
                      "HACKATHON COLLABS?",
                      "FREELANCE DEV?",
                      "THEN CONTACT..."
                    ]}
                    color="#57db96"
                    interval={2800}
                  />
                </span>
              </div>
              <p className="text-sm md:text-base text-text-secondary leading-relaxed font-light mb-12 max-w-lg relative z-10">
                {" "}
                Whether you're building a hyper-scale enterprise platform, an
                AI-integrated application, or a cutting-edge startup MVP—I bring
                production-grade architecture from end to end.{" "}
              </p>{" "}
              <motion.a
                href="mailto:bhargavitejaswi97@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 px-10 py-5 bg-[var(--accent)] text-[var(--accent-text)] text-text-primary font-black uppercase text-[10px] md:text-xs tracking-[0.4em] rounded-full hover:bg-[var(--accent-hover)]  transition-colors shadow-[0_0_30px_rgba(87,219,150,0.2)] hover:shadow-[0_0_50px_rgba(87,219,150,0.4)] flex items-center gap-4"
              >
                {" "}
                Initiate Contact ➔{" "}
              </motion.a>{" "}
            </div>{" "}
          </StarBorder>{" "}
        </motion.div>{" "}
      </div>{" "}
    </section>
  );
};
export default FreelanceCTA;
