'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(username, password);
      router.push('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.error || 'Login failed. Check credentials.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    // 1. REMOVED bg-[#050505] so the background from layout.js shows through.
    // 2. Added 'bg-transparent' to ensure it doesn't block.
    <main className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden bg-transparent">
      
      {/* The card is slightly transparent with a backdrop blur to let the ocean show through */}
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="text-6xl mb-4 text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">✦</div>
          <h1 className="text-4xl font-playfair font-bold text-slate-100 tracking-widest uppercase drop-shadow-lg">FFMS</h1>
          <p className="text-amber-500 text-xs tracking-[0.3em] uppercase mt-3 font-semibold">Fish Farm Management</p>
        </div>

        {/* Changed bg to bg-black/60 and added backdrop-blur-xl */}
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-sm p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative">
          {/* Art Deco Top Border */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-500/80 to-transparent"></div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-900/40 border border-red-500/50 text-red-200 text-xs tracking-wide p-3 rounded-sm text-center">
                {error}
              </div>
            )}

            <div>
              <label className="label text-center text-slate-300" htmlFor="username">Username</label>
              {/* Force dark background with inline Tailwind classes just in case .input is overridden */}
              <input
                id="username"
                type="text"
                className="w-full bg-black/50 border border-slate-600 text-amber-50 rounded-sm px-3 py-3 text-center text-lg tracking-widest focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors duration-300"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div>
              <label className="label text-center text-slate-300" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="w-full bg-black/50 border border-slate-600 text-amber-50 rounded-sm px-3 py-3 text-center text-lg tracking-widest focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors duration-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full tracking-widest uppercase text-sm mt-4 py-3"
              disabled={submitting}
            >
              {submitting ? 'Authenticating...' : 'Enter System'}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-xs text-slate-400 hover:text-amber-500 tracking-widest uppercase transition-colors drop-shadow-md">
            ← Return to Surface
          </Link>
        </div>
      </div>
    </main>
  );
}