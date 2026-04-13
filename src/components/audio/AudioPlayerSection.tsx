'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Play, Pause, Disc3 } from 'lucide-react';
import { mockAudioSets } from '@/lib/mockData';

export default function AudioPlayerSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const waveformRef = useRef<HTMLDivElement>(null);
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSetId, setActiveSetId] = useState<number | null>(null);
  
  const activeSet = useMemo(() => mockAudioSets.find(s => s.id === activeSetId) || null, [activeSetId]);

  useEffect(() => {
    if (!waveformRef.current) return;

    const ws = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#333333',
      progressColor: '#ffffff',
      cursorColor: '#ff3300',
      barWidth: 2,
      barGap: 1,
      barRadius: 2,
      height: 80,
      normalize: true,
    });

    ws.on('play', () => setIsPlaying(true));
    ws.on('pause', () => setIsPlaying(false));
    ws.on('finish', () => setIsPlaying(false));

    setWavesurfer(ws);

    return () => {
      ws.destroy();
    };
  }, []);

  useEffect(() => {
    if (wavesurfer && activeSet) {
      wavesurfer.load(activeSet.url);
      wavesurfer.on('ready', () => {
        wavesurfer.play();
      });
    }
  }, [activeSet, wavesurfer]);

  const togglePlay = () => {
    if (wavesurfer) {
      wavesurfer.playPause();
    }
  };

  const handleSetClick = (id: number) => {
    if (activeSetId === id) {
      togglePlay();
    } else {
      setActiveSetId(id);
    }
  };

  return (
    <section className="w-full py-24 bg-[#050505] relative z-10" ref={containerRef}>
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/20 pb-4">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">SETS / TRANSMISSIONS</h2>
        </div>

        <div className="flex flex-col gap-4">
          {mockAudioSets.map((set) => {
            const isActive = activeSetId === set.id;
            return (
              <div 
                key={set.id}
                className={`group flex items-center p-4 border border-white/10 transition-all cursor-pointer hover:bg-white/5 ${isActive ? 'bg-white/10 border-white/30' : 'bg-black'}`}
                onClick={() => handleSetClick(set.id)}
              >
                <div className="w-16 h-16 bg-white/5 flex items-center justify-center mr-6 shrink-0">
                  {isActive && isPlaying ? <Pause className="w-8 h-8 text-accent" /> : <Play className="w-8 h-8 text-white group-hover:text-accent transition-colors" />}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-xl font-bold truncate pr-4">{set.title}</h3>
                    <span className="text-sm font-mono text-white/50 shrink-0">{set.duration}</span>
                  </div>
                  <div className="text-xs font-mono text-white/40">{set.date}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Player View that anchors to bottom of this section */}
        <div className={`mt-12 p-8 border border-white/20 bg-black/80 backdrop-blur-md transition-all duration-500 origin-top transform ${activeSet ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 h-0 overflow-hidden py-0 my-0 border-0'}`}>
           <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-4">
               <Disc3 className={`w-8 h-8 text-accent ${isPlaying ? 'animate-[spin_3s_linear_infinite]' : ''}`} />
               <span className="font-bold text-xl">{activeSet?.title}</span>
             </div>
             <button onClick={togglePlay} className="p-3 bg-white text-black hover:bg-accent hover:text-white transition-colors brutalist-border">
               {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
             </button>
           </div>
           
           <div className="w-full bg-white/5 p-2 border border-white/10">
             <div ref={waveformRef} className="w-full" />
           </div>
        </div>
      </div>
    </section>
  );
}
