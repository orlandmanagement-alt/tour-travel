'use client';

import React, { useState } from 'react';
import UserSidebar from '@/components/UserSidebar';

export default function AffiliateDashboard() {
  const [showCopyToast, setShowCopyToast] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText('https://nusatrip.com/ref/budi2026');
    setShowCopyToast(true);
    setTimeout(() => setShowCopyToast(false), 2500);
  };

  const stats = [
    { label: 'Komisi Poin', value: '85.000', subValue: '± Rp 850.000', icon: 'fa-coins', color: 'bg-indigo-600', textColor: 'text-white' },
    { label: 'Total Klik', value: '1.240', icon: 'fa-mouse-pointer', color: 'bg-white', textColor: 'text-slate-900 border border-slate-200' },
    { label: 'Konversi', value: '12', icon: 'fa-check-double', color: 'bg-white', textColor: 'text-slate-900 border border-slate-200' }
  ];

  const history = [
    { date: '20 Okt 2026', title: 'Explore Japan Autumn', type: 'TOUR', user: 'A*** W***', amount: 'Rp 450.000', pts: '45.000 Pts', status: 'Cair' },
    { date: '18 Okt 2026', title: 'Private Tour Bromo', type: 'TOUR', user: 'S*** P***', amount: 'Rp 125.000', pts: '12.500 Pts', status: 'Pending' },
    { date: '15 Okt 2026', title: 'Innova Zenix Hybrid', type: 'RENTAL', user: 'D*** M***', amount: 'Rp 85.000', pts: '8.500 Pts', status: 'Cair' },
    { date: '12 Okt 2026', title: 'Bali Gathering 20 Pax', type: 'TOUR (CORP)', user: 'PT M*** T***', amount: 'Rp 1.500.000', pts: '0 Pts', status: 'Batal', cancelled: true }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          <UserSidebar />

          <div className="flex-1 w-full min-w-0">
            <div className="mb-8">
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2 uppercase">Afiliasi Saya</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-bold italic">Sebarkan link referral Anda dan kumpulkan komisi dari setiap transaksi sukses.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
               {stats.map((stat, i) => (
                 <div key={i} className={`${stat.color} ${stat.textColor} rounded-[2.5rem] p-8 shadow-xl shadow-indigo-500/10 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 opacity-60">{stat.label}</p>
                    <div className="flex items-center justify-between">
                       <div>
                          <h3 className="text-3xl font-black tracking-tighter leading-none mb-1">{stat.value}</h3>
                          {stat.subValue && <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest">{stat.subValue}</p>}
                       </div>
                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${stat.color === 'bg-white' ? 'bg-slate-50 text-indigo-600' : 'bg-white/20 text-white shadow-inner'}`}>
                          <i className={`fa-solid ${stat.icon}`}></i>
                       </div>
                    </div>
                 </div>
               ))}
            </div>

            {/* Link Box */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 lg:p-10 shadow-sm mb-10 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-600"></div>
               <h2 className="font-black text-slate-900 dark:text-white uppercase tracking-tight text-base mb-6 flex items-center gap-2">
                 <i className="fa-solid fa-link text-indigo-600"></i> Link Referral Anda
               </h2>
               <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex-1 w-full bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-5 flex items-center justify-between group">
                     <span className="text-sm font-black text-indigo-600 font-mono tracking-tight transition-all">https://nusatrip.com/ref/budi2026</span>
                     <button onClick={copyLink} className="p-3 bg-white dark:bg-slate-700 text-slate-400 group-hover:text-indigo-600 shadow-sm border border-slate-100 dark:border-slate-600 rounded-xl hover:scale-110 transition-all">
                        <i className={`fa-regular ${showCopyToast ? 'fa-check-circle text-emerald-500' : 'fa-copy'}`}></i>
                     </button>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                     <button className="flex-1 w-12 h-14 bg-[#25D366] hover:scale-105 text-white rounded-2xl shadow-xl shadow-emerald-500/20 text-lg transition-transform flex items-center justify-center">
                        <i className="fa-brands fa-whatsapp"></i>
                     </button>
                     <button className="flex-1 w-12 h-14 bg-slate-900 text-white rounded-2xl shadow-xl shadow-slate-900/20 text-lg transition-transform flex items-center justify-center">
                        <i className="fa-brands fa-x-twitter"></i>
                     </button>
                  </div>
               </div>
               <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 mt-4 uppercase tracking-[0.2em] flex items-center gap-2">
                 <i className="fa-solid fa-circle-info text-indigo-400"></i> COOKIE VALID SELAMA 30 HARI
               </p>
            </div>

            {/* History Table */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col">
               <div className="p-6 sm:p-8 flex justify-between items-center bg-slate-50/50 border-b border-slate-100">
                  <h2 className="text-[10px] sm:text-xs font-black text-slate-900 uppercase tracking-[0.2em]">Riwayat Konversi Komisi</h2>
                  <select className="appearance-none bg-white border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl px-4 py-2 focus:outline-none focus:border-indigo-500 shadow-sm cursor-pointer">
                    <option>Semua Status</option>
                    <option>Cair</option>
                    <option>Pending</option>
                  </select>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                     <thead>
                        <tr className="bg-slate-50/20 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                           <th className="px-8 py-5">Tanggal</th>
                           <th className="px-8 py-5">Item Layanan</th>
                           <th className="px-8 py-5">User</th>
                           <th className="px-8 py-5 text-right">Komisi</th>
                           <th className="px-8 py-5 text-center">Status</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {history.map((item, i) => (
                          <tr key={i} className="hover:bg-slate-50 transition-colors group">
                             <td className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-tight">{item.date}</td>
                             <td className="px-8 py-5">
                                <p className="text-xs font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{item.title}</p>
                                <span className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em]">{item.type}</span>
                             </td>
                             <td className="px-8 py-5">
                                <p className="text-xs font-black text-slate-700">{item.user}</p>
                             </td>
                             <td className="px-8 py-5 text-right">
                                <p className={`text-xs font-black ${item.cancelled ? 'text-slate-300 line-through' : 'text-slate-900'}`}>{item.amount}</p>
                                <p className="text-[9px] font-black text-orange-500 uppercase tracking-widest">{item.pts}</p>
                             </td>
                             <td className="px-8 py-5 text-center">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                                  item.status === 'Cair' ? 'bg-emerald-50 text-emerald-600' : 
                                  item.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-400'
                                }`}>
                                  <div className={`w-1 h-1 rounded-full ${item.status === 'Cair' ? 'bg-emerald-500' : item.status === 'Pending' ? 'bg-amber-500' : 'bg-slate-400'}`}></div>
                                  {item.status}
                                </span>
                             </td>
                          </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
               <div className="p-8 bg-slate-50/30 border-t border-slate-100 flex justify-between items-center">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Menampilkan 1-4 dari 12 transaksi</p>
                  <div className="flex gap-2">
                     <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-slate-50 transition-all font-black text-xs"><i className="fa-solid fa-chevron-left"></i></button>
                     <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-slate-50 transition-all font-black text-xs"><i className="fa-solid fa-chevron-right"></i></button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copy Toast */}
      {showCopyToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top-10 fade-in duration-500">
           <div className="bg-slate-900 text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-4 border border-white/10 backdrop-blur-md">
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                 <i className="fa-solid fa-check"></i>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest">Link Referral Berhasil Disalin!</p>
           </div>
        </div>
      )}

    </div>
  );
}
