'use client';

import { useSearchParams } from 'next/navigation';
import { login } from './actions';
import DynamicBackground from '@/components/DynamicBackground';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const formRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Subtle pulse for the "locked" status
      gsap.to('.lock-icon', {
        opacity: 0.5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen relative flex items-center justify-center p-4">
      <DynamicBackground />
      
      {/* Background Grid Pattern Overlay */}
      <div className="fixed inset-0 pointer-events-none -z-30 opacity-20"
           style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div ref={formRef} className="w-full max-w-md z-10">
        <div className="bg-black/80 backdrop-blur-xl border border-white/10 p-8 brutalist-shadow">
          <div className="mb-8 flex flex-col items-center">
            <div className="lock-icon w-12 h-12 mb-4 border-2 border-accent flex items-center justify-center">
              <span className="text-accent text-2xl font-mono">!</span>
            </div>
            <h1 className="text-3xl font-black tracking-widest text-white uppercase italic">
              Access_Denied
            </h1>
            <p className="text-xs font-mono text-white/40 mt-2 uppercase tracking-widest">
              SYSTEM_AUTH_REQUIRED
            </p>
          </div>

          <form action={login} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-[10px] font-mono text-white/50 uppercase tracking-widest mb-2">
                User_ID (Email)
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full bg-white/5 border border-white/10 p-3 text-white font-mono focus:outline-none focus:border-accent transition-colors"
                placeholder="ADMIN@DJFORTKNOX.DE"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-[10px] font-mono text-white/50 uppercase tracking-widest mb-2">
                Pass_Key
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full bg-white/5 border border-white/10 p-3 text-white font-mono focus:outline-none focus:border-accent transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-accent/10 border border-accent/30 p-3 flex items-center gap-3">
                <div className="w-2 h-2 bg-accent animate-ping rounded-full" />
                <p className="text-[10px] font-mono text-accent uppercase tracking-wider">
                  AUTH_ERROR: {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full brutalist-button py-4 text-sm font-black tracking-[0.2em]"
            >
              INITIALIZE_LINK
            </button>
          </form>

          <div className="mt-12 pt-6 border-t border-white/5 text-center">
             <p className="text-[9px] font-mono text-white/20 uppercase tracking-[0.3em]">
               Fortress_Protocol_v3.2 // Secured_By_Supabase
             </p>
          </div>
        </div>
      </div>
    </main>
  );
}
