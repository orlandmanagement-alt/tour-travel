'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Hardcoded mock auth for now
    if (email === 'admin@nusantaratrip.com' && password === 'admin123') {
      sessionStorage.setItem('adminToken', 'mock-jwt-token');
      router.push('/');
    } else {
      setError('Invalid email or password. Hint: admin@nusantaratrip.com / admin123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-200 dark:border-slate-700">
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-brand-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-primary/30 rotate-3">
             <span className="text-3xl font-black -rotate-3">N</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Portal</h2>
          <p className="text-sm text-slate-500 mt-1">Sign in to manage NusantaraTrip</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 text-sm rounded-xl border border-red-200 dark:border-red-900">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-accent outline-none transition" 
              placeholder="admin@nusantaratrip.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-accent outline-none transition" 
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="w-full py-3 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary-light transition shadow-lg shadow-brand-primary/20">
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-slate-400">
           &copy; {new Date().getFullYear()} NusantaraTrip Admin Portal.
        </div>
      </div>
    </div>
  );
}
