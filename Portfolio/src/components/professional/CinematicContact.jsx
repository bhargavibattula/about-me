import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CinematicContact = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const lineRef = useRef(null);
  const squareRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=2500',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      // Subtle, elegant object animation using their theme colors
      tl.to(squareRef.current, { rotation: 360, x: '-20vw', y: '10vh', scale: 1.5, ease: 'none' }, 0);
      tl.to(circleRef.current, { rotation: -360, x: '20vw', y: '-10vh', scale: 0.8, ease: 'none' }, 0);
      
      // Massive text scrolling horizontally based on its actual width
      tl.fromTo(textRef.current, 
        { x: '100vw' },
        { x: () => window.innerWidth - textRef.current.scrollWidth - window.innerWidth * 0.1, ease: 'none' },
        0
      );
      
      // Line draws itself gracefully like a progress bar
      tl.fromTo(lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', transformOrigin: 'left center' },
        0
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="h-screen w-full bg-bg-primary overflow-hidden relative z-10 flex flex-col justify-center">
      
      {/* Background Objects - Clean Theme Integration */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div ref={squareRef} className="absolute w-[30vw] h-[30vw] md:w-96 md:h-96 border-[1px] border-border-strong rounded-[3rem] transform will-change-transform opacity-40"></div>
        <div ref={circleRef} className="absolute w-[40vw] h-[40vw] md:w-[30rem] md:h-[30rem] border-[1px] border-accent rounded-full will-change-transform opacity-30"></div>
        {/* Soft fade overlay to keep text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-primary/50 to-bg-primary backdrop-blur-[1px]"></div>
      </div>

      <div className="relative z-10 w-full flex flex-col items-start justify-center">
        
        {/* Massive Typography - Outline & Filled interplay */}
        <div ref={textRef} className="flex items-center whitespace-nowrap will-change-transform py-[10vw] w-max">
          <h2 className="text-[20vw] md:text-[15vw] leading-normal font-black tracking-tighter uppercase flex gap-6 md:gap-12 items-center w-max pl-[10vw]">
            
            <span className="text-text-primary leading-none py-4 flex-shrink-0">Let's</span>
            
            <span className="text-transparent leading-none py-4 flex-shrink-0" style={{ WebkitTextStroke: '2px var(--color-text-primary)' }}>Create</span>
            
            <span className="inline-block bg-accent text-accent-text px-[5vw] py-[2vw] rounded-[4rem] transform -rotate-3 text-[15vw] md:text-[10vw] shadow-lg leading-none flex-shrink-0">
              Impactful
            </span>
            
            <span className="text-text-primary leading-none py-4 flex-shrink-0">Products</span>
            
            <span className="inline-block w-6 h-6 md:w-12 md:h-12 rounded-full bg-accent mx-4 md:mx-8 flex-shrink-0"></span>
            
            <span className="text-transparent leading-none py-4 flex-shrink-0" style={{ WebkitTextStroke: '2px var(--color-text-primary)' }}>Have an idea?</span>
            
            <span className="text-text-primary leading-none py-4 flex-shrink-0">Let's Collaborate</span>
            
            <a href="#contact" className="ml-12 md:ml-24 text-[8vw] md:text-[5vw] tracking-normal px-12 py-6 border-4 border-accent rounded-full text-text-primary hover:bg-accent hover:text-accent-text transition-all duration-300 cursor-pointer pointer-events-auto leading-none flex items-center flex-shrink-0">
              CONTACT ME
            </a>
            
          </h2>
        </div>
        
        {/* Decorative Progress Line */}
        <div className="w-[80vw] mx-auto mt-12 md:mt-24 h-[2px] bg-border relative overflow-hidden">
          <div ref={lineRef} className="absolute top-0 left-0 w-full h-full bg-accent will-change-transform"></div>
        </div>

      </div>
    </section>
  );
};

export default CinematicContact;
