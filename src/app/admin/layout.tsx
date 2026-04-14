import Link from 'next/link';
import { logout } from '../login/actions';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-[#0a0a0a] border-r border-white/10 p-6 flex flex-col">
        <div className="mb-12">
          <h2 className="text-xl font-black tracking-widest text-accent">FORT_KNOX</h2>
          <p className="text-xs font-mono text-white/50">SYSTEM_CONTROL</p>
        </div>
        
        <nav className="flex flex-col gap-4 flex-1">
          <Link href="/admin" className="font-mono text-sm hover:text-accent transition-colors">
            [01] DASHBOARD
          </Link>
          <form action={logout}>
            <button type="submit" className="font-mono text-sm text-accent hover:text-white transition-colors uppercase cursor-pointer">
              [XX] LOGOUT
            </button>
          </form>
          <Link href="/" className="font-mono text-sm text-white/50 hover:text-white mt-auto">
            &larr; EXIT TO SITE
          </Link>
        </nav>
      </aside>
      
      {/* Main Admin Area */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
