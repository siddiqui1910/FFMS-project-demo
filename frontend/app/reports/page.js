'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import api from '@/lib/api';
import Navbar from '@/components/Navbar';

export default function ReportsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !user) router.replace('/login');
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!user) return;

    const fetchAllData = async () => {
      try {
        const [sales, expenses, harvests, ponds] = await Promise.all([
          api.get('/sales/'),
          api.get('/expenses/'),
          api.get('/harvests/'),
          api.get('/ponds/'),
        ]);

        const totalSales = sales.data.reduce((sum, s) => sum + Number(s.total_amount), 0);
        const totalExpenses = expenses.data.reduce((sum, e) => sum + Number(e.amount), 0);
        const totalHarvestWeight = harvests.data.reduce((sum, h) => sum + Number(h.total_weight_kg), 0);
        const totalPondsSize = ponds.data.reduce((sum, p) => sum + Number(p.size_acres), 0);

        setData({
          totalSales,
          totalExpenses,
          profit: totalSales - totalExpenses,
          totalHarvestWeight,
          totalPondsSize,
          salesCount: sales.data.length,
        });
      } catch (e) {
        setError('Could not load report data.');
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, [user]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  const formatRs = (val) => new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', maximumFractionDigits: 0 }).format(val);

  return (
    <>
      <Navbar />
      <main className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Financial & Farm Reports</h1>
            <p className="text-slate-500 mt-1">Summary of all operations to date</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 p-4 rounded mb-6">{error}</div>
          )}

          {loading ? (
            <p className="text-slate-500">Generating report...</p>
          ) : data && (
            <>
              <h2 className="text-xl font-semibold mb-4 text-slate-800">Financial Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="card border-l-4 border-l-sky-500">
                  <p className="text-sm font-medium text-slate-500">Total Revenue</p>
                  <p className="text-3xl font-bold text-sky-700 mt-2">{formatRs(data.totalSales)}</p>
                </div>
                <div className="card border-l-4 border-l-red-500">
                  <p className="text-sm font-medium text-slate-500">Total Expenses</p>
                  <p className="text-3xl font-bold text-red-700 mt-2">{formatRs(data.totalExpenses)}</p>
                </div>
                <div className="card border-l-4 border-l-green-500">
                  <p className="text-sm font-medium text-slate-500">Net Profit / Loss</p>
                  <p className={`text-3xl font-bold mt-2 ${data.profit >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                    {formatRs(data.profit)}
                  </p>
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-4 text-slate-800">Farm Operations Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card">
                  <p className="text-sm font-medium text-slate-500">Total Harvested</p>
                  <p className="text-3xl font-bold text-slate-800 mt-2">{data.totalHarvestWeight.toLocaleString()} kg</p>
                </div>
                <div className="card">
                  <p className="text-sm font-medium text-slate-500">Total Farm Size</p>
                  <p className="text-3xl font-bold text-slate-800 mt-2">{data.totalPondsSize.toLocaleString()} acres</p>
                </div>
                <div className="card">
                  <p className="text-sm font-medium text-slate-500">Total Sales Transactions</p>
                  <p className="text-3xl font-bold text-slate-800 mt-2">{data.salesCount}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}