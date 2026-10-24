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
    // Changed bg to dark obsidian and border to dark grey
    <nav className="bg-[#0a0a0a] border-b border-[#222] sticky top-0 z-40 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo & Celestial Icon */}
        <Link href="/dashboard" className="flex items-center gap-3">
          <span className="text-2xl text-amber-500">✦</span>
          <span className="font-playfair font-bold text-slate-100 tracking-widest uppercase text-lg mt-0.5">FFMS</span>
        </Link>

        <div className="flex items-center gap-6 relative">
          <Link href="/dashboard" className="text-slate-400 hover:text-amber-400 text-xs font-semibold tracking-widest uppercase transition-colors">
            Dashboard
          </Link>
          <Link href="/ponds" className="text-slate-400 hover:text-amber-400 text-xs font-semibold tracking-widest uppercase transition-colors">
            Ponds
          </Link>
          <Link href="/batches" className="text-slate-400 hover:text-amber-400 text-xs font-semibold tracking-widest uppercase transition-colors">
            Batches
          </Link>
          <Link href="/harvests" className="text-slate-400 hover:text-amber-400 text-xs font-semibold tracking-widest uppercase transition-colors">
            Harvests
          </Link>
          <Link href="/sales" className="text-slate-400 hover:text-amber-400 text-xs font-semibold tracking-widest uppercase transition-colors">
            Sales
          </Link>

          {/* More Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setMoreOpen(!moreOpen)}
              className="text-slate-400 hover:text-amber-400 text-xs font-semibold tracking-widest uppercase transition-colors flex items-center gap-1 focus:outline-none"
            >
              More ▾
            </button>
            
            {moreOpen && (
              <div className="absolute top-full right-0 mt-4 w-64 bg-[#111111] border border-[#333] rounded-sm shadow-2xl py-2 z-50 max-h-[80vh] overflow-y-auto">
                <Link href="/reports" className="block px-5 py-3 text-sm text-amber-500 font-semibold hover:bg-[#1a1a1a] border-b border-[#222]">Financial Reports</Link>
                
                <div className="py-2">
                  <span className="block px-5 py-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest">Inventory & Ops</span>
                  <Link href="/feed" className="block px-5 py-2 text-sm text-slate-400 hover:text-amber-400 hover:bg-[#1a1a1a]">Feed Deliveries</Link>
                  <Link href="/feed-consumption" className="block px-5 py-2 text-sm text-slate-400 hover:text-amber-400 hover:bg-[#1a1a1a]">Feed Consumption</Link>
                  <Link href="/water" className="block px-5 py-2 text-sm text-slate-400 hover:text-amber-400 hover:bg-[#1a1a1a]">Water Quality</Link>
                  <Link href="/fingerlings" className="block px-5 py-2 text-sm text-slate-400 hover:text-amber-400 hover:bg-[#1a1a1a]">Fingerlings</Link>
                </div>

                <div className="border-t border-[#222] py-2">
                  <span className="block px-5 py-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest">HR & Security</span>
                  <Link href="/workers" className="block px-5 py-2 text-sm text-slate-400 hover:text-amber-400 hover:bg-[#1a1a1a]">Workers</Link>
                  <Link href="/attendance" className="block px-5 py-2 text-sm text-slate-400 hover:text-amber-400 hover:bg-[#1a1a1a]">Attendance</Link>
                  <Link href="/incidents" className="block px-5 py-2 text-sm text-slate-400 hover:text-amber-400 hover:bg-[#1a1a1a]">Security Incidents</Link>
                </div>

                <div className="border-t border-[#222] py-2">
                  <span className="block px-5 py-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest">Sales & Admin</span>
                  <Link href="/buyers" className="block px-5 py-2 text-sm text-slate-400 hover:text-amber-400 hover:bg-[#1a1a1a]">Buyers</Link>
                  <Link href="/auctions" className="block px-5 py-2 text-sm text-slate-400 hover:text-amber-400 hover:bg-[#1a1a1a]">Auctions</Link>
                  <Link href="/species" className="block px-5 py-2 text-sm text-slate-400 hover:text-amber-400 hover:bg-[#1a1a1a]">Species</Link>
                  <Link href="/expenses" className="block px-5 py-2 text-sm text-slate-400 hover:text-amber-400 hover:bg-[#1a1a1a]">Expenses</Link>
                  <Link href="/mortality" className="block px-5 py-2 text-sm text-slate-400 hover:text-amber-400 hover:bg-[#1a1a1a]">Mortality Records</Link>
                </div>
              </div>
            )}
          </div>

          {/* User Auth State */}
          {loading ? (
            <span className="text-sm text-slate-500 ml-2">...</span>
          ) : user ? (
            <div className="flex items-center gap-4 ml-2 border-l border-[#333] pl-6">
              <span className="text-xs text-amber-500/80 tracking-widest uppercase">
                {user.username}
              </span>
              <button onClick={handleLogout} className="btn-secondary text-xs tracking-wider uppercase py-1 px-3">
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="btn-primary text-xs tracking-wider uppercase ml-2 py-2 px-4">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}