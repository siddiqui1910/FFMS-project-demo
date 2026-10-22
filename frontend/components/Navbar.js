'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [moreOpen, setMoreOpen] = useState(false);

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

        <div className="flex items-center gap-5 relative">
          {/* Main visible links */}
          <Link href="/dashboard" className="text-slate-700 hover:text-sky-600 text-sm font-medium">
            Dashboard
          </Link>
          <Link href="/ponds" className="text-slate-700 hover:text-sky-600 text-sm font-medium">
            Ponds
          </Link>
          <Link href="/batches" className="text-slate-700 hover:text-sky-600 text-sm font-medium">
            Batches
          </Link>
          <Link href="/harvests" className="text-slate-700 hover:text-sky-600 text-sm font-medium">
            Harvests
          </Link>
          <Link href="/sales" className="text-slate-700 hover:text-sky-600 text-sm font-medium">
            Sales
          </Link>

          {/* More Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setMoreOpen(!moreOpen)}
              className="text-slate-700 hover:text-sky-600 text-sm font-medium flex items-center gap-1 focus:outline-none"
            >
              More ▾
            </button>
            
            {moreOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-slate-200 rounded shadow-lg py-1 z-50 max-h-[80vh] overflow-y-auto">
                <Link href="/reports" className="block px-4 py-2 text-sm text-sky-700 font-semibold hover:bg-slate-50 border-b border-slate-100">📊 Financial Reports</Link>
                
                <div className="py-1">
                  <span className="block px-4 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">Inventory & Ops</span>
                  <Link href="/feed" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Feed Deliveries</Link>
                  <Link href="/feed-consumption" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Feed Consumption</Link>
                  <Link href="/water" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Water Quality</Link>
                  <Link href="/fingerlings" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Fingerlings</Link>
                </div>

                <div className="border-t border-slate-100 py-1">
                  <span className="block px-4 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">HR & Security</span>
                  <Link href="/workers" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Workers</Link>
                  <Link href="/attendance" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Attendance</Link>
                  <Link href="/incidents" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Security Incidents</Link>
                </div>

                <div className="border-t border-slate-100 py-1">
                  <span className="block px-4 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">Sales & Admin</span>
                  <Link href="/buyers" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Buyers</Link>
                  <Link href="/auctions" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Auctions</Link>
                  <Link href="/species" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Species</Link>
                  <Link href="/expenses" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Expenses</Link>
                  <Link href="/mortality" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Mortality Records</Link>
                </div>
              </div>
            )}
          </div>

          {/* User Auth State */}
          {loading ? (
            <span className="text-sm text-slate-400 ml-2">...</span>
          ) : user ? (
            <div className="flex items-center gap-3 ml-2 border-l border-slate-300 pl-4">
              <span className="text-sm text-slate-600">
                👤 {user.username}
              </span>
              <button onClick={handleLogout} className="btn-secondary text-sm py-1 px-3">
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="btn-primary text-sm py-1 px-3 ml-2">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}