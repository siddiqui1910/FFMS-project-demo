'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

function Navbar() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center gap-2 text-xl font-bold text-slate-900">
          <span>🐟</span>
          <span>FFMS</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-slate-700 hover:text-sky-600 text-sm font-medium">
            Dashboard
          </Link>
          <Link href="/ponds" className="text-slate-700 hover:text-sky-600 text-sm font-medium">
            Ponds
          </Link>
          <Link href="/reports" className="text-slate-700 hover:text-sky-600 text-sm font-medium">
            Reports
          </Link>

          {loading ? (
            <span className="text-sm text-slate-400">...</span>
          ) : user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600">
                👤 {user.username}
              </span>
              <button onClick={handleLogout} className="btn-secondary text-sm py-1 px-3">
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="btn-primary text-sm py-1 px-3">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;