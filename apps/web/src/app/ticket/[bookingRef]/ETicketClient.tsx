'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface ETicketClientProps {
  bookingRef: string;
}

export default function ETicketClient({ bookingRef }: ETicketClientProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 pb-20 print:bg-white print:pb-0">
      
      {/* Action Bar (No Print) */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-4 shadow-sm sticky top-0 z-50 no-print">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link href="/dashboard" className="text-slate-500 dark:text-slate-400 hover:text-brand-primary font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all">
            <i className="fa-solid fa-arrow-left"></i> Kembali ke Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-black text-[10px] uppercase tracking-widest rounded-xl transition-all flex items-center gap-2">
              <i className="fa-solid fa-download opacity-50"></i> Unduh PDF
            </button>
            <button 
              onClick={() => window.print()}
              className="px-5 py-2.5 bg-brand-primary hover:bg-indigo-700 text-white font-black text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-brand-primary/20 transition-all flex items-center gap-2"
            >
              <i className="fa-solid fa-print opacity-50"></i> Cetak E-Ticket
            </button>
          </div>
        </div>
      </div>

      {/* Main Ticket Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 mt-8 sm:mt-12 print:mt-0">
        
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-none overflow-hidden relative border border-slate-100 dark:border-slate-800 print:shadow-none print:border-slate-300 print:rounded-none">
          
          {/* Ticket Header */}
          <div className="bg-slate-900 dark:bg-black text-white p-6 sm:p-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative overflow-hidden">
            <div className="absolute right-[-20px] top-[-20px] text-9xl opacity-5 rotate-12 pointer-events-none">
               <i className="fa-solid fa-paper-plane"></i>
            </div>
            
            <div className="relative z-10">
              <div className="font-black text-2xl tracking-tighter flex items-center gap-3 mb-2 uppercase">
                <div className="w-10 h-10 rounded-xl bg-brand-primary text-white flex items-center justify-center shadow-lg"><i className="fa-solid fa-paper-plane text-sm"></i></div>
                NusaTrip
              </div>
              <p className="text-[10px] text-slate-400 font-black tracking-[0.3em] uppercase">E-Voucher Perjalanan Resmi</p>
            </div>

            <div className="text-left sm:text-right relative z-10">
              <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">No. Pesanan</p>
              <p className="text-2xl sm:text-3xl font-black tabular-nums tracking-wider">{bookingRef || 'INV-20261024-001'}</p>
              <span className="inline-flex mt-2 bg-emerald-500 text-white text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-widest">LUNAS / PAID</span>
            </div>
          </div>

          {/* Ticket Body */}
          <div className="flex flex-col md:flex-row relative">
            
            {/* Cutouts (Desktop only) */}
            <div className="hidden md:block absolute left-[-15px] top-1/2 -translate-y-1/2 w-[30px] h-[30px] bg-slate-100 dark:bg-slate-950 rounded-full border-r border-slate-200 dark:border-slate-800 z-20 print:bg-white print:border-slate-300"></div>
            <div className="hidden md:block absolute right-[-15px] top-1/2 -translate-y-1/2 w-[30px] h-[30px] bg-slate-100 dark:bg-slate-950 rounded-full border-l border-slate-200 dark:border-slate-800 z-20 print:bg-white print:border-slate-300"></div>

            {/* General Info Section */}
            <div className="flex-1 p-8 sm:p-12">
              
              <div className="mb-8">
                <span className="bg-brand-primary/10 text-brand-primary border border-brand-primary/20 text-[9px] font-black px-3 py-1 rounded-lg shadow-sm mb-3 inline-block uppercase tracking-widest">Private Tour</span>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight uppercase tracking-tight">
                  Private Tour Bromo Midnight & Air Terjun Madakaripura
                </h1>
              </div>

              <div className="grid grid-cols-2 gap-y-8 gap-x-6 mb-10">
                {[
                  { label: 'Tanggal Trip', value: 'Sabtu, 24 Okt 2026', icon: 'fa-regular fa-calendar' },
                  { label: 'Peserta', value: '2 Dewasa', icon: 'fa-solid fa-users' },
                  { label: 'Waktu Jemput', value: '00:00 WIB (Tengah Malam)', icon: 'fa-regular fa-clock' },
                  { label: 'Lokasi Jemput', value: 'Hotel Tugu Malang', icon: 'fa-solid fa-map-pin' }
                ].map((item, i) => (
                  <div key={i}>
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                       <i className={`${item.icon} text-brand-primary`}></i> {item.label}
                    </p>
                    <p className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-tight">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-8">
                <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Detail Penumpang Utama</h3>
                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 rounded-2xl p-5 flex gap-5 items-center">
                  <div className="w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center font-black text-lg shadow-lg flex-shrink-0">
                    BS
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Tn. Budi Santoso</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold italic">+62 812-3456-7890 • budi.santoso@email.com</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Separator Line */}
            <div className="hidden md:block w-px border-l-2 border-dashed border-slate-100 dark:border-slate-800 print:border-slate-300"></div>

            {/* QR Code Section */}
            <div className="w-full md:w-[280px] p-8 sm:p-12 bg-slate-50 dark:bg-slate-800/30 flex flex-col justify-center items-center text-center print:bg-white print:border-l print:border-slate-300">
              
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-6">Pindai QR Code</p>
              
              <div className="bg-white dark:bg-white p-4 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 mb-6 group hover:scale-105 transition-transform duration-500">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=NUSA-${bookingRef || 'INV-20261024-001'}`} 
                  alt="QR Code" 
                  className="w-32 h-32 sm:w-40 sm:h-40 object-contain"
                />
              </div>
              
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold italic leading-relaxed max-w-[180px]">
                Tunjukkan QR Code ini kepada Driver atau Tour Guide kami saat penjemputan.
              </p>
              
            </div>
          </div>

          {/* Ticket Footer */}
          <div className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 p-8 sm:p-10">
            <h3 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-5 flex items-center gap-3">
               <i className="fa-solid fa-circle-info text-amber-500"></i> Informasi Penting
            </h3>
            <ul className="space-y-3">
               {[
                 'Harap bersiap di lokasi penjemputan 15 menit sebelum waktu keberangkatan.',
                 'Suhu di Bromo bisa mencapai 5-10°C. Sangat disarankan membawa jaket tebal dan sepatu nyaman.',
                 'Harga sudah termasuk tiket masuk WNI. Peserta WNA akan ada biaya tambahan tiket di lokasi.',
                 'Darurat? Hubungi Customer Support 24/7 kami di +62 800-1234-5678.'
               ].map((note, i) => (
                 <li key={i} className="text-[11px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-tight flex items-start gap-3">
                   <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0 mt-1"></span>
                   {note}
                 </li>
               ))}
            </ul>
          </div>
          
        </div>

        {/* Global Footer (Outside Ticket) */}
        <div className="mt-10 text-center no-print">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Butuh bantuan dengan pesanan Anda?</p>
          <button className="text-brand-primary font-black text-[10px] uppercase tracking-widest hover:underline transition-all">
            Hubungi Customer Support <i className="fa-solid fa-headset ml-2"></i>
          </button>
        </div>

      </main>

    </div>
  );
}
