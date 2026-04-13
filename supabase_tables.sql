-- 1. Tabellen erstellen
CREATE TABLE public.tracks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  title text NOT NULL,
  url text NOT NULL
);

CREATE TABLE public.videos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  title text,
  embed_url text NOT NULL
);

CREATE TABLE public.images (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  title text,
  url text NOT NULL
);

-- 2. Row Level Security aktivieren
ALTER TABLE public.tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.images ENABLE ROW LEVEL SECURITY;

-- 3. Öffentlicher Lesezugriff
CREATE POLICY "Public profiles are viewable by everyone." ON public.tracks FOR SELECT USING (true);
CREATE POLICY "Public profiles are viewable by everyone." ON public.videos FOR SELECT USING (true);
CREATE POLICY "Public profiles are viewable by everyone." ON public.images FOR SELECT USING (true);

-- 4. Admin Schreibzugriff (benötigt Authentifizierung)
CREATE POLICY "Users can insert tracks." ON public.tracks FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can insert videos." ON public.videos FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can insert images." ON public.images FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 5. Storage Bucket erstellen ('media')
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

-- Storage Policies
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Auth Insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');
