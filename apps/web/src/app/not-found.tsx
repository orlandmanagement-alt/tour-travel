import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden p-6 text-center">
      
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute top-1/4 left-10 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px] animate-pulse"></div>
         <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 space-y-12 max-w-2xl">
         
         {/* Floating Icon */}
         <div className="relative w-40 h-40 mx-auto animate-bounce">
            <div className="absolute inset-0 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl flex items-center justify-center text-8xl text-slate-100 dark:text-slate-800 border-4 border-slate-50 dark:border-white/5">
               <i className="fa-regular fa-compass text-indigo-600"></i>
            </div>
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-orange-500 rounded-full text-white flex items-center justify-center text-2xl font-black shadow-xl border-4 border-white dark:border-slate-900">
               ?
            </div>
         </div>

         {/* Typography */}
         <div className="space-y-6">
            <h1 className="text-[10rem] sm:text-[14rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-orange-500 drop-shadow-2xl">404</h1>
            <div className="space-y-2">
               <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Ups! Sepertinya Anda Tersesat.</h2>
               <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-loose max-w-md mx-auto">
                 Halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau memang tidak pernah ada. Mari kembali ke rute yang benar!
               </p>
            </div>
         </div>

         {/* CTA Buttons */}
         <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
            <Link href="/" className="px-12 py-5 bg-indigo-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-full shadow-2xl shadow-indigo-500/40 hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95">
               <i className="fa-solid fa-house mr-3"></i> Beranda
            </Link>
            <Link href="/tours" className="px-12 py-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-black text-xs uppercase tracking-[0.2em] rounded-full shadow-xl border border-slate-200 dark:border-white/5 hover:bg-slate-50 transition-all active:scale-95">
               <i className="fa-solid fa-map-location-dot mr-3 text-indigo-600"></i> Cari Destinasi
            </Link>
         </div>

         {/* Quick Links */}
         <div className="pt-12 border-t border-slate-200 dark:border-white/5 flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] font-black text-indigo-600 uppercase tracking-widest">
            <Link href="/promos" className="hover:underline">Promo Spesial</Link>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <Link href="/profile" className="hover:underline">Pesanan Saya</Link>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <Link href="/contact" className="hover:underline">Pusat Bantuan</Link>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <Link href="/affiliate" className="hover:underline">Afiliasi</Link>
         </div>

      </div>

      <footer className="absolute bottom-8 left-0 w-full text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
         © 2026 PT Nusantara Trip System
      </footer>

    </div>
  );
}
