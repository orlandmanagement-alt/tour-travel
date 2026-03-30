'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const data = sessionStorage.getItem('bookingResult');
    if (data) {
      setResult(JSON.parse(data));
    }
  }, []);

  if (!result) return (
    <div className="min-h-screen py-32 text-center text-slate-500 font-bold uppercase tracking-widest flex flex-col items-center justify-center gap-4">
      <div className="h-10 w-10 border-4 border-slate-200 border-t-brand-primary rounded-full animate-spin"></div>
      Loading Confirmation...
    </div>
  );

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pt-24 pb-20 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Decorative Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main Success Card */}
      <main className="w-full max-w-[550px] bg-white dark:bg-slate-900 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 sm:p-12 text-center relative z-10">
        
        {/* Animated Checkmark Wrapper */}
        <div className="mb-10">
          <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/30 animate-bounce-slow">
            <i className="fa-solid fa-check text-white text-5xl"></i>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
            Pembayaran Berhasil!
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-bold leading-relaxed max-w-sm mx-auto">
            Terima kasih! Transaksi Anda telah kami terima dan e-tiket Anda sedang diterbitkan.
          </p>
        </div>

        {/* Transaction Summary Card */}
        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 rounded-3xl p-6 mb-10 text-left">
          <div className="flex justify-between items-center mb-5 pb-5 border-b border-slate-200/50 dark:border-slate-700/50">
            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">ID Transaksi</span>
            <span className="text-xs font-black text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-lg border border-brand-primary/20">
              {result.booking_reference}
            </span>
          </div>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1542898939-5e5f385c5dfa?w=120" className="w-full h-full object-cover" alt="Thumb" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight line-clamp-1 mb-1">
                  {result.tour_name}
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest">
                  {result.travel_date || 'Sabtu, 24 Okt 2026'} • {result.total_pax || 2} Peserta
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-slate-200/30 dark:border-slate-700/30">
              <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Total Pembayaran</span>
              <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Rp {result.grand_total.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mb-10">
          <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-6">Langkah Selanjutnya</h4>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-start gap-4 text-left p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-transparent hover:border-slate-100 dark:hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center flex-shrink-0 text-lg">
                <i className="fa-regular fa-envelope"></i>
              </div>
              <div>
                <p className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider mb-1">Cek Email Anda</p>
                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium italic">E-tiket dan invoice telah kami kirimkan ke alamat email Anda.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 text-left p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-transparent hover:border-slate-100 dark:hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0 text-lg">
                <i className="fa-solid fa-qrcode"></i>
              </div>
              <div>
                <p className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider mb-1">Siapkan E-Ticket</p>
                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium italic">Tunjukkan QR Code di dalam e-tiket kepada kru kami saat penjemputan.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link href="/ticket" className="w-full py-4 bg-brand-primary hover:bg-indigo-700 text-white font-black text-xs rounded-2xl shadow-xl shadow-brand-primary/20 transition-all flex justify-center items-center gap-3 uppercase tracking-[0.2em]">
            <i className="fa-solid fa-ticket text-sm opacity-70"></i> Lihat E-Ticket
          </Link>
          <Link href="/dashboard" className="w-full py-4 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-black text-xs rounded-2xl transition-all uppercase tracking-[0.2em]">
            Ke Dashboard
          </Link>
        </div>

        <p className="mt-8 text-[10px] text-slate-400 font-black uppercase tracking-widest">
          Butuh bantuan? Hubungi <span className="text-brand-primary cursor-pointer hover:underline">Support 24/7</span>
        </p>

      </main>

      {/* Back to Home Button */}
      <Link href="/" className="mt-10 text-slate-500 dark:text-slate-400 hover:text-brand-primary font-black text-xs transition-colors flex items-center gap-2 relative z-10 uppercase tracking-widest group">
        <i className="fa-solid fa-arrow-left text-[10px] group-hover:-translate-x-1 transition-transform"></i> Kembali Cari Tour Lain
      </Link>

    </div>
  );
}
