import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#050505] relative overflow-hidden">
      {/* Moody Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-900/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-2xl text-center relative z-10">
        {/* Celestial Motif instead of Emoji */}
        <div className="text-6xl mb-8 text-amber-500/80 font-playfair">✦</div>
        
        <h1 className="text-5xl md:text-6xl font-playfair font-bold text-slate-100 mb-6 tracking-wide">
          Gharo Fisheries
        </h1>
        
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto mb-6"></div>
        
        <p className="text-amber-500/80 text-sm tracking-[0.2em] uppercase mb-4">
          96 Acres · 6 Ponds · 16 Operational Modules
        </p>
        <p className="text-slate-400 mb-12 text-sm">
          A DBMS project by Daniyal Siddiqui · UBIT, University of Karachi
        </p>

        <div className="flex gap-4 justify-center">
          <Link href="/dashboard" className="btn-primary tracking-widest uppercase text-sm">
            Enter Dashboard
          </Link>
          <Link href="/login" className="btn-secondary tracking-widest uppercase text-sm">
            Log In
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 text-xs text-slate-600 tracking-widest uppercase">
        Powered by Django REST API · Next.js · PostgreSQL
      </div>
    </main>
  );
}