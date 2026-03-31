'use client';

import React from 'react';
import StatCard from '@/components/StatCard';

export default function AnalyticsPage() {
  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Business Intelligence</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">Analisis mendalam performa platform SaaS Anda.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
           {['Bulan Ini', 'Kuartal', 'Tahun'].map((tab, idx) => (
             <button 
               key={tab} 
               className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${idx === 0 ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/20' : 'text-slate-400 hover:text-slate-600'}`}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm border-t-4 border-t-brand-600 relative overflow-hidden group">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-brand-600 transition-colors">Gross Revenue (GMV)</p>
           <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Rp 1.25B</h3>
           <div className="flex items-center gap-2">
             <span className="flex items-center gap-1 text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">
               <i className="fa-solid fa-arrow-trend-up"></i> +12.5%
             </span>
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">vs prev year</span>
           </div>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm border-t-4 border-t-emerald-500 relative overflow-hidden group">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-emerald-500 transition-colors">Net Platform Fee</p>
           <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Rp 125M</h3>
           <div className="flex items-center gap-2">
             <span className="flex items-center gap-1 text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">
               <i className="fa-solid fa-arrow-trend-up"></i> +15.2%
             </span>
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Growth rate</span>
           </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm border-t-4 border-t-accent-500 relative overflow-hidden group">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-accent-500 transition-colors">Successful Bookings</p>
           <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">3,420</h3>
           <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
             <i className="fa-solid fa-check-circle text-accent-500"></i>
             100% Fully Paid Orders
           </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm border-t-4 border-t-blue-500 relative overflow-hidden group">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-blue-500 transition-colors">Avg. Order Value (AOV)</p>
           <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Rp 3.5M</h3>
           <div className="flex items-center gap-2">
             <span className="flex items-center gap-1 text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">
               <i className="fa-solid fa-arrow-trend-up"></i> +2.1%
             </span>
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ticket size</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Sales Trend Visualization (SVG) */}
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">Tren Pendapatan Bulanan</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Estimasi GMV per Bulan</p>
            </div>
            <div className="flex gap-2">
               <div className="flex items-center gap-1 text-[10px] font-bold text-brand-600">
                  <div className="w-2 h-2 rounded-full bg-brand-600"></div> 2026
               </div>
               <div className="flex items-center gap-1 text-[10px] font-bold text-slate-300">
                  <div className="w-2 h-2 rounded-full bg-slate-300"></div> 2025
               </div>
            </div>
          </div>

          <div className="relative h-64 w-full px-4">
             {/* Chart Background Grid */}
             <div className="absolute inset-0 flex flex-col justify-between py-2 border-l border-b border-slate-100">
                {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-full h-px bg-slate-50"></div>)}
             </div>

             {/* SVG Line Chart */}
             <svg className="w-full h-full relative z-10 overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
                {/* 2025 Line (Underlay) */}
                <path 
                  d="M0,180 L100,160 L200,170 L300,140 L400,155 L500,130 L600,120" 
                  fill="none" 
                  stroke="#e2e8f0" 
                  strokeWidth="3" 
                  strokeDasharray="4,4"
                />
                {/* 2026 Line (Overlay) */}
                <path 
                  d="M0,160 L100,120 L200,140 L300,80 L400,100 L500,60 L600,40" 
                  fill="none" 
                  stroke="url(#gradient-brand)" 
                  strokeWidth="5" 
                  strokeLinecap="round"
                />
                <defs>
                   <linearGradient id="gradient-brand" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#4f46e5" />
                   </linearGradient>
                </defs>
                {/* Dots */}
                {[0, 100, 200, 300, 400, 500, 600].map((x, i) => (
                  <circle 
                    key={i} 
                    cx={x} 
                    cy={[160, 120, 140, 80, 100, 60, 40][i]} 
                    r="5" 
                    fill="white" 
                    stroke="#4f46e5" 
                    strokeWidth="3" 
                  />
                ))}
             </svg>

             {/* X-Axis Labels */}
             <div className="flex justify-between mt-6 px-1">
                {['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul'].map(m => (
                  <span key={m} className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{m}</span>
                ))}
             </div>
          </div>
        </div>

        {/* Secondary Insights */}
        <div className="grid grid-cols-1 gap-8">
           {/* Top Destinations */}
           <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
             <h3 className="text-lg font-black text-slate-900 tracking-tight mb-8">Top Destinasi</h3>
             <div className="space-y-6">
                {[
                  { name: 'Bali / Nusa Penida', val: 45, color: 'bg-brand-600' },
                  { name: 'Malang / Bromo', val: 30, color: 'bg-accent-500' },
                  { name: 'Lombok / Gili T', val: 15, color: 'bg-emerald-500' },
                  { name: 'Labuan Bajo', val: 10, color: 'bg-blue-500' },
                ].map((d) => (
                   <div key={d.name} className="space-y-2">
                     <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                       <span className="text-slate-500">{d.name}</span>
                       <span className="text-slate-900">{d.val}%</span>
                     </div>
                     <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${d.color} rounded-full`} style={{ width: `${d.val}%` }}></div>
                     </div>
                   </div>
                ))}
             </div>
             <div className="mt-8 p-4 bg-brand-50 border border-brand-100 rounded-2xl">
                <p className="text-[10px] font-black text-brand-700 leading-relaxed uppercase tracking-tight">
                  <i className="fa-solid fa-lightbulb mr-2"></i>
                  INSIGHT: Destinasi Bali meningkat 20% bulan ini karena promo Flash Sale Ramadhan.
                </p>
             </div>
           </div>
        </div>

      </div>

      {/* Advanced Metrics Footer */}
      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500 rounded-full filter blur-[100px] opacity-10 -translate-y-1/2 translate-x-1/2"></div>
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
               <h3 className="text-xl font-black tracking-tight mb-2">Churn Rate & Customer Loyalty</h3>
               <p className="text-sm font-medium text-slate-400">Rasio pelanggan yang kembali melakukan transaksi di periode berikutnya.</p>
            </div>
            <div className="flex items-center gap-10">
               <div className="text-center">
                  <p className="text-3xl font-black text-accent-400 mb-1">82%</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">Retention</p>
               </div>
               <div className="w-px h-12 bg-white/10 hidden sm:block"></div>
               <div className="text-center">
                  <p className="text-3xl font-black text-brand-400 mb-1">Rp 12M</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">CLV (Avg)</p>
               </div>
            </div>
         </div>
      </div>

    </div>
  );
}
