'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { mockSiteSettings } from '@/lib/mockData';

export default function Biography() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!textRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Simple fade up reveal for the whole text block to avoid performance heavy word-by-word splits unless needed
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "top 30%",
          scrub: 1,
        },
        y: 50,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full min-h-[50vh] py-32 flex items-center justify-center bg-black/80 backdrop-blur-sm border-y border-white/10">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-sm font-mono tracking-[0.4em] text-accent mb-8">/// IDENTITY</h2>
        <p 
          ref={textRef}
          className="text-2xl md:text-5xl font-bold leading-tight md:leading-snug text-white/90"
        >
          {mockSiteSettings.bioText}
        </p>
      </div>
    </section>
  );
}
