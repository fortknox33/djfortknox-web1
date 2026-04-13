import DynamicBackground from '@/components/DynamicBackground';
import Hero from '@/components/hero/Hero';
import AudioPlayerSection from '@/components/audio/AudioPlayerSection';
import Biography from '@/components/bio/Biography';
import MediaWall from '@/components/media/MediaWall';
import BookingSection from '@/components/booking/BookingSection';

export default function Home() {
  return (
    <main className="min-h-screen relative w-full overflow-x-hidden selection:bg-accent selection:text-white">
      <DynamicBackground />
      
      {/* Content overlays the fixed background */}
      <div className="relative z-10">
        <Hero />
        <Biography />
        <AudioPlayerSection />
        <MediaWall />
        <BookingSection />
      </div>
    </main>
  );
}
