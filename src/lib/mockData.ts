export const mockSiteSettings = {
  backgroundMedia: 'https://cdn.pixabay.com/video/2021/04/18/71337-538411036_large.mp4',
  backgroundType: 'video', // 'video' | 'image'
  bioText: `DJFORTKNOX is a Berlin-based artist bringing raw industrial strength to the dancefloor. 
A blend of deep pulsating basslines, metallic percussion, and relentless 140 BPM energy.
No compromises. No fake smiles. Just pure, unadulterated techno.`,
  contactEmail: 'booking@djfortknox.com',
  instagram: 'https://instagram.com/djfortknox',
  soundcloud: 'https://soundcloud.com/djfortknox'
};

export const mockAudioSets = [
  {
    id: 1,
    title: 'BERLIN UNDERGROUND SESSIONS VOL 1',
    // Using a sample audio file that works without CORS
    url: 'https://actions.google.com/sounds/v1/alarms/spaceship_alarm.ogg', 
    duration: '1:02:45',
    date: '2026-03-15'
  },
  {
    id: 2,
    title: 'WAREHOUSE RAVE 04 - THE STEEL WORKS',
    url: 'https://actions.google.com/sounds/v1/science_fiction/alien_breath.ogg',
    duration: '2:15:30',
    date: '2026-02-10'
  }
];

export const mockMedia = [
  { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?q=80&w=2076&auto=format&fit=crop' },
  { id: 2, type: 'image', url: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=2079&auto=format&fit=crop' },
  { id: 3, type: 'image', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1974&auto=format&fit=crop' },
  { id: 4, type: 'video', url: 'https://cdn.pixabay.com/video/2019/11/08/28905-373307525_large.mp4' },
];
