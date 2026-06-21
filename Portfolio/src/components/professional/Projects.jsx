import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import BorderGlow from './BorderGlow';

const Projects = () => {
    const projects = [
        { 
            id: 'tms', 
            name: 'Gov Training Platform', 
            date: 'Ongoing', 
            tech: ['MongoDB', 'Express', 'React', 'Node.js', 'Cloudinary'], 
            brief: [
                'Designed a role-based TMS with RBAC across 4 admin tiers (Super, State, District, Venue) to manage training programs across states, districts, mandals, and venues.',
                'Built modules for attendance tracking, venue management, food management, photo management, and report generation.',
                'Implemented audit logs for tracking admin actions; integrated Cloudinary for scalable image management with a loosely coupled modular architecture.'
            ], 
            icon: '🏛️' 
        },
        { 
            id: 'nexus', 
            name: 'NEXUS AI', 
            date: 'Feb 2026', 
            tech: ['Next.js', 'TypeScript', 'FastAPI', 'Celery', 'LangGraph', 'PostgreSQL'], 
            brief: [
                'Built an autonomous multi-agent platform that generates, tests, and deploys production-ready code from a single prompt.',
                'Achieved fault-tolerant orchestration with Celery distributed queues across full CI/CD lifecycle.',
                '(Award: Outstanding Implementation 2026)'
            ], 
            icon: '🤖' 
        },
        { 
            id: 'healverse', 
            name: 'HealVerse', 
            date: 'Aug 2025', 
            tech: ['Java', 'Spring Boot', 'React Native', 'TypeScript', 'PostgreSQL'], 
            brief: [
                'Patient-centric mobile app with AI-driven diet recommendations, medication reminders, and real-time health dashboards; integrated a text chatbot and voice bot for conversational health queries.',
                'REST APIs via Spring Boot + Hibernate ORM with RBAC and multi-user persistence.',
                '(HealVerse Hackathon Winner 2026)'
            ], 
            icon: '🏥' 
        }
    ];

    return (
        <section id="projects" className="py-32 px-8 overflow-hidden bg-[#030412]">
            <div className="container mx-auto max-w-6xl">
                <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="mb-20">
                    <span className="text-xs font-black uppercase tracking-[0.8em] text-mint mb-4 block">System Outputs // Projects</span>
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic">Technical <br /> <span className="text-primary-foreground/20 text-white/10 stroke-white/10">Showcase</span></h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {projects.map((p, i) => (
                        <motion.div 
                            key={p.id} 
                            initial={{ y: 50, opacity: 0 }} 
                            whileInView={{ y: 0, opacity: 1 }} 
                            viewport={{ once: true }} 
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="h-full group"
                        >
                            <BorderGlow 
                                className="w-full h-full"
                                backgroundColor="#030412"
                                glowColor="150 65 60"
                                colors={['#57db96', '#4169e1', '#c084fc']}
                                borderRadius={40}
                                glowRadius={30}
                                animated={true}
                                fillOpacity={0.05}
                            >
                                <div className="p-10 cursor-pointer relative overflow-hidden h-full flex flex-col justify-between">
                                    <div>
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-mint/5 blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform" />
                                        <div className="flex justify-between items-start mb-12">
                                            <span className="text-4xl">{p.icon}</span>
                                            <span className="text-[10px] font-bold text-mint uppercase font-mono tracking-[0.4em]">{p.date}</span>
                                        </div>
                                        <h3 className="text-3xl font-black uppercase tracking-widest text-white mb-4 group-hover:text-mint transition-colors">{p.name}</h3>
                                        <div className="text-sm text-white/40 leading-relaxed font-light mb-10 group-hover:text-white/60 transition-colors tracking-wide space-y-2">
                                            {Array.isArray(p.brief) ? (
                                                <ul className="list-disc pl-4 space-y-2">
                                                    {p.brief.map((point, index) => (
                                                        <li key={index}>{point}</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p>{p.brief}</p>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap gap-3 mb-12">
                                            {p.tech.map(t => (
                                                <span key={t} className="text-[8px] font-black uppercase px-4 py-2 border border-white/5 rounded-full bg-white/5 group-hover:border-white/10">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <span className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.4em] text-white/30 group-hover:text-white transition-all transform group-hover:translate-x-2 mt-auto">Decrypted View ➔</span>
                                </div>
                            </BorderGlow>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
