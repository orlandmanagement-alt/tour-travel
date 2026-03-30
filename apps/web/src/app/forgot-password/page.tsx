'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API reset link delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Box: Visual Branding (Hidden on mobile) */}
      <div className="w-full md:w-5/12 lg:w-1/2 bg-slate-900 flex flex-col justify-between relative overflow-hidden hidden md:flex">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1200&q=80" 
            alt="Security" 
            className="w-full h-full object-cover opacity-50 mix-blend-overlay"
          />
        </div>
        
        <div className="relative z-20 p-12 lg:p-16 flex-1 flex flex-col text-white">
          <Link href="/" className="font-black text-2xl tracking-widest flex items-center gap-3 mb-auto uppercase">
            <span className="w-10 h-10 rounded-xl bg-brand-primary text-white flex items-center justify-center shadow-lg"><i className="fa-solid fa-paper-plane text-sm"></i></span>
            NusantaraTrip
          </Link>
          
          <div className="mt-auto">
             <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight mb-6 leading-tight">
               Keamanan Akun <br/><span className="text-brand-accent">Adalah Prioritas.</span>
             </h2>
             <p className="text-slate-300 font-bold italic mb-10 leading-relaxed max-w-md">
               "Sistem pemulihan akun yang cepat dan aman. Kami memastikan hanya Anda yang memiliki kendali penuh atas petualangan Anda."
             </p>
          </div>
        </div>
      </div>

      {/* Right Box: Forgot Password Form */}
      <div className="w-full md:w-7/12 lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white dark:bg-slate-950 flex-1">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          <Link href="/login" className="inline-flex items-center gap-2 mb-10 text-brand-primary font-black text-xs uppercase tracking-widest hover:translate-x-[-4px] transition-transform">
            <i className="fa-solid fa-arrow-left"></i> Kembali ke Login
          </Link>

          {!isSent ? (
            <>
              <div className="mb-10">
                <div className="w-16 h-16 bg-brand-primary/10 text-brand-primary rounded-[2rem] flex items-center justify-center text-3xl mb-6 shadow-xl shadow-brand-primary/10">
                   <i className="fa-solid fa-key"></i>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-3 uppercase">Lupa Password? 🔒</h1>
                <p className="text-slate-500 dark:text-slate-400 font-bold italic">Jangan khawatir! Masukkan email Anda dan kami akan mengirimkan tautan reset.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Alamat Email Terdaftar</label>
                  <div className="relative group">
                    <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors"></i>
                    <input 
                      type="email" 
                      required 
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl pl-11 pr-4 py-4 text-xs font-black uppercase tracking-widest focus:outline-none focus:border-brand-primary transition-all shadow-sm"
                      placeholder="name@email.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full py-5 bg-brand-primary text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-wait"
                >
                  {isLoading ? (
                    <i className="fa-solid fa-circle-notch fa-spin text-lg"></i>
                  ) : 'Kirim Tautan Reset'}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center animate-in zoom-in-95 duration-500">
               <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-[2.5rem] flex items-center justify-center text-4xl mx-auto mb-8 shadow-xl shadow-emerald-500/10">
                  <i className="fa-solid fa-envelope-circle-check"></i>
               </div>
               <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">Email Terkirim!</h2>
               <p className="text-sm text-slate-500 dark:text-slate-400 font-bold italic mb-10 leading-relaxed uppercase tracking-tight">
                  Silakan periksa inbox atau folder spam email <b>{email}</b> untuk instruksi pengaturan ulang password.
               </p>
               <Link href="/login" className="inline-block px-10 py-5 bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl hover:scale-105 transition-all">
                  Masuk Sekarang
               </Link>
            </div>
          )}

          <p className="text-center text-[11px] text-slate-500 dark:text-slate-400 font-bold italic mt-20">
            Butuh bantuan lain? <Link href="/faq" className="text-brand-primary not-italic font-black hover:underline uppercase tracking-widest ml-1">Kunjungi Pusat Bantuan</Link>
          </p>

        </div>
      </div>
    </div>
  );
}
