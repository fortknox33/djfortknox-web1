import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import Head from 'next/head'

export default function Admin() {
  const [session, setSession] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    
    return () => subscription.unsubscribe()
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file || !title) return alert('Bitte Titel und Datei angeben')
    
    setUploading(true)
    const fileName = `${Date.now()}-${file.name}`
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('media')
      .upload(`audio/${fileName}`, file)

    if (uploadError) {
      alert(uploadError.message)
      setUploading(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(`audio/${fileName}`)

    const { error: dbError } = await supabase.from('tracks').insert([
      { title: title, url: publicUrl }
    ])

    if (dbError) alert(dbError.message)
    else {
      alert('Upload erfolgreich!')
      setTitle('')
      setFile(null)
    }
    setUploading(false)
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-zinc-900 border border-zinc-800 p-8 w-full max-w-sm">
          <h1 className="text-2xl text-white font-bold mb-6 text-center uppercase tracking-widest">Admin Login</h1>
          <input className="w-full bg-black border border-zinc-700 text-white p-3 mb-4 focus:border-neon outline-none" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input className="w-full bg-black border border-zinc-700 text-white p-3 mb-6 focus:border-neon outline-none" type="password" placeholder="Passwort" value={password} onChange={e => setPassword(e.target.value)} required />
          <button className="w-full bg-neon text-black font-bold p-3 uppercase hover:bg-white transition-colors cursor-pointer" type="submit">Login</button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen text-zinc-300 p-8">
      <Head><title>Admin - DJFORTKNOX</title></Head>
      <div className="max-w-2xl mx-auto">
        <header className="flex justify-between items-center mb-12 border-b border-zinc-800 pb-4">
          <h1 className="text-3xl font-bold text-white uppercase tracking-widest">Dashboard</h1>
          <button onClick={() => supabase.auth.signOut()} className="text-sm border border-zinc-700 px-4 py-2 hover:bg-zinc-800 cursor-pointer">Logout</button>
        </header>

        <div className="bg-zinc-900 border border-zinc-800 p-6">
          <h2 className="text-xl text-white mb-6 uppercase border-l-4 border-neon pl-4">Neuer Track</h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-500 mb-2 uppercase">Track Titel</label>
              <input type="text" className="w-full bg-black border border-zinc-700 p-3 text-white focus:border-neon outline-none" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm text-zinc-500 mb-2 uppercase">Audio Datei (.mp3, .wav)</label>
              <input type="file" accept="audio/*" className="w-full bg-black border border-zinc-700 p-3 text-zinc-400 file:bg-zinc-800 file:text-white file:border-0 file:px-4 file:py-2 file:mr-4 hover:file:bg-zinc-700 cursor-pointer" onChange={e => setFile(e.target.files[0])} required />
            </div>
            <button disabled={uploading} className="bg-neon text-black font-bold px-6 py-3 uppercase hover:bg-white transition-colors disabled:opacity-50 cursor-pointer" type="submit">
              {uploading ? 'Lädt hoch...' : 'Track hochladen'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
