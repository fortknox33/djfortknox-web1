'use client';

import { useState } from 'react';
import { Save, UploadCloud } from 'lucide-react';
import { mockSiteSettings } from '@/lib/mockData';

export default function AdminDashboard() {
  const [bio, setBio] = useState(mockSiteSettings.bioText);
  const [email, setEmail] = useState(mockSiteSettings.contactEmail);
  const [bgUrl, setBgUrl] = useState(mockSiteSettings.backgroundMedia);
  const [status, setStatus] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('SAVING...');
    setTimeout(() => {
      setStatus('DATA SECURED. CHANGES LIVE.');
      setTimeout(() => setStatus(''), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <header className="border-b border-white/20 pb-6">
        <h1 className="text-4xl font-black">CONTROL PANEL</h1>
        <p className="text-white/50 font-mono mt-2">Manage visual and audio assets without code deployments.</p>
      </header>

      {status && (
        <div className="bg-accent/20 border border-accent text-accent p-4 font-mono select-none">
          {status}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-12">
        {/* MEDIA SECTION */}
        <section className="space-y-6">
          <h3 className="font-mono text-xl border-b border-white/10 pb-2 flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-accent" />
            BACKGROUND ASSETS
          </h3>
          <div className="grid gap-4 bg-white/5 p-6 brutalist-border">
            <div>
              <label className="block text-sm font-bold mb-2">BACKGROUND MEDIA URL</label>
              <input 
                value={bgUrl}
                onChange={(e) => setBgUrl(e.target.value)}
                className="w-full bg-black border border-white/20 p-3 font-mono text-sm focus:border-accent outline-none"
              />
              <p className="text-xs text-white/40 mt-2">Provide a heavy MP4 or JPG link. Real app will allow direct raw file uploads to Supabase Storage.</p>
            </div>
          </div>
        </section>

        {/* CONTENT SECTION */}
        <section className="space-y-6">
          <h3 className="font-mono text-xl border-b border-white/10 pb-2">TEXT & IDENTITIES</h3>
          <div className="grid gap-6 bg-white/5 p-6 brutalist-border">
            <div>
              <label className="block text-sm font-bold mb-2">BIOGRAPHY</label>
              <textarea 
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={6}
                className="w-full bg-black border border-white/20 p-3 font-mono text-sm focus:border-accent outline-none resize-y"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">CONTACT EMAIL</label>
              <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-white/20 p-3 font-mono text-sm focus:border-accent outline-none"
              />
            </div>
          </div>
        </section>

        {/* AUDIO SECTION - PREVIEW ONLY FOR NOW */}
         <section className="space-y-6">
          <h3 className="font-mono text-xl border-b border-white/10 pb-2">AUDIO SETS (COMING SOON)</h3>
          <div className="bg-white/5 p-6 brutalist-border opacity-50 cursor-not-allowed">
            <p className="font-mono text-sm">Direct Audio Upload to Supabase Storage requires Anon Key configuration. Waiting for integration.</p>
          </div>
         </section>

        <button type="submit" className="flex items-center justify-center gap-2 w-full bg-white text-black py-4 font-bold tracking-widest hover:bg-accent hover:text-white transition-colors brutalist-border">
          <Save className="w-5 h-5" />
          DEPLOY CHANGES
        </button>
      </form>
      
    </div>
  );
}
