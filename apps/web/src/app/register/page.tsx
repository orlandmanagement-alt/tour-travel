import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Register | NusantaraTrip',
  description: 'Create an account to book your tours',
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Aesthetic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-brand-primary/20 blur-[120px]"></div>
        <div className="absolute bottom-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-brand-secondary/20 blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Registration Card */}
        <div className="glass p-8 sm:p-10 rounded-3xl">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-4">
              <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                NusantaraTrip
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
              Create an Account
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Join us to book your dream vacation easily.
            </p>
          </div>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <input 
                type="text" 
                placeholder="John Doe" 
                className="w-full px-4 py-3 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <input 
                type="email" 
                placeholder="john@example.com" 
                className="w-full px-4 py-3 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-3.5 bg-gradient-to-r from-brand-primary to-brand-primary-dark hover:from-brand-secondary hover:to-brand-secondary-dark text-white rounded-xl font-bold shadow-lg shadow-brand-primary/30 transition-all hover:-translate-y-1"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-slate-600 dark:text-slate-400">
            Already have an account? {' '}
            <Link href="/login" className="font-bold text-brand-primary hover:text-brand-secondary transition-colors">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
