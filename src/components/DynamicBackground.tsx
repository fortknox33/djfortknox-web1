'use client';

import { useEffect, useState } from 'react';
import { mockSiteSettings } from '@/lib/mockData';

export default function DynamicBackground() {
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaType, setMediaType] = useState('');

  useEffect(() => {
    // In a real app we would load this from Supabase
    // const { data } = await supabase.from('site_settings').select('*').single();
    setMediaUrl(mockSiteSettings.backgroundMedia);
    setMediaType(mockSiteSettings.backgroundType);
  }, []);

  if (!mediaUrl) return <div className="fixed inset-0 bg-background -z-50" />;

  return (
    <>
      <div className="fixed inset-0 w-full h-full -z-50 overflow-hidden bg-background">
        {mediaType === 'video' ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute min-w-full min-h-full object-cover opacity-40 grayscale"
            src={mediaUrl}
          />
        ) : (
             <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 grayscale" 
          style={{ backgroundImage: `url(${mediaUrl})` }} 
        />
        )}
      </div>

      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none -z-40 opacity-[0.15]" 
           style={{ 
             backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)',
             backgroundSize: '100% 4px' 
           }} 
      />
      {/* Vignette Overlay */}
      <div className="fixed inset-0 pointer-events-none -z-40 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
    </>
  );
}
