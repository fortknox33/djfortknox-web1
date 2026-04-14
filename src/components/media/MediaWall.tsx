'use client';

import { mockMedia } from '@/lib/mockData';

export default function MediaWall() {
  return (
    <section className="w-full py-24 bg-black border-y border-white/10 relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="text-4xl md:text-6xl font-black mb-16 underline decoration-accent underline-offset-8">VISUALS</h2>
        
        {/* Simple CSS Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {mockMedia.map((media) => (
            <div key={media.id} className="break-inside-avoid relative group overflow-hidden brutalist-border bg-white/5">
              {media.type === 'image' ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={media.url} 
                  alt="DJFORTKNOX Event" 
                  className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="relative pt-[120%] bg-black">
                   <video 
                     className="absolute top-0 left-0 w-full h-full object-cover grayscale mix-blend-screen opacity-80"
                     src={media.url}
                     autoPlay
                     loop
                     muted
                     playsInline
                   />
                </div>
              )}
              
              <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
