'use client';

"use client";

import React, { useState } from 'react';

export default function VendorDashboard() {
  const [showManifest, setShowManifest] = useState(false);

  const stats = [
    { label: 'Tugas Aktif', value: '2', color: 'text-indigo-600' },
    { label: 'Selesai (Bulan)', value: '14', color: 'text-slate-900 dark:text-white' },
    { label: 'Rating Anda', value: '4.9 / 5.0', icon: 'fa-star', color: 'text-yellow-500', isMulti: true }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex overflow-hidden pt-20">
      
      {/* Sidebar - Desktop */}
      <aside className="w-72 bg-[#0F172A] border-r border-white/5 hidden lg:flex flex-col h-[calc(100vh-80px)] sticky top-20">
         <div className="p-8 border-b border-white/5 flex items-center gap-4">
            <img src="https://ui-avatars.com/api/?name=Agus+Vendor&background=f97316&color=fff&bold=true" className="w-12 h-12 rounded-2xl border-2 border-white/10" alt="Avatar" />
            <div>
               <p className="text-sm font-black text-white uppercase tracking-tight">Agus Vendor</p>
               <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mt-0.5">Driver / Guide</p>
            </div>
         </div>
         <nav className="flex-1 p-6 space-y-2">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 px-4">Menu Utama</p>
            {[
               { icon: 'fa-calendar-check', label: 'Jadwal Tugas', active: true },
               { icon: 'fa-clock-rotate-left', label: 'Riwayat Trip' },
               { icon: 'fa-wallet', label: 'Penghasilan' },
               { icon: 'fa-user-gear', label: 'Pengaturan' }
            ].map((item, i) => (
               <button key={i} className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${item.active ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                  <i className={`fa-solid ${item.icon} text-xs`}></i>
                  {item.label}
               </button>
            ))}
         </nav>
         <div className="p-6 border-t border-white/5">
            <button className="w-full py-4 bg-red-500/10 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
               <i className="fa-solid fa-power-off mr-2"></i> Log Out
            </button>
         </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 sm:p-10 lg:p-12">
        <div className="max-w-4xl mx-auto space-y-10">
           
           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
              <div>
                 <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Halo, Agus! 👋</h1>
                 <p className="text-sm font-bold text-slate-500 dark:text-slate-400 italic mt-1 font-serif">Selamat bekerja! Berikut jadwal penugasan hari ini.</p>
              </div>
              <div className="px-4 py-2 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-full flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                 <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Active Status</span>
              </div>
           </div>

           {/* Stats Grid */}
           <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
              {stats.map((stat, i) => (
                 <div key={i} className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-6 text-center shadow-sm hover:shadow-xl transition-all ${stat.isMulti ? 'col-span-2' : ''}`}>
                    <div className="space-y-1">
                       <div className={`text-3xl font-black ${stat.color} tracking-tighter flex items-center justify-center gap-2`}>
                          {stat.icon && <i className={`fa-solid ${stat.icon} text-lg`}></i>}
                          {stat.value}
                       </div>
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                    </div>
                 </div>
              ))}
           </div>

           <div className="space-y-6">
              <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] pl-4 border-l-4 border-orange-500">Jadwal Tugas Terdekat</h2>

              {/* Task Card - Active */}
              <div className="bg-white dark:bg-slate-900 border-2 border-orange-500 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 bg-orange-500 text-white text-[9px] font-black px-6 py-2 rounded-bl-3xl uppercase tracking-widest">Tugas Hari Ini</div>
                 
                 <div className="p-8 sm:p-10 space-y-8">
                    <div className="flex gap-6 items-start">
                       <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0">
                          <img src="https://images.unsplash.com/photo-1542898939-5e5f385c5dfa?w=400" className="w-full h-full object-cover" alt="Bromo" />
                       </div>
                       <div className="space-y-1 pt-1">
                          <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">INV-20261024-001</p>
                          <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-[1.1]">Private Tour Bromo Midnight & Madakaripura Waterfall</h3>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                       {[
                          { icon: 'fa-calendar-day', label: 'Waktu Jemput', val: '24 Okt 2026 • 00:00 WIB' },
                          { icon: 'fa-map-location-dot', label: 'Lokasi Jemput', val: 'Hotel Tugu Malang' },
                          { icon: 'fa-users', label: 'Tamu (Pax)', val: 'Budi Santoso (3 Orang)' }
                       ].map((info, i) => (
                          <div key={i} className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
                             <div className="flex items-center gap-2 text-orange-500">
                                <i className={`fa-solid ${info.icon} text-xs`}></i>
                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{info.label}</span>
                             </div>
                             <p className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-tight">{info.val}</p>
                          </div>
                       ))}
                    </div>

                    <div className="flex gap-4">
                       <button 
                         onClick={() => setShowManifest(true)}
                         className="flex-1 py-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-all shadow-sm"
                       >
                          <i className="fa-solid fa-clipboard-user mr-2"></i> Manifes Tamu
                       </button>
                       <button className="flex-[1.5] py-4 bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all active:scale-95">
                          <i className="fa-solid fa-play-circle mr-2"></i> Mulai Perjalanan
                       </button>
                    </div>
                 </div>
              </div>

              {/* Task Card - Upcoming */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm opacity-80 hover:opacity-100 transition-all">
                 <div className="flex flex-col sm:flex-row gap-8 items-center">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0">
                       <img src="https://images.unsplash.com/photo-1620067677840-7ac53577d2ec?w=200" className="w-full h-full object-contain p-2 mix-blend-multiply dark:mix-blend-normal" alt="Car" />
                    </div>
                    <div className="flex-1 space-y-1">
                       <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">INV-20261105-089</p>
                       <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tight">Rental Innova Zenix (Dengan Supir)</h3>
                       <div className="flex gap-4 pt-2">
                          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5"><i className="fa-regular fa-clock text-indigo-600"></i> 05 Nov • 08:00</span>
                          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5"><i className="fa-solid fa-map-pin text-indigo-600"></i> Bandara Malang (MLG)</span>
                       </div>
                    </div>
                    <button className="w-full sm:w-auto px-8 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-indigo-600 hover:text-white transition-all">
                       Detail
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </main>

      {/* Manifest Modal */}
      {showManifest && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white dark:bg-slate-900 rounded-[3rem] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border border-white/10">
              <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                 <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Manifes Penumpang</h3>
                 <button onClick={() => setShowManifest(false)} className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 shadow-sm border border-slate-100 dark:border-slate-600 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors">
                    <i className="fa-solid fa-xmark"></i>
                 </button>
              </div>

              <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto">
                 {/* PIC Info */}
                 <div className="bg-indigo-600 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-500/20">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                    <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em] mb-3">Tamu Utama (PIC)</p>
                    <div className="flex justify-between items-center">
                       <div>
                          <h4 className="text-2xl font-black uppercase tracking-tight">Budi Santoso</h4>
                          <p className="font-mono text-sm opacity-80 mt-1">0812-3456-7890</p>
                       </div>
                       <div className="flex gap-2">
                          <a href="tel:081234567890" className="w-12 h-12 bg-white text-indigo-600 rounded-2xl flex items-center justify-center shadow-lg"><i className="fa-solid fa-phone"></i></a>
                          <a href="#" className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg"><i className="fa-brands fa-whatsapp text-xl"></i></a>
                       </div>
                    </div>
                 </div>

                 {/* Pax List */}
                 <div className="space-y-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Daftar Peserta (3 Pax)</p>
                    {[
                      { num: 1, name: 'Siska Putri', type: 'Dewasa', id: '3573012345670002' },
                      { num: 2, name: 'Alvaro Santoso', type: 'Anak-anak', id: '-' }
                    ].map((pax, i) => (
                      <div key={i} className="flex items-center gap-5 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                         <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 text-indigo-600 font-black text-sm flex items-center justify-center border border-slate-100 dark:border-slate-600">{pax.num}</div>
                         <div className="flex-1">
                            <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{pax.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{pax.type} • ID: {pax.id}</p>
                         </div>
                      </div>
                    ))}
                 </div>

                 {/* Special Notes */}
                 <div className="bg-orange-50 dark:bg-orange-500/10 border-2 border-dashed border-orange-200 dark:border-orange-500/30 rounded-[2rem] p-8">
                    <h5 className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                       <i className="fa-solid fa-triangle-exclamation"></i> Catatan Khusus Admin
                    </h5>
                    <p className="text-[11px] font-bold text-slate-600 dark:text-slate-400 leading-relaxed italic border-l-4 border-orange-400 pl-4">
                      &quot;Tamu membawa anak kecil (mabuk perjalanan), mohon siapkan kantong plastik dan bawa kendaraan lebih halus. Tamu telah membeli Add-on Sewa Jeep 4WD, pastikan Jeep sudah standby di Wonokitri jam 02:00 pagi.&quot;
                    </p>
                 </div>
              </div>

              <div className="p-8 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800">
                 <button onClick={() => setShowManifest(false)} className="w-full py-5 bg-slate-900 dark:bg-slate-700 text-white font-black text-xs uppercase tracking-widest rounded-3xl shadow-xl transition-all hover:bg-black">Tutup Manifes</button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}
