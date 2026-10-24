'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuth } from '@/lib/auth';
import Navbar from '@/components/Navbar';
console.log('Navbar type:', typeof Navbar, Navbar);
console.log('useAuth type:', typeof useAuth);

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    ponds: 0,
    batches: 0,
    workers: 0,
    sales: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);
  const [error, setError] = useState('');

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login');
    }
  }, [authLoading, user, router]);

  // Fetch stats once user is known
  useEffect(() => {
    if (!user) return;

    const fetchStats = async () => {
      setStatsLoading(true);
      try {
        const [ponds, batches, workers, sales] = await Promise.all([
          api.get('/ponds/'),
          api.get('/batches/'),
          api.get('/workers/'),
          api.get('/sales/'),
        ]);
        setStats({
          ponds: ponds.data.length,
          batches: batches.data.length,
          workers: workers.data.length,
          sales: sales.data.length,
        });
        setError('');
      } catch (e) {
        setError('Could not load data.');
      } finally {
        setStatsLoading(false);
      }
    };
    fetchStats();
  }, [user]);

  // --- CRITICAL: Do not render dashboard content if not authed ---
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Checking authentication...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-playfair font-bold text-amber-500 tracking-wide">Dashboard</h1>
            <p className="text-slate-400 text-sm tracking-widest uppercase mt-2">Welcome back, {user.username}</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 p-4 rounded mb-6">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard title="Ponds" value={stats.ponds} color="sky" />
            <StatCard title="Batches" value={stats.batches} color="green" />
            <StatCard title="Workers" value={stats.workers} color="amber" />
            <StatCard title="Sales" value={stats.sales} color="slate" />
          </div>

          {statsLoading && <p className="text-slate-500">Loading stats...</p>}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/ponds" className="bg-[#111] hover:bg-[#1a1a1a] border border-[#222] hover:border-amber-500/50 text-slate-300 text-xs font-semibold tracking-widest uppercase text-center py-4 rounded-sm transition-all duration-300">Ponds</Link>
              <Link href="/batches" className="bg-[#111] hover:bg-[#1a1a1a] border border-[#222] hover:border-amber-500/50 text-slate-300 text-xs font-semibold tracking-widest uppercase text-center py-4 rounded-sm transition-all duration-300">Batches</Link>
              <Link href="/feed" className="bg-[#111] hover:bg-[#1a1a1a] border border-[#222] hover:border-amber-500/50 text-slate-300 text-xs font-semibold tracking-widest uppercase text-center py-4 rounded-sm transition-all duration-300">Feed</Link>
              <Link href="/water" className="bg-[#111] hover:bg-[#1a1a1a] border border-[#222] hover:border-amber-500/50 text-slate-300 text-xs font-semibold tracking-widest uppercase text-center py-4 rounded-sm transition-all duration-300">Water</Link>
            </div>
        </div>
      </main>
    </>
  );
}

function StatCard({ title, value, color }) {
  const borders = {
    sky: 'border-amber-500/50 text-amber-500',
    green: 'border-emerald-500/50 text-emerald-500',
    amber: 'border-orange-500/50 text-orange-500',
    slate: 'border-slate-500/50 text-slate-300',
  };
  
  return (
    <div className={`bg-[#0a0a0a] rounded-sm border border-[#222] p-6 shadow-xl relative overflow-hidden border-l-2 ${borders[color]}`}>
      <p className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-3">{title}</p>
      <p className={`text-5xl font-playfair font-bold ${borders[color].split(' ')[1]}`}>{value}</p>
    </div>
  );
}