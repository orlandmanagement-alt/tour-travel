'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API registration delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-slate-50 dark:bg-slate-900 p-12 sm:p-16 rounded-[4rem] text-center shadow-2xl border border-slate-100 dark:border-slate-800 animate-in zoom-in-95 duration-500">
           <div className="w-24 h-24 bg-brand-primary text-white rounded-[2.5rem] flex items-center justify-center text-5xl mx-auto mb-10 shadow-xl shadow-brand-primary/20">
              <i className="fa-solid fa-paper-plane"></i>
           </div>
           <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-6 leading-tight">Konfirmasi Email ✨</h2>
           <p className="text-sm text-slate-500 dark:text-slate-400 font-bold italic mb-12 leading-relaxed uppercase tracking-tight">
              Tautan aktivasi telah dikirim ke <b>{formData.email}</b>. Silakan periksa inbox Anda untuk mengaktifkan akun.
           </p>
           <Link href="/login" className="w-full inline-block py-5 bg-brand-primary text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-brand-primary/20 hover:scale-105 transition-all">
              Buka Halaman Login
           </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Box: Visual Branding (Hidden on mobile) */}
      <div className="w-full md:w-5/12 lg:w-1/2 bg-brand-primary flex flex-col justify-between relative overflow-hidden hidden md:flex">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/60 to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1542898939-5e5f385c5dfa?w=1200&q=80" 
            alt="Travel" 
            className="w-full h-full object-cover opacity-50 mix-blend-overlay"
          />
        </div>
        
        <div className="relative z-20 p-12 lg:p-16 flex-1 flex flex-col text-white">
          <Link href="/" className="font-black text-2xl tracking-widest flex items-center gap-3 mb-auto uppercase">
            <span className="w-10 h-10 rounded-xl bg-white text-brand-primary flex items-center justify-center shadow-lg font-black italic">N</span>
            NusantaraTrip
          </Link>
          
          <div className="mt-auto">
             <div className="flex gap-1 mb-6">
                {[1,2,3,4,5].map(i => <i key={i} className="fa-solid fa-star text-white/50 text-sm"></i>)}
             </div>
             <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight mb-6 leading-tight">
               Mulai Petualangan <br/><span className="text-brand-accent">Tak Terlupakan.</span>
             </h2>
             <p className="text-white/70 font-bold italic mb-10 leading-relaxed max-w-md">
               "Bergabunglah dengan komunitas pelancong cerdas. Dapatkan akses ke harga eksklusif dan fitur perencanaan tour profesional."
             </p>
             <div className="flex items-center gap-4">
                <img src="https://ui-avatars.com/api/?name=Sarah+Chen&background=fff&color=4f46e5" className="w-12 h-12 rounded-2xl border-2 border-white/20 shadow-xl" alt="Avatar"/>
                <div>
                  <p className="text-white font-black uppercase text-xs tracking-widest">Sarah Chen</p>
                  <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest">Adventure Architect</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Right Box: Register Form */}
      <div className="w-full md:w-7/12 lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white dark:bg-slate-950 flex-1">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          <Link href="/" className="lg:hidden inline-flex items-center gap-2 mb-12 text-slate-900 dark:text-white font-black text-xl tracking-tighter">
            <div className="w-8 h-8 rounded-lg bg-brand-primary text-white flex items-center justify-center shadow-lg">N</div>
            NusantaraTrip
          </Link>

          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-3 uppercase">Daftar Akun Baru 🌍</h1>
            <p className="text-slate-500 dark:text-slate-400 font-bold italic">Bergabunglah untuk akses harga & fitur eksklusif B2B.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Lengkap Sesuai KTP/Paspor*</label>
              <div className="relative group">
                <i className="fa-regular fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors"></i>
                <input 
                  type="text" 
                  required 
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl pl-11 pr-4 py-4 text-xs font-black uppercase tracking-widest focus:outline-none focus:border-brand-primary transition-all shadow-sm"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Bisnis*</label>
                  <input 
                    type="email" 
                    required 
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl px-4 py-4 text-xs font-black uppercase tracking-widest focus:outline-none focus:border-brand-primary transition-all shadow-sm"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">WhatsApp*</label>
                  <input 
                    type="tel" 
                    required 
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl px-4 py-4 text-xs font-black uppercase tracking-widest focus:outline-none focus:border-brand-primary transition-all shadow-sm"
                    placeholder="0812xxxx"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
               </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password*</label>
              <div className="relative group">
                <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors"></i>
                <input 
                  type="password"
                  required 
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl pl-11 pr-4 py-4 text-xs font-black uppercase tracking-widest focus:outline-none focus:border-brand-primary transition-all shadow-sm"
                  placeholder="••••••••"
                  onKeyUp={(e: any) => setFormData({...formData, password: e.target.value})}
                />
              </div>
              <div className="flex gap-1 mt-3">
                 {[1,2,3,4].map(l => <div key={l} className={`h-1.5 w-full rounded-full transition-colors ${formData.password.length > (l * 2) ? 'bg-brand-primary' : 'bg-slate-100 dark:bg-slate-800'}`}></div>)}
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer mt-4">
               <input type="checkbox" required className="w-4 h-4 rounded-md mt-0.5 border-slate-200 text-brand-primary focus:ring-brand-primary" />
               <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-relaxed">Saya menyetujui Syarat & Ketentuan dan Kebijakan Privasi NusantaraTrip.</span>
            </label>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-5 bg-brand-primary text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-wait mt-4"
            >
              {isLoading ? (
                <i className="fa-solid fa-circle-notch fa-spin text-lg"></i>
              ) : 'Daftar Akun Baru'}
            </button>
          </form>

          <p className="text-center text-[11px] text-slate-500 dark:text-slate-400 font-bold italic mt-12">
            Sudah punya akun? <Link href="/login" className="text-brand-primary not-italic font-black hover:underline uppercase tracking-widest ml-1">Masuk Di Sini</Link>
          </p>

        </div>
      </div>
    </div>
  );
}
