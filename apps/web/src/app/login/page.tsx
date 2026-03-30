'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API login delay
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = '/dashboard';
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Box: Visual Branding (Hidden on mobile) */}
      <div className="w-full md:w-5/12 lg:w-1/2 bg-slate-900 flex flex-col justify-between relative overflow-hidden hidden md:flex">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80" 
            alt="Landing" 
            className="w-full h-full object-cover opacity-50 mix-blend-overlay"
          />
        </div>
        
        <div className="relative z-20 p-12 lg:p-16 flex-1 flex flex-col">
          <Link href="/" className="text-white font-black text-2xl tracking-widest flex items-center gap-3 mb-auto uppercase">
            <span className="w-10 h-10 rounded-xl bg-brand-primary text-white flex items-center justify-center shadow-lg"><i className="fa-solid fa-paper-plane text-sm"></i></span>
            NusantaraTrip
          </Link>
          
          <div className="mt-auto">
             <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-6 uppercase tracking-tight">
               Gerbang Menuju <br/><span className="text-brand-accent">Petualangan Baru.</span>
             </h2>
             <p className="text-slate-300 font-bold italic mb-10 leading-relaxed max-w-md">
               "Sistem booking paling efisien yang pernah saya gunakan. Keamanan data dan kemudahan transaksi luar biasa."
             </p>
             <div className="flex items-center gap-4">
                <img src="https://ui-avatars.com/api/?name=Budi+Santoso&background=f97316&color=fff" className="w-12 h-12 rounded-2xl border-2 border-white/20 shadow-xl" alt="Avatar"/>
                <div>
                  <p className="text-white font-black uppercase text-xs tracking-widest">Budi Santoso</p>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Frequent Traveler</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Right Box: Login Form */}
      <div className="w-full md:w-7/12 lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white dark:bg-slate-950 flex-1">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          <Link href="/" className="lg:hidden inline-flex items-center gap-2 mb-12 text-slate-900 dark:text-white font-black text-xl tracking-tighter">
            <div className="w-8 h-8 rounded-lg bg-brand-primary text-white flex items-center justify-center shadow-lg">N</div>
            NusantaraTrip
          </Link>

          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-3 uppercase">Selamat Datang 👋</h1>
            <p className="text-slate-500 dark:text-slate-400 font-bold italic">Silakan masuk ke akun Anda untuk melanjutkan liburan impian.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email atau Username</label>
              <div className="relative group">
                <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors"></i>
                <input 
                  type="text" 
                  required 
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl pl-11 pr-4 py-4 text-xs font-black uppercase tracking-widest focus:outline-none focus:border-brand-primary transition-all shadow-sm"
                  placeholder="name@email.com / username"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                <Link href="/forgot-password" className="text-[10px] font-black text-brand-primary hover:text-brand-primary/80 transition-colors uppercase tracking-wider">
  Forgot Password?
</Link>
              </div>
              <div className="relative group">
                <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors"></i>
                <input 
                  type={showPassword ? "text" : "password"}
                  required 
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl pl-11 pr-12 py-4 text-xs font-black uppercase tracking-widest focus:outline-none focus:border-brand-primary transition-all shadow-sm"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-primary"
                >
                  <i className={`fa-regular ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
               <input type="checkbox" id="remember" className="w-4 h-4 rounded-md border-slate-200 text-brand-primary focus:ring-brand-primary" />
               <label htmlFor="remember" className="text-[10px] font-black text-slate-500 uppercase tracking-widest cursor-pointer">Ingat Saya</label>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-5 bg-brand-primary text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-wait"
            >
              {isLoading ? (
                <i className="fa-solid fa-circle-notch fa-spin text-lg"></i>
              ) : 'Masuk Sekarang'}
            </button>
          </form>

          <div className="mt-10 relative flex items-center">
            <div className="flex-grow border-t border-slate-100 dark:border-slate-800"></div>
            <span className="flex-shrink-0 mx-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Atau masuk dengan</span>
            <div className="flex-grow border-t border-slate-100 dark:border-slate-800"></div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <button className="flex items-center justify-center gap-3 py-4 border border-slate-100 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all shadow-sm group">
               <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4 group-hover:scale-110 transition-transform" alt="Google" />
               <span className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 py-4 border border-slate-100 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all shadow-sm group">
               <i className="fa-brands fa-apple text-lg text-slate-900 dark:text-white group-hover:scale-110 transition-transform"></i>
               <span className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Apple</span>
            </button>
          </div>

          <p className="text-center text-[11px] text-slate-500 dark:text-slate-400 font-bold italic mt-12">
            Belum punya akun? <Link href="/register" className="text-brand-primary not-italic font-black hover:underline uppercase tracking-widest ml-1">Daftar Sekarang</Link>
          </p>

        </div>
      </div>
    </div>
  );
}
