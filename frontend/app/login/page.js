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
    <main className="min-h-screen flex items-center justify-center p-8 bg-slate-100">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-2">🐟</div>
          <h1 className="text-2xl font-bold text-slate-900">FFMS Login</h1>
          <p className="text-slate-500 text-sm mt-1">Fish Farm Management System</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-300 text-red-700 text-sm p-3 rounded">
                {error}
              </div>
            )}

            <div>
              <label className="label" htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div>
              <label className="label" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full"
              disabled={submitting}
            >
              {submitting ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-200 text-center text-sm text-slate-500">
            <Link href="/" className="text-sky-600 hover:underline">
              ← Back to home
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Demo: use your Django superuser credentials
        </p>
      </div>
    </main>
  );
}