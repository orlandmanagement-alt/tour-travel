'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Mock login logic
    setTimeout(() => {
      sessionStorage.setItem('adminToken', 'mock_token');
      sessionStorage.setItem('adminRole', 'SUPER_ADMIN');
      router.push('/');
    }, 1000);
  };

  return (
    <div className="antialiased text-slate-800 min-h-screen flex font-sans">
      
      {/* LEFT PANEL: Branding & Illustration */}
      <div className="hidden lg:flex w-1/2 bg-brand-900 relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-500 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 -right-10 w-80 h-80 bg-accent-500 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30"></div>
        </div>

        <Link href="/" className="relative z-10 font-black text-2xl tracking-tighter text-white flex items-center gap-2 w-max">
          <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-lg">
            <i className="fa-solid fa-n text-sm"></i>
          </div>
          NusantaraTrip
        </Link>

        {/* Value Proposition */}
        <div className="relative z-10 max-w-md mt-10">
          <span className="px-3 py-1 bg-white/10 border border-white/20 text-brand-200 text-[10px] font-bold rounded-full uppercase tracking-widest mb-4 inline-block backdrop-blur-sm">
            Enterprise Travel Platform
          </span>
          <h1 className="text-4xl font-extrabold text-white mb-6 leading-tight">
            Admin Portal <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-yellow-400">Control Center.</span>
          </h1>
          <p className="text-brand-200 text-sm leading-relaxed mb-8">
            Manage your entire travel ecosystem in one place. Monitor analytics, handle bookings, and manage users with enterprise-grade security.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex items-center gap-4 text-white">
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <img 
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-brand-900" 
                  src={`https://ui-avatars.com/api/?name=Admin+${i}&background=random`} 
                  alt="Admin" 
                />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-brand-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold">+10</div>
            </div>
            <div className="text-xs font-medium text-brand-200">
              <div className="flex text-yellow-400 text-[10px] mb-0.5">
                {[1, 2, 3, 4, 5].map(i => <i key={i} className="fa-solid fa-star"></i>)}
              </div>
              Trusted by 500+ Enterprises
            </div>
          </div>
        </div>

        <div className="relative z-10 text-[10px] text-brand-300/60 font-medium tracking-widest uppercase">
          &copy; 2026 PT Nusantara Trip System. 
        </div>
      </div>

      {/* RIGHT PANEL: Form Area */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white relative overflow-y-auto">
        
        {/* Mobile Logo */}
        <div className="absolute top-6 left-6 lg:hidden">
          <Link href="/" className="font-black text-xl tracking-tighter text-brand-900 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center shadow">
              <i className="fa-solid fa-n text-xs"></i>
            </div>
            NusaTrip
          </Link>
        </div>

        <div className="w-full max-w-md px-6 py-12">
          
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2 whitespace-nowrap">Admin Dashboard Access</h2>
            <p className="text-sm text-slate-500">Authorized personnel only. Please sign in to continue.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Admin Email</label>
              <div className="relative group">
                <i className="fa-regular fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-600 transition-colors"></i>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-600 focus:ring-4 focus:ring-brand-600/10 outline-none transition-all text-sm rounded-xl pl-11 pr-4 py-3.5 text-slate-800 font-medium" 
                  placeholder="admin@email.com" 
                  required 
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide">Security Password</label>
                <button type="button" className="text-[10px] font-bold text-brand-600 hover:underline">Forgot Access Key?</button>
              </div>
              <div className="relative group">
                <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-600 transition-colors"></i>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-600 focus:ring-4 focus:ring-brand-600/10 outline-none transition-all text-sm rounded-xl pl-11 pr-10 py-3.5 text-slate-800 font-medium" 
                  placeholder="••••••••" 
                  required 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-600 focus:outline-none"
                >
                  <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 cursor-pointer" />
              <label htmlFor="remember" className="text-xs text-slate-500 cursor-pointer">Trust this device for 24 hours</label>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-brand-500/30 transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>Secure Login <i className="fa-solid fa-shield-halved text-xs group-hover:scale-110 transition-transform"></i></>
              )}
            </button>
          </form>

          <div className="mt-12 p-5 bg-slate-50 rounded-2xl border border-slate-100">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">System Alerts</h4>
             <ul className="space-y-2">
                <li className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                   Database connected (Cloudflare D1)
                </li>
                <li className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                   Auth Service online (Next-Auth)
                </li>
             </ul>
          </div>

          <p className="text-center text-[10px] text-slate-400 mt-8 uppercase tracking-widest font-bold">
            Portal Version 2.0.4-LTS
          </p>
        </div>
      </div>
    </div>
  );
}
