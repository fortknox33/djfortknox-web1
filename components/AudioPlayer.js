import { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'

export default function AudioPlayer({ audioUrl }) {
  const containerRef = useRef(null)
  const wavesurferRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    wavesurferRef.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor: '#4b5563',
      progressColor: '#00ffcc',
      cursorColor: 'transparent',
      barWidth: 2,
      barGap: 1,
      height: 48,
    })

    if (audioUrl) {
      wavesurferRef.current.load(audioUrl)
    }

    wavesurferRef.current.on('finish', () => setIsPlaying(false))

    return () => {
      wavesurferRef.current?.destroy()
    }
  }, [audioUrl])

  const togglePlay = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause()
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="flex items-center gap-4 bg-zinc-900 p-4 border border-zinc-800">
      <button 
        onClick={togglePlay}
        className="w-12 h-12 flex items-center justify-center bg-neon/10 border border-neon text-neon hover:bg-neon hover:text-black transition-colors cursor-pointer"
      >
        {isPlaying ? '⏸' : '▶'}
      </button>
      <div className="flex-1" ref={containerRef}></div>
    </div>
  )
}
