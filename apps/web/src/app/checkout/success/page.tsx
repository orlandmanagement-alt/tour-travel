'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function SuccessContent() {
  const [showConfetti, setShowConfetti] = useState(false);
  const searchParams = useSearchParams();
  const refCode = searchParams.get('ref') || 'NSTR-UNKNOWN';

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-0 flex flex-wrap justify-between">
            {Array.from({length: 40}).map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full absolute animate-ping" 
                style={{
                  top: '-20px', 
                  left: `${Math.random() * 100}vw`,
                  backgroundColor: ['#4f46e5', '#10b981', '#fbbf24', '#ec4899'][i % 4],
                  animation: `fall ${Math.random() * 3 + 2}s linear infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        )}

        <main className="w-full max-w-[500px] bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-8 sm:p-12 text-center relative z-10">
            <div className="mb-8">
                <div className="w-20 h-20 mx-auto bg-emerald-500 rounded-full flex items-center justify-center animate-bounce shadow-lg shadow-emerald-200 mb-6">
                    <i className="fa-solid fa-check text-white text-4xl"></i>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">Pemesanan Berhasil!</h1>
                <p className="text-sm text-slate-500 font-medium">Terima kasih! Pesanan Tur Anda telah kami terima dengan sukses.</p>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-8 text-left">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">KODE BOOKING</span>
                    <span className="text-xs font-mono font-bold text-brand-600">{refCode}</span>
                </div>
                <div className="space-y-3">
                    <div className="flex gap-3">
                        <img src="https://images.unsplash.com/photo-1542898939-5e5f385c5dfa?w=100" className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                            <h3 className="text-xs font-bold text-slate-800 line-clamp-1">Private Tour Bromo Midnight & Madakaripura</h3>
                            <p className="text-[10px] text-slate-500 font-medium">Sabtu, 24 Okt 2026 • 2 Dewasa</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                        <span className="text-xs text-slate-500">Total Pembayaran</span>
                        <span className="text-base font-extrabold text-slate-900">Rp 2.500.000</span>
                    </div>
                </div>
            </div>

            <div className="mb-8 text-left">
                <h4 className="text-xs font-bold text-slate-900 mb-4">Langkah Selanjutnya:</h4>
                <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0"><i className="fa-regular fa-envelope"></i></div>
                        <div><p className="text-xs font-bold text-slate-800">Cek Email Anda</p><p className="text-[10px] text-slate-500">Salinan invoice dikirim ke email.</p></div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0"><i className="fa-solid fa-qrcode"></i></div>
                        <div><p className="text-xs font-bold text-slate-800">Siapkan E-Ticket</p><p className="text-[10px] text-slate-500">Tunjukkan QR Code saat di lokasi.</p></div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <Link href="/dashboard" className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex justify-center items-center gap-2">
                    <i className="fa-solid fa-ticket"></i> Lihat E-Ticket Sekarang
                </Link>
                <Link href="/" className="w-full py-3.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-sm rounded-xl transition-all">
                    Selesai
                </Link>
            </div>
        </main>

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes fall {
              0% { top: -20px; opacity: 1; transform: rotate(0deg); }
              100% { top: 100vh; opacity: 0; transform: rotate(360deg); }
          }
        `}} />
    </div>
  );
}

export default function SuccessPaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><p className="font-bold text-slate-500">Memuat pesanan...</p></div>}>
      <SuccessContent />
    </Suspense>
  );
}
