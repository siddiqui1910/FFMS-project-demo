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
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-500 mt-1">Welcome back, {user.username}</p>
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

          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Link href="/ponds" className="btn-secondary text-center">Ponds</Link>
              <Link href="/batches" className="btn-secondary text-center">Batches</Link>
              <Link href="/feed" className="btn-secondary text-center">Feed</Link>
              <Link href="/water" className="btn-secondary text-center">Water</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function StatCard({ title, value, color }) {
  const colors = {
    sky: 'bg-sky-50 text-sky-700 border-sky-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    slate: 'bg-slate-50 text-slate-700 border-slate-200',
  };
  return (
    <div className={`rounded-lg border p-6 ${colors[color]}`}>
      <p className="text-sm font-medium opacity-75">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}