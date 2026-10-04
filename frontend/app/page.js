import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <div className="text-6xl mb-4">🐟</div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Fish Farm Management System
        </h1>
        <p className="text-lg text-slate-600 mb-2">
          Gharo, Sindh — 96 acres, 6 ponds, 16 modules
        </p>
        <p className="text-slate-500 mb-8">
          A DBMS project by Daniyal Siddiqui · UBIT, University of Karachi
        </p>

        <div className="flex gap-3 justify-center">
          <Link href="/dashboard" className="btn-primary">
            Go to Dashboard
          </Link>
          <Link href="/login" className="btn-secondary">
            Login
          </Link>
        </div>
      </div>

      <div className="mt-16 text-sm text-slate-400">
        Powered by Django REST API + Next.js + PostgreSQL
      </div>
    </main>
  );
}