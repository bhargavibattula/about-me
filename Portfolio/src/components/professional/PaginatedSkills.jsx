import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
const PaginatedSkills = () => {
  const [activePage, setActivePage] = useState(0);
  const categories = [
    {
      id: "languages",
      name: "01. Languages",
      skills: [
        "Java",
        "Python",
        "JavaScript",
        "TypeScript",
        "C/C++",
        "HTML5",
        "CSS3",
      ],
      desc: "Foundational logical protocols for cross-system architectural development.",
      color: "border-fuchsia text-fuchsia",
    },
    {
      id: "frameworks",
      name: "02. Frameworks",
      skills: [
        "React.js",
        "Next.js",
        "Node.js",
        "Express",
        "Spring Boot",
        "FastAPI",
        "Tailwind CSS",
      ],
      desc: "High-performance visual interfaces and robust server-side logic architectures.",
      color: "border-aqua text-aqua",
    },
    {
      id: "databases",
      name: "03. Databases",
      skills: ["PostgreSQL", "MongoDB", "MySQL", "Supabase"],
      desc: "Scalable data persistence and high-integrity storage architectures.",
      color: "border-royal text-royal",
    },
    {
      id: "generative_ai",
      name: "04. Generative AI",
      skills: ["RAG", "Multi-Agent Systems", "LangChain", "LangGraph"],
      desc: "Autonomous agent frameworks and generative intelligence synchronization.",
      color: "border-mint text-mint",
    },
    {
      id: "tools",
      name: "05. Tools",
      skills: ["Git", "GitHub", "Postman", "VS Code", "Google Colab"],
      desc: "Essential infrastructure for deployment, versioning, and architectural design.",
      color: "border-white text-text-primary",
    },
  ];
  return (
    <section
      id="skills"
      className="scroll-mt-24 md:scroll-mt-32 py-32 px-8 bg-bg-secondary backdrop-blur-3xl border-y border-border relative transition-colors duration-300"
    >
      {" "}
      <div className="container mx-auto max-w-6xl">
        {" "}
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12">
          {" "}
          <div>
            {" "}
            <span className="text-xs font-black uppercase tracking-[0.8em] text-fuchsia mb-4 block">
              Archives // Technical Core
            </span>{" "}
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none italic text-text-primary ">
              Expertise <br />{" "}
              <span className="text-text-muted italic">Archive</span>
            </h2>{" "}
          </div>{" "}
        </div>{" "}
        <div className="flex flex-col lg:flex-row gap-16 min-h-[500px]">
          {" "}
          {/* Pagination Sidebar */}{" "}
          <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-6 lg:pb-0 scroll-none border-b lg:border-b-0 lg:border-r border-border-strong pr-0 lg:pr-12">
            {" "}
            {categories.map((cat, index) => (
              <button
                key={cat.id}
                onClick={() => setActivePage(index)}
                className={`flex items-center gap-6 group transition-all px-4 py-3 rounded-full whitespace-nowrap ${activePage === index ? "bg-bg-tertiary " : "hover:bg-bg-secondary :bg-bg-secondary"}`}
              >
                {" "}
                <span
                  className={`text-[10px] font-black tracking-widest uppercase transition-all ${activePage === index ? "text-text-primary translate-x-2" : "text-text-muted group-hover:text-text-primary :text-text-muted"}`}
                >
                  {" "}
                  {cat.name}{" "}
                </span>{" "}
                {activePage === index && (
                  <motion.div
                    layoutId="indicator"
                    className="w-1.5 h-1.5 rounded-full bg-fuchsia shadow-[0_0_10px_#ca2f8c]"
                  />
                )}{" "}
              </button>
            ))}{" "}
          </div>{" "}
          {/* Content Display */}{" "}
          <div className="flex-1 relative overflow-hidden">
            {" "}
            <AnimatePresence mode="wait">
              {" "}
              <motion.div
                key={activePage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-12"
              >
                {" "}
                <div className="space-y-6">
                  {" "}
                  <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-text-primary flex items-center gap-8">
                    {" "}
                    {categories[activePage].id
                      .toUpperCase()
                      .replace("_", " ")}{" "}
                    <div
                      className={`flex-1 h-[1px] bg-gradient-to-r from-slate-300 to-transparent`}
                    />{" "}
                  </h3>{" "}
                  <p className="text-[10px] font-black uppercase tracking-[0.6em] text-text-muted italic max-w-2xl leading-loose">
                    {" "}
                    {categories[activePage].desc}{" "}
                  </p>{" "}
                </div>{" "}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {" "}
                  {categories[activePage].skills.map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="p-8 bg-bg-primary border border-border rounded-[30px] flex items-center justify-between group hover:border-border-strong :border-border-strong transition-all cursor-default"
                    >
                      {" "}
                      <span className="text-sm font-black uppercase tracking-widest text-text-secondary group-hover:text-text-primary :text-text-primary transition-colors">
                        {" "}
                        {skill}{" "}
                      </span>{" "}
                      <div className="w-8 h-[1px] bg-bg-tertiary group-hover:w-16 transition-all" />{" "}
                    </motion.div>
                  ))}{" "}
                </div>{" "}
                {/* Progress Bar (Visual Only) */}{" "}
                <div className="pt-12 flex items-center gap-10">
                  {" "}
                  <div className="flex flex-col gap-2">
                    {" "}
                    <span className="text-[8px] font-black uppercase text-text-muted tracking-widest">
                      Mastery_Level
                    </span>{" "}
                    <div className="flex gap-1">
                      {" "}
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-6 h-1 rounded-full ${i < 4 ? "bg-fuchsia" : "bg-bg-tertiary "}`}
                        />
                      ))}{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="flex flex-col gap-2">
                    {" "}
                    <span className="text-[8px] font-black uppercase text-text-muted tracking-widest">
                      Efficiency
                    </span>{" "}
                    <span className="text-lg font-black text-text-primary italic">
                      0.02ms
                    </span>{" "}
                  </div>{" "}
                </div>{" "}
              </motion.div>{" "}
            </AnimatePresence>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
};
export default PaginatedSkills;
