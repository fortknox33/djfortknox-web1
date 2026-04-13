import Head from 'next/head'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import AudioPlayer from '../components/AudioPlayer'
import { supabase } from '../lib/supabaseClient'

export async function getServerSideProps() {
  const { data: tracks } = await supabase.from('tracks').select('*').order('created_at', { ascending: false })
  const { data: videos } = await supabase.from('videos').select('*').order('created_at', { ascending: false })
  
  return {
    props: {
      tracks: tracks || [],
      videos: videos || []
    }
  }
}

export default function Home({ tracks, videos }) {
  const titleRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
    )
  }, [])

  return (
    <div className="min-h-screen font-sans selection:bg-neon selection:text-black pb-20">
      <Head>
        <title>DJFORTKNOX</title>
      </Head>
      
      <div className="noise-overlay"></div>

      <main className="relative z-10 container mx-auto px-4 py-20 max-w-4xl text-zinc-300">
        <header className="mb-20 text-center">
          <h1 ref={titleRef} className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-4">
            DJFORTKNOX
          </h1>
          <p className="text-neon tracking-widest text-sm uppercase">Digital Fortress</p>
        </header>

        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8 uppercase tracking-widest border-l-4 border-neon pl-4">Latest Tracks</h2>
          <div className="space-y-6">
            {tracks.length > 0 ? tracks.map(track => (
              <div key={track.id} className="group">
                <h3 className="text-lg mb-2 text-white group-hover:text-neon transition-colors">{track.title}</h3>
                <AudioPlayer audioUrl={track.url} />
              </div>
            )) : (
              <p className="text-zinc-600">No tracks available yet.</p>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-8 uppercase tracking-widest border-l-4 border-darkRed pl-4">Visuals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videos.length > 0 ? videos.map(video => (
              <div key={video.id} className="aspect-video bg-zinc-900 border border-zinc-800">
                <iframe 
                  src={video.embed_url} 
                  className="w-full h-full"
                  allowFullScreen
                ></iframe>
              </div>
            )) : (
              <p className="text-zinc-600">No visuals available yet.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
