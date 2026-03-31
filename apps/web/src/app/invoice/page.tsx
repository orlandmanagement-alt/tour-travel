'use client';

import React from 'react';
import Link from 'next/link';

export default function InvoicePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 pb-20 pt-20">
      
      {/* Toolbar - No Print */}
      <div className="bg-slate-900 border-b border-white/5 py-4 sticky top-0 sm:top-20 z-50 shadow-2xl no-print">
         <div className="max-w-[850px] mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link href="/dashboard" className="text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-widest flex items-center gap-2 transition-all">
               <i className="fa-solid fa-arrow-left"></i> Panel Pesanan
            </Link>
            <div className="flex items-center gap-4">
               <button className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all flex items-center gap-2">
                  <i className="fa-regular fa-file-pdf"></i> Unduh PDF
               </button>
               <button onClick={handlePrint} className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2">
                  <i className="fa-solid fa-print"></i> Cetak Invoice
               </button>
            </div>
         </div>
      </div>

      {/* Invoice Document Card */}
      <main className="max-w-[850px] mx-auto mt-12 bg-white dark:bg-white text-slate-900 shadow-2xl border border-slate-200 print:shadow-none print:border-none print:mt-0 print:max-w-full relative overflow-hidden animate-in zoom-in-95 duration-700">
         
         {/* Top Branding Bar */}
         <div className="h-2 bg-indigo-600 w-full"></div>

         {/* Watermark Paid */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-15deg] pointer-events-none opacity-[0.03] select-none z-0">
            <div className="border-[12px] border-emerald-600 rounded-[2rem] p-8 text-[12rem] font-black text-emerald-600 uppercase tracking-tighter">PAID</div>
         </div>

         <div className="p-12 sm:p-16 relative z-10 space-y-12">
            
            {/* Header: Company vs Invoice Meta */}
            <header className="flex flex-col sm:flex-row justify-between items-start gap-10 border-b-4 border-slate-900 pb-12">
               <div className="space-y-4">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center text-xl shadow-lg"><i className="fa-solid fa-paper-plane"></i></div>
                     <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase">NusaTrip</span>
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-loose">
                     <strong className="text-slate-900">PT Nusantara Trip System</strong><br />
                     Menara BCA Lt. 32, Jl. M.H. Thamrin No. 1<br />
                     Jakarta Pusat, 10310, Indonesia<br />
                     billing@nusatrip.com | +62 21 8000 1234<br />
                     <span className="underline italic">NPWP: 01.234.567.8-091.000</span>
                  </div>
               </div>

               <div className="text-left sm:text-right space-y-6">
                  <h1 className="text-5xl font-black text-indigo-600 tracking-tighter uppercase leading-none">Invoice</h1>
                  <div className="space-y-2">
                     <div className="flex flex-col sm:items-end">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">No. Invoice</span>
                        <span className="text-sm font-black text-slate-900 tracking-tight uppercase">INV-20261024-001</span>
                     </div>
                     <div className="flex flex-col sm:items-end">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Tanggal</span>
                        <span className="text-sm font-black text-slate-900 tracking-tight uppercase">24 Oktober 2026</span>
                     </div>
                     <div className="pt-2">
                        <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-emerald-200">Payment Processed</span>
                     </div>
                  </div>
               </div>
            </header>

            {/* Bill To & Trip Info */}
            <div className="flex flex-col sm:flex-row gap-12">
               <div className="flex-1 space-y-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Ditagihkan Kepada (Billed To):</p>
                  <div>
                     <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Budi Santoso</h3>
                     <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed mt-2">
                        PT Maju Bersama Teknologi<br />
                        Jl. Sudirman No. 45, Senayan<br />
                        Jakarta Selatan, 12190<br />
                        budi.santoso@email.com | +62 812-3456-7890
                     </p>
                  </div>
               </div>
               <div className="flex-1 bg-slate-50 border border-slate-200 rounded-[2rem] p-8 space-y-3">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Ringkasan Layanan:</p>
                  <p className="text-xs font-black text-slate-900 uppercase tracking-tight leading-tight">Private Tour Bromo Midnight & Madakaripura Waterfall Expedition</p>
                  <div className="space-y-1">
                     <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Tanggal Trip: <span className="text-slate-900">24 Okt 2026</span></p>
                     <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Peserta: <span className="text-slate-900">2 Dewasa</span></p>
                  </div>
               </div>
            </div>

            {/* Line Items Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-900">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em]">
                        <th className="p-5 w-[50%]">Deskripsi Item</th>
                        <th className="p-5 text-center">Harga Satuan</th>
                        <th className="p-5 text-center">Qty</th>
                        <th className="p-5 text-right">Total</th>
                     </tr>
                  </thead>
                  <tbody className="text-[11px] font-bold text-slate-700 divide-y divide-slate-100">
                     <tr>
                        <td className="p-5">
                           <p className="text-slate-900 font-black uppercase tracking-tight">Paket Private Tour Bromo (T-BRM-001)</p>
                           <p className="text-[9px] text-slate-400 uppercase tracking-widest mt-1">Jeep 4WD, Tiket Masuk, Guide, Dokumentasi.</p>
                        </td>
                        <td className="p-5 text-center">Rp 1.250.000</td>
                        <td className="p-5 text-center">2 Pax</td>
                        <td className="p-5 text-right text-slate-900">Rp 2.500.000</td>
                     </tr>
                     <tr className="bg-emerald-50/30">
                        <td className="p-5 font-black text-emerald-600 uppercase tracking-tight">Kupon Diskon (BROMOHEMAT)</td>
                        <td className="p-5 text-center">-</td>
                        <td className="p-5 text-center">1</td>
                        <td className="p-5 text-right text-emerald-600">- Rp 100.000</td>
                     </tr>
                  </tbody>
               </table>
            </div>

            {/* Calculations & Payment Info */}
            <div className="flex flex-col sm:flex-row justify-between gap-12 pt-8">
               <div className="flex-1 space-y-6">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Informasi Pembayaran:</p>
                  <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 text-[10px] font-bold text-slate-600 uppercase tracking-widest space-y-2 relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-4 opacity-5 text-3xl text-indigo-600"><i className="fa-solid fa-shield-check"></i></div>
                     <p>Metode: <span className="text-slate-900">BCA Virtual Account</span></p>
                     <p>Status: <span className="text-emerald-600">Settlement (Success)</span></p>
                     <p>Log Ref: <span className="text-slate-900 font-mono">MD-TRX-982374</span></p>
                  </div>
               </div>
               <div className="w-full sm:w-80 space-y-4">
                  <div className="flex justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest px-2">
                     <span>Subtotal</span>
                     <span className="text-slate-900">Rp 2.400.000</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest px-2">
                     <span>Pajak PPN (11%)</span>
                     <span className="text-slate-900">Rp 264.000</span>
                  </div>
                  <div className="p-6 bg-indigo-600 rounded-3xl text-white flex justify-between items-end shadow-xl shadow-indigo-500/20">
                     <span className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Total Lunas</span>
                     <span className="text-3xl font-black tracking-tighter leading-none">Rp 2.664.000</span>
                  </div>
               </div>
            </div>

            {/* Footer Notes & Signatures */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-16 border-t border-slate-100">
               <div className="space-y-4">
                  <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-widest underline decoration-2 decoration-indigo-200 offset-4">Legal Disclaimer</h5>
                  <p className="text-[9px] font-bold text-slate-400 uppercase leading-loose tracking-widest">
                    Invoice ini digenerate secara otomatis melalui sistem billing NusantaraTrip dan merupakan bukti pembayaran yang sah sesuai regulasi PMK. Faktur pajak elektronik dapat diunduh melalui Dashboard Pelanggan.
                  </p>
               </div>
               <div className="text-center sm:text-right space-y-16">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Finance Office HQ - Jakarta</p>
                  <div>
                     <div className="font-serif text-3xl font-black italic text-slate-900/10 mb-[-25px] select-none tracking-tighter" style={{ fontFamily: 'Times New Roman' }}>NSTR-ADMIN-AUTO</div>
                     <p className="text-xs font-black text-slate-900 uppercase tracking-tight pt-6 border-t border-slate-900 w-full sm:w-64 sm:ml-auto">Financial Operations</p>
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">PT Nusantara Trip System</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Bottom Branding Bar */}
         <div className="h-4 bg-slate-900 w-full"></div>
      </main>

      <style jsx global>{`
         @media print {
            body { background: white !important; pt: 0 !important; }
            .no-print { display: none !important; }
            main { mt: 0 !important; shadow: none !important; border: none !important; }
            * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
         }
      `}</style>

    </div>
  );
}
