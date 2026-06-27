import React from "react";
import { TbShieldHalf, TbBrain, TbHeartPlus } from "react-icons/tb";

export const hackathonProjects = [
  {
    id: "deepfake",
    name: "Deep Fake Detector",
    date: "Ongoing",
    tech: ["Flask", "TensorFlow", "React", "TypeScript"],
    brief: "A lightweight, secure browser extension that performs real-time frame analysis and audio checks to identify manipulated synthetic media and deep fakes on active web players.",
    icon: <TbShieldHalf className="w-6 h-6 text-mint" />,
    iconColor: "from-mint/20 to-royal/10 border-mint/30",
    image: "/assets/projects/deepfake_detector.png",
    github: "https://github.com/bhargavibattula/deepfake-detector", // Add actual links later
    demo: "#"
  },
  {
    id: "nexus",
    name: "Nexus AI",
    date: "Feb 2026",
    tech: ["Next.js", "FastAPI", "Celery", "LangGraph", "PostgreSQL"],
    brief: "An autonomous multi-agent platform that generates, tests, and deploys production-grade code with fault-tolerant orchestration across full CI/CD lifecycles.",
    icon: <TbBrain className="w-6 h-6 text-mint" />,
    iconColor: "from-mint/20 to-royal/10 border-mint/30",
    image: "/assets/projects/nexus_ai.png",
    github: "https://github.com/bhargavibattula/nexus-ai",
    demo: "#"
  },
  {
    id: "healverse",
    name: "HealVerse",
    date: "Aug 2025",
    tech: ["Java", "Spring Boot", "React Native", "PostgreSQL"],
    brief: "A patient-centric health ecosystem integrating AI diet recommendations, encrypted EHR logs, and conversational voice bots for HIPAA-compliant consultations.",
    icon: <TbHeartPlus className="w-6 h-6 text-mint" />,
    iconColor: "from-mint/20 to-royal/10 border-mint/30",
    image: "/assets/projects/healverse.png",
    github: "https://github.com/bhargavibattula/healverse",
    demo: "#"
  }
];
