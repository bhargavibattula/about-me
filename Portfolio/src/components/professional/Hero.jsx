import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import Hyperspeed from './Hyperspeed';

const Hero = () => {
    // Parallax mouse tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 20;
            const y = (clientY / window.innerHeight - 0.5) * 20;
            mouseX.set(x);
            mouseY.set(y);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="min-h-screen relative flex items-center justify-center p-8 md:p-24 overflow-hidden bg-[#030412] font-sans">
            {/* Background Hyperspeed Field */}
            <motion.div style={{ x: springX, y: springY }} className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
                    <Hyperspeed
                        effectOptions={{
                            onSpeedUp: () => { },
                            onSlowDown: () => { },
                            distortion: 'turbulentDistortion',
                            length: 400,
                            roadWidth: 10,
                            islandWidth: 2,
                            lanesPerRoad: 3,
                            fov: 90,
                            fovSpeedUp: 150,
                            speedUp: 2,
                            carLightsFade: 0.4,
                            totalSideLightSticks: 20,
                            lightPairsPerRoadWay: 40,
                            shoulderLinesWidthPercentage: 0.05,
                            brokenLinesWidthPercentage: 0.1,
                            brokenLinesLengthPercentage: 0.5,
                            lightStickWidth: [0.12, 0.5],
                            lightStickHeight: [1.3, 1.7],
                            movingAwaySpeed: [60, 80],
                            movingCloserSpeed: [-120, -160],
                            carLightsLength: [400 * 0.03, 400 * 0.2],
                            carLightsRadius: [0.05, 0.14],
                            carWidthPercentage: [0.3, 0.5],
                            carShiftX: [-0.8, 0.8],
                            carFloorSeparation: [0, 5],
                            colors: {
                                roadColor: 0x030412,
                                islandColor: 0x030412,
                                background: 0x030412,
                                shoulderLines: 0x1a2b3c,
                                brokenLines: 0x1a2b3c,
                                leftCars: [0x57db96, 0x4169e1, 0x8df5c2],
                                rightCars: [0x4169e1, 0x57db96, 0x8da1f5],
                                sticks: 0x57db96,
                            }
                        }}
                    />
                </div>
                
                {/* Premium Gradient Overlays */}
                <div className="absolute top-0 left-0 w-full h-[30%] bg-gradient-to-b from-[#030412] to-transparent z-0" />
                <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-[#030412] to-transparent z-0" />
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-royal/10 blur-[150px] rounded-full opacity-40 pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-mint/10 blur-[150px] rounded-full opacity-40 pointer-events-none" />
            </motion.div>

            <div className="container mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full">
                {/* Left Column: Content */}
                <motion.div
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="col-span-1 lg:col-span-7 flex flex-col items-start w-full"
                >
                    {/* Status Badge */}
                    <div className="mb-10 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center gap-3 shadow-xl hover:bg-white/10 transition-colors w-fit">
                        <div className="w-2 h-2 rounded-full bg-mint animate-pulse shadow-[0_0_12px_#57db96]" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">Available // 2026</span>
                    </div>

                    {/* Premium Typography */}
                    <div className="space-y-2 mb-8">
                        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] text-white drop-shadow-lg">
                            BHARGAVI
                        </h1>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-mint to-royal italic drop-shadow-lg pr-4">
                            BATTULA.
                        </h1>
                    </div>

                    {/* Elegant Subtitle */}
                    <div className="pl-4 border-l-2 border-mint/50 mb-8">
                        <h3 className="text-base md:text-xl font-semibold tracking-[0.2em] uppercase text-white/80">
                            Full-Stack Developer <span className="text-royal mx-2 font-black">✦</span> AI Engineer
                        </h3>
                    </div>

                    {/* Refined Bio */}
                    <div className="max-w-xl mb-12">
                        <p className="text-sm md:text-lg text-white/50 font-light leading-relaxed tracking-wide">
                            Full-stack software engineer with experience building production-grade systems across <span className="text-white/90 font-medium">government platforms</span>, <span className="text-mint/90 font-medium">AI-integrated applications</span>, and autonomous multi-agent pipelines. Proficient in Java, MERN stack, and Agentic AI, with a track record of delivering impactful solutions by integrating AI into real-world products. Skilled in REST APIs, and backend architecture. <span className="text-royal font-medium">4x Hackathon Winner.</span>
                        </p>
                    </div>

                    {/* Ultra-premium CTAs */}
                    <div className="flex flex-wrap items-center gap-5">
                        <motion.a
                            href="https://drive.google.com/file/d/1pxrIHfK7MBrLd27p3Yd6dYcQMydDJKHY/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-8 py-4 bg-white text-black font-bold uppercase text-[11px] tracking-[0.2em] rounded-full hover:bg-mint transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(87,219,150,0.3)]"
                        >
                            View Dossier
                        </motion.a>
                        <motion.button
                            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
                            whileTap={{ scale: 0.98 }}
                            className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold uppercase text-[11px] tracking-[0.2em] rounded-full hover:border-white/50 transition-all duration-300 backdrop-blur-md"
                        >
                            Explore Arena
                        </motion.button>
                    </div>
                </motion.div>
                
                {/* Right Column: Can be left empty for the Hyperspeed background to shine, or add decorative elements */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="hidden lg:flex col-span-5 items-center justify-end pointer-events-none"
                >
                    {/* A subtle abstract geometric accent to balance the left text */}
                    <div className="relative w-full aspect-square opacity-20">
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[1px] bg-gradient-to-r from-transparent via-mint to-transparent rotate-45" />
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[1px] bg-gradient-to-r from-transparent via-royal to-transparent -rotate-45" />
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/20 rounded-full animate-[spin_10s_linear_infinite]" />
                    </div>
                </motion.div>
            </div>
            
            {/* Subtle Background Text */}
            <div className="absolute bottom-8 right-12 opacity-[0.02] pointer-events-none hidden md:block">
                <span className="text-[120px] font-black uppercase tracking-tighter leading-none select-none">NODE // 01</span>
            </div>
        </section>
    );
};

export default Hero;
