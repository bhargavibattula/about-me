import React from "react";
import { motion } from "motion/react";
const FreelanceWork = () => {
  const freelanceItems = [
    {
      title: "AH Career Platform",
      description:
        "End-to-end career guidance and learning management platform built for a startup with full MERN stack.",
      url: "https://ahcareer.in",
      tech: ["MongoDB", "Express", "React", "Node.js"],
    },
    {
      title: "Build With AI",
      description:
        "AI-powered learning platform built for a startup — featuring intelligent chatbot, real-time streaming, and full-stack Next.js architecture.",
      url: "https://atishjain.in",
      tech: ["Next.js", "MongoDB", "Vercel"],
    },
    {
      title: "Training Management System",
      description:
        "Production-grade TMS developed for the Government of Secondary Education — managing training programs across states, districts, and venues.",
      url: "https://up-skill-seven.vercel.app/",
      tech: ["MongoDB", "Express", "React", "Node.js"],
    },
  ];
  return (
    <section
      id="freelance"
      className="py-24 md:py-32 px-6 md:px-8 bg-bg-primary relative overflow-hidden transition-colors duration-300"
    >
      {" "}
      <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-mint/20 to-transparent" />{" "}
      <div className="container mx-auto max-w-6xl relative z-10">
        {" "}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          {" "}
          {/* Left Column: Bold Typography & Summary */}{" "}
          <div className="lg:col-span-5 relative">
            {" "}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {" "}
              <span className="text-[10px] font-black uppercase tracking-[0.8em] text-mint mb-6 block">
                Self-Employed
              </span>{" "}
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-8 text-text-primary ">
                {" "}
                Freelance <br />{" "}
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-400 ">
                  Architect
                </span>{" "}
              </h2>{" "}
              <p className="text-base text-text-secondary leading-relaxed font-light mb-8 max-w-sm">
                {" "}
                Architected and deployed{" "}
                <strong className="text-text-primary font-medium">
                  3 production websites end-to-end
                </strong>
                , handling full-stack development, DNS configuration, and SSL
                provisioning. Currently scaling with 2 additional client
                projects in active development.{" "}
              </p>{" "}
              <div className="w-16 h-[1px] bg-mint/50" />{" "}
            </motion.div>{" "}
          </div>{" "}
          {/* Right Column: High-end List View */}{" "}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {" "}
            {freelanceItems.map((item, index) => (
              <motion.a
                href={item.url !== "#" ? item.url : undefined}
                target={item.url !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="group relative p-8 md:p-10 border border-border bg-bg-secondary .01] hover:bg-bg-tertiary :bg-bg-tertiary transition-all rounded-[32px] overflow-hidden flex flex-col sm:flex-row gap-8 justify-between items-start sm:items-center cursor-pointer"
              >
                {" "}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-mint/0 group-hover:bg-[var(--accent-hover)] transition-colors" />{" "}
                <div className="absolute -inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-mint/0 group-hover:via-mint/30 to-transparent transition-all opacity-0 group-hover:opacity-100" />{" "}
                <div className="flex-1">
                  {" "}
                  <h3 className="text-2xl font-black uppercase tracking-widest text-text-primary mb-3 group-hover:text-mint :text-mint transition-colors flex items-center gap-4">
                    {" "}
                    {item.title}{" "}
                  </h3>{" "}
                  <p className="text-sm text-text-muted leading-relaxed font-light mb-6 pr-4">
                    {" "}
                    {item.description}{" "}
                  </p>{" "}
                  <div className="flex flex-wrap gap-2">
                    {" "}
                    {item.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 border border-border-strong rounded-full text-text-muted group-hover:border-mint/30 :border-mint/30 group-hover:text-mint/80 :text-mint/80 transition-colors"
                      >
                        {" "}
                        {t}{" "}
                      </span>
                    ))}{" "}
                  </div>{" "}
                </div>{" "}
                <div className="shrink-0">
                  {" "}
                  {item.url !== "#" ? (
                    <div className="w-12 h-12 rounded-full border border-border-strong flex items-center justify-center text-text-muted group-hover:border-mint group-hover:text-mint group-hover:bg-[var(--accent-hover)]/10 transition-all -rotate-45 group-hover:rotate-0">
                      {" "}
                      ➔{" "}
                    </div>
                  ) : (
                    <div className="px-4 py-2 rounded-full border border-border-strong text-[9px] font-black uppercase tracking-[0.2em] text-text-muted ">
                      {" "}
                      Internal{" "}
                    </div>
                  )}{" "}
                </div>{" "}
              </motion.a>
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* Ambient Background Blur */}{" "}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-mint/5 blur-[150px] pointer-events-none rounded-full translate-x-1/3 translate-y-1/3" />{" "}
    </section>
  );
};
export default FreelanceWork;
