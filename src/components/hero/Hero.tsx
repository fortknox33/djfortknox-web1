'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Split text for animation or just animate the whole block
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.2
      });
      
      // Industrial subtle shake/glitch effect
      gsap.to(textRef.current, {
        x: () => Math.random() * 4 - 2,
        y: () => Math.random() * 4 - 2,
        duration: 0.1,
        repeat: -1,
        yoyo: true,
        ease: "none",
        delay: 2
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <h1 
        ref={textRef}
        className="text-[12vw] font-black leading-none tracking-tighter text-transparent bg-clip-text"
        style={{ 
          WebkitTextStroke: '2px #ffffff',
          backgroundImage: 'linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,0) 100%)',
          backgroundPosition: '0 0',
          backgroundRepeat: 'no-repeat',
          WebkitBackgroundClip: 'text'
        }}
      >
        DJFORTKNOX
      </h1>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
         <span className="text-xs font-mono tracking-[0.3em] text-muted-foreground animate-pulse">
           SCROLL TO DESCEND
         </span>
         <div className="w-[1px] h-12 bg-white/50" />
      </div>
    </section>
  );
}
