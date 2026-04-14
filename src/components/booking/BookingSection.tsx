'use client';

import { FormEvent, useState } from 'react';
import { Mail, Radio, Speaker } from 'lucide-react';
import { mockSiteSettings } from '@/lib/mockData';

export default function BookingSection() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <section className="w-full min-h-[80vh] bg-foreground text-background flex flex-col justify-between relative z-10">
      <div className="flex-1 flex flex-col md:flex-row w-full">
        {/* Contact Form */}
        <div className="w-full md:w-1/2 p-12 md:p-24 border-b md:border-b-0 md:border-r border-background/20 flex flex-col justify-center">
          <h2 className="text-5xl font-black mb-12">TRANSMIT_</h2>
          
          {status === 'success' ? (
            <div className="bg-background text-foreground p-8 border border-accent animate-pulse font-mono">
              <span className="text-accent">SUCCESS:</span> TRANSMISSION RECEIVED.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 font-mono">
              <div>
                <label className="block text-sm font-bold mb-2">IDENTIFICATION [NAME]</label>
                <input 
                  required 
                  type="text" 
                  className="w-full bg-transparent border-b-2 border-background/50 focus:border-background p-2 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">SECURE COMMS [EMAIL]</label>
                <input 
                  required 
                  type="email" 
                  className="w-full bg-transparent border-b-2 border-background/50 focus:border-background p-2 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">ENCRYPTED MESSAGE</label>
                <textarea 
                  required 
                  rows={4}
                  className="w-full bg-transparent border-b-2 border-background/50 focus:border-background p-2 outline-none transition-colors resize-none"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={status === 'sending'}
                className="w-full bg-background text-foreground py-4 font-black tracking-[0.2em] hover:bg-accent hover:text-white transition-colors"
              >
                {status === 'sending' ? 'TRANSMITTING...' : 'INITIATE CONTACT'}
              </button>
            </form>
          )}
        </div>

        {/* Big Social Links */}
        <div className="w-full md:w-1/2 flex flex-col">
          <a href={mockSiteSettings.instagram} target="_blank" rel="noreferrer" className="flex-1 flex flex-col items-center justify-center border-b border-background/20 hover:bg-background hover:text-foreground transition-all group p-12">
            <Radio className="w-24 h-24 mb-4 group-hover:scale-110 transition-transform" />
            <span className="text-2xl font-black tracking-widest">INSTAGRAM</span>
          </a>
          <a href={mockSiteSettings.soundcloud} target="_blank" rel="noreferrer" className="flex-1 flex flex-col items-center justify-center hover:bg-background hover:text-foreground transition-all group p-12">
            <Speaker className="w-24 h-24 mb-4 group-hover:scale-110 transition-transform" />
            <span className="text-2xl font-black tracking-widest">SOUNDCLOUD</span>
          </a>
        </div>
      </div>
      
      {/* Footer Bar */}
      <footer className="w-full py-6 px-12 bg-black text-white flex justify-between items-center font-mono text-xs text-white/50">
        <span>© {new Date().getFullYear()} DJFORTKNOX</span>
        <span>BERLIN UNDERGROUND</span>
      </footer>
    </section>
  );
}
